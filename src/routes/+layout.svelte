<script lang="ts">
	import 'uno.css';
	import { Toasts } from 'svoast';
	import '$lib/assets/css/global.css';
	import '$lib/assets/css/rich-two-slash.css';
	// import '$lib/assets/css/classic-two-slash.css';
	import { navigating } from '$app/stores';
	import { onNavigate } from '$app/navigation';
	import NProgress from 'nprogress';
	import 'nprogress/nprogress.css';
	import Header from '$lib/components/common/Header.svelte';
	import Seo from '$lib/components/common/Seo.svelte';

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

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<script>
		document.documentElement.classList.add('dark');
	</script>
</svelte:head>

<Seo />

<div class="overflow-hidden">
	<Toasts position="top-right" />
	<Header />
	<main class="mt-24">
		<slot />
	</main>
</div>

<style>
</style>
