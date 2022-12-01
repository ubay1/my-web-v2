<script>
	// @ts-nocheck

	import SidebarSmallScreen from './SidebarSmallScreen.svelte';

	let tabActive = 1;
	let listTab = [
		{ id: 1, label: 'Overview', url: '/', icon: 'i-octicon-person-16' },
		{ id: 2, label: 'Blogs', url: '/blog', icon: 'i-octicon-book-24' },
		{ id: 3, label: 'Projects', url: '/project', icon: 'i-octicon-repo-16' }
	];

	$: innerWidth = 1280;

	let showAnotherMenu = false;
</script>

<svelte:window bind:innerWidth />

<div
	class="bg-white border-b border-gray-3 dark:bg-githubDark-1 dark:border-gray-7 sticky top-0 z-100"
>
	{#if innerWidth < 360}
		<div class="flex items-center p-4">
			<button
				class="bg-transparent border-none cursor-pointer"
				on:click={() => (showAnotherMenu = !showAnotherMenu)}
			>
				<div class="i-octicon-three-bars-16 text-2xl dark:text-white" />
			</button>
		</div>
	{:else}
		<div class="flex justify-center items-center">
			{#each listTab as tab}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					class="text-gray-7 flex items-center gap-1 p-4 cursor-pointer hover:bg-gray-2 hover:bg-opacity-4 dark:text-githubDark-2 {tab.id ===
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

{#if innerWidth < 360}
	<SidebarSmallScreen
		{showAnotherMenu}
		{tabActive}
		on:close_sidebar={() => (showAnotherMenu = false)}
		on:change_menu={(val) => (tabActive = val)}
	/>
{/if}

<style></style>
