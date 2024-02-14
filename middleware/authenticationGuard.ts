import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const authenticationGuard = (
  req,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(403).send("no token given");

  try {
    const decoded = verify(token, "key");
    req.params.user = decoded; //
    req.params.user = req.params.user["user"]; // comment if you want to get the token creation time
    next();
  } catch (e) {
    res.status(400).send("Invalid token");
  }
};
