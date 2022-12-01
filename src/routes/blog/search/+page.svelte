<script>
	// @ts-nocheck

	import Search from '~icons/ri/search-2-line';
	import Close from '~icons/ri/close-fill';
	import BlogPreview from '@/lib/components/BlogPreview.svelte';

	let search = null;

	let items = [];
	let isLoading = false;

	const filterArtikel = async () => {
		isLoading = true;
		try {
			const res = await fetch('/api/blog', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(search)
			});

			const result = await res.json();
			items = result;
		} catch (error) {
			console.log(error);
		} finally {
			isLoading = false;
		}
	};

	function resetArtikel() {
		search = null;
		items = [];
	}
</script>

<svelte:head>
	<title>Cari Catatan</title>
	<link rel="preload" as="image" href="/empty.webp" />
	<meta
		name="description"
		content="Semoga catatan ini menjadi amal jariyah bagi saya sebagai penulis dan bermanfaat untuk para pembaca"
	/>
</svelte:head>

<div class="mt-6 mb-8 max-w-4xl m-auto">
	<div class="text-xl font-bold text-center dark:text-white">Cari Catatan</div>
	<div class="px-2 mt-4">
		<div class="w-full h-12 relative">
			<input
				type="text"
				bind:value={search}
				placeholder="ketikan judul catatan disini"
				class="px-4 pr-24 border border-sky-900 rounded-md w-full h-full focus-visible:outline-sky-900 focus-visible:shadow-lg"
			/>
			<button
				aria-label="btn-reset-catatan"
				class="w-14 rounded-md flex justify-center p-2 absolute top-1 right-1 "
				on:click={() => resetArtikel()}
			>
				<Close
					class="w-6 h-6 rounded-md absolute top-2 right-16 text-red-500 bg-red-100 {search
						? 'flex'
						: 'hidden'}"
				/>
			</button>
			<button
				aria-label="btn-search-catatan"
				class="w-14 rounded-md flex justify-center p-2 bg-sky-900 absolute top-1 right-1"
				on:click={() => filterArtikel()}
			>
				<Search class="w-6 h-6 text-white" />
			</button>
		</div>

		<div class="py-2">
			{#if isLoading}
				<div class="flex flex-col justify-center items-center mt-4">
					<img src="/spinner.gif" alt="loading" width="50" height="50" />
					<p class="dark:text-white">Mencari catatan ..</p>
				</div>
			{:else if items.length === 0}
				<div class="flex flex-col justify-center items-center mt-4">
					<img src="/empty.webp" alt="empty-catatan" width="100" height="70" />
					<p class="dark:text-white">Tidak ada catatan</p>
				</div>
			{:else}
				<div class="max-w-4xl m-auto bg-white shadow-md dark:bg-slate-800">
					{#each items as post}
						<BlogPreview
							slug={post.path}
							title={post.meta.title}
							description={post.meta.description}
							date={post.meta.date}
							tags={post.meta.tags}
						/>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>

<style></style>
