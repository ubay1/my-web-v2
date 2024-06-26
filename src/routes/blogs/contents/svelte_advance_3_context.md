---
title: Svelte Advance - Context
description:
imagePath: https://miro.medium.com/v2/resize:fit:1400/1*G9fzmaoymDGy7scbkgpC7A.png
imageAlt: svelte
viewTransitionName: 'svelte-context'
date: 2023-10-06 07:00
icon: 'devicon:svelte'
tags:
  - svelte
---

context API memberi kita cara untuk meneruskan data ke bawah melalui komponen tanpa melalui setiap tingkat dengan props (prop drilling). API ini dapat digunakan sebagai solusi manajemen state yang sederhana.

<blockquote>
context api ini mirip sekali dengan react useContext nya. namun di svelte lebih simple.
</blockquote>

berikut ini contoh penggunaan Context API dengan stores.

```ts
// @filename: ~/stores/user.ts
// @noErrors
import { browser, dev } from '$app/environment';
import { writable } from 'svelte/store';

const defaultValue = 'data not found';
const initialValue = browser ? localStorage.getItem('user') ?? null : defaultValue;

const user = writable(initialValue);

export default user;
```

```svelte title="+layout.svelte"
<script>
	import { setContext } from 'svelte';
	import user from '~/stores/user';

	setContext('dataUser', $user);
</script>

<slot />
```

```svelte title="+page.svelte"
<script>
	import { getContext, onMount } from 'svelte';

	let dataUser = getContext('dataUser');
	let parseDataUser = [];
	onMount(() => {
		if (dataUser !== null) {
			console.log([JSON.parse(dataUser).data.user]);
			parseDataUser = [JSON.parse(dataUser).data.user];
		}
	});
</script>

{#if parseDataUser.length > 0}
	{#each parseDataUser as valueParseDataUser}
		<p>{valueParseDataUser.name}</p>
	{/each}
{:else}
	<p>Not found</p>
{/if}
```
