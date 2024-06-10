---
title: React - React.memo, useCallback, useMemo
description:
imagePath: https://wallpapercave.com/wp/wp4924054.jpg
imageAlt: react
viewTransitionName: 'react-memo'
date: 2023-11-14 09:00
icon: 'devicon:react'
tags:
  - react
---

## React memo

React.memo adalah fungsi yang disediakan oleh React untuk melakukan memoisasi pada komponen fungsional (functional components). Fungsi ini digunakan untuk mengoptimalkan performa dengan mencegah komponen yang di-memoisasi untuk di-renders ulang ketika prop-nya tidak berubah.

Penggunaan React.memo sangat berguna untuk komponen yang menerima props statis atau jarang berubah, sehingga dapat mengurangi overhead dari proses rendering komponen yang sebenarnya tidak memerlukan perubahan yang signifikan. lihat contoh dibawah ini.

```tsx
// @noErrors
// contoh penggunaan react memo
import { FC, memo, useCallback, useState } from 'react';

// Komponen fungsional yang di-memoisasi menggunakan React.memo
const NoMemoizedComponent: FC<{ name: string }> = memo(({ name }) => {
	console.log('Rendering No Memoized Component...');
	return <div>Hello, {name}! from no memoize component</div>;
});
NoMemoizedComponent.displayName = 'NoMemoizedComponent';

const NoMemoizedComponent2 = memo(() => {
	console.log('Rendering No Memoized Component 2...');
	return <div>{`Hello, from no memoize component and no props`}</div>;
});
NoMemoizedComponent2.displayName = 'NoMemoizedComponent2';

const MemoizedComponent: FC<{ name: string }> = memo(({ name }) => {
	console.log('Rendering Memoized Component...');
	return <div>Hello, {name}! from memoize component</div>;
});
MemoizedComponent.displayName = 'MemoizedComponent';

const Button: FC<{ label: string; action: any }> = memo(({ label, action }) => {
	console.log(`${label} inside button render`);
	return (
		<div>
			<button onClick={action}>add {label}</button>
		</div>
	);
});
Button.displayName = 'Button';

// Komponen utama
const ReactMemo = () => {
	const [number, setNumber] = useState(0);
	const [count, setCount] = useState(0);
	const [nameStatis, setNameStatis] = useState('ubay');

	const incrementNumber = useCallback(() => {
		setNumber(number + 1);
	}, [number]);

	const incrementCount = useCallback(() => {
		setCount(count + 1);
	}, [count]);

	const NoMemoizedComponent3 = memo(() => {
		console.log('Rendering No Memoized Component 3...');
		return <div>{`Hello ${nameStatis}, from no memoize component and no props`}</div>;
	});
	NoMemoizedComponent3.displayName = 'NoMemoizedComponent3';

	return (
		<div>
			<MemoizedComponent name={`User ${nameStatis}`} />
			<NoMemoizedComponent name={`User ${count}`} />
			<NoMemoizedComponent2 />
			<NoMemoizedComponent3 />
			<Button label="number" action={incrementNumber} />
			<Button label="count" action={incrementCount} />
		</div>
	);
};

export default ReactMemo;
```

kode diatas, ketika kita klik button number, button count ikut kerender juga, jika kita tidak ingin ikut terender kita bisa tambahkan useCallback.

react.memo tidak akan bekerja pada 2 hal ini:

1. nilai props yang berubah-ubah. sesuai dengan penjelasan diatas. <br/>
   kita bisa lihat pada function <kbd>NoMemoizedComponent</kbd> kita memberikan props name dengan type string. lalu props yang kita kirim yaitu nilai state count yang berubah-ubah ketika kita klik button.

2. function yang ada didalam function utama. <br/>
   kita bisa lihat pada function <kbd>NoMemoizedComponent3</kbd>

## useCallback

useCallback adalah salah satu dari hooks yang disediakan oleh React yang berguna untuk menghindari pembuatan ulang (re-creation) dari suatu fungsi ketika komponen di-renders kembali. Fungsi yang dihasilkan oleh useCallback akan di-memoisasi, yang berarti fungsi tersebut akan tetap sama (referensi yang sama) <b>selama dependency-nya tidak berubah</b>.

Contoh penggunaan umum useCallback adalah ketika kita ingin mencegah re-rendering yang tidak perlu dari komponen-komponen yang menerima prop-fungsi sebagai parameter, terutama jika prop-fungsi tersebut dihasilkan secara dinamis.

useCallback sebaiknya digunakan ketika:

