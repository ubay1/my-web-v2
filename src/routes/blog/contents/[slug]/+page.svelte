<script>
	// @ts-nocheck

	import { page } from '$app/stores';
	import '$lib/assets/css/prism.css';
	import { formatDate } from '$lib/utils/format';
	export let data;
</script>

<svelte:head>
	<title>{data.title}</title>
	<meta name="description" content={data.description} />
	<meta property="og:title" content={data.title} />
	<meta property="og:description" content={data.description} />
	<meta property="og:url" content="https://catatan-kajian.vercel.app" />
	<meta property="og:image:secure" content="https://catatan-kajian.vercel.app/meta-img.jpeg" />
	<meta property="og:image:width" content="800" />
	<meta property="og:image:height" content="450" />
	<meta property="og:image:type" content="image/jpeg" />
	<meta property="og:type" content="article" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={data.title} />
	<meta name="twitter:description" content={data.description} />
	<meta name="twitter:image" content="https://catatan-kajian.vercel.app/meta-img.jpeg" />
</svelte:head>

<div class="px-0 max-w-4xl m-auto h-56 md:h-72 relative">
	<img
		src={data.imagePath}
		class="w-full h-full object-cover object-left-top dark:brightness-50"
		alt=""
	/>
	<div class="absolute top-0 flex justify-center items-center h-full w-full">
		<h1 class="text-3xl z-40 line-clamp-2 font-bold text-white text-center">
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
