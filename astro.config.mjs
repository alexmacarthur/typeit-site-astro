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
    syntaxHighlight: 'prism',
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
          label: "General",
          items: [
            {
              label: "Getting Started",
              link: "/docs/",
            },
            {
              label: "How to Use TypeIt",
              link: "/docs/usage",
            },
            {
              label: "What to Expect",
              link: "/docs/expectations",
            },
            {
              label: "Frequently Asked Questions",
              link: "/docs/faq",
            },
            {
              label: "Supported Image Formats",
              link: "/docs/formats",
            },
          ],
        },
        {
          label: "Integrations",
          items: [
            {
              label: "WordPress",
              link: "/docs/wordpress",
            },
          ],
        },
        {
          label: "Other",
          items: [
            {
              label: "Privacy Policy",
              link: "/policies/privacy",
            },
            {
              label: "Terms of Use",
              link: "/policies/terms",
            },
            {
              label: "Service-Level Agreement",
              link: "/policies/sla",
            },
          ],
        },
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
    preact(),
  ],
});
