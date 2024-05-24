---
title: Function pada Typescript
description: Belajar function yang ada pada typescript
imagePath: https://miro.medium.com/max/1400/1*kIccf4SUwLmavuqDgjYlZA.jpeg
imageAlt: img-ts
date: 2022-12-02 07:05
tags:
  - typescript
---

## Named Function

```ts twoslash
function add(a: number, b: number) {
	return a * b;
}
console.log(add(12, 12)); // 24
```

## Anonymous Function

```ts twoslash
let myAdd = function (x: number, y: number): number {
	return x + y;
};
console.log(myAdd(12, 12)); // 24
```

## Function tanpa nilai balik

dengan **: void** kita bisa memberikan **console.log**

```ts twoslash
let myAdd = function (x: number, y: number): void {
	console.log(x * y);
};
myAdd(12, 12); // 24
```

## Function dengan Rest Parameter

```ts twoslash
function buildName(...restOfName: any[]) {
	return restOfName;
}

const arr = [
	{ nama: 'ubay', alamat: 'tangsel' },
	{ nama: 'mutiara', alamat: 'bekasi' }
];

let buildNameFun = buildName(arr);

buildNameFun.map((data, index) => {
	data.forEach((data2: any) => {
		console.log(data2.nama); // ubay, mutiara
	});
});
```
