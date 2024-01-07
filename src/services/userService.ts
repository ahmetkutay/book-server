import { queryDatabaseWithTransaction } from "../db/mysqlConf";

/**
 * Retrieves all users from the database.
 *
 * @returns {Promise<any[]>} A promise that resolves to an array of users.
 */
export async function getAllUsers(): Promise<any[]> {
  try {
    const sql = "SELECT id, name FROM Users";
    const params: any = [];
    const result = await queryDatabaseWithTransaction({ sql, params });
    return result;
  } catch (error) {
    console.error("Error retrieving users:", error);
    throw error;
  }
}

/**
 * Creates a new user in the database.
 *
 * @param user - The user object to be created.
 * @returns A Promise that resolves to the created user.
 */
export async function createUser(user: string): Promise<any> {
  const sql = "INSERT IGNORE INTO Users (name) VALUES (?)";
  const params: any = [user];
  const result = await queryDatabaseWithTransaction({ sql, params });
  return result[0];
}

/**
 * Retrieves a user by their ID from the database.
 *
 * @param id - The ID of the user to retrieve.
 * @returns A Promise that resolves to the user object.
 */
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

/**
 * Function to borrow a book.
 *
 * @param sql - The SQL query to retrieve the present books.
 * @param params - The parameters for the SQL query.
 * @returns An object with the ID of the user who borrowed the book.
 */
export async function borrowBook(userId: number, bookId: number) {
  const sql = "INSERT INTO BorrowedBooks (user_id, book_id) VALUES (?, ?)";
  const params: any = [userId, bookId];
  const result = await queryDatabaseWithTransaction({ sql, params });
  return result[0];
}

/**
 * Function to return a book.
 *
 * @param userId - The ID of the user who is returning the book.
 * @param bookId - The ID of the book being returned.
 * @returns An object with the ID of the user who returned the book.
 */
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
