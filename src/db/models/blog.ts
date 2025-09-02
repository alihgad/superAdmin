import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  image: {
    secure_url: {
      type: String,
    },
    public_id: {
      type: String,
    },
  },
  text: {
    type: String,
    required: true,
  },
  sections: [
    {
      title: {
        arabic: {
          type: String,
        },
        english: {
          type: String,
        },
      },
      content: {
        arabic: [
          {
            type: String,
          },
        ],
        english: [
          {
            type: String,
          },
        ],
      },
    },
  ],
});

const blogModel = mongoose.models.blog || mongoose.model("blog", blogSchema);

export default blogModel;
