import adapter from '@sveltejs/adapter-auto';
import { mdsvex } from 'mdsvex';
import preprocess from 'svelte-preprocess';
import { vitePreprocess } from '@sveltejs/kit/vite';
import * as shiki from 'shikiji';
import { codeToHtml } from 'shiki';
import {
	transformerNotationHighlight,
	// transformerMetaHighlight,
	// transformerMetaWordHighlight,
	transformerNotationDiff,
	transformerNotationFocus,
	transformerCompactLineOptions,
	transformerNotationWordHighlight,
	transformerNotationErrorLevel,
	transformerRenderWhitespace,
	transformerRemoveNotationEscape
} from '@shikijs/transformers';
import { rendererRich, transformerTwoslash } from 'shikiji-twoslash';
// import { createHighlighter } from '@bitmachina/highlighter';

function escapeHtml(html) {
	return html.replace(
		/[{}`]/g,
		(character) => ({ '{': '&lbrace;', '}': '&rbrace;', '`': '&grave;' }[character])
	);
}

const shikis = await shiki.getHighlighter({
	themes: ['dark-plus', 'github-dark'],
	langs: ['typescript', 'javascript', 'vue', 'svelte', 'tsx']
});
async function highlighter(code, lang) {
	const html = await codeToHtml(code, {
		lang,
		themes: {
			light: 'dark-plus',
			dark: 'slack-dark'
		},
		transformers: [
			transformerNotationDiff(),
			transformerNotationHighlight(),
			transformerNotationWordHighlight(),
			transformerNotationErrorLevel(),
			transformerRenderWhitespace(),
			transformerNotationFocus(),
			transformerCompactLineOptions(),
			transformerRemoveNotationEscape(),
			transformerTwoslash({
				renderer: rendererRich(),
				explicitTrigger: false,
				langs: ['ts'] // twoslash akan aktif hanya pada extension ini aja,
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
