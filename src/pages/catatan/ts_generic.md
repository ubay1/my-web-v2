---
title: Generic type pada Typescript
description: Belajar generic type yang ada pada typescript
imagePath: https://miro.medium.com/max/1400/1*kIccf4SUwLmavuqDgjYlZA.jpeg
imageAlt: ts
viewTransitionName: 'ts-generic'
date: 2022-12-05 07:00
icon: 'devicon:typescript'
tags:
  - typescript
---

# Generic akan lebih detail di tulisan tersendiri

Generics bisa dibilang mirip **any**, bedanya kalo kita pake any **TSC** nggak bisa memvalidasi
(type-checking) kode secara akurat karena nggak ada info tentang tipe data yang dipake.
Kalo kita pake editor yang mendukung Intellisense ini juga nggak jalan karena kurang info.

## Tanpa generic

```ts twoslash
function add(val: any) {
	return val;
}

const a = add(5);
const b = add('a');
console.log(a.length); // undefined
console.log(b.length); // 1
```

## Dengan generic

```ts twoslash
// @errors: 2339
function add<T>(val: T) {
	return val;
}
const a = add(5);
const b = add('a');
console.log(a.length);
console.log(b.length); // 1
```

## Bekerja dengan Generic variable

```ts twoslash
// @errors: 2339
// tanpa nilai balik
function add<T>(val: T): void {
	console.log(val.length);
}

// dengan nilai balik
function add1<T>(val: T): T {
	const vals = val.length;
	return vals;
}
let a2 = add1(1);
console.log(a2);
```

bagaimana cara mengatasinya ?

> kita bisa membuat tipenya menjadi **Array** lalu kita cek tiap" nilai array jika tipenya string maka kita kirim ke variabel baru dengan tipe string, koding diatas bisa diubah menjadi seperti dibawah ini.

```ts twoslash
function add2<T>(arg: T[]): T[] {
	let ab: any = '';
	arg.filter((e) => {
		typeof e === 'string' ? (ab = e.length) : (ab = 'not string');
	});
	return ab;
}

let aaa = add2([1, 2]);
let aab = add2(['test']);
console.log(aaa); // 'not string
console.log(aab); // 4
```
