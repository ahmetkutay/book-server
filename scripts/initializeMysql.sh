#!/bin/bash

source .env



USERNAME=$MYSQL_USER
DATABASE=$MYSQL_DATABASE
PASSWORD=$MYSQL_PASSWORD
SQL_FILE='../src/db/schemas/initializeMysqlDB.sql'
CONTAINER_ID=$(docker ps -q -f "name=bookserver-mysql-1")

docker cp '../dump_data.sql' $CONTAINER_ID:/dump_data.sql
docker cp '../src/db/schemas/initializeMysqlDB.sql' $CONTAINER_ID:/initializeMysqlDB.sql

docker exec -it $CONTAINER_ID /bin/bash -c "mysql -u $USERNAME -p$PASSWORD $DATABASE < /initializeMysqlDB.sql"
docker exec -it $CONTAINER_ID /bin/bash -c "mysql -u $USERNAME -p$PASSWORD $DATABASE < /dump_data.sql"
