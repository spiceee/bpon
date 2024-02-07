use barrel::{backend::Pg, types, Migration};

pub fn migration() -> String {
    let mut m = Migration::new().schema("bpon_dev");

    m.create_table("tracking_codes", |t| {
        t.add_column("created_at", types::custom("TIMESTAMPTZ").default("now()"));
        t.add_column("code", types::varchar(13).unique(true).nullable(false)); //NM102246914BR
        t.add_column("user_id", types::custom("BIGSERIAL").nullable(true));
        t.add_foreign_key(&["user_id"], "users", &["id"]);
        t.add_index(
            "code",
            types::index(vec!["code"]).unique(true).nullable(false),
        );
    });

    m.make::<Pg>()
}
