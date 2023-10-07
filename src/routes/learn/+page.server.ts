import type { PageServerLoad } from './$types';
import { setTimeout } from 'timers/promises';

async function getMock1() {
	const res = await fetch('https://dummyjson.com/comments');
	const json = await res.json();
	await setTimeout(100);
	return json.comments;
}

async function getMock2() {
	const res = await fetch(`https://dummyjson.com/posts?limit=${5}`);
	const postData = await res.json();
	await setTimeout(3000);
	return postData.posts;
}

export const load: PageServerLoad = async () => {
	return {
		streamed: {
			one: getMock1(),
			two: getMock2()
		}
		// streamed: {
		// 	three: new Promise((resolve) => {
		// 		setTimeout(() => {
		// 			resolve(3);
		// 		}, 1000);
		// 	})
		// }
	};
};
