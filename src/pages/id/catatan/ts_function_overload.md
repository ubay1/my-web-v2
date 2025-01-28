---
layout: ../../../layouts/MarkdownLayout.astro
title: Function overload
description: mendukung fungsi dengan berbagai skenario input dan output.
imagePath: https://miro.medium.com/max/1400/1*kIccf4SUwLmavuqDgjYlZA.jpeg
imageAlt: ts
viewTransitionName: 'ts-func-overload'
date: 2022-12-02 07:05
icon: 'devicon:typescript'
tags:
  - typescript
---

# Apa itu Overloads di TypeScript?

Overloads di TypeScript memungkinkan kita mendefinisikan beberapa signature untuk sebuah fungsi dengan cara yang berbeda, tergantung pada jenis atau jumlah parameter yang diterima.

Ini sering digunakan untuk:

- Memberikan fleksibilitas pada fungsi.
- Menyediakan tipe yang lebih spesifik berdasarkan konteks input.

# Kegunaan Overloads di TypeScript

1. Fleksibilitas Parameter Memungkinkan sebuah fungsi menerima berbagai kombinasi parameter dengan tipe yang berbeda-beda.

2. Menangani Return Type yang Berbeda Overloads memungkinkan fungsi mengembalikan tipe yang berbeda berdasarkan inputnya.

3. Peningkatan Type Safety Dengan overloads, kita dapat memandu pengguna fungsi untuk memberikan input yang valid sesuai dengan kebutuhan.

# Contoh penggunaan overload

## 1. Fungsi dengan Parameter Berbeda

Misalkan kita membuat fungsi combine yang dapat menjumlahkan angka atau menggabungkan string:

```ts
function combine(a: number, b: number): number // Overload 1
function combine(a: string, b: string): string // Overload 2
function combine(a: any, b: any): any {
  if (typeof a === 'number' && typeof b === 'number') {
    return a + b
  } else if (typeof a === 'string' && typeof b === 'string') {
    return a + b
  }
  throw new Error('Invalid arguments')
}

const result1 = combine(1, 2) // number
const result2 = combine('Hello', ' World') // string
const result3 = combine('Ubay', 182) // Error, tidak ada yang sesuai dengan overload yang ada
```

## 2. Menangani Jumlah Parameter yang Berbeda

Misalkan, fungsi getItem dapat menerima satu atau dua parameter:

```ts
function getItem(index: number): string // Overload 1
function getItem(index: number, items: string[]): string // Overload 2
function getItem(index: number, items?: string[]): string {
  if (items) {
    return items[index]
  }
  return `Item at index ${index}`
}

const item1 = getItem(0) // string: "Item at index 0"
const item2 = getItem(1, ['apple', 'banana', 'cherry']) // string: "banana"
```

## 3. Overload dengan Tipe Return yang Berbeda

Misalkan fungsi parseInput mengembalikan tipe yang berbeda berdasarkan input:

```ts
function parseInput(input: string): number // Overload 1
function parseInput(input: number): string // Overload 2
function parseInput(input: any): any {
  if (typeof input === 'string') {
    return parseInt(input, 10) // Mengembalikan number
  } else if (typeof input === 'number') {
    return input.toString() // Mengembalikan string
  }
}

const parsedNumber = parseInput('42') // 42 (number)
const parsedString = parseInput(42) // 42 (string)
```

# Kapan Menggunakan Overloads?

1. Fungsi yang Fleksibel Ketika fungsi yang sama harus mendukung berbagai jenis parameter atau return type.

2. API Serbaguna Jika kita membuat library atau API yang harus menangani banyak kasus penggunaan.

3. Peningkatan Keterbacaan Overloads membantu pengguna fungsi memahami berbagai skenario yang didukung tanpa harus membaca logika internal.

# Kelebihan dan Kekurangan Overloads

Kelebihan:

- Memungkinkan fungsi mendukung berbagai kasus
- Peningkatan fleksibilitas dan keterbacaan kode
- Memberikan type safety pada fungsi multi-purpose

Kekurangan:

- Bisa menjadi kompleks jika overload terlalu banyak
- Sulit di-debug jika implementasi tidak konsisten
- Implementasi utama harus menangani semua kasus
