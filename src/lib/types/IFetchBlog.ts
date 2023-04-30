export interface IFetchBlog {
  path?: string;
  meta: {
    title: string;
    description: string;
    imagePath: string;
    imageAlt: string;
    date: string;
    tags: string[];
  };
}
