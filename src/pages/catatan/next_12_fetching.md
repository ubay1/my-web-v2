---
layout: ../../layouts/MarkdownLayout.astro
title: NEXT - Fetching
description: Fetching via server dengan fetch, Fetch tidak akan mencache, revalidate berdasarkan waktu, revalidate berdasarkan tag
imagePath: https://wallpapercave.com/wp/wp11846968.png
imageAlt: next
viewTransitionName: 'next-fetching'
date: 2024-06-16 12:00
icon: 'devicon:nextjs'
tags:
  - next
  - react
---

## Fetching via server dengan fetch

Next.js memperluas API Web fetch asli

untuk memungkinkan kita mengonfigurasi perilaku caching dan validasi ulang untuk setiap permintaan fetch di server. React memperluas fetch untuk secara otomatis memoisasi permintaan fetch saat merender pohon komponen React.

> kita dapat menggunakan fetch dengan async/await di **Server Components, di Route Handlers, dan di Server Actions**.

berikut contoh fetching via server:

```tsx
async function getData() {
	const res = await fetch('https://jsonplaceholder.typicode.com/albums/1');
	console.log('response = ', res);

	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}

	return res.json();
}

export default async function Page() {
	const data = await getData();

	return <main>{JSON.stringify(data)}</main>;
}
```

> Catatan:
>
> 1. Pada Route handler, permintaan fetch tidak dimemo karena Route Handler bukan bagian dari pohon komponen React.
> 2. Pada Server Actions, fetch request tidak di-cache (default cache: no-store).
> 3. Untuk menggunakan async/await di Server Component dengan TypeScript, kita harus menggunakan TypeScript 5.1.3 atau yang lebih tinggi dan @types/react 18.2.8 atau yang lebih tinggi.

## Revalidating data

Revalidating adalah proses membersihkan Cache Data dan mengambil kembali data terbaru. Hal ini berguna ketika data kita berubah dan kita ingin memastikan bahwa kita menampilkan informasi terbaru.

Data Cache dapat divalidasi ulang dengan dua cara:

1.  Validasi ulang berdasarkan waktu: Secara otomatis memvalidasi ulang data setelah jangka waktu tertentu berlalu. **Ini berguna untuk data yang jarang berubah dan kesegarannya tidak terlalu penting**.
2.  Validasi ulang sesuai permintaan: Memvalidasi ulang data secara manual berdasarkan suatu peristiwa (misalnya pengiriman formulir). **Validasi ulang sesuai permintaan dapat menggunakan pendekatan berbasis tag atau berbasis path** untuk memvalidasi ulang sekelompok data sekaligus. Hal ini berguna ketika kita ingin memastikan data terbaru ditampilkan sesegera mungkin (misalnya, ketika konten dari CMS diperbarui).

### Validasi ulang berdasarkan waktu

kita cukup menambahkan **next: revalidate: waktu_revalidate**. dibawah ini akan melakukan validasi ulang sekitar 1 jam kedepan.

```tsx
fetch('https://...', { next: { revalidate: 3600 } });
```

atau jika kita ingin menyamakan waktu revalidate semua fetching kita bisa masukkan ini

```ts
// @filename: layout.tsx / page.tsx
export const revalidate = 3600;
```

### Validasi ulang sesuai permintaan

Data dapat divalidasi ulang sesuai permintaan **berdasarkan jalur (revalidatePath)** atau dengan **tag cache (revalidateTag)** di dalam Server Action atau Route Handler.

Next.js memiliki sistem penandaan cache untuk membatalkan permintaan pengambilan di seluruh rute.

1. Ketika menggunakan fetch, kita memiliki opsi untuk menandai entri cache dengan satu atau beberapa tag.
2. Kemudian, kita dapat memanggil revalidateTag untuk memvalidasi ulang semua entri yang terkait dengan tag tersebut.

Sebagai contoh, fetch berikut ini menambahkan koleksi tag cache:

```tsx
// @filename app/page.tsx

export default async function Page() {
	const res = await fetch('https://...', { next: { tags: ['collection'] } });
	const data = await res.json();
	// ...
}
```

kita kemudian dapat memvalidasi ulang panggilan pengambilan yang ditandai dengan koleksi ini dengan memanggil revalidateTag dalam Tindakan Server:

```tsx
// @filename app/actions.ts

'use server';

import { revalidateTag } from 'next/cache';

export default async function action() {
	revalidateTag('collection');
}
```

### Fetch tidak akan mencache

1. **Cache: 'no-store'** ditambahkan ke fetch.
2. Opsi **revalidate: 0** ditambahkan ke fetch individual.
3. Fetch berada di dalam Router Handler yang menggunakan metode POST.
4. Permintaan fetch dilakukan setelah penggunaan header atau cookie.
5. Opsi segmen rute const **dynamic = 'force-dynamic'** digunakan.
6. Opsi segmen rute fetchCache dikonfigurasi untuk melewatkan cache secara default.
7. Fetch menggunakan header Otorisasi atau Cookie dan ada permintaan yang tidak di-cache di atasnya dalam pohon komponen.
