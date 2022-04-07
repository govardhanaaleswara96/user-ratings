const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const performanceSchema = new Schema(
  {
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    year: {
      type: String,
      required: true,
      trim: true,
    },
    rating:{
        type: String,
        required: true,
        trim: true,
      },
  },
  { timestamps: true }
);
// user model
module.exports = mongoose.model("performance", performanceSchema);
