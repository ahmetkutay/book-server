#!/bin/bash

source .env

USERNAME=$MYSQL_USER
DATABASE=$MYSQL_DATABASE
SQL_FILE='../db/schemas/initializeMysqlDB.sql'

mysql -u $USERNAME -p $DATABASE < $SQL_FILE