<script>
	// @ts-nocheck

	import { page } from '$app/stores';
	import '$lib/assets/css/prism.css';
	import { formatDate } from '$lib/utils/format';
	export let data;
</script>

<div class="px-0 max-w-4xl m-auto h-56 md:h-72 relative">
	<img
		src={data.imagePath}
		class="w-full h-full aspect-video object-contain bg-gray-2 brightness-30 lt-md:object-cover"
		alt=""
	/>
	<div class="absolute top-0 flex justify-center items-center h-full w-full">
		<h1 class="text-3xl z-40 line-clamp-2 font-bold text-center text-white">
			{data.title}
		</h1>
	</div>
	<div class="absolute bottom-2 right-2 md:right-4">
		<h2 class="text-xs italic text-slate-300">Diterbitkan: {formatDate(data.date)}</h2>
	</div>
</div>

<div
	class="p-2 shadow-md max-w-4xl m-auto prose prose-hr:mt-4 prose-hr:mb-4 prose-h2:mb-2 prose-h2:mt-8 prose-ol:mt-0 prose-a:text-black prose-p:my-0 dark:bg-slate-800 dark:prose-h2:text-white dark:text-white dark:prose-blockquote:text-white  dark:prose-ol:text-white dark:prose-p:text-white dark:prose-a:text-white"
>
	<svelte:component this={data.content} />
</div>
