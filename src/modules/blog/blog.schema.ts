import Joi from "joi";
import * as globalFields from "../../utils/globalFields";

export const addBlogSchema = {
  body: Joi.object({
    text: Joi.string()
      .trim()
      
      .messages({
        
        'string.base': 'Blog text must be a string',
      }),

    sections: Joi.array().items(
      Joi.object({
        title: Joi.object({
          arabic: Joi.string().trim().messages({
          
            'string.base': 'Section title must be a string',
          }),
          english: Joi.string().trim().messages({
        
            'string.base': 'Section title must be a string',
          }),
        }),
        content: Joi.object({
          arabic: Joi.array().items(Joi.string().trim()).min(1).messages({
          
            'string.base': 'Section content must be a string',
          }),
          english: Joi.array().items(Joi.string().trim()).min(1).messages({
        
            'string.base': 'Section content must be a string',
          }),
        })
      })
    ).min(1)
  }),

  files: Joi.object({
    image: Joi.array().items(globalFields.file)
  })
};

export const updateBlogSchema = {
  params: Joi.object({
    id: Joi.string().trim().messages({
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

export const deleteBlogSectionSchema = {
  params: Joi.object({
    id: globalFields.id,
    sectionId: globalFields.id
  })
}

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
    title: Joi.object({
      arabic: Joi.string().trim().messages({
        'string.base': 'Section title must be a string',
      }),
      english: Joi.string().trim().messages({
        'string.base': 'Section title must be a string',
      }),
    }),
    content: Joi.object({
      arabic: Joi.array().items(Joi.string().trim()).min(1).messages({
        'array.base': 'Section content must be an array of strings',
        'array.min': 'At least one content item is required'
      }),
      english: Joi.array().items(Joi.string().trim()).min(1).messages({
        'array.base': 'Section content must be an array of strings',
        'array.min': 'At least one content item is required'
      }),
    })
  })
};
export const addBlogSectionSchema = {
  params: Joi.object({
    blogId: globalFields.id,
  }),

  body: Joi.object({
    title: Joi.object({
      arabic: Joi.string().trim().messages({
        'string.base': 'Section title must be a string',
      }),
      english: Joi.string().trim().messages({
        'string.base': 'Section title must be a string',
      }),
    }),
    content: Joi.object({
      arabic: Joi.array().items(Joi.string().trim()).min(1).messages({
        'array.base': 'Section content must be an array of strings',
        'array.min': 'At least one content item is required'
      }),
      english: Joi.array().items(Joi.string().trim()).min(1).messages({
        'array.base': 'Section content must be an array of strings',
        'array.min': 'At least one content item is required'
      }),
    })
  })
};
