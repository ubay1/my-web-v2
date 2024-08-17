---
title: NEXT - Linking & Navigating
description: next/link, active link with usePathname(), useRouter(), redirect()
imagePath: https://wallpapercave.com/wp/wp11846968.png
imageAlt: next
viewTransitionName: 'next-navigating'
date: 2024-06-11 13:00
icon: 'devicon:nextjs'
tags:
  - next
  - react
---

## Komponen NextLink dari 'next/link'

NextLink adalah komponen bawaan yang memperluas tag HTML **a** untuk menyediakan prefetching dan navigasi sisi klien di antara rute. Ini adalah **cara utama dan direkomendasikan** untuk menavigasi antar rute di Next.js.

kita dapat menggunakannya dengan mengimpornya dari **next/link**, dan mengoperkan prop **href** ke komponen tersebut:

### Checking Active Links

kita bisa menggunakan **usePathname** yang diimport dari **next/navigation**

```tsx
// @filename: ./src/app/components/Links.tsx
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function Links() {
	const pathname = usePathname(); // [!code highlight]
}
```

## useRouter() hook

Hook useRouter memungkinkan kita untuk mengubah rute secara terprogram dari Komponen Klien.

> useRouter tidak akan jalan jika tidak menambahkan 'use client' di paling atas, gunakan useRouter() jika mendapatkan usecase() tertentu, jika hanya navigasi biasa lebih direkomendasikan gunakan komponen **NuxtLink**

```tsx
// @filename: ./src/app/page.tsx

'use client';

import { useRouter } from 'next/navigation';

export default function Page() {
	const router = useRouter();

	return (
		<button type="button" onClick={() => router.push('/dashboard')}>
			Dashboard
		</button>
	);
}
```

## Redirect function untuk server component

contoh penggunaan redirect ini misal bisa kita gunakan saat kita gagal melakukan fetching ke suatu API lalu kita lempar ke halaman error.

ada beberapa hal yang harus diketahui soal redirect ini.

- redirect mengembalikan kode status 307 (Pengalihan Sementara) secara default. Ketika digunakan dalam Tindakan Server, ia akan mengembalikan 303 (Lihat Lainnya), yang biasanya digunakan untuk mengalihkan ke halaman yang berhasil sebagai hasil dari permintaan POST.

- redirect secara internal akan menimbulkan kesalahan sehingga harus dipanggil di luar blok try/catch.

- redirect dapat dipanggil di Komponen Klien selama proses rendering tetapi tidak di event handler. kita bisa menggunakan hook useRouter sebagai gantinya.

- redirect juga menerima URL absolut dan dapat digunakan untuk mengalihkan ke tautan eksternal.

- Jika kita ingin melakukan pengalihan sebelum proses render, gunakan next.config.js atau Middleware.

contoh penggunaan:

```tsx
import { redirect } from 'next/navigation';

async function fetchTeam(id: string) {
	const res = await fetch('https://...');
	if (!res.ok) return undefined;
	return res.json();
}

export default async function Profile({ params }: { params: { id: string } }) {
	const team = await fetchTeam(params.id);
	if (!team) {
		redirect('/login');
	}

	// ...
}
```
