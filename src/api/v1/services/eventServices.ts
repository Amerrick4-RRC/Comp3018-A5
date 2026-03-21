import {addEvent, getEventById, getAllEventsList, updateEvent, deleteEventById} from "../repositories/eventRepository"
import { CreateEvent } from "../models/eventStructure"
import { Event } from "../models/eventStructure"

export const createNewEvent = async (event: CreateEvent): Promise<Event> => {
    let results = await addEvent(event);
    return results;
};

export const getByItemId = async (id: string ): Promise<Event> => {
    let results = await getEventById(id);
    return results;
};

export const getAllItems = async (): Promise<Event[]> =>{
    let results = await getAllEventsList();
    return results;
};

export const updateItemById = async (id: string, update: Partial<CreateEvent>): Promise<Event> => {
    let results = await updateEvent(id, update);
    return results;
};

export const deleteItemWithId = async (id: string): Promise<void> =>{
    await deleteEventById(id);
    return;
}