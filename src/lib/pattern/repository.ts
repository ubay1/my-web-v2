interface IPost {
	title: string;
	body: string;
	userId: number;
}

export class FakeRepository {
	public async create(body: IPost) {
		const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		});
		const json = await res.json();

		return json;
	}

	public async read() {
		const res = await fetch('https://jsonplaceholder.typicode.com/posts');
		const json = await res.json();

		return json;
	}

	public async update(body: IPost) {
		const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
			method: 'PUT',
			body: JSON.stringify(body),
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		});
		const json = await res.json();

		return json;
	}

	public async delete() {
		const res = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
			method: 'DELETE'
		});
		const json = await res.json();

		return json;
	}
}
