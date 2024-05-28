<script lang="ts">
	import ImageLoader from '$lib/components/common/image/ImageLoader.svelte';

	let achievements = [
		{
			id: 3,
			img: '/images/cert3-1.webp',
			title: 'Sertifikat Kementerian Kesehatan (Peduli Lindungi)',
			desc: ''
		},
		{
			id: 7,
			img: '/images/show-dashboard-generator-asik.webp',
			title: 'Presentasi Dashboard Generator ASIK oleh Kementerian Kesehatan',
			desc: ''
		},
		{ id: 1, img: '/images/cert1.webp', title: 'Sertifikat Udemy (Web Design)', desc: '' },
		{
			id: 2,
			img: '/images/cert2.webp',
			title: 'Sertifikat Udemy (Understanding Typescript)',
			desc: ''
		},
		{
			id: 4,
			img: '/images/cert4.webp',
			title: 'Sertifikat Udemy (Beginner Photoshop to HTML5)',
			desc: ''
		},
		{
			id: 5,
			img: '/images/cert5.webp',
			title: 'Sertifikat Udemy (Javascript Essentials)',
			desc: ''
		},
		{ id: 6, img: '/images/cert6.webp', title: 'Sertifikat Udemy (Fullstack Javascript)', desc: '' }
	];
</script>

<div class="gap-4 space-y-4 p-2 columns-4 lt-xl:columns-3 lt-lg:columns-2 lt-md:columns-1">
	{#each achievements as item}
		<div class="break-inside-avoid bg-neutral-1 shadow-md rounded-md dark:bg-white">
			<div
				class="rounded-t-md shadow-lg relative justify-center flex flex-row flex-wrap gap-2 overflow-hidden"
			>
				<div class="h-56 flex justify-center w-full">
					<ImageLoader
						src={item.img}
						alt="img-achievment-{item.id}"
						classes="h-56 z-10 w-auto object-contain lt-md:w-[calc(100%)]"
					/>
				</div>
			</div>

			<div class="text-black flex flex-col p-4">
				<div class="text-center font-bold mb-2">
					{item.title}
				</div>
				<div class="text-center">
					{item.desc}
				</div>
			</div>
		</div>
	{/each}
</div>

<style>
	/* .test {
		view-transition-name: 'title';
	} */
</style>
