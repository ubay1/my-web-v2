import { unified } from 'unified';
import { stream } from 'unified-stream';
import remarkParse from 'remark-parse';
import remarkSlug from 'remark-slug';
import remarkRehype from 'remark-rehype';
import type { Compatible } from 'vfile';
import rehypeStringify from 'rehype-stringify';
import remarkToc from 'remark-toc';
import rehypeDocument from 'rehype-document';
import rehypeShiki from '@shikijs/rehype';
import { transformerMetaHighlight } from '@shikijs/transformers';

export const toHTML = (content: Compatible | undefined) =>
	unified()
		.use(remarkParse)
		.use(remarkRehype)
		.use(remarkToc)
		.use(remarkRehype)
		.use(rehypeDocument, { title: 'Contents' })
		.use(rehypeShiki, {
			langs: ['markdown', 'javascript', 'typescript', 'css'],
			themes: {
				light: 'andromeeda',
				dark: 'slack-dark'
			},
			transformers: [transformerMetaHighlight()]
		})
		.use(rehypeStringify)
		.process(content);

// .use(rehypePrettyCode, {
// 	theme: 'rose-pine',
// 	transformers: [
// 		transformerCopyButton({
// 			visibility: 'always',
// 			feedbackDuration: 2_500
// 		}),
// 		transformerFoldableLines({
// 			lines: [[1, 2]]
// 		})
// 	]
// })
