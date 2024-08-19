---
layout: ../../layouts/MarkdownLayout.astro
title: Design Pattern Creational - Builder
description: ''
imagePath: https://refactoring.guru/images/patterns/content/builder/builder-en-2x.png
imageAlt: img-design-pattern
viewTransitionName: 'design-pattern-builder'
date: 2023-12-11 09:00
icon: 'devicon:typescript'
tags:
  - design pattern
  - typescript
---

<blockquote>
kita bisa gunakan builder ketika pembuatan object (construct) parameter yang dimasukkan dirasa terlalu panjang, dan juga tidak semua parameter wajib untuk memiliki nilai.
</blockquote>

```ts
// @noErrors
// @filename: builder.ts
export class User {
	public name: string;
	public age: string;
	public address?: string | undefined;

	constructor(name: string, address?: string | undefined, age: string) {
		this.name = name;
		this.age = age;
		this.address = address;
	}
}
```

```ts
// @noErrors
// @filename: index.ts
import { User } from '$lib/pattern/builder';

const user1 = new User('khansa', 'bekasi', '19');
const user1 = new User('aisyah', '', '20');
```

- dari contoh diatas terdapat error 'A required parameter cannot follow an optional parameter.'.
- dan jika kita hapus optional parameternya lalu kita menambahkan parameter baru pada class user ini menjadi sangat panjang.
- dan jika kita hapus optional parameternya jika kita mengirim string kosong itu tidak bagus juga.

untuk dari itu pattern builder ini hadir. dari kode diatas kita bisa ubah jadi seperti dibawah ini.

```ts
// @noErrors
// @filename: builder.ts
class User {
	public name: string = '';
	public age: string = '';
	public address: string | undefined = undefined;
}

export class UserBuilder {
	private user: User;

	constructor() {
		this.user = new User();
	}

	setName(value: string) {
		this.user.name = value;
		return this;
	}
	setAge(value: string) {
		this.user.age = value;
		return this;
	}
	setAddress(value: string) {
		this.user.address = value;
		return this;
	}

	build() {
		return this.user;
	}
}
```

```ts
// @noErrors
// @filename: index.ts
import { UserBuilder } from '$lib/pattern/builder';

const user1 = new UserBuilder().setName('ubay').setAddress('di mana aja').setAge('20').build();
const user2 = new UserBuilder().setName('ubay2').setAge('30').build();

console.log(user1); // User { name: 'ubay', age: '20', address: 'di mana aja' }
console.log(user2); // User { name: 'ubay2', age: '30', address: undefined }
```

dengan code diatas jika kita tidak memasukan nilai pada property address tidak jadi masalah. dan mau menambah parameter sebanyak apa pun kode kita masih enak dilihat
