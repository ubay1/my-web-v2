<script lang="ts">
	import { setContext } from 'svelte';
	import type { LayoutData } from './$types';
	import { quotes } from './store';

	export let data: LayoutData;

	$: quotes.set(data.quotes);
	setContext('quotes', quotes);
</script>

<slot />
