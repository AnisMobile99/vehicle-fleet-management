import { Given, When, Then } from "@cucumber/cucumber";
import assert from "assert";
import Fleet from "../src/Domain/Fleet.js";

Given("a fleet for parking {string}", function (fleetId) {
  this.currentFleet = new Fleet(fleetId);
  this.location = null;
});

Given(
  "a location with latitude {string}, longitude {string}, and altitude {string}",
  function (lat, lng, alt) {
    this.location = {
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      alt: parseFloat(alt),
    };
  }
);

When("I park this vehicle at this location", function () {
  try {
    this.currentFleet.localizeVehicle(this.vehicle.plateNumber, this.location);
  } catch (e) {
    this.error = e.message;
  }
});

Then(
  "the location of the vehicle should be {string}",
  function (expectedLocation) {
    const location = this.currentFleet.getLocation(this.vehicle.plateNumber);
    const actualLocation = `${location.lat}, ${location.lng}, ${location.alt}`;
    assert.strictEqual(actualLocation, expectedLocation);
  }
);

Given("the vehicle is already parked at this location", function () {
  if (!this.currentFleet || !this.vehicle || !this.location) {
    throw new Error("Fleet, vehicle, or location is not initialized.");
  }
  this.currentFleet.localizeVehicle(this.vehicle.plateNumber, this.location);
});

When("I try to park this vehicle at the same location", function () {
  try {
    this.currentFleet.localizeVehicle(this.vehicle.plateNumber, this.location);
  } catch (e) {
    this.error = e.message;
  }
});

Then("I should see an error for parking {string}", function (expectedError) {
  assert.strictEqual(this.error, expectedError);
});
