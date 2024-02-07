#![allow(unused_imports)]
use actix_files::{Files, NamedFile};
use actix_limitation::{Limiter, RateLimiter};
use actix_session::config::{BrowserSession, CookieContentSecurity};
use actix_session::SessionExt;
use actix_session::{storage::CookieSessionStore, Session, SessionMiddleware};
use actix_web::cookie::{Key, SameSite};
use actix_web::{
    dev::ServiceRequest,
    error, get,
    http::{
        header::{self, ContentType},
        Method, StatusCode,
    },
    middleware, web, App, Either, Error, HttpRequest, HttpResponse, HttpServer, Responder, Result,
};
use barrel::types::Type;
use futures::{future::ok, stream::once};
use ssr_rs::Ssr;
use std::{convert::Infallible, io};
use tokio_postgres::types::FromSql;

use async_stream::stream;
use std::ops::DerefMut;

#[actix_web::get("get_session")]
async fn get_session(session: Session) -> impl actix_web::Responder {
    match session.get::<String>("message") {
        Ok(message_option) => match message_option {
            Some(message) => HttpResponse::Ok().body(message),
            None => HttpResponse::NotFound().body("Not set."),
        },
        Err(_) => HttpResponse::InternalServerError().body("Session error."),
    }
}

#[get("/")]
async fn index(req: HttpRequest, data: web::Data<AppState>) -> Result<HttpResponse> {
    let props = format!(
        r##"{{
            "location": "{}",
            "context": {{}}
        }}"##,
        req.uri()
    );

    let source = data.js_source.lock().unwrap();
    let res_body = Ssr::render_to_string(&source, "SSR", Some(&props));
    let body = once(ok::<_, Error>(web::Bytes::from(res_body)));

    Ok(HttpResponse::build(StatusCode::OK)
        .content_type("text/html; charset=utf-8")
        .streaming(body))
}

/// favicon handler
#[get("/favicon")]
async fn favicon() -> Result<impl Responder> {
    Ok(NamedFile::open("../static/favicon.ico")?)
}

mod embedded {
    use refinery::embed_migrations;
    embed_migrations!("migrations");
}

mod config {
    use serde::Deserialize;
    #[derive(Debug, Default, Deserialize)]
    pub struct ExampleConfig {
        pub server_addr: String,
        pub pg: deadpool_postgres::Config,
    }
}

mod models {
    use chrono::{DateTime, Utc};
    use postgres::Row;
    use rust_decimal::Decimal;
    use serde::{Deserialize, Serialize};
    use tokio_pg_mapper_derive::PostgresMapper;

    #[derive(Deserialize, PostgresMapper, Serialize, Clone, Debug)]
    #[pg_mapper(table = "tracking_codes")]
    pub struct TrackingCode {
        pub code: String,
        pub reason: String,
        // pub created_at: DateTime<Utc>,
        // pub updated_at: DateTime<Utc>,
        // pub user_id: i32,
        pub country_of_origin: String,
        pub date_of_postage: Option<DateTime<Utc>>,
        pub value_in_real: Decimal,
        pub reimbursed: bool,
    }

    #[derive(Deserialize, PostgresMapper, Serialize, Clone, Debug)]
    #[pg_mapper(table = "users")] // singular 'user' is a keyword
    pub struct User {
        pub id: i32,
        pub email: String,
        pub first_name: String,
        pub last_name: String,
        pub username: String,
        pub is_admin: bool,
        pub is_newsletter_subscriber: bool,
        pub created_at: DateTime<Utc>,
        pub updated_at: DateTime<Utc>,
    }

    #[derive(Deserialize, Serialize, Clone)]
    pub struct UserProfile {
        pub user: User,
        pub tracking_codes: Vec<TrackingCode>,
    }

    #[derive(Deserialize, Serialize, Clone, Debug)]
    pub struct CodePayload {
        pub cf_challenge: String,
        pub tracking_code: TrackingCode,
    }
}

