import { eventSchemas } from "../src/api/v1/validation/eventSchemas";

describe("eventSchemas.create.body", () => {
    it("passes when all fields are valid", () => {
        // Arrange
        const valid = {
            name: "Valid Event",
            date: new Date(Date.now() + 10000),
            capacity: 10,
            registrationCount: 5,
            status: "active",
            category: "general"
        };

        // Act
        const { error } = eventSchemas.create.body.validate(valid);

        // Assert
        expect(error).toBeUndefined();
    });

    it("fails when name is missing", () => {
        const invalid = {
            date: new Date(Date.now() + 10000),
            capacity: 10,
            registrationCount: 5,
            status: "active",
            category: "general"
        };

        const { error } = eventSchemas.create.body.validate(invalid);

        expect(error?.details[0].message).toBe("Event Name is required");
    });

    it("fails when date is in the past", () => {
        const invalid = {
            name: "Test",
            date: new Date(Date.now() - 10000),
            capacity: 10,
            registrationCount: 5,
            status: "active",
            category: "general"
        };

        const { error } = eventSchemas.create.body.validate(invalid);

        expect(error?.details[0].message).toBe("Event date must start after now");
    });

    it("fails when registrationCount exceeds capacity", () => {
        const invalid = {
            name: "Test",
            date: new Date(Date.now() + 10000),
            capacity: 5,
            registrationCount: 10,
            status: "active",
            category: "general"
        };

        const { error } = eventSchemas.create.body.validate(invalid);

        expect(error?.details[0].message).toBe("Registration count cannot exceed the capacity");
    });
});

describe("eventSchemas.update.params", () => {
    it("fails when id is missing", () => {
        const { error } = eventSchemas.update.params.validate({});

        expect(error?.details[0].message).toBe("ID is required");
    });

    it("passes with a valid id", () => {
        const { error } = eventSchemas.update.params.validate({ id: "123" });

        expect(error).toBeUndefined();
    });
});

describe("eventSchemas.update.body", () => {
    it("fails when body is empty", () => {
        const { error } = eventSchemas.update.body.validate({});

        expect(error?.details[0].message).toContain("must have at least 1 key");
    });

    it("passes when updating only one field", () => {
        const { error } = eventSchemas.update.body.validate({
            name: "Updated Name"
        });

        expect(error).toBeUndefined();
    });

    it("fails when date is in the past", () => {
        const { error } = eventSchemas.update.body.validate({
            date: new Date(Date.now() - 10000)
        });

        expect(error?.details[0].message).toBe("Event date must start after now");
    });
});

describe("eventSchemas.getById.params", () => {
    it("fails when id is empty", () => {
        const { error } = eventSchemas.getById.params.validate({ id: "" });

        expect(error?.details[0].message).toBe("ID cannot be empty");
    });

    it("passes with a valid id", () => {
        const { error } = eventSchemas.getById.params.validate({ id: "abc" });

        expect(error).toBeUndefined();
    });
});

describe("eventSchemas.deleteById.params", () => {
    it("fails when id is missing", () => {
        const { error } = eventSchemas.deleteById.params.validate({});

        expect(error?.details[0].message).toBe("ID is required");
    });

    it("passes with a valid id", () => {
        const { error } = eventSchemas.deleteById.params.validate({ id: "xyz" });

        expect(error).toBeUndefined();
    });
});