import express, { Router } from "express";
import {
    getEvents,
    createEvent,
    updateEventWithId,
    deleteEventById,
    getHealth,
    getSelectedEvent,
} from "../controllers/eventController";
import { validateRequest } from "../middleware/validate";
import { eventSchemas } from "../validation/eventSchemas"


const router: Router = express.Router();

/**
 * @openapi
 * /events:
 *   get:
 *     summary: Retrieve a list of events with optional filtering
 *     tags: [Events]
 *     responses:
 *       '200':
 *         description: Successfully retrieved events
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 events:
 *                   type: array
 *                   items:
 *                     $ref: './models/event.yaml#/components/schemas/Event'
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 */
router.get("/events", getEvents);

/**
 * @openapi
 * /events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - date
 *               - capacity
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 3
 *                 example: "Tech Conference"
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-06-01T10:00:00Z"
 *               capacity:
 *                 type: integer
 *                 minimum: 5
 *                 example: 100
 *               registrationCount:
 *                 type: integer
 *                 minimum: 0
 *                 default: 0
 *                 example: 50
 *               status:
 *                 type: string
 *                 enum: [active, cancelled, completed]
 *                 default: active
 *               category:
 *                 type: string
 *                 enum: [general, sports, music, education]
 *                 default: general
 *     responses:
 *       '201':
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: './models/event.yaml#/components/schemas/Event'
 *       '400':
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/validations/Error'
 */
router.post("/events",validateRequest(eventSchemas.create), createEvent);

/**
 * @openapi
 * /events/{id}:
 *   get:
 *     summary: Get an event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       '200':
 *         description: Event retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/validations/Event'
 *       '404':
 *         description: Event not found
 */
router.get("/events/:id",validateRequest(eventSchemas.getById), getSelectedEvent);

/**
 * @openapi
 * /events/{id}:
 *   put:
 *     summary: Update an existing event
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: At least one field must be provided
 *             minProperties: 1
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 3
 *               date:
 *                 type: string
 *                 format: date-time
 *               capacity:
 *                 type: integer
 *                 minimum: 5
 *               registrationCount:
 *                 type: integer
 *                 minimum: 0
 *               status:
 *                 type: string
 *                 enum: [active, cancelled, completed]
 *               category:
 *                 type: string
 *                 enum: [general, sports, music, education]
 *     responses:
 *       '200':
 *         description: Event updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/validations/Event'
 *       '400':
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/validations/Error'
 *       '404':
 *         description: Event not found
 */
router.put("/events/:id",validateRequest(eventSchemas.update), updateEventWithId);

/**
 * @openapi
 * /events/{id}:
 *   delete:
 *     summary: Delete an event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       '204':
 *         description: Event deleted successfully
 *       '404':
 *         description: Event not found
 */
router.delete("/events/:id",validateRequest(eventSchemas.deleteById), deleteEventById);

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [System]
 *     responses:
 *       '200':
 *         description: Service health status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ok"
 *                 uptime:
 *                   type: number
 *                   example: 12345
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-01-01T12:00:00Z"
 *                 version:
 *                   type: string
 *                   example: "1.0.0"
 */
router.get("/health", getHealth);

export default router;