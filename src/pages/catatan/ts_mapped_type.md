---
layout: ../../layouts/MarkdownLayout.astro
title: Mapped Type
description: membuat tipe baru berdasarkan tipe yang ada dengan memetakan properti tipe sumber, builtin (partial, required, pick, omit, record, exclude, extract)
imagePath: https://miro.medium.com/max/1400/1*kIccf4SUwLmavuqDgjYlZA.jpeg
imageAlt: ts
viewTransitionName: 'ts-mapped-types'
date: 2022-12-02 07:03
icon: 'devicon:typescript'
tags:
  - typescript
---

# Apa itu Mapped Types di TypeScript?
Mapped Types adalah fitur di TypeScript yang memungkinkan kita membuat tipe baru berdasarkan properti tipe lain, dengan cara memetakan properti dari tipe sumber.

Mapped types berguna untuk mengotomatisasi pembuatan tipe yang memiliki pola tertentu, seperti:
- Membuat semua properti menjadi opsional.
- Mengubah semua properti menjadi readonly.
- Mengubah tipe nilai properti tertentu.

# Kegunaan Mapped Types
1. Mempermudah Transformasi Tipe
Menghindari penulisan manual tipe baru berdasarkan tipe yang sudah ada.

2. Meningkatkan Keterbacaan
Mapped types membuat tipe menjadi lebih dinamis dan fleksibel tanpa menduplikasi kode.

3. Mendukung Pola Tipe Generik
Mapped types bisa digunakan bersama generic types untuk menciptakan tipe yang dinamis.

# Contoh Dasar Mapped Types

1. Menggunakan keyof untuk Memetakan Properti

Kamu bisa menggunakan operator keyof untuk mendapatkan daftar properti dari suatu tipe dan memetakannya.

```ts
type User = {
  id: number;
  name: string;
  email: string;
};

type OptionalUser = {
  [K in keyof User]?: User[K];
};

// Resulting type:
type OptionalUser = {
  id?: number;
  name?: string;
  email?: string;
};
```

Penjelasan:
- keyof User: Mengambil daftar properti id, name, dan email.
- [K in keyof User]: Melakukan iterasi pada properti User.
- ?: Membuat semua properti menjadi opsional.


# Built-in Mapped Types di TypeScript
TypeScript menyediakan beberapa mapped types bawaan untuk mempermudah pekerjaan.

## 1. Partial<T>
Mengubah semua properti suatu tipe menjadi opsional.

```ts
type User = {
  id: number;
  name: string;
  email: string;
};

type OptionalUser = Partial<User>;

// Resulting type:
type OptionalUser = {
  id?: number;
  name?: string;
  email?: string;
};
```

## 2. Required<T>
Mengubah semua properti opsional menjadi wajib.

```ts
type User = {
  id?: number;
  name?: string;
  email?: string;
};

type RequiredUser = Required<User>;

// Resulting type:
type RequiredUser = {
  id: number;
  name: string;
  email: string;
};
```

## 3. Readonly<T>
Mengubah semua properti menjadi readonly.

```ts
type ReadonlyUser = Readonly<User>;

// Resulting type:
type ReadonlyUser = {
  readonly id: number;
  readonly name: string;
  readonly email: string;
};
```

## 4. Pick<T, K>
Memilih subset properti tertentu dari suatu tipe.

```ts
type User = {
  name: string;
  email: string;
  address: string;
}
type UserNameAndEmail = Pick<User, "name" | "email">;

// Resulting type:
type UserNameAndEmail = {
  name: string;
  email: string;
};
```

## 5. Omit<T, K>
Menghapus properti tertentu dari suatu tipe.

```ts
type User = {
  name: string;
  email: string;
  address: string;
}
type UserWithoutEmail = Omit<User, "email">;

// Resulting type:
type UserWithoutEmail = {
  name: string;
  address: string;
};
```

## 6. Record<K,V>
menentukan tipe key dan value sendiri dalam sebuah object
```ts
type UserRoles = "admin" | "editor" | "viewer";

const userPermissions: Record<UserRoles, boolean> = {
  admin: true,
  editor: true,
  viewer: false,
};

// userPermissions hanya bisa memiliki key "admin", "editor", dan "viewer" dengan value boolean.
```

```ts
// Nested Record<K,V>
type Locale = "en" | "id";
type Page = "home" | "about";

const translations: Record<Locale, Record<Page, string>> = {
  en: {
    home: "Welcome",
    about: "About Us",
  },
  id: {
    home: "Selamat Datang",
    about: "Tentang Kami",
  },
};

console.log(translations.id.home); // "Selamat Datang"
```

## 7. Exclude<T,U>
menghapus tipe tertentu dari sebuah union type, atau bisa dikatakan menghasilkan tipe baru yang hanya berisi elemen dari T yang tidak termasuk dalam U.

```ts
type Roles = "admin" | "editor" | "viewer";

type NonAdminRoles = Exclude<Roles, "admin">;
// type NonAdminRoles: "editor" | "viewer"
```

```ts
interface User {
  id: number;
  name: string;
  isAdmin: boolean;
}

type UserKeys = keyof User; // "id" | "name" | "isAdmin"
type NonAdminKeys = Exclude<UserKeys, "isAdmin">;
// NonAdminKeys: "id" | "name"
```

## 8. Extract<T,U>
kebalikan dari exclude

# Custom mapped types
1. Mengubah Properti null Menjadi Opsional

```ts
type RemoveNull<T> = {
  [K in keyof T]: null extends T[K] ? T[K] | undefined : T[K];
};

type Example = {
  id: number;
  name: string | null;
  email: string | null;
};

type WithoutNull = RemoveNull<Example>;

// Resulting type:
type WithoutNull = {
  id: number;
  name: string | undefined;
  email: string | undefined;
};
```

# Kapan Menggunakan Mapped Types?
1. API Response Transformation
Membuat tipe baru berdasarkan struktur data dari API.
```ts
type ApiResponse<T> = {
  data: T;
  error: string | null;
};

type UserResponse = ApiResponse<User>;
```

2. Membuat Utility Tipe
Mengurangi penulisan tipe manual dengan pola tertentu.

3. Validasi Properti Dinamis
Menggunakan properti dari suatu tipe untuk membuat aturan validasi yang fleksibel.