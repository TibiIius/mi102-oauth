// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    port: 3050,
  },
  modules: [
    "@nuxtjs/eslint-module",
    "@nuxtjs/eslint-module",
    "@sidebase/nuxt-auth",
  ],
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  auth: {
    baseURL: "http://localhost:3050",
  },
  runtimeConfig: {
    keycloak: {
      clientId: "",
      clientSecret: "",
      issuer: "",
    },
  },
});
