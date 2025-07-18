use actix_files::Files;
use actix_web::{
    dev::Server, get, http::StatusCode, web, App, HttpRequest, HttpResponse, HttpServer, Responder,
};
use ssr_rs::Ssr;
use std::cell::RefCell;
use std::fs::read_to_string;
use std::net::TcpListener;

pub fn run(listener: TcpListener) -> Result<Server, std::io::Error> {
    let server = HttpServer::new(move || {
        App::new()
            .service(Files::new("/styles", "./dist/styles/").show_files_listing())
            .service(Files::new("/images", "./dist/images/").show_files_listing())
            .service(Files::new("/scripts", "./dist/scripts/").show_files_listing())
            .route("/health_check", web::get().to(health_check))
            .service(index)
    })
    .listen(listener)?
    .run();
    Ok(server)
}

thread_local! {
   static SSR: RefCell<Ssr<'static, 'static>> = RefCell::new(
       Ssr::from(
           read_to_string("./dist/index.js").unwrap(),
           "SSR"
           ).unwrap()
   )
}

#[get("/")]
async fn index(req: HttpRequest) -> impl Responder {
    let props = format!(
        r##"{{
            "location": "{}",
            "context": {{}}
        }}"##,
        req.uri()
    );

    HttpResponse::build(StatusCode::OK)
        .content_type("text/html; charset=utf-8")
        .body(SSR.with(|ssr| ssr.borrow_mut().render_to_string(Some(&props)).unwrap()))
}

async fn health_check() -> impl Responder {
    HttpResponse::Ok().finish()
}
