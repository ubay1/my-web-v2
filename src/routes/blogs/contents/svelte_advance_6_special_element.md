---
title: Svelte Advance - Special element (svelte:document, svelte:head)
description:
imagePath: https://miro.medium.com/v2/resize:fit:1400/1*G9fzmaoymDGy7scbkgpC7A.png
imageAlt: svelte
date: 2023-10-08 09:00
tags:
  - svelte
---

## svelte:document

Elemen svelte:document memungkinkan kita untuk mendengarkan event yang terjadi pada dokumen. Hal ini berguna untuk event seperti selectionchange, yang tidak dijalankan pada window.

Tambahkan penangan selectionchange ke tag svelte:document.

```svelte
<!-- @filename: App.svelte -->
<script>
	let selection = '';

	const handleSelectionChange = (e) => (selection = document.getSelection());
</script>

<svelte:document on:selectionchange={handleSelectionChange} />

<h1>Select this text to fire events</h1>
<p>Selection: {selection}</p>
```

## svelte:head

Elemen svelte:head memungkinkan kita untuk menyisipkan elemen di dalam head dokumen kita. Hal ini berguna untuk hal-hal seperti tag title dan meta, yang sangat penting untuk SEO yang baik. <br>
dalam contoh ini kita akan menggunakannya untuk tujuan yang berbeda yaitu memuat stylesheet.

```svelte
<!-- @filename: App.svelte -->
<script>
	const themes = ['margaritaville', 'retrowave', 'spaaaaace', 'halloween'];
	let selected = themes[0];
</script>

<svelte:head>
	<link rel="stylesheet" href="/stylesheets/{selected}.css" />
</svelte:head>

<h1>Welcome to my site!</h1>

<select bind:value={selected}>
	<option disabled>choose a theme</option>

	{#each themes as theme}
		<option>{theme}</option>
	{/each}
</select>
```

## svelte:fragment

Elemen svelte:fragment memungkinkan kita menempatkan konten dalam slot bernama tanpa membungkusnya dalam elemen DOM kontainer.

<blockquote>
	check contohnya disini:
	<a href="https://svelte.dev/repl/fabe237032aa4bdb9745d7749678c2fc?version=4.2.8" target="_blank">svelte:fragment</a>
</blockquote>

```svelte
<!-- @filename: App.svelte -->
<script>
	import Layout from './Layout.svelte';
</script>

<Layout>
	<svelte:fragment slot="header">
		<div>POKEMON</div>
		<div>Contact</div>
	</svelte:fragment>

	<svelte:fragment slot="main">
		{#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as num}
			<img
				alt="pokemon {num}"
				src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/{num}.png"
			/>
		{/each}
	</svelte:fragment>
</Layout>

<style>
	:global(html, body) {
		padding: 0;
		margin: 0;
	}
	:global(*) {
		box-sizing: border-box;
	}
</style>
```

```svelte
<!-- @filename: Layout.svelte -->
<div class="header">
	<slot name="header" />
</div>
<main>
	<slot name="main" />
</main>

<style>
	.header {
		position: sticky;
		top: 0;
		left: 0;
		height: 50px;
		background: black;
		color: white;
		display: flex;
		justify-content: space-between;
		padding: 1rem;
	}
	main {
		background: #eee;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		flex-wrap: wrap;
		padding: 0 2rem;
	}
	main > :global(img) {
		margin: 10px;
		height: 200px;
		width: 200px;
		background: white;
		border-radius: 50%;
	}
</style>
```
