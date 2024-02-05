use barrel::{backend::Pg, types, Migration};

pub fn migration() -> String {
    let mut m = Migration::new().schema("bpon_dev");

    m.change_table("tracking_codes", |t| {
        t.add_column("reason", types::varchar(100).default("not_authorized"));
        t.add_column("value_in_real", types::custom("numeric(15,6)"));
        t.add_column("date_of_postage", types::datetime());
        t.add_column("country_of_origin", types::varchar(100));
    });

    m.make::<Pg>()
}
