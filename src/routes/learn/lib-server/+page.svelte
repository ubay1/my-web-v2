<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div>
	{#each data.datas as _data, i}
		{_data.body}
	{/each}
</div>

<style></style>
