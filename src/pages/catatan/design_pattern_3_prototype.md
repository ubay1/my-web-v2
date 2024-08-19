---
layout: ../../layouts/MarkdownLayout.astro
title: Design Pattern Creational - Prototype
description: ''
imagePath: https://refactoring.guru/images/patterns/content/prototype/prototype-2x.png
imageAlt: img-design-pattern
viewTransitionName: 'design-pattern-prototype'
date: 2023-12-12 09:00
icon: 'devicon:typescript'
tags:
  - design pattern
  - typescript
---

<blockquote>
pattern ini berguna jika kita ingin mengcopy object dari class yang sudah ada
</blockquote>

```ts
// @noErrors
// @filename: prototype.ts
export class Car {
	public merk: string;
	public color: string;

	constructor(merk: string, color: string) {
		this.merk = merk;
		this.color = color;
	}

	clone(): this {
		const clone = Object.assign({}, this);
		return clone;
	}
}
```

```ts
// @noErrors
// @filename: index.ts
import { Car } from '$lib/pattern/prototype';

const car1 = new Car('Honda brio', 'white');
const car2 = car1.clone();
car2.color = 'red';

console.log('car 1 =', car1); // car 1 = Car { merk: 'Honda brio', color: 'white' }
console.log('car 2 =', car2); // car 2 = { merk: 'Honda brio', color: 'red' }
```

dari contoh diatas, pada car2 kita mengcopy data object milik car1. lalu mengubah nilai property colornya.
