---
layout: ../../layouts/MarkdownLayout.astro
title: Design Pattern Structural - Adapter
description: ''
imagePath: https://refactoring.guru/images/patterns/content/adapter/adapter-en-2x.png
imageAlt: img-design-pattern
viewTransitionName: 'design-pattern-adapter'
date: 2023-12-14 09:00
icon: 'devicon:typescript'
tags:
  - design pattern
  - typescript
---

Adapter adalah desain pattern yang memungkinkan komunikasi antara dua interface yang tidak kompatibel dengan bertindak sebagai perantara atau jembatan untuk menggeneral kan semua class yang berbeda.

Adapter Ini bertujuan untuk mentransform class-class yang berbeda" sesuai dengan standard yang kita perlukan.

contoh kasus dibawah ini adalah toko online, dimana kita ingin menampilkan seluruh produk yang berbeda-beda dalam 1 katalog/wishlist. dan misal yang ingin ditampilkan hanya nama produk dan author nya.

```ts
// @noErrors
// @filename: adapter.ts
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

```ts
// @noErrors
// @filename: index.ts
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

dari contoh diatas, jika tanpa menggunakan pattern adapter kita harus melakukan pengecekan satu satu untuk menampilkan data yang diperlukan. ini akan jadi masalah jika kita memiliki banyak class yang berbeda-beda jenis. maka dari itu pattern adapter ini berguna.

contoh dengan adapter.

```ts
// @noErrors
// @filename: adapter.ts
export interface KatalogAdapter {
	getTitleAndAuthor(): string;
}

export class BookKatalogAdapter {
	private book: Book;

	constructor(book: Book) {
		this.book = book;
	}

	getTitleAndAuthor(): string {
		return this.book.title + ' by ' + this.book.author;
	}
}

export class Book {
	constructor(public title: string, public author: string) {}

	public getBook(): string {
		return `buku ${this.title}, dibuat oleh ${this.author}`;
	}
}

export class MovieKatalogAdapter {
	private movie: Movie;

	constructor(movie: Movie) {
		this.movie = movie;
	}

	getTitleAndAuthor(): string {
		return this.movie.title + ' by ' + this.movie.author;
	}
}
export class Movie {
	constructor(public title: string, public author: string, public duration: number) {}

	public getMovie(): string {
		return `film ${this.title}, dibuat oleh ${this.author} dalam durasi ${this.duration} menit`;
	}
}
```

```ts
// @noErrors
// @filename: index.ts
import type { KatalogAdapter } from '$lib/pattern/adapter';
import { BookKatalogAdapter, MovieKatalogAdapter, Book, Movie } from '$lib/pattern/adapter';

const listKatalog: KatalogAdapter[] = [];
listKatalog.push(new BookKatalogAdapter(new Book('pemrograman javascript', 'anonymous')));
listKatalog.push(new BookKatalogAdapter(new Book('pemrograman typescript', 'anonymous')));

listKatalog.push(new MovieKatalogAdapter(new Movie('belajar web laravel', 'wakwaw', 120)));
listKatalog.push(new MovieKatalogAdapter(new Movie('belajar web ruby on rails', 'wakwaw', 90)));

listKatalog.forEach((item) => {
	console.log(item.getTitleAndAuthor());
});
```

jika kita ingin menambah catalog lagi misal sayuran, baju, celana, dll. kita tidak usah repot-repot menambahkan pengecekan pada saat looping data. karna sudah dihandle oleh adapter.
