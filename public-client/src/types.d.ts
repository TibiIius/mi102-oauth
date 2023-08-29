import Keycloak from 'keycloak-js'

declare module 'vue' {
  interface ComponentCustomProperties {
    $keycloak: Keycloak
  }
}
