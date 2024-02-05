ALTER TABLE "bpon_dev"."tracking_codes" ADD CONSTRAINT check_reason check (reason in ('not_authorized', 'other'));
