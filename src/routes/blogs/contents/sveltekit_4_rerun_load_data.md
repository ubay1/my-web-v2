---
title: Sveltekit -  rerun load function dengan invalidate/invalidateAll & depends
description:
imagePath: https://miro.medium.com/v2/resize:fit:1400/1*G9fzmaoymDGy7scbkgpC7A.png
imageAlt: svelte
viewTransitionName: 'sveltekit-invalidate'
date: 2023-08-13 15:13
tags:
  - sveltekit
---

sveltekit punya fitur keren lagi, yaitu rerun load function yang ada di <b>+page.ts/+page.server.ts</b>.

contoh:

<blockquote>
kita memiliki list data yang bisa dihapus, dan edit. jika tanpa menggunakan fitur ini ketika kita hapus/edit data kita harus melakukan hit ulang ke api untuk mendapatkan data terbaru. <br> namun dengan fitur ini ketika kita melakukan aksi hapus/edit kita cukup memanggil ulang function load() yang ada di +page.server/+page.ts.
</blockquote>

```ts
// @filename: src/routes/+page.server.ts
// @noErrors
import type { PageServerLoad } from './$types';
import { setTimeout } from 'timers/promises';

export const load: PageServerLoad = async ({ fetch, depends }) => {
	// rerun fetch  ketika `invalidate('generate-image')` dipanggil pada file +page.svelte
	depends('generate-image');
	async function rerun() {
		const response = await fetch('/api/learn/generate-image', { method: 'GET' });
		await setTimeout(10);
		return await response.json();
	}

	return {
		streamed: {
			image: rerun()
		}
	};
};
```

```svelte
<!-- @filename: src/routes/+page.svelte -->
<script lang="ts">
	import { invalidate, invalidateAll } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;

	async function rerunLoadFunction() {
		invalidate('generate-image');
		// invalidate((url) => url.href.includes('generate-image'));
		// invalidateAll();
	}
</script>

<button
	class="bg-white text-black p-2 border-0 cursor-pointer hover:bg-gray-2"
	on:click={rerunLoadFunction}
>
	Delete Image
</button>
```
