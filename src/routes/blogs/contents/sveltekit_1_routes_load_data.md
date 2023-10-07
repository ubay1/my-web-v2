---
title: Sveltekit routes dan Load data (+page.svelte, +page.ts, +page.server.ts, +error.svelte, +layout.svelte, +layout.ts, +layout.server.ts, +server.ts)
description:
imagePath: https://i.pinimg.com/originals/d2/e8/34/d2e8346922934ea035cf7c5a8b477ad8.jpg
imageAlt: sveltekit
date: 2023-08-13 14:00
tags:
  - sveltekit
---

## Routing

**src/routes**: root dari routes, biasa buat halaman beranda. <br>
**src/routes/about**: route halaman about <br>
**src/routes/about/[slug]**: membuat route dinamis, kita bisa akses seperti ini /about/hello

### +page.svelte

Komponen +page.svelte mendefinisikan halaman aplikasi Anda. Secara default, halaman dirender di server (SSR) untuk permintaan awal dan di peramban (CSR) untuk navigasi selanjutnya.

```svelte
src/routes/+page.svelte

<h1>Hello and welcome to my site!</h1>
<a href="/about">About my site</a>
```

```svelte
src/routes/about/+page.svelte

<h1>About this site</h1>
<p>TODO...</p>
<a href="/">Home</a>
```

```tsx
src/routes/about/[slug]/+page.svelte

<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>{data.title}</h1>
<div>{@html data.content}</div>
```

### +page.ts

Sering kali, sebuah halaman perlu memuat beberapa data sebelum dapat dirender. Untuk itu, kita menambahkan modul +page.ts/+page.server.ts yang mengekspor fungsi pemuatan:

```tsx
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	if (params.slug === 'hello-world') {
		return {
			title: 'Hello world!',
			content: 'Welcome to our blog. Lorem ipsum dolor sit amet...'
		};
	}

	throw error(404, 'Not found');
};
```

Fungsi ini berjalan bersama **+page.svelte**, yang berarti fungsi ini berjalan di server selama rendering sisi server dan di browser selama navigasi sisi klien.

### +page.server.ts

Jika fungsi pemuatan Anda hanya dapat berjalan di server, contohnya jika fungsi tersebut perlu mengambil data dari database atau Anda perlu mengakses variabel lingkungan privat seperti kunci API - maka Anda dapat mengganti nama **+page.ts** menjadi **+page.server.ts** dan mengubah tipe **PageLoad** menjadi **PageServerLoad**.

```tsx
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const post = await getPostFromDatabase(params.slug);

	if (post) {
		return post;
	}

	throw error(404, 'Not found');
};
```

Selama navigasi sisi klien, SvelteKit akan memuat data ini dari server, yang berarti nilai yang dikembalikan harus dapat diserialisasikan.

Seperti +page.ts, +page.server.ts dapat mengekspor opsi halaman - prerender, ssr, dan csr

### +error.svelte

Jika terjadi kesalahan selama pemuatan, SvelteKit akan merender halaman kesalahan default. Anda dapat menyesuaikan halaman kesalahan ini pada basis per rute dengan menambahkan file **+error.svelte**:

```tsx
src/routes/blog/[slug]/+error.svelte

<script lang="ts">
  import { page } from '$app/stores';
</script>

<h1>{$page.status}: {$page.error.message}</h1>
```

### +layout.svelte

Sejauh ini, kita telah memperlakukan halaman sebagai komponen yang sepenuhnya berdiri sendiri - pada saat navigasi, komponen +page.svelte yang ada akan dihancurkan, dan komponen baru akan menggantikannya.

Namun di banyak aplikasi, ada beberapa elemen yang harus terlihat di setiap halaman, seperti navigasi tingkat atas atau footer. Daripada mengulanginya di setiap +page.svelte, kita bisa meletakkannya di layout.

contoh:
Untuk membuat tata letak yang berlaku untuk setiap halaman, buatlah sebuah file bernama **src/routes/+layout.svelte**. kita dapat menambahkan markah, gaya, dan perilaku apa pun yang kita inginkan. Satu-satunya persyaratan adalah komponen harus menyertakan **slot** untuk konten halaman. Sebagai contoh:

```tsx
src/routes/+layout.svelte

<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
  <a href="/settings">Settings</a>
</nav>
<slot></slot>
```

### +layout.ts / +layout.server.ts

Sama seperti +page.svelte yang memuat data dari +page.js, komponen +layout.svelte Anda dapat memperoleh data dari fungsi muat di +layout.js.

```tsx
src / routes / settings / +layout.ts;

import type { LayoutLoad } from './$types';
export const load: LayoutLoad = () => {
	return {
		sections: [
			{ slug: 'profile', title: 'Profile' },
			{ slug: 'notifications', title: 'Notifications' }
		]
	};
};
```

Jika +layout.js mengekspor opsi halaman - prerender, ssr, dan csr - opsi-opsi tersebut akan digunakan sebagai default untuk halaman anak.

Data yang dikembalikan dari fungsi +layout.ts juga tersedia untuk semua halaman turunannya:

```tsx
src/routes/+page.svelte

<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;

  console.log(data.sections); // [{ slug: 'profile', title: 'Profile' }, ...]
</script>
```

### +server.ts

Selain halaman, Anda dapat menentukan rute dengan berkas **+server.js** (kadang-kadang disebut sebagai 'rute API' atau 'titik akhir'), yang memberi Anda kendali penuh atas respons. File **+server.js** Anda mengekspor fungsi-fungsi yang sesuai dengan kata kerja HTTP seperti GET, POST, PATCH, PUT, DELETE, OPTIONS, dan HEAD yang membutuhkan **RequestEvent** dan mengembalikan objek Response.

File **+server.js** dapat ditempatkan di direktori yang sama dengan file +page, yang memungkinkan rute yang sama untuk menjadi halaman atau titik akhir API. contoh:

```tsx
src / routes / +server.ts;

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	let data: any[] = [];
	try {
		const res = await fetch('https://jsonplaceholder.typicode.com/posts');
		const parse2json = await res.json();
		data = parse2json;
	} catch (error) {
		console.log(error);
	}
	return json(data);
};
```

```tsx
src / routes / +page.ts;

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	let datas: { body: string; id: number; title: string; userId: number }[] = [];

	try {
		const res = await fetch('/login');
		datas = await res.json();
	} catch (error) {
		console.log(error);
	}

	return {
		data: datas
	};
};
```

```tsx
src/routes/+page.svelte

<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>


<div class="flex flex-col gap-4 my-4">
	{#each data.data as item}
		<div>{item.id}. {item.body}</div>
	{/each}
</div>
```

### get data dari parent

kirim data dari +layout.ts/+layout.server.ts

```tsx
src / routes / +layout.ts;

import type { LayoutLoad } from './$types';

export const load: LayoutLoad = () => {
	return { a: 1 };
};
```

ambil data dari +layout.ts/+layout.server.ts
bisa pada +page.ts/+page.server.ts/+layout.ts/+layout.server.ts

```tsx
src / routes / aa / +layout.ts;

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { a } = await parent();
	return { b: a + 1 };
};
```

```svelte
<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div>
	{data.a}
	{data.b}
</div>
```