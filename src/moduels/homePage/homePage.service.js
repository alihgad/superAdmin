import cloudinary from "./../../middelWares/cloudinary.js"
import homePageModel from "./../../DB/models/homePage.js"
import homePageSliderModel from "../../DB/models/homePageSlider.js"

export const updateSection = async (req, res) => {
    let section = await homePageModel.findOne({ section: req.params.section })
    if (!section) {
        return res.status(400).json({ message: "wrong section name" })
    }
    const { content } = req.body;
    const images = req.files;
    if (images) {

        for (const image of images) {
            let { secuer_url, public_id } = await cloudinary.uploader.upload(image.path, {
                folder: `homePage/${section.section}`
            })
            section.images.push({
                public_id,
                secure_url: secuer_url
            })
        }

        if (content) {
            section.content = content
        }
    }
    await section.save()
    return res.status(200).json({ message: `${section.section} updated successfully` })

}

export const addSection = async (req, res) => {
    const { content, title } = req.body;
    let sectionExists = await homePageModel.findOne({ section: req.params.section, title })
    if (sectionExists) {
        return res.status(400).json({ message: "data already exists" })
    }
    const images = req.files;

    if (!title) {
        return res.status(400).json({ message: "title is required" })
    }

    if (images.length == 0 && !content) {
        return res.status(400).json({ message: "One field at least required content or images" })
    }



    let section = new homePageModel({
        section: req.params.section,
        title: title,
        content: content,
        images: []
    })

    if (images) {
        for (const image of images) {
            let { secure_url, public_id } = await cloudinary.uploader.upload(image.path, {
                folder: `homePage/${req.params.section}`
            })
            section.images.push({
                public_id,
                secure_url: secure_url
            })
        }


    }
    await section.save()

    return res.status(200).json({ message: `${section.section} section added successfully` })

}


export const getAllSections = async (req, res) => {
    let sections = await homePageModel.find()
    return res.status(200).json({ sections })
}

export const getSection = async (req, res) => {
    let section = await homePageModel.findOne({ section: req.params.section })
    if (!section) {
        return res.status(400).json({ message: "wrong section name" })
    }
    return res.status(200).json({ section })
}

export const deleteSection = async (req, res, next) => {
    let section = await homePageModel.findOneAndDelete({ section: req.params.section })
    if (!section) {
        return next(new Error("wrong section name"))
    }
    return res.status(200).json({ message: `${section.section} deleted successfully` })
}


export let createSlider = async (req, res, next) => {
    let section = await homePageSliderModel.findOne({ section: req.params.section })
    if (section) {
        return next(new Error("section already exists"))
    }

    const { title, content } = req.body;
    let image = req.file;

    
    
    if (!title || !content || !image) {
        return next(new Error("All fields are required"))
    }

    let { secure_url, public_id } = await cloudinary.uploader.upload(image.path, {
        folder: `homePage/${req.params.section}/slider`
    })
    let newSlider = new homePageSliderModel({
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
    return res.status(200).json({ message: `${newSlider.section} slider added successfully` })
}

export let addToSlider = async (req, res, next) => {
    let section = await homePageSliderModel.findOne({ section: req.params.section })
    if (!section) {
        return next(new Error("section not found"))
    }

    const { title, content } = req.body;
    let image = req.file;
        
    if (!title || !content || !image) {
        return next(new Error("All fields are required"))
    }
    let { secure_url, public_id } = await cloudinary.uploader.upload(image.path, {
        folder: `homePage/${section.section}/slider`
    })
    
    section.slides.push({
        title,
        content,
        image: {
            secure_url,
            public_id
        }
    })
    await section.save()
    return res.status(200).json({ message: `${section.section} slider added successfully` })
}

