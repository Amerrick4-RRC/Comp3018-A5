import Joi from "joi";
import { Category, Status } from "../models/eventEnums"

// Post operation schemas organized by request part
export const eventSchemas = {
    // POST /posts - Create new item
    create: {
        body: Joi.object({
            name: Joi.string().min(3).required().messages({
                "any.required": "Event Name is required",
                "string.empty": "Event Name cannot be empty",
            }),
            date: Joi.date().greater("now").required().messages({
                "any.required": "Event Date is required",
                "date.base": "Event date must be in the form of a Date object",
                "date.greater": "Event date must start after now"
            }),
            capacity: Joi.number().integer().positive().min(5).required().messages({
                "any.required": "Must supply Event Capacity",
                "number.base": "Capacity must be a number",
                "number.integer": "Capacity must be an integer",
                "number.min": "Event must be for at least 5 participants",
                "number.positive": "Event capacity must be positive"
            }),
            registrationCount: Joi.number().min(0).max(Joi.ref("capacity")).default(0).messages({
                "number.min": "Registration count must be a positive number",
                "number.max": "Registration count cannot exceed the capacity"
            }),
            status: Joi.string().valid(...Object.values(Status)).default("active").messages({
                "string.empty": "Event status cannot be empty",
                "any.only": "Event status must be a valid category"
            }),
            category: Joi.string().valid(...Object.values(Category)).default("general").messages({
                "string.empty": "Event category cannot be empty",
                "any.only": "Event category must be a valid category"
            })
        }),
    },
    update: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "ID is required",
                "string.empty": "ID cannot be empty",
            })
        }),
        body: Joi.object({
            name: Joi.string().min(3).messages({
                "any.required": "Event Name is required",
                "string.empty": "Event Name cannot be empty",
            }),
            date: Joi.date().greater("now").messages({
                "any.required": "Event Date is required",
                "date.base": "Event date must be in the form of a Date object",
                "date.greater": "Event date must start after now"
            }),
            capacity: Joi.number().positive().min(5).messages({
                "any.required": "Must supply Event Capacity",
                "number.min": "Event must be for at least 5 participants",
                "number.positive": "Event capacity must be positive"
            }),
            registrationCount: Joi.number().positive().max(Joi.ref("capacity")).messages({
                "any.required": "Registration count is required",
                "number.positive": "Registration count must be a positive number",
                "number.max": "Registration count cannot exceed the capacity"
            }),
            status: Joi.string().valid(...Object.values(Status)).messages({
                "any.required": "Event status is required",
                "string.empty": "Event status cannot be empty",
                "any.only": "Event status must be a valid category"
            }),
            category: Joi.string().valid(...Object.values(Category)).messages({
                "any.required": "Event category is required",
                "string.empty": "Event category cannot be empty",
                "any.only": "Event category must be a valid category"
            })
        }).min(1)
    },
    getById: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "ID is required",
                "string.empty": "ID cannot be empty",
            })
        })
    },
    deleteById: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "ID is required",
                "string.empty": "ID cannot be empty",
            })
        })
    }
};