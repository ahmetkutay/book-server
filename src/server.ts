import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

import config from "./config/config"
import route from "./routes/route"

const app = express();
const port = config.PORT;

app.use(helmet({
  contentSecurityPolicy: false,
  hsts: { maxAge: 60 * 60 * 24 * 365, includeSubDomains: true }
}));

app.use(cors({
  origin: '*'
}));

app.use((req, res, next) => {
  res.setHeader('Custom-Header', 'application/json');
  next();
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests we got from you, please try again later'
});

app.use(limiter);

app.use('/', route);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});