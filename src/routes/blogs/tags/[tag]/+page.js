// @ts-nocheck
export const load = async ({ fetch, params }) => {
	const { tag } = params;
	const response = await fetch(`/api/blogs/tag`);
	const allPosts = await response.json();

	const posts = allPosts.filter((post) => post.meta.tags.includes(tag));

	return {
		tag,
		posts
	};
};
