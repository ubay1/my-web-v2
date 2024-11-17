---
layout: ../../layouts/MarkdownLayout.astro
title: Enum
description: enum adalah fitur TypeScript untuk mendefinisikan sekumpulan nilai konstan dengan nama yang lebih deskriptif. enum berguna untuk membuat kode lebih terbaca, terorganisir, dan mudah dikelola.
imagePath: https://miro.medium.com/max/1400/1*kIccf4SUwLmavuqDgjYlZA.jpeg
imageAlt: ts
viewTransitionName: 'ts-enum'
date: 2022-12-02 07:00
icon: 'devicon:typescript'
tags:
  - typescript
---

# Apa itu enum ?
enum (singkatan dari enumeration) adalah fitur TypeScript untuk mendefinisikan sekumpulan nilai konstan dengan nama yang lebih deskriptif. enum berguna untuk membuat kode lebih terbaca, terorganisir, dan mudah dikelola.

# Kegunaan enum
1. Membuat kode lebih terbaca:
Dengan enum, kita bisa mengganti angka atau string "magic" dengan nama yang bermakna.

2. Mencegah kesalahan pengetikan:
Karena nilai dalam enum sudah terdefinisi, TypeScript akan memberikan error jika kita menggunakan nilai yang salah.

3. Mempermudah debugging:
Kamu bisa melihat nama konstan di log atau error alih-alih nilai mentahnya.

4. Digunakan untuk state atau kategori:
Cocok untuk mendefinisikan status, peran, tipe data, atau kategori lainnya.


## 1. Enum sederhana
```ts
enum UserRole {
  Admin,
  User,
  Guest,
}

function getRole(role: UserRole) {
  if (role === UserRole.Admin) {
    console.log("You are an admin.");
  }
}

getRole(UserRole.Admin); // Output: You are an admin.
```
<br />

> Admin = 0, User = 1, Guest = 2, secara default nilai enum adalah angka mulai dari 0, daripada menulis angka (0) kita bisa pakai UserRole.Admin sehingga lebih mudah dibaca

## 2. Enum dengan nilai custom
kita juga bisa memberikan nilai string atau angka tertentu untuk enum:

```ts
enum Status {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
  Suspended = "SUSPENDED",
}

enum HttpStatus {
  OK = 200,
  BadRequest = 400,
  NotFound = 404,
}

function printStatus(status: Status) {
  console.log(`Status is ${status}`);
}

console.log(HttpStatus.OK); // Output: 200
printStatus(Status.Active); // Output: Status is ACTIVE
```

## 3. Menggunakan Enum sebagai Tipe
kita bisa menggunakan enum untuk membatasi input ke fungsi:

```ts
enum Direction {
  Up,
  Down,
  Left,
  Right,
}

function move(direction: Direction) {
  switch (direction) {
    case Direction.Up:
      console.log("Moving up");
      break;
    case Direction.Down:
      console.log("Moving down");
      break;
    // ...
  }
}

move(Direction.Up); // Output: Moving up
```

## 4. Enum dalam Kondisi
Enum cocok untuk logika seperti switch-case:

```ts
enum PaymentStatus {
  Pending,
  Success,
  Failed,
}

function checkPayment(status: PaymentStatus) {
  switch (status) {
    case PaymentStatus.Pending:
      console.log("Payment is pending...");
      break;
    case PaymentStatus.Success:
      console.log("Payment was successful!");
      break;
    case PaymentStatus.Failed:
      console.log("Payment failed.");
      break;
  }
}

checkPayment(PaymentStatus.Success); // Output: Payment was successful!
```

# Perbandingan dengan Union Types
Kadang, kita mungkin bertanya, "Kenapa gak pakai union type aja?"

```ts
type UserRole = "Admin" | "User" | "Guest";

function getRole(role: UserRole) {
  if (role === "Admin") {
    console.log("You are an admin.");
  }
}
```

## Kapan Pakai enum:
1. Kita butuh nilai angka atau string yang konsisten.
2. Kita ingin nilai memiliki bidirectional mapping (angka ⇄ nama) artinya kita bisa mendapatkan nilai (angka) dari nama enum atau juga bisa mendapatkan nama enum dari nilainya (angka).
3. kode kita sering berubah, dan kita butuh daftar nilai yang lebih terorganisir.

## Kapan Pakai Union Type:
1. kita hanya butuh tipe sederhana dan kecil (contoh: "Admin" | "User").
2. tidak perlu mapping atau konversi nilai.

## Kelebihan enum:
1. Membuat kode lebih jelas dengan nama yang deskriptif.
2. Bisa menghindari kesalahan saat mengetik nilai string/angka manual.
3. Mendukung mapping angka ke nama (dan sebaliknya).
4. Mendukung debugging lebih mudah karena nama enum muncul di log/error.

## Kekurangan enum:
1. Ukuran kode lebih besar setelah di-transpile ke JavaScript.
2. Tidak se-efisien union types untuk kasus sederhana.
