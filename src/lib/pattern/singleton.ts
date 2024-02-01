export class Profile {
	private static instance: Profile;
	private firstName: string = '';
	private lastName: string = '';

	public static getInstance(): Profile {
		// jika belum pernah di instansiasi, buat object baru dari class Profile
		if (!Profile.instance) {
			Profile.instance = new Profile();
		}

		// jika sudah pernah, langsung balikan saja
		return Profile.instance;
	}

	public getFullName(): string {
		// akses db, select user * from ..
		this.firstName = 'ubay';
		this.lastName = 'dillah';

		return `nama saya adalah ${this.firstName} ${this.lastName}`;
	}
}

export class TanpaSingleton {
	private firstName: string = '';
	private age: number = 0;

	public getFullName(): string {
		// akses db, select user * from ..
		const data = { name: 'ubay', age: 19 };
		this.firstName = data.name;
		this.age = data.age;

		return `nama saya adalah ${this.firstName} dan umur saya ${this.age}`;
	}
}
