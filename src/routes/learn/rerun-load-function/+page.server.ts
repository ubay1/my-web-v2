import type { PageServerLoad } from './$types';
import { setTimeout } from 'timers/promises';

export const load: PageServerLoad = ({ fetch, depends }) => {
	// rerun fetch  ketika `invalidate('generate-image')` dipanggil pada file.svelte
	depends('generate-image');

	async function testRerun() {
		const response = await fetch(
			'https://random.imagecdn.app/v1/image?width=150&height=150&format=json'
		);
		await setTimeout(10);
		return await response.json();
	}

	return {
		streamed: {
			image: testRerun()
		}
	};
};
