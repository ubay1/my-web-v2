---
layout: ../../layouts/MarkdownLayout.astro
title: React - Events, Passing event as props,  Event modifier, Emit
description:
imagePath: https://wallpapercave.com/wp/wp4924054.jpg
imageAlt: react
viewTransitionName: 'react-events'
date: 2023-11-04 09:00
icon: 'devicon:react'
tags:
  - react
---

## Event handlers

```tsx
// event click dengan function
export default function App() {
	const [count, setCount] = useState(0);

	function incrementCount() {
		setCount((count) => count + 1);
	}

	return (
		<div>
			<p>Counter: {count}</p>
			<button onClick={incrementCount}>+1</button>
		</div>
	);
}
```

```tsx
// event click inline
function Button(props: { message: string; children: any }) {
	return (
		<button className="mt-4" onClick={() => alert(props.message)}>
			{props.children}
		</button>
	);
}

export default function App() {
	return <Button message="button 1"> Click me </Button>;
}
```

## Passing event handler sebagai props

```tsx

function Button(props: { onClick: any; children: any }) {
	return <button onClick={props.onClick}>{props.children}</button>;
}

function PlayButton(props: { movieName: string }) {
	function handlePlayClick() {
		alert(`Playing ${movieName}!`);
	}

	return <Button onClick={handlePlayClick}> Play "{movieName}" </Button>;
}

export default App() {
	return(
		<PlayButton movieName="Kiki's Delivery Service" />
	)
}
```

## Event Modifier

Contoh tanpa modifier, id parent akan ikut ke render.

```tsx
// contoh tanpa modifier
export default function EventModifier() {
	return (
		<>
			<div
				id="parent"
				onClick={() => {
					alert('You clicked on the toolbar!');
				}}
			>
				<button onClick={() => alert('Playing!')}>Play Movie</button>
				<button onClick={() => alert('Uploading!')}>Upload Image</button>
			</div>
		</>
	);
}
```

```tsx
// contoh dengan modifier stopPropagation()
export default function EventModifier() {
	return (
		<>
			<div
				id="parent"
				onClick={() => {
					alert('You clicked on the toolbar!');
				}}
			>
				<button
					onClick={(e: any) => {
						e.stopPropagation();
						alert('Playing!');
					}}
				>
					Play Movie
				</button>
				<button
					onClick={(e: any) => {
						e.stopPropagation();
						alert('Uploading!');
					}}
				>
					Upload Image
				</button>
			</div>
		</>
	);
}
```

## Emit

```tsx
// emit to parent component
import { FC, useState } from 'react';

const AnswerButton: FC<{ onYes: Function; onNo: Function }> = ({ onYes, onNo }) => {
	return (
		<>
			<button onClick={() => onYes()}>YES</button>

			<button onClick={() => onNo()}>NO</button>
		</>
	);
};

export default function EmitToParent() {
	const [isHappy, setIsHappy] = useState(true);

	function onAnswerNo() {
		setIsHappy(false);
	}

	function onAnswerYes() {
		setIsHappy(true);
	}

	return (
		<>
			<p>Are you happy?</p>
			<AnswerButton onYes={onAnswerYes} onNo={onAnswerNo} />
			<p style={{ fontSize: 50 }}>{isHappy ? '😀' : '😥'}</p>
		</>
	);
}
```
