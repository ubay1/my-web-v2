import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch }) => {
	const res = await fetch('https://dummyjson.com/quotes?limit=5', { method: 'GET' });
	const dataJson = await res.json();

	return dataJson;
};
