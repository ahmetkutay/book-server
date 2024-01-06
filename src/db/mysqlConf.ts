import mysql from "mysql2/promise";
import config from "../config/config";

let connection: mysql.Connection | null = null;

const mysqlConfig: mysql.ConnectionOptions = {
  host: config.database.mysql.host,
  port: config.database.mysql.port,
  database: config.database.mysql.database,
  user: config.database.mysql.user,
  password: config.database.mysql.password,
};

export async function connectToMySQL(): Promise<void> {
  connection = await mysql.createConnection(mysqlConfig);
}

export async function queryDatabaseWithTransaction(
  queries: { sql: string; params?: any[] }[]
): Promise<any[]> {
  if (!connection) {
    throw new Error("No active connection");
  }

  const results: any[] = [];

  await connection.beginTransaction();

  try {
    for (const query of queries) {
      const [result] = await connection.query(query.sql, query.params);
      results.push(result);
    }

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  }

  return results;
}

export async function closeMySQLConnection(): Promise<void> {
  if (connection) {
    await connection.end();
    connection = null;
  }
}
