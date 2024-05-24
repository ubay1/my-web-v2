---
title: Design Pattern Structural - Facade
description: ''
imagePath: https://refactoring.guru/images/patterns/content/facade/facade-2x.png
imageAlt: img-design-pattern
date: 2023-12-16
tags:
  - design pattern
  - typescript
---

<blockquote>
pattern ini berfungsi untuk mengelompokkan sebuah logic yang complex kedalam satu class tersendiri atau di 1 file tersendiri, yang mana class ini nantinya dapat digunakan di class lain.
</blockquote>

atau bisa kita katakan seperti sebuah helper di function.

berikut ini contohnya

```ts title="facade.ts"
export class Operations {
	private num1: number;
	private num2: number;

	constructor(_num1: number, _num2: number) {
		this.num1 = _num1;
		this.num2 = _num2;
	}

	public summarization(): number {
		return this.num1 + this.num2;
	}
	public reduction(): number {
		return this.num1 - this.num2;
	}
	public multiplication(): number {
		return this.num1 * this.num2;
	}
	public division(): number {
		return this.num1 / this.num2;
	}
}
```

```vue title="index.vue"
<script setup lang="ts">
import { Operations } from '$lib/pattern/facade';

const opr1 = new Operations(10, 30);
console.log('penjumlahan = ', opr1.summarization()); // penjumlahan =  40
console.log('pengurangan = ', opr1.reduction()); // pengurangan =  -20
console.log('perkalian = ', opr1.multiplication()); // perkalian =  300
console.log('pembagian = ', opr1.division()); // pembagian =  0.3333333333333333
</script>
```
