// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
 devtools: { enabled: true },
 plugins: ["@/plugins/antd"],
 modules: ["@nuxtjs/tailwindcss"],
 app: {
  baseURL: "/flag_website/",
 },
 runtimeConfig: {
  indexable: true,
  public: {
   apiUrl: process.env.NUXT_API_URL,
  },
 },
});
