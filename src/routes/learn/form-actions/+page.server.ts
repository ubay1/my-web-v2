import type { Actions } from '../$types';

export const actions: Actions = {
	test: async ({ request }) => {
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');

		return {
			formdata: {
				username,
				password
			}
		};
	}
};
