<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		let pres: HTMLCollection = document.getElementsByTagName('pre');
		for (let _ of pres) {
			const pre = _ as HTMLPreElement;

			const text = pre.innerText;

			let divHeader = document.createElement('div');
			divHeader.className = 'bg-black h-15 absolute top-0 w-full flex items-center justify-between';

			const dataTitle = pre.getAttribute('data-code-title');
			let title = document.createElement('div');
			title.innerText = dataTitle as string;
			title.className = 'ml-4 text-sm';

			let copyButton = document.createElement('button');
			copyButton.ariaLabel = 'icon-copy';
			copyButton.className = 'h-10 w-10 mr-4 flex items-center justify-center btn-copy text-white';
			copyButton.innerHTML = `<div class='i-octicon-copy-16'></div>`;

			copyButton.addEventListener('click', () => {
				navigator.clipboard.writeText(text);

				copyButton.disabled = true;
				copyButton.className =
					'h-10 w-10 mr-4 flex items-center justify-center btn-copy text-white p-1 disabled:bg-orange-5 disabled:opacity-100';
				copyButton.innerHTML = `<div class='i-octicon-check-24 p-1'></div>`;

				setTimeout(function () {
					copyButton.className =
						'h-10 w-10 mr-4 flex items-center justify-center btn-copy text-white';
					copyButton.disabled = false;
					copyButton.innerHTML = `<div class='i-octicon-copy-16'></div>`;
				}, 2000);
			});

			pre.appendChild(divHeader);
			divHeader.appendChild(title);
			divHeader.appendChild(copyButton);
		}
	});
</script>

<slot />
