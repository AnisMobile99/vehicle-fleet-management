export default class Vehicle {
  constructor(plateNumber) {
    if (!plateNumber) {
      throw new Error("Plate number is required.");
    }
    this.plateNumber = plateNumber;
  }
}
