import adapter from '@sveltejs/adapter-vercel';
import { mdsvex } from 'mdsvex';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md', '.svx'],
	preprocess: [
		mdsvex({
			extensions: ['.md', '.svx']
			// layout: 'src/routes/blog/post.svelte'
		}),
		preprocess({
			preserve: ['ld+json']
		})
	],
	kit: {
		adapter: adapter()
	}
};

export default config;
