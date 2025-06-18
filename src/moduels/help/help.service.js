import helpModel from "../../DB/models/help.js";
import cloudinary from "../../middelWares/cloudinary.js";

export const addArticle = async (req, res, next) => {
    let { article, title, content, steps } = req.body;
    console.log(req.files);



    if (!article || !title || !content || !steps) {
        return res.status(400).json({
            message: "All fields are required",
            fields: ["article", "title", "content", "steps"]
        });
    }

    if (req.files.image.length === 0 || req.files.vedio.length === 0) {
        return next(new Error("Image and video are required"), {
            statusCode: 400,
            message: "Image and video are required"
        });
    }

    if (typeof article !== "string" || typeof title !== "string" || typeof content !== "string") {
        return next(new Error("Article, title and content must be strings"), {
            statusCode: 400,
            message: "Article, title and content must be strings"
        });
    }

    if (typeof steps === "string") {
        steps = steps.split(",");
        steps = steps.map(step => step.trim());
    }

    if (!Array.isArray(steps)) {
        return next(new Error("Steps must be an array"), {
            statusCode: 400,
            message: "Steps must be an array"
        });
    }

    let uploadImage = async () => {
        let { public_id, secure_url } = await cloudinary.uploader.upload(req.files.image[0].path, {
            folder: `superAdmin/help/articles/${article}`,
            resource_type: "image"
        }).catch((error) => next(new Error("Image upload failed " + error.message + ""), {
            statusCode: 500,
            message: error.message
        }));

        return {
            public_id: public_id,
            secure_url: secure_url
        };
    }

    let image = await uploadImage();
    if (!image) {
        return next(new Error("Image upload failed"), {
            statusCode: 500,
            message: "Image upload failed"
        });
    }

    let uploadVedio = async () => {


        let { public_id, secure_url } = await cloudinary.uploader.upload(req.files.vedio[0].path, {
            folder: `superAdmin/help/articles/${article}`,
            resource_type: "video"
        }).catch((error) => next(new Error("Vedio upload failed " + error.message + ""), 500));

        return {
            public_id: public_id,
            secure_url: secure_url
        };
    }

    let vedio = await uploadVedio();
    if (!vedio) {

        next(new Error("Vedio upload failed"), {
            statusCode: 500,
            message: "Vedio upload failed"
        });
    }
    // uploaded
    let newArticle = await helpModel.create({
        article,
        title,
        content,
        steps,
        image,
        vedio
    });

    return res.status(201).json({
        message: "Article added successfully",
        article: newArticle
    });


}


export const getAllArticles = async (req, res, next) => {
    let articles = await helpModel.find({})
    if (!articles || articles.length === 0) {
        return res.status(404).json({
            message: "No articles found"
        });
    }

    return res.status(200).json({
        message: "Articles retrieved successfully",
        articles
    });
}


export const getArticle = async (req, res, next) => {
    let { articleName } = req.params;
    if (!articleName || typeof articleName !== "string") {
        return next(new Error("Article iname is required"), {
            statusCode: 400,
            message: "Article name is required"
        });
    }

    articleName = articleName.toLowerCase().trim();
    if (articleName.length < 3) {
        return next(new Error("Article name must be at least 3 characters long"), {
            statusCode: 400,
            message: "Article name must be at least 3 characters long"
        });
    }


    let article = await helpModel.findOne({ article: articleName }).select("-__v -createdAt -updatedAt");
    if (!article) {
        return next(new Error("Article not found"), {
            statusCode: 404,
            message: "Article not found"
        });
    }

    return res.status(200).json({
        message: "Article retrieved successfully",
        article
    });
}

export const updateArticle = async (req, res, next) => {
    let { articleName } = req.params;
    if (!articleName || typeof articleName !== "string") {
        return next(new Error("Article name is required"), {
            statusCode: 400,
            message: "Article name is required"
        });
    }

    articleName = articleName.toLowerCase().trim();
    let { title, content, steps } = req.body;
    if (!title && !content && !steps) {
        return next(new Error("All fields are required"), {
            statusCode: 400,
            message: "one of the fields are required"
        });
    }
    if (steps && typeof steps === "string") {
        steps = steps.split(",");
        steps = steps.map(step => step.trim());
    }
    if (steps && !Array.isArray(steps)) {
        return next(new Error("Steps must be an array"), {
            statusCode: 400,
            message: "Steps must be an array"
        });
    }
    if (title && typeof title !== "string" || content && typeof content !== "string") {
        return next(new Error(" must be strings"), {
            statusCode: 400,
            message: " must be strings"
        });
    }
    if (title?.length < 3 || content?.length < 3) {
        return next(new Error(" title and content must be at least 3 characters long"), {
            statusCode: 400,
            message: " title and content must be at least 3 characters long"
        });
    }

    let articleToUpdate = await helpModel.findOne({ article: articleName });
    if (!articleToUpdate) {
        return next(new Error("Article not found"), {
            statusCode: 404,
            message: "Article not found"
        });
    }

    articleToUpdate.title = title ? title : articleToUpdate.title;
    articleToUpdate.content = content ? content : articleToUpdate.content;
    articleToUpdate.steps = steps ? steps : articleToUpdate.steps;
    await articleToUpdate.save();
    return res.status(200).json({
        message: "Article updated successfully",
        article: articleToUpdate
    });
}


