<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		// will add a children to any <pre> element with class language-*
		let pres: HTMLCollection = document.getElementsByTagName('pre');
		for (let _ of pres) {
			const pre = _ as HTMLPreElement;

			const text = pre.innerText;
			let copyButton = document.createElement('button');
			copyButton.className = 'absolute top-2 right-2 btn-copy text-white';
			copyButton.innerHTML = `<div class='i-octicon-copy-16'></div>`;

			copyButton.addEventListener('click', () => {
				navigator.clipboard.writeText(text);
				copyButton.disabled = true;
				copyButton.className =
					'absolute top-2 right-2 btn-copy text-white p-1 disabled:bg-orange-5 disabled:opacity-100';
				copyButton.innerHTML = `<div class='i-octicon-check-24 p-1'></div>`;

				setTimeout(function () {
					copyButton.className = 'absolute top-2 right-2 btn-copy text-white';
					copyButton.disabled = false;
					copyButton.innerHTML = `<div class='i-octicon-copy-16'></div>`;
				}, 2000);
			});
			pre.appendChild(copyButton);
		}
	});
</script>

<slot />
