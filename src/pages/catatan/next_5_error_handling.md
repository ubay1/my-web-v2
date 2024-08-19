---
layout: ../../layouts/MarkdownLayout.astro
title: NEXT - Error handling
description: error.tsx, global-error.tsx, not-found.tsx
imagePath: https://wallpapercave.com/wp/wp11846968.png
imageAlt: next
viewTransitionName: 'next-error-handling'
date: 2024-06-12 14:00
icon: 'devicon:nextjs'
tags:
  - next
  - react
---

## error.tsx

error.tsx ini cara kerjanya mirip seperti loading.tsx. **jika di tiap folder route memiliki file error.tsx maka root error.tsx tidak ditampilkan**. cara penggunaannya pun cukup mudah kita cukup menambahkan file error.tsx pada tiap folder route kita.

error.tsx, komponen di dalamnya menerima dua parameter, yaitu error dan reset :

1. error : ini merupakan instance dari object Error JavaScript, kita dapat memanfaatkan ini untuk, misal, kebutuhan logging
2. reset : ini merupakan fungsi yang bila dieksekusi akan mencoba untuk melakukan re-render segmen halaman tersebut

Selain itu, komponen di dalam fail error.tsx juga harus merupakan client components, dan kita tidak perlu menulis elemen html dan body , karena fail error.tsx akan dibungkus oleh layout dari segmen halaman tersebut.

```tsx
// @filename: app/error.tsx

'use client';

import { useEffect } from 'react';

export default function Error({
	error,
	reset
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div>
			<div className="text-gray-200 text-4xl">{error.name}</div>
			<button className="mt-4 btn btn-secondary btn-block" onClick={() => reset()}>
				Coba lagi
			</button>
		</div>
	);
}
```

## global-error.tsx

untuk ini, gatau cara ngetestnya bagaimana, udah dicoba bikin error di root layout.tsx terus build dilocal,kena error pas build, karna kan dari docs nya bilang kalau ini cuma bisa di mode production.

kalau kata orang lain sih ini, tapi diriku masih belum paham banget.

> Sedangkan untuk mengatasi galat yang terjadi di root layout atau app/layout.tsx, kita perlu variasi lain dari error.tsx, yaitu global-error.tsx yang ditaruh di app/global-error.tsx. Bila terjadi galat di root layout, fail ini akan di-render dan menggantikan root layout Oleh karena itu, kita perlu menulis elemen html dan body di dalamnya.

ini isi dari global-error.tsx

```tsx
// @filename: app/global-error.tsx

'use client';

export default function GlobalError({
	error,
	reset
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<html>
			<body>
				<h2>Something went wrong!</h2>
				<button onClick={() => reset()}>Try again</button>
			</body>
		</html>
	);
}
```

## not-found.tsx

not-found.tsx ini akan tampil jika kita mengakses halaman web yang tidak kita miliki.

codenya seperti ini.

```tsx
// @filename: app/not-found.tsx

import NextLink from 'next/link';

export default function NotFound() {
	return (
		<div>
			<h2>Halaman tidak ditemukan</h2>
			<NextLink href="/">Kembali ke beranda</NextLink>
		</div>
	);
}
```
