/* eslint-disable no-unused-vars */
// @ts-nocheck
import { fetchBlogWithFilter, fetchAllBlog } from '$lib/utils/fetchBlog';
import { json } from '@sveltejs/kit';

export const GET = async () => {
	const dataPosts = await fetchAllBlog();

	const sortedPosts = dataPosts.sort((a, b) => {
		return new Date(b.meta.date) - new Date(a.meta.date);
	});

	return json(sortedPosts);
};

export const POST = async (event) => {
	const valueSearch = await event.request.json();
	const filterPosts = await fetchBlogWithFilter(valueSearch, 1);

	const sortedPosts = filterPosts.sort((a, b) => {
		return new Date(b.meta.date) - new Date(a.meta.date);
	});

	return json(sortedPosts);
};
