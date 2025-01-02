export default class Fleet {
  constructor(id) {
    if (!id) {
      throw new Error("Fleet ID is required.");
    }
    this.id = id;
    this.vehicles = new Map(); // Stocke les véhicules par numéro de plaque
    this.locations = new Map(); // Stocke les localisations par numéro de plaque
  }

  addVehicle(vehicle) {
    if (this.vehicles.has(vehicle.plateNumber)) {
      throw new Error("Vehicle already registered in this fleet.");
    }
    this.vehicles.set(vehicle.plateNumber, vehicle);
  }

  hasVehicle(plateNumber) {
    return this.vehicles.has(plateNumber);
  }

  localizeVehicle(plateNumber, location) {
    if (!this.vehicles.has(plateNumber)) {
      throw new Error("Vehicle not found in this fleet.");
    }

    if (
      this.locations.has(plateNumber) &&
      JSON.stringify(this.locations.get(plateNumber)) ===
        JSON.stringify(location)
    ) {
      throw new Error("Vehicle is already localized at this location.");
    }

    this.locations.set(plateNumber, location);
  }

  getLocation(plateNumber) {
    return this.locations.get(plateNumber);
  }
}
