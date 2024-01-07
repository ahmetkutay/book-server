import { json, urlencoded } from "express";
import winston from "winston";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import config from "./config/config";
import route from "./routes/route";
import { connectToMySQL, closeMySQLConnection } from "./db/mysqlConf";

const app = express();
const port = config.PORT;
const logger = winston.createLogger({
  level: "info", // Log only if info level or higher
  format: winston.format.simple(), // Use simple format
  transports: [new winston.transports.Console()],
});

app.use(
  helmet({
    contentSecurityPolicy: false,
    hsts: { maxAge: 60 * 60 * 24 * 365, includeSubDomains: true },
  })
);

app.use(
  cors({
    origin: "*",
  })
);

app.use(urlencoded({ extended: false }));
app.use(json());

app.use((req, res, next) => {
  res.setHeader("Custom-Header", "application/json");
  next();
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests we got from you, please try again later",
});

app.use(limiter);

app.use("/", route);

const server = app.listen(port, async () => {
  try {
    await connectToMySQL();
    logger.info("Connected to MySQL server");
  } catch (err) {
    logger.error("Error connecting to MySQL server", err);
  }
  logger.info(`Server running at http://localhost:${port}`);
});

process.on("SIGINT", async () => {
  try {
    await closeMySQLConnection();
    logger.info("MySQL connection closed");
  } catch (err) {
    logger.error("Error closing MySQL connection", err);
  }

  server.close((err) => {
    logger.info("Server closed");
    process.exit(err ? 1 : 0);
  });
});
