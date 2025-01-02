import { execSync } from "child_process";
import { describe, test, expect, beforeEach } from "@jest/globals";
import fs from "fs";
import path from "path";

const fleetsFilePath = path.resolve("fleets_test.json");

// Helper function to run CLI commands
const runCommand = (command) => {
  try {
    return execSync(`node bin/cli.js ${command}`, { encoding: "utf-8" }).trim();
  } catch (error) {
    return error.message.trim();
  }
};

describe("CLI Tests", () => {
  beforeEach(() => {
    // Clear the database or reset the fleet file before each test
    if (fs.existsSync(fleetsFilePath)) {
      fs.writeFileSync(fleetsFilePath, JSON.stringify([]), "utf8");
    }
    runCommand("clear-db");
  });

  test("should create a new fleet", () => {
    const output = runCommand("create fleetTest");
    expect(output).toBe("Fleet created with ID: fleetTest.");

    const fileContent = fs.readFileSync(fleetsFilePath, "utf8");
    const fleets = JSON.parse(fileContent);

    expect(fleets).toEqual([
      {
        id: "fleetTest",
        vehicles: {},
        locations: {},
      },
    ]);
  });

  test("should register a vehicle and localize it in the fleet", () => {
    runCommand("create fleetTest");
    runCommand("register-vehicle fleetTest ABC-123");
    const output = runCommand(
      "localize-vehicle fleetTest ABC-123 48.8566 2.3522 35"
    );

    expect(output).toBe(
      "Vehicle 'ABC-123' successfully localized in fleet 'fleetTest' at (48.8566, 2.3522, 35)."
    );

    const fileContent = fs.readFileSync(fleetsFilePath, "utf8");
    const fleets = JSON.parse(fileContent);

    expect(fleets[0].locations).toEqual({
      "ABC-123": { lat: 48.8566, lng: 2.3522, alt: 35 },
    });
  });

  test("should not register duplicate vehicles in the same fleet", () => {
    runCommand("create fleetTest");
    runCommand("register-vehicle fleetTest ABC-123");
    const output = runCommand("register-vehicle fleetTest ABC-123");

    expect(output).toBe("Error: Vehicle already registered in this fleet.");
  });

  test("should return error when localizing a vehicle in a non-existent fleet", () => {
    const output = runCommand(
      "localize-vehicle fleetTest ABC-123 48.8566 2.3522 35"
    );
    expect(output).toBe("Error: Fleet with ID 'fleetTest' does not exist.");
  });
});
