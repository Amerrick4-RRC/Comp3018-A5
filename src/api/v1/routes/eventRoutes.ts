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

router.get("/events", getEvents);
router.post("/events",validateRequest(eventSchemas.create), createEvent);
router.get("/events/:id",validateRequest(eventSchemas.getById), getSelectedEvent);
router.put("/events/:id",validateRequest(eventSchemas.update), updateEventWithId);
router.delete("/events/:id",validateRequest(eventSchemas.deleteById), deleteEventById);
router.get("/health", getHealth);

export default router;