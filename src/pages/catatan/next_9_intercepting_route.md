---
layout: ../../layouts/MarkdownLayout.astro
title: NEXT - Intercepting Route
description: fitur ini dipakai twitter, linkedin, instagram. saat menampilkan detail data pada dialog.
imagePath: https://wallpapercave.com/wp/wp11846968.png
imageAlt: next
viewTransitionName: 'next-intercepting-route'
date: 2024-06-15 08:00
icon: 'devicon:nextjs'
tags:
  - next
  - react
---

## Intercepting Route

kalau di sveltekit ini namanya **shallow route**. fitur ini sudah dipakai twitter, linkedin, instagram.

di nextjs cukup mudah, tapi cara ini sesuai pemahaman saya yang susah saya coba sendiri.

Intercepting ini memiliki didefinisikan dengan konvensi **(.), (..), (...), (..)(..)**, ini mirip seperti relative path **../**

1. (.) untuk mencocokkan segmen pada level yang sama
2. (..) untuk mencocokkan segmen satu tingkat di atas
3. (..)(..) untuk mencocokkan segmen dua tingkat di atas **(belum coba)**
4. (...) untuk mencocokkan segmen dari direktori aplikasi root

contoh untuk no.1

1. kita buat folder didalam app dengan nama misal **intercepting-route**, isi dari folder **intercepting-route** adalah seperti ini.

- **intercepting-route/@modal/default.tsx**.
- **intercepting-route/@modal/(.)detail/[id]/page.tsx**.
- **intercepting-route/detail/[id]/page.tsx**
- **intercepting-route/layout.tsx**
- **intercepting-route/page.tsx**.

berikut structurenya:

```md
-app
--layout.tsx
--page.tsx
--intercepting-route
---@modal
----default.tsx
----(.)detail
-----[id]
------page.tsx
---layout.tsx
---page.tsx
```

isi dari **layout.tsx**

```tsx
// @filename: app/intercepting-route/layout.tsx

export default function InterceptingRouteLayout({
	children,
	modal
}: Readonly<{
	children: React.ReactNode;
	modal: React.ReactNode; // ----> parallel route
}>) {
	return (
		<>
			{children}
			{modal}
		</>
	);
}
```

isi dari **page.tsx**, untuk menampilkan list card.

```tsx
// @filename: app/intercepting-route/page.tsx

import NextLink from 'next/link';

export default function Page() {
	let photos = Array.from({ length: 6 }, (_, i) => i + 1);

	return (
		<section className="grid grid-cols-1 md:grid-cols-[200px_200px_200px] w-full gap-4 p-8 justify-start md:justify-center items-center overflow-auto">
			{photos.map((id) => (
				<NextLink
					className="bg-primary text-base-100 flex justify-center items-center text-2xl font-bold h-[200px] w-full hover:opacity-80"
					key={id}
					href={`/intercepting-route/detail/${id}`}
					passHref
				>
					{id}
				</NextLink>
			))}
		</section>
	);
}
```

karena tidak perlu ada apapun yang dikirim dari @modal maka kita pakai default.tsx.

```tsx
// @filename: app/intercepting-route/@modal/default.tsx
export default function Default() {
	return null;
}
```

lalu isi pada file **(.)detail/[id]/page.tsx**

```tsx
// @filename: app/intercepting-route/@modal/(.)detail/[id]/page.tsx

import Modal from '@lib/components/Modal';

export default function PhotoModal({ params: { id: photoId } }: { params: { id: string } }) {
	return <Modal>{photoId}</Modal>;
}
```

> perlu diingat, nama dari (.)detail/[id]/page.tsx ini menyesuaikan dengan nama & structure folder **detail/[id]/page.tsx**. lihat gambar dibawah jika masih bingung.

![intercepting1](/intercepting1.png)

sipp segitu aja penjelasannya.
