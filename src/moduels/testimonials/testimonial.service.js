import { testimonialModel } from '../../DB/models/testimonials.js';
import {v2 as cloudinary} from "cloudinary"
// Create testimonial
export async function createTestimonial(req, res) {
  const { arabic , english} = req.body;
  if(typeof arabic == "string") arabic = JSON.parse(arabic);
  if(typeof english == "string") english = JSON.parse(english);
  if(req.file){
  let {public_id, secure_url} = await cloudinary.uploader.upload(req.file.path, {
    folder: 'superAdmin/testimonials'
  })
  }
  const testimonial = await testimonialModel.create({
    arabic ,
    english,
    image: {public_id, secure_url}
  });
  return res.status(201).json({ message: 'Testimonial created', testimonial });
}

// Update testimonial
export async function updateTestimonial(req, res, next) {
  const { id } = req.params;
  const { arabic , english } = req.body;
  if(typeof arabic == "string") arabic = JSON.parse(arabic);
  if(typeof english == "string") english = JSON.parse(english);
  let testimonial = await testimonialModel.findById(id);
  if(!testimonial) return next(new Error("Testimonial not found", { cause: 404 }));
  let img;
  if(req.file){
    if(testimonial.image?.public_id){
      await cloudinary.uploader.destroy(testimonial.image.public_id).catch(err => console.log(err));
    }
    let {public_id, secure_url} = await cloudinary.uploader.upload(req.file.path, {
      folder: 'superAdmin/testimonials'
    }).catch(err => console.log(err));
    img = {public_id, secure_url}
  }
  
  if(arabic?.name) testimonial.arabic.name = arabic.name;
  if(arabic?.text) testimonial.arabic.text = arabic.text;
  if(arabic?.company) testimonial.arabic.company = arabic.company;
  
  if(english?.name) testimonial.english.name = english.name;
  if(english?.text) testimonial.english.text = english.text;
  if(english?.company) testimonial.english.company = english.company;
  
  if(img) testimonial.image = img;
  await testimonial.save();
  return res.json({ message: 'Testimonial updated', testimonial });
}

// Delete testimonial
export async function deleteTestimonial(req, res, next) {
  const { id } = req.params;
  const testimonial = await testimonialModel.findByIdAndDelete(id);
  if (!testimonial) return next(new Error("Testimonial not found", { cause: 404 }));
  if(testimonial.image?.public_id){
    await cloudinary.uploader.destroy(testimonial.image.public_id).catch(err => console.log(err));
  }
  return res.json({ message: 'Testimonial deleted'  , testimonial});
}

// Get all testimonials
export async function getAllTestimonials(req, res, next) {
  const testimonials = await testimonialModel.find();
  if (!testimonials) return next(new Error("Testimonials not found", { cause: 404 }));
  return res.json({ testimonials });
}

// Get testimonial by id
export async function getTestimonialById(req, res, next) {
  const { id } = req.params;
  const testimonial = await testimonialModel.findById(id).catch(err => next(new Error("Testimonial not found", { cause: 404 })));
  if (!testimonial) return next(new Error("Testimonial not found", { cause: 404 }));
  return res.json({ testimonial });
}


