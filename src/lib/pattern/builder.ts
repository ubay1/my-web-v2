class User {
	public name: string = '';
	public age: string = '';
	public address: string | undefined = undefined;
}

export class UserBuilder {
	private user: User;

	constructor() {
		this.user = new User();
	}

	setName(value: string) {
		this.user.name = value;
		return this;
	}
	setAge(value: string) {
		this.user.age = value;
		return this;
	}
	setAddress(value: string) {
		this.user.address = value;
		return this;
	}

	build() {
		return this.user;
	}
}
