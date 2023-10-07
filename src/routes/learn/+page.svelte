<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="p-4 text-white">
	<!-- <div>one :{data.one}</div> -->
	<!-- <div> -->
	{#await data.streamed.one}
		Loading 1..
	{:then data}
		{data}
	{/await}
	{#await data.streamed.two}
		Loading 2..
	{:then data}
		{data}
	{/await}
	<!-- </div> -->
</div>

<style></style>
