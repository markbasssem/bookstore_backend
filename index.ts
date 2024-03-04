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
import payment from "./routes/payment";
dotenv.config();

const env = process.env.NODE_ENV || 'dev';
const CONNECTION = env === "dev" ? process.env.CONNECTION_STRING_DEV : process.env.CONNECTION_STRING

const app = express();

app.use(json({ limit: "10mb" }));
app.use(logger);

app.use("/", user);
app.use("/cart", cart);
app.use("/books", books);
app.use("/authors", authors);
app.use("/auth", auth);
app.use("/users", users);
app.use("/payment-sheet", payment)

mongoose
  .connect(CONNECTION)
  .then(() => {
    app.listen(3000, () => console.log(`App listening on ${env} and connected to ${CONNECTION}`));
  })
  .catch((err) => {
    console.log(err);
  });