export const updateImage = async (req, res, next) => {
    let { articleName } = req.params;
    if (!articleName || typeof articleName !== "string") {
        return next(new Error("Article name is required"), {
            statusCode: 400,
            message: "Article name is required"
        });
    }

    if (!req.file) {
        return next(new Error("Image is required"), {
            statusCode: 400,
            message: "Image is required"
        });
    }

    articleName = articleName.toLowerCase().trim();

    let articleToUpdate = await helpModel.findOne({ article: articleName });
    if (!articleToUpdate) {
        return next(new Error("Article not found"), {
            statusCode: 404,
            message: "Article not found"
        });
    }

    await cloudinary.uploader.destroy(articleToUpdate.image.public_id, {
        resource_type: "image"
    }).catch((error) => next(new Error("Image deletion failed " + error.message + ""), {
        statusCode: 500,
        message: error.message
    }));

    let { public_id, secure_url } = await cloudinary.uploader.upload(req.file.path, {
        folder: `superAdmin/help/articles/${articleName}`,
        resource_type: "image"
    }).catch((error) => next(new Error("Image upload failed " + error.message + ""), {
        statusCode: 500,
        message: error.message
    }))

    

    articleToUpdate.image = {
        public_id: public_id,
        secure_url: secure_url
    }
    await articleToUpdate.save();
    return res.status(200).json({
        message: "Image updated successfully",
        article: articleToUpdate
    });
}

export const updateVedio = async (req, res, next) => {
    let { articleName } = req.params;
    if (!articleName || typeof articleName !== "string") {
        return next(new Error("Article name is required"), {
            statusCode: 400,
            message: "Article name is required"
        });
    }

    if (!req.file) {
        return next(new Error("vedio is required"), {
            statusCode: 400,
            message: "vedio is required"
        });
    }

    articleName = articleName.toLowerCase().trim();

    let articleToUpdate = await helpModel.findOne({ article: articleName });
    if (!articleToUpdate) {
        return next(new Error("Article not found"), {
            statusCode: 404,
            message: "Article not found"
        });
    }

    await cloudinary.uploader.destroy(articleToUpdate.vedio.public_id, {
        resource_type: "vedio"
    }).catch((error) => next(new Error("vedio deletion failed " + error.message + ""), {
        statusCode: 500,
        message: error.message
    }));

    let { public_id, secure_url } = await cloudinary.uploader.upload(req.file.path, {
        folder: `superAdmin/help/articles/${articleName}`,
        resource_type: "vedio"
    }).catch((error) => next(new Error("vedio upload failed " + error.message + ""), {
        statusCode: 500,
        message: error.message
    }))

    

    articleToUpdate.vedio = {
        public_id: public_id,
        secure_url: secure_url
    }
    await articleToUpdate.save();
    return res.status(200).json({
        message: "vedio updated successfully",
        article: articleToUpdate
    });
}


export const deleteArticle = async (req, res, next) => {
    let { articleName } = req.params;
    if (!articleName || typeof articleName !== "string") {
        return next(new Error("Article name is required"), {
            statusCode: 400,
            message: "Article name is required"
        });
    }

    articleName = articleName.toLowerCase().trim();

    let articleToDelete = await helpModel.findOne({ article: articleName });
    if (!articleToDelete) {
        return next(new Error("Article not found"), {
            statusCode: 404,
            message: "Article not found"
        });
    }

    await cloudinary.uploader.destroy(articleToDelete.image.public_id, {
        resource_type: "image"
    }).catch((error) => next(new Error("Image deletion failed " + error.message + ""), {
        statusCode: 500,
        message: error.message
    }));

    await cloudinary.uploader.destroy(articleToDelete.vedio.public_id, {
        resource_type: "vedio"
    }).catch((error) => next(new Error("vedio deletion failed " + error.message + ""), {
        statusCode: 500,
        message: error.message
    }));

    await articleToDelete.remove();
    return res.status(200).json({
        message: "Article deleted successfully"
    });
}
    

