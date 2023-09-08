import { ObjectId } from "mongodb";
import { Request, Response, NextFunction } from "express";

export const validateID = (req: Request, res: Response, next: NextFunction) => {
  console.log("Validating ID", req.params.id);
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ msg: "Invalid ID" });
  }
  next();
};
