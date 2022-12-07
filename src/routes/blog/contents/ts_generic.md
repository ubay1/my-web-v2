---
title: Generic type pada Typescript
description: Belajar generic type yang ada pada typescript
imagePath: https://miro.medium.com/max/1400/1*kIccf4SUwLmavuqDgjYlZA.jpeg
imageAlt: img-ts
date: 2022-12-02
tags:
  - typescript
---

Generics bisa dibilang mirip **any**, bedanya kalo kita pake any **TSC** nggak bisa memvalidasi
(type-checking) kode secara akurat karena nggak ada info tentang tipe data yang dipake.
Kalo kita pake editor yang mendukung Intellisense ini juga nggak jalan karena kurang info.
<br><br>

# Tanpa generic

```ts
function add(val: any) {
	return val;
}

const a = add(5);
const b = add('a');
console.log(a.length); // undefined
console.log(b.length); // 1
```

<br>

# Dengan generic

```ts
function add<T>(val: T) {
	return val;
}
const a = add(5);
const b = add('a');
console.log(a.length); // Property 'length' does not exist on type '5'
console.log(b.length); // 1
```

<br>

# Bekerja dengan Generic variable

```ts
// tanpa nilai balik
function add<T>(val: T): void {
	console.log(val.length); // Property 'length' does not exist on type 'T'.
}

// dengan nilai balik
function add1<T>(val: T): T {
	const vals = val.length; // Property 'length' does not exist on type 'T'.
	return vals;
}
let a2 = add1(1);
console.log(a2);
```

bagaimana cara mengatasinya ? <br>
kita bisa membuat tipenya menjadi **Array** lalu kita cek tiap" nilai array jika tipenya string maka kita kirim ke variabel baru dengan tipe string, koding diatas bisa diubah menjadi seperti dibawah ini.

```ts
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

<br>

# Class dengan Generic Type

```ts
class testClass<T> {
    value: <T>;
    add: (x: T, y: T): T => T;
}

let strNumeric = new testClass<string>();

```
