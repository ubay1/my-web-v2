<script lang="ts">
	import List from '$lib/components/organisms/blog/List.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const getFormattedTag = () =>
		data.tag.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
</script>

<div class="max-w-4xl m-auto bg-white dark:bg-githubDark-1 pb-4">
	<div class="text-xl font-bold p-4 dark:text-white">
		Tag: <span class="border-b-2 dark:border-white">
			{getFormattedTag()}
		</span>
	</div>

	{#if data.posts.length}
		{#each data.posts as post}
			<List
				slug={post?.path ?? ''}
				title={post.meta.title}
				description={post.meta.description}
				date={post.meta.date}
				tags={post.meta.tags}
			/>
		{/each}
	{:else}
		<p>No posts tagged with {getFormattedTag()}</p>
	{/if}
</div>
