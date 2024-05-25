---
title: Sveltekit -  form actions
description:
imagePath: https://miro.medium.com/v2/resize:fit:1400/1*G9fzmaoymDGy7scbkgpC7A.png
imageAlt: svelte
viewTransitionName: 'sveltekit-actions-form'
date: 2023-08-15 08:00
tags:
  - sveltekit
---

## Default actions

File +page.server.js dapat mengekspor actions, yang memungkinkan kita untuk MEMPOST data ke server
menggunakan elemen form.

Saat menggunakan form, JavaScript sisi klien bersifat <b>opsional</b>, namun kita dapat dengan mudah meningkatkan interaksi formulir kita dengan JavaScript untuk memberikan pengalaman pengguna yang terbaik.

```ts
// @filename: src/routes/+page.server.ts
// @noErrors
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');

		return {
			formdata: {
				username,
				password
			}
		};
	}
};
```

```svelte
<!-- @filename: src/routes/+page.svelte -->
<script lang="ts">
	import type { PageData, ActionData } from './$types';

	export let form: ActionData;
	export let data: PageData;
</script>

<form method="post">
	<input type="text" name="username" id="username" placeholder="username" />
	<input type="password" name="password" id="password" placeholder="password" />
	<button>Kirim</button>

	{#if form}
		{form?.formdata.username}
		{form?.formdata.password}
	{/if}
</form>
```

## Name actions

tidak hanya default, kita juga dapat memberikan nama apapun pada action kita. misal kita ingin memberi nama action kita login, maka pada form kita tambahkan <b>action="?/login"</b>. kita juga dapat memberikan nama action lebih dari 1.

```ts
// @filename: src/routes/+page.server.ts
// @noErrors
import type { Actions } from './$types';

export const actions: Actions = {
	login: async ({ request }) => {
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');

		return {
			formdata: {
				username,
				password
			}
		};
	}
};
```

```svelte
<!-- @filename: src/routes/+page.svelte -->
<script lang="ts">
	import type { PageData, ActionData } from './$types';

	export let form: ActionData;
	export let data: PageData;
</script>

<form method="post" action="?/login">
	<input type="text" name="username" id="username" placeholder="username" />
	<input type="password" name="password" id="password" placeholder="password" />
	<button>Kirim</button>

	{#if form}
		{form?.formdata.username}
		{form?.formdata.password}
	{/if}
</form>
```
