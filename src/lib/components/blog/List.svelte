<script lang="ts">
	import { formatDate } from '$lib/utils/format';
	import Icon from '@iconify/svelte';

	export let slug: string;
	export let title: string;
	export let description: string;
	export let date: string;
	export let tags: string[];
	export let viewTransitionName: string | undefined;
	export let icon: string;
</script>

<div
	data-sveltekit-preload-data
	class="break-inside-avoid cursor-pointer relative px-0 border border-solid border-gray-3 rounded-lg hover:bg-gray-7 hover:bg-opacity-8 dark:hover:bg-gray-2 dark:hover:bg-opacity-8 dark:border-gray-6"
>
	<div class="px-4 pt-2">
		<!-- <span class="px-1 pt-1 bg-gray-900 border-1 border-solid border-gray-800 rounded-md"> -->
		<Icon {icon} />
		<!-- </span> -->
	</div>

	<a class="cursor-pointer decoration-none" href={slug}>
		<div class="px-4 py-2 relative">
			<div
				class="text-black mb-0 block text-xl leading-tight font-semibold dark:text-white"
				style:--tag="h-{viewTransitionName}"
			>
				{title}
			</div>
			<div class="text-xs text-black mt-0 dark:text-white">{formatDate(date)}</div>
			<div
				class="mt-2 text-black text-base line-clamp-2 dark:text-white {!description
					? 'hidden'
					: ''}"
			>
				{description}
			</div>
			<div class="pt-4 line-clamp-2">
				{#if tags && tags.length > 0}
					{#each tags as tag (tag)}
						<div
							class="inline-block mr-2 tracking-wide text-xs text-black font-semibold bg-githubDark-1 rounded-md p-1 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-gray-6"
						>
							<a href="/blogs/tags/{tag}" class="decoration-none text-white">
								#{tag}
							</a>
						</div>
					{/each}
				{/if}
			</div>
		</div>
	</a>

	<!-- <hr class="border-b-0 border-gray-3 dark:border-gray-6 mb-0" /> -->
</div>

<style>
</style>
