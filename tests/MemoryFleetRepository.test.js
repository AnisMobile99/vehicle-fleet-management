import MemoryFleetRepository from "../src/Infra/MemoryFleetRepository.js";
import Fleet from "../src/Domain/Fleet.js";
import { describe, test, beforeEach, expect } from "@jest/globals";

describe("MemoryFleetRepository", () => {
  let repository;

  beforeEach(() => {
    repository = new MemoryFleetRepository(false);
  });

  test("should save and retrieve a fleet", () => {
    const fleet = new Fleet("fleet1");
    repository.save(fleet);

    const retrievedFleet = repository.findById("fleet1");
    expect(retrievedFleet).toEqual(fleet);
  });

  test("should return undefined for a non-existent fleet", () => {
    const retrievedFleet = repository.findById("nonExistentFleet");
    expect(retrievedFleet).toBeUndefined();
  });

  test("should list all fleets", () => {
    const fleet1 = new Fleet("fleet1");
    const fleet2 = new Fleet("fleet2");

    repository.save(fleet1);
    repository.save(fleet2);

    const allFleets = repository.getAll();
    expect(allFleets).toEqual([fleet1, fleet2]);
  });

  test("should handle saving the same fleet ID twice", () => {
    const fleet1 = new Fleet("fleet1");
    repository.save(fleet1);

    const fleetDuplicate = new Fleet("fleet1");
    repository.save(fleetDuplicate);

    const allFleets = repository.getAll();
    expect(allFleets.length).toBe(1);
    expect(allFleets[0]).toEqual(fleetDuplicate);
  });
});
