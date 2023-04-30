<script lang="ts">
	const fav = '/meta-image.png';
	export let templateTitle: string = 'Ubay Dillah';
	export let title: string = '';
	export let url: string = 'https://asik-sveltekit.vercel.app';
	export let favicon = fav;
	export let description: string = 'Terima jasa pembuatan website, dan freelance.';
</script>

<svelte:head>
	<title>{templateTitle}{title}</title>
	<link rel="icon" href={favicon} />
	<meta name="description" content={description} />
	<meta
		name="robots"
		content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
	/>
	<meta name="twitter:title" content={templateTitle + title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:url" content={url} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:image" content={url + '/icons/icon-144x144.png'} />
	<meta property="og:title" content={templateTitle + title} />
	<meta property="og:url" content={url} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={url + '/icons/icon-144x144.png'} />
	<meta property="og:image:secure" content={url + '/icons/icon-144x144.png'} />
	<meta property="og:image:width" content="800" />
	<meta property="og:image:height" content="450" />
	<meta property="og:url" content={url} />
	<meta property="og:type" content="article" />
</svelte:head>
