import Joi from "joi";
import * as globalFields from "../../utils/globalFields.js";

export const addLecinceSchema = {
  body: Joi.object({
    name: Joi.string()
      .trim()
      .messages({
        'string.base': 'Lecince name must be a string',
      }),

    enumKey: Joi.string()
      .trim()
      .messages({
        'string.base': 'Enum key must be a string',
      }),

    price: Joi.number()
      .positive()
      .messages({
        'number.base': 'Price must be a number',
        'number.positive': 'Price must be positive',
      }),

    isActive: Joi.boolean()
      .default(true)
      .messages({
        'boolean.base': 'isActive must be a boolean',
      }),
  })
};

export const updateLecinceSchema = {
  params: Joi.object({
    id: Joi.string()
      .trim()
      .messages({
        "string.base": "Lecince id must be a string"
      })
  }),

  body: Joi.object({
    name: Joi.string()
      .trim()
      .messages({
        'string.base': 'Lecince name must be a string',
      }),

    enumKey: Joi.string()
      .trim()
      .messages({
        'string.base': 'Enum key must be a string',
      }),

    price: Joi.number()
      .positive()
      .messages({
        'number.base': 'Price must be a number',
        'number.positive': 'Price must be positive',
      }),

    isActive: Joi.boolean()
      .messages({
        'boolean.base': 'isActive must be a boolean',
      }),
  })
};

export const deleteLecinceSchema = {
  params: Joi.object({
    id: Joi.string()
      .trim()
      .messages({
        "string.base": "Lecince id must be a string"
      })
  })
};

export const getLecinceSchema = {
  params: Joi.object({
    id: globalFields.id
  })
};
