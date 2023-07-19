import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  site: "https://typeitjs.com",
  markdown: {
    syntaxHighlight: "prism",
    gfm: true,
  },
  trailingSlash: "never",
  integrations: [
    starlight({
      head: [
        {
          tag: "script",
          attrs: {
            src: "/js/numbers.js",
            "data-domain": "typeitjs.com",
            defer: true,
          },
        },
      ],
      customCss: ["/src/global.css", "/src/docs.css"],
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
