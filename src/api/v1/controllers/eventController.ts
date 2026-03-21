import { Request, Response } from "express";
import { HealthCheckResponse } from "../models/healthCheck";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { createNewEvent, getByItemId, getAllItems as getAllEvents, deleteItemWithId, updateItemById } from "../services/eventServices"
import { UpdateItem, CreateEvent } from "../models/eventStructure"


export const getEvents = async (req: Request, res: Response) => {
    try {
        const items = await getAllEvents();
        res.status(HTTP_STATUS.OK).json({ Listing: items });
    }
    catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Internal server Error" });
    }
};

export const getSelectedEvent = async (req: Request, res: Response) => {
    try {
        let id = req.params.id as string;
        let result = await getByItemId(id);

        res.status(HTTP_STATUS.OK).json({ Item : result });
    }
    catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Internal server Error" });
    }
};

export const createEvent = async (req: Request, res: Response) => {

    try {
        const newEvent: CreateEvent = {
            name: req.body.name,
            date: req.body.date,
            capacity: req.body.capacity,
            registrationCount: req.body.registrationCount,
            status: req.body.status,
            category: req.body.category

        }
        let result = await createNewEvent(newEvent);

        res.status(HTTP_STATUS.CREATED).json({message: "Event Created", data: result });
    }
    catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Internal server Error" });
    }
};

export const updateEventWithId = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id as string;
    try {
        const change: Partial<UpdateItem> = req.body;

        let result = await updateItemById(id, change)
        res.status(HTTP_STATUS.OK).json({ update: result })
    }
    catch (error) {
        res.status(HTTP_STATUS.NOT_FOUND).json({ message: `Could not find ${id}` })
    }
};

export const deleteEventById = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id as string;
    try {
        await deleteItemWithId(id)
        res.status(HTTP_STATUS.OK).json({message: `Successful deletion of ${id}`})
    }
    catch (error) {
        res.status(HTTP_STATUS.NOT_FOUND).json({ message: `Could not find ${id}` })
    }
};

export const getHealth = (req: Request, res: Response): void => {
    const healthData: HealthCheckResponse = {
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0"
    };
    res.status(HTTP_STATUS.OK).json(healthData)
} 