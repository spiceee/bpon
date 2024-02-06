#!/bin/sh

# Write POSTGRES env vars to .env.production file

# SERVER_ADDR=localhost:8080
# PG.USER=bpon_admin
# PG.PASSWORD=bpon_pass
# PG.HOST=localhost
# PG.PORT=5432
# PG.DBNAME=bpon_dev
# PG.POOL.MAX_SIZE=16

echo 'SERVER_ADDR=localhost:8080' >>'.env'
echo "PG.USER=$PGUSER" >>'.env'
echo "PG.PASSWORD=$POSTGRES_PASSWORD" >>'.env'
echo "PG.HOST=$PGHOST" >>'.env'
echo "PG.PORT=$PGPORT" >>'.env'
echo "PG.DBNAME=$PGDATABASE" >>'.env'
