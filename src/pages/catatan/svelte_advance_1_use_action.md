---
layout: ../../layouts/MarkdownLayout.astro
title: Svelte Advance - use actions
description:
imagePath: https://miro.medium.com/v2/resize:fit:1400/1*G9fzmaoymDGy7scbkgpC7A.png
imageAlt: svelte
viewTransitionName: 'svelte-actions'
date: 2023-10-04 09:00
icon: 'devicon:svelte'
tags:
  - svelte
---

## Mounted & Destroy Component

list DOM element <br />
https://www.w3schools.com/jsref/dom_obj_all.asp <br /><br />

fungsi destroy akan berjalan ketika browser menghapus element.

```svelte
<script lang="ts">
	function greet(element: HTMLElement) {
		// mounted
		console.log('hi');

		// menambahkan animasi pada element
		element.animate(
			[{ transform: 'rotate(0) scale(1)' }, { transform: 'rotate(360deg) scale(0)' }],
			{
				duration: 300,
				fill: 'forwards'
			}
		);

		return {
			destroy: () => {
				console.log('bye');
			}
		};
	}

	let show = false;
</script>

<input bind:checked={show} type="checkbox" />

{#if show}
	<div use:greet>Action</div>
{/if}
```

## Passing parameter di actions

```svelte title="use:actions dengan 1 parameter"
<script>
	function greet(element, param) {
		// mounted
		console.log('hi');
		console.log('params = ', param);

		// menambahkan animasi pada element
		element.animate(
			[{ transform: 'rotate(0) scale(1)' }, { transform: 'rotate(360deg) scale(0)' }],
			{
				duration: 300,
				fill: 'forwards'
			}
		);

		return {
			destroy: () => {
				console.log('bye');
			}
		};
	}

	let show = false;
</script>

<input bind:checked={show} type="checkbox" />

{#if show}
	<div use:greet={'Ubay'}>Action</div>
{/if}
```

```svelte title="use:actions dengan multiple parameter"
<script>
	function greet(element, param) {
		// mounted
		console.log('hi');
		console.log('params = ', param[0]);

		// menambahkan animasi pada element
		element.animate(
			[{ transform: 'rotate(0) scale(1)' }, { transform: 'rotate(360deg) scale(0)' }],
			{
				duration: 300,
				fill: 'forwards'
			}
		);

		return {
			destroy: () => {
				console.log('bye');
			}
		};
	}

	let show = false;
</script>

<input bind:checked={show} type="checkbox" />

{#if show}
	<div use:greet={['Ubay', 'dillah']}>Action</div>
{/if}
```

```svelte title="use:actions dengan parameter object"
<script>
	function greet(element, param) {
		// mounted
		console.log('hi');
		console.log('params = ', param.firstname);

		// menambahkan animasi pada element
		element.animate(
			[{ transform: 'rotate(0) scale(1)' }, { transform: 'rotate(360deg) scale(0)' }],
			{
				duration: 300,
				fill: 'forwards'
			}
		);

		return {
			destroy: () => {
				console.log('bye');
			}
		};
	}

	let show = false;
</script>

<input bind:checked={show} type="checkbox" />

{#if show}
	<div use:greet={{ firstname: 'Ubay', lastname: 'dillah' }}>Action</div>
{/if}
```

## update di actions

Selain metode <kbd>destroy</kbd>, actions juga dapat mengembalikan metode <kbd>update</kbd> yang berjalan setiap kali parameternya berubah. Sebagai ilustrasi, berikut ini adalah kode sederhana di mana komputer memilih angka acak yang merupakan kelipatan lima, dan pemain harus menebak angka tersebut.

```svelte title="update"
<script>
	let number = null;
	let randomSign = Math.random() < 0.5 ? -1 : 1;
	let guess = Math.floor(Math.random() * 10) * 5 * randomSign;
	let message = `Guess the number the computer is thinking...
It is a multiple of 5 :-)`;

	function evaluate(node, { number, guess }) {
		return {
			update: ({ number, guess }) => {
				number > guess ? (message = 'Lower!') : (message = 'Higher!');
				number === guess ? (message = 'You guessed it!') : '';
			}
		};
	}
</script>

{message}
<h1 use:evaluate={{ number, guess }}>
	{number}
</h1>
<button on:click={() => (number = number + 5)}>Increase by 5</button>
<button on:click={() => (number = number - 5)}>Reduce by 5</button>
```
