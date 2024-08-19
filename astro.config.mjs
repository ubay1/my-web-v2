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
  ],
  adapter: vercel(),
})
