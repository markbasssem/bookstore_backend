import { NextFunction, Request, Response } from "express";

export const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log("Got request", req.method, req.originalUrl);
  next();
};
