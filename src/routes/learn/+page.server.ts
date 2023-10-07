import type { PageServerLoad } from './$types';
import { setTimeout } from 'timers/promises';

async function getMock1() {
	const res = await fetch('https://dummyjson.com/comments');
	const json = await res.json();
	await setTimeout(100);
	return json.comments;
}

async function getMock2() {
	const res = await fetch(`https://dummyjson.com/comments`);
	const postData = await res.json();
	await setTimeout(3000);
	return postData.comments;
}

export const load: PageServerLoad = async () => {
	return {
		streamed: {
			one: getMock1(),
			two: getMock2()
		}
	};
};
