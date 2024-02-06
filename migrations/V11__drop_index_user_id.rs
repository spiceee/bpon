use barrel::{backend::Pg, types, Migration};

pub fn migration() -> String {
    let mut m = Migration::new().schema("bpon_dev");

    m.change_table("tracking_codes", |t| {
        t.drop_index("user_id");
    });

    m.make::<Pg>()
}
