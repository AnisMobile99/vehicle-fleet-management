import Fleet from "../src/Domain/Fleet.js";
import Vehicle from "../src/Domain/Vehicle.js";
import { describe, test, expect } from "@jest/globals";

describe("Fleet Entity", () => {
  let fleet;

  beforeEach(() => {
    fleet = new Fleet("testFleet");
  });

  test("should add a vehicle to the fleet", () => {
    const vehicle = new Vehicle("ABC-123");
    fleet.addVehicle(vehicle);

    expect(fleet.hasVehicle("ABC-123")).toBe(true);
  });

  test("should not allow duplicate vehicles in the fleet", () => {
    const vehicle = new Vehicle("ABC-123");
    fleet.addVehicle(vehicle);

    expect(() => fleet.addVehicle(vehicle)).toThrow(
      "Vehicle already registered in this fleet."
    );
  });

  test("should localize a vehicle in the fleet", () => {
    const vehicle = new Vehicle("ABC-123");
    fleet.addVehicle(vehicle);

    const location = { lat: 48.8566, lng: 2.3522, alt: 35 };
    fleet.localizeVehicle("ABC-123", location);

    expect(fleet.getLocation("ABC-123")).toEqual(location);
  });

  test("should throw error if vehicle is localized to the same location twice", () => {
    const vehicle = new Vehicle("ABC-123");
    fleet.addVehicle(vehicle);

    const location = { lat: 48.8566, lng: 2.3522, alt: 35 };
    fleet.localizeVehicle("ABC-123", location);

    expect(() => fleet.localizeVehicle("ABC-123", location)).toThrow(
      "Vehicle is already localized at this location."
    );
  });
});
