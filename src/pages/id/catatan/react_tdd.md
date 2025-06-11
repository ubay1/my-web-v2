---
layout: ../../../layouts/MarkdownLayout.astro
title: React Testing - Setup
description: vitest, @testing-library/react, @testing-library/jest-dom, jsdom
imagePath: https://wallpapercave.com/wp/wp4924054.jpg
imageAlt: img-react-test
viewTransitionName: 'react-tdd-1'
date: 2025-05-11 09:00
icon: 'devicon:react'
tags:
  - react
  - testing
  - vitest
  - react-testing-library
---

## Setup

1. npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
2. pada vite.config.ts, masukkan config "test"

```js
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": root,
    } as AliasOptions,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: '/src/tests/setup.ts', // bisa array | string
  }
} as UserConfig)
```

<br />
3. tambahkan file pada src/tests/setup.ts

```ts
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup()
})
```
