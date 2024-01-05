<script lang="ts">
	import IntersectionImage from './IntersectionImage.svelte';
	import Image from './Image.svelte';

	export let src: string;
	export let alt: string;
	export let classes: string;
	export let width: string | null = null;
	export let height: string | null = null;
	export let classIntersect: string | null = null;
	let nativeLoading = false;
</script>

<IntersectionImage once={true} let:intersecting classes={classIntersect}>
	{#if intersecting || nativeLoading}
		<Image {alt} {src} {width} {height} {classes} />
	{/if}
</IntersectionImage>
