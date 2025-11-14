---
layout: ../../../layouts/MarkdownLayout.astro
title: Index signature
description: Index signature di TypeScript digunakan untuk membuat tipe yang fleksibel ketika kita tidak tahu nama properti dari suatu objek, tapi tahu tipe dari key dan value-nya. Ini berguna untuk objek dengan properti dinamis atau jumlah properti yang tidak tetap.
imagePath: /blog/ts.webp
imageAlt: ts
viewTransitionName: 'ts-index-signature'
date: 2022-12-02 07:00
icon: 'devicon:typescript'
tags:
  - typescript
---

# Apa itu index signature ?

Index signature di TypeScript digunakan untuk membuat tipe yang fleksibel ketika kita tidak tahu nama properti dari suatu objek, tapi tahu tipe dari key dan value-nya. Ini berguna untuk objek dengan properti dinamis atau jumlah properti yang tidak tetap.

Contoh Sederhana:

# Kapan Index Signature Digunakan?

Ketika kita bekerja dengan objek yang properti dan jumlahnya tidak diketahui. Saat bekerja dengan data dinamis, misalnya API respons yang punya properti tambahan. Untuk membuat tipe yang fleksibel dalam memetakan key-value.

## 1. Object sederhana

```ts
type UserScores = {
  [username: string]: number // Key adalah username, value adalah skor.
}

const scores: UserScores = {
  ubay: 100,
  dillah: 95,
  kanca: 85,
}

console.log(scores.kanca) // 85
```

## 2. Validasi Properti Dinamis

Bayangin kita punya API yang mengembalikan data user dengan properti tambahan yang tidak pasti:

```ts
type ApiResponse = {
  [key: string]: string | number // Key adalah string, value bisa string atau number.
}

const response: ApiResponse = {
  id: 1,
  name: 'Ubay',
  age: 25,
  extraInfo: 'Developer',
}
```

## 3. Membuat Objek dengan Key Number

Kita juga bisa pakai key bertipe number:

```ts
type ArrayLike = {
  [index: number]: string // Key adalah angka, value adalah string.
}

const stringArray: ArrayLike = {
  0: 'Hello',
  1: 'World',
  2: 'Ubay',
}

console.log(stringArray[1]) // Output: "World"
```

## 4. Membuat Dynamic Config Object

Misalnya, aplikasi kita punya konfigurasi yang tipe key dan value-nya berubah-ubah:

```ts
type Config = {
  [key: string]: boolean // Key adalah string, value adalah boolean.
}

const appConfig: Config = {
  darkMode: true,
  notifications: false,
  autoSave: true,
}
```

## 5. Membatasi Key dengan String Literal

kita bisa mempersempit tipe key hanya ke string literal tertentu dengan union types:

```ts
type Roles = {
  [key in 'admin' | 'user' | 'guest']: boolean
}

const rolePermissions: Roles = {
  admin: true,
  user: true,
  guest: false,
}
```

> key in "admin" | "user" | "guest" membatasi key hanya ke "admin", "user", atau "guest". Membuat tipe lebih aman karena hanya key tertentu yang diizinkan.

# Batasan Index Signature

1. Tidak Bisa Digabung dengan Properti Spesifik: Kalau kita punya properti spesifik dan index signature, properti spesifik harus sesuai tipe index signature.

```ts
type User = {
  id: number
  [key: string]: string // ERROR karena `id` tidak bertipe string.
}

// Solusi: Pakai union type di value.
type User = {
  id: number
  [key: string]: string | number
}
```

2. Key Tidak Dibatasi Secara Default: Kalau pakai [key: string], kita tidak bisa mencegah properti dengan key yang salah, kecuali membatasi tipe key.
