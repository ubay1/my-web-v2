<script>
	// @ts-nocheck

	// import LargeHeader from '$lib/components/LargeHeader.svelte'
	export let data;
</script>

<!-- <LargeHeader text="All Tags" /> -->

<ul>
	{#each data.allTags as tag}
		<li>
			<a
				href="/blog/tags/{tag}"
				class="uppercase tracking-wide text-sm text-indigo-500 dark:text-sky-300 font-semibold"
			>
				{tag}
			</a>
		</li>
	{/each}
</ul>
