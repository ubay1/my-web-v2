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
		const { username } = Object.fromEntries(formData);

		if (username !== 'aa') {
			alert('gagal');
			cancel();
		}
		return async ({ result, update, formData }) => {
			// `result` is an `ActionResult` object
			// `update` is a function which triggers the default logic that would be triggered if this callback wasn't set
			if (result.type === 'success') {
				alert('sukses');
			}

			await update({ reset: true });
		};
	};
</script>

<div class="p-4 text-white">
	<form
		method="post"
		action="?/test"
		use:enhance={submitTest}
		class="max-w-xl m-auto flex flex-col gap-4"
	>
		<div class="text-4xl font-bold">Test Progressive Enhancement</div>
		<input type="text" name="username" id="username" placeholder="username" class="form-input" />
		<input
			type="password"
			name="password"
			id="password"
			placeholder="password"
			class="form-input"
		/>
		<button type="submit" class="btn-primary py-3">Kirim</button>

		{#if form}
			{form?.formdata.username}
			{form?.formdata.password}
		{/if}
	</form>
</div>

<style></style>
