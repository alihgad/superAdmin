import footerModel from "../../DB/models/footer.js";
import isHttpUrl from "../../utils/isUrl.js";

export const addLink = async (req, res) => {

    const { link, arabic, english } = req.body;
    let { category } = req.params;
    if (!link || !isHttpUrl(link)) {
        return res.status(400).json({ message: "link is required and must be a string and a valid link" });
    }

    if (!category, typeof title !== 'string') {
        return res.status(400).json({ message: "all fields are required and must be a string" });
    }



    let existingLink = await footerModel.findOne({ 'english.title': english.title.toLowerCase().trim() });
    if (existingLink) {
        return res.status(400).json({ message: "Link already exists" });
    }

    let newLink = await footerModel.create({
        category: category.toLowerCase().trim(),
        arabic: {
            title: arabic.title.tolowerCase().trim()
        },
        english: {
            title: english.title.tolowerCase().trim()
        },
        link: link.trim()
    })

    return res.status(201).json({ message: "Link added successfully", newLink });
}

export const updateLink = async (req, res) => {
    let { id } = req.params;
    const { link, arabic, english, category } = req.body;

    let updatetLink = await footerModel.findById(id);
    if (!updatetLink) {
        return next(new Error("Link not found", { cause: 404 }));
    }

    if (!link && !arabic.title && !english.title && !category) {
        return next(new Error("at least one field is required", { cause: 400 }));
    }

    if (link && !isHttpUrl(link)) {
        return next(new Error("link must be a valid link", { cause: 400 }));
    }

    if (title && typeof title !== 'string') {
        return next(new Error("title must be a string", { cause: 400 }));
    }

    if (category && typeof category !== 'string') {
        return next(new Error("category must be a string", { cause: 400 }));
    }


    if (link) updatetLink.link = link.trim();
    if (arabic.title) updatetLink.arabic.title = arabic.title.toLowerCase().trim();
    if (english.title) updatetLink.english.title = english.title.toLowerCase().trim();
    if (category) updatetLink.category = category.toLowerCase().trim();
    await updatetLink.save();
    return res.status(200).json({ message: "Link updated successfully", updatetLink });
}

export const deleteLink = async (req, res) => {
    let { id } = req.params;

    let deletedLink = await footerModel.findByIdAndDelete(id);
    if (!deletedLink) {
        return next(new Error("Link not found", { cause: 404 }));
    }
    return res.status(200).json({ message: "Link deleted successfully", deletedLink });
}

export const getAllLinks = async (req, res) => {
    let links = await footerModel.find();
    if (!links || links.length === 0) {
        return res.status(404).json({ message: "No links found" });
    }
    return res.status(200).json({ message: "Links retrieved successfully", links });
}
export const getAllCatLinks = async (req, res) => {
    let links = await footerModel.find({ category: req.params.category });
    if (!links || links.length === 0) {
        return res.status(404).json({ message: "No links found" });
    }
    return res.status(200).json({ message: "Links retrieved successfully", links });
}



export const addSocial = async (req, res) => {
    const { link, alt } = req.body;

    if (!link || !isHttpUrl(link)) {
        return res.status(400).json({ message: "link is required and must be a string and a valid link" });
    }

    if (!alt || typeof alt !== 'string') {
        return res.status(400).json({ message: "alt is required and must be a string" });
    }

    

    if (!req.file) {
        return next(new Error("Image is required", { cause: 400 }));
    }

    let { secure_url, public_id } = await req.cloudinary.uploader.upload(req.file.path, {
        folder: "socialMedia",
        resource_type: "image"
    }).catch(err => {
        next(new Error("Image upload failed", { cause: 500 }));
    })


    let image = {
        secure_url,
        public_id
    }


    let existingSocial = await footerModel.findOne({ link: link.toLowerCase().trim() });
    if (existingSocial) {
        return res.status(400).json({ message: "Social link already exists" });
    }

    let newSocial = await footerModel.create({
        link: link.toLowerCase().trim(),
        image,
        alt: alt.toLowerCase().trim()
    });

    return res.status(201).json({ message: "Social link added successfully", newSocial });
}

export const updateSocial = async (req, res) => {
    let { id } = req.params;
    const { link, alt } = req.body;

    if (!link && !alt) {
        return next(new Error("at least one field is required", { cause: 400 }));
    }

    if (link && typeof link !== 'string') {
        return next(new Error("link must be a string", { cause: 400 }));
    }

    if (alt && typeof alt !== 'string') {
        return next(new Error("alt must be a string", { cause: 400 }));
    }

    let updatedSocial = await footerModel.findById(id);
    if (!updatedSocial) {
        return next(new Error("Social link not found", { cause: 404 }));
    }

    if (link) updatedSocial.link = link.toLowerCase().trim();
    if (alt) updatedSocial.alt = alt.toLowerCase().trim();

    await updatedSocial.save();
    return res.status(200).json({ message: "Social link updated successfully", updatedSocial });
}

export const updateImage = async (req, res) => {
    let { id } = req.params;

    if (!req.file) {
        return next(new Error("Image is required", { cause: 400 }));
    }

    let updatedSocial = await footerModel.findById(id);
    if (!updatedSocial) {
        return next(new Error("Social link not found", { cause: 404 }));
    }

    // Delete the old image from cloudinary

    await req.cloudinary.uploader.destroy(updatedSocial.image.public_id, {
        resource_type: "image"
    }).catch(err => {
        next(new Error("Image deletion failed", { cause: 500 }));
    });


    let { secure_url, public_id } = await req.cloudinary.uploader.upload(req.file.path, {
        folder: "socialMedia",
        resource_type: "image"
    }).catch(err => {
        next(new Error("Image upload failed", { cause: 500 }));
    })

    updatedSocial.image.secure_url = secure_url;
    updatedSocial.image.public_id = public_id;

    await updatedSocial.save();
    return res.status(200).json({ message: "Image updated successfully", updatedSocial });

}

export const deleteImage = async (req, res) => {
    let { id } = req.params;

    let deletedSocial = await footerModel.findByIdAndDelete(id);
    if (!deletedSocial) {
        return next(new Error("Social link not found", { cause: 404 }));
    }

    // Delete the image from cloudinary
    await req.cloudinary.uploader.destroy(deletedSocial.image.public_id, {
        resource_type: "image"
    }).catch(err => {
        next(new Error("Image deletion failed", { cause: 500 }));
    });

    return res.status(200).json({ message: "Social link and image deleted successfully", deletedSocial });
}

