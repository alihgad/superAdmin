import { cloudinaryUpload as cloudinary } from "../../middelWares/multer.js"
import sectionModel from "../../DB/models/section.js"
import SliderModel from "../../DB/models/slider.js"

export const updateSection = async (req, res, next) => {
    let section = await sectionModel.findOne({ section: req.params.section, page: req.params.page })
    if (!section) {
        return next(new Error("wrong section name"))
    }
    const { content, title } = req.body;

    if (!title && !content) {
        return next(new Error("At least one field is required title  , content"))
    }

    section.title = title ? title : section.title;
    section.content = content ? content : section.content;
    await section.save()
    return res.status(200).json({ message: `${section.section} section updated successfully` })

}

export const addImagesToSection = async (req, res, next) => {
    let section = await sectionModel.findOne({ section: req.params.section, page: req.params.page })
    if (!section) {
        return next(new Error("wrong section name"))
    }
    const images = req.files;
    if (images.length == 0) {
        return next(new Error("At least one image is required"))
    }
    for (const image of images) {
        let { secure_url, public_id } = await cloudinary.uploader.upload(image.path, {
            folder: `superAdmin/${req.params.page}/${req.params.section}`
        })
        section.images.push({
            public_id,
            secure_url: secure_url
        })
    }
    await section.save()
    return res.status(200).json({ message: `${section.section} section images updated successfully` })
}

export const removeImageFromSection = async (req, res, next) => {
    let section = await sectionModel.findOne({ section: req.params.section, page: req.params.page })
    if (!section) {
        return next(new Error("wrong section name"))
    }

    let image = section.images.find((image) => image.public_id == req.params.imageId)
    if (!image) {
        return next(new Error("wrong image id"))
    }
    await cloudinary.uploader.destroy(image.public_id)
    section.images = section.images.filter((image) => image.public_id != req.params.imageId)
    await section.save()
    return res.status(200).json({ message: `${section.section} section image removed successfully` })
}


export const addSection = async (req, res, next) => {
    const { arabic, english } = req.body;
    let sectionExists = await sectionModel.findOne({ section: req.params.section, title: english.title, page: req.params.page })
    if (sectionExists) {
        return next(new Error("data already exists"))
    }
    const images = req.files;

    if (!arabic.title || !arabic.content || !english.title || !english.content) {
        return next(new Error("All fields are required title  , content in arabic and english"))
    }

    if (images.length == 0 && !content) {
        return next(new Error("One field at least required content or images"))
    }

    let imagesData = []
    if (images) {
        for (const image of images) {
            let { secure_url, public_id } = await cloudinary.uploader.upload(image.path, {
                folder: `superAdmin/${req.params.page}/${req.params.section}`
            })
            imagesData.push({
                public_id,
                secure_url: secure_url
            })
        }
    }

    let section = await sectionModel.create({
        page : req.params.page,
        section : req.params.section,
        arabic: {
            title: arabic.title.trim(),
            content: arabic.content.trim()
        },
        english: {
            title: english.title.trim(),
            content: english.content.trim()
        }
        ,
        images: imagesData
    })

    console.log(section)
    

    return res.status(200).json({ message: `${section.section} section added successfully` })

}


export const getAllSections = async (req, res, next) => {
    let skip = 0
    if (req.query.page) {
        skip = (req.query.page - 1) * 5
    }
    let sections = await sectionModel.find({ page: req.params.page }).limit(5).skip(skip)
    if (!sections) {
        return next(new Error("sections not found"))
    }
    return res.status(200).json({ sections })
}

export const getSection = async (req, res, next) => {
    let section = await sectionModel.findOne({ section: req.params.section, page: req.params.page })
    if (!section) {
        return next(new Error("wrong section name"))
    }
    return res.status(200).json({ section })
}

