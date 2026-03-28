//New
/**Represents a single event */
export interface Event {
    id: string,
    name: string,
    date: string,
    capacity: number,
    registrationCount: number,
    status: string,
    category: string,
    createdAt: Date,
    updatedAt: Date
};

export interface CreateEvent {
    name: string,
    date: string,
    capacity: number,
    registrationCount: number,
    status: string,
    category: string
}