---
title: NEXT - Loading UI & Streaming
description: loading.tsx, pengertian streaming, streaming dengan <Suspense />
imagePath: https://wallpapercave.com/wp/wp11846968.png
imageAlt: next
viewTransitionName: 'next-loading-ui'
date: 2024-06-12 07:00
icon: 'devicon:nextjs'
tags:
  - next
  - react
---

## Loading UI

Loading ini cara kerjanya mirip layout/template tapi bedanya, **jika di tiap folder route memiliki file loading.tsx maka root loading.tsx tidak ditampilkan**. cara penggunaannya pun cukup mudah kita cukup menambahkan file loading.tsx pada tiap folder route kita. loading ini akan berjalan diawal.

berikut ini structurenya:

```md
-app
--foo
---page.tsx
---loading.tsx
--bar
---page.tsx
---loading.tsx
--page.tsx
--loading.tsx
```

```tsx
// @filename: ./src/app/loading.tsx
export default function Loading() {
	return 'Loading root ..';
}
```

```tsx
// @filename: ./src/app/foo/loading.tsx
export default function Loading() {
	return 'Loading foo ..';
}
```

## Streaming dengan Suspense

Selain loading.js, kita juga dapat membuat Suspense Boundaries secara manual untuk komponen UI kita sendiri. App Router mendukung streaming dengan Suspense untuk runtime Node.js dan Edge.

### Apa yang dimaksud dengan Streaming?

Untuk mempelajari cara kerja Streaming di React dan Next.js, akan sangat membantu jika kita memahami Server-Side Rendering (SSR) dan batasannya.

Dengan SSR, ada serangkaian langkah yang harus diselesaikan sebelum pengguna dapat melihat dan berinteraksi dengan sebuah halaman:

1. Pertama, semua data untuk halaman tertentu diambil di server.
2. Server kemudian merender HTML untuk halaman tersebut.
3. HTML, CSS, dan JavaScript untuk halaman tersebut dikirim ke klien.
4. Antarmuka pengguna yang tidak interaktif ditampilkan menggunakan HTML dan CSS yang dihasilkan.
5. Terakhir, React menghidrasi(hydrate) antarmuka pengguna untuk membuatnya interaktif.

![cara kerja ssr](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fserver-rendering-without-streaming-chart.png&w=3840&q=75)

Langkah-langkah ini berurutan dan saling memblokir, yang berarti server hanya dapat me-render HTML untuk sebuah halaman setelah semua data diambil. Dan pada klien, React hanya dapat menghidrasi UI setelah kode untuk semua komponen dalam halaman telah diunduh.

SSR dengan React dan Next.js membantu meningkatkan performa pemuatan yang dirasakan dengan menampilkan halaman yang tidak interaktif kepada pengguna sesegera mungkin.

Namun, proses ini masih lambat karena semua pengambilan data di server perlu diselesaikan sebelum halaman dapat ditampilkan kepada pengguna.

untuk itu streaming hadir, **Streaming** memungkinkan kita untuk memecah HTML halaman menjadi bagian-bagian yang lebih kecil dan **secara bertahap mengirimkan bagian-bagian tersebut dari server ke klien**.

![cara kerja streaming](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fserver-rendering-with-streaming.png&w=3840&q=75)

Hal ini memungkinkan bagian dari halaman ditampilkan lebih cepat, tanpa menunggu semua data dimuat sebelum UI dapat di-render.

Streaming bekerja dengan baik dengan model komponen React karena setiap komponen dapat dianggap sebagai sebuah potongan. Komponen yang memiliki prioritas lebih tinggi (misalnya informasi produk) atau yang tidak bergantung pada data dapat dikirim terlebih dahulu (misalnya tata letak), dan React dapat memulai hidrasi lebih awal. Komponen yang memiliki prioritas lebih rendah (misalnya ulasan, produk terkait) dapat dikirim dalam permintaan server yang sama setelah datanya diambil.

![contoh streaming](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fserver-rendering-with-streaming-chart.png&w=3840&q=75)

> Streaming sangat bermanfaat ketika kita ingin mencegah permintaan data yang panjang memblokir halaman dari rendering karena dapat mengurangi **Time To First Byte (TTFB)** dan **First Contentful Paint (FCP)**. Ini juga membantu meningkatkan **Time To Interactice (TTI)** terutama pada perangkat yang lebih lambat.

contoh:

```tsx
// @filename: ./src/app/loading-streaming/page.tsx

import { Suspense } from 'react';
import Post from './Post';
import Album from './Album';

export default async function Page() {
	return (
		<section>
			<Suspense fallback={<p>Memuat data posts..</p>}>
				<Post />
			</Suspense>
			<Suspense fallback={<p>Memuat data albums..</p>}>
				<Album />
			</Suspense>
		</section>
	);
}
```

```tsx
// @filename: ./src/app/loading-streaming/Post.tsx

export default async function Post() {
	return new Promise((resolve) => setTimeout(resolve, 3000)).then(async () => {
		const res = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
			next: { revalidate: 10 }
		});
		const json = await res.json();
		return <div>Post: {json.title}</div>;
	});
}
```

```tsx
// @filename: ./src/app/loading-streaming/Album.tsx

export default async function Album() {
	return new Promise((resolve) => setTimeout(resolve, 5000)).then(async () => {
		const res = await fetch('https://jsonplaceholder.typicode.com/albums/1', {
			next: { revalidate: 10 }
		});
		const json = await res.json();

		return <div>Album: {json.title}</div>;
	});
}
```

Dengan menggunakan Suspense, Anda mendapatkan manfaat dari:

1. Streaming Server Rendering - Merender HTML secara progresif dari server ke klien.
2. Selective Hydration - React memprioritaskan komponen apa yang akan dibuat interaktif terlebih dahulu berdasarkan interaksi pengguna.
