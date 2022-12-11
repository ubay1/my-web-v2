<script>
	// @ts-nocheck
	import List from '$lib/components/organisms/blog/List.svelte';

	export let data;
</script>

<div class="max-w-4xl m-auto">
	{#each data.posts as item}
		<List
			slug={item.path}
			title={item.meta.title}
			description={item.meta.description}
			date={item.meta.date}
			tags={item.meta.tags}
		/>
	{/each}
</div>

<style></style>
