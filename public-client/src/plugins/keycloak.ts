import Keycloak, { type KeycloakConfig } from 'keycloak-js'
import type { App, InjectionKey } from 'vue'

export const keycloak = Symbol() as InjectionKey<Keycloak>

export const keycloakPlugin = {
  install: (app: App, options: KeycloakConfig) => {
    const _keycloak = new Keycloak(options)
    app.config.globalProperties.$keycloak = _keycloak
    app.provide(keycloak, _keycloak)
  }
}
