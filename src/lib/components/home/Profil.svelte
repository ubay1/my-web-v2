<script lang="ts">
	import Icon from '@iconify/svelte';
</script>

<div class="w-30% flex flex-col justify-center lt-md:w-full lt-md:items-center">
	<img
		src="/images/profil.webp"
		alt="profil"
		class="w-4/5 m-auto pointer-events-none bg-gray-3 rounded-full border-gray-7 object-cover aspect-square dark:border-b dark:bg-gray-7 dark:border-gray-7 lt-md:w-50%"
	/>

	<div class="mt-4 flex flex-col justify-center items-center gap-2 dark:text-white">
		<div class="text-2xl font-semibold">Ubay Dillah</div>
		<div class="flex items-center lt-md:justify-center text-sm gap-1">
			<Icon icon="octicon:location" class="text-xl text-white" />
			<div>Bekasi</div>
		</div>
	</div>
</div>

<style></style>
