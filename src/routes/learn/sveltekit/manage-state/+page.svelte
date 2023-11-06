<script lang="ts">
	import { getContext } from 'svelte';

	const quote: any = getContext('quotes');
</script>

<div class="text-white px-4">
	<div>Manage State yang benar</div>

	{#each $quote as item}
		{item.quote}
	{/each}
</div>

<style></style>
