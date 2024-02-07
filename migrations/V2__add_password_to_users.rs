use barrel::{backend::Pg, types, Migration};

pub fn migration() -> String {
    let mut m = Migration::new().schema("public");

    m.change_table("users", |t| {
        t.add_column("encrypted_password", types::varchar(255).nullable(true));
        t.add_column("is_admin", types::boolean().default(false));
        t.add_column("is_newsletter_subscriber", types::boolean().default(false));
        t.add_column("created_at", types::datetime().default("now()"));
        t.add_column("updated_at", types::datetime().default("now()"));
    });

    m.make::<Pg>()
}
