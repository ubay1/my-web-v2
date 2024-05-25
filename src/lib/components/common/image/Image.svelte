<script lang="ts">
	import { onMount } from 'svelte';

	export let src: string;
	export let alt: string;
	export let classes: string;
	export let width: string | null;
	export let height: string | null;
	let loaded = false;
	let thisImage: any;

	onMount(() => {
		thisImage.onload = () => {
			loaded = true;
		};
	});
</script>

{#if !width && !height}
	<img {src} {alt} class:loaded bind:this={thisImage} class={classes} />
	<!-- style:--tag="img" -->
{:else}
	<img {width} {height} {src} {alt} class:loaded bind:this={thisImage} class={classes} />
	<!-- style:--tag="img" -->
{/if}
