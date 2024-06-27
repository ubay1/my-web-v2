<script lang="ts">
	import '$lib/assets/css/prism.css';
	import { formatDate } from '$lib/utils/format';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import ImageLoader from '$lib/components/common/image/ImageLoader.svelte';
	import { afterNavigate } from '$app/navigation';
	export let data: PageData;

	afterNavigate(() => {
		for (let node of document.querySelectorAll('pre')) {
			const text = node.innerText;
			let divHeader = document.createElement('div');
			divHeader.className =
				'bg-transparent h-15 absolute right-0 top-0 flex items-center justify-between';
			const dataTitle = node.getAttribute('data-code-title');
			let title = document.createElement('div');
			title.innerText = dataTitle as string;
			title.className = 'ml-4 text-sm';
			let copyButton = document.createElement('button');
			copyButton.ariaLabel = 'icon-copy';
			copyButton.className = 'h-10 w-14 mr-4 flex items-center justify-center btn-copy text-white';
			copyButton.innerHTML = `<div>Copy</div>`;
			copyButton.addEventListener('click', () => {
				navigator.clipboard.writeText(text);
				copyButton.disabled = true;
				copyButton.className =
					'h-10 w-14 mr-4 flex items-center justify-center btn-copy text-white p-1 disabled:bg-orange-5 disabled:opacity-100';
				copyButton.innerHTML = `<div>Copied</div>`;
				setTimeout(function () {
					copyButton.className =
						'h-10 w-14 mr-4 flex items-center justify-center btn-copy text-white';
					copyButton.disabled = false;
					copyButton.innerHTML = `<div>Copy</div>`;
				}, 2000);
			});
			node.appendChild(divHeader);
			divHeader.appendChild(title);
			divHeader.appendChild(copyButton);
		}
	});

	onMount(() => {
		// memberikan spasi pada code
		const elem: any = document.querySelectorAll('pre.shiki');

		for (const v of elem) {
			const span: any = v as HTMLPreElement;

			if (span?.childNodes.length > 0) {
				span.classList.add('relative');
			}
		}

		let divv = document.createElement('br');
		divv.className = 'my-4';
	});
</script>

<div class="p-0 bg-white max-w-4xl m-auto h-56 md:h-72 relative dark:bg-githubDark-1 lt-lg:p-0">
	<ImageLoader
		src={data.imagePath}
		classes="w-full h-full aspect-video object-cover brightness-30"
		alt="img-banner"
		classIntersect="h-56 md:h-72"
	/>
	<div class="absolute top-0 flex justify-center items-center h-full w-full">
		<div
			class="text-3xl z-40 line-clamp-2 font-bold text-center text-white"
			style:--tag="h-{data.viewTransitionName ?? data.title}"
		>
			{data.title}
		</div>
	</div>
	<div class="absolute bottom-2 right-2 md:right-4">
		<h2 class="text-xs italic text-white">
			Diterbitkan: {formatDate(data.date)}
		</h2>
	</div>
</div>

<div
	class="p-2 max-w-4xl m-auto prose prose-hr:mt-4 prose-hr:mb-4 prose-h2:mb-2 prose-h2:mt-2 prose-ol:mt-0 prose-a:text-black prose-p:my-0 dark:bg-githubDark-1 dark:prose-h2:text-white dark:text-white dark:prose-blockquote:text-white dark:prose-ol:text-white dark:prose-p:text-white dark:prose-a:text-white"
>
	<svelte:component this={data.content} />
</div>
