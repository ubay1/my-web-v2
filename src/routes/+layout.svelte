<script lang="ts">
	import 'uno.css';
	import '$lib/assets/css/global.css';
	import '$lib/assets/css/prism.css';
	import { navigating } from '$app/stores';
	import NProgress, { remove } from 'nprogress';
	import 'nprogress/nprogress.css';
	import Header from '$lib/components/Header.svelte';
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
</script>

<svelte:head>
	<script>
		document.documentElement.classList.add('dark');
	</script>
</svelte:head>

<Seo title="Ubay Dillah" metadescription="Catatan" />
<main class="overflow-hidden">
	<Header />
	<slot />
</main>

<style>
</style>
