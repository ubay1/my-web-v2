import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'
import vercel from '@astrojs/vercel/serverless'
import {
  transformerNotationHighlight,
  transformerMetaHighlight,
  transformerMetaWordHighlight,
  transformerNotationDiff,
  transformerNotationFocus,
  transformerCompactLineOptions,
  transformerNotationWordHighlight,
  transformerNotationErrorLevel,
  transformerRenderWhitespace,
  transformerRemoveNotationEscape,
} from '@shikijs/transformers'
// import AstroPWA from '@vite-pwa/astro'
import reactI18next from 'astro-react-i18next'
import astroI18next from 'astro-i18next'

// https://astro.build/config
export default defineConfig({
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'one-dark-pro',
      transformers: [
        transformerNotationHighlight(),
        transformerMetaHighlight(),
        transformerMetaWordHighlight(),
        transformerNotationDiff(),
        transformerNotationFocus(),
        transformerCompactLineOptions(),
        transformerNotationWordHighlight(),
        transformerNotationErrorLevel(),
        transformerRenderWhitespace(),
        transformerRemoveNotationEscape(),
      ],
    },
  },
  site: 'http://localhost:4321',
  output: 'server',
  integrations: [
    tailwind(),
    react({
      include: ['**/react/*'],
    }),
    // AstroPWA({
    //   mode: 'production',
    //   base: '/',
    //   scope: '/',
    //   includeAssets: ['favicon.svg'],
    //   registerType: 'autoUpdate',
    //   strategies: 'generateSW',
    //   workbox: {
    //     navigateFallback: '/',
    //     globPatterns: ['**/*.{js,css,html,svg,png,ico,jpg,jpeg,webp,woff,woff2,ttf,eot}'],
    //   },
    //   manifest: {
    //     name: 'ubay dillah',
    //     short_name: 'ubay dillah',
    //     description: 'Profil, Portofolio dan Blog',
    //     theme_color: '#22272e',
    //     background_color: '#22272e',
    //     display: 'standalone',
    //     orientation: 'portrait',
    //     scope: '/',
    //     start_url: '/',
    //     screenshots: [
    //       {
    //         src: 'icons/ss_pwa_1.png',
    //         sizes: '640x320',
    //         type: 'image/png',
    //         form_factor: 'wide',
    //         label: 'Personal website',
    //       },
    //       {
    //         src: 'icons/ss_pwa_1.png',
    //         sizes: '640x320',
    //         type: 'image/png',
    //         form_factor: 'narrow',
    //         label: 'Personal website',
    //       },
    //     ],
    //     icons: [
    //       {
    //         src: 'icons/icon-72x72.png',
    //         sizes: '72x72',
    //         type: 'image/png',
    //       },
    //       {
    //         src: 'icons/icon-96x96.png',
    //         sizes: '96x96',
    //         type: 'image/png',
    //       },
    //       {
    //         src: 'icons/icon-128x128.png',
    //         sizes: '128x128',
    //         type: 'image/png',
    //       },
    //       {
    //         src: 'icons/icon-144x144.png',
    //         sizes: '144x144',
    //         type: 'image/png',
    //       },
    //       {
    //         src: 'icons/icon-152x152.png',
    //         sizes: '152x152',
    //         type: 'image/png',
    //       },
    //       {
    //         src: 'icons/icon-192x192.png',
    //         sizes: '192x192',
    //         type: 'image/png',
    //       },
    //       {
    //         src: 'icons/icon-384x384.png',
    //         sizes: '384x384',
    //         type: 'image/png',
    //       },
    //       // {
    //       //   src: 'icons/icon-512x512.png',
    //       //   sizes: '512x512',
    //       //   type: 'image/png',
    //       // },
    //       {
    //         src: 'icons/icon-512x512.png',
    //         sizes: '512x512',
    //         type: 'image/png',
    //       },
    //     ],
    //   },
    //   devOptions: {
    //     enabled: true,
    //     navigateFallback: undefined,
    //     type: 'module',
    //   },
    //   experimental: {
    //     directoryAndTrailingSlashHandler: true,
    //   },
    // }),
    reactI18next({
      defaultLocale: 'id-ID',
      locales: ['id-ID', 'en-US'],
    }),
    astroI18next(),
  ],
  adapter: vercel(),
})
