use barrel::{backend::Pg, types, Migration};

pub fn migration() -> String {
    let mut m = Migration::new().schema("public");

    m.change_table("tracking_codes", |t| {
        t.add_column("reimbursed", types::boolean().default(false));
        t.add_index("reimbursed", types::index(vec!["reimbursed"]));
    });

    m.make::<Pg>()
}