1. Mencegah komponen yang tidak perlu di-render ulang: <br/>
   Ketika kita memasukkan suatu fungsi ke dalam useCallback, maka fungsi tersebut akan selalu menghasilkan nilai referensi yang sama. Sehingga, apabila kita mengirimkan fungsi tersebut sebagai prop ke komponen turunan, dan komponen induk mengalami update, hanya komponen turunan yang menerima nilai prop dari useCallback yang akan di-render ulang.

2. Memperbaiki kinerja aplikasi: Ketika kita menggunakan useCallback untuk menghindari pembuatan fungsi baru pada setiap pemanggilan, maka kita dapat menghindari penggunaan CPU yang berlebihan untuk membuat fungsi tersebut. Sehingga, hal ini dapat memperbaiki kinerja aplikasi.

berikut ini contoh penggunaan useCallback dengan Memo.

```tsx
// @noErrors
import React, { useState, useCallback, FC, memo } from 'react';

const ChildComponent: FC<{ onIncrement: any }> = memo(({ onIncrement }) => {
	console.log('child component');

	return (
		<div>
			<button onClick={onIncrement}>Child Count</button>
		</div>
	);
});
ChildComponent.displayName = 'ChildComponent';

const UseCallback = () => {
	const [count, setCount] = useState(0);

	console.log('parent component');
	// Menggunakan useCallback untuk mememoisasi fungsi increment
	const increment = () => setCount((prevCount) => prevCount + 1);
	const memoIncrement = useCallback(increment, []);

	return (
		<div>
			<p>Count: {count}</p>
			<button onClick={increment}>Parent Count</button>
			<hr />
			<ChildComponent onIncrement={memoIncrement} />
		</div>
	);
};

export default UseCallback;
```

```tsx
// @noErrors
// contoh lain update dari react.memo yang masih rerender
import { FC, memo, useCallback, useState } from 'react';

// Komponen fungsional yang di-memoisasi menggunakan React.memo
const NoMemoizedComponent: FC<{ name: string }> = memo(({ name }) => {
	console.log('Rendering No Memoized Component...');
	return <div>Hello, {name}! from no memoize component</div>;
});
NoMemoizedComponent.displayName = 'NoMemoizedComponent';

const NoMemoizedComponent2 = memo(() => {
	console.log('Rendering No Memoized Component 2...');
	return <div>{`Hello, from no memoize component and no props`}</div>;
});
NoMemoizedComponent2.displayName = 'NoMemoizedComponent2';

const MemoizedComponent: FC<{ name: string }> = memo(({ name }) => {
	console.log('Rendering Memoized Component...');
	return <div>Hello, {name}! from memoize component</div>;
});
MemoizedComponent.displayName = 'MemoizedComponent';

const Button: FC<{ label: string; action: any }> = memo(({ label, action }) => {
	console.log(`${label} inside button render`);
	return (
		<div>
			<button onClick={action}>add {label}</button>
		</div>
	);
});
Button.displayName = 'Button';

// Komponen utama
const ReactMemo = () => {
	const [number, setNumber] = useState(0);
	const [count, setCount] = useState(0);
	const [nameStatis, setNameStatis] = useState('ubay');

	const incrementNumber = useCallback(() => {
		setNumber(number + 1);
	}, [number]);

	const incrementCount = useCallback(() => {
		setCount(count + 1);
	}, [count]);

	const NoMemoizedComponent3 = memo(() => {
		console.log('Rendering No Memoized Component 3...');
		return <div>{`Hello ${nameStatis}, from no memoize component and no props`}</div>;
	});
	NoMemoizedComponent3.displayName = 'NoMemoizedComponent3';

	return (
		<div>
			<MemoizedComponent name={`User ${nameStatis}`} />
			<NoMemoizedComponent name={`User ${count}`} />
			<NoMemoizedComponent2 />
			<NoMemoizedComponent3 />
			<Button label="number" action={incrementNumber} />
			<Button label="count" action={incrementCount} />
		</div>
	);
};

export default ReactMemo;
```

