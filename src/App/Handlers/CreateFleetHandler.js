import Fleet from "../../Domain/Fleet";

export default class CreateFleetHandler {
  constructor(fleetRepository) {
    this.fleetRepository = fleetRepository;
  }

  handle(command) {
    const { fleetId } = command;
    if (this.fleetRepository.findById(fleetId)) {
      throw new Error(`Fleet with ID '${fleetId}' already exists.`);
    }

    const fleet = new Fleet(fleetId);
    this.fleetRepository.save(fleet);
    return fleet;
  }
}
