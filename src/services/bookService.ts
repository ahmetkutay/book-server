import { queryDatabaseWithTransaction } from "../db/mysqlConf";

interface Book {
  id: number;
  name: string;
  score?: number;
}

/**
 * Retrieves all books from the database.
 *
 * @returns {Promise<Array<{ id: number, name: string }>>} A promise that resolves to an array of book objects, each containing an id and name.
 */
export async function getAllBooks(): Promise<any> {
  const sql = "SELECT id, name FROM Books";

  const result = await queryDatabaseWithTransaction({ sql });

  return result[0].map((book: any) => ({ id: book.id, name: book.name }));
}

/**
 * Creates a new book in the database.
 *
 * @param book - The book object containing the details of the book to be created.
 * @returns Promise<number> - A promise that resolves to the ID of the newly created book.
 * @throws Error - If there is an error creating the book in the database.
 */
export async function createBook(name: string): Promise<{ message: string }> {
  const sql = "INSERT INTO Books (name) VALUES (?)";
  const params = [name];

  await queryDatabaseWithTransaction({ sql, params });

  const result = await queryDatabaseWithTransaction({
    sql: "SELECT id, name FROM Books WHERE name = ?",
    params: [name],
  });

  return result[0][0];
}

/**
 * Retrieves a book from the database based on its ID.
 *
 * @param id - The ID of the book to retrieve.
 * @returns Promise<{ id: number, name: string }> - A promise that resolves to the book object containing the ID and name.
 * @throws Error - If there is an error retrieving the book from the database.
 */
export async function getBookById(id: number): Promise<Book> {
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
    return { id: -1, name: "", score: -1 };
  }
}
