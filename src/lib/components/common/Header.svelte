<script lang="ts">
	import { page } from '$app/stores';
	import SidebarSmallScreen from '$lib/components/common/SidebarSmallScreen.svelte';

	export let listTab = [
		{ id: 1, label: 'Profil', url: '/', icon: 'i-octicon-person-16' },
		{ id: 2, label: 'Blog', url: '/blogs', icon: 'i-octicon-book-16' },
		{ id: 3, label: 'Proyek', url: '/projects', icon: 'i-octicon-repo-16' },
		{ id: 4, label: 'Kontak', url: '/contact', icon: 'i-octicon-mail-16' }
	];

	let tabActive: number = 1;

	$: innerWidth = 480;

	let showAnotherMenu: boolean = false;

	function changeTabActive(tabId: number) {
		tabActive = tabId;
	}
</script>

<svelte:window bind:innerWidth />

<div
	class="bg-white border-b border-gray-3 dark:bg-githubDark-1 dark:border-gray-7 sticky top-0 z-100"
>
	<div class="flex items-center px-3 py-4 md:hidden">
		<button
			class="bg-transparent border-none cursor-pointer"
			on:click={() => (showAnotherMenu = !showAnotherMenu)}
		>
			<div class="i-octicon-three-bars-16 text-2xl dark:text-white" />
		</button>
	</div>
	<div data-sveltekit-preload-data class="flex justify-center items-center lt-md:hidden">
		{#each listTab as tab}
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
</div>

<SidebarSmallScreen {showAnotherMenu} on:close_sidebar={() => (showAnotherMenu = false)} />

<style></style>
