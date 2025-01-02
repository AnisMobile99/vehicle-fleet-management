import Vehicle from "../src/Domain/Vehicle.js";
import { describe, test, expect } from "@jest/globals";

describe("Vehicle Entity", () => {
  test("should create a vehicle with a valid plate number", () => {
    const vehicle = new Vehicle("ABC-123");
    expect(vehicle.plateNumber).toBe("ABC-123");
  });

  test("should throw error if plate number is not provided", () => {
    expect(() => new Vehicle()).toThrow("Plate number is required.");
  });
});
