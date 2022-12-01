<script>
	// @ts-nocheck

	// import LargeHeader from '$lib/components/LargeHeader.svelte'
	export let data;
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

<!-- <LargeHeader text="All Tags" /> -->

<ul>
	{#each data.allTags as tag}
		<li>
			<a
				href="/blog/tags/{tag}"
				class="uppercase tracking-wide text-sm text-indigo-500 dark:text-sky-300 font-semibold"
			>
				{tag}
			</a>
		</li>
	{/each}
</ul>
Footer
