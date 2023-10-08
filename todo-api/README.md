# Todo-API

Eine simple API mitsamt SQLite-Datenbank, welche Todos von Nutzern speichert und diese an entsprechende Nutzer wieder herausgibt.

## Projekt

### Techstack

- Paketmanager: `yarn`
- NodeJS-Version: 18.x LTS
- NestJS 10 (Framework zum Bauen von REST-APIs)
- Prisma 5 (ORM zur Anbindung an das DBMS und Modellieren des DB-Schemas)
- Prettier + ESLint (Formattierung und Linting)
- Nest Keycloak Connect (Wrapper-Library für NestJS zur Verbindung mit Keycloak Connect)

### Installieren der Abhängigkeiten und Aufsetzen des Projekts

```sh
yarn
```

### Development-Modus mit Hot-Reload-Funktion

```sh
yarn start:dev
```

### Production-Umgebung

```sh
# generate Prisma client to hydrate for entities, types and methods
yarn prisma generate

# build in production mode
yarn build

# migrate DB and start NodeJS server in production mode
yarn start:migrate:prod
```
