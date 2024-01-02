---
title: React - React memo
description:
imagePath: https://wallpapercave.com/wp/wp4924054.jpg
imageAlt: react
date: 2023-11-12 09:00
tags:
  - react
---

# React memo

Penggunaan React.memo sangat berguna untuk komponen yang menerima props statis atau jarang berubah, sehingga dapat mengurangi overhead dari proses rendering komponen yang sebenarnya tidak memerlukan perubahan yang signifikan. lihat contoh dibawah ini.

```tsx title="contoh penggunaan react memo"
import { FC, memo, useState } from 'react';

// Komponen fungsional yang di-memoisasi menggunakan React.memo
const NoMemoizedComponent: FC<{ name: string }> = memo(({ name }) => {
	console.log('Rendering No Memoized Component...');
	return <div>Hello, {name}! from no memoize component</div>;
});
NoMemoizedComponent.displayName = 'NoMemoizedComponent';

const NoMemoizedComponent2 = memo(() => {
	console.log('Rendering No Memoized Component 2...');
	return <div>Hello, from no memoize component and no props</div>;
});
NoMemoizedComponent2.displayName = 'NoMemoizedComponent2';

const MemoizedComponent: FC<{ name: string }> = memo(({ name }) => {
	console.log('Rendering Memoized Component...');
	return <div>Hello, {name}! from memoize component</div>;
});
MemoizedComponent.displayName = 'MemoizedComponent';

// Komponen utama
const ReactMemo = () => {
	const [count, setCount] = useState(0);
	const [nameStatis, setNameStatis] = useState('ubay');

	const handleClick = () => {
		setCount((prevCount) => prevCount + 1);
	};

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
			<button onClick={handleClick}>Increase Count</button>
		</div>
	);
};

export default ReactMemo;
```

kita bisa lihat pada function <kbd>NoMemoizedComponent</kbd>, <kbd>NoMemoizedComponent2</kbd>. <br/><br/>
react.memo tidak akan bekerja pada 2 hal ini:

1. nilai props yang berubah-ubah. sesuai dengan penjelasan diatas. <br/>
   kita bisa lihat pada function <kbd>NoMemoizedComponent</kbd> kita memberikan props name dengan type string. lalu props yang kita kirim yaitu nilai state count yang berubah-ubah ketika kita klik button.

2. function yang ada didalam function utama. <br/>
   kita bisa lihat pada function <kbd>NoMemoizedComponent3</kbd>
