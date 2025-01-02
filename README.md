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
Étape 3 : Outils pour la qualité du code et pipeline CI/CD
Outils pour la qualité du code
Pour maintenir une qualité de code élevée, les outils suivants sont recommandés :

ESLint : Analyseur de code statique pour détecter les erreurs de syntaxe et appliquer des normes de codage cohérentes.
Prettier : Outil de formatage automatique pour garantir un style de code uniforme et réduire les conflits lors des revues de code.
Jest : Framework de tests pour écrire et exécuter des tests unitaires et d'intégration, assurant la fiabilité et la robustesse du code.
Husky : Outil permettant de définir des hooks Git comme pre-commit et pre-push, qui exécutent automatiquement les vérifications de linting et les tests avant chaque commit.
SonarQube : Analyseur statique pour identifier les vulnérabilités, les bugs et les mauvaises pratiques, tout en garantissant le respect des normes de sécurité et de qualité.
Ces outils travaillent ensemble pour améliorer la lisibilité, la maintenabilité et la sécurité du projet, tout en identifiant et corrigeant les problèmes dès leur apparition.

Mise en place d’un pipeline CI/CD
Un pipeline CI/CD garantit un processus automatisé pour le contrôle qualité et le déploiement. Voici les étapes nécessaires :

Analyse statique du code : Intégrez ESLint, Prettier et SonarQube dans le pipeline CI pour détecter automatiquement les problèmes de style, les bugs et les vulnérabilités.
Hooks Git : Configurez Husky pour exécuter des vérifications locales (linting, tests) avant les commits et les pushs. Cela empêche les contributions de mauvaise qualité d'être soumises au dépôt.
Tests automatisés : Configurez le pipeline pour exécuter les tests unitaires et d'intégration à l'aide de Jest (npm test).
Build et packaging : Utilisez Docker pour créer des artefacts de build standardisés, assurant une cohérence entre les environnements de staging et de production.
Déploiement automatisé : Mettez en place des outils comme GitHub Actions, GitLab CI, ou AWS CodePipeline pour automatiser le déploiement des modifications vers les environnements de staging ou de production.
Ce pipeline garantit une livraison continue de code de haute qualité et améliore la productivité de l'équipe.


## Contributeurs

- **Nom** : Salah Bey Anis


