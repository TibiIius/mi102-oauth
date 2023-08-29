import type { KeycloakConfig } from 'keycloak-js'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import { keycloakPlugin } from './plugins/keycloak'
import './styles.css'

const keycloakOptions: KeycloakConfig = {
  clientId: 'vue-public-client',
  realm: 'FHKiel',
  url: 'http://localhost:8080/'
}

const app = createApp(App)

app.use(createPinia()).use(keycloakPlugin, keycloakOptions)

app.config.globalProperties.$keycloak
  .init({
    onLoad: 'check-sso'
  })
  .then(() => {
    app.mount('#app')
  })
