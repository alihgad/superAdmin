import mongoose from "mongoose";

const hardwareSchema = new mongoose.Schema(
  {
    arabic: {
      name: String,
      description: String,
      spec: [
        {
          name: String,
          value: String,
        },
      ],
    },
    english: {
      name: String,
      description: String,
      spec: [
        {
          name: String,
          value: String,
        },
      ],
    },
    enumKey: String,
    image: {
      secure_url: String,
      public_id: String,
    },
    price: Number,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const hardwareModel = mongoose.model("hardware", hardwareSchema);

export default hardwareModel;
