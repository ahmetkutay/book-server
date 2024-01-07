import { queryDatabaseWithTransaction } from "../db/mysqlConf";

export async function createBook(name: string): Promise<any> {
  const sql = "INSERT INTO Books (name) VALUES (?)";
  const params = [name];

  await queryDatabaseWithTransaction({ sql, params });

  return { message: "Book created successfully." };
}

export async function getAllBooks(): Promise<any> {
  const sql = "SELECT id, name FROM Books";

  const result = await queryDatabaseWithTransaction({ sql });

  return result[0].map((book: any) => ({ id: book.id, name: book.name }));
}

export async function getBookById(id: number): Promise<any> {
  const sql =
    "SELECT id, name, IFNULL(score, -1) as score FROM Books WHERE id = ?";
  const params = [id];

  const result = await queryDatabaseWithTransaction({ sql, params });

  if (result[0].length > 0) {
    return {
      id: result[0][0].id,
      name: result[0][0].name,
      score: result[0][0].score,
    };
  } else {
    throw new Error("Book not found.");
  }
}
