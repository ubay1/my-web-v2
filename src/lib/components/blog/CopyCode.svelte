<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		// will add a children to any <pre> element with class language-*
		let pres: HTMLCollection = document.getElementsByTagName('pre');
		for (let _ of pres) {
			const pre = _ as HTMLPreElement;
			if (![...pre.classList].some((el) => el.startsWith('language-'))) {
				continue;
			}
			const text = pre.innerText;
			let copyButton = document.createElement('button');
			copyButton.addEventListener('click', () => navigator.clipboard.writeText(text));
			copyButton.className = 'absolute top-5 right-5 btn-primary';
			copyButton.innerText = 'Copy';
			pre.appendChild(copyButton);
		}
	});
</script>

<slot />
