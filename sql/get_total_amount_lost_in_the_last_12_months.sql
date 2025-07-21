SELECT SUM(value_in_real) AS total_value_not_reimbursed
FROM tracking_codes
WHERE reimbursed = false;
