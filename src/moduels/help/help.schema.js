import Joi from "joi";
import * as globalFields from "../../utils/globalFields.js";

export const updateArticleSchema = {
  params: Joi.object({
    id: Joi.string().trim().required().messages({
      "any.required": "Article id is required",
      "string.base": "Article id must be a string"
    })
  }),

  body: Joi.object({
    article: Joi.object({
      arabic: Joi.string().trim().required().messages({
        "any.required": "Arabic article is required",
        "string.base": "Arabic article must be a string"
      }),
      english: Joi.string().trim().required().messages({
        "any.required": "English article is required",
        "string.base": "English article must be a string"
      })
    }),
    arabic: Joi.object({
      title: Joi.string().min(3).messages({
        "string.min": "Arabic title must be at least 3 characters",
        "string.base": "Arabic title must be a string"
      }),
      content: Joi.string().min(3).messages({
        "string.min": "Arabic content must be at least 3 characters",
        "string.base": "Arabic content must be a string"
      }),
      steps: Joi.array().items(Joi.string().trim()).messages({
        "array.base": "Arabic steps must be an array of strings"
      })
    }).optional(),

    english: Joi.object({
      title: Joi.string().min(3).messages({
        "string.min": "English title must be at least 3 characters",
        "string.base": "English title must be a string"
      }),
      content: Joi.string().min(3).messages({
        "string.min": "English content must be at least 3 characters",
        "string.base": "English content must be a string"
      }),
      steps: Joi.array().items(Joi.string().trim()).messages({
        "array.base": "English steps must be an array of strings"
      })
    }).optional()

  })
  ,
  files: Joi.object({
    image: Joi.array().items(globalFields.file).required(),
    cover: Joi.array().items(globalFields.file).required(),
    vedio: Joi.array().items(globalFields.file).required(),
  }).optional()

};

export const addArticleSchema = {
  body: Joi.object({
    article: Joi.object({
      arabic: Joi.string().trim().required().messages({
        'any.required': 'Arabic article is required',
        'string.base': 'Arabic article must be a string',
      }),
      english: Joi.string().trim().required().messages({
        'any.required': 'English article is required',
        'string.base': 'English article must be a string',
      })
      }),

    arabic: Joi.object({
      title: Joi.string()
        .trim()
        .required()
        .messages({
          'any.required': 'Arabic title is required',
          'string.base': 'Arabic title must be a string',
        }),
      content: Joi.string()
        .trim()
        .required()
        .messages({
          'any.required': 'Arabic content is required',
          'string.base': 'Arabic content must be a string',
        }),

      steps: Joi.array().items(Joi.string().trim()).min(1).required().messages({
        'array.base': 'Arabic steps must be an array of strings',
        'any.required': 'Arabic steps are required',
        'array.min': 'At least one Arabic step is required'
      })
    }).required(),

    english: Joi.object({
      title: Joi.string()
        .trim()
        .required()
        .messages({
          'any.required': 'English title is required',
          'string.base': 'English title must be a string',
        }),

      content: Joi.string()
        .trim()
        .required()
        .messages({
          'any.required': 'English content is required',
          'string.base': 'English content must be a string',
        }),

      steps: Joi.array().items(Joi.string().trim()).min(1).required().messages({
        'array.base': 'English steps must be an array of strings',
        'any.required': 'English steps are required',
        'array.min': 'At least one English step is required'
      })
    }).required(),
  }),

  files: Joi.object({
    image: Joi.array().items(globalFields.file).required(),
    cover: Joi.array().items(globalFields.file).required(),
    vedio: Joi.array().items(globalFields.file).required(),
  }).optional()
};

export const deleteArticleSchema = {
  params: Joi.object({
    id: Joi.string()
      .trim()
      .required()
      .messages({
        "any.required": "Article id is required",
        "string.base": "Article id must be a string"
      })
  })
};

export const getArticleSchema = {
  params: Joi.object({
    id: globalFields.id
  })
}