<script>
	// @ts-nocheck
	import { createEventDispatcher } from 'svelte';
	import { page } from '$app/stores';
	import { listTab } from '$lib/utils/constants';
	import { goto } from '$app/navigation';
	const dispatch = createEventDispatcher();

	export let showAnotherMenu = false;
	let tabActive = 1;

	function closeSidebar() {
		dispatch('close_sidebar', true);
	}
	function changePage(id, url) {
		tabActive = id;
		goto(url);
		dispatch('close_sidebar', true);
	}
</script>

<div
	class="bg-black opacity-60 w-full h-full fixed z-100 top-0 <md:hidden {showAnotherMenu
		? 'block'
		: 'hidden'}"
/>
<div
	aria-label="btn-icon-menu"
	class="bg-white top-0 w-full h-full fixed z-100 ease-in duration-150 dark:bg-githubDark-1 {showAnotherMenu
		? 'translate-x-0'
		: '-translate-x-full'}"
>
	<button
		aria-label="btn-close-menu"
		class="fixed cursor-pointer right-4 top-4 rounded-md flex justify-center items-center h-8 w-8 border-none bg-red-5"
		on:click={closeSidebar}
	>
		<div class="i-octicon-x-16 text-xl text-white" />
	</button>
	{#if showAnotherMenu}
		<div data-sveltekit-preload-data class="mt-20">
			{#each listTab as tab}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<a
					class="text-black flex items-center gap-1 p-4 cursor-pointer w-full hover:bg-gray-7 hover:bg-opacity-8 decoration-none dark:hover:bg-gray-2 dark:hover:bg-opacity-8 dark:text-githubDark-2 {tab.url ===
					$page.url.pathname
						? 'font-semibold border-b-2 border-orange-5'
						: ''}"
					href={tab.url}
					on:click|preventDefault={() => changePage(tab.id, tab.url)}
				>
					<div class="mr-1 text-lg {tab.icon}" />
					<div>{tab.label}</div>
				</a>
			{/each}
		</div>
	{/if}
</div>
