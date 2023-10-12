<script lang="ts">
	interface IListSkill {
		img: string;
		name: string;
		rate?: string;
	}

	let oftenUsed: IListSkill[] = [
		{ img: '/images/vue.webp', name: 'Vue', rate: '⭐⭐⭐⭐⭐' },
		{ img: '/images/nuxt.webp', name: 'Nuxt', rate: '⭐⭐⭐⭐⭐' },
		{ img: '/images/tailwind.webp', name: 'Tailwind', rate: '⭐⭐⭐⭐⭐' },
		{ img: '/images/uno.webp', name: 'Uno Css', rate: '⭐⭐⭐⭐⭐' },
		{ img: '/images/svelte.webp', name: 'Svelte & Sveltekit', rate: '⭐⭐⭐⭐' },
		{ img: '/images/ts.webp', name: 'Typescript', rate: '⭐⭐⭐' }
	];

	let everUsed: IListSkill[] = [
		{ img: '/images/react.webp', name: 'React JS/React Native' },
		{ img: '/images/express.webp', name: 'Express JS' },
		{ img: '/images/nest.webp', name: 'Nest JS' },
		{ img: '/images/laravel.webp', name: 'Laravel' },
		{ img: '/images/codeigniter.webp', name: 'Codeigniter' },
		{ img: '/images/postgresql.webp', name: 'PostgreSql' },
		{ img: '/images/mysql.webp', name: 'MySql' },
		{ img: '/images/sqlite.webp', name: 'Sqlite' },
		{ img: '/images/realm.webp', name: 'Realm' }
	];
</script>

<div class="mt-2 mb-4">
	<p>Sedang digunakan</p>
	<div
		class="flex flex-wrap justify-center items-center gap-6 border border-gray-3 rounded-lg p-4 dark:border-gray-7"
	>
		{#each oftenUsed as item}
			<div class="flex flex-col items-center justify-start gap-4 mb-4">
				<img
					src={item.img}
					alt="img-{item.name}"
					class="aspect-square pointer-events-none object-contain"
					width="70"
					height="70"
				/>
				<div class="leading-6">
					<div class="text-lg font-semibold">{item.name}</div>
					<!-- <div>{item.rate}</div> -->
				</div>
			</div>
		{/each}
	</div>
</div>

<div class="mt-2 mb-4">
	<p>Pernah digunakan</p>
	<div
		class="flex flex-wrap justify-center items-center gap-6 border border-gray-3 rounded-lg p-4 dark:border-gray-7"
	>
		{#each everUsed as item}
			<div class="flex flex-col items-center justify-start mb-4">
				<img
					src={item.img}
					alt="img-{item.name}"
					class="aspect-square pointer-events-none object-contain"
					width="70"
					height="70"
				/>
				<div class="leading-6">
					<div class="text-lg font-semibold">{item.name}</div>
				</div>
			</div>
		{/each}
	</div>
</div>

<style></style>
