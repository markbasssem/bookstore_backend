import { NextFunction, Request, Response } from "express";
import { authenticationGuard } from "./authenticationGuard";

export const authorizationGuard = (
  req: Request<{ user: {_id: string, type: string} }, {}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
    // authenticationGuard(req, res, next);
    if(!(req.params.user) || !(req.params.user.type === "Admin")) return res.status(403).send("Invalid role")
    next()
};
