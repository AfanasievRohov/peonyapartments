import { Request, Response, NextFunction } from "express"
import ApiError from "../exceptions/api-error";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      message: err.message,
      errors: err.errors,
      stack: err.stack
    });
  }

  return res.status(500).json({
    error: err.message,
    stack: err.stack
  });
}
