---
layout: ../../../layouts/MarkdownLayout.astro
title: Narrowing
description: untuk mengecek sebuah tipe pada parameter dengan menggunakan (typeof, instanceof, dll)
imagePath: https://miro.medium.com/max/1400/1*kIccf4SUwLmavuqDgjYlZA.jpeg
imageAlt: ts
viewTransitionName: 'ts-narrowing'
date: 2022-12-02 07:01
icon: 'devicon:typescript'
tags:
  - typescript
---

# Apa itu narrowing ?

Narrowing adalah proses di mana TypeScript menyempitkan tipe suatu nilai berdasarkan informasi yang tersedia, seperti:

1. Kondisi logika (contoh: if, switch).
2. Pengecekan tipe (contoh: typeof, instanceof).
3. Validasi struktur data (contoh: in operator).
4. Custom type guard (fungsi khusus untuk memeriksa tipe).

# Keuntungan Narrowing

1. Menghindari Error Runtime: TypeScript memastikan bahwa kode kita aman dengan memeriksa tipe secara statis.

2. Meningkatkan Pembacaan Kode: Narrowing membuat logika lebih jelas karena tipe ditentukan secara eksplisit.

3. Membantu Developer: Editor kita (seperti VS Code) bisa memberikan autocomplete dan linting berdasarkan tipe yang lebih spesifik.

Misalnya, tanpa narrowing, TypeScript akan memberikan error:

```ts
function doubleValue(input: string | number) {
  return input * 2 // ERROR: input mungkin string, sehingga operasi ini tidak valid
}
```

Dengan narrowing, kita bisa memeriksa tipe dan memperlakukan nilai sesuai tipenya:

```ts
function doubleValue(input: string | number) {
  if (typeof input === 'number') {
    return input * 2 // Aman: input pasti number
  } else {
    return parseFloat(input) * 2 // Aman: input pasti string
  }
}
```

# Metode Narrowing yang Umum

## 1. Menggunakan typeof

typeof memeriksa tipe primitif seperti string, number, boolean, atau object.

```ts
function printLength(input: string | number) {
  if (typeof input === 'string') {
    console.log(input.length) // Aman: input pasti string
  } else {
    console.log(input.toFixed(2)) // Aman: input pasti number
  }
}
```

## 2. Menggunakan instanceof

instanceof memeriksa apakah suatu objek merupakan instance dari sebuah kelas.

```ts
class Dog {
  bark() {
    console.log('Woof!')
  }
}

class Cat {
  meow() {
    console.log('Meow!')
  }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark() // Aman: animal pasti Dog
  } else {
    animal.meow() // Aman: animal pasti Cat
  }
}
```

## 3. Menggunakan Operator in

in memeriksa apakah properti tertentu ada dalam sebuah objek.

```ts
type User = {
  name: string
  email: string
}

type Admin = {
  name: string
  privileges: string[]
}

function printInfo(person: User | Admin) {
  if ('privileges' in person) {
    console.log(`Admin privileges: ${person.privileges}`) // Aman: person pasti Admin
  } else {
    console.log(`User email: ${person.email}`) // Aman: person pasti User
  }
}
```

## 4. Menggunakan Literal Type Narrowing

TypeScript otomatis menyempitkan tipe jika nilainya cocok dengan literal tertentu.

```ts
type Status = 'loading' | 'success' | 'error'

function handleStatus(status: Status) {
  if (status === 'loading') {
    console.log('Loading...')
  } else if (status === 'success') {
    console.log('Operation was successful!')
  } else {
    console.log('An error occurred.')
  }
}
```

## 5. Menggunakan Custom Type Guard

Type guard adalah fungsi yang memberitahu TypeScript tipe yang lebih spesifik.

```ts
type Fish = { swim: () => void }
type Bird = { fly: () => void }

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined
}

function move(pet: Fish | Bird) {
  if (isFish(pet)) {
    pet.swim() // Aman: pet pasti Fish
  } else {
    pet.fly() // Aman: pet pasti Bird
  }
}
```

## 6. Narrowing pada Union dan Intersection Types

Jika tipe adalah kombinasi union atau intersection, TypeScript otomatis mempersempit tipe berdasarkan kondisinya.

```ts
type Circle = {
  kind: 'circle'
  radius: number
}

type Square = {
  kind: 'square'
  side: number
}

type Shape = Circle | Square

function getArea(shape: Shape) {
  if (shape.kind === 'circle') {
    return Math.PI * shape.radius ** 2 // Aman: shape pasti Circle
  } else {
    return shape.side ** 2 // Aman: shape pasti Square
  }
}
```
