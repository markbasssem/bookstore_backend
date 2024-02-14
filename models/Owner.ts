import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema({
  username: String,
  hashedPass: String,
  sellers: Number
});

const Owner = mongoose.model("owners", ownerSchema);

export default Owner;
