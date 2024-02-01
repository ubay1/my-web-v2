---
title: Design Pattern Creational - Repository
description: ''
imagePath: https://refactoring.guru/images/patterns/content/builder/builder-en-2x.png
imageAlt: img-design-pattern
date: 2023-12-15
tags:
  - design pattern
  - typescript
---

<blockquote>
pattern ini berguna untuk mengumpulkan semua operasi ke database di satu tempat.
</blockquote>

berikut ini contohnya

```ts title="repository.ts"
interface IPost {
	title: string;
	body: string;
	userId: number;
}

export class FakeRepository {
	public async create(body: IPost) {
		const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		});
		const json = await res.json();

		return json;
	}

	public async read() {
		const res = await fetch('https://jsonplaceholder.typicode.com/posts');
		const json = await res.json();

		return json;
	}

	public async update(body: IPost) {
		const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
			method: 'PUT',
			body: JSON.stringify(body),
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		});
		const json = await res.json();

		return json;
	}

	public async delete() {
		const res = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
			method: 'DELETE'
		});
		const json = await res.json();

		return json;
	}
}
```

```ts title="index.ts"
import { FakeRepository } from '$lib/pattern/repository';

const fakeRepo = new FakeRepository();

async function createData() {
	const res = await fakeRepo.create(form);
	console.log(res);
}
async function readData() {
	const res = await fakeRepo.delete();

	console.log(res);
}

readData();
```
