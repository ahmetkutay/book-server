#!/bin/bash

# Check if Docker is running
if ! docker info >/dev/null 2>&1; then
    echo "Docker does not seem to be running, start Docker before running this script."
    exit 1
fi

source ../.env

USERNAME=$MYSQL_USER
DATABASE=$MYSQL_DATABASE
PASSWORD=$MYSQL_PASSWORD
SQL_FILE='../src/db/schemas/initializeMysqlDB.sql'
CONTAINER_ID=$(docker ps -q -f "name=book-server-mysql-1")

# Check if the MySQL container is running
if [ -z "$CONTAINER_ID" ]; then
    echo "MySQL container does not seem to be running, start the MySQL container before running this script."
    exit 1
fi

docker cp '../dump_data.sql' $CONTAINER_ID:/dump_data.sql
docker cp '../src/db/schemas/initializeMysqlDB.sql' $CONTAINER_ID:/initializeMysqlDB.sql

docker exec $CONTAINER_ID sh -c "mysql -u $USERNAME -p$PASSWORD $DATABASE < /initializeMysqlDB.sql"
docker exec $CONTAINER_ID sh -c "mysql -u $USERNAME -p$PASSWORD $DATABASE < /dump_data.sql"