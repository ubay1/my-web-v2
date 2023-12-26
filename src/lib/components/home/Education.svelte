<script lang="ts">
	interface IEducation {
		img: string;
		name: string;
		major: string;
		graduated?: string | undefined;
	}

	let listEducation: IEducation[] = [
		{
			img: '/images/smk.webp',
			name: 'SMK-TI PGRI 11 SERPONG',
			major: 'Animasi'
		},
		{
			img: '/images/unpam.webp',
			name: 'Universitas Pamulang',
			major: 'Teknik Informatika'
		}
	];
</script>

<div class="mt-4 mb-2">
	<p>Riwayat Pendidikan</p>
	<div class="grid grid-cols-2 gap-4 lt-md:flex lt-md:flex-col">
		{#each listEducation as item}
			<div class="border border-gray-3 border-solid rounded-lg p-4 dark:border-gray-7">
				<div class="flex items-center justify-start gap-4">
					<img
						src={item.img}
						alt="img-{item.name}"
						class="aspect-square pointer-events-none object-contain"
						width="80"
						height="80"
					/>
					<div class="leading-6">
						<div class="text-lg font-semibold">{item.name}</div>
						<div>{item.major}</div>
						<!-- <div>{item.graduated}</div> -->
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>

<style></style>
