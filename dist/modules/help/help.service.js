"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteArticle = exports.updateArticle = exports.getArticle = exports.getAllArticles = exports.addArticle = void 0;
const help_js_1 = require("../../db/models/help.js");
const multer_js_1 = require("../../middlewares/multer.js");
const addArticle = async (req, res, next) => {
    let { article, arabic, english } = req.body;
    let uploadImage = async () => {
        let { public_id, secure_url } = await multer_js_1.cloudinaryUpload.uploader.upload(req.files.image[0].path, {
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
    };
    let uploadCover = async () => {
        let { public_id, secure_url } = await multer_js_1.cloudinaryUpload.uploader.upload(req.files.cover[0].path, {
            folder: `superAdmin/help/articles/${article}`,
            resource_type: "image"
        }).catch((error) => next(new Error("Cover upload failed " + error.message + ""), {
            statusCode: 500,
            message: error.message
        }));
        return {
            public_id: public_id,
            secure_url: secure_url
        };
    };
    let image = await uploadImage();
    if (!image) {
        return next(new Error("Image upload failed"), {
            statusCode: 500,
            message: "Image upload failed"
        });
    }
    let cover = await uploadCover();
    if (!cover) {
        return next(new Error("Cover upload failed"), {
            statusCode: 500,
            message: "Cover upload failed"
        });
    }
    let uploadVedio = async () => {
        let { public_id, secure_url } = await multer_js_1.cloudinaryUpload.uploader.upload(req.files.vedio[0].path, {
            folder: `superAdmin/help/articles/${article}`,
            resource_type: "video"
        }).catch((error) => next(new Error("Vedio upload failed " + error.message + ""), 500));
        return {
            public_id: public_id,
            secure_url: secure_url
        };
    };
    let vedio = await uploadVedio();
    if (!vedio) {
        next(new Error("Vedio upload failed"), {
            statusCode: 500,
            message: "Vedio upload failed"
        });
    }
    let newArticle = await help_js_1.default.create({
        article,
        arabic,
        english,
        image,
        cover,
        vedio
    });
    return res.status(201).json({
        message: "Article added successfully",
        article: newArticle
    });
};
exports.addArticle = addArticle;
const getAllArticles = async (req, res, next) => {
    let articles = await help_js_1.default.find({});
    if (!articles || articles.length === 0) {
        return res.status(404).json({
            message: "No articles found"
        });
    }
    return res.status(200).json({
        message: "Articles retrieved successfully",
        articles
    });
};
exports.getAllArticles = getAllArticles;
const getArticle = async (req, res, next) => {
    let { id } = req.params;
    let article = await help_js_1.default.findById(id).select("-__v");
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
};
exports.getArticle = getArticle;
const updateArticle = async (req, res, next) => {
    let { id } = req.params;
    let { arabic, english, article } = req.body;
    let articleToUpdate = await help_js_1.default.findById(id);
    if (!articleToUpdate) {
        return next(new Error("Article not found"), {
            statusCode: 404,
            message: "Article not found"
        });
    }
    if (arabic?.title) {
        articleToUpdate.arabic.title = arabic.title;
    }
    if (english?.title) {
        articleToUpdate.english.title = english.title;
    }
    if (arabic?.content) {
        articleToUpdate.arabic.content = arabic.content;
    }
    if (english?.content) {
        articleToUpdate.english.content = english.content;
    }
    if (arabic?.steps) {
        articleToUpdate.arabic.steps = arabic.steps;
    }
    if (english?.steps) {
        articleToUpdate.english.steps = english.steps;
    }
    if (article?.arabic) {
        articleToUpdate.article.arabic = article.arabic;
    }
    if (article?.english) {
        articleToUpdate.article.english = article.english;
    }
    if (req.files?.image?.length > 0) {
        if (articleToUpdate.image?.public_id) {
            await multer_js_1.cloudinaryUpload.uploader.destroy(articleToUpdate.image.public_id, {
                resource_type: "image"
            }).catch((error) => next(new Error("Image deletion failed " + error.message + ""), {
                statusCode: 500,
                message: error.message
            }));
        }
        let { public_id, secure_url } = await multer_js_1.cloudinaryUpload.uploader.upload(req.files.image[0].path, {
            folder: `superAdmin/help/articles/${articleToUpdate.article}`,
            resource_type: "image"
        }).catch((error) => next(new Error("Image upload failed " + error.message + ""), {
            statusCode: 500,
            message: error.message
        }));
        articleToUpdate.image = {
            public_id: public_id,
            secure_url: secure_url
        };
    }
    if (req.files?.cover?.length > 0) {
        if (articleToUpdate.cover?.public_id) {
            await multer_js_1.cloudinaryUpload.uploader.destroy(articleToUpdate.cover.public_id, {
                resource_type: "image"
            }).catch((error) => next(new Error("Cover deletion failed " + error.message + ""), {
                statusCode: 500,
                message: error.message
            }));
        }
        let { public_id, secure_url } = await multer_js_1.cloudinaryUpload.uploader.upload(req.files.cover[0].path, {
            folder: `superAdmin/help/articles/${articleToUpdate.article}`,
            resource_type: "image"
        }).catch((error) => next(new Error("Cover upload failed " + error.message + ""), {
            statusCode: 500,
            message: error.message
        }));
        articleToUpdate.cover = {
            public_id: public_id,
            secure_url: secure_url
        };
    }
    if (req.files?.vedio?.length > 0) {
        if (articleToUpdate.vedio?.public_id) {
            await multer_js_1.cloudinaryUpload.uploader.destroy(articleToUpdate.vedio.public_id, {
                resource_type: "vedio"
            }).catch((error) => next(new Error("vedio deletion failed " + error.message + ""), {
                statusCode: 500,
                message: error.message
            }));
        }
        let { public_id, secure_url } = await multer_js_1.cloudinaryUpload.uploader.upload(req.files.vedio[0].path, {
            folder: `superAdmin/help/articles/${articleToUpdate.article}`,
            resource_type: "vedio"
        }).catch((error) => next(new Error("vedio upload failed " + error.message + ""), {
            statusCode: 500,
            message: error.message
        }));
        articleToUpdate.vedio = {
            public_id: public_id,
            secure_url: secure_url
        };
    }
    console.log("articleToUpdate", articleToUpdate);
    await articleToUpdate.save();
    return res.status(200).json({
        message: "Article updated successfully",
        article: articleToUpdate
    });
};
exports.updateArticle = updateArticle;
const deleteArticle = async (req, res, next) => {
    let { id } = req.params;
    let articleToDelete = await help_js_1.default.findByIdAndDelete(id);
    if (!articleToDelete) {
        return next(new Error("Article not found"), {
            statusCode: 404,
            message: "Article not found"
        });
    }
    if (articleToDelete.image?.public_id) {
        await multer_js_1.cloudinaryUpload.uploader.destroy(articleToDelete.image.public_id, {
            resource_type: "image"
        }).catch((error) => next(new Error("Image deletion failed " + error.message + ""), {
            statusCode: 500,
            message: error.message
        }));
    }
    if (articleToDelete.cover?.public_id) {
        await multer_js_1.cloudinaryUpload.uploader.destroy(articleToDelete.cover.public_id, {
            resource_type: "image"
        }).catch((error) => next(new Error("Cover deletion failed " + error.message + ""), {
            statusCode: 500,
            message: error.message
        }));
    }
    if (articleToDelete.vedio?.public_id) {
        await multer_js_1.cloudinaryUpload.uploader.destroy(articleToDelete.vedio.public_id, {
            resource_type: "vedio"
        }).catch((error) => next(new Error("vedio deletion failed " + error.message + ""), {
            statusCode: 500,
            message: error.message
        }));
    }
    return res.status(200).json({
        message: "Article deleted successfully"
    });
};
exports.deleteArticle = deleteArticle;
//# sourceMappingURL=help.service.js.map