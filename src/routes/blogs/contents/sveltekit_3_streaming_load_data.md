---
title: Sveltekit streaming load data
description:
imagePath: https://i.pinimg.com/originals/d2/e8/34/d2e8346922934ea035cf7c5a8b477ad8.jpg
imageAlt: sveltekit
date: 2023-08-13 15:10
tags:
  - sveltekit
---

promise pada tingkat teratas dari objek yang dikembalikan akan ditunggu, sehingga memudahkan untuk mengembalikan banyak promise tanpa membuat waterfall. Ketika menggunakan beban server, nested promises akan dialirkan ke browser ketika selesai. Hal ini berguna jika Anda memiliki data yang lambat dan tidak penting, karena Anda dapat mulai merender halaman sebelum semua data tersedia:

```ts
src / routes / +page.server.ts;

import type { PageServerLoad } from './$types';
import { setTimeout } from 'timers/promises';

interface IResponse {
	body: string;
	id: number;
	title: string;
	userId: number;
}
export const load: PageServerLoad = ({ fetch }) => {
	async function getData() {
		const res = await fetch('/login');
		const data: IResponse[] = await res.json();
		await setTimeout(1000);
		return data;
	}

	return {
		// notLazy: getData()
		lazy: {
			dataPost: getData()
		}
	};
};
```

```tsx
src / routes / +page.server.ts;

<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex flex-col gap-4 my-4">
	{#await data.lazy.dataPost}
		<!-- {#await data.notLazy} -->
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
