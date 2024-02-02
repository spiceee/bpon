use barrel::{backend::Pg, types, Migration};

pub fn migration() -> String {
    let mut m = Migration::new().schema("bpon_dev");

    m.change_table("users", |t| {
        t.drop_column("created_at");
        t.drop_column("updated_at");
        t.add_column("created_at", types::custom("TIMESTAMPTZ").default("now()"));
        t.add_column("updated_at", types::custom("TIMESTAMPTZ").default("now()"));
    });

    m.make::<Pg>()
}
