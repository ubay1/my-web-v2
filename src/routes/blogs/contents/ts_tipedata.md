---
title: Tipe data pada Typescript
description: Belajar tipe data yang ada pada typescript
imagePath: https://miro.medium.com/max/1400/1*kIccf4SUwLmavuqDgjYlZA.jpeg
imageAlt: img-ts
date: 2022-12-02
tags:
  - typescript
---

## number, string, boolean types

```ts
function basicType1(num1: number, str1: string, bool1: boolean) {
	const data = {
		num1,
		str1,
		bool1
	};
	return data;
}

const result1 = basicType1(10, 'hi', true);
console.log('type number,string, boolean = ', result1);
```

## object types

```ts
const testObjectType: { name: string; age: number } = {
	name: 'khansa',
	age: 8
};

testObjectType.name = 'Qanita';
testObjectType.age = 2;
console.log('type object = ', testObjectType);
```

## array types

```ts
const arrayType: string[] = ['a', 'b'];
console.log('type array = ', arrayType);
```

## tuples types

- tuples types mirip seperti union types namun bekerja di array.
- kita bisa memasukan data yang sesuai dengan type tuples yang kita berikan, namun jika kita masukan suatu nilai namun dengan tipe yang tidak ada di tuples maka akan menampilkan error.

```ts
const arrayTuplesType: [number, string] = [1, 'b'];
arrayTuplesType.push(1);
arrayTuplesType.push(true); // error
console.log('type array = ', arrayTuplesType);
```

## enum types

- Enum digunakan untuk mendefiniskan atau menge-set suatu value dengan sifat constant atau istilah yang disebut dengan Initialization (Inisiasi). enum disediakan dalam bentuk numeric dan string atau bahkan keduanya.
- default nilai awal pada enum yaitu 0 dan enum menganut auto increment pada number.
- contoh dibawah jika kita eksekusi maka a=0, b=3, c=5

```ts
// numeric enum
enum testEnumNumber {
	a, // 0
	b = 3,
	c = 5
}
enum testEnumString {
	naruto = 'Rasengan',
	sasuke = 'Chidori'
}
enum testEnumGabungan {
	a, // 0
	sasuke = 'Chidori'
}

console.log('type enum = ', testEnumGabungan.a);
```

## any Types

- type any kita bisa menyimpan jenis tipe data apa saja atau istilahg lainnya adalah menonaktifkan semua pemeriksaan tipe pada typescript.
- namun tidak disarankan menggunakan any, karena menggunakan any sama saja seperti kita saat menggunakan javascript.
- kecuali jika kita memang tidak tahu data apa yang akan disimpan.

## union Types

- union type kegunannya untuk kita memasukan lebih dari 1 type.

```ts
const testUnion = (a: number, b: number | string) => {
	console.log(a, b);
};
testUnion(12, 'aa');
```

## literal Types

- kegunaan literal types adalah memberikan exact value atau nilai yang pasti atau nilai yang sudah kita definisikan sebelumnya. Artinya, jika parameter atau nilai balikan dari sebuah function tidak ada di salah satu nilai yang sudah kita definisikan sebelumnya, maka akan terjadi error.
- ada tiga jenis Literal Types di Typescript. Di antaranya adalah String, Numeric, Boolean.

```ts
type testLiteral1 = 'Samsung' | 'Xiaomi' | 'Sony'; // type alias

function testLiteral(phone: testLiteral1, price: number): string {
	return `My phone = ${phone} and price = ${price}`;
}
const resultTestLiteral = testLiteral('Samsung', 2000000);
console.log(resultTestLiteral);
```

## type alias

- Tipe alias dapat digunakan untuk "membuat" tipe Anda sendiri. Anda tidak terbatas untuk menyimpan tipe union.

```ts
type testalias1 = 'Samsung' | 'Xiaomi' | 'Sony';
type testalias2 = { name: string; desc: string };

function testAliasProfil(profil: testalias2): void {
	console.log(profil.name + ' - ' + profil.desc);
}
testAliasProfil({ name: 'test alias', desc: 'wow ini toh type alias' });
```

## mengembalikan Function dengan types atau void

- contoh dibawah ini salah, karena function meminta kembaliannya adalah string
- sedangkan a mengembalikan tipe number.
- jika kita memberikan tipe void, artinya tidak mengembalikan apa-apa pada function tersebut.

```ts
function testReturnType(a: number): string {
	return a.toString();
}
const resReturnType = testReturnType(100);
console.log('test return types/void = ', resReturnType);
```

## membuat Function sebagai types dan memberikan callback

```ts
function testFunctionAsTypes1(n1: number, n2: number) {
	return n1 + n2;
}
function testFunctionAsTypes2(n1: number): void {
	console.log('Result = ', n1);
}
let testFunctionAsTypes3: (n1: number, n2: number) => number;
testFunctionAsTypes3 = testFunctionAsTypes1;
testFunctionAsTypes3 = testFunctionAsTypes3;
console.log(testFunctionAsTypes3(2, 4));
```

## unknown type

- unknown type mirip seperti any namun lebih baik.

```ts
// contoh:
let testUnknownType1: unknown;
let testUnknownType2: string;

testUnknownType1 = 109;
testUnknownType1 = '109';
```

dibawah ini error karena type unknown tidak dapat ditetapkan untuk tipe string.

```ts
testUnknownType2 = testUnknownType1; // error

// untuk memperbaikinya kita bisa memeriksanya dengan typeof
if (typeof testUnknownType1 === 'string') {
	testUnknownType2 = testUnknownType1;
}
```

> note: tapi lebih baiknya jika kita tidak tahu apa yang ingin kita masukan ke variabel testUnknownType1 apakah string/number/lainnya kita bisa gunakan union type terlebih dahulu dibanding unknown.

## never type

- tipe never dimasukan jika kita tahu bahwa nilai tidak akan dikembalikan, contohnya dibawah ini.
- ada 2 kasus yang bisa kita berikan type never:

  1. loop tanpa akhir, contohnya dibawah ini:

  ```ts
  const sing = function (): never {
  	while (true) {
  		console.log('Never gonna give you up');
  		console.log('Never gonna let you down');
  		console.log('Never gonna run around and desert you');
  		console.log('Never gonna make you cry');
  		console.log('Never gonna say goodbye');
  		console.log('Never gonna tell a lie and hurt you');
  	}
  };
  ```

  1. Fungsi yang melempar kesalahan, contohnya dibawah ini.

  ```ts
  function generateError(msg: string, code: number): never {
  	throw { msg, code };
  }

  try {
  	const resError = generateError('Error bro', 500);
  	console.log('error = ', resError);
  } catch (error) {
  	console.log('errors = ', error);
  }
  ```

## assertion Type

Type Assertion berguna untuk kita membuat sebuah variabel namun tidak langsung kita masukan nilainya atau dalam artian kita hanya membuat kerangkanya saja.
type Assesrtion menggunakan syntax **as**

contoh tanpa assertion:

```ts
interface Foo {
	bar: number;
	bas: string;
}
// jika tanpa assertion kita wajib memasukan
// properti yang ada pada interface.
const foo: Foo = {};
```

contoh dengan assertion:

```ts
interface Foo {
	bar: number;
	bas: string;
}
// kita bisa membuat kerangkanya saja
const foo = {} as Foo;

foo.bar = 1;
foo.bas = 'hi';
console.log(foo);
```
