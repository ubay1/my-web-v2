export interface IFetchBlog {
	meta: {
		title: string;
		description: string;
		imagePath: string;
		imageAlt: string;
		date: string;
		tags: string[];
	};
}
