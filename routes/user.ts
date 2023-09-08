import { Request, Response, Router } from "express";
import { JwtPayload } from "jsonwebtoken";
import { authenticationGuard } from "../middleware/authenticationGuard";
import User from "../models/User";

const user = Router();

user.get(
  "/",
  [authenticationGuard],
  async (
    req: Request<{ user: { _id: string } }, {}, {}, {}>,
    res: Response
  ) => {
    const id = req.params.user._id;

    const user = await User.findById(id).select("-hashedPass");

    res.send(user);
  }
);

export default user;
