import { db } from "../../../../config/firebaseConfig";
import { DocumentReference } from "firebase-admin/firestore";
import * as models from "../models/eventStructure";

const collection: string = "Events"

export const addEvent = async (item: models.CreateEvent): Promise<models.Event> => {

    const docRef: DocumentReference = db.collection(collection).doc();

    const addition: models.Event = {
        name: item.name,
        date: item.date,
        capacity: item.capacity,
        registrationCount: item.registrationCount ?? 0,
        status: item.status ?? "active",
        category: item.category ?? "general",
        createdAt: new Date(),
        updatedAt: new Date(),
        id: docRef.id
    }

    await docRef.set(addition);

    console.log("Document added");
    return addition;
};

export const getEventById = async (id: string): Promise<models.Event> => {
    const docRef: DocumentReference = db.collection(collection).doc(id);

    const event = await docRef.get();

    if (event.exists) {
        console.log("document found")
        const data = event.data() as models.Event;
        for (const key in data) {
            const value = (data as any)[key];
            if (value && typeof value.toDate === "function") {
                (data as any)[key] = value.toDate();
            }
        }
        return data as models.Event;
    }
    else {
        console.log("document not found")
        throw new Error("Event not found")
    };
};

export const getAllEventsList = async (): Promise<models.Event[]> => {
    try {
        const snapshot = await db.collection(collection).get()
        const eventsListing: models.Event[] = snapshot.docs.map(doc => {
            const data = { ...doc.data() } as models.Event;
            for (const key in data) {
                const value = (data as any)[key];
                if (value && typeof value.toDate === "function") {
                    (data as any)[key] = value.toDate();
                }
            }
            return data;
        })
        return eventsListing;
    }
    catch (error) {
        throw new Error("Failed to fetch")
    };
};

export const updateEvent = async (id: string, update: Partial<models.CreateEvent>): Promise<models.Event> => {
    const docRef: DocumentReference = db.collection(collection).doc(id);

    try {
        const updates = {
            ...update,
            updatedAt: new Date()
        };

        await docRef.update(updates);

        const snapshot = await docRef.get();

        if (!snapshot.exists) {
            throw new Error("Event not found");
        }

        return {
            ...(snapshot.data() as models.Event),
            id: snapshot.id
        };

    } catch (error) {
        throw new Error("Event not found");
    }

};

export const deleteEventById = async (id: string): Promise<void> => {
    const docRef: DocumentReference = db.collection(collection).doc(id);
    const snapshot = await docRef.get();

    if (!snapshot.exists) {
        console.log("document not found");
        throw new Error("Event not found");
    }

    await docRef.delete();
    console.log("Event deleted")
};