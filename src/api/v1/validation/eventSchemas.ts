import Joi from "joi";
import { Category, Status } from "../models/eventEnums"

/**
 * @openapi
 * paths:
 *   /events:
 *     post:
 *       summary: Create a new event
 *       tags:
 *         - Events
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/EventCreateRequest"
 *       responses:
 *         "201":
 *           description: Event created successfully
 *         "400":
 *           description: Validation error
 *
 *   /events/{id}:
 *     get:
 *       summary: Get event by ID
 *       tags:
 *         - Events
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: Event ID
 *       responses:
 *         "200":
 *           description: Event retrieved successfully
 *         "404":
 *           description: Event not found
 *
 *     put:
 *       summary: Update an existing event
 *       tags:
 *         - Events
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: Event ID
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/EventUpdateRequest"
 *       responses:
 *         "200":
 *           description: Event updated successfully
 *         "400":
 *           description: Validation error
 *         "404":
 *           description: Event not found
 *
 *     delete:
 *       summary: Delete event by ID
 *       tags:
 *         - Events
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: Event ID
 *       responses:
 *         "204":
 *           description: Event deleted successfully
 *         "404":
 *           description: Event not found
 *
 * components:
 *   schemas:
 *     EventCreateRequest:
 *       type: object
 *       required:
 *         - name
 *         - date
 *         - capacity
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           example: "Tech Conference"
 *         date:
 *           type: string
 *           format: date-time
 *           description: Must be a future date
 *           example: "2025-06-01T10:00:00Z"
 *         capacity:
 *           type: integer
 *           minimum: 5
 *           example: 100
 *         registrationCount:
 *           type: integer
 *           minimum: 0
 *           description: Cannot exceed capacity
 *           default: 0
 *         status:
 *           type: string
 *           enum:
 *             - active
 *             - cancelled
 *             - completed
 *           default: active
 *         category:
 *           type: string
 *           enum:
 *             - general
 *             - sports
 *             - music
 *             - education
 *           default: general
 *
 *     EventUpdateRequest:
 *       type: object
 *       description: At least one field must be provided
 *       minProperties: 1
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *         date:
 *           type: string
 *           format: date-time
 *           description: Must be a future date
 *         capacity:
 *           type: integer
 *           minimum: 5
 *         registrationCount:
 *           type: integer
 *           minimum: 0
 *           description: Cannot exceed capacity
 *         status:
 *           type: string
 *           enum:
 *             - active
 *             - cancelled
 *             - completed
 *         category:
 *           type: string
 *           enum:
 *             - general
 *             - sports
 *             - music
 *             - education
 */
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
            registrationCount: Joi.number().positive().messages({
                "any.required": "Registration count is required",
                "number.positive": "Registration count must be a positive number"
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