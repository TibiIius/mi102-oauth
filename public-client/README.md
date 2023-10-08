# Public Client

Eine simple Webapplikation, in welcher Nutzer sich mittels ihres Keycloak-Accounts anmelden können. Der an die Webapp ausgestellte Access-Token wird zum Autorisieren gegenüber der Projekt-API genutzt.
Die Verbindung zu Keycloak wird mit der offiziellen `KeycloakJS`-Library realisiert

## IDE-Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Projekt-Setup

### Techstack

- Paketmanager: `yarn`
- NodeJS-Version: 18.x LTS
- VueJS 3 (SPA-Framework)
- TailwindCSS (CSS-Library)
- Prettier + ESLint (Formattierung und Linting)
- KeycloakJS (Helfs-Bibliothek für die Kommunikation mit Keycloak)

### Installieren der Abhängigkeiten und Aufsetzen des Projekts

```sh
yarn
```

### Development-Modus mit Hot-Reload-Funktion

```sh
yarn dev
```

### Production-Build

```sh
yarn build
```
