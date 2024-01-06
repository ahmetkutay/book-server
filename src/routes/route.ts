import express from 'express';
import usersRoute from './users/index';
import booksRoute from './books/index';

const router = express.Router();

router.use("/users", usersRoute);
router.use("/books", booksRoute);

router.get('/', (req, res) => {
    res.send('Hello World!')
})

export default router;
