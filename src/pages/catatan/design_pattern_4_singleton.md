---
layout: ../../layouts/MarkdownLayout.astro
title: Design Pattern Creational - Singleton
description: ''
imagePath: https://refactoring.guru/images/patterns/content/singleton/singleton-2x.png
imageAlt: img-design-pattern
viewTransitionName: 'design-pattern-singleton'
date: 2023-12-13 09:00
icon: 'devicon:typescript'
tags:
  - design pattern
  - typescript
---

Singleton adalah design pattern yang memastikan bahwa sebuah kelas hanya akan memiliki 1 instance, dan untuk meng-akses kelas tersebut kita hanya bisa mengaksesnya lewat 1 instance yang sudah terbuat sebelumnya. dan singleton ini termasuk kedalam anti pattern karena harusnya setiap class boleh memiliki instance lebih dari 1.

contoh kasusnya yang cocok digunakan adalah koneksi ke database, mengakses profile setelah login.

contoh dibawah ini jika tanpa singleton.

```ts
// @noErrors
// @filename: singleton.ts
export class TanpaSingleton {
	private firstName: string = '';
	private age: number = 0;

	public getFullName(): string {
		// akses db, select user * from ..
		const data = { name: 'ubay', age: 19 };
		this.firstName = data.name;
		this.age = data.age;

		return `nama saya adalah ${this.firstName} dan umur saya ${this.age}`;
	}
}
```

```ts
// @noErrors
// @filename: index.ts
import { TanpaSingleton } from '$lib/pattern/singleton';

const a1 = new TanpaSingleton();
console.log(a1.getFullName());

const a2 = new TanpaSingleton();
console.log(a2.getFullName());

if (a1 === a2) {
	console.log('Singleton works');
} else {
	console.log('Singleton failed'); // Singleton failed
}
```

dari contoh diatas, jika method getFullName digunakan di 1 page saja tidak jadi masalah, namun jika diakses dibeberapa page ini akan mengakses db berkali-kali, ini bisa makan memory. jika seperti ini kita bisa gunakan singleton.

contoh dengan singleton

```ts
// @noErrors
// @filename: singleton.ts
export class Profile {
	private static instance: Profile;
	private firstName: string = '';
	private lastName: string = '';

	public static getInstance(): Profile {
		// jika belum pernah di instansiasi, buat object baru dari class Profile
		if (!Profile.instance) {
			Profile.instance = new Profile();
		}

		// jika sudah pernah, langsung balikan saja
		return Profile.instance;
	}

	public getFullName(): string {
		// akses db, select user * from ..
		this.firstName = 'ubay';
		this.lastName = 'dillah';

		return `nama saya adalah ${this.firstName} ${this.lastName}`;
	}
}
```

```ts
// @noErrors
// @filename: index.ts
import { TanpaSingleton } from '$lib/pattern/singleton';

const s1 = Profile.getInstance();
console.log(s1.getFullName());

const s2 = Profile.getInstance();
console.log(s2.getFullName());

// jika variabel s1 dan s2 bernilai true, itu berarti menggunakan object yang sama
if (s1 === s2) {
	console.log('Singleton works');
} else {
	console.log('Singleton failed');
}
```
