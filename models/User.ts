import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  type: String,
  hashedPass: String,
  money: Number,
  cart: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "books"
  }],
  mobile_no: String,
  email: String,
  photo: String
});

const User = mongoose.model("users", userSchema);

export default User;
