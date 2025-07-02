import Joi from 'joi';
import * as  globalField from '../../utils/globalFields.js';



export const addLinkSchema = {
    body: Joi.object({
        link: Joi.string()
            .trim()
            .lowercase()
            .required()
            .messages({
                'string.base': 'Link must be a string',
                'string.uri': 'Link must be a valid URI',
                'any.required': 'Link is required',
            }),

        arabic: Joi.object({
            title: Joi.string()
                .min(2)
                .trim()
                .lowercase()
                .required()
                .messages({
                    'string.base': 'Arabic title must be a string',
                    'string.min': 'Arabic title must be at least 2 characters',
                    'any.required': 'Arabic title is required',
                }),
        }).required(),

        english: Joi.object({
            title: Joi.string()
                .min(2)
                .trim()
                .lowercase()
                .required()
                .messages({
                    'string.base': 'English title must be a string',
                    'string.min': 'English title must be at least 2 characters',
                    'any.required': 'English title is required',
                }),
        }).required(),
    }),

    params: Joi.object({
        category: Joi.string()
            .trim()
            .lowercase()
            .required()
            .messages({
                'string.base': 'Category must be a string',
                'any.required': 'Category is required',
            }),
    }),
};


export const updateLinkSchema = {
    body: Joi.object({
        link: Joi.string()
            .trim()
            .lowercase()
            .messages({
                'string.base': 'Link must be a string',
                'string.uri': 'Link must be a valid URI',
            }),

        arabic: Joi.object({
            title: Joi.string()
                .min(2)
                .trim()
                .lowercase()
                .messages({
                    'string.base': 'Arabic title must be a string',
                    'string.min': 'Arabic title must be at least 2 characters',
                }),
        }),

        english: Joi.object({
            title: Joi.string()
                .min(2)
                .trim()
                .lowercase()
                .messages({
                    'string.base': 'English title must be a string',
                    'string.min': 'English title must be at least 2 characters',
                }),
        }),
    }).min(1).messages({
        'object.min': 'At least one field must be provided for update',
    }),

    params: Joi.object({
        id: globalField.id,
    }),
};


export const deleteLinkSchema = {
    params: Joi.object({
        id: globalField.id,
    }),
};

export const getAllCatLinksSchema = {
    params: Joi.object({
        category: Joi.string()
            .trim()
            .lowercase()
            .required()
            .messages({
                'string.base': 'Category must be a string',
                'any.required': 'Category is required',
            }),
    }),
}



export const addSocialSchema = {
    body: Joi.object({
        link: Joi.string()
            // .uri()
            // .trim()
            // .lowercase()
            // .required()
            // .messages({
            //     'string.base': 'Link must be a string',
            //     'string.uri': 'Link must be a valid URL',
            //     'any.required': 'Link is required'
            // }),
            .required(),

        icon: Joi.string()
            .trim()
            .lowercase()
            .required()
            .messages({
                'string.base': 'Icon must be a string',
                'any.required': 'Icon is required'
            }),
    }),
};



export const updateSocialSchema = {
    body: Joi.object({
        link: Joi.string()
            .uri()
            .trim()
            .lowercase()
            .messages({
                'string.base': 'Link must be a string',
                'string.uri': 'Link must be a valid URL',
            }),

        icon: Joi.string()
            .trim()
            .lowercase()
            .messages({
                'string.base': 'Icon must be a string',
            }),

        display: Joi.boolean()
            .messages({
                'boolean.base': 'Display must be true or false',
            }),
    }).min(1).messages({
        'object.min': 'At least one field must be provided to update',
    }),

    params: Joi.object({
        id: globalField.id
    }),
};


export const deleteSocialMediaSchema = {
    params: Joi.object({
        id: globalField.id
    })
}

