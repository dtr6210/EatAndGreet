const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, trim: true, required: true },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      sparse: true,
    },
    password: { type: String, required: true },
    profilePicture: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);