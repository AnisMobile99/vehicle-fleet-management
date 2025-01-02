#!/usr/bin/env node

import { Command } from "commander";
import HybridFleetRepository from "../src/Infra/HybridFleetRepository.js";
import Fleet from "../src/Domain/Fleet.js";
import Vehicle from "../src/Domain/Vehicle.js";
import sqlite3 from "sqlite3";
import fs from "fs";

const program = new Command();
const fleetRepository = new HybridFleetRepository(); // Using the hybrid repository

// Command: Create a new fleet
program
  .command("create <fleetId>")
  .description("Create a new fleet")
  .action(async (fleetId) => {
    const existingFleet = await fleetRepository.findById(fleetId);
    if (existingFleet) {
      console.error(`Fleet with ID '${fleetId}' already exists.`);
      return;
    }
    const fleet = new Fleet(fleetId);
    await fleetRepository.save(fleet);
    console.log(`Fleet created with ID: ${fleetId}.`);
  });

// Command: List all fleets
program
  .command("list-fleets")
  .description("List all fleets")
  .action(async () => {
    const fleets = await fleetRepository.getAll();
    if (fleets.length === 0) {
      console.log(
        "No fleets available. Create one using the 'create' command."
      );
    } else {
      console.log("Available fleets:");
      fleets.forEach((fleet) => {
        console.log(`- Fleet ID: ${fleet.id}`);
      });
    }
  });

// Command: Show details of a specific fleet
program
  .command("show-fleet <fleetId>")
  .description("Show details of a specific fleet")
  .action(async (fleetId) => {
    const fleet = await fleetRepository.findById(fleetId);
    if (!fleet) {
      console.error(`Fleet with ID '${fleetId}' does not exist.`);
      return;
    }
    console.log(`Fleet ID: ${fleet.id}`);
    console.log("Vehicles:");
    fleet.vehicles.forEach((vehicle) => {
      console.log(`- ${vehicle.plateNumber}`);
    });
    console.log("Locations:");
    fleet.locations.forEach((location, plateNumber) => {
      console.log(`- ${plateNumber}: ${JSON.stringify(location)}`);
    });
  });

// Command: Add a vehicle to a fleet
program
  .command("register-vehicle <fleetId> <vehiclePlateNumber>")
  .description("Register a vehicle into a fleet")
  .action(async (fleetId, vehiclePlateNumber) => {
    const fleet = await fleetRepository.findById(fleetId);
    if (!fleet) {
      console.error(
        `Fleet with ID '${fleetId}' does not exist. Please create it first.`
      );
      return;
    }
    try {
      const vehicle = new Vehicle(vehiclePlateNumber);
      fleet.addVehicle(vehicle);
      await fleetRepository.save(fleet);
      console.log(
        `Vehicle '${vehiclePlateNumber}' registered successfully in fleet '${fleetId}'.`
      );
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  });

// Command: Localize a vehicle in a fleet
program
  .command("localize-vehicle <fleetId> <vehiclePlateNumber> <lat> <lng> [alt]")
  .description("Localize a vehicle in a fleet")
  .action(async (fleetId, vehiclePlateNumber, lat, lng, alt = 0) => {
    const fleet = await fleetRepository.findById(fleetId);
    if (!fleet) {
      console.error(`Fleet with ID '${fleetId}' does not exist.`);
      return;
    }
    try {
      const location = {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        alt: parseFloat(alt),
      };
      fleet.localizeVehicle(vehiclePlateNumber, location);
      await fleetRepository.save(fleet);
      console.log(
        `Vehicle '${vehiclePlateNumber}' successfully localized in fleet '${fleetId}' at (${lat}, ${lng}, ${alt}).`
      );
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  });

// Command: List all vehicles in a fleet
program
  .command("list-vehicles <fleetId>")
  .description("List all vehicles in a fleet")
  .action(async (fleetId) => {
    const fleet = await fleetRepository.findById(fleetId);
    if (!fleet) {
      console.error(`Fleet with ID '${fleetId}' does not exist.`);
      return;
    }
    if (fleet.vehicles.size === 0) {
      console.log(`No vehicles registered in fleet '${fleetId}'.`);
    } else {
      console.log(`Vehicles in fleet '${fleetId}':`);
      fleet.vehicles.forEach((vehicle) => {
        console.log(`- ${vehicle.plateNumber}`);
      });
    }
  });

// Command: Show a vehicle's location
program
  .command("show-location <fleetId> <vehiclePlateNumber>")
  .description("Show the location of a specific vehicle in a fleet")
  .action(async (fleetId, vehiclePlateNumber) => {
    const fleet = await fleetRepository.findById(fleetId);
    if (!fleet) {
      console.error(`Fleet with ID '${fleetId}' does not exist.`);
      return;
    }
    const location = fleet.getLocation(vehiclePlateNumber);
    if (!location) {
      console.error(
        `Vehicle '${vehiclePlateNumber}' is not localized in fleet '${fleetId}'.`
      );
    } else {
      console.log(
        `Location of vehicle '${vehiclePlateNumber}': ${JSON.stringify(
          location
        )}`
      );
    }
  });

// Command: Inspect the SQLite database
program
  .command("inspect-db")
  .description("Inspect the SQLite database")
  .action(async () => {
    const db = new sqlite3.Database("fleets.db");
    console.log("Fleets:");
    db.all("SELECT * FROM fleets", (err, rows) => {
      if (err) console.error("Error fetching fleets:", err.message);
      else console.table(rows);
    });

    console.log("Vehicles:");
    db.all("SELECT * FROM vehicles", (err, rows) => {
      if (err) console.error("Error fetching vehicles:", err.message);
      else console.table(rows);
    });

    console.log("Locations:");
    db.all("SELECT * FROM locations", (err, rows) => {
      if (err) console.error("Error fetching locations:", err.message);
      else console.table(rows);
    });

    db.close();
  });

// Command: Clear the database
program
  .command("clear-db")
  .description("Clear the SQLite database")
  .action(async () => {
    try {
      await fleetRepository.clearDatabase();
      console.log("Database cleared successfully.");
    } catch (error) {
      console.error(`Error clearing database: ${error.message}`);
    }
  });

// Command: Export data to JSON
program
  .command("export-json")
  .description("Export all fleet data to a JSON file")
  .action(async () => {
    try {
      const jsonData = await fleetRepository.exportToJson();
      fs.writeFileSync("exported_fleets.json", jsonData, "utf8");
      console.log("Data exported successfully to exported_fleets.json");
    } catch (error) {
      console.error(`Error exporting data: ${error.message}`);
    }
  });

program.parse(process.argv);
