import sqlite3 from "sqlite3";
import fs from "fs";
import path from "path";
import Fleet from "../Domain/Fleet.js";

const filePath = path.resolve("fleets.json");

export default class HybridFleetRepository {
  constructor() {
    this.fleets = new Map();
    this.db = null;
    this.initDatabase();
    this.loadFromFile();
  }

  // Initialise la base de données SQLite
  initDatabase() {
    this.db = new sqlite3.Database("fleets.db", (err) => {
      if (err) {
        console.error("Error opening database:", err.message);
      } else {
        console.log("Connected to SQLite database.");
        this.db.run(`
          CREATE TABLE IF NOT EXISTS fleets (
            id TEXT PRIMARY KEY
          );
        `);
        this.db.run(`
          CREATE TABLE IF NOT EXISTS vehicles (
            plateNumber TEXT PRIMARY KEY,
            fleetId TEXT,
            FOREIGN KEY(fleetId) REFERENCES fleets(id)
          );
        `);
        this.db.run(`
          CREATE TABLE IF NOT EXISTS locations (
            plateNumber TEXT PRIMARY KEY,
            lat REAL,
            lng REAL,
            alt REAL,
            FOREIGN KEY(plateNumber) REFERENCES vehicles(plateNumber)
          );
        `);
      }
    });
  }

  // Charge les données depuis fleets.json
  loadFromFile() {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf8");
      const parsedFleets = JSON.parse(data);
      parsedFleets.forEach((fleetData) => {
        const fleet = new Fleet(fleetData.id);

        // Charger les véhicules
        Object.keys(fleetData.vehicles).forEach((plateNumber) => {
          fleet.addVehicle({ plateNumber });
        });

        // Charger les localisations
        Object.keys(fleetData.locations || {}).forEach((plateNumber) => {
          fleet.localizeVehicle(plateNumber, fleetData.locations[plateNumber]);
        });

        this.fleets.set(fleet.id, fleet);
      });
    }
  }

  // Sauvegarde les données dans fleets.json
  saveToFile() {
    const fleetsArray = Array.from(this.fleets.values()).map((fleet) => ({
      id: fleet.id,
      vehicles: Object.fromEntries(fleet.vehicles),
      locations: Object.fromEntries(fleet.locations),
    }));
    fs.writeFileSync(filePath, JSON.stringify(fleetsArray, null, 2), "utf8");
  }

  // Sauvegarde les données dans SQLite
  saveToDatabase(fleet) {
    this.db.run("INSERT OR IGNORE INTO fleets (id) VALUES (?)", fleet.id);

    for (const [plateNumber] of fleet.vehicles) {
      this.db.run(
        "INSERT OR IGNORE INTO vehicles (plateNumber, fleetId) VALUES (?, ?)",
        plateNumber,
        fleet.id
      );
    }

    for (const [plateNumber, location] of fleet.locations) {
      this.db.run(
        "INSERT OR REPLACE INTO locations (plateNumber, lat, lng, alt) VALUES (?, ?, ?, ?)",
        plateNumber,
        location.lat,
        location.lng,
        location.alt
      );
    }
  }

  // Trouve une flotte par ID (SQLite + Map)
  findById(id) {
    return new Promise((resolve, reject) => {
      const fleet = this.fleets.get(id);
      if (fleet) {
        resolve(fleet);
        return;
      }

      this.db.all(
        "SELECT * FROM vehicles WHERE fleetId = ?",
        id,
        (err, rows) => {
          if (err) {
            reject(err);
            return;
          }
          if (rows.length === 0) {
            resolve(null);
            return;
          }

          const newFleet = new Fleet(id);

          rows.forEach((row) => {
            newFleet.addVehicle({ plateNumber: row.plateNumber });
          });

          this.db.all(
            "SELECT * FROM locations WHERE plateNumber IN (SELECT plateNumber FROM vehicles WHERE fleetId = ?)",
            id,
            (locErr, locRows) => {
              if (locErr) {
                reject(locErr);
                return;
              }

              locRows.forEach((loc) => {
                newFleet.localizeVehicle(loc.plateNumber, {
                  lat: loc.lat,
                  lng: loc.lng,
                  alt: loc.alt,
                });
              });

              resolve(newFleet);
            }
          );
        }
      );
    });
  }

  // Sauvegarde une flotte (fichier + SQLite)
  async save(fleet) {
    this.fleets.set(fleet.id, fleet);
    this.saveToFile();
    this.saveToDatabase(fleet);
  }

  // Récupère toutes les flottes (SQLite + Map)
  getAll() {
    return new Promise((resolve, reject) => {
      const fleets = Array.from(this.fleets.values());
      if (fleets.length > 0) {
        resolve(fleets);
        return;
      }

      this.db.all("SELECT id FROM fleets", (err, rows) => {
        if (err) {
          reject(err);
          return;
        }

        const allFleets = rows.map((row) => new Fleet(row.id));
        resolve(allFleets);
      });
    });
  }

  async clearDatabase() {
    await this.db.exec(`
      DELETE FROM fleets;
      DELETE FROM vehicles;
      DELETE FROM locations;
    `);
    this.fleets.clear(); // Vide également la mémoire
    console.log("Database cleared.");
  }

  async exportToJson() {
    const fleets = await this.getAll();
    const fleetsArray = await Promise.all(
      fleets.map(async (fleet) => {
        const vehicles = Array.from(fleet.vehicles.keys());
        const locations = Object.fromEntries(fleet.locations);
        return { id: fleet.id, vehicles, locations };
      })
    );
    return JSON.stringify(fleetsArray, null, 2);
  }
}
