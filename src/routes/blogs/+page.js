// @ts-nocheck
export const load = async ({ fetch }) => {
	const apiPostsResponse = await fetch(`/api/blogs`);
	const dataPosts = await apiPostsResponse.json();
	const posts = dataPosts;

	return {
		posts
	};
};