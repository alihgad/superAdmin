"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSocial = exports.deleteSocial = exports.updateSocial = exports.addSocial = exports.getAllCatLinks = exports.getAllLinks = exports.deleteLink = exports.updateLink = exports.addLink = void 0;
const footer_1 = require("../../db/models/footer");
const socialMedia_1 = require("../../db/models/socialMedia");
const isUrl_1 = require("../../utils/isUrl");
const addLink = async (req, res) => {
    const { link, arabic, english } = req.body;
    let { category } = req.params;
    if (!link) {
        return res
            .status(400)
            .json({
            message: "link is required and must be a string and a valid link",
        });
    }
    if (!category || typeof category !== "string") {
        return res
            .status(400)
            .json({ message: "category is required and must be a string" });
    }
    let existingLink = await footer_1.default.findOne({
        "english.title": english.title.trim(),
    });
    if (existingLink) {
        return res.status(400).json({ message: "Link already exists" });
    }
    console.log(arabic.title);
    let newLink = await footer_1.default.create({
        category: category.trim(),
        arabic: {
            title: arabic.title.trim(),
        },
        english: {
            title: english.title.trim(),
        },
        link: link.trim(),
    });
    return res.status(201).json({ message: "Link added successfully", newLink });
};
exports.addLink = addLink;
const updateLink = async (req, res) => {
    let { id } = req.params;
    const { link, arabic, english, category } = req.body;
    let updatetLink = await footer_1.default.findById(id);
    if (!updatetLink) {
        return next(new Error("Link not found", { cause: 404 }));
    }
    if (link)
        updatetLink.link = link.trim();
    if (arabic?.title)
        updatetLink.arabic.title = arabic?.title?.trim();
    if (english?.title)
        updatetLink.english.title = english?.title?.trim();
    if (category)
        updatetLink.category = category.trim();
    await updatetLink.save();
    return res
        .status(200)
        .json({ message: "Link updated successfully", updatetLink });
};
exports.updateLink = updateLink;
const deleteLink = async (req, res) => {
    let { id } = req.params;
    let deletedLink = await footer_1.default.findByIdAndDelete(id);
    if (!deletedLink) {
        return next(new Error("Link not found", { cause: 404 }));
    }
    return res
        .status(200)
        .json({ message: "Link deleted successfully", deletedLink });
};
exports.deleteLink = deleteLink;
const getAllLinks = async (req, res) => {
    let links = await footer_1.default.find();
    if (!links || links.length === 0) {
        return res.status(404).json({ message: "No links found" });
    }
    return res
        .status(200)
        .json({ message: "Links retrieved successfully", links });
};
exports.getAllLinks = getAllLinks;
const getAllCatLinks = async (req, res) => {
    let { category } = req.params;
    let links = await footer_1.default.find({ category: category });
    if (!links || links.length === 0) {
        return res.status(404).json({ message: "No links found" });
    }
    return res
        .status(200)
        .json({ message: "Links retrieved successfully", links });
};
exports.getAllCatLinks = getAllCatLinks;
const addSocial = async (req, res) => {
    let { link, icon } = req.body;
    let existingSocial = await socialMedia_1.default.findOne({ icon: icon.trim() });
    if (existingSocial) {
        return res.status(400).json({ message: "Social link already exists" });
    }
    let newSocial = await socialMedia_1.default.create({
        link: link.trim(),
        icon: icon.trim(),
    });
    return res
        .status(201)
        .json({ message: "Social link added successfully", newSocial });
};
exports.addSocial = addSocial;
const updateSocial = async (req, res) => {
    let { id } = req.params;
    const { link, icon, display } = req.body;
    let updatedSocial = await socialMedia_1.default.findById(id);
    if (!updatedSocial) {
        return next(new Error("Social link not found", { cause: 404 }));
    }
    if (link)
        updatedSocial.link = link.trim();
    if (icon) {
        let existingSocial = await socialMedia_1.default.findOne({ icon: icon.trim() });
        if (existingSocial) {
            return res.status(400).json({ message: "Social link already exists" });
        }
        updatedSocial.icon = icon.trim();
    }
    if (display)
        updatedSocial.display = display;
    await updatedSocial.save();
    return res
        .status(200)
        .json({ message: "Social link updated successfully", updatedSocial });
};
exports.updateSocial = updateSocial;
const deleteSocial = async (req, res) => {
    let { id } = req.params;
    let deletedSocial = await socialMedia_1.default.findByIdAndDelete(id);
    if (!deletedSocial) {
        return next(new Error("Social link not found", { cause: 404 }));
    }
    return res
        .status(200)
        .json({ message: "Social link deleted successfully", deletedSocial });
};
exports.deleteSocial = deleteSocial;
const getAllSocial = async (req, res) => {
    let socialLinks = await socialMedia_1.default.find();
    if (!socialLinks || socialLinks.length === 0) {
        return res.status(404).json({ message: "No social links found" });
    }
    return res
        .status(200)
        .json({ message: "Social links retrieved successfully", socialLinks });
};
exports.getAllSocial = getAllSocial;
//# sourceMappingURL=footer.service.js.map