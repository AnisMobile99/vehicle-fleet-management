export default class LocalizeVehicleHandler {
  constructor(fleetRepository) {
    this.fleetRepository = fleetRepository;
  }

  handle(command) {
    const { fleetId, plateNumber, location } = command;
    const fleet = this.fleetRepository.findById(fleetId);
    if (!fleet) {
      throw new Error(`Fleet with ID '${fleetId}' not found.`);
    }

    fleet.localizeVehicle(plateNumber, location);
    this.fleetRepository.save(fleet);
  }
}
