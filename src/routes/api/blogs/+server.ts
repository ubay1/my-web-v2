import type { IFetchBlog } from '$lib/types/fetchBlog';
import { fetchBlogWithFilter, fetchAllBlog } from '$lib/utils/fetchBlog';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const dataPosts = await fetchAllBlog();

	const sortedPosts = dataPosts.sort((a: IFetchBlog, b: IFetchBlog) => {
		return new Date(b.meta.date).valueOf() - new Date(a.meta.date).valueOf();
	});

	return json(sortedPosts);
};

export const POST: RequestHandler = async (event) => {
	const valueSearch = await event.request.json();
	const filterPosts = await fetchBlogWithFilter(valueSearch);

	const sortedPosts = filterPosts.sort((a: IFetchBlog, b: IFetchBlog) => {
		return new Date(b.meta.date).valueOf() - new Date(a.meta.date).valueOf();
	});

	return json(sortedPosts);
};
