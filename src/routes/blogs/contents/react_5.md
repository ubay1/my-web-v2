---
title: React - Binding (input text, textarea, checkbox dengan array usestate, radio, selectbox)
description:
imagePath: https://wallpapercave.com/wp/wp4924054.jpg
imageAlt: react
viewTransitionName: 'react-binding'
date: 2023-11-05 09:00
icon: 'devicon:react'
tags:
  - react
---

## Input Text & Textarea

```tsx
// @noErrors
// binding input text & textarea
import { ChangeEvent, useState } from 'react';

export default function App() {
	const [text, setText] = useState('Hello world');
	const [text2, setText2] = useState('Hello world');

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		setText(event.target.value);
	}
	function handleChange2(event: ChangeEvent<HTMLTextAreaElement>) {
		setText2(event.target.value);
	}

	return (
		<>
			<p>{text}</p>
			<input className="px-1 text-black" value={text} onChange={handleChange} />
			<p>{text2}</p>
			<textarea className="px-1 text-black" value={text2} onChange={handleChange2} />
		</>
	);
}
```

## cara untuk mengetahui type event.

coba hover pada event yang ada pada onChange.

```tsx
// @noErrors
import { ChangeEvent, useState } from 'react';

export default function App() {
	const [text, setText] = useState('Hello world');

	return (
		<>
			<p>{text}</p>
			<input className="px-1 text-black" value={text} onChange={(event) => consle.log(event)} />
		</>
	);
}
```

## Checkbox

binding checkbox array

```tsx
// @noErrors
// App.tsx
export default function BindingCheckbox() {
	const [data, setData] = useState<boolean[]>([]);

	const listData = [
		{ label: 'a', value: true },
		{ label: 'b', value: false }
	];

	const handleChange = (idx: number, checked: boolean) => {
		const newData = [...data];
		newData[idx] = checked;
		setData(newData);
	};

	const finalData = listData.map((item, idx) => (
		<div key={`item-${idx}`}>
			<input
				id={item.label}
				name={item.label}
				type="checkbox"
				checked={data[idx] || false}
				onChange={(e) => handleChange(idx, e.target.checked)}
			/>
			<label htmlFor={item.label}>{item.label}</label>
		</div>
	));

	/**
	 * Menggunakan useEffect dengan dependency array kosong ([]) akan memastikan bahwa fungsi di dalamnya hanya dijalankan sekali setelah komponen dimount.
	 * Pada saat useEffect dijalankan, listData akan digunakan untuk menghasilkan array baru initialData yang hanya berisi nilai dari properti value dari setiap objek di dalam listData.
	 * Nilai-nilai ini kemudian disimpan di dalam state data menggunakan setData(initialData).
	 */
	useEffect(() => {
		// Memetakan nilai value dari listData ke dalam array boolean
		const initialData = listData.map((item) => item.value);
		setData(initialData);
	}, []);

	return (
		<>
			<div className="mt-4">{JSON.stringify(data)}</div>
			<div> {finalData} </div>
		</>
	);
}
```

karena listData statis maka kita bisa menggunakan cara ini

```tsx
// @noErrors
// contoh tanpa useEffect
export default function BindingCheckbox() {
	const listData = [
		{ label: 'a', value: true },
		{ label: 'b', value: false }
	];

	const [data, setData] = useState<boolean[]>(() => listData.map((item) => item.value));

	const handleChange = (idx: number, checked: boolean) => {
		const newData = [...data];
		newData[idx] = checked;
		setData(newData);
	};

	const finalData = listData.map((item, idx) => (
		<div key={`item-${idx}`}>
			<input
				id={item.label}
				name={item.label}
				type="checkbox"
				checked={data[idx]}
				onChange={(e) => handleChange(idx, e.target.checked)}
			/>
			<label htmlFor={item.label}>{item.label}</label>
		</div>
	));

	return (
		<>
			<div className="mt-4">{JSON.stringify(data)}</div>
			<div>{finalData}</div>
		</>
	);
}
```

## Radio

```tsx
// @noErrors
// App.tsx
import { ChangeEvent, useState } from 'react';

export default function BindingRadio() {
	const [picked, setPicked] = useState('red');

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		setPicked(event.target.value);
	}

	const renderRadio = (color: string, label: string) => (
		<div>
			<input
				id={`${color}-pill`}
				checked={picked === color}
				type="radio"
				value={color}
				onChange={handleChange}
			/>
			<label htmlFor={`${color}-pill`}>{label}</label>
		</div>
	);

	return (
		<>
			<div>Picked: {picked}</div>
			{renderRadio('blue', 'Blue pill')}
			{renderRadio('red', 'Red pill')}
		</>
	);
}
```

## Selectbox

```tsx
// @noErrors
// App.tsx
import { ChangeEvent, useState } from 'react';

const colors = [
	{ id: 1, text: 'red' },
	{ id: 2, text: 'blue' },
	{ id: 3, text: 'green' },
	{ id: 4, text: 'gray', isDisabled: true }
];

export default function BindingSelect() {
	const [selectedColorId, setSelectedColorId] = useState(2);

	const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setSelectedColorId(Number(event.target.value));
	};

	return (
		<select className="text-black" value={selectedColorId} onChange={handleChange}>
			{colors.map((color) => (
				<option key={color.id} value={color.id} disabled={color.isDisabled}>
					{color.text}
				</option>
			))}
		</select>
	);
}
```
