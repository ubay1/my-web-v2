---
title: Generic function dengan type constraints pada Typescript
description: <T extends string>  Constraints (extends) digunakan untuk membatasi jenis (type) parameter generik ke subset tertentu dari tipe lain. Ini memastikan bahwa parameter tersebut memiliki bentuk tertentu atau memenuhi kriteria tertentu.
imagePath: https://miro.medium.com/max/1400/1*kIccf4SUwLmavuqDgjYlZA.jpeg
imageAlt: img-ts
date: 2022-12-05 08:10
tags:
  - typescript
---

Constraints (extends) digunakan untuk membatasi jenis (type) parameter generik ke subset tertentu dari tipe lain. Ini memastikan bahwa parameter tersebut memiliki bentuk tertentu atau memenuhi kriteria tertentu.

## Function merge object dengan constraints (extends)

tanpa constraints:

```ts twoslash
function merge<T, U>(objA: T, objB: U) {
	return Object.assign({}, objA, objB);
}
const mergeObj = merge({ name: 'ubay', hobby: ['coding', 'playing game'] }, 30);
console.log(mergeObj);
/* hasilnya
{
	"name": "ubay",
  "hobby": [
		"coding",
    "playing game"
  ]
} 
*/
```

pada contoh diatas kita tidak membatasi type apa saja yang boleh pada T, U. jika kita lempar nilai 100 atau 'Hello' pun typescript tidak memberikan keterangan error apapun. untuk itu kita bisa menambahkan type constraints **extends** pada type T & U. berikut ini contoh dengan constraints:

```ts twoslash
// @errors: 2345
function merge<T extends object, U extends object>(objA: T, objB: U) {
	return Object.assign({}, objA, objB);
}
const mergeObj = merge({ name: 'ubay', hobby: ['coding', 'playing game'] }, 30);
console.log(mergeObj);
```
