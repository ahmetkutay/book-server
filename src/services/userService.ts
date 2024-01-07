import { queryDatabaseWithTransaction } from "../db/mysqlConf";

export async function getAllUsers(): Promise<any[]> {
  const sql = "SELECT * FROM Users";
  const params: any = [];
  const result = await queryDatabaseWithTransaction({ sql, params });
  return result[0];
}

async function checkName(name: string) {
  const nameSql = "SELECT * FROM Users WHERE name = ?";
  const params: any = [name];
  const checkName = await queryDatabaseWithTransaction({
    sql: nameSql,
    params,
  });
  return checkName;
}

export async function createUser(user: string): Promise<any> {
  const sql = "INSERT INTO Users (name) VALUES (?)";
  const params: any = [user];
  const controlName = await checkName(user);
  if (!controlName) {
    const result = await queryDatabaseWithTransaction({ sql, params });
    return result[0];
  }
  return null;
}

export async function getUserById(id: number): Promise<any> {
  const userSql = "SELECT * FROM Users WHERE id = ?";
  const pastBooksSql = `
    SELECT Books.name, Books.score
    FROM ReadBooks
    JOIN Books ON ReadBooks.book_id = Books.id
    WHERE ReadBooks.user_id = ?`;
  const presentBooksSql = `
    SELECT Books.name
    FROM BorrowedBooks
    JOIN Books ON BorrowedBooks.book_id = Books.id
    WHERE BorrowedBooks.user_id = ?`;

  const params: any = [id];

  const userResult = await queryDatabaseWithTransaction({
    sql: userSql,
    params,
  });
  const pastBooksResult = await queryDatabaseWithTransaction({
    sql: pastBooksSql,
    params,
  });
  const presentBooksResult = await queryDatabaseWithTransaction({
    sql: presentBooksSql,
    params,
  });

  return {
    id: userResult[0][0].id,
    name: userResult[0][0].name,
    books: {
      past: pastBooksResult[0].map((book: any) => ({
        name: book.name,
        score: book.score,
      })),
      present: presentBooksResult[0].map((book: any) => ({ name: book.name })),
    },
  };
}

export async function borrowBook(userId: number, bookId: number) {
  const sql = "INSERT INTO BorrowedBooks (user_id, book_id) VALUES (?, ?)";
  const params: any = [userId, bookId];
  const result = await queryDatabaseWithTransaction({ sql, params });
  return result[0];
}

export async function returnBook(
  userId: number,
  bookId: number,
  bookScore: number
) {
  let sql = "DELETE FROM BorrowedBooks WHERE user_id = ? AND book_id = ?";
  let params: any = [userId, bookId];
  await queryDatabaseWithTransaction({ sql, params });

  sql = "UPDATE Books SET score = ? WHERE id = ?";
  params = [bookScore, bookId];
  await queryDatabaseWithTransaction({ sql, params });

  sql = "INSERT INTO ReadBooks (user_id, book_id) VALUES (?, ?)";
  params = [userId, bookId];
  const result = await queryDatabaseWithTransaction({ sql, params });

  return result[0];
}
