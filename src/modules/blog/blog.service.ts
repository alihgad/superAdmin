import blogModel from "../../db/models/blog";
import { cloudinaryUpload as cloudinary } from "../../middlewares/multer";

export const addBlog = async (req, res, next) => {
  let { text, sections } = req.body;
  let newData = {};
  if (text) newData.text = text;
  if (sections) newData.sections = sections;
  let uploadImage = async () => {
    let { public_id, secure_url } = await cloudinary.uploader
      .upload(req.files.image[0].path, {
        folder: `superAdmin/blogs`,
        resource_type: "image",
      })
      .catch((error) =>
        next(new Error("Image upload failed " + error.message + ""), {
          statusCode: 500,
          message: error.message,
        })
      );

    return {
      public_id: public_id,
      secure_url: secure_url,
    };
  };
  if (req?.files?.image?.length > 0) {
    let image = await uploadImage();
    if (!image) {
      return next(new Error("Image upload failed"), {
        statusCode: 500,
        message: "Image upload failed",
      });
    }
    newData.image = image;
  }
  let newBlog = await blogModel.create(newData);

  return res.status(201).json({
    message: "Blog added successfully",
    blog: newBlog,
  });
};

export const getAllBlogs = async (req, res, next) => {
  let blogs = await blogModel.find({}).select("-__v");
  console.log(blogs);
  if (!blogs || blogs.length === 0) {
    return res.status(404).json({
      message: "No blogs found",
    });
  }

  return res.status(200).json({
    message: "Blogs retrieved successfully",
    blogs,
  });
};

export const getBlog = async (req, res, next) => {
  let { id } = req.params;

  let blog = await blogModel.findById(id).select("-__v");
  if (!blog) {
    return next(new Error("Blog not found"), {
      statusCode: 404,
      message: "Blog not found",
    });
  }

  return res.status(200).json({
    message: "Blog retrieved successfully",
    blog,
  });
};

export const updateBlogSection = async (req, res, next) => {
  let { blogId, sectionId } = req.params;

  let { title, content } = req.body;

  let blog = await blogModel.findById(blogId).select("-__v");
  if (!blog) {
    return next(new Error("Blog not found"), {
      statusCode: 404,
      message: "Blog not found",
    });
  }

  let section = blog.sections.id(sectionId);
  if (!section) {
    return next(new Error("Section not found"), {
      statusCode: 404,
      message: "Section not found",
    });
  }

  if (title.arabic) {
    section.title.arabic = title.arabic;
  }

  if (title.english) {
    section.title.english = title.english;
  }

  if (content.arabic) {
    section.content.arabic = content.arabic;
  }

  if (content.english) {
    section.content.english = content.english;
  }

  await blog.save();

  return res.status(200).json({
    message: "Section updated successfully",
    section,
  });
};

export const addBlogSection = async (req, res, next) => {
  let { blogId } = req.params;

  let { title, content } = req.body;
  console.log(req.body);

  let blog = await blogModel
    .findByIdAndUpdate(
      blogId,
      { $push: { sections: { title, content } } },
      { new: true }
    )
    .select("-__v");
  if (!blog) {
    return next(new Error("Blog not found"), {
      statusCode: 404,
      message: "Blog not found",
    });
  }

  await blog.save();

  return res.status(200).json({
    message: "Section added successfully",
    section: {
      title,
      content,
    },
  });
};

export const updateBlog = async (req, res, next) => {
  let { id } = req.params;
  let { text } = req.body;

  let blogToUpdate = await blogModel.findById(id);
  if (!blogToUpdate) {
    return next(new Error("Blog not found"), {
      statusCode: 404,
      message: "Blog not found",
    });
  }

  if (text) {
    blogToUpdate.text = text;
  }

  if (req?.file) {
    if (blogToUpdate.image?.public_id) {
      await cloudinary.uploader
        .destroy(blogToUpdate.image.public_id, {
          resource_type: "image",
        })
        .catch((error) =>
          next(new Error("Image deletion failed " + error.message + ""), {
            statusCode: 500,
            message: error.message,
          })
        );
    }

    let { public_id, secure_url } = await cloudinary.uploader
      .upload(req.file.path, {
        folder: `superAdmin/blog`,
        resource_type: "image",
      })
      .catch((error) =>
        next(new Error("Image upload failed " + error.message + ""), {
          statusCode: 500,
          message: error.message,
        })
      );

    blogToUpdate.image = {
      public_id: public_id,
      secure_url: secure_url,
    };
  }

  await blogToUpdate.save();
  return res.status(200).json({
    message: "Blog updated successfully",
    blog: blogToUpdate,
  });
};

export const deleteBlog = async (req, res, next) => {
  let { id } = req.params;

  let blogToDelete = await blogModel.findByIdAndDelete(id);
  if (!blogToDelete) {
    return next(new Error("Blog not found"), {
      statusCode: 404,
      message: "Blog not found",
    });
  }

  if (blogToDelete.image?.public_id) {
    await cloudinary.uploader
      .destroy(blogToDelete.image.public_id, {
        resource_type: "image",
      })
      .catch((error) =>
        next(new Error("Image deletion failed " + error.message + ""), {
          statusCode: 500,
          message: error.message,
        })
      );
  }

  return res.status(200).json({
    message: "Blog deleted successfully",
  });
};

export const deleteBlogSection = async (req, res, next) => {
  let { id, sectionId } = req.params;

  let blog = await blogModel.findById(id);
  if (!blog) {
    return next(new Error("Blog not found"), {
      statusCode: 404,
      message: "Blog not found",
    });
  }

  let section = blog.sections.id(sectionId);
  if (!section) {
    return next(new Error("Section not found"), {
      statusCode: 404,
      message: "Section not found",
    });
  }

  if (section.image?.public_id) {
    await cloudinary.uploader
      .destroy(section.image.public_id, {
        resource_type: "image",
      })
      .catch((error) =>
        next(new Error("Image deletion failed " + error.message + ""), {
          statusCode: 500,
          message: error.message,
        })
      );
  }

  section.deleteOne();
  await blog.save();

  return res.status(200).json({
    message: "Section deleted successfully",
  });
};
