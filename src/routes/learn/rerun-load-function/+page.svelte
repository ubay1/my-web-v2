<script lang="ts">
	import { invalidate, invalidateAll } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;

	function rerunLoadFunction() {
		invalidate('generate-image');
		// invalidateAll();
	}
</script>

<div class="p-4 text-white">
	<div class="bg-blue-5 mb-4 p-4 flex flex-col gap-4 justify-center items-center">
		{#await data.streamed.image}
			<div class="bg-blue-9 animate-pulse w-40 h-40" />
		{:then image}
			<img src={image.url} alt="" class="w-40 h-40" />
		{:catch error}
			{error.message}
		{/await}
		<button
			class="bg-white text-black p-2 border-0 cursor-pointer hover:bg-gray-2"
			on:click={rerunLoadFunction}
		>
			Regenerate Image
		</button>
	</div>
</div>

<style></style>
