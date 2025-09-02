import Joi from "joi";
import mongoose from "mongoose";

export const file = Joi.object({
  fieldname: Joi.string().required(),
  originalname: Joi.string().required(),
  encoding: Joi.string().required(),
  mimetype: Joi.string().required(),
  destination: Joi.string().required(),
  filename: Joi.string().required(),
  path: Joi.string().required(),
  size: Joi.number().required()
});

export const files = Joi.array().items(file).optional();

const objectIdValidator = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }
  return value;
};

export const id = Joi.string().custom(objectIdValidator, 'ObjectId validation').required().messages({
  'any.required': 'ID is required',
  'any.invalid': 'Invalid ID format',
  'string.base': 'ID must be a string',
});
