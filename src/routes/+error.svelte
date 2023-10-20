<script lang="ts">
	import { page } from '$app/stores';
	import Seo from '$lib/components/common/Seo.svelte';
</script>

<Seo templateTitle="" title={$page.status + ' - ' + $page.error?.message} />

<div>
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
