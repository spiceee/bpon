use barrel::{backend::Pg, types, Migration};

pub fn migration() -> String {
    let mut m = Migration::new().schema("public");

    m.create_table("posts", |t| {
        t.add_column("title", types::varchar(255).nullable(true));
        t.add_column("summary", types::varchar(255).nullable(true));
        t.add_column("body", types::text().nullable(true));
        t.add_column("status", types::varchar(100).default("draft"));
        t.add_column("user_id", types::custom("BIGSERIAL").nullable(true));
        t.add_column("published_at", types::custom("TIMESTAMPTZ").nullable(true));
        t.add_column("created_at", types::custom("TIMESTAMPTZ").default("now()"));
        t.add_column("updated_at", types::custom("TIMESTAMPTZ").default("now()"));
        t.add_index("user_id", types::index(vec!["user_id"]));
        t.add_index("status", types::index(vec!["status"]));
    });

    m.make::<Pg>()
}
