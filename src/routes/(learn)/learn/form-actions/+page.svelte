<script lang="ts">
	import type { PageData, ActionData } from './$types';

	export let form: ActionData;
	export let data: PageData;
</script>

<div class="p-4 text-white">
	<form method="post" action="?/test" class="max-w-xl m-auto flex flex-col gap-4">
		<div class="text-4xl font-bold">Test Form Actions</div>
		<input type="text" name="username" id="username" placeholder="username" class="form-input" />
		<input
			type="password"
			name="password"
			id="password"
			placeholder="password"
			class="form-input"
		/>
		<button class="btn-primary py-3">Kirim</button>

		{#if form}
			{form?.formdata.username}
			{form?.formdata.password}
		{/if}
	</form>
</div>

<style></style>
