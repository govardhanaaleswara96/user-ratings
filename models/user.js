const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    active: {
      type: Boolean,
      required: true,
      trim: true,
    },
    type:{
      type: Boolean,
      required: true,
      trim: true,
    }
  },
  { timestamps: true }
);
// user model
module.exports = mongoose.model("user", userSchema);
