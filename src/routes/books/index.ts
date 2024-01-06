import express from 'express';

const booksRoute = express.Router();

booksRoute.get('/books', (req, res) => {
    res.send('Hello Books!')
})

export default booksRoute;
