import { Request, Response, Router } from "express";
import { JwtPayload } from "jsonwebtoken";
import { authenticationGuard } from "../middleware/authenticationGuard";
import User from "../models/User";
import Book from "../models/Book";
import { ObjectId } from "mongodb";
import { validateID } from "../middleware/objectIDValidation";

const user = Router();

user.get(
  "/",
  [authenticationGuard],
  async (
    req: Request<{ user: { _id: string } }, {}, {}, {}>,
    res: Response
  ) => {
    const id = req.params.user._id;

    const user = await User.findById(id).select("-hashedPass -__v -_id");

    res.send(user);
  }
);

user.get('/wishlist/:id', [authenticationGuard, validateID], async (
  req: Request<{ user: { _id: string }, id: ObjectId }, {}, {}, {}>,
  res: Response
) => {
  const id = req.params.user._id;
  const user = await User.findById(id).select("")
  const bookId = req.params.id;
  if (!user.wishlist.includes(bookId)) {
    user.wishlist.push(bookId)
    await user.save()
  }
  res.send(user);
})

export default user;
