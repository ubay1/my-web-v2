import type { IFetchBlog } from '$lib/types/fetchBlog';
import type { PageLoad } from './$types';

export const load = (async ({ fetch, params }) => {
	const { tag } = params;
	const response = await fetch(`/api/blogs/tag`);
	const allPosts = await response.json();

	const posts = allPosts.filter((post: IFetchBlog) => post.meta.tags.includes(tag));

	return {
		tag,
		posts
	};
}) satisfies PageLoad;
