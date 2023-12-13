<script lang="ts">
	const classCard = 'border border-solid border-gray-6 break-inside-avoid p-2 mb-4 rounded-md';
	const classTitle = 'font-bold text-3xl mb-2';

	// state
	let state: string | null = 'akoh';

	// @html
	let tagHtml: string | null =
		'<div class="text-orange-5 font-bold"> menampilkan tag @html dari string </div>';

	// reactivity
	let countReactivity: number = 0;
	$: computedCountReactivity = countReactivity * 2;
	$: if (countReactivity > 5) {
		alert('tidak bisa melebihi 5x klik');
		countReactivity = 5;
	}
</script>

<div class="text-white p-4 columns-1 sm:columns-2 md:columns-3 gap-4 p-4 mb-4">
	<div class={classCard}>
		<div class={classTitle}>State</div>
		<div>state a = <b>{state}</b></div>
		<button class="btn-primary" on:click={() => (state = 'kamoh')}>ganti ke kamoh</button>
	</div>

	<div class={classCard}>
		<div class={classTitle}>Tag @html</div>
		{@html tagHtml}
	</div>

	<div class={classCard}>
		<div class={classTitle}>Reactivity ($:)</div>
		<div>
			Reactivity disvelte menggunakan simbol $: simbol ini mirip seperti watch & computed punyanya
			vuejs. kerennya disvelte cuma satu simbol ini bisa untuk computed & watch
		</div>
		<div class="mt-4">count: {countReactivity}</div>
		<div>computed count: {computedCountReactivity}</div>
		<button class="btn-primary" on:click={() => (countReactivity += 1)}>Add +1</button>
	</div>
</div>
