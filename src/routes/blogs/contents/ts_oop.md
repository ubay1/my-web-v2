---
title: OOP pada Typescript
description: Belajar OOP yang ada pada typescript
imagePath: https://miro.medium.com/max/1400/1*kIccf4SUwLmavuqDgjYlZA.jpeg
imageAlt: ts
viewTransitionName: 'ts-oop'
date: 2022-12-03 07:10
tags:
  - typescript
---

## Perkenalan OOP

Class adalah cetak biru atau blueprint dari object. Class digunakan hanya untuk membuat kerangka dasar. Yang akan kita pakai nanti adalah hasil cetakan dari class, yakni object.
yang harus kita ketahui dari class:

- property, property ini mirip seperti variabel namun tanpa variabel let/const hanya identifier aja.
- cosntructor, constructor ini adalah method yang selalu dipanggil pertama ketika sebuah object dibuat.
- method, method ini mirip seperti function, tapi tanpa kalimat **function**.

```ts twoslash
class Manusia {
	nama: string = ''; // property
	umur: number = 0;

	constructor() {
		console.log('test constructor');
	}

	// method
	getManusia(): string {
		return `nama = ${this.nama}, umur = ${this.umur}`;
	}
}
// identifier manusia adalah object yang terbentuk
// dari class Manusia
const manusia = new Manusia();
manusia.nama = 'ubay';
manusia.umur = 27;
console.log(manusia.getManusia());
```

## constructor shorthand

```ts twoslash
class Manusia1 {
	constructor(public nama: string, public umur: number) {
		this.getManusia();
	}

	getManusia(): string {
		return `nama = ${this.nama}, umur = ${this.umur}`;
	}
}
const manusia1 = new Manusia1('khansa', 3);
console.log(manusia1.getManusia());
// output: nama = khansa, umur = 3
```

## private, protected, public property & read only property

- private hanya bisa diakses oleh class parent saja.
- protected bisa diakses oleh parent dan turunannya.
- public bisa diakses dimana saja.

```ts twoslash
class Manusia2 {
	private anak: string[] = [];

	constructor(public nama: string, public readonly umur: number) {}

	addAnak(anak: string): void {
		this.anak.push(anak);
	}

	getManusia(): string {
		return `nama = ${this.nama}, umur = ${this.umur}, anak = ${this.anak}`;
	}
}
const manusia2 = new Manusia2('umma', 25);
manusia2.addAnak('khansa');
manusia2.addAnak('abdillah');

manusia2.nama = 'mutiara'; // bisa ubah dari luar class karna propertynya public
// manusia2.umur = 24; // error gak bisa ubah karena menggunakan propertynya readonly
// manusia2.anak[1] = "khalid" // error gak bisa ubah dari luar class karena propertynya private
console.log(manusia2.getManusia());
```

## inheritance, super constructor, method overriding

```ts twoslash
class Manusia3 {
	private anak: string[] = [];

	constructor(public nama: string, public readonly umur: number) {}

	addAnak(anak: string): void {
		this.anak.push(anak);
	}

	getManusia(): string {
		return `nama = ${this.nama}, umur = ${this.umur}, anak = ${this.anak}`;
	}
}

class Manusia3a extends Manusia3 {
	// super constructor kegunaannya untuk memeanggil constructor parent.
	// dan super constructor ini wajib dipanggil jika kita menggunakan constructor di class child.
	constructor(nama: string, umur: number, public berambut: boolean) {
		super(nama, umur);
	}

	// method overriding artinya merubah method milik parent. dan menjalankan yang di child.
	getManusia(): string {
		return `nama = ${this.nama}, umur = ${this.umur}, berambut = ${this.berambut}`;
	}
}
const manusia3a = new Manusia3a('Jeff', 39, true);
manusia3a.addAnak('alice');
console.log(manusia3a.getManusia());
```

## Getter & Setter

- dipakai untuk mengisi dan mengambil nilai property.
- cara ini bisa digunakan jika ingin mangakses property yang private/protected.

```ts twoslash
class Manusia4 {
	private _alamat: string = '';
	private _pasangan: string = '';

	get alamat(): string {
		return this._alamat;
	}
	set alamat(val: string) {
		this._alamat = val;
	}
	get pasangan(): string {
		return this._pasangan;
	}
	set pasangan(val: string) {
		this._pasangan = val;
	}
}
const manusia4 = new Manusia4();
manusia4.alamat = 'bekasi';
manusia4.pasangan = 'unknown';
console.log(manusia4.alamat + ' - ' + manusia4.pasangan);
```

