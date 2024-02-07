use barrel::{backend::Pg, types, Migration};

pub fn migration() -> String {
    let mut m = Migration::new().schema("public");

    m.change_table("tracking_codes", |t| {
        t.drop_column("date_of_postage");
        t.add_column("date_of_postage", types::custom("TIMESTAMPTZ"));
    });

    m.make::<Pg>()
}
