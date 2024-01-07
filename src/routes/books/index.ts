import express from 'express';
import {
  createBook,
  getAllBooks,
  getBookById,
} from "../../services/bookService";
import { HTTP_STATUS } from "../../CONSTANTS/httpConstants";

const booksRoute = express.Router();

booksRoute.get("/", async (req, res) => {
  const allBooks = await getAllBooks();
  res.status(HTTP_STATUS.OK).json(allBooks);
});

booksRoute.get("/:id", async (req, res) => {
  const result = await getBookById(parseInt(req.params.id));
  res.status(HTTP_STATUS.OK).json(result);
});

booksRoute.post("/", async (req, res) => {
  const bookName = req.body.name;
  const result = await createBook(bookName);
  if (!result) {
    res.status(HTTP_STATUS.BAD_REQUEST).json("Book Already Exists");
  }
  res.status(HTTP_STATUS.CREATED).json("Ok");
});

export default booksRoute;
