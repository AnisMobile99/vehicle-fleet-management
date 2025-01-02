import { Given, When, Then } from "@cucumber/cucumber";
import assert from "assert";
import Fleet from "../src/Domain/Fleet.js";
import Vehicle from "../src/Domain/Vehicle.js";
import MemoryFleetRepository from "../src/Infra/MemoryFleetRepository.js";

const fleetRepository = new MemoryFleetRepository();

Given("a fleet for registration {string}", function (fleetId) {
  this.currentFleet = new Fleet(fleetId);
  fleetRepository.save(this.currentFleet);
});

Given("a vehicle with plate number {string}", function (plateNumber) {
  this.vehicle = new Vehicle(plateNumber);
});

When("I register this vehicle into the fleet", function () {
  try {
    this.currentFleet.addVehicle(this.vehicle);
    fleetRepository.save(this.currentFleet);
  } catch (e) {
    this.error = e.message;
  }
});

Then("the fleet should contain the vehicle {string}", function (plateNumber) {
  assert(this.currentFleet.hasVehicle(plateNumber));
});

Then("I should see an error {string}", function (expectedError) {
  assert.strictEqual(this.error, expectedError);
});

// Étape unique pour enregistrer un véhicule dans la flotte
Given("this vehicle is registered in the fleet", function () {
  this.currentFleet.addVehicle(this.vehicle);
  fleetRepository.save(this.currentFleet);
});

Given("this vehicle is already registered in the fleet", function () {
  try {
    this.currentFleet.addVehicle(this.vehicle);
    fleetRepository.save(this.currentFleet);
  } catch (e) {
    this.error = e.message;
  }
});
