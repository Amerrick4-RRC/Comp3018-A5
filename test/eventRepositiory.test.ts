import { addEvent,getEventById, getAllEventsList, updateEvent, deleteEventById } from "../src/api/v1/repositories/eventRepository";
import { db } from "../config/firebaseConfig";

describe("addEvent", () => {
    it("adds an event and returns the created object", async () => {
        // Arrange
        const mockId = "abc123";
        const mockSet = jest.fn().mockResolvedValue(undefined);

        const docMock = jest.fn(() => ({
            id: mockId,
            set: mockSet,
        }));

        (db.collection as jest.Mock).mockReturnValue({ doc: docMock });

        const input = {
            name: "Test Event",
            date: "2027-1-1",
            capacity: 100,
            registrationCount: 0,
            status: "open",
            category: "general",
        };

        // Act
        const result = await addEvent(input);

        // Assert
        expect(result.id).toBe(mockId);
        expect(mockSet).toHaveBeenCalledTimes(1);
        expect(result.name).toBe("Test Event");
        expect(result.createdAt).toBeInstanceOf(Date);
        expect(result.updatedAt).toBeInstanceOf(Date);
    });
});

describe("getEventById", () => {
    it("returns an event with timestamps converted to JS Dates", async () => {
        // Arrange
        const mockDate = new Date("2024-01-01T00:00:00Z");
        const mockTimestamp = { toDate: () => mockDate };

        const mockData = {
            id: "123",
            name: "Test Event",
            date: mockTimestamp,
        };

        const getMock = jest.fn().mockResolvedValue({
            exists: true,
            data: () => mockData,
        });

        const docMock = jest.fn(() => ({ get: getMock }));
        (db.collection as jest.Mock).mockReturnValue({ doc: docMock });

        // Act
        const result = await getEventById("123");

        // Assert
        expect(result.date).toBeInstanceOf(Date);
        expect(result.date).toEqual(mockDate);
        expect(result.name).toBe("Test Event");
    });

    it("throws when event does not exist", async () => {
        // Arrange
        const getMock = jest.fn().mockResolvedValue({ exists: false });
        const docMock = jest.fn(() => ({ get: getMock }));
        (db.collection as jest.Mock).mockReturnValue({ doc: docMock });

        // Act + Assert
        await expect(getEventById("missing")).rejects.toThrow("Event not found");
    });
});

describe("getAllEventsList", () => {
    it("returns all events with timestamps converted to JS Dates", async () => {
        // Arrange
        const mockDate = new Date("2024-01-01T00:00:00Z");
        const mockTimestamp = { toDate: () => mockDate };

        const mockDocs = [
            { data: () => ({ id: "1", name: "Event 1", date: mockTimestamp }) },
            { data: () => ({ id: "2", name: "Event 2", date: mockTimestamp }) },
        ];

        const getMock = jest.fn().mockResolvedValue({ docs: mockDocs });
        (db.collection as jest.Mock).mockReturnValue({ get: getMock });

        // Act
        const result = await getAllEventsList();

        // Assert
        expect(result.length).toBe(2);
        expect(result[0].date).toBeInstanceOf(Date);
        expect(result[1].date).toEqual(mockDate);
        expect(result[0].name).toBe("Event 1");
    });

    it("throws when Firestore fails", async () => {
        // Arrange
        const getMock = jest.fn().mockRejectedValue(new Error("boom"));
        (db.collection as jest.Mock).mockReturnValue({ get: getMock });

        // Act + Assert
        await expect(getAllEventsList()).rejects.toThrow("Failed to fetch");
    });
});

describe("updateEvent", () => {
    it("updates an event and returns the updated object", async () => {
        // Arrange
        const mockId = "123";

        const updateMock = jest.fn().mockResolvedValue(undefined);

        const mockData = {
            id: mockId,
            name: "Updated Event",
            date: new Date(),
        };

        const getMock = jest.fn().mockResolvedValue({
            exists: true,
            id: mockId,
            data: () => mockData,
        });

        const docMock = jest.fn(() => ({
            update: updateMock,
            get: getMock,
        }));

        (db.collection as jest.Mock).mockReturnValue({ doc: docMock });

        // Act
        const result = await updateEvent(mockId, { name: "Updated Event" });

        // Assert
        expect(updateMock).toHaveBeenCalledTimes(1);
        expect(result.id).toBe(mockId);
        expect(result.name).toBe("Updated Event");
    });

    it("throws when event does not exist", async () => {
        // Arrange
        const updateMock = jest.fn().mockResolvedValue(undefined);
        const getMock = jest.fn().mockResolvedValue({ exists: false });

        const docMock = jest.fn(() => ({
            update: updateMock,
            get: getMock,
        }));

        (db.collection as jest.Mock).mockReturnValue({ doc: docMock });

        // Act + Assert
        await expect(updateEvent("missing", {})).rejects.toThrow("Event not found");
    });
});

describe("deleteEventById", () => {
    it("deletes an event when it exists", async () => {
        // Arrange
        const deleteMock = jest.fn().mockResolvedValue(undefined);
        const getMock = jest.fn().mockResolvedValue({ exists: true });

        const docMock = jest.fn(() => ({
            get: getMock,
            delete: deleteMock,
        }));

        (db.collection as jest.Mock).mockReturnValue({ doc: docMock });

        // Act
        await deleteEventById("123");

        // Assert
        expect(deleteMock).toHaveBeenCalledTimes(1);
    });

    it("throws when event does not exist", async () => {
        // Arrange
        const getMock = jest.fn().mockResolvedValue({ exists: false });
        const docMock = jest.fn(() => ({ get: getMock }));

        (db.collection as jest.Mock).mockReturnValue({ doc: docMock });

        // Act + Assert
        await expect(deleteEventById("missing")).rejects.toThrow("Event not found");
    });
});
