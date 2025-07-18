use actix_files::Files;
use actix_web::{
    dev::Server, get, http::StatusCode, web, App, Error, HttpRequest, HttpResponse, HttpServer,
    Responder,
};
use futures::{future::ok, stream::once};
use ssr_rs::Ssr;
use std::cell::RefCell;
use std::fs::read_to_string;
use std::net::TcpListener;

thread_local! {
    static SSR: RefCell<Ssr<'static, 'static>> = RefCell::new(
        Ssr::from(
            read_to_string("./dist/index.js").unwrap(),
            "SSR"
        ).unwrap()
    )
}

pub fn run(listener: TcpListener) -> Result<Server, std::io::Error> {
    Ssr::create_platform();

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

#[get("/")]
async fn index(req: HttpRequest) -> impl Responder {
    let props = format!(
        r##"{{
            "location": "{}",
            "context": {{}}
        }}"##,
        req.uri()
    );

    let response_body = SSR.with(|ssr| ssr.borrow_mut().render_to_string(Some(&props)).unwrap());
    let body = once(ok::<_, Error>(web::Bytes::from(response_body)));

    HttpResponse::build(StatusCode::OK)
        .content_type("text/html; charset=utf-8")
        .streaming(body)
}

async fn health_check() -> impl Responder {
    HttpResponse::Ok().finish()
}
