---
layout: ../../layouts/MarkdownLayout.astro
title: Sveltekit -  streaming load data
description:
imagePath: https://miro.medium.com/v2/resize:fit:1400/1*G9fzmaoymDGy7scbkgpC7A.png
imageAlt: svelte
viewTransitionName: 'sveltekit-streaming'
date: 2023-08-13 15:10
icon: 'devicon:svelte'
tags:
  - sveltekit
---

jika kita menggunakan SSR biasanya ketika pindah ke halaman lain yang melakukan fetching API itu lama,karena kita menunggu semua halaman selesai melakukan fetching. <br>
jika dengan streaming kita bisa masuk ke halaman yang dituju tanpa menunggu fetching selesai.

untuk jelasnya bisa lihat code dibawah ini.

```ts
// @filename: src/routes/+page.server.ts
// @noErrors
import type { PageServerLoad } from './$types';
import { setTimeout } from 'timers/promises';

interface IResponse {
	body: string;
	id: number;
	title: string;
	userId: number;
}
async function getData() {
	const res = await fetch('https://dummyjson.com/comments');
	const json = await res.json();
	await setTimeout(100);
	return json.comments;
}
async function getMock2() {
	const res = await fetch(`https://dummyjson.com/comments`);
	const postData = await res.json();
	await setTimeout(3000);
	return postData.comments;
}

export const load: PageServerLoad = async () => {
	return {
		one: getMock1(),
		streamed: {
			two: getMock2()
		}
	};
};
```

```svelte
<!-- @filename: src/routes/+page.svelte -->
<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex flex-col gap-4 my-4">
	{#await data.streamed.two}
		{#each Array(10) as _}
			<div class="px-4">
				<div class="shimmer h-10 w-full" />
			</div>
		{/each}
	{:then value}
		{#each value as item}
			<div class="bg-orange p-4">{item.id}. {item.body}</div>
		{/each}
	{:catch error}
		{error.message}
	{/await}
</div>
```
