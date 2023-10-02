import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

export const authenticationGuard = (
  req,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(403).send("no token given");

  try {
    const decoded = verify(token, "key");
    req.params.user = decoded;
    next();
  } catch (e) {
    res.status(400).send("Invalid token");
  }
};
