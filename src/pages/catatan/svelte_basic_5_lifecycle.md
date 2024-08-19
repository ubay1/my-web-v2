---
layout: ../../layouts/MarkdownLayout.astro
title: Svelte Basic - (Lifecycle)
description:
imagePath: https://miro.medium.com/v2/resize:fit:1400/1*G9fzmaoymDGy7scbkgpC7A.png
imageAlt: svelte
viewTransitionName: 'svelte-lifecycle'
date: 2023-10-02 09:00
icon: 'devicon:svelte'
tags:
  - svelte
---

## beforeMount, onMount, onDestroy

<kbd> onMount </kbd> ditembakkan setelah komponen dirender. <br />

dari kode dibawah ini, akan mencetak: <br />
Hello <br />
Hello there

```svelte
<!-- @filename: beforeMount, onMount, onDestroy -->
<script>
	import { onMount, onDestroy } from 'svelte';

	let ref_wrapper;

	// before mount
	let msg = 'Hello';
	console.log(msg);

	// mounted
	onMount(() => {
		msg = 'Hello there';
		console.log(msg);

		setTimeout(() => {
			ref_wrapper.classList.remove('show');
		}, 3000);

		// cara 1 - destroy
		return () => {
			clearTimeout(ref_wrapper);
		};
	});

	// cara 2 - destroy
	onDestroy(() => {
		clearTimeout(ref_wrapper);
	});
</script>

<div bind:this={ref_wrapper}>hello</div>
```

## beforeUpdate & afterUpdate

kode dibawah ketika kita klik button, maka akan menanmpilkan log seperti ini. <br/>

<blockquote>
"the component is going to be updated = 1 " -> kode ini jalan sebelum nilai counter update<br/>
"the component has been updated = 2 " -> kode ini jalan setelah nilai counter update <br/>
</blockquote>

```svelte
<!-- @filename: beforeUpdate & afterUpdate -->
<script>
	import { beforeUpdate, afterUpdate } from 'svelte';

	let counter = 0;

	beforeUpdate(() => {
		if (counter > 0) {
			console.log('the component is going to be updated = ', counter);
			counter++;
		}
	});

	afterUpdate(() => {
		if (counter > 0) {
			console.log('the component has been updated = ', counter);
		}
	});
</script>

<h1>{counter}</h1>
<button on:click={() => counter++}>Click me</button>
```

## tick

berbeda dari metode lifecycle lainnya. Metode ini dapat dipanggil kapan saja dan di mana saja setelah komponen dipasang.

Jika satu pembaruan sedang berjalan dan belum selesai, metode <kbd>tick</kbd> membantu mengontrol atau menjeda pembaruan lain yang akan datang hingga pembaruan saat ini selesai. Metode ini mengembalikan promise yang akan diselesaikan segera setelah perubahan state yang tertunda diterapkan ke DOM.

tick() ini mirip seperti <kbd> `setTimeout(() => {}, 0)` </kbd>

```svelte
<!-- @filename: tick() -->
<script>
	import { tick } from 'svelte';

	let countTick = 0;
	$: doubCountTick = countTick * 2;

	async function incTick() {
		countTick++;
		console.log('before click : ', doubCountTick);
		await tick();
		console.log('after click : ', doubCountTick);
	}
</script>

<p>{countTick}</p>
<button on:click={incTick}> + 1 </button>
```
