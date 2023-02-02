<script lang="ts">
	import Education from '$lib/components/molecules/home/Education.svelte';
	import Greeting from '$lib/components/molecules/home/Greeting.svelte';
	import Profil from '$lib/components/molecules/home/Profil.svelte';
	import Skills from '$lib/components/molecules/home/Skills.svelte';
</script>

<svelte:head>
	<!-- <link rel="preload" as="image" href="/images/profil.webp" />
	<link rel="preload" as="image" href="/images/smk.webp" />
	<link rel="preload" as="image" href="/images/unpam.webp" />
	<link rel="preload" as="image" href="/images/html.webp" />
	<link rel="preload" as="image" href="/images/css.webp" />
	<link rel="preload" as="image" href="/images/vue.webp" />
	<link rel="preload" as="image" href="/images/svelte.webp" />
	<link rel="preload" as="image" href="/images/react.webp" />
	<link rel="preload" as="image" href="/images/cert-1.webp" />
	<link rel="preload" as="image" href="/images/cert-2.webp" />
	<link rel="preload" as="image" href="/images/cert-3.webp" />
	<link rel="preload" as="image" href="/images/cert-4.webp" />
	<link rel="preload" as="image" href="/images/cert-5.webp" />
	<link rel="preload" as="image" href="/images/cert-6.webp" /> -->
</svelte:head>

<div class="flex justify-start items-start gap-6 mt-4 px-4 lt-md:flex-col">
	<Profil />
	<div class="w-full flex flex-col dark:text-white ">
		<Greeting />
		<Education />
		<Skills />
	</div>
</div>

<style></style>
