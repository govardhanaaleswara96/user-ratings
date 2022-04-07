const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName:{
        type: String,
        required: true,
        trim: true,
      },
    email:{
        type: String,
        required: true,
        trim: true,
      },
  },
  { timestamps: true }
);
// user model
module.exports = mongoose.model("profile", profileSchema);
