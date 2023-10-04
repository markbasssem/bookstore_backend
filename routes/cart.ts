import { Request, Response, Router } from "express";
import { authenticationGuard } from "../middleware/authenticationGuard";
import User from "../models/User";
import { ObjectId } from "mongodb";
import { validateID } from "../middleware/objectIDValidation";

const cart = Router()


cart.get("/cart", [authenticationGuard], async (
    req,
    res: Response
) => {
    const cart = req.params.user.cart
    res.send(cart)
})

cart.post('/:/id', [authenticationGuard, validateID], async (
    req: Request<{ user: { _id: string }, id: ObjectId }, {}, {}, {}>,
    res: Response
) => {
    const id = req.params.user._id;
    const user = await User.findById(id).select("")
    const bookId = req.params.id;
    if (!user.cart.includes(bookId)) {
        user.cart.push(bookId)
        await user.save()
    }
    res.send(user);
})

cart.delete("/:id", [authenticationGuard], async (
    req,
    res: Response
) => {
    const id = req.params.user._id;
    const user = await User.findById(id).select("")
    const bookId = req.params.id;
    if (user.cart.includes(bookId)) {
        const index = user.cart.indexOf(bookId);
        user.cart.splice(index, 1)
        await user.save()
    } res.send(user);

})

export default cart;
