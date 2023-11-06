<script lang="ts">
	let a: string | null = 'akoh';
</script>

<div class="text-white p-4">
	<div class="font-bold text-3xl underline mb-2">State</div>
	<div>state a = <b>{a}</b></div>
	<button class="btn-primary" on:click={() => (a = 'kamoh')}>ganti ke kamoh</button>
</div>
