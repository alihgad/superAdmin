import mongoose from "mongoose";

const footerSchema = new mongoose.Schema({
  arabic: {
    title: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
  },
  english: {
    title: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
  },
  link: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
});

const footerModel =
  mongoose.models.footer || mongoose.model("Footer", footerSchema);

export default footerModel;
