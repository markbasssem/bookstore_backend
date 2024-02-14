import express, { json } from "express";
import books from "./routes/books";
import mongoose from "mongoose";
import authors from "./routes/authors";
import auth from "./routes/auth";
import users from "./routes/users";
import user from "./routes/user";
import { logger } from "./middleware/logger";
import cart from "./routes/cart";
import dotenv from 'dotenv';
dotenv.config();

const CONNECTION = process.env.CONNECTION_STRING

const app = express();

app.use(json({limit: "10mb"}));
app.use(logger);

app.use("/", user);
app.use("/cart", cart);
app.use("/books", books);
app.use("/authors", authors);
app.use("/auth", auth);
app.use("/users", users);

mongoose
  .connect(CONNECTION) 
  .then(() => {
    app.listen(3000, () => console.log("App listening"));
  })
  .catch((err) => {
    console.log(err);
  });
