---
layout: ../../layouts/MarkdownLayout.astro
title: NEXT - Route Handler (Api Routes)
description: Api routes, caching data
imagePath: https://wallpapercave.com/wp/wp11846968.png
imageAlt: next
viewTransitionName: 'next-api-routes'
date: 2024-06-15 12:00
icon: 'devicon:nextjs'
tags:
  - next
  - react
---

## Api Routes

ada lagi kemiripan nextjs dan sveltekit, yaitu api routes.
tapi fitur ini sepertinya semua framework punya yah.

di nextjs kita cukup membuat folder **api** di dalam folder **app** dan tambahkan file **route.ts**. contoh disini kita membuat api routes untuk **hello**.

```tsx
// @filename: app/api/hello/route.ts

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
	return NextResponse.json({
		code: 200,
		message: 'Hello from api routes'
	});
}
```

## Caching

Route Handler di-cache secara default ketika menggunakan metode GET dengan objek Response.

```tsx
// @filename: app/api/test/route.ts

export async function GET() {
	const res = await fetch('https://data.mongodb-api.com/...', {
		headers: {
			'Content-Type': 'application/json',
			'API-Key': process.env.DATA_API_KEY
		}
	});
	const data = await res.json();

	return Response.json({ data });
}
```

> Response.json() hanya berlaku untuk **TypeScript 5.2**. Jika kita menggunakan versi TypeScript yang lebih rendah, kita bisa menggunakan **NextResponse.json()**.
