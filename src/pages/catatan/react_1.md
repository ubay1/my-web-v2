---
title: React - (Markup <></>, Props, Children atau Slot, Dom Ref)
description:
imagePath: https://wallpapercave.com/wp/wp4924054.jpg
imageAlt: react
viewTransitionName: 'react-props'
date: 2023-11-01 09:00
icon: 'devicon:react'
tags:
  - react
---

## Writing markup dengan jsx

Rules of JSX:

1. Return single root element

```tsx

export default function App(){
  return {
    <div>
      <h1> hallo </h1>
      <h2> React JS </h2>
    </div>
  }
}
```

atau bisa juga gunakan `<> </>`

```tsx

export default function App(){
  return {
    <>
      <h1> hallo </h1>
      <h2> React JS </h2>
    </>
  }
}
```

2. Close all the tags

untuk tag yang explicit contohnya seperti ini <kbd>`<img />`</kbd>

## Menampilkan data dengan curly braces `{ }` & `{{ }}`

```tsx
const name = 'ubay';

export default function Reactbasic() {
	return <h1>hallo {name}</h1>;
}
```

```tsx
const name = 'ubay';

export default function Reactbasic() {
	return <h1 style={{ color: 'red' }}>hallo {name}</h1>;
}
```

## Passing props

jika dibanding vue dan svelte, gw lebih nyaman props dari vue dan svelte. tapi gapapa namanya juga belajar gaada yang salah. hehe

```tsx
// App.tsx
import { FC } from 'react';

interface IAvatar {
	name: string;
	imageId: string;
}

interface IProps {
	person: IAvatar;
}

function getImageUrl(person: IAvatar, size = 's') {
	return 'https://i.imgur.com/' + person.imageId + size + '.jpg';
}

const Avatar: FC<IProps> = ({ person }) => {
	return (
		<img
			src={getImageUrl(person)}
			alt={person.name}
			width={0}
			height={0}
			className="w-full h-full"
		/>
	);
};

export default function Profile() {
	return <Avatar person={{ name: 'Lin Lanying', imageId: '1bX5QH6' }} size={100} />;
}
```

## Passing Component sebagai children

mirip slotnya vue/svelte

```tsx
// App.tsx
import Avatar from './Avatar.tsx';

function Card({ children }) {
	return <div className="card">{children}</div>;
}

export default function Profile() {
	return (
		<Card>
			<Avatar
				size={100}
				person={{
					name: 'Katsuko Saruhashi',
					imageId: 'YfeOqp2'
				}}
			/>
		</Card>
	);
}
```

## Dom Ref

kalau di vue kita menggunakan ref(), kalau di svelte kita menggunakan bind:this,
di react menggunakan useRef()

```tsx
import { useRef } from 'react';

export default function DomRef() {
	const inputElement: any = useRef(null);

	const focusForm = () => inputElement?.current?.focus();

	return (
		<div className="bg-red-300 p-2 w-1/2">
			<button className="bg-gray-400 hover:bg-gray-500 p-1 mb-2" onClick={focusForm}>
				Focus Form
			</button>
			<input type="text" ref={inputElement} className="text-black px-1" />
		</div>
	);
}
```
