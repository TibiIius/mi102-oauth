import type { KeycloakConfig } from 'keycloak-js'
import { createApp } from 'vue'
import App from './App.vue'
import { keycloakPlugin } from './plugins/keycloak'
import './styles.css'
import { LocalStorageHelper } from './utils/localStorage'

const keycloakOptions: KeycloakConfig = {
  clientId: 'vue-public-client',
  realm: 'FHKiel',
  url: 'http://localhost:8080/'
}

const app = createApp(App)

app.use(keycloakPlugin, keycloakOptions)

const { tokens, timeSkew } = LocalStorageHelper.fromLocalStorage()

app.config.globalProperties.$keycloak
  .init({
    onLoad: 'check-sso',
    pkceMethod: 'S256',
    enableLogging: true,
    timeSkew: timeSkew,
    token: tokens?.token ?? undefined,
    idToken: tokens?.idToken ?? undefined,
    refreshToken: tokens?.refreshToken ?? undefined
  })
  .then(async () => {
    const keycloak = app.config.globalProperties.$keycloak

    try {
      await keycloak.updateToken(5)

      // Set tokens to localStorage
      LocalStorageHelper.toLocalStorage({
        tokens: {
          token: keycloak.token!,
          idToken: keycloak.idToken!,
          refreshToken: keycloak.refreshToken!
        },
        timeSkew: keycloak.timeSkew!
      })
    } catch (e) {
      keycloak.clearToken()
      localStorage.removeItem('tokens')
    }
  })
  .finally(() => {
    app.mount('#app')
  })
  .catch((e) => {
    console.log(e)
  })
