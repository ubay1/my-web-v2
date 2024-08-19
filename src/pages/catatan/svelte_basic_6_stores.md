---
layout: ../../layouts/MarkdownLayout.astro
title: Svelte Basic - (Stores)
description:
imagePath: https://miro.medium.com/v2/resize:fit:1400/1*G9fzmaoymDGy7scbkgpC7A.png
imageAlt: svelte
viewTransitionName: 'svelte-store'
date: 2023-10-03 09:00
icon: 'devicon:svelte'
tags:
  - svelte
---

## writable stores

store hanyalah sebuah objek, ada berapa metode yang dapat digunakan store:

- method subscribe: dengan method ini kita dapat mengetahui setiap kali ada perubahan pada nilai store.
- method update: method ini mengambil satu argumen yang merupakan callback. Callback mengambil nilai penyimpanan yang ada sebagai argumennya dan mengembalikan nilai baru untuk disetel ke penyimpanan. (n) => n+1
- method set: method ini mengambil satu argumen yang merupakan nilai yang akan ditetapkan. Nilai simpanan disetel ke nilai argumen jika nilai simpanan belum sama dengan nilai argumen itu.

<blockquote>
note: jika menggunakan subscribe kita harus melakukan onDestroy, agar tidak membuat memory leak
</blockquote>

```ts
// @filename: stores.ts
// @noErrors
import { writable } from 'svelte/store';
export const count = writable(0);
```

```svelte
<!-- @filename: App.svelte -->
<script>
	import { count } from '~/stores/store';

	let countValue;
	const unsubscribe = count.subscribe((value) => {
		countValue = value;
	});

	// destroy agar tidak terjadi memory leak
	onDestroy(unsubscribe);
</script>

<p>{countValue}</p>

// method update
<button on:click={() => count.update((n) => n + 1)}> +1 </button>

// method set
<button on:click={() => count.set(0)}> reset </button>
```

## Auto-subscription

untuk mengakali memory leak tadi kita juga bisa dapat dengan mereferensikan nilai store dengan mengawali nama store dengan <kbd>$</kbd>, dengan Auto-subscription ini kodingan kita menjadi lebih pendek.

```ts
// @filename: stores.ts
// @noErrors
import { writable } from 'svelte/store';
export const count = writable(0);
```

```svelte
<!-- @filename: App.svelte -->
<script>
	import { count } from '~/stores/store';
</script>

<p>{$count}</p>

// method update
<button on:click={() => count.update((n) => n + 1)}> +1 </button>

// method set
<button on:click={() => count.set(0)}> reset </button>
```

## Readable

Readable nilainya tidak dapat ditentukan dari luar, kita hanya bisa menggunakannya. kita tidak bisa menggunakan method update atau set untuk mengubahnya.

```ts
// @filename: stores.ts
// @noErrors
import { writable } from 'svelte/store';
export const count = writable(0);
```

```svelte
<!-- @filename: App.svelte -->
<script>
	import { count } from '~/stores/store';
</script>

<p>{$count}</p>

// method update tidak berfungsi
<button on:click={() => countReadable.update((n) => n + 1)}> +1 </button>

// method set tidak berfungsi
<button on:click={() => countReadable.set(0)}> reset </button>
```

## Derived Store

Kapan harus menggunakan store derived ? <br/>

Yaitu saat kita ingin melakukan pemfilteran di sisi klien berdasarkan input pengguna, menggunakan store derived bisa menjadi pilihan yang baik. Simpan data aktual di store lalu gunakan store derived untuk menyimpan hanya opsi yang difilter. Secara umum, jika kita ingin memperoleh data lain dari nilai penyimpanan dan ingin nilai tersebut diperbarui setiap kali penyimpanan diperbarui, kita dapat menggunakan derived store ini.

```ts
// @filename: ~/stores/derived.ts
// @noErrors
import { writable, derived } from 'svelte/store';
import type { Writable } from 'svelte/store';

type Post = {
	name: string;
	phone: string;
};

export const allPostStore: Writable<Post[]> = writable([]);
export const filteredText: Writable<string> = writable('');

export const filteredPostStore = derived(
	[allPostStore, filteredText],
	([$allPostStore, $filteredText]) => {
		return $allPostStore.filter((item) =>
			item.name.toLowerCase().includes($filteredText.toLowerCase())
		);
	}
);
```

```svelte
<!-- @filename: App.svelte -->
<script>
	import { allPostStore, filteredPostStore, filteredText } from '$lib/stores/derived';

	let postToDerivedStore;

	onMount(() => {
		postToDerivedStore = fetch('https://jsonplaceholder.typicode.com/users')
			.then((data) => {
				return data.json();
			})
			.then((dataFinal) => {
				$allPostStore = dataFinal;
			});
	});
</script>

{#await postToDerivedStore}
	<h2>Loading....</h2>
{:then post}
	<input type="text" placeholder="Search..." bind:value={$filteredText} name="search" />

	{#each $filteredPostStore as post}
		<div class="mb-4">
			<div class="font-bold">{post.name}</div>
			<p class="line-clamp-2">{post.phone}</p>
		</div>
	{/each}
{:catch error}
	<h3>Error while loading the data</h3>
{/await}
```

## Custom Store

```ts
// @filename: ~/stores/custom-store.ts
// @noErrors
import { writable } from 'svelte/store';

function createCount() {
	const { subscribe, set, update } = writable(0);

	return {
		subscribe,
		increment: () => update((n) => n + 1),
		decrement: () => update((n) => n - 1),
		reset: () => set(0)
	};
}

export const count = createCount();
```

```svelte
<!-- @filename: App.svelte -->
<script>
	import { count } from '~/stores/custom-store.ts';
</script>

<h1>The count is {$count}</h1>

<button on:click={count.increment}>+</button>
<button on:click={count.decrement}>-</button>
<button on:click={count.reset}>reset</button>
```
