<script>
	const listProject = [
		{
			label: 'Movie Kit',
			vertical: false,
			classes: 'img-horizontal-blibli',
			img: ['/images/sveltekit-movie.webp'],
			stack: ['SvelteKit', 'Typescript', 'UnoCSS'],
			project: 'Proyek Pribadi',
			url: 'https://movie-kit.vercel.app'
		},
		{
			label: 'Asik Dashboard',
			vertical: false,
			classes: 'img-horizontal-asik',
			img: ['/images/asik.webp'],
			stack: ['VueJS 2', 'Tailwind'],
			project: 'Kementerian Kesehatan',
			url: null
		},
		{
			label: 'eHAC Peduli Lindungi',
			vertical: true,
			classes: 'img-vertical',
			img: ['/images/ehac.webp', '/images/ehac1.webp', 'images/myehac.webp'],
			stack: ['NuxtJS', 'Vuetify'],
			project: 'Kementerian Kesehatan',
			url: null
		},
		{
			label: 'Vue3 Movie',
			vertical: true,
			classes: 'img-vertical',
			img: ['/images/vue3-movie.webp'],
			stack: ['VueJS 3', 'Tailwind'],
			project: 'Proyek Pribadi',
			url: 'https://vue3-movie.vercel.app'
		},
		{
			label: 'Catatan Kajian',
			vertical: true,
			classes: 'img-vertical',
			img: ['/images/catatan-kajian.webp'],
			stack: ['SvelteKit', 'Tailwind'],
			project: 'Proyek Pribadi',
			url: 'https://catatan-kajian.vercel.app'
		},
		{
			label: 'BliBli Clone',
			vertical: false,
			classes: 'img-horizontal-blibli',
			img: ['/images/blibli.webp'],
			stack: ['SvelteKit', 'Tailwind'],
			project: 'Proyek Pribadi',
			url: 'https://learn-svelte-sveltekit.vercel.app/project/blibli-clone'
		},
		{
			label: 'Global Wakaf Corporation',
			vertical: true,
			classes: 'img-horizontal',
			img: ['/images/gwc2.webp'],
			stack: ['NuxtJS', 'Typescript', 'Vuetify', 'Google Maps'],
			project: 'Goiot',
			url: null
		},
		{
			label: 'Cari Gawe',
			vertical: false,
			classes: 'img-horizontal-carigawe',
			img: ['/images/carigawe2.webp'],
			stack: ['ReactJS', 'Typescript', 'Sequelize', 'SocketIO', 'ExpressJS', 'MaterialUI'],
			project: 'Proyek Pribadi',
			url: null
		},
		{
			label: 'Catatan Uangku',
			vertical: true,
			classes: 'img-vertical',
			img: ['/images/catatanuang2.webp'],
			stack: ['React Native', 'Typescript', 'Realm'],
			project: 'Proyek Pribadi',
			url: null
		},
		{
			label: 'Homi Smarthome',
			vertical: false,
			classes: 'img-horizontal-homi',
			img: ['/images/homi2.webp'],
			stack: ['React Native ', 'Typescript', 'MQTT'],
			project: 'Goiot',
			url: null
		}
	];
</script>

<div class=" columns-1 sm:columns-2 md:columns-3 gap-4 p-4 mb-4">
	{#each listProject as item}
		<div class="break-inside-avoid mb-4 bg-neutral-1 shadow-md rounded-md dark:bg-white">
			<div
				class="rounded-t-md shadow-lg  relative justify-center flex flex-row flex-wrap gap-2 overflow-hidden"
			>
				<div
					style="background: url({item.img[0]});"
					class="bg-blur rounded-t-md absolute top-0 h-full w-full"
				/>
				<div class="absolute z-20 top-0 right-0 text-sm font-bold p-1 rounded-lb-md bg-orange-4 ">
					{item.project}
				</div>
				{#each item.img as img, idx}
					<img
						src={img}
						alt="img-{item.label}"
						class="{item.vertical ? 'h-56' : 'h-52'} p-2 z-10 w-auto object-contain {item.classes}"
					/>
				{/each}
			</div>
			<div class="text-black flex flex-col p-4">
				<div class="text-center font-bold mb-2">
					{#if item.url}
						<a
							href={item.url}
							target="_blank"
							rel="noreferrer"
							class="flex items-center justify-center gap-2 decoration-none text-black"
						>
							<span>{item.label}</span>
							<div class="i-octicon-link-external-16 text-lg " />
						</a>
					{:else}
						{item.label}
					{/if}
				</div>
				<div class="text-center">
					{item.stack.join(', ')}
				</div>
			</div>
		</div>
	{/each}
</div>

<style>
	.bg-blur {
		transform: scale(1.2);
		transition: all 0.3s ease-in-out 0s;
		opacity: 0.5;
		filter: blur(15px);
	}
	@media (max-width: 480px) {
		.img-vertical {
			margin-top: 0px;
			width: calc(40vw - 0px);
		}
		.img-horizontal {
			margin-top: 0px;
			width: calc(80vw - 0px);
			height: calc(70vw - 20px);
		}
		.img-horizontal-homi {
			margin-top: 0px;
			width: calc(80vw - 0px);
			height: calc(60vw - 20px);
		}
		.img-horizontal-carigawe {
			margin-top: 0px;
			width: calc(80vw - 0px);
			height: calc(50vw - 20px);
		}
		.img-horizontal-blibli {
			margin-top: 0px;
			width: calc(80vw - 0px);
			height: calc(45vw - 20px);
		}
		.img-horizontal-asik {
			margin-top: 0px;
			width: calc(80vw - 0px);
			height: calc(40vw - 20px);
		}
	}
</style>
