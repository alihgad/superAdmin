import joi from 'joi';
import * as globalFields from '../../utils/globalFields';

export const updateTestimonialSchema = {
  body: joi.object({
    name: joi.string().trim().min(2).messages({
      'string.base': 'Name must be a string',
      'string.min': 'Name must be at least 2 characters'
    }),
    text: joi.string().min(3).messages({
      'string.base': 'Text must be a string',
      'string.min': 'Text must be at least 3 characters'
    }),
    company: joi.string().trim().min(2).messages({
      'string.base': 'Company must be a string',
      'string.min': 'Company must be at least 2 characters'
    }),
    file: globalFields.file
  }),
  params: joi.object({
    id: joi.string().required().messages({
      'any.required': 'Testimonial ID is required'
    })
  }),
  files: joi.object({}).optional()
};


export const deleteTestimonialSchema = {

  params: joi.object({
    id: joi.string().required().messages({
      'any.required': 'Testimonial ID is required'
    })
  })

};

export const createTestimonialSchema = {
  body: joi.object({
    name: joi.string().trim().min(2).required().messages({
      'string.base': 'Name must be a string',
      'string.min': 'Name must be at least 2 characters',
      'any.required': 'Name is required'
    }),
    text: joi.string().min(3).required().messages({
      'string.base': 'Text must be a string',
      'string.min': 'Text must be at least 3 characters',
      'any.required': 'Text is required'
    }),
    company: joi.string().trim().min(2).required().messages({
      'string.base': 'Company must be a string',
      'string.min': 'Company must be at least 2 characters',
      'any.required': 'Company is required'
    })
  }),
  files: joi.object({
    file: globalFields.file
  })
};



