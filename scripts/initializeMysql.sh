#!/bin/bash

source .env



USERNAME=$MYSQL_USER
DATABASE=$MYSQL_DATABASE
PASSWORD=$MYSQL_PASSWORD
SQL_FILE='../src/db/schemas/initializeMysqlDB.sql'

dockerdocker cp '../dump_data.sql' container_id:/dump_data.sql
dockerdocker cp '../src/db/schemas/initializeMysqlDB.sql' container_id:/initializeMysqlDB.sql

docker exec -it container_id /bin/bash -c "mysql -u $USERNAME -p $PASSWORD $DATABASE < /initializeMysqlDB.sql"
docker exec -it container_id /bin/bash -c "mysql -u $USERNAME -p $PASSWORD $DATABASE < /dump_data.sql"
