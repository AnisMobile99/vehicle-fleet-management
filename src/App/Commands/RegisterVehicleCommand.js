export default class RegisterVehicleCommand {
  constructor(fleetId, vehiclePlateNumber) {
    this.fleetId = fleetId;
    this.vehiclePlateNumber = vehiclePlateNumber;
  }
}