mod errors {
    use actix_web::{HttpResponse, ResponseError};
    use deadpool_postgres::PoolError;
    use derive_more::{Display, From};
    use tokio_pg_mapper::Error as PGMError;
    use tokio_postgres::error::Error as PGError;

    #[derive(Display, From, Debug)]
    pub enum MyError {
        NotFound,
        PGError(PGError),
        PGMError(PGMError),
        PoolError(PoolError),
    }
    impl std::error::Error for MyError {}

    impl ResponseError for MyError {
        fn error_response(&self) -> HttpResponse {
            match *self {
                MyError::NotFound => HttpResponse::NotFound().finish(),
                MyError::PoolError(ref err) => {
                    HttpResponse::InternalServerError().body(err.to_string())
                }
                _ => HttpResponse::InternalServerError().finish(),
            }
        }
    }
}

mod db {
    use deadpool_postgres::Client;
    use tokio_pg_mapper::FromTokioPostgresRow;

    use crate::{
        errors::MyError,
        models::{TrackingCode, User},
    };

    pub async fn get_users(client: &Client) -> Result<Vec<User>, MyError> {
        let user_sql = include_str!("../sql/get_users.sql");
        let user_sql = user_sql.replace("$table_fields", &User::sql_table_fields());
        let user_sql = client.prepare(&user_sql).await.unwrap();

        let results = client
            .query(&user_sql, &[])
            .await?
            .iter()
            .map(|row| User::from_row_ref(row).unwrap())
            .collect::<Vec<User>>();

        Ok(results)
    }

    pub async fn add_user(client: &Client, user_info: User) -> Result<User, MyError> {
        let _stmt = include_str!("../sql/add_user.sql");
        let _stmt = _stmt.replace("$table_fields", &User::sql_table_fields());
        let stmt = client.prepare(&_stmt).await.unwrap();

        client
            .query(
                &stmt,
                &[
                    &user_info.email,
                    &user_info.first_name,
                    &user_info.last_name,
                    &user_info.username,
                ],
            )
            .await?
            .iter()
            .map(|row| User::from_row_ref(row).unwrap())
            .collect::<Vec<User>>()
            .pop()
            .ok_or(MyError::NotFound) // more applicable for SELECTs
    }

    // (reason, country_of_origin, date_of_postage, value_in_real, reimbursed)
    pub async fn add_tracking_code(
        client: &Client,
        code_info: TrackingCode,
    ) -> Result<TrackingCode, MyError> {
        let _stmt = include_str!("../sql/add_tracking_code.sql");
        let _stmt = _stmt.replace("$table_fields", &TrackingCode::sql_table_fields());

        println!("{_stmt:?}");
        let stmt = client.prepare(&_stmt).await.unwrap();
        println!("{code_info:?}");

        let query = client
            .query(
                &stmt,
                &[
                    &code_info.code,
                    &code_info.reason,
                    &code_info.country_of_origin,
                    &code_info.date_of_postage,
                    &code_info.value_in_real,
                    &code_info.reimbursed,
                ],
            )
            .await?;

        println!("{code_info:?}");
        println!("{query:?}");

        query
            .iter()
            .map(|row| {
                println!("{row:?}");
                TrackingCode::from_row_ref(row).unwrap()
            })
            .collect::<Vec<TrackingCode>>()
            .pop()
            .ok_or(MyError::NotFound) // more applicable for SELECTs
    }

    pub async fn get_tracking_codes(
        client: &Client,
        user_id: i32,
    ) -> Result<Vec<TrackingCode>, MyError> {
        let _code_sql = include_str!("../sql/get_tracking_codes_by_user.sql");
        let _code_sql = _code_sql
            .replace("$table_fields", &TrackingCode::sql_table_fields())
            .replace("$user_id", &user_id.to_string());
        let code_sql = client.prepare(&_code_sql).await.unwrap();

        let results = client
            .query(&code_sql, &[])
            .await?
            .iter()
            .map(|row| TrackingCode::from_row_ref(row).unwrap())
            .collect::<Vec<TrackingCode>>();

        Ok(results)
    }

