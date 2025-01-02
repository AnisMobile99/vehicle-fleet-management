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

## Step3 ( Bonus ) : 
1. Outils pour la qualité du code :
Pour garantir une qualité de code élevée, je recommande les outils suivants :

ESLint : Assure des normes de codage cohérentes en détectant et corrigeant les erreurs de syntaxe et les problèmes de style.
Prettier : Formate automatiquement le code pour maintenir un style uniforme, réduisant les conflits dans les pull requests.
Jest : Un framework de tests pour écrire et exécuter des tests unitaires et d'intégration, garantissant la fiabilité du code.
Husky : S'intègre à Git pour imposer des hooks pre-commit et pre-push, exécutant automatiquement des scripts de linting et de tests pour empêcher la soumission de code de mauvaise qualité.
SonarQube : Analyse statique du code pour détecter les vulnérabilités, les bugs et les mauvaises pratiques, assurant le respect des normes de sécurité et de qualité.
Ces outils améliorent collectivement la lisibilité, la fiabilité et la maintenabilité du code, tout en identifiant proactivement les problèmes avant le déploiement.

2. Mise en place d’un processus CI/CD :
Pour configurer un processus CI/CD efficace, voici les étapes à suivre :

Vérifications de qualité du code : Intégrez ESLint, Prettier et SonarQube dans le pipeline CI pour analyser automatiquement la qualité du code et appliquer les standards.
Hooks pre-commit : Utilisez Husky pour imposer des hooks pre-commit qui exécutent le linting et les tests avant chaque commit.
Tests automatisés : Ajoutez Jest au pipeline CI pour exécuter les tests unitaires et d'intégration (npm test) et s’assurer que les modifications n’introduisent pas de bugs.
Build et packaging : Utilisez Docker pour créer des artefacts de build cohérents pour les environnements de staging et de production.
Déploiement : Déployez les modifications dans des environnements de staging ou de production via GitHub Actions, GitLab CI ou un outil dédié comme AWS CodePipeline.


## Contributeurs

- **Nom** : Salah Bey Anis


