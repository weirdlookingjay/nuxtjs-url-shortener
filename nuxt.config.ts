// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      // appUrl: process.env.APP_URL,
      appUrl: "https://nuxtjs-url-shortener.vercel.app",
    },
  },

  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/supabase"],
});
