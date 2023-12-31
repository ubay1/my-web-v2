---
title: React Basic - (markup <></>, props, children/slot)
description:
imagePath: https://crowdbotics.ghost.io/content/images/2019/06/React-Event-Listeners.png
imageAlt: react
date: 2023-11-01 09:00
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

```tsx title="App.tsx"
interface IAvatar {
	name: string;
	imageId: string;
}

function getImageUrl(person: IAvatar, size = 's') {
	return 'https://i.imgur.com/' + person.imageId + size + '.jpg';
}

function Avatar(props: { person: IAvatar; size: number }) {
	return (
		<img
			src={getImageUrl(props.person)}
			alt={props.person.name}
			width={props.size}
			height={props.size}
		/>
	);
}
export default function Profile() {
	return <Avatar person={{ name: 'Lin Lanying', imageId: '1bX5QH6' }} size={100} />;
}
```

## Passing Component sebagai children

mirip slotnya vue/svelte

```tsx title="App.tsx"
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
