import ContactEmail from '$lib/components/ContactEmail.svelte';
import type { RequestEvent } from '@sveltejs/kit';
import { render } from 'svelte-email';

export const authenticateUser = async (event: RequestEvent) => {
	console.log('event lib/server = ', event);

	const html = await render({
		template: ContactEmail,
		props: {
			firstName: 'John'
		}
	});

	return {
		html
	};
};
