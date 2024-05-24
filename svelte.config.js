import adapter from '@sveltejs/adapter-auto';
import { mdsvex } from 'mdsvex';
import preprocess from 'svelte-preprocess';
import { vitePreprocess } from '@sveltejs/kit/vite';
import * as shiki from 'shikiji';
import { rendererRich, transformerTwoslash } from 'shikiji-twoslash';
// import { createHighlighter } from '@bitmachina/highlighter';

function escapeHtml(code) {
	return code.replace(
		/[{}`]/g,
		(character) => ({ '{': '&lbrace;', '}': '&rbrace;', '`': '&grave;' }[character])
	);
}

const shikis = await shiki.getHighlighter({
	themes: ['dark-plus', 'vitesse-dark'],
	langs: ['typescript', 'javascript', 'vue', 'svelte']
});
async function highlighter(code, lang) {
	const html = shikis.codeToHtml(code, {
		lang,
		themes: {
			light: 'dark-plus',
			dark: 'vitesse-dark'
		},
		transformers: [
			transformerTwoslash({
				renderer: rendererRich(),
				explicitTrigger: false
			})
		]
	});
	return escapeHtml(html);
}

const config = {
	extensions: ['.svelte', '.md', '.svx'],
	preprocess: [
		mdsvex({
			extensions: ['.md', '.svx'],
			highlight: {
				highlighter
			}
			// remarkPlugins: [remarkContainers, remarkGfm]
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
