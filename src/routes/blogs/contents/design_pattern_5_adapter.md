---
title: Design Pattern Structural - Adapter
description: ''
imagePath: https://refactoring.guru/images/patterns/content/adapter/adapter-en-2x.png
imageAlt: img-design-pattern
date: 2023-12-14
tags:
  - design pattern
  - typescript
---

Adapter adalah desain pattern yang memungkinkan komunikasi antara dua interface yang tidak kompatibel dengan bertindak sebagai perantara atau jembatan untuk menggeneral kan semua class yang berbeda.

Adapter Ini bertujuan untuk mentransform class-class yang berbeda" sesuai dengan standard yang kita perlukan.

contoh kasus dibawah ini adalah toko online, dimana kita ingin menampilkan seluruh produk yang berbeda-beda dalam 1 katalog/wishlist. dan yang ditampilkan hanya nama produk dan author nya.

```ts title="adapter.ts"
export class Book {
	constructor(public title: string, public author: string) {}

	public getBook(): string {
		return `buku ${this.title}, dibuat oleh ${this.author}`;
	}
}

export class Movie {
	constructor(public title: string, public author: string, public duration: number) {}

	public getMovie(): string {
		return `film ${this.title}, dibuat oleh ${this.author} dalam durasi ${this.duration} menit`;
	}
}
```

```ts title="index.ts"
import { Book, Movie } from '$lib/pattern/adapter';

const listKatalog: any[] = [];
listKatalog.push(new Book('pemrograman javascript', 'anonymous'));
listKatalog.push(new Book('pemrograman typescript', 'anonymous'));
listKatalog.push(new Movie('belajar web laravel', 'wakwaw', 120));
listKatalog.push(new Movie('belajar web ruby on rails', 'wakwaw', 90));

listKatalog.forEach((item) => {
	if (item instanceof Book) {
		console.log(item.title + ' by ' + item.author);
	} else if (item instanceof Movie) {
		console.log(item.title + ' by ' + item.author);
	}
});
```

dari contoh diatas, jika tanpa adapter kita harus melakukan pengecekan satu satu untuk menampilkan data yang diperlukan. ini akan jadi masalah jika kita memiliki banyak class yang berbeda-beda jenis. maka dari itu pattern adapter ini berguna.

contoh dengan adapter.

```ts title="singleton.ts"
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

```ts title="index.ts"
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
