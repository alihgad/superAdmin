import Joi from "joi";
import * as globalFields from "../../utils/globalFields";

export const addHardwareSchema = {
  body: Joi.object({
    arabic: Joi.object({
      name: Joi.string().trim().messages({
        "string.base": "Arabic name must be a string",
      }),
      description: Joi.string().trim().messages({
        "string.base": "Arabic description must be a string",
      }),
      spec: Joi.array().items(
        Joi.object({
          name: Joi.string().trim().required(),
          value: Joi.string().trim().required(),
        })
      ),
    }).optional(),

    english: Joi.object({
      name: Joi.string().trim().messages({
        "string.base": "English name must be a string",
      }),
      description: Joi.string().trim().messages({
        "string.base": "English description must be a string",
      }),
      spec: Joi.array().items(
        Joi.object({
          name: Joi.string().trim().required(),
          value: Joi.string().trim().required(),
        })
      ),
    }).optional(),

    enumKey: Joi.string().trim().messages({
      "string.base": "Enum key must be a string",
    }),

    price: Joi.number().positive().messages({
      "number.base": "Price must be a number",
      "number.positive": "Price must be positive",
    }),

    isActive: Joi.boolean().default(true).messages({
      "boolean.base": "isActive must be a boolean",
    }),
  }),

  files: Joi.object({
    image: Joi.array().items(globalFields.file),
  }).optional(),
};

export const updateHardwareSchema = {
  params: Joi.object({
    id: Joi.string().trim().messages({
      "string.base": "Hardware id must be a string",
    }),
  }),

  body: Joi.object({
    arabic: Joi.object({
      name: Joi.string().trim().messages({
        "string.base": "Arabic name must be a string",
      }),
      description: Joi.string().trim().messages({
        "string.base": "Arabic description must be a string",
      }),
      spec: Joi.array().items(
        Joi.object({
          name: Joi.string().trim().required(),
          value: Joi.string().trim().required(),
        })
      ),
    }),

    english: Joi.object({
      name: Joi.string().trim().messages({
        "string.base": "English name must be a string",
      }),
      description: Joi.string().trim().messages({
        "string.base": "English description must be a string",
      }),
      spec: Joi.array().items(
        Joi.object({
          name: Joi.string().trim().required(),
          value: Joi.string().trim().required(),
        })
      ),
    }),

    enumKey: Joi.string().trim().messages({
      "string.base": "Enum key must be a string",
    }),

    price: Joi.number().positive().messages({
      "number.base": "Price must be a number",
      "number.positive": "Price must be positive",
    }),

    isActive: Joi.boolean().messages({
      "boolean.base": "isActive must be a boolean",
    }),
  }),

  files: Joi.object({
    image: globalFields.file,
  }).optional(),
};

export const deleteHardwareSchema = {
  params: Joi.object({
    id: Joi.string().trim().messages({
      "string.base": "Hardware id must be a string",
    }),
  }),
};

export const getHardwareSchema = {
  params: Joi.object({
    id: globalFields.id,
  }),
};
