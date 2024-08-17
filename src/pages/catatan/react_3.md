---
title: React - Rendering list
description:
imagePath: https://wallpapercave.com/wp/wp4924054.jpg
imageAlt: react
viewTransitionName: 'react-list'
date: 2023-11-03 09:00
icon: 'devicon:react'
tags:
  - react
---

## Render list data dengan map()

```tsx
// render list data dengan map()
const peoples = [
	'Creola Katherine Johnson: mathematician',
	'Mario José Molina-Pasquel Henríquez: chemist',
	'Mohammad Abdus Salam: physicist',
	'Percy Lavon Julian: chemist',
	'Subrahmanyan Chandrasekhar: astrophysicist'
];

function RenderList() {
	const listItems = peoples.map((person: string, idx: number) => (
		<li key={`${person}-${idx}`}>{person}</li>
	));
	return <ul>{listItems}</ul>;
}

export default function App() {
	return <RenderList />;
}
```

## Filter data dengan filter()

```tsx
// Filter data dengan filter()
const peoples2 = [
	{
		id: 0,
		name: 'Creola Katherine Johnson',
		profession: 'mathematician',
		accomplishment: 'spaceflight calculations',
		imageId: 'MK3eW3A'
	},
	{
		id: 1,
		name: 'Mario José Molina-Pasquel Henríquez',
		profession: 'chemist',
		accomplishment: 'discovery of Arctic ozone hole',
		imageId: 'mynHUSa'
	},
	{
		id: 2,
		name: 'Mohammad Abdus Salam',
		profession: 'physicist',
		accomplishment: 'electromagnetism theory',
		imageId: 'bE7W1ji'
	},
	{
		id: 3,
		name: 'Percy Lavon Julian',
		profession: 'chemist',
		accomplishment: 'pioneering cortisone drugs, steroids and birth control pills',
		imageId: 'IOjWm71'
	},
	{
		id: 4,
		name: 'Subrahmanyan Chandrasekhar',
		profession: 'astrophysicist',
		accomplishment: 'white dwarf star mass calculations',
		imageId: 'lrWQx8l'
	}
];

function FilterRenderList() {
	const chemists = peoples2.filter((person) => person.profession === 'chemist');
	const listItems = chemists.map((person: any, idx: number) => (
		<li key={person.id}>
			<Card>
				<Avatar person={{ name: person.name, imageId: person.imageId }} />
			</Card>
			<p>
				<b>{person.name}:</b>
				{' ' + person.profession + ' '}
				known for {person.accomplishment}
			</p>
		</li>
	));

	return <ul className="mt-4">{listItems}</ul>;
}

export default function App() {
	return <FilterRenderList />;
}
```
