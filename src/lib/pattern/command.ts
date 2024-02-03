interface IUser {
	deleteUserById(id: number): void;
	check(userId: number): boolean;
}
interface IProduct {
	deleteProductById(id: number): void;
	check(userId: number): boolean;
}
interface DeleteCommand {
	execute(userId: number): void;
}

export class UserImpl implements IUser {
	deleteUserById(id: number): void {
		console.log('sukses delete data user dengan id = ', id);
	}
	check(userId: number): boolean {
		return userId === 1 ? true : false;
	}
}
export class UserDeleteCommand implements DeleteCommand {
	constructor(private repository: IUser) {}

	public execute(userId: number) {
		if (this.repository.check(userId)) {
			this.repository.deleteUserById(userId);
		}
	}
}

export class ProductImpl implements IProduct {
	deleteProductById(id: number): void {
		console.log('sukses delete data product dengan id = ', id);
	}
	check(userId: number): boolean {
		return userId === 1 ? true : false;
	}
}
export class ProductDeleteCommand implements DeleteCommand {
	constructor(private repository: IProduct) {}

	public execute(userId: number) {
		if (this.repository.check(userId)) {
			this.repository.deleteProductById(userId);
		}
	}
}
