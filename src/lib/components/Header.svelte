<script>
	// @ts-nocheck
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	// import { listTab } from '$lib/utils/constants';
	import SidebarSmallScreen from './SidebarSmallScreen.svelte';

	export let listTab = [
		{ id: 1, label: 'Profil', url: '/', icon: 'i-octicon-person-16' },
		{ id: 2, label: 'Blogs', url: '/blog', icon: 'i-octicon-book-16' },
		{ id: 3, label: 'Projects', url: '/project', icon: 'i-octicon-repo-16' }
	];

	let tabActive = 1;

	$: innerWidth = 1280;

	let showAnotherMenu = false;

	function changeTabActive(tabId) {
		tabActive = tabId;
	}
</script>

<svelte:window bind:innerWidth />

<div
	class="bg-white border-b border-gray-3 dark:bg-githubDark-1 dark:border-gray-7 sticky top-0 z-100"
>
	{#if innerWidth < 360}
		<div class="flex items-center px-3 py-4">
			<button
				class="bg-transparent border-none cursor-pointer"
				on:click={() => (showAnotherMenu = !showAnotherMenu)}
			>
				<div class="i-octicon-three-bars-16 text-2xl dark:text-white" />
			</button>
		</div>
	{:else}
		<div data-sveltekit-prefetch class="flex justify-center items-center">
			{#each listTab as tab}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<a
					class="text-gray-7 flex items-center gap-1 p-4 cursor-pointer hover:bg-gray-7 hover:bg-opacity-8 decoration-none dark:hover:bg-gray-2 dark:hover:bg-opacity-8 dark:text-githubDark-2 {tab.url.split(
						'/'
					)[1] === $page.url.pathname.split('/')[1]
						? 'font-semibold border-b-2 border-orange-5'
						: ''}"
					href={tab.url}
					on:click={() => changeTabActive(tab.id)}
				>
					<div class="mr-1 text-lg {tab.icon}" />
					<div>{tab.label}</div>
				</a>
			{/each}
		</div>
	{/if}
</div>

{#if innerWidth < 360}
	<SidebarSmallScreen {showAnotherMenu} on:close_sidebar={() => (showAnotherMenu = false)} />
{/if}

<style></style>
