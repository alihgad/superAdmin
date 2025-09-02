import mongoose from "mongoose";

const lecinceSchema = new mongoose.Schema({
  name: {
    arabic: {
      type: String,
    },
    english: {
      type: String,
    },
  },
  enumKey: String,
  price: Number,
  isActive: {
    type: Boolean,
    default: true,
  },
});

const lecinceModel = mongoose.model("lecince", lecinceSchema);

export default lecinceModel;
