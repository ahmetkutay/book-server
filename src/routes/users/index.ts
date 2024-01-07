import express from 'express';
import {
  borrowBook,
  createUser,
  getAllUsers,
  getUserById,
  returnBook,
} from "../../services/userService";
import { HTTP_STATUS } from "../../CONSTANTS/httpConstants";

const usersRoute = express.Router();

usersRoute.get("/", async (req, res) => {
  const result = await getAllUsers();
  res.status(HTTP_STATUS.OK).json(result);
});

usersRoute.get("/:id", async (req, res) => {
  const result = await getUserById(parseInt(req.params.id));
  res.status(HTTP_STATUS.OK).json(result);
});

usersRoute.post("/", async (req, res) => {
  const userName = req.body.name;
  const result = await createUser(userName);
  if (!result) {
    res.status(HTTP_STATUS.BAD_REQUEST).json("Name Already Exists");
  }
  res.status(HTTP_STATUS.CREATED).json("Ok");
});

usersRoute.post("/:userId/borrow/:bookId", async (req, res) => {
  const result = await borrowBook(
    parseInt(req.params.userId),
    parseInt(req.params.bookId)
  );
  res.status(HTTP_STATUS.OK).json(result);
});

usersRoute.post("/:userId/return/:bookId", async (req, res) => {
  const bookScore: number = parseInt(req.body.score) || 0;
  const result = await returnBook(
    parseInt(req.params.userId),
    parseInt(req.params.bookId),
    bookScore
  );
  res.status(HTTP_STATUS.OK).json(result);
});

export default usersRoute;
