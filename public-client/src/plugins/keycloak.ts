import Keycloak, { type KeycloakConfig } from 'keycloak-js'
import type { App, InjectionKey } from 'vue'

export const keycloak = Symbol() as InjectionKey<Keycloak>

// Helper to have Keycloak available throughout the Vue application
export const keycloakPlugin = {
  install: (app: App, options: KeycloakConfig) => {
    const _keycloak = new Keycloak(options)
    // This gives easy access to the keycloak instance in templates.
    app.config.globalProperties.$keycloak = _keycloak
    // This enables the use of Vue's provide/inject pattern, used in scripts.
    app.provide(keycloak, _keycloak)
  }
}
