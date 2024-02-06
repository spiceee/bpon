INSERT INTO bpon_dev.tracking_codes(code, reason, country_of_origin, date_of_postage, value_in_real, reimbursed, user_id)
VALUES ($1, $2, $3, $4, $5, $6, 1)
RETURNING $table_fields;
