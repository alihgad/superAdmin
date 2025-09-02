import footerModel from "../../db/models/footer";
import socialModel from "../../db/models/socialMedia";
import isHttpUrl from "../../utils/isUrl";

export const addLink = async (req, res) => {
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

  let existingLink = await footerModel.findOne({
    "english.title": english.title.trim(),
  });
  if (existingLink) {
    return res.status(400).json({ message: "Link already exists" });
  }
  console.log(arabic.title);

  let newLink = await footerModel.create({
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

export const updateLink = async (req, res) => {
  let { id } = req.params;
  const { link, arabic, english, category } = req.body;

  let updatetLink = await footerModel.findById(id);
  if (!updatetLink) {
    return next(new Error("Link not found", { cause: 404 }));
  }

  if (link) updatetLink.link = link.trim();
  if (arabic?.title) updatetLink.arabic.title = arabic?.title?.trim();
  if (english?.title) updatetLink.english.title = english?.title?.trim();
  if (category) updatetLink.category = category.trim();
  await updatetLink.save();
  return res
    .status(200)
    .json({ message: "Link updated successfully", updatetLink });
};

export const deleteLink = async (req, res) => {
  let { id } = req.params;

  let deletedLink = await footerModel.findByIdAndDelete(id);
  if (!deletedLink) {
    return next(new Error("Link not found", { cause: 404 }));
  }
  return res
    .status(200)
    .json({ message: "Link deleted successfully", deletedLink });
};

export const getAllLinks = async (req, res) => {
  let links = await footerModel.find();
  if (!links || links.length === 0) {
    return res.status(404).json({ message: "No links found" });
  }
  return res
    .status(200)
    .json({ message: "Links retrieved successfully", links });
};

export const getAllCatLinks = async (req, res) => {
  let { category } = req.params;
  let links = await footerModel.find({ category: category });
  if (!links || links.length === 0) {
    return res.status(404).json({ message: "No links found" });
  }
  return res
    .status(200)
    .json({ message: "Links retrieved successfully", links });
};

export const addSocial = async (req, res) => {
  let { link, icon } = req.body;

  let existingSocial = await socialModel.findOne({ icon: icon.trim() });
  if (existingSocial) {
    return res.status(400).json({ message: "Social link already exists" });
  }

  let newSocial = await socialModel.create({
    link: link.trim(),
    icon: icon.trim(),
  });

  return res
    .status(201)
    .json({ message: "Social link added successfully", newSocial });
};

export const updateSocial = async (req, res) => {
  let { id } = req.params;
  const { link, icon, display } = req.body;

  let updatedSocial = await socialModel.findById(id);
  if (!updatedSocial) {
    return next(new Error("Social link not found", { cause: 404 }));
  }

  if (link) updatedSocial.link = link.trim();
  if (icon) {
    let existingSocial = await socialModel.findOne({ icon: icon.trim() });
    if (existingSocial) {
      return res.status(400).json({ message: "Social link already exists" });
    }
    updatedSocial.icon = icon.trim();
  }
  if (display) updatedSocial.display = display;

  await updatedSocial.save();
  return res
    .status(200)
    .json({ message: "Social link updated successfully", updatedSocial });
};

export const deleteSocial = async (req, res) => {
  let { id } = req.params;

  let deletedSocial = await socialModel.findByIdAndDelete(id);

  if (!deletedSocial) {
    return next(new Error("Social link not found", { cause: 404 }));
  }

  return res
    .status(200)
    .json({ message: "Social link deleted successfully", deletedSocial });
};

export const getAllSocial = async (req, res) => {
  let socialLinks = await socialModel.find();
  if (!socialLinks || socialLinks.length === 0) {
    return res.status(404).json({ message: "No social links found" });
  }
  return res
    .status(200)
    .json({ message: "Social links retrieved successfully", socialLinks });
};
