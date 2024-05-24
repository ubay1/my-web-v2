<script lang="ts">
	import 'uno.css';
	import '$lib/assets/css/global.css';
	// import '$lib/assets/css/prism.css';
	import '$lib/assets/css/rich-two-slash.css';
	// import '$lib/assets/css/classic-two-slash.css';
	import { navigating } from '$app/stores';
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
</script>

<svelte:head>
	<script>
		document.documentElement.classList.add('dark');
	</script>
</svelte:head>

<Seo />

<main class="overflow-hidden">
	<Header />
	<slot />
</main>

<style>
</style>
