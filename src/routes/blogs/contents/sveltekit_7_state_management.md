---
title: Sveltekit manage state yang baik
description:
imagePath: https://i.pinimg.com/originals/d2/e8/34/d2e8346922934ea035cf7c5a8b477ad8.jpg
imageAlt: sveltekit
date: 2023-08-18 08:00
tags:
  - sveltekit
---

Jika kita terbiasa membuat aplikasi khusus klien, manajemen status dalam aplikasi yang mencakup server dan klien mungkin tampak menakutkan. Bagian ini memberikan kiat untuk menghindari beberapa masalah umum.

## Tidak ada efek samping dalam pemuatan

Untuk alasan yang sama, fungsi pemuatan kita harus murni, tidak ada efek samping (kecuali mungkin sesekali console.log(...)). Sebagai contoh, kita mungkin tergoda untuk menyimpan data ke sebuah store di dalam fungsi load agar kita dapat menggunakan nilai store tersebut di dalam komponen kita:

```ts title="src/routes/+page.server.ts"
import { user } from '$lib/user';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch('/api/user');
	// Jangan pernah lakukan ini
	user.set(await response.json());
};
```

pada contoh diatas, hal ini akan menyimpan informasi satu pengguna di tempat yang digunakan bersama oleh semua pengguna. Sebagai gantinya, kembalikan saja data tersebut. dan berikan ke komponen yang membutuhkannya, atau gunakan <b>$page.data</b>.

<blockquote>
Jika kita tidak menggunakan SSR, maka tidak ada risiko secara tidak sengaja mengekspos data satu pengguna ke pengguna lain. Namun kita tetap harus menghindari efek samping dalam fungsi pemuatan kita - aplikasi kita akan lebih mudah dipahami tanpa efek samping tersebut
</blockquote>

## Menggunakan stores dengan context

kita mungkin bertanya-tanya bagaimana kita dapat menggunakan <b>$page.data</b> dan <b>$app/stores</b> jika kita tidak dapat menggunakan <b>$app/stores</b> kita sendiri. Jawabannya adalah gunakan <b>Context</b>. stores dilampirkan di layout lalu simpan data ke setContext, dan ketika kita subscribe, kita mengambilnya dengan getContext. berikut contohnya:

```ts title="src/routes/(state)/store.ts"
import { writable } from 'svelte/store';
export const quotes = writable();
```

```ts title="src/routes/(state)/+layout.server.ts"
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch }) => {
	const res = await fetch('https://dummyjson.com/quotes?limit=5', { method: 'GET' });
	const dataJson = await res.json();

	return dataJson;
};
```

```svelte title="src/routes/(state)/+layout.svelte"
<script lang="ts">
	import {(setContext, getContext)} from 'svelte'; import type {LayoutData} from './$types'; import{' '}
	{quotes} from './store'; export let data: LayoutData; $: quotes.set(data.quotes);
	setContext('quotes', quotes);
</script>
```

```svelte title="src/routes/(state)/+page.svelte"
<script lang="ts">
	import { getContext } from 'svelte';

	const quote: any = getContext('quotes');
</script>

<div>
	{#each $quote as item}
		{item.quote}
	{/each}
</div>
```
