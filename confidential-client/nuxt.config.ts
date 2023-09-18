// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    port: 3050,
  },
  modules: [
    "@nuxtjs/eslint-module",
    "@sidebase/nuxt-session",
    "@nuxtjs/eslint-module",
  ],
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  session: {
    session: {
      cookieSecure: true,
      cookieHttpOnly: true,
    },
  },
});
