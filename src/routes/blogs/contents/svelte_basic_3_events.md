---
title: Svelte Basic - (Events)
description:
imagePath: https://miro.medium.com/v2/resize:fit:1400/1*G9fzmaoymDGy7scbkgpC7A.png
imageAlt: svelte
date: 2023-10-01 12:00
tags:
  - svelte
---

## DOM Events

event element dengan menggunakan `on:` <br/>

kode dibawah ini akan melakukan event DOM saat mouse digerakan di dalam kotak merah.

```svelte title="DOM Events"
<script lang="ts">
	let m = { x: 0, y: 0 };

	function handleMove(event) {
		m.x = event.clientX;
		m.y = event.clientY;
	}
</script>

<div on:pointermove={handleMove}>
	The pointer is at {m.x} x {m.y}
</div>

<style>
	div {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: red;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
```

## Event Modifiers

1. preventDefault <br/>
   <kbd>preventDefault</kbd> untuk mencegah perilaku default dari browser, seperti mencegah formulir dikirim, dan mencegah browser untuk melakukan drag & drop

   ```svelte title="Event Modifier - preventDefault"
   <script>
   	function onClick(event) {}
   </script>

   <button on:click|preventDefault={onClick} />
   ```

2. stopPropagation <br/>
   <kbd>stopPropagation</kbd> membantu kita untuk berhenti menjangkau event ke elemen berikutnya.
   jika stopPropagation dihapus, ketika klik inner div maka outer div juga ikut terender

   ```svelte title="Event Modifier - stopPropagation"
   <button on:click={() => console.log('Outer div')}>
   	<h1>Outer div</h1>
   	<button on:click|stopPropagation={() => console.log('inner div')}>
   		<h1>Inner div</h1>
   	</button>
   </button>
   ```

3. once <br/>
   <kbd> once </kbd> membantu kita untuk memicu event hanya satu kali.

   ```svelte title="Event Modifier - once"
   <script>
   	function handleClick() {
   		alert('You can see me once');
   	}
   </script>

   <button on:click|once={handlerClick}>Click me</button>
   ```

<div class="my-4 ml-2">
	<a href="https://svelte.dev/repl/92789639db1c434a93b79bfe0bd5f37b?version=4.2.8" target="_blank" class="text-orange-4 px-2 py-1 rounded-md">
	untuk contoh lainnya bisa lihat disini.
	</a>
</div>

## Component Event

mengirim event dari komponen child ke parent.

```svelte title="Component.svelte - child"
<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function sayHello() {
		dispatch('message', {
			text: 'Hello!'
		});
	}
</script>

<button on:click={sayHello}> Test </button>
```

```svelte title="App.svelte - parent"
<script>
	import ComponentEvent from './lib/ComponentEvent.svelte';

	function getDataFromParent(e) {
		console.log(e);
		alert(e.detail.text);
	}
</script>

<ComponentEvent on:message={getDataFromParent} />
```
