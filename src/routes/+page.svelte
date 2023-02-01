<script>
	import { page } from '$app/stores';
	let achievements = [
		{ id: 1, img: '/images/cert-1.webp' },
		{ id: 2, img: '/images/cert-2.webp' },
		{ id: 3, img: '/images/cert-3.webp' },
		{ id: 4, img: '/images/cert-4.webp' },
		{ id: 5, img: '/images/cert-5.webp' },
		{ id: 6, img: '/images/cert-6.webp' }
	];

	let listRiwayatPendidikan = [
		{
			img: '/images/smk.webp',
			nama: 'SMK-TI PGRI 11 SERPONG',
			jurusan: 'Animasi',
			lulus: '2011 - 2014'
		},
		{
			img: '/images/unpam.webp',
			nama: 'Universitas Pamulang',
			jurusan: 'Teknik Informatika',
			lulus: '2014 - 2019'
		}
	];

	let listKeahlian = [
		{ img: '/images/html.webp', nama: 'HTML', star: '⭐⭐⭐⭐⭐' },
		{ img: '/images/css.webp', nama: 'CSS', star: '⭐⭐⭐⭐⭐' },
		{ img: '/images/vue.webp', nama: 'Vue', star: '⭐⭐⭐⭐⭐' },
		{ img: '/images/svelte.webp', nama: 'Svelte', star: '⭐⭐⭐⭐' },
		{ img: '/images/react.webp', nama: 'React', star: '⭐⭐⭐' },
		{ img: '/images/ts.webp', nama: 'Typescript', star: '⭐⭐⭐' }
	];
</script>

<svelte:head>
	<link rel="preload" as="image" href="/images/profil.webp" />
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
	<link rel="preload" as="image" href="/images/cert-6.webp" />
</svelte:head>

<div class="flex justify-start items-start gap-6 mt-4 px-4 lt-md:flex-col">
	<div class="w-30% flex flex-col justify-center lt-md:w-100% lt-md:items-center">
		<img
			src="/images/profil.webp"
			alt="profil"
			class="w-full pointer-events-none bg-gray-3 rounded-full border-gray-7 object-cover aspect-square dark:border-b dark:bg-gray-7 dark:border-gray-7 lt-md:w-50%"
		/>

		<div class="mt-4 flex flex-col gap-2 dark:text-white ">
			<div class="text-2xl font-semibold">Ubay Dillah</div>
			<div class="flex items-center lt-md:justify-center text-sm gap-1">
				<div class="i-octicon-location " />
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
					>
						<img
							src={item.img}
							alt="img-achievment-{item.id}"
							class="w-100% pointer-events-none h-full my-4 bg-gray-3 aspect-ratio-8/6 object-cover shadow dark:bg-gray-7"
						/>
					</a>
				{/each}
			</div>
		</div>
	</div>

	<div class="w-full flex flex-col dark:text-white ">
		<div class="border border-gray-3 rounded-lg p-4 dark:border-gray-7">
			<p class="text-2xl text-center">Hi, Saya Ubay 👋</p>
			<p class="leading-6 indent-5 text-justify">
				Saya seorang ayah dari 2 orang anak. saya seorang yang sangat tertarik dengan hal-hal baru
				dalam teknologi web. saat ini saya bekerja sebagai frontend developer di
				<a
					href="https://dto.kemkes.go.id"
					class="text-orange-7 dark:text-orange-4 font-bold decoration-none border-x-none border-t-none border-b-1 border-dashed"
				>
					DTO Kemenkes
				</a>
			</p>
		</div>

		<div class="mt-4 mb-2">
			<p>Riwayat Pendidikan</p>
			<div class="grid grid-cols-2 gap-4 lt-md:flex lt-md:flex-col">
				{#each listRiwayatPendidikan as item}
					<div class="border border-gray-3 rounded-lg p-4  dark:border-gray-7">
						<div class="flex items-center justify-start gap-4">
							<img
								src={item.img}
								alt="img-{item.nama}"
								class="aspect-square pointer-events-none object-contain"
								width="80"
								height="80"
							/>
							<div class="leading-6">
								<div class="text-lg font-semibold">{item.nama}</div>
								<div>{item.jurusan}</div>
								<div>{item.lulus}</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<div class="mt-2 mb-4">
			<p>Keahlian</p>
			<div
				class="grid grid-cols-2 border border-gray-3  rounded-lg p-4  dark:border-gray-7 lt-md:grid-cols-1"
			>
				{#each listKeahlian as item}
					<div class="flex items-center justify-start gap-4 mb-4">
						<img
							src={item.img}
							alt="img-{item.nama}"
							class="aspect-square pointer-events-none object-contain"
							width="70"
							height="70"
						/>
						<div class="leading-6">
							<div class="text-lg font-semibold">{item.nama}</div>
							<div>{item.star}</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style></style>
