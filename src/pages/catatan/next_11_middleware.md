---
layout: ../../layouts/MarkdownLayout.astro
title: NEXT - Middleware
description:
imagePath: https://wallpapercave.com/wp/wp11846968.png
imageAlt: next
viewTransitionName: 'next-middleware'
date: 2024-06-16 09:00
icon: 'devicon:nextjs'
tags:
  - next
  - react
---

## Middleware

middleware bisa kita sebut sebagai penjaga. middleware bisa digunakan untuk authentikasi atau lainnya.

berikut gambaran structurenya:

```md
-src
--app
--middleware.ts
```

berikut ini contoh middleware untuk authentikasi, jika kita mengakses ke halaman **/middleware/:path\*** dan kita taidak memiliki cookie yang bernama **token_next_app** maka kita akan dilempar ke **/**.

> :path\* artinya semua page yang memiliki route /middleware

```tsx
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	const cookie = cookies();
	const token = cookie.get('token_next_app');
	if (!token) {
		console.log('token tidak ada');
		return NextResponse.redirect(new URL('/', request.url));
	}
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: '/middleware/:path*'
};
```

## Nested middleware

penggunaan nested middleware di nextjs, mirip seperti menggunakan hook di sveltekit

berikut codenya:

```tsx
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

let configs = {};
export function middleware(request: NextRequest) {
	if (request.nextUrl.pathname.startsWith('/test-middleware1')) {
		configs = {
			matcher: '/test-middleware1/:path*'
		};
	}

	if (request.nextUrl.pathname.startsWith('/test-middleware2')) {
		configs = {
			matcher: '/test-middleware2/:path*'
		};
		const cookie = cookies();
		const token = cookie.get('token_next_app');
		if (!token) {
			console.log('token tidak ada');
			return NextResponse.redirect(new URL('/', request.url));
		}
	}
}

export const config = configs;
```
