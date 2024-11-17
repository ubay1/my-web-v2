---
layout: ../../layouts/MarkdownLayout.astro
title: Type predicate
description: mirip seperti narrowing namun lebih spesifik lagi
imagePath: https://miro.medium.com/max/1400/1*kIccf4SUwLmavuqDgjYlZA.jpeg
imageAlt: ts
viewTransitionName: 'ts-narrowing'
date: 2022-12-02 07:02
icon: 'devicon:typescript'
tags:
  - typescript
---

# Apa itu Type Predicate di TypeScript?
Type predicate adalah fitur TypeScript yang memungkinkan kita untuk membuat fungsi khusus (custom type guard) yang mempersempit tipe data secara ekspresif dan fleksibel. Type predicate memberitahu TypeScript tipe spesifik dari suatu nilai setelah fungsi tertentu dijalankan.

# Sintaks Type Predicate
type predicate ditulis dalam bentuk:
```ts
parameterName is T
```
Di mana:

- parameterName: Nama parameter yang tipe datanya ingin diperiksa.
- T: Tipe spesifik yang akan diterapkan jika fungsi mengembalikan true.

```ts
function isString(value: unknown): value is string {
  return typeof value === "string";
}
```
Fungsi ini memberitahu TypeScript bahwa value adalah string jika fungsi mengembalikan true.

Kapan Type Predicate Digunakan?
1. Untuk Narrowing yang Lebih Rumit
Jika typeof, instanceof, atau operator in tidak cukup untuk membedakan tipe.

2. Validasi Tipe Custom
Ketika bekerja dengan tipe kompleks seperti objek atau array dengan properti tertentu.

3. Membuat Kode Lebih Bersih
Dengan type predicate, kita bisa menghindari logika pemeriksaan tipe berulang.

# Contoh Penggunaan Type Predicate

## 1. Type Predicate dengan Tipe Primitif
Memastikan sebuah nilai adalah string:
```ts
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function printLength(value: unknown) {
  if (isString(value)) {
    console.log(value.length); // Aman: value pasti string
  } else {
    console.log("Value is not a string.");
  }
}

printLength("Hello, Ubay!"); // Output: 13
```

## 2. Type Predicate dengan Tipe Objek
Memeriksa apakah sebuah objek memiliki properti tertentu:

```ts
type User = {
  name: string;
  email: string;
};

function isUser(obj: unknown): obj is User {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "name" in obj &&
    "email" in obj
  );
}

function greetUser(input: unknown) {
  if (isUser(input)) {
    console.log(`Hello, ${input.name}!`);
  } else {
    console.log("Input is not a valid user.");
  }
}

greetUser({ name: "Ubay", email: "ubay@example.com" }); // Output: Hello, Ubay!
```

## 3. Type Predicate dengan Union Types
Mempersempit union type berdasarkan struktur data:

```ts
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

function move(pet: Fish | Bird) {
  if (isFish(pet)) {
    pet.swim(); // Aman: pet pasti Fish
  } else {
    pet.fly(); // Aman: pet pasti Bird
  }
}

const nemo: Fish = { swim: () => console.log("Swimming!") };
move(nemo); // Output: Swimming!
```

## 4. Type Predicate dengan Array
Memeriksa apakah semua elemen dalam array memiliki tipe tertentu:

```ts
function isStringArray(arr: unknown[]): arr is string[] {
  return arr.every((item) => typeof item === "string");
}

function processArray(input: unknown[]) {
  if (isStringArray(input)) {
    console.log("All items are strings:", input.join(", "));
  } else {
    console.log("Not all items are strings.");
  }
}

processArray(["hello", "world"]); // Output: All items are strings: hello, world
processArray(["hello", 123]);     // Output: Not all items are strings.
```

# Kesimpulan

Type predicate adalah alat yang sangat kuat untuk mempersempit tipe dalam situasi yang tidak bisa ditangani oleh metode bawaan seperti typeof atau instanceof. Dengan fitur ini, kita bisa membuat validasi tipe yang lebih fleksibel dan menulis kode TypeScript yang aman dan mudah dipahami.