## Static property & method

- static property & method yaitu property dan method yang menyatu dengan class itu sendiri.
- jadi bukan pada objek yang akan menginstance class ini.
- pada method tidak bisa mengakses propertynya dengan this, kecuali methodnya static karena masih dalam 1 linkgup static.
- dengan property biasa jika kita ingin mengambil data dari property maka kita harus buat objek dan mengintance classnya terlebih dahulu.
- sedangkan jika dengan static, kita langsung akses nama classnya dan nama property/methodnya.

```ts twoslash
class Manusia5 {
	private static _nama: string = 'rich';
	public static _umur: number = 35;

	get nama(): string {
		return Manusia5._nama;
	}
	set nama(val: string) {
		Manusia5._nama = val;
	}

	static getProfil(): string {
		return `nama = ${this._nama}, umur = ${this._umur}`;
	}
}

const manusia5 = new Manusia5();
manusia5.nama = 'harris';
Manusia5._umur = 39;
console.log(Manusia5.getProfil());
```

## Abstract class

- sebuah class yang tidak bisa di instance secara langsung.
- wajib mempunyai setidaknya 1 abstract method.
- bagi class turunannya wajib membuat 1 method dengan nama yang sama seperti abstract method pada parentnya.

```ts twoslash
abstract class Manusia6 {
	constructor(protected nama: string, protected umur: number) {}

	makan(): void {
		console.log(`${this.nama} sedang makan`);
	}

	// karna tiap manusia bekerjanya beda", maka kita buat abstract.
	// ada yang menjadi programmer, designer, dll.
	abstract bekerja(): void;
}

class Manusia6a extends Manusia6 {
	constructor() {
		super('kong daim', 65);
	}

	bekerja(): void {
		console.log(`${this.nama} bekerja sebagai petani`);
	}
}

class Manusia6b extends Manusia6 {
	constructor() {
		super('bang mandra', 65);
	}

	bekerja(): void {
		console.log(`${this.nama} bekerja sebagai oplet`);
	}
}

const manusia6a = new Manusia6a();
manusia6a.bekerja();
const manusia6b = new Manusia6b();
manusia6b.bekerja();
```

## Singleton pattern & private constructor

- ketika kita membuat constructor menjadi private, maka kita hanya bisa mengaksesnya didalam class itu saja.

```ts twoslash
class SingletonPattern {
	private static instance: SingletonPattern;
	private constructor(public nama: string) {}

	// method ini untuk mengecek apakah kita sudah memiliki instance dari class ini.
	// jika belum kita akan mengembalikan instance baru.
	static getInstance(nama: string): SingletonPattern {
		if (this.instance) {
			return this.instance;
		} else {
			return (this.instance = new SingletonPattern(nama));
		}
	}
}
const manusia7 = SingletonPattern.getInstance('bang kis');
console.log(manusia7.nama);
```

## Interface pada class dengan implements dan readonly pada interface

- readonly membuat kita tidak bisa mengubah nilai dari property interface. kita hanya bisa mengeset 1x. bisa dibilang ini mirip konstanta.
- perbedaan antara type alias dengan interface adalah :

  | Feature                  | Interface | Type |
  | ------------------------ | :-------: | :--: |
  | aliases                  |    ❌     |  ✅  |
  | object                   |    ✅     |  ✅  |
  | merge                    |    ✅     |  ❌  |
  | Intersection (&) & Union |    ❌     |  ✅  |
  | implements               |    ✅     |  ✅  |
  | extend                   |    ✅     |  ❌  |

```ts twoslash
interface IKulit {
	readonly warna: string;
	cek(): void;
}

class Person implements IKulit {
	warna: string;
	constructor(a: string) {
		this.warna = a;
	}

	cek(): void {
		console.log(`warna kulit = ${this.warna}`);
	}
}
const persons: IKulit = new Person('hitam');
// persons.warna = "putih";
persons.cek();
```

## Extending Interface & Optional parameter

- optional parameter di tandai dengan (?) didepan nama property.

```ts twoslash
interface IHewan {
	warna?: string;
}
interface IKucing extends IHewan {
	tipe: string;
}
const kucingku: IKucing = {
	tipe: 'anggora'
	// warna: "hitam",
};
console.log(kucingku);
```
