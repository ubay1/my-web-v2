<script lang="ts">
	import type { PageData } from './$types';
	import List from '$lib/components/blog/List.svelte';

	export let data: PageData;
</script>

<div class="gap-4 space-y-4 p-2 columns-4 lt-xl:columns-3 lt-lg:columns-2 lt-md:columns-1">
	{#each data.posts as item}
		<List
			slug={item?.path ?? ''}
			title={item.meta.title}
			description={item.meta.description}
			date={item.meta.date}
			tags={item.meta.tags}
			viewTransitionName={item.meta.viewTransitionName ?? undefined}
		/>
	{/each}
</div>

<style></style>
