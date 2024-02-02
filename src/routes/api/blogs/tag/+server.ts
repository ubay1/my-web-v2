import type { IFetchBlog } from '$lib/types/fetchBlog';
import { fetchBlogWithTags } from '$lib/utils/fetchBlog';
import { json } from '@sveltejs/kit';

export const GET = async () => {
	const filterPosts = await fetchBlogWithTags();

	const sortedPosts = filterPosts.sort((a: IFetchBlog, b: IFetchBlog) => {
		return new Date(b.meta.date).valueOf() - new Date(a.meta.date).valueOf();
	});

	return json(sortedPosts);
};
