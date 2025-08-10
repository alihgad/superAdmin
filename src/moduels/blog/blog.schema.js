import Joi from "joi";
import * as globalFields from "../../utils/globalFields.js";

export const addBlogSchema = {
  body: Joi.object({
    text: Joi.string()
      .trim()
      .required()
      .messages({
        'any.required': 'Blog text is required',
        'string.base': 'Blog text must be a string',
      }),

    sections: Joi.array().items(
      Joi.object({
        title: Joi.string()
          .trim()
          .required()
          .messages({
            'any.required': 'Section title is required',
            'string.base': 'Section title must be a string',
          }),
        content: Joi.array()
          .items(Joi.string().trim())
          .min(1)
          .required()
          .messages({
            'array.base': 'Section content must be an array of strings',
            'any.required': 'Section content is required',
            'array.min': 'At least one content item is required'
          })
      })
    ).min(1).required().messages({
      'array.base': 'Sections must be an array',
      'any.required': 'Sections are required',
      'array.min': 'At least one section is required'
    })
  }),

  files: Joi.object({
    image: Joi.array().items(globalFields.file).required(),
  }).required()
};

export const updateBlogSchema = {
  params: Joi.object({
    id: Joi.string().trim().required().messages({
      "any.required": "Blog id is required",
      "string.base": "Blog id must be a string"
    })
  }),

  body: Joi.object({
    text: Joi.string()
      .trim()
      .messages({
        'string.base': 'Blog text must be a string',
      }),

    sections: Joi.array().items(
      Joi.object({
        title: Joi.string()
          .trim()
          .messages({
            'string.base': 'Section title must be a string',
          }),
        content: Joi.array()
          .items(Joi.string().trim())
          .min(1)
          .messages({
            'array.base': 'Section content must be an array of strings',
            'array.min': 'At least one content item is required'
          })
      })
    ).min(1).messages({
      'array.base': 'Sections must be an array',
      'array.min': 'At least one section is required'
    })
  }),

  files: Joi.object({
    image: globalFields.file,
  })
};

export const deleteBlogSchema = {
  params: Joi.object({
    id: Joi.string()
      .trim()
      .required()
      .messages({
        "any.required": "Blog id is required",
        "string.base": "Blog id must be a string"
      })
  })
};

export const getBlogSchema = {
  params: Joi.object({
    id: globalFields.id
  })
};

export const updateBlogSectionSchema = {
  params: Joi.object({
    blogId: globalFields.id,
    sectionId: globalFields.id
  }),

  body: Joi.object({
    title: Joi.string()
      .trim()
      .messages({
        'string.base': 'Section title must be a string',
      }),
    content: Joi.array()
      .items(Joi.string().trim())
      .min(1)
      .messages({
        'array.base': 'Section content must be an array of strings',
        'array.min': 'At least one content item is required'
      })
  })
};
