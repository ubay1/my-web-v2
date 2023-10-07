<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="p-4 text-white">
	{#await data.streamed.one}
		<div class=" grid grid-cols-4 gap-4 lt-md:grid-cols-2 lt-sm:grid-cols-1">
			{#each Array(21) as _, i}
				<div class="mb-4">
					<div class="grid grid-cols-[15%_85%] gap-2">
						<div class="animate-pulse bg-gray-6 h-9 w-9 rounded-full" />
						<div class="flex flex-col gap-2 w-full">
							<div class="animate-pulse bg-gray-6 h-5 w-full" />
							<div class="animate-pulse bg-gray-6 h-5 w-full" />
						</div>
					</div>
				</div>
			{/each}
		</div>
	{:then data}
		<div class=" grid grid-cols-4 gap-4 lt-md:grid-cols-2 lt-sm:grid-cols-1">
			{#each data as _data, i}
				<div class="mb-4">
					<div class="grid grid-cols-[15%_85%] gap-2">
						<div class="bg-gray-5 h-7 w-7 rounded-full p-1 flex justify-center items-center">
							{_data.user.username.slice(0, 1).toUpperCase()}
						</div>
						<div class="flex flex-col">
							<div class="font-bold">{_data.user.username}</div>
							<div class="text-sm text-gray-2">{_data.body}</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/await}

	<hr class="mt-4 mb-6" />

	{#await data.streamed.two}
		<div class=" grid grid-cols-4 gap-4 lt-md:grid-cols-2 lt-sm:grid-cols-1">
			{#each Array(21) as _, i}
				<div class="mb-4">
					<div class="grid grid-cols-[15%_85%] gap-2">
						<div class="animate-pulse bg-gray-6 h-9 w-9 rounded-full" />
						<div class="flex flex-col gap-2 w-full">
							<div class="animate-pulse bg-gray-6 h-5 w-full" />
							<div class="animate-pulse bg-gray-6 h-5 w-full" />
						</div>
					</div>
				</div>
			{/each}
		</div>
	{:then data}
		<div class=" grid grid-cols-4 gap-4 lt-md:grid-cols-2 lt-sm:grid-cols-1">
			{#each data as _data, i}
				<div class="mb-4">
					<div class="grid grid-cols-[15%_85%] gap-2">
						<div class="bg-gray-5 h-7 w-7 rounded-full p-1 flex justify-center items-center">
							{_data.user.username.slice(0, 1).toUpperCase()}
						</div>
						<div class="flex flex-col">
							<div class="font-bold">{_data.user.username}</div>
							<div class="text-sm text-gray-2">{_data.body}</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/await}
</div>

<style></style>
