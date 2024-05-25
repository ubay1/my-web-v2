---
title: Svelte Advance - advance bindings (Contenteditable, Dimensions, bind:this, Component Bindings)
description:
imagePath: https://miro.medium.com/v2/resize:fit:1400/1*G9fzmaoymDGy7scbkgpC7A.png
imageAlt: svelte
viewTransitionName: 'svelte-advance-bind'
date: 2023-10-04 19:00
tags:
  - svelte
---

## Contenteditable

Elemen dengan atribut <kbd>Contenteditable</kbd> mendukung binding textContent dan innerHTML.

```svelte title="Contenteditable"
<script>
	let html = 'Write some text';
</script>

<div bind:innerHTML={html} contenteditable />

<pre>{html}</pre>

<style>
	[contenteditable]:hover {
		cursor: pointer;
	}
	[contenteditable]:focus {
		padding: 0.5em;
		border: 1px solid #eee;
		border-radius: 4px;
	}
</style>
```

## Dimensions

Setiap elemen tingkat blok memiliki binding clientWidth, clientHeight, offsetWidth, dan offsetHeight.

```svelte
<script>
	let w;
	let h;
	let size = 42;
	let text = 'edit this text';
</script>

<label>
	<input type="range" bind:value={size} min="10" max="100" />
	font size ({size}px)
</label>

<div bind:clientWidth={w} bind:clientHeight={h}>
	<span style="font-size: {size}px" contenteditable>{text}</span>
	<span class="size">{w} x {h}px</span>
</div>

<style>
	div {
		position: relative;
		display: inline-block;
		padding: 0.5rem;
		background: hsla(15, 100%, 50%, 0.1);
		border: 1px solid hsl(15, 100%, 50%);
	}

	.size {
		position: absolute;
		right: -1px;
		bottom: -1.4em;
		line-height: 1;
		background: hsl(15, 100%, 50%);
		color: white;
		padding: 0.2em 0.5em;
		white-space: pre;
	}
</style>
```

<blockquote>
	check contohnya disini:
	<a href="https://svelte.dev/repl/d4963b75bfd44f9a93af6caba5b0b522?version=4.2.8" target="_blank">
		bind dimensions
	</a>
</blockquote>

## bind:this

<kbd>bind:this</kbd> memungkinkan untuk mengakses node DOM secara langsung dari dalam Svelte.

<blockquote>
Jika terbiasa dengan Vue atau React, bind:this mirip dengan Refs.
</blockquote>

Sebagai contoh, katakanlah kita memiliki sebuah kolom input dengan beberapa data sebagai nilai default. Kita ingin pengguna dapat mengklik sebuah tombol untuk menyalin isi dari field tersebut.

Untuk dapat mengakses dan memanipulasi input, kita memerlukan referensi untuk itu. <kbd>bind:this</kbd> akan memberikan kita referensi tersebut.

```svelte title="bind:this"
<script>
	let inputRef;

	async function copyLink() {
		inputRef.select();
		await navigator.clipboard.writeText(inputRef.value);
	}
</script>

<!-- get the reference with "this" and store it in "inputRef" -->
<input bind:this={inputRef} value="https://www.koderhq.com" />
<button on:click={copyLink}>Copy</button>
```

<blockquote>
	check contohnya disini:
	<a href="https://svelte.dev/repl/c4db9246720146ab8acae3dac395f175?version=4.2.8" target="_blank">
		bind:this
	</a>
</blockquote>

```svelte title="bind:this dengan bind:value"
<script>
	import { tick, onMount } from 'svelte';

	let isShow = false;
	let inputEl;
	let value = 'hello';

	async function toggle() {
		isShow = !isShow;
		await tick();
		inputEl && inputEl.focus();
	}
</script>

<button on:click={toggle}>Edit!</button>
{#if isShow}
	<input bind:this={inputEl} bind:value />
	{value}
{/if}
```

<blockquote>
	check contohnya disini:
	<a href="https://svelte.dev/repl/a01535b02b49447dbf18c617893173af?version=4.2.8" target="_blank">
		bind:this dengan bind:value
	</a>
</blockquote>

## Component Bindings

dari kode dibawah ini kita melakukan binding pada props child.
ketika user klik button yang tersedia, nilai tersebut disimpan di state <kbd>export let value;</kbd> dimana props tersebut yang akan dibinding di komponen parent <kbd>`Keypad bind:value={pin}`</kbd> dan nilainya disimpan di state pin.

```svelte title="App.svelte"
<script>
	import Keypad from './Keypad.svelte';

	let pin;
	$: view = pin ? pin.replace(/\d(?!$)/g, '•') : 'enter your pin';

	function handleSubmit() {
		alert(`submitted ${pin}`);
	}

	function test(e) {
		console.log(e);
	}
</script>

<h1 style="opacity: {pin ? 1 : 0.2}">
	{view}
</h1>

<Keypad bind:value={pin} on:submit={handleSubmit} />
```

```svelte title="Keypad.value"
<script>
	import { createEventDispatcher } from 'svelte';

	export let value = '';

	const dispatch = createEventDispatcher();

	const select = (num) => () => (value += num);
	const clear = () => (value = '');
	const submit = () => dispatch('submit');
</script>

<div class="keypad">
	<button on:click={select(1)}>1</button>
	<button on:click={select(2)}>2</button>
	<button on:click={select(3)}>3</button>
	<button on:click={select(4)}>4</button>
	<button on:click={select(5)}>5</button>
	<button on:click={select(6)}>6</button>
	<button on:click={select(7)}>7</button>
	<button on:click={select(8)}>8</button>
	<button on:click={select(9)}>9</button>

	<button disabled={!value} on:click={clear}>clear</button>
	<button on:click={select(0)}>0</button>
	<button disabled={!value} on:click={submit}>submit</button>
</div>

<style>
	.keypad {
		display: grid;
		grid-template-columns: repeat(3, 5em);
		grid-template-rows: repeat(4, 3em);
		grid-gap: 0.5em;
	}

	button {
		margin: 0;
	}
</style>
```

<blockquote>
	check contohnya disini:
	<a href="https://svelte.dev/repl/9bcac1904af1441a86e25d1a67dba3f1?version=4.2.8" target="_blank"> Component Bindings </a>
</blockquote>
