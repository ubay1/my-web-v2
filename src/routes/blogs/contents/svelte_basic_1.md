---
title: Svelte Basic - (dynamic attr, tag @html, reactivity, props)
description:
imagePath: https://i.pinimg.com/originals/d2/e8/34/d2e8346922934ea035cf7c5a8b477ad8.jpg
imageAlt: svelte
date: 2023-10-01 09:00
tags:
  - svelte
---

# #Introduction

## Dynamic Attribute

dynamic attribute menggunakan kurung siku `{}`

```svelte title="dynamic attribute"
<script lang="ts">
	let src: string = '/image.gif';
	let name: string = 'Rick Astley';
</script>

<img {src} alt="{name} dances." />
```

## Tag @html

```svelte title="tag @html"
<script lang="ts">
	let tagHtml: string | null =
		'<div class="text-orange-5 font-bold"> menampilkan tag @html dari string </div>';
</script>

<div>
	{@html tagHtml}
</div>
```

<br/>

# #Reactivity

reactivity menggunakan simbol `$`

```svelte title="reactivity declarations"
<script lang="ts">
	let count: number = 0;

	$: doubled = count * 2;

	function increment() {
		count += 1;
	}
</script>

<button on:click={increment}>
	Clicked {count}
	{count === 1 ? 'time' : 'times'}
</button>

<p>{count} doubled is {doubled}</p>
```

```svelte title="reactivity statement"
<script lang="ts">
	let count: number = 0;

	$: if (count >= 10) {
		alert('count is dangerously high!');
		count = 0;
	}

	function increment() {
		count += 1;
	}
</script>

<button on:click={increment}>
	Clicked {count}
	{count === 1 ? 'time' : 'times'}
</button>
```

<br />

# #Props

## Props parent to child

```svelte title="default props"
<script lang="ts">
	export let answer: string = 'a mystery';
</script>

<p>The answer is {answer}</p>
```

```svelte title="spread props - App.svelte"
<script lang="ts">
	import PackageInfo from './PackageInfo.svelte';

	const pkg = {
		name: 'svelte',
		speed: 'blazing',
		version: 4,
		website: 'https://svelte.dev'
	};
</script>

<PackageInfo {...pkg} />
```

```svelte title="spread props - PackageInfo.svelte"
<script lang="ts">
	export let name, version, speed, website: string;

	$: href = `https://www.npmjs.com/package/${name}`;
</script>

<p>
	The <code>{name}</code> package is {speed} fast. Download version {version} from
	<a {href}>npm</a> and <a href={website}>learn more here</a>
</p>
```

## Props child to parent

```svelte title="App.svelte - parent"
<script lang="ts">
	import Child from './Child.svelte';
	let n;
</script>

<Child bind:n />

<div>Parent = {n}</div>
```

```svelte title="PackageInfo.svelte - child"
<script>
	export let n = 1;
	setInterval(() => n++, 1000);
</script>

<div>Child = {n}</div>
```
