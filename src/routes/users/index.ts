import express from 'express';

const usersRoute = express.Router();

usersRoute.get('/', (req, res) => {
    res.send('Hello Users!')
})

export default usersRoute;
