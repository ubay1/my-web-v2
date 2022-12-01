// @ts-nocheck
export const load = async ({ fetch }) => {
	const response = await fetch(`/api/blog/tag`);
	const posts = await response.json();

	let tagsSet = new Set();
	posts.forEach((post) => {
		if (post.meta.tags) {
			const tagsArray = post.meta.tags;
			tagsArray.forEach((tag) => {
				tagsSet.add(tag);
			});
		}
	});

	const allTags = Array.from(tagsSet);

	return {
		allTags
	};
};
