<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div data-sveltekit-preload-data class="list-none p-0 m-4 flex gap-4 flex-wrap">
	{#each data.allTags as tag}
		<a
			href="/blogs/tags/{tag}"
			class="uppercase tracking-wide text-sm font-semibold decoration-none leading-6 dark:text-white dark:bg-slate-700 mb-4 p-2 dark:hover:bg-gray-6"
		>
			#{tag}
		</a>
	{/each}
</div>
