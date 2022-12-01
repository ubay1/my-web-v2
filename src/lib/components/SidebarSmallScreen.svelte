<script>
	// @ts-nocheck
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let listTab = [
		{ id: 1, label: 'Overview', url: '/', icon: 'i-octicon-person-16' },
		{ id: 2, label: 'Blogs', url: '/blog', icon: 'i-octicon-book-24' },
		{ id: 3, label: 'Projects', url: '/project', icon: 'i-octicon-repo-16' }
	];

	export let showAnotherMenu = false;
	export let tabActive = 1;

	// $: console.log(tabActive);

	function closeSidebar() {
		dispatch('close_sidebar', true);
	}

	// function changeMenu(val) {
	// 	dispatch('change_menu', val);
	// }
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
		<div class="mt-20">
			{#each listTab as tab}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					class="text-black flex items-center gap-1 p-4 cursor-pointer w-full hover:bg-gray-7 hover:bg-opacity-8 dark:hover:bg-gray-2 dark:hover:bg-opacity-8 dark:text-githubDark-2 {tab.id ===
					tabActive
						? 'font-semibold border-b-2 border-orange-5'
						: ''}"
					on:click={() => (tabActive = tab.id)}
				>
					<div class="mr-1 text-lg {tab.icon}" />
					<div>{tab.label}</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
