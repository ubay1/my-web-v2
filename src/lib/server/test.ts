/* eslint-disable @typescript-eslint/no-explicit-any */
import { json } from '@sveltejs/kit';

export const getPostDummy = async () => {
	let data: any[] = [];
	try {
		const res = await fetch('https://jsonplaceholder.typicode.com/posts');
		const parse2json = await res.json();
		data = parse2json;
	} catch (error) {
		console.log(error);
	}
	return json(data);
};
