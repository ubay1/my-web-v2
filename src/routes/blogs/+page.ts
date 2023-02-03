import type { IFetchBlog } from '$lib/types/fetchBlog';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	const apiPostsResponse = await fetch(`/api/blogs`);
	const dataPosts = await apiPostsResponse.json();
	const posts: IFetchBlog[] = dataPosts;

	return {
		posts
	};
}) satisfies PageLoad;
