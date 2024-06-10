---
title: Svelte Advance - Special element (svelte:component, svelte:element, svelte:window, svelte:body)
description:
imagePath: https://miro.medium.com/v2/resize:fit:1400/1*G9fzmaoymDGy7scbkgpC7A.png
imageAlt: svelte
viewTransitionName: 'svelte-element'
date: 2023-10-07 09:00
icon: 'devicon:svelte'
tags:
  - svelte
---

## svelte:component

Sebuah komponen dapat mengubah jenisnya dengan svelte:component. Pada contoh ini, kita ingin menampilkan RedThing.svelte jika warnanya merah, GreenThing.svelte jika warnanya hijau, dan seterusnya. Kita bisa melakukan ini dengan urutan blok if... <br>

<blockquote>
	check contohnya disini:
	<a href="https://svelte.dev/repl/2714c6d6108247488a46d22ea25b0eae?version=4.2.8" target="_blank">svelte:component</a>
</blockquote>

```svelte
<!-- @filename: App.svelte -->
<script>
	import RedThing from './RedThing.svelte';
	import GreenThing from './GreenThing.svelte';
	import BlueThing from './BlueThing.svelte';

	const options = [
		{ color: 'red', component: RedThing },
		{ color: 'green', component: GreenThing },
		{ color: 'blue', component: BlueThing }
	];

	let selected = options[0];
</script>

<select bind:value={selected}>
	{#each options as option}
		<option value={option}>{option.color}</option>
	{/each}
</select>

<svelte:component this={selected.component} />
```

```svelte
<!-- @filename: RedThing.svelte -->
<p>Red thing</p>

<style>
	p {
		color: red;
	}
</style>
```

```svelte
<!-- @filename: BlueThing.svelte -->
<p>Blue thing</p>

<style>
	p {
		color: blue;
	}
</style>
```

```svelte
<!-- @filename: GreenThing.svelte -->
<p>Green thing</p>

<style>
	p {
		color: green;
	}
</style>
```

## svelte:element

Sama seperti svelte:component, kita tidak selalu tahu sebelumnya jenis elemen DOM yang akan dirender. svelte:element sangat berguna di sini. Seperti pada latihan sebelumnya, kita dapat mengganti urutan panjang blok if dengan satu elemen dinamis: <br>

Nilai ini dapat berupa string apa pun. jika nilai yang dipilih tidak masuk kedalam tag html, maka tidak ada elemen yang dirender.

<blockquote>
	check contohnya disini:
	<a href="https://svelte.dev/repl/9ea35778dd17493ca8537bfe4b187019?version=4.2.8" target="_blank">svelte:element</a>
</blockquote>

```svelte
<!-- @filename: App.svelte -->
<script>
	const options = ['h1', 'h2', 'h3', 'p', 'marquee'];
	let selected = options[0];
</script>

<select bind:value={selected}>
	{#each options as option}
		<option value={option}>{option}</option>
	{/each}
</select>

<svelte:element this={selected}>
	I'm a <code>&lt;{selected}&gt;</code> element
</svelte:element>
```

## svelte:window && bindings svelte:window

Kita dapat menambahkan event listener ke elemen DOM mana pun, kita dapat menambahkan event listener ke object window dengan svelte:window.

kita juga dapat menambahkan binding ke svelte:window, berikut ini contohnya:

<blockquote>
	check contohnya disini:
	<a href="https://svelte.dev/repl/07afb90d630b40fe8223770de010240c?version=4.2.8" target="_blank">svelte:window</a>
</blockquote>

Daftar properti yang dapat kita ikat adalah sebagai berikut:

<blockquote>
<ul>
<li>innerWidth</li>
<li>innerHeight</li>
<li>outerWidth</li>
<li>outerHeight</li>
<li>scrollX</li>
<li>scrollY</li>
<li>online  - alias untuk window.navigator.onLine</li>
</ul>

Semua kecuali scrollX dan scrollY adalah readonly.

</blockquote>

```svelte
<!-- @filename: svelte:window && bindings svelte:window -->
<script>
	let key;
	let keyCode;
	let innerWidth, innerHeight, scrollY;

	function handleKeydown(event) {
		key = event.key;
		keyCode = event.keyCode;
	}
</script>

<svelte:window on:keydown={handleKeydown} bind:innerWidth bind:innerHeight bind:scrollY />

<div style="height: 5000px">
	<div>w: {innerWidth}</div>
	<div>h: {innerHeight}</div>
	<div style="position:fixed; bottom: 10px;">scroll: {scrollY}</div>

	<div style="text-align: center">
		{#if key}
			<kbd>{key === ' ' ? 'Space' : key}</kbd>
			<p>{keyCode}</p>
		{:else}
			<p>Focus this window and press any key</p>
		{/if}
	</div>
</div>

<style>
	kbd {
		border-radius: 4px;
		font-size: 6em;
		padding: 0.2em 0.5em;
		background-color: #eeeeee;
		border-top: 5px solid #f9f9f9;
		border-left: 5px solid #f9f9f9;
		border-right: 5px solid #aaaaaa;
		border-bottom: 5px solid #aaaaaa;
		color: #555;
	}
</style>
```

## svelte:body

Mirip dengan svelte:window, elemen svelte:body memungkinkan kita untuk mendengarkan event yang terjadi pada document.body. Hal ini berguna untuk event mouseenter dan mouseleave, yang tidak dijalankan pada window.

Tambahkan penangan mouseenter dan mouseleave ini ke tag svelte:body dan arahkan kursor ke body.

<blockquote>
	check contohnya disini:
	<a href="https://svelte.dev/repl/485da56a12a24d15828331875408a8fe?version=4.2.8" target="_blank">svelte:body</a>
</blockquote>

```svelte
<!-- @filename: App.svelte -->
<script>
	let hereKitty = false;
</script>

<svelte:body on:mouseenter={() => (hereKitty = true)} on:mouseleave={() => (hereKitty = false)} />

<img
	class:curious={hereKitty}
	alt="Kitten wants to know what's going on"
	src="https://freepngimg.com/thumb/categories/96.png"
/>

<style>
	img {
		position: absolute;
		left: 0;
		bottom: -60px;
		transform: translate(-100%, 0) rotate(-15deg);
		transform-origin: 100% 100%;
		transition: transform 0.4s;
	}

	.curious {
		transform: translate(15%, 0) rotate(0deg);
	}

	:global(body) {
		overflow: hidden;
	}
</style>
```
