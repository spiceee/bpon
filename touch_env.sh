#!/bin/sh

# Write POSTGRES env vars to .env.production file

# SERVER_ADDR=localhost:8080
# PG.USER=bpon_admin
# PG.PASSWORD=bpon_pass
# PG.HOST=localhost
# PG.PORT=5432
# PG.DBNAME=bpon_dev
# PG.POOL.MAX_SIZE=16

echo 'SERVER_ADDR=localhost:8080' >>.env.production
echo "PG.USER=$PGUSER" >>.env.production
echo "PG.PASSWORD=$POSTGRES_PASSWORD" >>.env.production
echo "PG.HOST=$PGHOST" >>.env.production
echo "PG.PORT=$PGPORT" >>.env.production
echo "PG.DBNAME=$PGDATABASE" >>.env.production
