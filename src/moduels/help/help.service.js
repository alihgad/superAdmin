import helpModel from "../../DB/models/help.js";
import { cloudinaryUpload as cloudinary } from "../../middelWares/multer.js";

export const addArticle = async (req, res, next) => {
    let { article, arabic, english } = req.body;

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

    let newArticle = await helpModel.create({
        article,
        arabic,
        english,
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

    articleName = articleName.trim();



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
    let { id } = req.params;
    let { arabic, english } = req.body;


    let articleToUpdate = await helpModel.findById(id);
    if (!articleToUpdate) {
        return next(new Error("Article not found"), {
            statusCode: 404,
            message: "Article not found"
        });
    }

    if (arabic?.title && english?.title) {
        articleToUpdate.arabic.title = arabic.title
        articleToUpdate.english.title = english.title
    }

    if (arabic?.content && english?.content) {
        articleToUpdate.arabic.content = arabic.content
        articleToUpdate.english.content = english.content
    }

    if (arabic?.steps && english?.steps) {
        articleToUpdate.arabic.steps = arabic.steps
        articleToUpdate.english.steps = english.steps
    }


    if (req.files?.image?.length > 0) {
        if (articleToUpdate.image?.public_id) {
            await cloudinary.uploader.destroy(articleToUpdate.image.public_id, {
                resource_type: "image"
            }).catch((error) => next(new Error("Image deletion failed " + error.message + ""), {
                statusCode: 500,
                message: error.message
            }));
        }


        let { public_id, secure_url } = await cloudinary.uploader.upload(req.file.path, {
            folder: `superAdmin/help/articles/${articleToUpdate.article}`,
            resource_type: "image"
        }).catch((error) => next(new Error("Image upload failed " + error.message + ""), {
            statusCode: 500,
            message: error.message
        }))

        articleToUpdate.image = {
            public_id: public_id,
            secure_url: secure_url
        }
    }

    if (req.files?.vedio?.length > 0) {
        if (articleToUpdate.vedio?.public_id) {
            await cloudinary.uploader.destroy(articleToUpdate.vedio.public_id, {
                resource_type: "vedio"
            }).catch((error) => next(new Error("vedio deletion failed " + error.message + ""), {
                statusCode: 500,
                message: error.message
            }));
        }

        let { public_id, secure_url } = await cloudinary.uploader.upload(req.file.path, {
            folder: `superAdmin/help/articles/${articleToUpdate.article}`,
            resource_type: "vedio"
        }).catch((error) => next(new Error("vedio upload failed " + error.message + ""), {
            statusCode: 500,
            message: error.message
        }))

        articleToUpdate.vedio = {
            public_id: public_id,
            secure_url: secure_url
        }
    }


    await articleToUpdate.save();
    return res.status(200).json({
        message: "Article updated successfully",
        article: articleToUpdate
    });
}


export const deleteArticle = async (req, res, next) => {
    let { id } = req.params;
    

    let articleToDelete = await helpModel.findByIdAndDelete(id);
    if (!articleToDelete) {
        return next(new Error("Article not found"), {
            statusCode: 404,
            message: "Article not found"
        });
    }

    if(articleToDelete.image?.public_id){
        await cloudinary.uploader.destroy(articleToDelete.image.public_id, {
            resource_type: "image"
        }).catch((error) => next(new Error("Image deletion failed " + error.message + ""), {
            statusCode: 500,
            message: error.message
        }));
    }

    if(articleToDelete.vedio?.public_id){
        await cloudinary.uploader.destroy(articleToDelete.vedio.public_id, {
            resource_type: "vedio"
        }).catch((error) => next(new Error("vedio deletion failed " + error.message + ""), {
            statusCode: 500,
            message: error.message
        }));
    }

    return res.status(200).json({
        message: "Article deleted successfully"
    });
}


