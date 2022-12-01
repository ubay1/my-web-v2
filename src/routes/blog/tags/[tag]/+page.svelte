<script>
	// @ts-nocheck

	import BlogPreview from '$lib/components/BlogPreview.svelte';
	export let data;

	const getFormattedTag = () =>
		data.tag.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
</script>

<svelte:head>
	<title>Catatan Kajian</title>
	<meta
		name="description"
		content="Semoga catatan ini menjadi amal jariyah bagi saya sebagai penulis dan bermanfaat untuk para pembaca"
	/>
	<meta property="og:title" content="Catatan Kajian" />
	<meta
		property="og:description"
		content="Semoga catatan ini menjadi amal jariyah bagi saya sebagai penulis dan bermanfaat untuk para pembaca"
	/>
	<meta property="og:url" content="https://catatan-kajian.vercel.app" />
	<meta property="og:image:secure" content="https://catatan-kajian.vercel.app/meta-img.jpeg" />
	<meta property="og:image:width" content="800" />
	<meta property="og:image:height" content="450" />
	<meta property="og:image:type" content="image/jpeg" />
	<meta property="og:type" content="article" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Catatan Kajian" />
	<meta
		name="twitter:description"
		content="Semoga catatan ini menjadi amal jariyah bagi saya sebagai penulis dan bermanfaat untuk para pembaca"
	/>
	<meta name="twitter:image" content="https://catatan-kajian.vercel.app/meta-img.jpeg" />
</svelte:head>

<div class="max-w-4xl m-auto bg-white shadow-md dark:bg-slate-800 pb-4">
	<div class="text-xl text-sky-900 font-bold py-4 px-2 dark:text-white">
		Tag: <span class="border-dashed border-b-2 border-sky-900 dark:border-white"
			>{getFormattedTag()}</span
		>
	</div>

	{#if data.posts.length}
		<ul class="mb-10">
			{#each data.posts as post}
				<li>
					<BlogPreview
						slug={post.path}
						title={post.meta.title}
						description={post.meta.description}
						date={post.meta.date}
						tags={post.meta.tags}
					/>
				</li>
			{/each}
		</ul>
	{:else}
		<p>No posts tagged with {getFormattedTag()}</p>
	{/if}
	<a
		href="/blog/tags"
		class="px-2 uppercase tracking-wide text-sm font-semibold underline dark:text-white"
	>
		Lihat Semua Tags
	</a>
</div>
