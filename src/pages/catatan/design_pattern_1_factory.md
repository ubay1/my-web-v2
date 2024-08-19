---
layout: ../../layouts/MarkdownLayout.astro
title: Design Pattern Creational - Factory Method
description: ''
imagePath: https://refactoring.guru/images/patterns/content/factory-method/factory-method-en-2x.png
imageAlt: img-design-pattern
viewTransitionName: 'design-pattern-factory'
date: 2023-12-10 09:00
icon: 'devicon:typescript'
tags:
  - design pattern
  - typescript
---

Factory Method adalah sebuah class/method yang berguna untuk membuat sebuah object yang dinamis.

<blockquote>
kita bisa gunakan factory kalau ingin pembuatan object nya dinamis dan conditional, dan lagi class nya juga seragam.
</blockquote>

contoh dibawah ini kita bisa bayangkan sebuah perusahaan yang bergerak dibidang logistik. dimana perusahaan tersebut dapat melakukan pengiriman dengan melakukan truk dan juga dengan menggunakan kapal.

```ts
// @noErrors
// @filename: factory.ts
export class Truck {
	constructor(public qty: number) {
		this.delivery();
	}
	delivery(): void {
		console.log(`truk membawa ${this.qty} barang`);
	}
}

export class Ship {
	constructor(public qty: number) {
		this.delivery();
	}
	delivery(): void {
		console.log(`kapal membawa ${this.qty} barang`);
	}
}
```

```ts
// @noErrors
// @filename: index.ts
import { Truck, Ship } from '$lib/pattern/factory';

const typeDelivery = 'delivery-by-land';

if (typeDelivery === 'delivery-by-land') {
	new Truck(10);
} else if (typeDelivery === 'delivery-by-sea') {
	new Ship(1000);
}
```

dari contoh diatas, misal dari perusahaan tersebut ada tambahan lagi dimana pengiriman barang bisa melalui motor, dan pesawat. kita harus menambahkan lagi pengecekan kondisi <b> typeDeivery </b> diatas. kalau di 1 file sih gak masalah, tapi kalau sudah dibeerapa file nah itu yang jadi masalah. maka dari itu factory method ini berguna.

kita bisa merubah code diatas menjadi seperti dibawah ini.

```ts
// @noErrors
// @filename: factory.ts
interface Logistic {
	qty: number;
	delivery(): void;
}

class Truck implements Logistic {
	constructor(public qty: number) {
		this.delivery();
	}
	delivery(): void {
		console.log(`truk membawa ${this.qty} barang`);
	}
}

class Ship implements Logistic {
	constructor(public qty: number) {
		this.delivery();
	}
	delivery(): void {
		console.log(`kapal membawa ${this.qty} barang`);
	}
}

type LogisticType = {
	type: 'delivery_by_land' | 'delivery_by_sea';
	qty: number;
};
interface Factory {
	create(options: LogisticType): Logistic;
}
export class LogisticDelivery implements Factory {
	public create(options: LogisticType): Logistic {
		if (options.type === 'delivery_by_land') {
			return new Truck(options.qty);
		} else if (options.type === 'delivery_by_sea') {
			return new Ship(options.qty);
		}

		throw new Error('class tidak tersedia');
	}
}
```

```ts
// @noErrors
// @filename: index.ts
import { LogisticDelivery } from '$lib/pattern/factory';

const logistic = new LogisticDelivery();
logistic.create({ type: 'delivery_by_land', qty: 100 });
logistic.create({ type: 'delivery_by_sea', qty: 1000 });
```
