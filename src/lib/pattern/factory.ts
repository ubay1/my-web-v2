interface Logistic {
	qty: number;
	delivery(): void;
}

class Truck implements Logistic {
	constructor(public qty: number) {
		this.delivery();
	}
	delivery(): void {
		console.log(`truk membawa ${this.qty} barang`);
	}
}

class Ship implements Logistic {
	constructor(public qty: number) {
		this.delivery();
	}
	delivery(): void {
		console.log(`kapal membawa ${this.qty} barang`);
	}
}

type LogisticType = {
	type: 'delivery_by_land' | 'delivery_by_sea';
	qty: number;
};
interface Factory {
	create(options: LogisticType): Logistic;
}
export class LogisticDelivery implements Factory {
	public create(options: LogisticType): Logistic {
		if (options.type === 'delivery_by_land') {
			return new Truck(options.qty);
		} else if (options.type === 'delivery_by_sea') {
			return new Ship(options.qty);
		}

		throw new Error('class tidak tersedia');
	}
}
