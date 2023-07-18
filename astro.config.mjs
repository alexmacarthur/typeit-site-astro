import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  site: "https://TypeIt.dev",
  markdown: {
    syntaxHighlight: "prism",
    gfm: true,
  },
  trailingSlash: 'ignore',
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
              autogenerate: { directory: 'docs/vanilla' },
            },
        {
          label: "Integrations",
          items: [
            {
              label: "React",
              autogenerate: { directory: 'docs/react' },
            },
            {
              label: "WordPress",
              autogenerate: { directory: 'docs/wordpress' },
            },
          ],
        }
      ],
    }),
    sitemap(),
    robotsTxt({
      policy: [
        {
          allow: "/",
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
