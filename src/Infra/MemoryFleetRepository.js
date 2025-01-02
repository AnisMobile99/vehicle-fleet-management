import fs from "fs";
import path from "path";
import Fleet from "../Domain/Fleet.js";

const filePath = path.resolve("fleets.json");

export default class MemoryFleetRepository {
  constructor(persistToFile = true) {
    this.fleets = new Map();
    this.persistToFile = persistToFile;

    if (this.persistToFile) {
      this.loadFromFile();
    }
  }

  loadFromFile() {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf8");
      const parsedFleets = JSON.parse(data);
      parsedFleets.forEach((fleetData) => {
        const fleet = new Fleet(fleetData.id);

        Object.keys(fleetData.vehicles).forEach((plateNumber) => {
          fleet.addVehicle({ plateNumber });
        });

        Object.keys(fleetData.locations || {}).forEach((plateNumber) => {
          fleet.localizeVehicle(plateNumber, fleetData.locations[plateNumber]);
        });

        this.fleets.set(fleet.id, fleet);
      });
    }
  }

  saveToFile() {
    if (!this.persistToFile) return; // Désactiver la sauvegarde si la persistance est désactivée

    const fleetsArray = Array.from(this.fleets.values()).map((fleet) => ({
      id: fleet.id,
      vehicles: Object.fromEntries(fleet.vehicles),
      locations: Object.fromEntries(fleet.locations),
    }));
    fs.writeFileSync(filePath, JSON.stringify(fleetsArray, null, 2), "utf8");
  }

  findById(id) {
    return this.fleets.get(id);
  }

  save(fleet) {
    this.fleets.set(fleet.id, fleet);
    this.saveToFile();
  }

  getAll() {
    return Array.from(this.fleets.values());
  }
}
