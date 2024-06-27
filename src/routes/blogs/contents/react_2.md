---
title: React - (if else statement, operator ternary, operator &&)
description:
imagePath: https://wallpapercave.com/wp/wp4924054.jpg
imageAlt: react
viewTransitionName: 'react-condition'
date: 2023-11-02 09:00
icon: 'devicon:react'
tags:
  - react
---

## If Else Statement

```tsx
// If Else Statement
function Item(props: { name: string; isPacked: boolean }) {
	if (props.isPacked) {
		return <li className="item">{props.name} ✔</li>;
	}
	return <li className="item">{props.name}</li>;
}

export default function PackageList() {
	return (
		<section>
			<h1>Sally Ride`s Packing List</h1>
			<ul>
				<Item isPacked={true} name="Space suit" />
				<Item isPacked={true} name="Helmet with a golden leaf" />
				<Item isPacked={false} name="Photo of Tam" />
			</ul>
		</section>
	);
}
```

dari contoh diatasa misal jika kita tidak ingin menampilkan seluruh data yang bernilai true. maka kita cukup mereturn null

```tsx
// If Else Statement dengan return null
function Item(props: { name: string; isPacked: boolean }) {
	if (props.isPacked) {
		return null;
	}
	return <li className="item">{props.name}</li>;
}

export default function PackageList() {
	return (
		<section>
			<h1>Sally Ride`s Packing List</h1>
			<ul>
				<Item isPacked={true} name="Space suit" />
				<Item isPacked={true} name="Helmet with a golden leaf" />
				<Item isPacked={false} name="Photo of Tam" />
			</ul>
		</section>
	);
}
```

## Operator Ternary

```tsx
// operator ternary
function Item(props: { name: string; isPacked: boolean }) {
	return <li className="item">{props.isPacked ? props.name + ' ✔' : props.name}</li>;
}

export default function PackageList() {
	return (
		<section>
			<h1>Sally Ride`s Packing List</h1>
			<ul>
				<Item isPacked={true} name="Space suit" />
				<Item isPacked={true} name="Helmet with a golden leaf" />
				<Item isPacked={false} name="Photo of Tam" />
			</ul>
		</section>
	);
}
```

## && Operator

Pintasan umum lainnya yang akan kita temui adalah operator logika JavaScript AND (&&). Di dalam komponen React, operator ini sering muncul ketika kita ingin me-render beberapa JSX ketika kondisinya benar. Dengan &&, kita dapat me-render tanda centang secara kondisional hanya jika isPacked bernilai benar:

```tsx
// && operator
function Item(props: { name: string; isPacked: boolean }) {
	return (
		<li className="item">
			{props.name} {props.isPacked && ' ✔'}
		</li>
	);
}

export default function PackageList() {
	return (
		<section>
			<h1>Sally Ride`s Packing List</h1>
			<ul>
				<Item isPacked={true} name="Space suit" />
				<Item isPacked={true} name="Helmet with a golden leaf" />
				<Item isPacked={false} name="Photo of Tam" />
			</ul>
		</section>
	);
}
```