<!-- <blockquote> pada svelte: <a href="https://svelte.dev/repl/4998dbb1c6f547bf856177510fb7c9eb?version=4.2.8" target="_blank">contoh dengan svelte</a> </blockquote>
<blockquote> pada vue: <a href="https://play.vuejs.org/#eNqFUstu2zAQ/BWCFzloILXILZWNtIEP6aEN2t7KHhRqJTOhSIIPx4Cgf8+SjBU7MZIbuTO7nOHOSL8ZU24D0EtaO26F8cSBD2bFlBiMtp6MxEJHJtJZPZACqcUMXW+EbJ+Bskq3OKv4yhRTXCvnCddBebKMMxafz/Z1LaGUul8UprGAONeDQYpqwRZI6oLiXmhFhOIWBmQszkamSJ5WbhsZgHxaki9MTUzVVRaOkvHiYTCy8YA3QmqzGsdnDdNUV9EWVu+C9zj9ikvBH5aMzs8wurrdK8KeusrM3LWxpMqn7PuKbxrVw3F/ZNTVgQh6Tr1Dz53oy3unFX50ssJoNC0k2F8menWMXpKERKyRUj/+SDVvA5zv63wD/OFE/d7tYo3RWwsO7BYYnTHf2B5QWoTXf37CDs8zOOg2SGS/A/4G3FeIGjPte1Atyj7gJbU3KRNC9X/deudBub2pKDQyp8RnFBNy/Y71F7kX5UXqwy3jL87xOhHVnDUYRIxaC51QsMaLW/wr8pKK/2+zx9MWX0XvIHwJv3lJYJYYH4m9aSo2fBDAVmzT4UTqjudj9HKsTiSvylOOczU9AQxLRvA=" target="_blank"> contoh dengan vue </a> </blockquote> -->

## useMemo

useMemo adalah salah satu dari hooks yang disediakan oleh React yang digunakan untuk <b>mengoptimalkan kinerja dengan menghitung ulang nilai dari sebuah ekspresi hanya saat terjadi perubahan pada dependencies yang telah ditentukan</b>. Dengan useMemo, kita dapat <b>mememoisasi hasil dari pemanggilan suatu fungsi atau evaluasi suatu ekspresi, sehingga nilai tersebut akan di-cache dan hanya dihitung ulang saat dependencies yang diawasi berubah.</b>

<blockquote>
Penggunaan utama useMemo adalah untuk menghindari perhitungan yang mahal secara komputasi, terutama saat perhitungan tersebut dilakukan di dalam komponen dan tidak perlu dilakukan kembali jika dependencies tidak berubah.
</blockquote>

pada contoh dibawah kita ingin menampilkan apakah number merupakan even atau odd. ketika kita klik number maka function isNumberEven() ikut terender dan ada sedikit delay. lalu kita klik count juga sama. koq bisa ? ya karna setiap kali terjadi update baik state number atau count, maka komponen akan dirender ulang, Yang mana ini akan membuat function isNumberEven ikut di inizialisasi ulang. untuk itu kita gunakan useMemo() ini

```tsx
// @noErrors
// tanpa useMemo
import { useState } from 'react';

const UseMemo = () => {
	const [number, setNumber] = useState(0);
	const [count, setCount] = useState(0);

	const incrementNumber = () => {
		console.log('number render');
		setNumber((prev) => prev + 1);
	};
	const incrementCount = () => {
		console.log('count render');
		setCount((prev) => prev + 1);
	};

	const isNumberEven = () => {
		console.log('numberEvenOdd render');
		let i = 0;
		while (i < 2000000000) i++;
		return number % 2 === 0;
	};

	return (
		<div className="App">
			<button onClick={incrementNumber}>number : {number}</button>
			<div>{isNumberEven ? 'even' : 'odd'}</div>
			<button onClick={incrementCount}>count: {count}</button>
		</div>
	);
};

export default UseMemo;
```

```tsx
// @noErrors
// dengan useMemo
import { useEffect, useMemo, useState } from 'react';

const UseMemo = () => {
	const [number, setNumber] = useState(0);
	const [count, setCount] = useState(0);

	const incrementNumber = () => {
		console.log('number render');
		setNumber((prev) => prev + 1);
	};
	const incrementCount = () => {
		console.log('count render');
		setCount((prev) => prev + 1);
	};

	const isNumberEven = useMemo(() => {
		console.log('numberEvenOdd render');
		let i = 0;
		while (i < 2000000000) i++;
		return number % 2 === 0;
	}, [number]);

	return (
		<div className="App">
			<button onClick={incrementNumber}>number : {number}</button>
			<div>{isNumberEven ? 'even' : 'odd'}</div>
			<button onClick={incrementCount}>count: {count}</button>
		</div>
	);
};

export default UseMemo;
```

# Hasilnya

1. React.memo untuk memoize komponen
2. useCallback untuk memoize function
3. useMemo untuk memoize hasil dari function

<blockquote>
ya intinya, kita gunakan optimasi ini jika kita merasa web kita sangat berat ketika kita mengakses suatu halaman.
</blockquote>
