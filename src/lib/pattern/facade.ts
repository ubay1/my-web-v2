export class Operations {
	private num1: number;
	private num2: number;

	constructor(_num1: number, _num2: number) {
		this.num1 = _num1;
		this.num2 = _num2;
	}

	public summarization(): number {
		return this.num1 + this.num2;
	}
	public reduction(): number {
		return this.num1 - this.num2;
	}
	public multiplication(): number {
		return this.num1 * this.num2;
	}
	public division(): number {
		return this.num1 / this.num2;
	}
}
