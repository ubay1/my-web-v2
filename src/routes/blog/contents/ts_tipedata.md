---
title: Tipe data pada Typescript
description: Belajar tipe data yang ada pada typescript
imagePath: https://fedojo.com/wp-content/uploads/2019/05/typescript.png
imageAlt: img-ts
date: 2022-12-02
tags:
  - typescript
---

# DEKLARASI & DEFINISI

```ts
let a:number; // deklarasi
a = 1; // definisi
let b:string = 'hello'; // definisi

add(a:number,b:number):number; // deklarasi

add(a:number,b:number):number{ // definisi
    return a + b;
}
```

<br>

# any

artinya sebarang tipe. Variabel dengan tipe data ini bisa diberi sebarang nilai.

```ts
let a: any = '';
a = 'hello'; // tampil 'hello'
a = [1, 2]; // tampil [1,2]
```

<br>

# boolean

(pake huruf b kecil).

```ts
let finished: boolean = false;
finished = 'no'; // error karna string
```

<br>

# number

dipake nggak hanya untuk bilangan desimal/integer, tapi juga dipake untuk
bilangan hexadesimal (0x), oktal (0o) dan bilangan biner (0b);

```ts
let start: number = 1.2;
let hexColor: number = 0xfff; //0x = hexa
let oct: number = 0o755; //0o = octal
let binary: number = 0b101; //0b = binary
```

<br>

# string

dipake untuk data berbentuk teks.

```ts
let color: string = 'red';
```

<br>

1. Typescript juga menyediakan template string yang dipake untuk substitusi teks. String yang
   pake template dibuka-tutup pake backtick **`** bukan single-quote **'** atau quote **"**

```ts
let names: string = 'Jon Snow';
let age: number = 35;
let info: string = `Nama saya ${names}. Tahun depan usia saya ${age + 1} tahun`;
// tampil "Nama saya Jon Snow. Tahun depan usia saya 36 tahun"
```

<br>

# Union Type

kita pake untuk deklarasi variabel untuk tipe data lebih dari satu (mirip any tapi terbatas).

```ts
let a: string | number; // a bisa string atau number
a = 100; // OK
a = 'xx'; // OK
a = false; // error, a nggak bisa boolean, hanya string dan number
```

<br>

# Assertion Type

Type Assertion adalah cara untuk memproses data sesuai tipenya. Dalam bahasa lain disebut Type Cast, digunakan dengan kata **as**

```ts
let a: any = 1;
// console.log( (a as number).toFixed(2) );
```
