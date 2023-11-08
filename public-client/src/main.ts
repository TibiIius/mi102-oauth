import type { KeycloakConfig } from 'keycloak-js'
import { createApp } from 'vue'
import App from './App.vue'
import { keycloakPlugin } from './plugins/keycloak'
import './styles.css'
import { LocalStorageHelper } from './utils/localStorage'
import { Api } from './utils/api'

// Keycloaks mandatory configuration options
const keycloakOptions: KeycloakConfig = {
  clientId: import.meta.env.VITE_PUBLIC_CLIENT_ID || 'vue-public-client', // Set in Keycloak directly, an identifier to associate the application with. We do not use client secrets in public clients as we can't secure them
  realm: import.meta.env.VITE_KEYCLOAK_AUTH_SERVER_REALM || 'FHKiel', // Keycloak-specific, basically an own isolated environment consisting of its own set of users, clients, session settings, etc.
  url: import.meta.env.VITE_KEYCLOAK_AUTH_SERVER_URL || 'http://localhost:8080/' // Base URL of the Keycloak server, will be needed to redirect the browser
}

const app = createApp(App)

app.use(keycloakPlugin, keycloakOptions)

const { tokens, timeSkew } = LocalStorageHelper.fromLocalStorage()

// The library needs to be initialized on application load via this method
app.config.globalProperties.$keycloak
  .init({
    onLoad: 'check-sso', // `check-sso` means to silently check for an active session against the configured Keycloak server, and to acquire new tokens should none be provided or should the provided ones be out-of-date
    pkceMethod: 'S256', // `S256` is the only supported PKCE method for this library. Setting this method essentially just enables PKCE. The corresponding Keycloak client will have to match the setting, otherwise authentication will not work
    enableLogging: true, // Enables library logging, good for debugging
    timeSkew: timeSkew, // Time dialation between the Keycloak server and the client. This can be important if the system clock is a few minutes behind or above the actual UNIX UTC time
    // The next 3 configuration options are setting initial values for the access, refresh and id tokens. Doing this enables persisting sessions between page refreshes, multiple tabs and browser restarts
    token: tokens?.token ?? undefined,
    idToken: tokens?.idToken ?? undefined,
    refreshToken: tokens?.refreshToken ?? undefined
  })
  .then(async () => {
    const keycloak = app.config.globalProperties.$keycloak

    try {
      // Checks if tokens loaded from local storage are still valid, and updates them in case they're not
      await Api.handleUnauthorized(keycloak)
    } catch (e) {
      // The token state could not be validated, so we assume that the tokens are invalidated, and that there is no active session for the user, so we just log remove the token, requiring him to re-authenticate against the Keycloak server.
      keycloak.clearToken()
      localStorage.removeItem('tokens')
    }
  })
  .finally(() => {
    // Vue-specific call, initialize the SPA Vue app.
    app.mount('#app')
  })
  .catch((e) => {
    console.log(e)
  })
