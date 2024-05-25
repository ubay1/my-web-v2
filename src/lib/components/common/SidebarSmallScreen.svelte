<script>
	// @ts-nocheck
	import { createEventDispatcher } from 'svelte';
	import { page } from '$app/stores';
	import { listTab } from '$lib/utils/constants';
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import classNames from 'classnames';

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
	class="bg-black opacity-60 w-full h-full fixed z-100 top-0 lt-md:hidden {showAnotherMenu
		? 'block'
		: 'hidden'}"
/>
<!-- style="view-transition-name: header;" -->
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
		<Icon icon="octicon:x-16" class="text-xl text-white" />
	</button>
	{#if showAnotherMenu}
		<!-- <div data-sveltekit-preload-data class="mt-20">
			{#each listTab as tab}
				<a
					class="text-black flex items-center gap-1 p-4 cursor-pointer w-full hover:bg-gray-7 hover:bg-opacity-8 decoration-none dark:hover:bg-gray-2 dark:hover:bg-opacity-8 dark:text-githubDark-2 {tab.url ===
					$page.url.pathname
						? 'font-semibold border-b-2 border-b-solid border-orange-5'
						: ''}"
					href={tab.url}
					on:click|preventDefault={() => changePage(tab.id, tab.url)}
				>
					<Icon icon={tab.icon} class="mr-1 text-lg" />
					<div>{tab.label}</div>
				</a>
			{/each}
		</div> -->

		<ul data-sveltekit-preload-data class="flex flex-col ml-0 p-0 mt-20">
			{#each listTab as tab}
				<li
					aria-current={tab.url.split('/')[1] === $page.url.pathname.split('/')[1]
						? 'page'
						: undefined}
					class={classNames(
						'text-gray-7 flex items-center gap-1 cursor-pointer hover:bg-gray-7 hover:bg-opacity-8  dark:hover:bg-gray-2 dark:hover:bg-opacity-8'
					)}
				>
					<a
						class="p-4 w-fill decoration-none flex dark:text-githubDark-2"
						href={tab.url}
						on:click|preventDefault={() => changePage(tab.id, tab.url)}
					>
						<Icon icon={tab.icon} class="mr-1 text-lg" />
						<div>{tab.label}</div>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	li {
		position: relative;
		height: 100%;
	}
	li[aria-current='page']::before {
		content: '';
		width: calc(100% - 4px);
		height: 0;
		position: absolute;
		bottom: 0;
		left: 0;
		/* border: 6px solid transparent; */
		border: 2px solid #f97316;
		view-transition-name: active-page;
	}
</style>
