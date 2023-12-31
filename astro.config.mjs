import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import preact from "@astrojs/preact";
import dotenv from "dotenv";

dotenv.config();

// https://astro.build/config
export default defineConfig({
  site: "https://typeitjs.com",
  markdown: {
    syntaxHighlight: "prism",
    gfm: true,
  },
  trailingSlash: process.env.NODE_ENV === "development" ? "ignore" : "never",
  integrations: [
    starlight({
      expressiveCode: false,
      head: [
        {
          tag: "script",
          content: "window.localStorage.setItem('starlight-theme', 'light')",
        },
        {
          tag: "script",
          attrs: {
            src: "/js/numbers.js",
            "data-domain": "typeitjs.com",
            defer: true,
          },
        },
      ],
      customCss: [
        "@fontsource-variable/space-grotesk",
        "/src/prism-theme.css",
        "/src/global.css",
        "/src/docs.css",
      ],
      title: "TypeIt",
      sidebar: [
        {
          label: "Vanilla JS Documentation",
          autogenerate: { directory: "docs/vanilla" },
        },
        {
          label: "Integrations",
          items: [
            {
              label: "React",
              autogenerate: { directory: "docs/react" },
            },
            {
              label: "WordPress",
              autogenerate: { directory: "docs/wordpress" },
            },
          ],
        },
      ],
    }),
    sitemap({
      filter: (page) => {
        // Do not save the confirmation pages to the sitemap.
        return !page.includes("/confirmation/");
      },
    }),
    robotsTxt({
      policy: [
        {
          allow: "/",
          userAgent: "*",
        },
        {
          disallow: "/confirmation/*",
          userAgent: "*",
        },
      ],
    }),
    tailwind({
      applyBaseStyles: false,
    }),
    preact({ compat: true }),
  ],
});
