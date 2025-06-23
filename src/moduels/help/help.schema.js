import Joi from "joi";

export const updateArticleSchema = {
  params: Joi.object({
    articleName: Joi.string().trim().required().messages({
      "any.required": "Article name is required",
      "string.base": "Article name must be a string"
    })
  }),

  body: Joi.object({
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
  }).custom((value, helpers) => {
    const { arabic, english } = value;
    if (
      (!arabic?.title && !arabic?.content && !arabic?.steps) &&
      (!english?.title && !english?.content && !english?.steps)
    ) {
      return helpers.error("any.custom", { message: "At least one field in arabic or english is required" });
    }
    return value;
  }).messages({
    "any.custom": "{{#message}}"
  })
};
