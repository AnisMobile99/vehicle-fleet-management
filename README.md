# Vehicle Fleet Management

## Description

Vehicle Fleet Management est une application permettant de gérer des flottes de véhicules et leurs localisations. L'objectif est de suivre chaque véhicule et de savoir où ils sont garés.

L'application est divisée en plusieurs étapes :

- **Étape 1** : Mise en place des fonctionnalités de base avec persistance en mémoire et tests BDD.
- **Étape 2** : Ajout d'un CLI pour interagir avec l'application et persistance hybride (fichier JSON et base SQLite).
- **Étape 3** : Mise en place d'outils de qualité de code et d'un pipeline CI/CD.

## Fonctionnalités principales

- **Création de flottes** : Permet de créer des flottes pour organiser les véhicules.
- **Enregistrement de véhicules** : Permet d'ajouter des véhicules à une flotte.
- **Localisation des véhicules** : Permet de localiser un véhicule dans une flotte.
- **Persistance hybride** : Les données sont sauvegardées dans un fichier JSON et une base SQLite.
- **Command Line Interface (CLI)** : Interactions simples via des commandes.

## Prérequis

- **Node.js** v18 ou supérieur
- **SQLite3** installé sur votre machine

## Installation

1. Clonez le dépôt :

   ```bash
   git clone <url-du-dépôt>
   cd VehicleFleetManagement
   ```

2. Installez les dépendances :

   ```bash
   npm install
   ```

3. Assurez-vous que les fichiers nécessaires (`fleets.json` et `fleets.db`) sont configurés automatiquement ou initialisés.

## Utilisation

L'application est pilotée via des commandes CLI :

### Commandes principales

1. **Créer une flotte** :

   ```bash
   node bin/cli.js create <fleetId>
   ```

   Exemple :

   ```bash
   node bin/cli.js create fleet1
   ```

2. **Enregistrer un véhicule dans une flotte** :

   ```bash
   node bin/cli.js register-vehicle <fleetId> <vehiclePlateNumber>
   ```

   Exemple :

   ```bash
   node bin/cli.js register-vehicle fleet1 ABC-123
   ```

3. **Localiser un véhicule dans une flotte** :

   ```bash
   node bin/cli.js localize-vehicle <fleetId> <vehiclePlateNumber> <lat> <lng> [alt]
   ```

   Exemple :

   ```bash
   node bin/cli.js localize-vehicle fleet1 ABC-123 48.8566 2.3522 35
   ```

4. **Lister toutes les flottes** :

   ```bash
   node bin/cli.js list-fleets
   ```

5. **Lister les véhicules d'une flotte** :

   ```bash
   node bin/cli.js list-vehicles <fleetId>
   ```

6. **Afficher la localisation d'un véhicule** :

   ```bash
   node bin/cli.js show-location <fleetId> <vehiclePlateNumber>
   ```

## Tests

### Tests unitaires

Pour exécuter les tests unitaires :

```bash
npm test
```

### Tests BDD

Pour exécuter les tests BDD :

```bash
npm run bdd-test
```

## Qualité du code

L'analyse statique du code est assurée par **ESLint**. Pour exécuter le linter :

```bash
npm run lint
```

## Pipeline CI/CD

Un pipeline CI/CD est configuré avec GitHub Actions pour :

- Vérifier la qualité du code avec ESLint.
- Exécuter les tests unitaires.

Le fichier de configuration se trouve dans `.github/workflows/ci.yml`.

## Structure du projet

```
./src/
   App/    # Commandes, requêtes et gestionnaires
   Domain/ # Modèles de domaine et objets de valeur
   Infra/  # Implémentations des repositories
bin/
   cli.js  # Interface en ligne de commande
features/
   *.feature # Scénarios BDD
step_definitions/
   *.js    # Définition des étapes pour les tests BDD
```

## Contributeurs

- **Nom** : Salah Bey Anis


