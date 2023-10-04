import { ObjectId } from "mongodb";
import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";

export const validateID = (
  req: Request,
  res: Response,
  next: NextFunction
  ) => {
  console.log("Validating ID", req.params.id);
  if (!(ObjectId.isValid(req.params.id) || ObjectId.isValid(req.body.id))) {
    return res.status(400).json({ msg: "Invalid ID" });
  }
  next();
};
