<script>
	// @ts-nocheck

	import 'uno.css';
	import '$lib/assets/css/global.css';
	import { navigating } from '$app/stores';
	import NProgress, { remove } from 'nprogress';
	import 'nprogress/nprogress.css';
	import Header from '$lib/components/Header.svelte';
	import { browser } from '$app/environment';
	import Seo from '$lib/components/Seo.svelte';

	NProgress.configure({
		// Full list: https://github.com/rstacruz/nprogress#configuration
		minimum: 0.16
	});

	$: {
		if ($navigating) {
			NProgress.start();
		}
		if (!$navigating) {
			NProgress.done();
		}
	}

	let isDark = browser ? window.matchMedia('(prefers-color-scheme: dark)').matches : false;

	const toggleDark = () => {
		if (browser) {
			if (isDark) {
				isDark = false;
				document.documentElement.classList.remove('dark');
			} else {
				isDark = true;
				document.documentElement.classList.add('dark');
			}
		}
	};
</script>

<svelte:head>
	<script>
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			// console.log(window.matchMedia('(prefers-color-scheme: dark)').matches);
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	</script>
</svelte:head>

<Seo title="Ubay Dillah" metadescription="Catatan" />
<main>
	<Header />
	<slot />
	<button
		aria-label="btn-toggle-theme"
		class="bg-yellow-4 rounded-full h-12 w-12 flex justify-center items-center border-none fixed bottom-5 right-10 cursor-pointer hover:bg-yellow-3 dark:hover:bg-gray-6 dark:bg-gray-7 lt-md:right-5"
		on:click={() => toggleDark()}
	>
		{#if isDark}
			<div class="i-octicon-moon-16 text-2xl dark:text-white" />
		{:else}
			<div class="i-octicon-sun-16 text-2xl dark:text-white" />
		{/if}
	</button>
</main>

<style>
</style>
