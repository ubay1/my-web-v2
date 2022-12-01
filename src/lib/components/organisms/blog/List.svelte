<script>
	// @ts-nocheck

	import { formatDate } from '$lib/utils/format';
	export let slug, title, description, date;
	export let tags;
	// export let image, imageAlt;
</script>

<svelte:head>
	<!-- <link rel="preload" as="image" href={image} /> -->
</svelte:head>

<div
	data-sveltekit-prefetch
	class="cursor-pointer px-0 hover:bg-gray-7 hover:bg-opacity-8 dark:hover:bg-gray-2 dark:hover:bg-opacity-8 border-b border-gray-3 dark:border-gray-6"
>
	<a class="cursor-pointer decoration-none" href={slug}>
		<div class="p-4 relative">
			<div class="text-black mb-0 block text-xl leading-tight font-semibold dark:text-white">
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
							class="inline-block mr-2 tracking-wide text-xs text-black font-semibold bg-githubDark-1  rounded-md p-1 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-gray-6"
						>
							<a href="/blog/tags/{tag}" class="decoration-none text-white ">
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
