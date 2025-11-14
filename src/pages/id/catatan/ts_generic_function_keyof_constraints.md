---
layout: ../../../layouts/MarkdownLayout.astro
title: Generic function dengan type constraints dan keyof pada Typescript
description: <K extends keyof T> keyof adalah operator yang menghasilkan union type dari semua kunci (keys) yang ada dalam suatu object. Ini sangat berguna ketika kita ingin membatasi nilai ke salah satu kunci objek tertentu.
imagePath: /blog/ts.webp
imageAlt: ts
viewTransitionName: 'ts-generic-func-keyof'
date: 2022-12-05 09:00
icon: 'devicon:typescript'
tags:
  - typescript
---

keyof adalah operator yang menghasilkan union type dari semua kunci (keys) yang ada dalam suatu object. Ini sangat berguna ketika kita ingin membatasi nilai ke salah satu kunci objek tertentu.

```ts twoslash
// @errors: 2345
function keyofConstraints<T extends object, K extends keyof T>(obj: T, key: K) {
  return obj[key]
}

const a = keyofConstraints({ name: 'ubay', age: 20 }, 'name')
console.log(a) // ubay
const aa = keyofConstraints({ name: 'ubay', age: 20 }, 'ages')
```
