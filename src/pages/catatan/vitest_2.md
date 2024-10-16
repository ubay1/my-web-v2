---
layout: ../../layouts/MarkdownLayout.astro
title: Belajar Vitest
description: snapshot
imagePath: https://miro.medium.com/v2/resize:fit:1200/1*6YEGcCs46UW8KmFs3hDWgA.png
imageAlt: ts
viewTransitionName: 'vitest-2'
date: 2024-10-12 10:00
icon: 'devicon:vitest'
tags:
  - unit test
  - vitest
  - typescript
---

# Snapshot

cara untuk memastikan bahwa tampilan komponen tidak berubah tanpa disengaja Saat melakukan snapshot testing, Jest mengambil "foto" dari output komponen dan menyimpannya. Di masa mendatang, setiap kali pengujian dijalankan, Jest membandingkan hasil komponen saat ini dengan "foto" yang sudah tersimpan.

Jika hasilnya berbeda, pengujian gagal, dan kita bisa memutuskan apakah perubahan itu benar atau tidak. Jika perlu, kita bisa memperbarui "foto" (snapshot) dengan versi terbaru.

untuk nilai snapshot, kita dapat menggunakan toMatchSnapshot() dari expect() API:

untuk memperbarui snapshot kita gunakan

> npx vitest -u

<br>

```ts
import { expect, it } from 'vitest'

it('toUpperCase', () => {
  const result = toUpperCase('foobar')
  expect(result).toMatchSnapshot()
})

/**
 * hasilnya 
 * Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html
 * exports[`toUpperCase 1`] = `FOOBAR`;
*/
```

coba dengan 2 expect dalam 1 test

```ts
import { expect, it } from 'vitest'

it('toUpperCase', () => {
  const result = 1 + 10 * 4
  const result2 = 1 + 10 * 5
  expect(result).toMatchSnapshot()
  expect(result2).toMatchSnapshot()
})
/**
 * hasilnya 
 * Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html
 * exports[`toUpperCase 1`] = `41`;
 * exports[`toUpperCase 2`] = `51`;
*/
```

jika kita mencoba mengubah pada result2, maka akan tampil error seperti dibawah ini. karena di file snap nilainya berbeda dengan nilai yang ingin di test

![error snapshot](/error-snapshot.png)