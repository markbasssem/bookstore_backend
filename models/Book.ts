
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: String,
  rating: Number,
  pages: Number,
  image: String,
  author: {
    type: ObjectId,
    ref: "authors"
  },
  price: Number
});

const Book = mongoose.model("books", bookSchema);

export default Book; 
