INSERT INTO bpon_dev.tracking_codes(reason, country_of_origin, date_of_postage, value_in_real, reimbursed)
VALUES ($1, $2, $3, $4, $5)
RETURNING $table_fields;
