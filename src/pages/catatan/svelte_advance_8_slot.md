---
layout: ../../layouts/MarkdownLayout.astro
title: Svelte Advance - slot, name slot, fallback slot, slot props (let:)
description:
imagePath: https://miro.medium.com/v2/resize:fit:1400/1*G9fzmaoymDGy7scbkgpC7A.png
imageAlt: svelte
viewTransitionName: 'svelte-slot'
date: 2023-10-11 09:00
icon: 'devicon:svelte'
tags:
  - svelte
---

## slot

seperti halnya elemen yang dapat memiliki anak.

begitu juga dengan komponen. Namun, sebelum sebuah komponen dapat menerima anak, komponen harus tahu di mana harus meletakkannya. Kita melakukan ini dengan elemen <kbd>slot</kbd>.

```svelte
<!-- @filename: App.svelte -->
<script>
	import Card from './Card.svelte';
</script>

<Card>
	<span>Patrick BATEMAN</span>
	<span>Vice President</span>
</Card>
```

```svelte
<!-- @filename: Card.svelte -->
<script>
</script>

<div>
	<slot />
</div>
```

## slot name

```svelte
<!-- @filename: App.svelte -->
<script>
	import Card from './Card.svelte';
</script>

<main>
	<Card>
		<span>Patrick BATEMAN</span>
		<span>Vice President</span>

		<span slot="telephone">212 555 6342</span>

		<span slot="company">
			Pierce &amp; Pierce
			<small>Mergers and Aquisitions</small>
		</span>

		<span slot="address"
			>358 Exchange Place, New York, N.Y. 100099 fax 212 555 6390 telex 10 4534</span
		>
	</Card>
</main>
```

```svelte
<!-- @filename: Card.svelte -->
<div>
	<header>
		<slot name="telephone" />
		<slot name="company" />
	</header>

	<slot />

	<footer>
		<slot name="address" />
	</footer>
</div>
```

## slot fallback

Sebuah komponen dapat menentukan fallback untuk setiap slot yang kosong, dengan meletakkan konten di dalam elemen slot:

```svelte
<!-- @filename: Card.svelte" {3,7,12,17 -->
<div class="card">
	<header>
		<slot name="telephone">
			<i>telephone</i>
		</slot>

		<slot name="company">
			<i>company name</i>
		</slot>
	</header>

	<slot>
		<i>name</i>
	</slot>

	<footer>
		<slot name="address">
			<i>address</i>
		</slot>
	</footer>
</div>
```

## slot props

Slot dapat memberikan nilai kembali ke induk menggunakan props. Induk mengekspos nilai ke template slot menggunakan <kbd>let:</kbd>

Aturan singkatan yang biasa berlaku:

```svelte
let:item setara dengan let:item={data}
bisa juga let:data atau lainnya sesuka hati
<slot {item}> setara dengan <slot item={item}>
```

lihat kode dibawah ini:

```svelte
<!-- @filename: App.svelte  -->
<script>
	import FancyList from './FancyList.svelte'; // [!code highlight]

	const items = [
		{ label: 'a', value: 'a1' },
		{ label: 'b', value: 'b2' }
	];
</script>

<FancyList {items}>
	<div slot="item" let:item={data}>{data.label}-{data.value}</div>
	<p slot="footer">Copyright (c) 2019 Svelte Industries</p>
</FancyList>
```

```svelte
<!-- @filename: FancyList.svelte -->
<script>
	export let items;
</script>

<ul>
	{#each items as item}
		<li class="fancy">
			<slot name="item" {item} />
		</li>
	{/each}
</ul>

<slot name="footer" />
```

pada nomor 10, kita mengirim data props items ke komponen FancyList,
di komponen FancyList data props items tersebut di loop dan mengembalikan data lagi ke komponen induk.

pada nomor 11, kita menerima data dan kita tampung di let:item, item ini bebas yah mau kita beri nama apa aja. jangan lupa untuk menambahkan tag name slot. jika kita tidak ingin menggunakan name slot bisa saja. lihat contoh dibawah ini.

berikut ini contoh tanpa name slot. <kbd>let:</kbd> nya diletakan dikomponen FancyList

```svelte showLineNumbers title="App.svelte" {9,10}
<script>
	import FancyList from './FancyList.svelte';

	const items = [
		{ label: 'a', value: 'a1' },
		{ label: 'b', value: 'b2' }
	];
</script>

<FancyList {items} let:item={data}>
	<div>{data.label}-{data.value}</div>
	<p slot="footer">Copyright (c) 2019 Svelte Industries</p>
</FancyList>
```

```svelte
<!-- @filename: FancyList.svelte -->
<script>
	export let items;
</script>

<ul>
	{#each items as item}
		<li class="fancy">
			<slot {item} />
		</li>
	{/each}
</ul>

<slot name="footer" />
```

<blockquote>
	check contohnya disini:
	<a href="https://svelte.dev/repl/144a82b5947543f0aa8030bbc8e3cec3?version=4.2.8" target="_blank">slot props (let:)</a>
</blockquote>
