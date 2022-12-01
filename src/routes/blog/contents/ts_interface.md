---
title: Interface pada Typescript
description: Belajar interface yang ada pada typescript
imagePath: https://fedojo.com/wp-content/uploads/2019/05/typescript.png
imageAlt: img-ts
date: 2022-12-02
tags:
  - typescript
---

# Custom Types dengan Interfaces

<br>
cara terbaik custom types menggunakan interfaces

```ts
interface LabeledValue {
	label: string;
}

function printLabel(labeledObj: LabeledValue) {
	// console.log(labeledObj.label);
}

let myObj = { size: 10, label: 'Size 10 Object' };
printLabel(myObj); // tampil Size 10 Object
```

<br>

# Optional properties

dengan optional properties ini, kita bisa menggunakan
nilai interfaces ataupun tidak,

```ts
interface SquareConfig {
	color?: string;
	width?: number;
}
function createSquare(config: SquareConfig) {
	// console.log(config); // tampil {color: "black"}
}
let mySquare = createSquare({ color: 'black' });
```

jika width kita hilangkan tanda **?** nya, maka kita wajib
menggunakan width tersebut.
<br><br>

# Konstanta pada interface menggunakan readonly

```ts
interface Point {
	readonly x: number;
	readonly y: number;
}

let p1: Point = { x: 10, y: 20 };
p1.x = 5; // error, nilai x tidak dpt diubah
// console.log(p1.x); // tampil 10

// cara lain menggunakan readonly
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
// console.log(ro[0]); // tampil 1
ro.push(5); // error
```

untuk variabel kita menggunakan **CONST**
<br>
untuk properties kita gunakan **readonly**

<br>

# Indexable types

indexable types kita dapat membuat array dalam interfaces, <br>

```ts
interface StringArray {
	[index: number]: string; // mendefinisikan index dengan number,
	// dan hanya dapat diisi dengan string
}
let myArray: StringArray;
myArray = ['Bob', 'Fred'];
let myStr: string = myArray[0];
// console.log(myStr); // tampil bob
```

<br>
