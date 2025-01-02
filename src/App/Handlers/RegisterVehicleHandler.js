import Vehicle from "../../Domain/Vehicle.js";

export default class RegisterVehicleHandler {
  constructor(fleetRepository) {
    this.fleetRepository = fleetRepository;
  }

  handle(command) {
    const { fleetId, vehiclePlateNumber } = command;
    const fleet = this.fleetRepository.findById(fleetId);

    if (!fleet) {
      throw new Error("Fleet not found.");
    }

    const vehicle = new Vehicle(vehiclePlateNumber);
    fleet.addVehicle(vehicle);

    this.fleetRepository.save(fleet);
  }
}
