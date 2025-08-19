import Joi from "joi";
import * as globalFields from "../../utils/globalFields.js";

export const addHardwareSchema = {
  body: Joi.object({
    name: Joi.object({
      arabic: Joi.string()
        .trim()
        .messages({
          'string.base': 'Arabic name must be a string',
        }),
      english: Joi.string()
        .trim()
        .messages({
          'string.base': 'English name must be a string',
        }),
    }).optional(),

    enumKey: Joi.string()
      .trim()
      .messages({
        'string.base': 'Enum key must be a string',
      }),

    description: Joi.object({
      arabic: Joi.string()
        .trim()
        .messages({
          'string.base': 'Arabic description must be a string',
        }),
      english: Joi.string()
        .trim()
        .messages({
          'string.base': 'English description must be a string',
        }),
    }).optional(),

    spec: Joi.object({
      arabic: Joi.array().items(Joi.string().trim()),
      english: Joi.array().items(Joi.string().trim())
    }).optional(),

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
  }),

  files: Joi.object({
    image: Joi.array().items(globalFields.file),
  }).optional()
};

export const updateHardwareSchema = {
  params: Joi.object({
    id: Joi.string()
      .trim()
      .messages({
        "string.base": "Hardware id must be a string"
      })
  }),

  body: Joi.object({
    name: Joi.object({
      arabic: Joi.string()
        .trim()
        .messages({
          'string.base': 'Arabic name must be a string',
        }),
      english: Joi.string()
        .trim()
        .messages({
          'string.base': 'English name must be a string',
        }),
    }),

    enumKey: Joi.string()
      .trim()
      .messages({
        'string.base': 'Enum key must be a string',
      }),

    description: Joi.object({
      arabic: Joi.string()
        .trim()
        .messages({
          'string.base': 'Arabic description must be a string',
        }),
      english: Joi.string()
        .trim()
        .messages({
          'string.base': 'English description must be a string',
        }),
    }),

    spec: Joi.object({
      arabic: Joi.array().items(Joi.string().trim()),
      english: Joi.array().items(Joi.string().trim())
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
  }),

  files: Joi.object({
    image: globalFields.file,
  }).optional()
};

export const deleteHardwareSchema = {
  params: Joi.object({
    id: Joi.string()
      .trim()
      .messages({
        "string.base": "Hardware id must be a string"
      })
  })
};

export const getHardwareSchema = {
  params: Joi.object({
    id: globalFields.id
  })
};
