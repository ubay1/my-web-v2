---
layout: ../../../layouts/MarkdownLayout.astro
title: Generic interface
description: contoh generic function dengan generic interface untuk types dinamis.
imagePath: /blog/ts.webp
imageAlt: ts
viewTransitionName: 'ts-generic-interface'
date: 2022-12-08 09:00
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

## Contoh lain

```ts
export interface IDynamicInterface<T = any> {
  value1: T
  value2: number
}

export function funcDnamicInterface<T, K extends number>(data1: T, data2: K): IDynamicInterface<T> {
  const value1 = data1 as T
  const value2 = data2 as K
  return { value1, value2 }
}

export function testDynamicInterface() {
  const a: IDynamicInterface<{ er: string }> = { value1: { er: 'ss' }, value2: 123 }
  const b = funcDnamicInterface<string, number>('aa', 12)
  console.log(a.value1)
  console.log(b.value2)
}
```

lihat pada function **testDynamicInterface**, kita memanggil function **funcDnamicInterface**, dan memberikan types string & number. pada index pertama kita bebas bisa memasukan apa saja sedangkan yang kedua kita wajib number, karena sudah di extends ke type number.

dan pada function **funcDnamicInterface** kita mereturn interface **IDynamicInterface**, sehingga kita wajib metereturn nilai yang ada di interface tsb.
