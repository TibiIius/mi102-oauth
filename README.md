# MI102 OAuth

Dieses Projekt besteht aus mehreren Teilprojekten. Anhand dieser wird ein typisches Szenario für ein internes OAuth Autorisierungs- und Authentifizerungsverfahren gezeigt.

## Keycloak

Der genutzte OAuth-Server. Er verwaltet Nutzeraccounts und ermöglich SSO in verschiedenen Applikationen. Ferner können APIs über ihn geschützt werden.
Beim Starten mittels der Compose-Datei wird ein Keycloak-Container gebaut und verwendet, welcher den vorkonfigurierten Realm "FHKiel" enthält. Hier sind die 2 mit Keycloak interagierenden Clients bereits korrekt konfiguriert.

## Public Client

Eine VueJS-SPA. Sie bietet eine Einlogmöglichkeit via des obrig erwähnten Keycloak-Servers. Nach erfolgreichem Einloggen, spricht sie mit dem unten erwähnten Backend-Teil des Projekts und erlaubt den Nutzern, im Backend gespeicherte Todos abzurufen, neue abzufragen oder vorhandene zu löschen. Als Autorisierung wird der Access-Token, welcher durch Keycloak ausgestellt wurde, genutzt.

## Todo-API

NestJS-basierte API, welche den obrigen Keycloak-Server nutzt, um Anfragen an das Backend auf autorisierten Zugriff zu prüfen. Nutzt den `sub`-Claim innerhalb des geschickten Access-Tokens, um Todos Nutzern zuorndern und den Zugriff auf diese limiteren zu können.
