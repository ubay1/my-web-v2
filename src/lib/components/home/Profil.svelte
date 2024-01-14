<script lang="ts">
	import { page } from '$app/stores';
	import ImageLoader from '../common/image/ImageLoader.svelte';

	interface IAchievments {
		id: number;
		img: string;
	}

	let achievements: IAchievments[] = [
		{ id: 1, img: '/images/cert1.webp' },
		{ id: 2, img: '/images/cert2.webp' },
		{ id: 3, img: '/images/cert3.webp' },
		{ id: 4, img: '/images/cert4.webp' },
		{ id: 5, img: '/images/cert5.webp' },
		{ id: 6, img: '/images/cert6.webp' }
	];
</script>

<div class="w-30% flex flex-col justify-center lt-md:w-full lt-md:items-center">
	<img
		src="/images/profil.webp"
		alt="profil"
		class="w-4/5 m-auto pointer-events-none bg-gray-3 rounded-full border-gray-7 object-cover aspect-square dark:border-b dark:bg-gray-7 dark:border-gray-7 lt-md:w-50%"
	/>

	<div class="mt-4 flex flex-col gap-2 dark:text-white">
		<div class="text-2xl font-semibold">Ubay Dillah</div>
		<div class="flex items-center lt-md:justify-center text-sm gap-1">
			<div class="i-octicon-location" />
			<div>Bekasi</div>
		</div>
	</div>
	<div class="w-full mt-2 mb-3 h-2 border-b border-gray-3 dark:border-gray-7" />
	<div class="font-semibold dark:text-white">Pencapaian</div>
	<div class="overflow-x-auto w-full">
		<div class="flex gap-2 mb-2 w-[700px]">
			{#each achievements as item}
				<a
					href={$page.url.origin + item.img}
					class="w-[20em] h-full lt-md:w-[20em] cursor-pointer"
					target="_blank"
					rel="noreferrer"
					aria-label="pencapaian"
				>
					<ImageLoader
						src={item.img}
						alt="img-achievment-{item.id}"
						classes="w-full pointer-events-none h-full my-4 bg-gray-3 aspect-ratio-8/6 object-cover shadow dark:bg-gray-7"
					/>
				</a>
			{/each}
		</div>
	</div>
</div>

<style></style>
