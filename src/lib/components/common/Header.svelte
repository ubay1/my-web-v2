<script lang="ts">
	import { page } from '$app/stores';
	import { listTab } from '$lib/utils/constants';
	import SidebarSmallScreen from '$lib/components/common/SidebarSmallScreen.svelte';
	import classNames from 'classnames';
	import Icon from '@iconify/svelte';

	let tabActive: number = 1;

	$: innerWidth = 480;

	let showAnotherMenu: boolean = false;

	const changeTabActive = (tabId: number) => (tabActive = tabId);
</script>

<svelte:window bind:innerWidth />

<div
	class="bg-white dark:bg-githubDark-1 top-0 z-100 fixed w-fill"
	style="view-transition-name: header;"
>
	<div class="flex items-center px-3 py-4 md:hidden">
		<button
			aria-label="btn-menu-sm-screen"
			class="bg-transparent border-none cursor-pointer flex items-center gap-4"
			on:click={() => (showAnotherMenu = !showAnotherMenu)}
		>
			<Icon icon="octicon:three-bars-16" class="text-2xl dark:text-white" />
		</button>
		<div class="font-bold text-white text-xl flex grow-1 justify-center items-center pr-6">
			Ubay Dillah
		</div>
	</div>
	<ul
		data-sveltekit-preload-data
		class="mb-0 flex justify-center items-center border-b border-b-solid border-gray-3 dark:border-gray-7 sticky lt-md:hidden"
	>
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
					class="p-4 decoration-none flex dark:text-githubDark-2"
					href={tab.url}
					on:click={() => changeTabActive(tab.id)}
				>
					<Icon icon={tab.icon} class="mr-1 text-lg" />
					<div>{tab.label}</div>
				</a>
			</li>
		{/each}
	</ul>
</div>

<SidebarSmallScreen {showAnotherMenu} on:close_sidebar={() => (showAnotherMenu = false)} />

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
