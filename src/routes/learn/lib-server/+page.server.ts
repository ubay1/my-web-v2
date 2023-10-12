import type { PageServerLoad } from './$types';
import { getPostDummy } from '$lib/server/test';

export const load: PageServerLoad = async () => {
	const test = await getPostDummy();
	const aa = await test.json();

	return {
		datas: aa
	};
};
