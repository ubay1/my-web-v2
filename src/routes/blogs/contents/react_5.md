---
title: React - Bindings
description:
imagePath: https://wallpapercave.com/wp/wp4924054.jpg
imageAlt: react
date: 2023-11-05 09:00
tags:
  - react
---

## Input Text & Textarea

```tsx title="binding input text & textarea"
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

```tsx {12}
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
