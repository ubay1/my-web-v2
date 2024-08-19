---
layout: ../../layouts/MarkdownLayout.astro
title: Svelte Basic - (Bindings)
description:
imagePath: https://miro.medium.com/v2/resize:fit:1400/1*G9fzmaoymDGy7scbkgpC7A.png
imageAlt: svelte
viewTransitionName: 'svelte-bind'
date: 2023-10-02 07:00
icon: 'devicon:svelte'
tags:
  - svelte
---

## bind:value

```svelte
<!-- @filename: bind:value - Text Inputs/Textarea Inputs -->
<script>
	let name = 'world';
</script>

<input bind:value={name} />

<h1>Hello {name}!</h1>
```

```svelte
<!-- @filename: bind:value - Numeric Inputs -->
<script>
	let a = 1;
	let b = 2;
</script>

<label>
	<input type="number" bind:value={a} min="0" max="10" />
	<input type="range" bind:value={a} min="0" max="10" />
</label>

<label>
	<input type="number" bind:value={b} min="0" max="10" />
	<input type="range" bind:value={b} min="0" max="10" />
</label>

<p>{a} + {b} = {a + b}</p>
```

```svelte
<!-- @filename: bind:value - Select -->
<script>
	let questions = [
		{ id: 1, text: `kamu sekolah dimana ?` },
		{ id: 2, text: `siapa nama ibumu ?` },
		{ id: 3, text: `nama kucing peliharaanmu?` }
	];

	let selected;

	let answer = '';

	function handleSubmit() {
		alert(`answered question ${selected.id} (${selected.text}) with "${answer}"`);
	}
</script>

<h2>Insecurity questions</h2>

<form on:submit|preventDefault={handleSubmit}>
	<select bind:value={selected} on:change={() => (answer = '')}>
		{#each questions as question}
			<option value={question}>
				{question.text}
			</option>
		{/each}
	</select>

	<input bind:value={answer} />

	<button disabled={!answer} type="submit"> Submit </button>
</form>

<p>
	selected question {selected ? selected.id : '[waiting...]'}
</p>
```

## bind:checked

```svelte
<!-- @filename: checkbox -->
<script>
	let yes = false;
</script>

<label>
	<input type="checkbox" bind:checked={yes} />
	Yes! Send me regular email spam
</label>

{#if yes}
	<p>Thank you. We will bombard your inbox and sell your personal details.</p>
{:else}
	<p>You must opt in to continue. If you're not paying, you're the product.</p>
{/if}

<button disabled={!yes}>Subscribe</button>
```

## bind:group

```svelte
<!-- @filename: radio button -->
<script>
	let tortilla = 'Plain';
</script>

<input type="radio" bind:group={tortilla} value="Plain" />
<input type="radio" bind:group={tortilla} value="Whole wheat" />
<input type="radio" bind:group={tortilla} value="Spinach" />

<div>{tortilla}</div>
```

```svelte
<!-- @filename: checkbox -->
<script>
	let fillings = [];
</script>

<input type="checkbox" bind:group={fillings} value="Rice" />
<input type="checkbox" bind:group={fillings} value="Beans" />
<input type="checkbox" bind:group={fillings} value="Cheese" />
<input type="checkbox" bind:group={fillings} value="Guac (extra)" />

<div>{fillings}</div>
```
