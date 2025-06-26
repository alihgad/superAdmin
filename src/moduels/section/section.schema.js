import  joi from "joi";
import  * as  globalFields  from "../../utils/globalFields.js";

export const addSectionSchema = {
    body: joi.object({
        arabic: joi.object({
            title: joi.string().allow('', null),
            content: joi.string().allow('', null)
        }).optional(),
        english: joi.object({
            title: joi.string().allow('', null),
            content: joi.string().allow('', null)
        }).optional(),
        
    }),
    files: globalFields.files.optional(),
    params : joi.object({
        page: joi.string().required(),
        section: joi.string().required(),
    }).optional()

};

export const createSliderSchema = {
  body: joi.object({
    arabic: joi.object({
      title: joi.string().allow("").optional(),
      content: joi.string().allow("").optional()
    }).optional(),

    english: joi.object({
      title: joi.string().allow("").optional(),
      content: joi.string().allow("").optional()
    }).optional()
  })
};
