import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  type: String,
  hashedPass: String,
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "books"
  }]
});

const User = mongoose.model("users", userSchema);

export default User;
