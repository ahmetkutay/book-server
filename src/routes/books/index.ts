import { validateBook } from "../../middleware/bodyValidator";
import express, { Request, Response } from "express";
import {
  createBook,
  getAllBooks,
  getBookById,
} from "../../services/bookService";
import { HTTP_STATUS } from "../../CONSTANTS/httpConstants";

const booksRoute = express.Router();

booksRoute.get("/", async (req, res) => {
  try {
    const allBooks = await getAllBooks();
    res.status(HTTP_STATUS.OK).json(allBooks);
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json("Internal Server Error");
  }
});

booksRoute.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(HTTP_STATUS.BAD_REQUEST).json("Invalid ID");
      return;
    }
    const result = await getBookById(id);
    res.status(HTTP_STATUS.OK).json(result);
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json("Internal Server Error");
  }
});

booksRoute.post("/", validateBook, async (req: Request, res: Response) => {
  try {
    const bookName = req.body.name;
    const result = await createBook(bookName);
    if (!result) {
      res.status(HTTP_STATUS.BAD_REQUEST).json("Book Already Exists");
    }
    res.status(HTTP_STATUS.CREATED).json("Ok");
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json("Internal Server Error");
  }
});

export default booksRoute;
