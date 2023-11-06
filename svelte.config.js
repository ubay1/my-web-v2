import adapter from '@sveltejs/adapter-auto';
import { mdsvex } from 'mdsvex';
import preprocess from 'svelte-preprocess';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { createHighlighter } from '@bitmachina/highlighter';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md', '.svx'],
	preprocess: [
		mdsvex({
			extensions: ['.md', '.svx'],
			highlight: {
				highlighter: await createHighlighter({ theme: 'github-dark' })
			}
			// layout: 'src/routes/blog/post.svelte'
		}),
		preprocess({
			preserve: ['ld+json']
		}),
		vitePreprocess()
	],
	kit: {
		adapter: adapter()
	}
};

export default config;
