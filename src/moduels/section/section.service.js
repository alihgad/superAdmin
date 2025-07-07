import { cloudinaryUpload as cloudinary } from "../../middelWares/multer.js"
import sectionModel from "../../DB/models/section.js"
import SliderModel from "../../DB/models/slider.js"


export const updateSection = async (req, res, next) => {
    let section = await sectionModel.findOne({ section: req.params.section, page: req.params.page })
    if (!section) {
        return next(new Error("wrong section name"))
    }
    let arabic = {}
    let english = {}
    if (req.body?.arabic) {
        arabic = JSON.parse(req.body?.arabic)
    }
    if (req.body?.english) {
        english = JSON.parse(req.body?.english)
    }

    if (arabic?.title) section.arabic.title = arabic.title.trim()
    if (arabic?.content) section.arabic.content = arabic.content.trim()

    if (english?.title) section.english.title = english.title.trim()
    if (english?.content) section.english.content = english.content.trim()
    if (req.files?.length > 0) {

        if (section.images?.length > 0) {
            for (const image of section.images) {
                await cloudinary.uploader.destroy(image.public_id).catch(err => next(new Error("Image deletion failed " + err.message + "")))
            }
        }
        section.images = []

        for (const image of req.files) {
            let { secure_url, public_id } = await cloudinary.uploader.upload(image.path, {
                folder: `superAdmin/${req.params.page}/${req.params.section}`
            })
            section.images.push({
                public_id,
                secure_url: secure_url
            })
        }
    }
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
    return res.status(200).json({ message: `${section.section} section images updated successfully`, section })
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

    let imagesData = []
    if (images.length > 0) {
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
        page: req.params.page,
        section: req.params.section,
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
    try {
        let sliderExists = await SliderModel.findOne({
            page: req.params.page,
            section: req.params.section
        }).maxTimeMS(5000);

        if (sliderExists) {
            return next(new Error("section already exists"))
        }

        const { arabic, english, title, content, text } = req.body;

        let image = req.file;
        let secure_url, public_id;
        let newSlider = {
            arabic: {},
            english: {},
            image: {},
            text: text?.trim()
        }



        if (image) {
            let data = await cloudinary.uploader.upload(image.path, {
                folder: `superAdmin/${req.params.page}/${req.params.section}/slider`
            })
            secure_url = data.secure_url
            public_id = data.public_id
            newSlider.image = { secure_url, public_id }
        }

        if (!arabic && !english && !image) {
            return next(new Error("arabic or english or image is required"))
        }
        if (arabic?.title && english?.title) {
            newSlider.arabic.title = arabic.title
            newSlider.english.title = english.title
        }

        if (arabic?.content && english?.content) {
            newSlider.english = english
            newSlider.arabic.content = arabic.content
            newSlider.english.content = english.content
        }

        if ((title.arabic && !title.english) || (!title.arabic && title.english)) {
            return next(new Error("arabic and english title is required"))
        }

        if ((content.arabic && !content.english) || (!content.arabic && content.english)) {
            return next(new Error("arabic and english content is required"))
        }



        let slider = new SliderModel({
            page: req.params.page,
            section: req.params.section,
            title,
            content,
            slides: [
                newSlider
            ]
        })
        await slider.save()
        return res.status(200).json({ message: `${slider.section} slider added successfully`, slider })
    } catch (error) {
        if (error.name === 'MongooseError' && error.message.includes('buffering timed out')) {
            return next(new Error("Database connection timeout. Please try again."))
        }
        return next(error)
    }
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
    let slider = await SliderModel.findById(req.params.sliderId)
    if (!slider) {
        return next(new Error("section not found"))
    }


    let text = req.body?.text
    let arabic = req.body?.arabic
    let english = req.body?.english
    let image = req.file;
    let secure_url, public_id;

    if (image) {
        let data = await cloudinary.uploader.upload(image.path, {
            folder: `superAdmin/${slider.page}/${slider.section}/slider`
        })

        secure_url = data.secure_url
        public_id = data.public_id
    }

    slider.slides.push({
        arabic,
        english,
        image: {
            secure_url,
            public_id
        },
        text: text?.trim()
    })
    await slider.save()
    return res.status(200).json({ message: `${slider.section} slider added successfully`, slider })
}

export let updateSlide = async (req, res, next) => {
    let slider = await SliderModel.findOne({ page: req.params.page, section: req.params.section })
    if (!slider) {
        return next(new Error("section not found"))
    }

    let arabic = req.body?.arabic
    let english = req.body?.english
    let image = req.file;
    let text = req.body?.text

    let target = slider.slides.find((slide) => slide._id == req.params.slideId)
    if (!target) {
        return next(new Error("wrong slider id"))
    }

    if (arabic?.title) target.arabic.title = arabic.title.trim()
    if (arabic?.content) target.arabic.content = arabic.content.trim()
    if (english?.title) target.english.title = english.title.trim()
    if (english?.content) target.english.content = english.content.trim()
    if (text) target.text = text.trim()

    if (image) {

        if (target?.image?.public_id) {
            await cloudinary.uploader.destroy(target.image.public_id)
        }

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

export let updateSlider = async (req, res, next) => {
console.log(typeof req.body.title , "before")
    if (typeof req.body?.title === 'string') {
        req.body.title = JSON.parse(req.body?.title)
    }
    if (typeof req.body?.content === 'string') {
        req.body.content = JSON.parse(req.body?.content)
    }
    console.log(typeof req.body.title , "after")


    let slider = await SliderModel.findById(req.params.sliderId)
    if (!slider) {
        return next(new Error("section not found"))
    }

    let title = req.body?.title
    let content = req.body?.content




    if (title?.arabic) slider.title.arabic = title.arabic.trim()
    if (title?.english) slider.title.english = title.english.trim()


    if (content?.arabic) slider.content.arabic = content.arabic.trim()
    if (content?.english) slider.content.english = content.english.trim()


    await slider.save()
    return res.status(200).json({ message: `${slider.section} slider updated successfully`, slider })

}

export let deleteSlider = async (req, res, next) => {
    let slider = await SliderModel.findByIdAndDelete(req.params.sliderId)
    if (!slider) {
        return next(new Error("section not found"))
    }

    for (const slide of slider.slides) {
        await cloudinary.uploader.destroy(slide.image.public_id).catch(err => next(new Error("Image deletion failed " + err.message + "")))
    }

    return res.status(200).json({ message: `${slider.section} slider deleted successfully`, slider })
}

export let deleteSlide = async (req, res, next) => {
    let slider = await SliderModel.findOne({ page: req.params.page, section: req.params.section })
    if (!slider) {
        return next(new Error("section not found"))
    }




    let target = slider.slides.find((slide) => {


        return slide._id.toString() == req.params.slideId
    })

    if (!target) {
        return next(new Error("wrong slide id"))
    }

    await cloudinary.uploader.destroy(target.image.public_id).catch(err => next(new Error("Image deletion failed " + err.message + "")))
    slider.slides = slider.slides.filter((slide) => slide._id != req.params.slideId)
    await slider.save()
    return res.status(200).json({ message: `${slider.section} slider deleted successfully`, slider })
}

