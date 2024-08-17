---
title: Syntax javascript yang wajib digunakan
description: Syntax javascript yang wajib digunakan ini akan mempermudah dan mempercepat proses koding kita.
imagePath: https://programacion.net/files/article/20160921060930_javascript.jpg
imageAlt: img-js
viewTransitionName: 'js-required-syntax'
date: 2022-12-02 09:00
icon: 'devicon:javascript'
tags:
  - javascript
---

Syntax javascript yang wajib digunakan ini akan mempermudah dan membantu mempercepat koding kita.

## Destructing nested object

```js
const dataDummy = [
	{ id: 1, nested: { test: 2 } },
	{ id: 2, nested: { test: 2 } }
];

dataDummy.forEach(({ id, nested: { test } }) => {
	console.log(`id = ${id}, nested_obj = ${test}`);
});
```

## Loop dengan For..Of

```js
const dataDummy = [
	{
		id: 1,
		name: 'Leanne Graham',
		username: 'Bret',
		email: 'Sincere@april.biz',
		address: {
			street: 'Kulas Light',
			suite: 'Apt. 556',
			city: 'Gwenborough'
		},
		phone: '1-770-736-8031 x56442',
		website: 'hildegard.org'
	},
	{
		id: 2,
		name: 'Ervin Howell',
		username: 'Antonette',
		email: 'Shanna@melissa.tv',
		address: {
			street: 'Victor Plains',
			suite: 'Suite 879',
			city: 'Wisokyburgh'
		},
		phone: '010-692-6593 x09125',
		website: 'anastasia.net'
	}
];

// es6 for of loop
// jika tanpa index dan tanpa destruct cukup dengan
// for (let item of dataDummy)
for (let [i, { email }] of dataDummy.entries()) {
	console.log(`for of loop : ${email} index ke-${i}`);
}
```

## Rest parameter

```js
// [...args], artinya menggabungkan data yang dikirim ke function
const logAllArguments2 = ([...args]: { nama: string, age: number }[]) => {
	for (let [i, { nama, age }] of args.entries()) {
		console.log(i + '. nama = ', nama);
		console.log(i + '. age = ', age);
	}
};
logAllArguments2([
	{ nama: 'aa', age: 10 },
	{ nama: 'bb', age: 12 }
]);
```

## Spread operator

```js
const person2 = {
	firstName: 'cristiano',
	lastName: 'ronaldo',
	fullName: function () {
		return this.firstName + ' ' + this.lastName;
	}
};
const applyPerson2 = {
	firstName: 'lionel',
	lastName: 'messi',
	nickName: 'omes'
};

// menggabungkan 2 object {...target, ...source}
// jika field"nya ada yang sama maka field object yang menjadi target akan direplace dengan field object dari source.
const newObj = { ...person2, ...applyPerson2 };
console.log('spread pada object =', newObj.fullName());
```

## Promise

```js
const promises = new Promise((resolve, reject) => {
	fetch('https://jsonplaceholder.typicode.com/users')
		.then((res) => {
			return resolve(res.json());
		})
		.catch((err) => {
			return reject(err);
		});
});

promises
	.then((data) =>
		const filterData = data.filter(({ id }) => id === 1).map((item) => item)
		console.log('result = ', filterData)
	)
	.catch((err) => console.log(err))
	.finally(() => {
		console.log('fetch end');
	});
```

## Promise.all

- promise.all dapat menjalankan function / fetching data secara bersamaan.
- contoh dibawah ini kita memiliki 3 function who(), what(), dan where().
- dimana function" ini dijalankan di Promise.all().
- function yang pertama kali selesai menjalankan kodenya yakni what() karena memiliki timeout paling kecil dibanding yang lain.
- namun karena menggunakan promise, jadi function what() tetap menunggu function who() menyelesaikan eksekusi kodenya.
- dibawah kita akan lihat log, yang pertama hasil dari promise dan yang kedua hasil dari data yang disimpan ke array.
- data dari promise tetap berurutan, sedangkan data dari array adalah hasil dari yang tercepat selesai megeksekusi kode dari tiap" function.

```js
let tempMsg: string[] = [];
const who = () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			tempMsg.push('🤡');
			resolve('🤡');
		}, 400);
	});
};

const what = () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			tempMsg.push('lurks');
			resolve('lurks');
		}, 300);
	});
};

const where = () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			tempMsg.push('in the shadows');
			resolve('in the shadows');
		}, 500);
	});
};

const msg2 = () => {
	Promise.all([who(), what(), where()]).then((res) => {
		console.log(res.toString().replaceAll(',', ' '));
		console.log(tempMsg.toString().replaceAll(',', ' '));
	});
};

/* akan tercetak
 ** 🤡 lurks in the shadows
 ** lurks 🤡 in the shadows
 */
msg2();
```

## Promise.race

- promise.race akan mengembalikan promise yang pertama x selesai, dan hasil dari promise lainnya akan diabaikan.

```js
const who = () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve('🤡');
		}, 400);
	});
};

const what = () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve('lurks');
		}, 300);
	});
};

const msg2 = () => {
	Promise.race([who(), what()]).then((res) => {
		console.log(`promise.race = ${res}`);
	});
};

/* akan tercetak
 * lurks
 */
msg2();
```

## Async await

- Fitur ini mempermudah kita dalam menangani proses asynchronous. Async/Await merupakan sebuah syntax khusus yang digunakan untuk menangani Promise agar penulisan code lebih efisien dan rapih.
- Async/Await adalah salah satu cara untuk mengatasai masalah asynchronous pada Javascript selain menggunakan callback dan promise.

#### 1. async await dengan promise

```js
const scaryClown = () => {
	return new Promise((resolve) => {
		resolve('Scary Clown 🤡');
	});
};

const msg1 = async () => {
	const msg = await scaryClown();
	console.log('async await:', msg);
};

/* akan tercetak
 ** log 1
 ** log 2
 ** async await: Scary Clown 🤡
 */
console.log('log 1');
msg1();
console.log('log 2');
```

### 2. async await dengan promise.all

```js
const who = () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve('🤡');
		}, 300);
	});
};

const what = () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve('lurks');
		}, 200);
	});
};

const where = () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve('in the shadows');
		}, 500);
	});
};

const msg2 = async () => {
	const [a, b, c] = await Promise.all([who(), what(), where()]);
	console.log(`promise.all dengan async await = ${a} ${b} ${c}`);
};

/* akan tercetak
 ** 🤡 lurks in the shadows
 */
msg2();
```

### 3. async await fetching dengan promise.all

```js
const fetchAndDecode = async (url: string, type: string) => {
	const response = await fetch(url);

	let content;

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	} else {
		if (type === 'json') {
			content = await response.json();
		} else if (type === 'text') {
			content = await response.text();
		}
	}
	return content;
};

const loadAllDog = async () => {
	const dogAkita = fetchAndDecode('https://dog.ceo/api/breed/akita/images/random', 'json');
	const dogFrench = fetchAndDecode(
		'https://dog.ceo/api/breed/bulldog/french/images/random',
		'json'
	);

	const [akita, french]: { status: string, message: string }[] = await Promise.all([
		dogAkita,
		dogFrench
	]);
	console.log('promise.all with fetch and asyncAwait = ', akita.message + ', ' + french.message);
};

/* akan tercetak
 ** promise.all with fetch and asyncAwait =  https://images.dog.ceo/breeds/akita/Akita_Inu_dog.jpg, https://images.dog.ceo/breeds/bulldog-french/n02108915_341.jpg
 */
loadAllDog();
```
