/* eslint-disable no-unused-vars */
// @ts-nocheck
import { fetchBlogWithTags } from '$lib/utils/fetchBlog';
import { json } from '@sveltejs/kit';

export const GET = async (event) => {
	const filterPosts = await fetchBlogWithTags();

	const sortedPosts = filterPosts.sort((a, b) => {
		return new Date(b.meta.date) - new Date(a.meta.date);
	});

	return json(sortedPosts);
};
