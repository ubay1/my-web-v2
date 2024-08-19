---
layout: ../../layouts/MarkdownLayout.astro
title: Svelte Basic - (If, Each, Await)
description:
imagePath: https://miro.medium.com/v2/resize:fit:1400/1*G9fzmaoymDGy7scbkgpC7A.png
imageAlt: svelte
viewTransitionName: 'svelte-condition'
date: 2023-10-01 11:00
icon: 'devicon:svelte'
tags:
  - svelte
---

# #Logic

## If Blocks

```svelte
<!-- @filename: if block -->
<script>
	let count = 0;

	function increment() {
		count += 1;
	}
</script>

<button on:click={increment}>
	Clicked {count}
	{count === 1 ? 'time' : 'times'}
</button>

{#if count > 10 && count < 20}
	<p>{count} is greater than 10</p>
{:else if count > 20}
	<p>please stop {count} is zzz ..</p>
{:else}
	<p>ok {count} is safe</p>
{/if}
```

## Each Blocks

```svelte
<!-- @filename: each blocks -->
<script lang="ts">
	const colors: string[] = ['red', 'orange', 'teal', 'green', 'blue', 'indigo', 'violet'];
	let selected: string = colors[0];
</script>

<h1 style="color: {selected}">Pick a colour</h1>

<div>
	{#each colors as color, i}
		<button
			aria-current={selected === color}
			aria-label={color}
			style="background: {color};"
			on:click={() => (selected = color)}>{i + 1}</button
		>
	{/each}
</div>

<style>
	button {
		border-radius: 100%;
		width: 50px;
		height: 50px;
	}
	button[aria-current='true'] {
		transform: none;
		filter: none;
		box-shadow: inset 3px 3px 4px rgba(0, 0, 0, 0.2);
	}
</style>
```

```svelte
<!-- @filename: key each blocks - App.svelte -->
<script lang="ts">
	import Thing from './Thing.svelte';

	let things = [
		{ id: 1, name: 'apple' },
		{ id: 2, name: 'banana' },
		{ id: 3, name: 'carrot' },
		{ id: 4, name: 'doughnut' },
		{ id: 5, name: 'egg' }
	];

	function handleClick() {
		things = things.slice(1);
	}
</script>

<button on:click={handleClick}> Remove first thing </button>

{#each things as thing}
	<Thing name={thing.name} />
{/each}
```

```svelte
<!-- @filename: key each blocks - Things.svelte -->
<script>
	const emojis = {
		apple: '🍎',
		banana: '🍌',
		carrot: '🥕',
		doughnut: '🍩',
		egg: '🥚'
	};

	export let name;

	const emoji = emojis[name];
</script>

<p>{emoji} = {name}</p>
```

## Await Blocks

Sebagian besar aplikasi web harus berurusan dengan data asinkron pada suatu saat. Svelte memudahkan untuk menunggu nilai promise secara langsung.

```svelte
<!-- @filename: App.svelte -->
<script lang="ts">
	import { getRandomNumber } from './api.ts';

	let promise = getRandomNumber();

	function handleClick() {
		promise = getRandomNumber();
	}
</script>

<button on:click={handleClick}> generate random number </button>

{#await promise}
	<p>...waiting</p>
{:then number}
	<p>The number is {number}</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
```

```js title="api.ts"
export async function getRandomNumber() {
	const res: any = await fetch('/random-number');

	if (res.ok) {
		return await res.text();
	} else {
		throw new Error('Request failed');
	}
}
```
