import { Sequelize } from "sequelize";
import config from "../config/config";

const MysqlCred = {
  hostname: config.database.mysql.host,
  port: config.database.mysql.port,
  database: config.database.mysql.database || "mydb",
  username: config.database.mysql.user,
  password: config.database.mysql.password,
};

const sequelize = new Sequelize(
  MysqlCred.database!,
  MysqlCred.username!,
  MysqlCred.password,
  {
    host: "mysql",
    dialect: "mysql",
  }
);

export async function connectToMySQL(): Promise<void> {
  await sequelize.authenticate();
}

export async function queryDatabaseWithTransaction(query: {
  sql: string;
  params?: any[];
}): Promise<any[]> {
  let result: any;

  await sequelize.transaction(async (t) => {
    result = await sequelize.query(query.sql, {
      replacements: query.params,
      transaction: t,
    });
  });
  return result;
}

export async function closeMySQLConnection(): Promise<void> {
  await sequelize.close();
}