    pub async fn get_tracking_code(
        client: &Client,
        code: String,
    ) -> Result<Vec<TrackingCode>, MyError> {
        let _code_sql = include_str!("../sql/find_code.sql");

        let _code_sql = _code_sql
            .replace("$table_fields", &TrackingCode::sql_table_fields())
            .replace("$code", &code.to_string());
        let code_sql = client.prepare(&_code_sql).await.unwrap();

        let results = client
            .query(&code_sql, &[])
            .await?
            .iter()
            .map(|row| TrackingCode::from_row_ref(row).unwrap())
            .collect::<Vec<TrackingCode>>();

        Ok(results)
    }
}

mod handlers {
    use crate::{
        db,
        errors::MyError,
        models::{CodePayload, TrackingCode, User, UserProfile},
    };
    use actix_web::{web, Error, HttpRequest, HttpResponse};
    use cf_turnstile::{SiteVerifyRequest, TurnstileClient};
    use deadpool_postgres::{Client, Pool};
    use std::env;

    pub async fn get_tracking_codes(
        db_pool: web::Data<Pool>,
        path: web::Path<String>,
    ) -> Result<HttpResponse, Error> {
        let user_id = path.into_inner().parse::<i32>().unwrap();
        let client: Client = db_pool.get().await.map_err(MyError::PoolError)?;

        let tracking_codes = db::get_tracking_codes(&client, user_id).await?;

        Ok(HttpResponse::Ok().json(tracking_codes))
    }

    pub async fn get_tracking_code(
        db_pool: web::Data<Pool>,
        path: web::Path<String>,
    ) -> Result<HttpResponse, Error> {
        let code = path.into_inner();
        let client: Client = db_pool.get().await.map_err(MyError::PoolError)?;

        let tracking_codes = db::get_tracking_code(&client, code).await?;

        Ok(HttpResponse::Ok().json(tracking_codes))
    }

    pub async fn get_users(db_pool: web::Data<Pool>) -> Result<HttpResponse, Error> {
        let client: Client = db_pool.get().await.map_err(MyError::PoolError)?;
        let users = db::get_users(&client).await?;

        Ok(HttpResponse::Ok().json(users))
    }

    pub async fn add_user(
        user: web::Json<User>,
        db_pool: web::Data<Pool>,
    ) -> Result<HttpResponse, Error> {
        let user_info: User = user.into_inner();

        let client: Client = db_pool.get().await.map_err(MyError::PoolError)?;

        let new_user = db::add_user(&client, user_info).await?;

        Ok(HttpResponse::Ok().json(new_user))
    }

    pub async fn add_tracking_code(
        payload: web::Json<CodePayload>,
        db_pool: web::Data<Pool>,
        req: HttpRequest,
    ) -> Result<HttpResponse, Error> {
        println!("{payload:?}");

        let code_info: TrackingCode = payload.tracking_code.clone();
        let challenge = payload.cf_challenge.clone();
        let remote_ip = req
            .connection_info()
            .realip_remote_addr()
            .unwrap()
            .to_string();

        println!("{code_info:?}");

        let captcha_secret = env::var("PRIVATE_CATPCHA_SECRET").expect("Missing secret");

        println!("{captcha_secret}");
        println!("{}", remote_ip);

        let client = TurnstileClient::new(captcha_secret.to_string().into());
        let verify_req = SiteVerifyRequest {
            response: challenge,
            remote_ip: Some(remote_ip),
            secret: captcha_secret.to_string().into(),
        };

        println!("{:?}", verify_req);

        let validated = client.siteverify(verify_req).await;

        match validated {
            Ok(_) => {
                let client: Client = db_pool.get().await.map_err(MyError::PoolError)?;

                println!("HEY!!!");
                let new_code = db::add_tracking_code(&client, code_info).await?;
                Ok(HttpResponse::Ok().json(new_code))
            }
            Err(_) => {
                println!("{validated:?}");
                Ok(HttpResponse::Forbidden().finish())
            }
        }
    }
}

