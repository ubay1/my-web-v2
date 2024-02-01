export class Car {
	public merk: string;
	public color: string;

	constructor(merk: string, color: string) {
		this.merk = merk;
		this.color = color;
	}

	clone(): this {
		const clone = Object.assign({}, this);
		return clone;
	}
}
