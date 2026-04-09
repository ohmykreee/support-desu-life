// @ts-check
import { defineConfig } from "astro/config";

import vue from "@astrojs/vue";

import svelte from "@astrojs/svelte";

import icon from "astro-icon";

import mdx from "@astrojs/mdx";

import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://support.desu.life",
  // i18n: {
  //   defaultLocale: 'en',
  //   locales: ['en', 'zh-Hans', 'zh-Hant', 'ja', 'ko'],
  // },
  integrations: [vue(), svelte(), icon(), mdx(), sitemap({})],

  vite: {
    plugins: [tailwindcss()]
  }
});
