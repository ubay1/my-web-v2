/* eslint-disable @typescript-eslint/no-explicit-any */
export const fetchAllBlog = async () => {
	const allPostFiles = import.meta.glob('/src/routes/blogs/contents/*.md');
	const iterablePostFiles = Object.entries(allPostFiles);

	return await Promise.all(
		iterablePostFiles.map(async ([path, dataFile]) => {
			const { metadata }: any = await dataFile(); // isi dari file path
			const postPath: string = path.slice(11, -3); // /blog/tayamum

			return {
				meta: metadata,
				path: postPath
			};
		})
	);
};

export const fetchBlogWithFilter = async (search: string) => {
	const searchs = (search && search.toLowerCase()) || search;
	const allPostFiles = import.meta.glob('/src/routes/blogs/contents/*.md');
	const iterablePostFiles = Object.entries(allPostFiles);

	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([path, dataFile]) => {
			const { metadata }: any = await dataFile();
			const postPath: string = path.slice(11, -3);

			return {
				meta: metadata,
				path: postPath
			};
		})
	);

	const tempPosts: any[] = [];
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
	const allPostFiles = import.meta.glob('/src/routes/blogs/contents/*.md');
	const iterablePostFiles = Object.entries(allPostFiles);

	return await Promise.all(
		iterablePostFiles.map(async ([path, dataFile]) => {
			const { metadata }: any = await dataFile();
			const postPath: string = path.slice(11, -3);

			return {
				meta: metadata,
				path: postPath
			};
		})
	);
};

export const fetchBlogForSitemap = async () => {
	const allPostFiles = import.meta.glob('/src/routes/blogs/contents/*.md');
	const iterablePostFiles = Object.entries(allPostFiles);

	const posts = await Promise.all(
		iterablePostFiles.map(async ([path, dataFile]) => {
			const { metadata }: any = await dataFile();
			const postPath: string = path.slice(11, -3);

			return {
				meta: metadata,
				path: postPath
			};
		})
	);

	return posts;
};
