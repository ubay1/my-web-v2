<script lang="ts">
	import { page } from '$app/stores';
	// import ImageNotFound from '$lib/assets/images/404.webp';
	// import ImageInternalError from '$lib/assets/images/500.webp';
	import Seo from '$lib/components/common/Seo.svelte';
</script>

<Seo templateTitle="" title={$page.status + ' - ' + $page.error?.message} />

<svelte:head>
	<!-- <link rel="preload" as="image" href="../404.webp" /> -->
	<!-- <link rel="preload" as="image" href={ImageInternalError} /> -->
</svelte:head>

<!-- class="grid place-items-center" -->
<div>
	<!-- <img src={Logo} alt="logo-asik" class="pointer-events-none h-30 grow" /> -->
	<!-- src={$page.status === 404 ? {ImageNotFOund} : {ImageInternalError}} -->
	<!-- class="pointer-events-none {$page.status === 404 ? 'lt-xs:w-[90%]' : 'lt-xs:w-80'} w-80" -->
	<!-- <img
		src={ImageInternalError}
		alt="img-error"
		class="pointer-events-none w-80 mix-blend-multiply"
	/> -->
	<div class="text-sm text-white my-4 mt-150px flex flex-col justify-center items-center">
		<div class="font-bold text-7xl">{$page.status}</div>
		<div class="max-w-md text-center">
			{$page.status === 404
				? 'Maaf, Halaman yang anda minta tidak ditemukan.'
				: $page.error?.message}
		</div>
		<div class="my-6">
			<button
				class=" bg-white cursor-pointer p-2 border-none decoration-none"
				on:click={() => (window.location.href = '/')}
			>
				Kembali
			</button>
		</div>
	</div>
</div>
