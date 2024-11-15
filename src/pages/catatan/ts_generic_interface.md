---
layout: ../../layouts/MarkdownLayout.astro
title: Generic interface
description:
imagePath: https://miro.medium.com/max/1400/1*kIccf4SUwLmavuqDgjYlZA.jpeg
imageAlt: ts
viewTransitionName: 'ts-generic-interface'
date: 2022-12-06 09:00
icon: 'devicon:typescript'
tags:
  - typescript
---

```ts
export interface IDynamicInterface<T = any> {
  value: T
}

export function funcDnamicInterface<T>(data: T): IDynamicInterface<T> {
  const value = data as T
  console.log('value is = ', value)
  return { value }
}

export function testDynamicInterface() {
  const a: IDynamicInterface<{ er: string }> = { value: { er: 'ss' } }
  funcDnamicInterface<string>('aa')
  console.log(a.value)
}
```