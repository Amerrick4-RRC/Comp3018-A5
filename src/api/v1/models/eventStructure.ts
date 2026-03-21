export interface Item {
    name: string,
    sku: string,
    quantity: number,
    price: number,
    category: string,
    createdAt: Date,
    updatedAt: Date,
    id: string
};

export interface CreateItem {
    name: string,
    sku: string,
    quantity: number,
    price: number,
    category: string
};

export interface UpdateItem {
    name: string,
    quantity: number,
    price: number,
    category: string
};

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