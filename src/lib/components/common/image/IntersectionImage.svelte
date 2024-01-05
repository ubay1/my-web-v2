<script lang="ts">
	import { onMount } from 'svelte';

	export let once: boolean = false;
	export let top: number = 0;
	export let bottom: number = 0;
	export let left: number = 0;
	export let right: number = 0;
	export let classes: string | null = null;
	let intersecting: boolean = false;

	let container: any;

	onMount(() => {
		if (typeof IntersectionObserver !== 'undefined') {
			const rootMargin = `${bottom}px ${left}px ${top}px ${right}px`;
			const observer = new IntersectionObserver(
				(entries) => {
					intersecting = entries[0].isIntersecting;
					if (intersecting && once) {
						observer.unobserve(container);
					}
				},
				{
					rootMargin
				}
			);
			observer.observe(container);
			return () => observer.unobserve(container);
		}
	});
</script>

{#if classes}
	<div bind:this={container} class={classes}>
		<slot {intersecting} />
	</div>
{:else}
	<div bind:this={container}>
		<slot {intersecting} />
	</div>
{/if}

<style>
	/* div { */
	/* width: 100%;
		height: 100%; */
	/* } */
</style>
