---
title: Design Pattern Behavioral - Command
description: ''
imagePath: https://refactoring.guru/images/patterns/content/command/command-en-2x.png
imageAlt: img-design-pattern
date: 2023-12-17
tags:
  - design pattern
  - typescript
---

command pattern adalah design pattern untuk mengelompokkan beberapa method atau method tunggal untuk melakukan perintah yang spesifik.

berikut ini contoh tanpa command pattern

```ts title="command.ts"
interface IUser {
	deleteUserById(id: number): void;
	check(userId: number): boolean;
}
interface IProduct {
	deleteProductById(id: number): void;
	check(userId: number): boolean;
}

export class UserImpl implements IUser {
	deleteUserById(id: number): void {
		console.log('sukses delete data user dengan id = ', id);
	}
	check(userId: number): boolean {
		return userId === 1 ? true : false;
	}
}

export class ProductImpl implements IProduct {
	deleteProductById(id: number): void {
		console.log('sukses delete data product dengan id = ', id);
	}
	check(userId: number): boolean {
		return userId === 1 ? true : false;
	}
}
```

```vue title="index.vue"
<script setup lang="ts">
import { UserImpl, ProductImpl } from '$lib/pattern/command';

const userId: number = 1;
const user1 = new UserImpl();
const product1 = new ProductImpl();

if (user1.check(userId)) {
	user1.deleteUserById(userId);
}
if (product1.check(userId)) {
	product1.deleteProductById(userId);
}
</script>
```

kita lihat object user1 dan product1 melakukan eksekusi delete data dengan cara yang sama.

1. pertama kita jalankan method check().
2. jika check() bernilai true maka akan menjalankan method deleteUserById/ deleteProductById().

berikut ini kode dengan command pattern

```ts title="command.ts" {9-11, 21-29, 39-47}
interface IUser {
	deleteUserById(id: number): void;
	check(userId: number): boolean;
}
interface IProduct {
	deleteProductById(id: number): void;
	check(userId: number): boolean;
}
interface DeleteCommand {
	execute(userId: number): void;
}

export class UserImpl implements IUser {
	deleteUserById(id: number): void {
		console.log('sukses delete data user dengan id = ', id);
	}
	check(userId: number): boolean {
		return userId === 1 ? true : false;
	}
}
export class UserDeleteCommand implements DeleteCommand {
	constructor(private repository: IUser) {}

	public execute(userId: number) {
		if (this.repository.check(userId)) {
			this.repository.deleteUserById(userId);
		}
	}
}

export class ProductImpl implements IProduct {
	deleteProductById(id: number): void {
		console.log('sukses delete data product dengan id = ', id);
	}
	check(userId: number): boolean {
		return userId === 1 ? true : false;
	}
}
export class ProductDeleteCommand implements DeleteCommand {
	constructor(private repository: IProduct) {}

	public execute(userId: number) {
		if (this.repository.check(userId)) {
			this.repository.deleteProductById(userId);
		}
	}
}
```

```vue title="index.vue" {4-5, 10-11}
<script setup lang="ts">
import {
	UserImpl,
	ProductImpl,
	UserDeleteCommand,
	ProductDeleteCommand
} from '$lib/pattern/command';

const userId: number = 1;
new UserDeleteCommand(new UserImpl()).execute(userId);
new ProductDeleteCommand(new ProductImpl()).execute(userId);
</script>
```

jadi dengan command kita cukup membuat 1 buah interface Command yang berisi function bernama
<b> execute(id: number) </b>.

lalu pada class user dan product kita membuat 1 buah class lagi yang mengimplementasikan interface Command, dimana isi dari class ini adalah untuk melakukan delete data.

jika ingin membuat update pun kita bisa menambahkan 1 buah function di interface Command.
