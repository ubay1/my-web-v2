import type { IFetchBlog } from "$lib/types/IFetchBlog";
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	const response = await fetch(`/api/blogs/tag`);
	const posts = await response.json();

	let tagsSet = new Set();
	posts.forEach((post: IFetchBlog) => {
		if (post.meta.tags) {
			const tagsArray = post.meta.tags;
			tagsArray.forEach((tag: string) => {
				tagsSet.add(tag);
			});
		}
	});

	const allTags = Array.from(tagsSet);

	return {
		allTags: allTags
	};
}) satisfies PageLoad;
