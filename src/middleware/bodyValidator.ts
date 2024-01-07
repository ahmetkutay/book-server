import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";
import { HTTP_STATUS } from "../CONSTANTS/httpConstants";

export const validateBook = [
  check("name").notEmpty().withMessage("Name is required"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ errors: errors.array() });
    }
    next();
  },
];

export const validateScore = [
  check("score").isNumeric().withMessage("Score must be a number"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateUser = [
  check("name").notEmpty().withMessage("Name is required"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ errors: errors.array() });
    }
    next();
  },
];
