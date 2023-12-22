<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let type = '';
	export let title = '';
	export let message = '';
	function onCLose() {
		dispatch('close');
	}

	let ref_wrapper_toast: any;

	$: compHeaderType =
		type === 'danger'
			? 'bg-[#f9dadd] text-[#721c24]'
			: type === 'warning'
			? 'bg-[#fff4d0] text-[#856404]'
			: 'bg-[#d6efdd] text-[#1c5d2b]';
	$: compMessageType =
		type === 'danger'
			? 'bg-[#fcedee] text-[#8b4249]'
			: type === 'warning'
			? 'bg-[#fff9e7] text-[#997d2a]'
			: 'bg-[#e6f5e9] text-[#2b6839]';

	onMount(() => {
		ref_wrapper_toast.classList.add('show');
		setTimeout(() => {
			ref_wrapper_toast.classList.remove('show');
			onCLose();
		}, 3000);

		// return () => {}; // fungsi ini sama dengan onDestroy
	});

	onDestroy(() => {
		console.log('onDestory toast run');
		clearTimeout(ref_wrapper_toast);
	});
</script>

<div class="wrapper-toast" bind:this={ref_wrapper_toast}>
	<div class="headerToast {compHeaderType}">
		{title}
	</div>
	<div class="messageToast {compMessageType}">
		{message}
	</div>
</div>

<style scoped>
	.wrapper-toast {
		/* visibility: hidden; */
		display: none;
		margin-left: -125px;
		border-radius: 2px;
		position: fixed;
		z-index: 100;
		top: 5%;
		right: 30px;
		text-align: center;
		width: 300px;
	}
	.show {
		/* visibility: visible; */
		display: block;
		animation: fadein 0.5s, fadeout 0.5s 2.5s;
	}

	.headerToast {
		border-radius: 5px 5px 0px 0px;
		padding: 5px;
		font-weight: bold;
	}
	.messageToast {
		border-radius: 0px 0px 5px 5px;
		padding: 10px;
	}

	@-webkit-keyframes fadein {
		from {
			right: 0;
			opacity: 0;
		}
		to {
			right: 30px;
			opacity: 1;
		}
	}

	@keyframes fadein {
		from {
			right: 0;
			opacity: 0;
		}
		to {
			right: 30px;
			opacity: 1;
		}
	}

	@-webkit-keyframes fadeout {
		from {
			right: 30px;
			opacity: 1;
		}
		to {
			right: 0;
			opacity: 0;
		}
	}

	@keyframes fadeout {
		from {
			right: 30px;
			opacity: 1;
		}
		to {
			right: 0;
			opacity: 0;
		}
	}
</style>
