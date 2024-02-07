use barrel::{backend::Pg, types, Migration};

pub fn migration() -> String {
    let mut m = Migration::new().schema("railway");

    m.change_table("tracking_codes", |t| {
        t.add_column("updated_at", types::custom("TIMESTAMPTZ").default("now()"));
        t.add_index("user_id", types::index(vec!["user_id"]));
    });

    m.make::<Pg>()
}
