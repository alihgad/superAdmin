"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTestimonial = createTestimonial;
exports.updateTestimonial = updateTestimonial;
exports.deleteTestimonial = deleteTestimonial;
exports.getAllTestimonials = getAllTestimonials;
exports.getTestimonialById = getTestimonialById;
const testimonials_1 = require("../../db/models/testimonials");
const cloudinary_1 = require("cloudinary");
async function createTestimonial(req, res) {
    let { arabic, english } = req.body;
    if (typeof arabic == "string")
        arabic = JSON.parse(arabic);
    if (typeof english == "string")
        english = JSON.parse(english);
    let image;
    if (req.file) {
        let { public_id, secure_url } = await cloudinary_1.v2.uploader.upload(req.file.path, {
            folder: "superAdmin/testimonials",
        });
        image = { public_id, secure_url };
    }
    const testimonial = await testimonials_1.testimonialModel.create({
        arabic,
        english,
        image,
    });
    return res.status(201).json({ message: "Testimonial created", testimonial });
}
async function updateTestimonial(req, res, next) {
    const { id } = req.params;
    let { arabic, english } = req.body;
    if (typeof arabic == "string")
        arabic = JSON.parse(arabic);
    if (typeof english == "string")
        english = JSON.parse(english);
    let testimonial = await testimonials_1.testimonialModel.findById(id);
    if (!testimonial)
        return next(new Error("Testimonial not found", { cause: 404 }));
    let img;
    if (req.file) {
        if (testimonial.image?.public_id) {
            await cloudinary_1.v2.uploader
                .destroy(testimonial.image.public_id)
                .catch((err) => console.log(err));
        }
        let { public_id, secure_url } = await cloudinary_1.v2.uploader
            .upload(req.file.path, {
            folder: "superAdmin/testimonials",
        })
            .catch((err) => console.log(err));
        img = { public_id, secure_url };
    }
    if (arabic?.name)
        testimonial.arabic.name = arabic.name;
    if (arabic?.text)
        testimonial.arabic.text = arabic.text;
    if (arabic?.company)
        testimonial.arabic.company = arabic.company;
    if (english?.name)
        testimonial.english.name = english.name;
    if (english?.text)
        testimonial.english.text = english.text;
    if (english?.company)
        testimonial.english.company = english.company;
    if (img)
        testimonial.image = img;
    await testimonial.save();
    return res.json({ message: "Testimonial updated", testimonial });
}
async function deleteTestimonial(req, res, next) {
    const { id } = req.params;
    const testimonial = await testimonials_1.testimonialModel.findByIdAndDelete(id);
    if (!testimonial)
        return next(new Error("Testimonial not found", { cause: 404 }));
    if (testimonial.image?.public_id) {
        await cloudinary_1.v2.uploader
            .destroy(testimonial.image.public_id)
            .catch((err) => console.log(err));
    }
    return res.json({ message: "Testimonial deleted", testimonial });
}
async function getAllTestimonials(req, res, next) {
    const testimonials = await testimonials_1.testimonialModel.find();
    if (!testimonials)
        return next(new Error("Testimonials not found", { cause: 404 }));
    return res.json({ testimonials });
}
async function getTestimonialById(req, res, next) {
    const { id } = req.params;
    const testimonial = await testimonials_1.testimonialModel
        .findById(id)
        .catch((err) => next(new Error("Testimonial not found", { cause: 404 })));
    if (!testimonial)
        return next(new Error("Testimonial not found", { cause: 404 }));
    return res.json({ testimonial });
}
//# sourceMappingURL=testimonial.service.js.map