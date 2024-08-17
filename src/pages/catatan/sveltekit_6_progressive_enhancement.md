---
title: Sveltekit -  progressive enhancement (use:enhance)
description:
imagePath: https://miro.medium.com/v2/resize:fit:1400/1*G9fzmaoymDGy7scbkgpC7A.png
imageAlt: svelte
viewTransitionName: 'sveltekit-enhancement'
date: 2023-08-17 08:00
icon: 'devicon:svelte'
tags:
  - sveltekit
---

Pada bagian sebelumnya, kita telah membuat aksi /login yang bekerja tanpa JavaScript sisi klien - tidak ada fetch yang terlihat. Itu bagus, tetapi ketika JavaScript tersedia, kita dapat meningkatkan interaksi formulir secara progresif untuk memberikan pengalaman pengguna yang lebih baik.

## use:enhance

biasanya kita jika bermain dengan form kita selalu menggunakan <b>e.preventDefault()</b>.
dengan <b>use:enhance</b> semua sudah dihandle. dibawah ini saya custom use:enhance dengan menambahkan <b>SubmitFunction</b> agar lebih rapih dan nyaman digunakan :

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
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { ActionData } from './$types';

	export let form: ActionData;

	const submitTest: SubmitFunction = ({
		formElement,
		formData,
		action,
		cancel,
		submitter,
		controller
	}) => {
		/**
		 * `formElement` is this `<form>` element
		 * `formData` is its `FormData` object that's about to be submitted
		 * `action` is the URL to which the form is posted
		 *  calling `cancel()` will prevent the submission
		 * `submitter` is the `HTMLElement` that caused the form to be submitted
		 */

		// destruct data yang disubmit
		const { username } = Object.fromEntries(formData);

		// jika username bukan 'aa', maka batalkan form.
		if (username !== 'aa') {
			alert('gagal');
			cancel();
		}
		return async ({ result, update, formData }) => {
			// `result` is an `ActionResult` object
			// `update` is a function which triggers
			// the default logic that would be triggered if this callback wasn't set
			if (result.type === 'success') {
				alert('sukses');
			}

			// jika data sukses dikirim, lakukan reset form
			await update({ reset: true });
		};
	};
</script>

<form method="post" action="?/test" use:enhance={submitTest}>
	<input type="text" name="username" id="username" placeholder="username" />
	<input type="password" name="password" id="password" placeholder="password" />
	<button type="submit">Kirim</button>

	{#if form}
		{form?.formdata.username}
		{form?.formdata.password}
	{/if}
</form>
```
