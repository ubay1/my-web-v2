---
title: Svelte Advance - Special element (svelte:self)
description:
imagePath: https://miro.medium.com/v2/resize:fit:1400/1*G9fzmaoymDGy7scbkgpC7A.png
imageAlt: svelte
viewTransitionName: 'svelte-self'
date: 2023-10-06 09:00
tags:
  - svelte
---

## svelte:self

svelte:self, memungkinkan sebuah komponen untuk berisi dirinya sendiri secara rekursif. contohnya kita dapat menggunakan element ini untuk membuat sebuah menu yang bercabang cabang. <br>

<blockquote>
	check contohnya disini:
	<a href="https://svelte.dev/repl/d4f62ea3e4d04824bc33fff0057c6880?version=4.2.8" target="_blank">svelte:self</a>
</blockquote>

```svelte
<!-- @filename: Sidebar.sv -->
<script lang="ts">
	import Menu from './Menu.svelte';

	let listMenu = [
		{
			name: 'Home',
			path: '/dashboard/home',
			files: []
		},
		{
			name: 'Flowbite Components',
			path: '/dashboard/flowbite',
			files: []
		},
		{
			name: 'Custom Components',
			path: '',
			files: [
				{
					name: 'Custom Select',
					path: '/dashboard/custom-select',
					files: []
				}
			]
		},
		{
			name: 'Chart',
			path: '/dashboard/chart',
			files: []
		},
		{
			name: 'Geo JSON',
			path: '/dashboard/geojson',
			files: []
		}
	];
</script>

<div class="mt-4">
	<Menu files={listMenu} expanded={false} />
</div>
```

```svelte
<!-- @filename: Menu.svelte"  -->
<script>
	import { slide } from 'svelte/transition';
	import { menu } from './menu.js';

	export let expanded = false;
	export let files;

	function toggle() {
		expanded = !expanded;
	}
</script>

<div>
	{#each files as item}
		{#if item.files.length === 0}
			<button style="display:flex; margin-bottom:10px;" on:click={() => console.log(item.path)}>
				<div class="">
					{item.name}
				</div>
			</button>
		{:else}
			<button on:click={toggle} style="display:flex; margin-bottom:10px;">
				<div class="">
					{item.name}
				</div>
			</button>
			{#if expanded}
				<ul transition:slide={{ duration: 200 }} class="">
					{#each files as file}
						{#if file.files && file.files.length > 0}
							<li>
								<svelte:self {...file} />
							</li>
						{/if}
					{/each}
				</ul>
			{/if}
		{/if}
	{/each}
</div>

<style>
	ul {
		margin: 0 0 0 10px;
		list-style: none;
	}

	li {
		margin: 0 0 0 10px;
	}
</style>
```

```js
// @filename: ~/stores/menu.js
import { writable } from 'svelte/store';

function createMenu() {
	const { subscribe, set, update } = writable({
		menuActive: '/dashboard/home',
		toggleSidebarInSmallScreen: false
	});

	const dataStore = {
		update,
		subscribe,
		setMenuActive: (value) => {
			update((items) => {
				return {
					...items,
					menuActive: value
				};
			});
		},
		setToggleSidebar: (value) => {
			update((items) => {
				return {
					...items,
					toggleSidebarInSmallScreen: value
				};
			});
		},
		reset: () =>
			set({
				menuActive: '/dashboard/home',
				toggleSidebarInSmallScreen: false
			})
	};

	return dataStore;
}
export const menu = createMenu();
```
