DROP SCHEMA IF EXISTS bpon_dev CASCADE;
CREATE SCHEMA bpon_dev;

CREATE TABLE bpon_dev.users (
	id  BIGSERIAL PRIMARY KEY,
	email       VARCHAR(200) NOT NULL,
	first_name  VARCHAR(200) NOT NULL,
	last_name   VARCHAR(200) NOT NULL,
	username    VARCHAR(50) UNIQUE NOT NULL,
	UNIQUE (username)
);
