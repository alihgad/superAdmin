"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSlide = exports.deleteSlider = exports.updateSlider = exports.updateSlide = exports.addToSlider = exports.getAllSlider = exports.getSlider = exports.createSlider = exports.deleteSection = exports.getSection = exports.getAllSections = exports.addSection = exports.removeImageFromSection = exports.addImagesToSection = exports.updateSection = void 0;
const multer_1 = require("../../middlewares/multer");
const section_1 = require("../../db/models/section");
const slider_1 = require("../../db/models/slider");
const updateSection = async (req, res, next) => {
    let section = await section_1.default.findOne({
        section: req.params.section,
        page: req.params.page,
    });
    if (!section) {
        return next(new Error("wrong section name"));
    }
    let arabic = {};
    let english = {};
    if (req.body?.arabic) {
        arabic = JSON.parse(req.body?.arabic);
    }
    if (req.body?.english) {
        english = JSON.parse(req.body?.english);
    }
    if (arabic?.title)
        section.arabic.title = arabic.title.trim();
    if (arabic?.content)
        section.arabic.content = arabic.content.trim();
    if (english?.title)
        section.english.title = english.title.trim();
    if (english?.content)
        section.english.content = english.content.trim();
    if (req.files?.length > 0) {
        if (section.images?.length > 0) {
            for (const image of section.images) {
                await multer_1.cloudinaryUpload.uploader
                    .destroy(image.public_id)
                    .catch((err) => next(new Error("Image deletion failed " + err.message + "")));
            }
        }
        section.images = [];
        for (const image of req.files) {
            let { secure_url, public_id } = await multer_1.cloudinaryUpload.uploader.upload(image.path, {
                folder: `superAdmin/${req.params.page}/${req.params.section}`,
            });
            section.images.push({
                public_id,
                secure_url: secure_url,
            });
        }
    }
    await section.save();
    return res
        .status(200)
        .json({ message: `${section.section} section updated successfully` });
};
exports.updateSection = updateSection;
const addImagesToSection = async (req, res, next) => {
    let section = await section_1.default.findOne({
        section: req.params.section,
        page: req.params.page,
    });
    if (!section) {
        return next(new Error("wrong section name"));
    }
    const images = req.files;
    if (images.length == 0) {
        return next(new Error("At least one image is required"));
    }
    for (const image of images) {
        let { secure_url, public_id } = await multer_1.cloudinaryUpload.uploader.upload(image.path, {
            folder: `superAdmin/${req.params.page}/${req.params.section}`,
        });
        section.images.push({
            public_id,
            secure_url: secure_url,
        });
    }
    await section.save();
    return res
        .status(200)
        .json({
        message: `${section.section} section images updated successfully`,
        section,
    });
};
exports.addImagesToSection = addImagesToSection;
const removeImageFromSection = async (req, res, next) => {
    let section = await section_1.default.findOne({
        section: req.params.section,
        page: req.params.page,
    });
    if (!section) {
        return next(new Error("wrong section name"));
    }
    let image = section.images.find((image) => image.public_id == req.params.imageId);
    if (!image) {
        return next(new Error("wrong image id"));
    }
    await multer_1.cloudinaryUpload.uploader.destroy(image.public_id);
    section.images = section.images.filter((image) => image.public_id != req.params.imageId);
    await section.save();
    return res
        .status(200)
        .json({ message: `${section.section} section image removed successfully` });
};
exports.removeImageFromSection = removeImageFromSection;
const addSection = async (req, res, next) => {
    const { arabic, english } = req.body;
    let sectionExists = await section_1.default.findOne({
        section: req.params.section,
        title: english.title,
        page: req.params.page,
    });
    if (sectionExists) {
        return next(new Error("data already exists"));
    }
    const images = req.files;
    let imagesData = [];
    if (images.length > 0) {
        for (const image of images) {
            let { secure_url, public_id } = await multer_1.cloudinaryUpload.uploader.upload(image.path, {
                folder: `superAdmin/${req.params.page}/${req.params.section}`,
            });
            imagesData.push({
                public_id,
                secure_url: secure_url,
            });
        }
    }
    let section = await section_1.default.create({
        page: req.params.page,
        section: req.params.section,
        arabic: {
            title: arabic.title.trim(),
            content: arabic.content.trim(),
        },
        english: {
            title: english.title.trim(),
            content: english.content.trim(),
        },
        images: imagesData,
    });
    console.log(section);
    return res
        .status(200)
        .json({ message: `${section.section} section added successfully` });
};
exports.addSection = addSection;
const getAllSections = async (req, res, next) => {
    let skip = 0;
    if (req.query.page) {
        skip = (req.query.page - 1) * 5;
    }
    let sections = await section_1.default
        .find({ page: req.params.page })
        .limit(5)
        .skip(skip);
    if (!sections) {
        return next(new Error("sections not found"));
    }
    return res.status(200).json({ sections });
};
exports.getAllSections = getAllSections;
const getSection = async (req, res, next) => {
    let section = await section_1.default.findOne({
        section: req.params.section,
        page: req.params.page,
    });
    if (!section) {
        return next(new Error("wrong section name"));
    }
    return res.status(200).json({ section });
};
exports.getSection = getSection;
const deleteSection = async (req, res, next) => {
    let section = await section_1.default.findOneAndDelete({
        section: req.params.section,
    });
    if (!section) {
        return next(new Error("wrong section name"));
    }
    for (const image of section.images) {
        await multer_1.cloudinaryUpload.uploader.destroy(image.public_id);
    }
    return res
        .status(200)
        .json({ message: `${section.section} deleted successfully`, section });
};
exports.deleteSection = deleteSection;
// ------------------------ slider
let createSlider = async (req, res, next) => {
    try {
        let sliderExists = await slider_1.default.findOne({
            page: req.params.page,
            section: req.params.section,
        }).maxTimeMS(5000);
        if (sliderExists) {
            return next(new Error("section already exists"));
        }
        const { arabic, english, title, content, text } = req.body;
        if (typeof title === "string") {
            title = JSON.parse(title);
        }
        if (typeof content === "string") {
            content = JSON.parse(content);
        }
        let image = req.file;
        let secure_url, public_id;
        let newSlider = {
            arabic: {},
            english: {},
            image: {},
            text: text?.trim(),
        };
        if (image) {
            let data = await multer_1.cloudinaryUpload.uploader.upload(image.path, {
                folder: `superAdmin/${req.params.page}/${req.params.section}/slider`,
            });
            secure_url = data.secure_url;
            public_id = data.public_id;
            newSlider.image = { secure_url, public_id };
        }
        if (!arabic && !english && !image) {
            return next(new Error("arabic or english or image is required"));
        }
        if (arabic?.title && english?.title) {
            newSlider.arabic.title = arabic.title;
            newSlider.english.title = english.title;
        }
        if (arabic?.content && english?.content) {
            newSlider.english = english;
            newSlider.arabic.content = arabic.content;
            newSlider.english.content = english.content;
        }
        if ((title.arabic && !title.english) || (!title.arabic && title.english)) {
            return next(new Error("arabic and english title is required"));
        }
        if ((content.arabic && !content.english) ||
            (!content.arabic && content.english)) {
            return next(new Error("arabic and english content is required"));
        }
        let slider = new slider_1.default({
            page: req.params.page,
            section: req.params.section,
            title,
            content,
            slides: [newSlider],
        });
        await slider.save();
        return res
            .status(200)
            .json({ message: `${slider.section} slider added successfully`, slider });
    }
    catch (error) {
        if (error.name === "MongooseError" &&
            error.message.includes("buffering timed out")) {
            return next(new Error("Database connection timeout. Please try again."));
        }
        return next(error);
    }
};
exports.createSlider = createSlider;
let getSlider = async (req, res, next) => {
    let slider = await slider_1.default.findOne({
        page: req.params.page,
        section: req.params.section,
    });
    if (!slider) {
        return next(new Error("section not found"));
    }
    return res.status(200).json({ slider });
};
exports.getSlider = getSlider;
let getAllSlider = async (req, res, next) => {
    let slider = await slider_1.default.find({ page: req.params.page });
    if (!slider) {
        return next(new Error("section not found"));
    }
    return res.status(200).json({ slider });
};
exports.getAllSlider = getAllSlider;
let addToSlider = async (req, res, next) => {
    let slider = await slider_1.default.findById(req.params.sliderId);
    if (!slider) {
        return next(new Error("section not found"));
    }
    let text = req.body?.text;
    let arabic = req.body?.arabic;
    let english = req.body?.english;
    let image = req.file;
    let secure_url, public_id;
    if (image) {
        let data = await multer_1.cloudinaryUpload.uploader.upload(image.path, {
            folder: `superAdmin/${slider.page}/${slider.section}/slider`,
        });
        secure_url = data.secure_url;
        public_id = data.public_id;
    }
    slider.slides.push({
        arabic,
        english,
        image: {
            secure_url,
            public_id,
        },
        text: text?.trim(),
    });
    await slider.save();
    return res
        .status(200)
        .json({ message: `${slider.section} slider added successfully`, slider });
};
exports.addToSlider = addToSlider;
let updateSlide = async (req, res, next) => {
    let slider = await slider_1.default.findOne({
        page: req.params.page,
        section: req.params.section,
    });
    if (!slider) {
        return next(new Error("section not found"));
    }
    console.log(req.body);
    if (typeof req.body?.arabic == "string") {
        req.body.arabic = JSON.parse(req.body.arabic);
    }
    if (typeof req.body?.english == "string") {
        req.body.english = JSON.parse(req.body.english);
    }
    let arabic = req.body?.arabic;
    let english = req.body?.english;
    let image = req.file;
    let text = req.body?.text;
    let target = slider.slides.find((slide) => slide._id == req.params.slideId);
    if (!target) {
        return next(new Error("wrong slider id"));
    }
    if (arabic?.title)
        target.arabic.title = arabic.title.trim();
    if (arabic?.content)
        target.arabic.content = arabic.content.trim();
    if (english?.title)
        target.english.title = english.title.trim();
    if (english?.content)
        target.english.content = english.content.trim();
    if (text)
        target.text = text.trim();
    if (image) {
        if (target?.image?.public_id) {
            await multer_1.cloudinaryUpload.uploader.destroy(target.image.public_id);
        }
        let { secure_url, public_id } = await multer_1.cloudinaryUpload.uploader.upload(image.path, {
            folder: `superAdmin/${slider.page}/${slider.section}/slider`,
        });
        target.image = {
            secure_url,
            public_id,
        };
    }
    await slider.save();
    return res
        .status(200)
        .json({ message: `${slider.section} slider updated successfully`, slider });
};
exports.updateSlide = updateSlide;
let updateSlider = async (req, res, next) => {
    if (typeof req.body?.title === "string") {
        req.body.title = JSON.parse(req.body?.title);
    }
    if (typeof req.body?.content === "string") {
        req.body.content = JSON.parse(req.body?.content);
    }
    let slider = await slider_1.default.findById(req.params.sliderId);
    if (!slider) {
        return next(new Error("section not found"));
    }
    console.log(req.body, "req.body");
    let title = req.body?.title;
    let content = req.body?.content;
    console.log(slider, "slider");
    console.log(typeof title, "title");
    if (title?.arabic) {
        slider.title.arabic = title.arabic;
    }
    if (title?.english) {
        slider.title.english = title.english;
    }
    if (content?.arabic) {
        slider.content.arabic = content.arabic;
    }
    if (content?.english) {
        slider.content.english = content.english;
    }
    await slider.save();
    return res
        .status(200)
        .json({ message: `${slider.section} slider updated successfully`, slider });
};
exports.updateSlider = updateSlider;
let deleteSlider = async (req, res, next) => {
    let slider = await slider_1.default.findByIdAndDelete(req.params.sliderId);
    if (!slider) {
        return next(new Error("section not found"));
    }
    for (const slide of slider.slides) {
        await multer_1.cloudinaryUpload.uploader
            .destroy(slide.image.public_id)
            .catch((err) => next(new Error("Image deletion failed " + err.message + "")));
    }
    return res
        .status(200)
        .json({ message: `${slider.section} slider deleted successfully`, slider });
};
exports.deleteSlider = deleteSlider;
let deleteSlide = async (req, res, next) => {
    let slider = await slider_1.default.findOne({
        page: req.params.page,
        section: req.params.section,
    });
    if (!slider) {
        return next(new Error("section not found"));
    }
    let target = slider.slides.find((slide) => {
        return slide._id.toString() == req.params.slideId;
    });
    if (!target) {
        return next(new Error("wrong slide id"));
    }
    await multer_1.cloudinaryUpload.uploader
        .destroy(target.image.public_id)
        .catch((err) => next(new Error("Image deletion failed " + err.message + "")));
    slider.slides = slider.slides.filter((slide) => slide._id != req.params.slideId);
    await slider.save();
    return res
        .status(200)
        .json({ message: `${slider.section} slider deleted successfully`, slider });
};
exports.deleteSlide = deleteSlide;
//# sourceMappingURL=section.service.js.map