export const deleteSection = async (req, res, next) => {
    let section = await sectionModel.findOneAndDelete({ section: req.params.section })
    if (!section) {
        return next(new Error("wrong section name"))
    }

    for (const image of section.images) {
        await cloudinary.uploader.destroy(image.public_id)
    }

    return res.status(200).json({ message: `${section.section} deleted successfully`, section })
}


// ------------------------ slider

export let createSlider = async (req, res, next) => {
    let slider = await SliderModel.findOne({ page: req.params.page, section: req.params.section })
    if (slider) {
        return next(new Error("section already exists"))
    }

    const { title, content } = req.body;
    let image = req.file;



    if (!title || !content || !image) {
        return next(new Error("All fields are required"))
    }

    let { secure_url, public_id } = await cloudinary.uploader.upload(image.path, {
        folder: `superAdmin/${req.params.page}/${req.params.section}/slider`
    })
    let newSlider = new SliderModel({
        page: req.params.page,
        section: req.params.section,
        slides: [
            {
                title,
                content,
                image: {
                    secure_url,
                    public_id
                }
            }
        ]
    })
    await newSlider.save()
    return res.status(200).json({ message: `${newSlider.section} slider added successfully`, newSlider })
}

export let getSlider = async (req, res, next) => {
    let slider = await SliderModel.findOne({ page: req.params.page, section: req.params.section })
    if (!slider) {
        return next(new Error("section not found"))
    }

    return res.status(200).json({ slider })
}

export let getAllSlider = async (req, res, next) => {
    let slider = await SliderModel.find({ page: req.params.page })
    if (!slider) {
        return next(new Error("section not found"))
    }

    return res.status(200).json({ slider })
}

export let addToSlider = async (req, res, next) => {
    let slider = await SliderModel.findOne({ page: req.params.page, section: req.params.section })
    if (!slider) {
        return next(new Error("section not found"))
    }

    const { title, content } = req.body;
    let image = req.file;

    if (!title || !content || !image) {
        return next(new Error("All fields are required"))
    }
    let { secure_url, public_id } = await cloudinary.uploader.upload(image.path, {
        folder: `superAdmin/${slider.page}/${slider.section}/slider`
    })

    slider.slides.push({
        title,
        content,
        image: {
            secure_url,
            public_id
        }
    })
    await slider.save()
    return res.status(200).json({ message: `${slider.section} slider added successfully`, slider })
}

export let updateSlider = async (req, res, next) => {
    let slider = await SliderModel.findOne({ page: req.params.page, section: req.params.section })
    if (!slider) {
        return next(new Error("section not found"))
    }


    const { title, content } = req.body;
    let image = req.file;

    if (!title && !content && !image) {
        return next(new Error("All fields are required"))
    }

    let target = slider.slides.find((slide) => slide._id == req.params.sliderId)
    if (!target) {
        return next(new Error("wrong slider id"))
    }

    if (title) {
        target.title = title
    }
    if (content) {
        target.content = content
    }
    if (image) {
        await cloudinary.uploader.destroy(target.image.public_id)
        let { secure_url, public_id } = await cloudinary.uploader.upload(image.path, {
            folder: `superAdmin/${slider.page}/${slider.section}/slider`
        })
        target.image = {
            secure_url,
            public_id
        }
    }
    await slider.save()
    return res.status(200).json({ message: `${slider.section} slider updated successfully`, slider })
}

export let deleteSlider = async (req, res, next) => {
    let slider = await SliderModel.findOne({ page: req.params.page, section: req.params.section })
    if (!slider) {
        return next(new Error("section not found"))
    }

    let target = slider.slides.find((slide) => slide._id == req.params.sliderId)
    if (!target) {
        return next(new Error("wrong slider id"))
    }

    await cloudinary.uploader.destroy(target.image.public_id)
    slider.slides = slider.slides.filter((slide) => slide._id != req.params.sliderId)
    await slider.save()
    return res.status(200).json({ message: `${slider.section} slider deleted successfully`, slider })
}

