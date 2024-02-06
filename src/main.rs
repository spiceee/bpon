#![allow(unused_imports)]
use actix_files::{Files, NamedFile};
use actix_session::{storage::SessionStore, Session, SessionMiddleware};
use actix_web::{
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

/// simple index handler
#[get("/welcome")]
async fn welcome(req: HttpRequest, session: Session) -> Result<HttpResponse> {
    println!("{req:?}");

    // session
    let mut counter = 1;
    if let Some(count) = session.get::<i32>("counter")? {
        println!("SESSION value: {count}");
        counter = count + 1;
    }

    // set counter to session
    session.insert("counter", counter)?;

    // response
    Ok(HttpResponse::build(StatusCode::OK)
        .content_type(ContentType::plaintext())
        .body(include_str!("../static/welcome.html")))
}

#[get("/")]
async fn index(
    req: HttpRequest,
    data: web::Data<AppState>,
    session: Session,
) -> Result<HttpResponse> {
    let props = format!(
        r##"{{
            "location": "{}",
            "context": {{}}
        }}"##,
        req.uri()
    );

    let mut counter = 1;
    if let Some(count) = session.get::<i32>("counter")? {
        println!("SESSION value: {count}");
        counter = count + 1;
    }

    // set counter to session
    session.insert("counter", counter)?;

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
    use serde::{Deserialize, Serialize};
    use tokio_pg_mapper_derive::PostgresMapper;

    #[derive(Deserialize, PostgresMapper, Serialize, Clone)]
    #[pg_mapper(table = "tracking_codes")]
    pub struct TrackingCode {
        pub code: String,
        pub reason: String,
        pub created_at: DateTime<Utc>,
        pub updated_at: DateTime<Utc>,
        pub user_id: i32,
        pub country_of_origin: String,
        pub date_of_postage: DateTime<Utc>,
        pub value_in_real: f64,
        pub reimbursed: bool,
        pub cf_challenge: String,
    }

    #[derive(Deserialize, PostgresMapper, Serialize, Clone)]
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
    ) -> Result<User, MyError> {
        let _stmt = include_str!("../sql/add_tracking_code.sql");
        let _stmt = _stmt.replace("$table_fields", &TrackingCode::sql_table_fields());
        let stmt = client.prepare(&_stmt).await.unwrap();

        client
            .query(
                &stmt,
                &[
                    &code_info.reason,
                    &code_info.country_of_origin,
                    &code_info.date_of_postage,
                    &code_info.value_in_real,
                    &code_info.reimbursed,
                ],
            )
            .await?
            .iter()
            .map(|row| User::from_row_ref(row).unwrap())
            .collect::<Vec<User>>()
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
}

mod handlers {
    use crate::{
        db,
        errors::MyError,
        models::{TrackingCode, User, UserProfile},
    };
    use actix_web::{web, Error, HttpResponse};
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
        code: web::Json<TrackingCode>,
        db_pool: web::Data<Pool>,
    ) -> Result<HttpResponse, Error> {
        let code_info: TrackingCode = code.into_inner();

        let captcha_secret = env::var("PRIVATE_CATPCHA_SECRET").expect("Missing secret");
        let client = TurnstileClient::new(captcha_secret.to_string().into());
        let _validated = client
            .siteverify(SiteVerifyRequest {
                response: "myresponse".to_string(),
                ..Default::default()
            })
            .await;
        println!("{_validated:?}");

        let client: Client = db_pool.get().await.map_err(MyError::PoolError)?;

        let new_user = db::add_tracking_code(&client, code_info).await?;

        Ok(HttpResponse::Ok().json(new_user))
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

/// response body
async fn response_body(path: web::Path<String>) -> HttpResponse {
    let name = path.into_inner();

    HttpResponse::Ok()
        .content_type(ContentType::plaintext())
        .streaming(stream! {
            yield Ok::<_, Infallible>(web::Bytes::from("Hello "));
            yield Ok::<_, Infallible>(web::Bytes::from(name));
            yield Ok::<_, Infallible>(web::Bytes::from("!"));
        })
}

use crate::config::ExampleConfig;
use ::config::Config;
use dotenvy::dotenv;
use handlers::{add_tracking_code, add_user, get_tracking_codes, get_users};
use std::env;
use std::fs::read_to_string;
use std::sync::Mutex;
use tokio_postgres::NoTls;

struct AppState {
    js_source: Mutex<String>, // <- Mutex is necessary to mutate safely across threads
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

    let migration_report = embedded::migrations::runner()
        .run_async(client.deref_mut())
        .await
        .unwrap();

    println!("migration_report {:#?}", migration_report);
    //
    let server = HttpServer::new(move || {
        App::new()
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
            .service(web::resource("/codes").route(web::post().to(add_tracking_code)))
            // .service(
            //     web::resource("/").route(web::get().to(|req: HttpRequest| async move {
            //         println!("{req:?}");
            //         HttpResponse::Found()
            //             .insert_header((header::LOCATION, "static/welcome.html"))
            //             .finish()
            //     })),
            // )
            // .service(welcome)
            .service(web::resource("/async-body/{name}").route(web::get().to(response_body)))
            .service(
                web::resource("/users/{user_id}/codes").route(web::get().to(get_tracking_codes)),
            )
            .default_service(web::to(default_handler))
            .service(index)
    })
    .bind(("0.0.0.0", port))?
    .run();

    println!("Server running at http://{}/", config.server_addr);

    server.await
}