async fn default_handler(req_method: Method) -> Result<impl Responder> {
    match req_method {
        Method::GET => {
            let file = NamedFile::open("static/404.html")?
                .customize()
                .with_status(StatusCode::NOT_FOUND);
            Ok(Either::Left(file))
        }
        _ => Ok(Either::Right(HttpResponse::MethodNotAllowed().finish())),
    }
}

use crate::config::ExampleConfig;
use ::config::Config;

use dotenvy::dotenv;
use std::env;
use std::fs::read_to_string;
use std::sync::Mutex;
use std::{sync::Arc, time::Duration};
use tokio_postgres::NoTls;

use handlers::{add_tracking_code, add_user, get_tracking_code, get_tracking_codes, get_users};

struct AppState {
    js_source: Mutex<String>, // <- Mutex is necessary to mutate safely across threads
}

fn session_middleware() -> SessionMiddleware<CookieSessionStore> {
    SessionMiddleware::builder(CookieSessionStore::default(), Key::from(&[0; 64]))
        .cookie_name(String::from("session-id")) // arbitrary name
        .cookie_secure(true) // https only
        .session_lifecycle(BrowserSession::default()) // expire at end of session
        .cookie_same_site(SameSite::Strict)
        .cookie_content_security(CookieContentSecurity::Private) // encrypt
        .cookie_http_only(true) // disallow scripts from reading
        .build()
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();

    let config_ = Config::builder()
        .add_source(::config::Environment::default())
        .build()
        .unwrap();

    let config: ExampleConfig = config_.try_deserialize().unwrap();

    println!("{:?}", config);

    let pool = config.pg.create_pool(None, NoTls).unwrap();

    // Perform migrations
    let mut conn = pool.get().await.unwrap();
    let client = conn.deref_mut();

    let port = env::var("PORT").expect("Missing port number");
    let port = port.parse::<u16>().expect("Invalid port given");
    let redis_url = env::var("REDIS_PRIVATE_URL").expect("Missing Redis URL");

    let migration_report = embedded::migrations::runner()
        .run_async(client.deref_mut())
        .await
        .unwrap();

    println!("migration_report {:#?}", migration_report);

    let limiter = web::Data::new(
        Limiter::builder(redis_url)
            .key_by(|req: &ServiceRequest| {
                req.get_session()
                    .get(&"session-id")
                    .unwrap_or_else(|_| req.cookie(&"rate-api-id").map(|c| c.to_string()))
            })
            .limit(1000)
            .period(Duration::from_secs(1200)) // 20 minutes
            .build()
            .unwrap(),
    );

    let server = HttpServer::new(move || {
        App::new()
            .wrap(session_middleware())
            .wrap(RateLimiter::default())
            .app_data(limiter.clone())
            .app_data(web::Data::new(pool.clone()))
            .app_data(web::Data::new(AppState {
                js_source: Mutex::new(
                    read_to_string("./dist/index.js").expect("Failed to load the resource."),
                ),
            }))
            .service(Files::new("/styles", "./dist/styles/").show_files_listing())
            .service(Files::new("/images", "./dist/images/").show_files_listing())
            .service(Files::new("/scripts", "./dist/scripts/").show_files_listing())
            .service(
                web::resource("/users")
                    .route(web::post().to(add_user))
                    .route(web::get().to(get_users)),
            )
            .service(get_session)
            .service(web::resource("/codes").route(web::post().to(add_tracking_code)))
            .service(
                web::resource("/users/{user_id}/codes").route(web::get().to(get_tracking_codes)),
            )
            .service(web::resource("/codes/{code}").route(web::get().to(get_tracking_code)))
            .default_service(web::to(default_handler))
            .service(index)
    })
    .bind(("0.0.0.0", port))?
    .run();

    println!("Server running at http://{}/", config.server_addr);

    server.await
}
