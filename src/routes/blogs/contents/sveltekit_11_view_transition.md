---
title: Sveltekit -  view transition
description:
imagePath: https://miro.medium.com/v2/resize:fit:1400/1*G9fzmaoymDGy7scbkgpC7A.png
imageAlt: svelte
viewTransitionName: 'sveltekit-view-transition'
date: 2024-05-28 07:00
tags:
  - sveltekit
---

untuk menggunakan view-transition api di sveltekit sangat mudah.

contoh dibawah ini adalah penggunaan view-transition di web ini.
di web ini menggunakan transition shared element di bagian menu dan blogs.

1. Tambahkan code ini di **+layout.svelte**

```svelte
<script lang="ts">
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>
```

## Contoh untuk blogs

1. Tambahkan code css di **$lib/assets/global.css**

```css
@media (prefers-reduced-motion: no-preference) {
	[style*='--tag'] {
		view-transition-name: var(--tag);
	}
}
```

2. pada komponen list blogs tambahkan kode ini

```ts
// @filename: src/blogs/+page.ts
// @noErrors
import type { IFetchBlog } from '$lib/types/fetchBlog';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	const apiPostsResponse = await fetch(`/api/blogs`);
	const dataPosts = await apiPostsResponse.json();
	const posts: IFetchBlog[] = dataPosts;

	return {
		posts
	};
}) satisfies PageLoad;
```

```svelte
<!-- @filename: src/blogs/+page.svelte -->
<script lang="ts">
	export let data: PageData;
</script>

<a class="cursor-pointer decoration-none" href={slug}>
	<div
		class="text-black mb-0 block text-xl leading-tight font-semibold dark:text-white"
		style:--tag="h-{data.viewTransitionName}"
	>
		Ini list blogs
	</div>
</a>
```

> lihat pada kode **style:--tag="h-test"**, kode ini yang akan diset pada root element, dan pada global.css kita cukup memanggilnya dengan **--tag**, maka otomatis **view-transition-name** yang ada pada **global.css** akan merujuk pada **style:--tag="h-test"**. <br> **Catatan:** nama view-transition tidak boleh ada spasi

3. pada detail blogs kita harus menyamakan nama **style tag-nya** seperti pada komponen list blogs. jika tidak maka view-transiton tidak akan jalan.

```ts
// @filename: src/blogs/contents/[slug]/+page.ts
// @noErrors
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	const post = await import(`../${params.slug}.md`);
	const { title, description, date, tags, imagePath, viewTransitionName } = post.metadata;
	const content = post.default;

	return {
		content,
		title,
		description,
		date,
		tags,
		imagePath,
		viewTransitionName
	};
}) satisfies PageLoad;
```

```svelte
<!-- @filename: src/blogs/contents/[slug]/+page.svelte -->
<script lang="ts">
	export let data: PageData;
</script>

<div
	class="text-3xl z-40 line-clamp-2 font-bold text-center text-white"
	style:--tag="h-{data.viewTransitionName}"
>
	Ini detail dari blogs
</div>
```

## Contoh untuk menu

```svelte
<ul
	data-sveltekit-preload-data
	class="mb-0 flex justify-center items-center border-b border-b-solid border-gray-3 dark:border-gray-7 sticky lt-md:hidden"
>
	{#each listTab as tab}
		<li
			aria-current={tab.url.split('/')[1] === $page.url.pathname.split('/')[1] ? 'page' : undefined}
			class={classNames(
				'text-gray-7 flex items-center gap-1 cursor-pointer hover:bg-gray-7 hover:bg-opacity-8  dark:hover:bg-gray-2 dark:hover:bg-opacity-8'
			)}
		>
			<a
				class="p-4 decoration-none flex dark:text-githubDark-2"
				href={tab.url}
				on:click={() => changeTabActive(tab.id)}
			>
				<Icon icon={tab.icon} class="mr-1 text-lg" />
				<div>{tab.label}</div>
			</a>
		</li>
	{/each}
</ul>

<style>
	li {
		position: relative;
		height: 100%;
	}
	li[aria-current='page']::before {
		content: '';
		width: calc(100% - 4px);
		height: 0;
		position: absolute;
		bottom: 0;
		left: 0;
		border: 2px solid #f97316;
		view-transition-name: active-page;
	}
</style>
```

view-transition pada menu bekerja saat **aria-current='page'**. jadi ketika kita klik menu misal **dari beranda ke blogs**, maka pada kode akan melakukan pengecekan, jika sesuai maka akan menjalankan transitionnya **dari beranda ke blogs**.

```svelte
aria-current={tab.url.split('/')[1] === $page.url.pathname.split('/')[1] ? 'page' : undefined}
```
