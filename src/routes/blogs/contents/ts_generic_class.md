---
title: Generic class pada Typescript
description:
imagePath: https://miro.medium.com/max/1400/1*kIccf4SUwLmavuqDgjYlZA.jpeg
imageAlt: img-ts
date: 2022-12-05 10:00
tags:
  - typescript
---

```ts twoslash
// @errors: 2345
class Motor<T> {
	private list: T[] = [];

	addMotor(val: T) {
		this.list.push(val);
	}
	removeMotor(val: T) {
		this.list.splice(this.list.indexOf(val, 1));
	}
	getAllMotor(): void {
		console.log(this.list);
	}
}

const motorA = new Motor<string>(); // kita memberikan type string
motorA.addMotor('Vario'); // jadi disini, hanya bisa string
motorA.addMotor('Beat');
motorA.addMotor(10); // jika kita masukkan number akan error
motorA.getAllMotor();
```
