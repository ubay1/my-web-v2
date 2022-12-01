/* eslint-disable no-unused-vars */
// @ts-nocheck

export const fetchAllBlog = async () => {
	const PER_PAGE = 10;

	const allPostFiles = import.meta.glob('/src/routes/blog/contents/*.md');
	const iterablePostFiles = Object.entries(allPostFiles);

	return await Promise.all(
		iterablePostFiles.map(async ([path, dataFile]) => {
			const { metadata } = await dataFile(); // isi dari file path
			const postPath = path.slice(11, -3); // /blog/tayamum

			return {
				meta: metadata,
				path: postPath
			};
		})
	);
};

export const fetchBlogWithFilter = async (search, page) => {
	const searchs = (search && search.toLowerCase()) || search;
	const allPostFiles = import.meta.glob('/src/routes/blog/contents/*.md');
	const iterablePostFiles = Object.entries(allPostFiles);

	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([path, dataFile]) => {
			const { metadata } = await dataFile();
			const postPath = path.slice(11, -3);

			return {
				meta: metadata,
				path: postPath
			};
		})
	);

	const tempPosts = [];
	allPosts.forEach((item) => {
		if (![null, '', undefined].includes(searchs)) {
			if (item.meta.title.toLowerCase().search(searchs) !== -1) {
				tempPosts.push(item);
			}
		}
	});

	const finalPosts = tempPosts;

	return finalPosts;
};

export const fetchBlogWithTags = async () => {
	const allPostFiles = import.meta.glob('/src/routes/blog/contents/*.md');
	const iterablePostFiles = Object.entries(allPostFiles);

	return await Promise.all(
		iterablePostFiles.map(async ([path, dataFile]) => {
			const { metadata } = await dataFile();
			const postPath = path.slice(11, -3);

			return {
				meta: metadata,
				path: postPath
			};
		})
	);
};

export const fetchBlogForSitemap = async () => {
	const allPostFiles = import.meta.glob('/src/routes/blog/contents/*.md');
	const iterablePostFiles = Object.entries(allPostFiles);

	const posts = await Promise.all(
		iterablePostFiles.map(async ([path, dataFile]) => {
			const { metadata } = await dataFile();
			const postPath = path.slice(11, -3);

			return {
				meta: metadata,
				path: postPath
			};
		})
	);

	return posts;
};
