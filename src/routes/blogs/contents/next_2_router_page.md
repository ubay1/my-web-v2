---
title: NEXT - Basic router, page, layout, template, metadata
description: Memahami router, page, layout, template, metadata
imagePath: https://wallpapercave.com/wp/wp11846968.png
imageAlt: next
viewTransitionName: 'next-router'
date: 2024-06-11 10:00
icon: 'devicon:nextjs'
tags:
  - next
  - react
---

## Router

![router-1](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Froute-segments-to-path-segments.png&w=3840&q=75)
![router-2](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fdefining-routes.png&w=3840&q=75)

- **./src/app/page.tsx**: ini adalah route ('/')
- **./src/app/dashboard/page.tsx**: ini adalah route ('/dashboard')
- **./src/app/dashboard/settings/page.tsx**: ini adalah route ('/dashboard/settings')

> Note: app router ini menerapkan filebased router seperti sveltekit.

contoh: kita buat list untuk menampilkan latihan nextjs kita.

1. pada page.tsx tambahkan code ini.

```tsx
// @filename: ./src/app/page.tsx
// @noErrors
import NextLink from 'next/link';

const list = [{ label: 'router', path: '/router' }];

export default function Home() {
	const listLearn = list.map((item, idx: number) => (
		<li key={`list-learn-${idx}`}>
			<NextLink href={item.path}>{item.label}</NextLink>
		</li>
	));

	return <ul>{listLearn}</ul>;
}
```

2. pada router/page.tsx tambahkan code ini.

```tsx
// @filename: ./src/app/router/page.tsx
// @noErrors
export default function RouterPage() {
	return <div>Hello ini router page</div>;
}
```

## Pages & Layout

File khusus layout.js, page.js, dan template.js memungkinkan kita untuk membuat UI untuk sebuah rute. Halaman ini akan memandu kita tentang bagaimana dan kapan menggunakan file-file khusus ini.

### Root Layout (wajib)

> layout ini berbeda dengan sveltekit, kalau di sveltekit jika kita menambahkan layout pada tiap-tiap folder route, maka root layout tidak terpakai. itu karena layout di svelte hanya seperti komponen biasa saja, beda dengan di nextjs yang dimana root layout harus ada tag html dan body, kalau gaada akan error.

> hanya di root layout yang dapat menggunakan tag body & html

root layout ditentukan pada tingkat teratas direktori aplikasi dan berlaku untuk semua rute. Layout ini diperlukan dan harus berisi tag **html dan tag body**, yang memungkinkan kita memodifikasi HTML awal yang dikembalikan dari server.

![root layout for all router](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Flayout-special-file.png&w=3840&q=75)

### Nested Layout

Secara default, root di app router ini bersarang yang artinya dimana layout yang paling luar akan membungkus layout yang ada didalam tiap-tiap folder route.

Sebagai contoh, kita buat sebuah layout untuk rute **/dashboard**, tambahkan berkas layout.tsx baru di dalam folder dashboard:

> Jika kita menggabungkan dua layout di atas, layout root (app/layout.tsx) akan membungkus layout dasbor (app/dashboard/layout.tsx), yang akan membungkus segmen rute di dalam app/dashboard/\*.

Kedua layout tersebut akan bersarang seperti itu:
![root layout](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fnested-layout.png&w=3840&q=75)
![nested layout](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fnested-layouts-ui.png&w=3840&q=75)

### Template

template cara kerjanya mirip dengan layout. jika menambahkan template di root, maka otomatis template ini akan membungkus template template yang ada pada tiap-tiap folder rute.

beriku ini contohnya.

gambar 1.
ini adalah page root dan root template.tsx yang diberi background merah
![root template](/root-template.png)

gambar 2.
ini adalah page about dan template.tsx yang diberi background orange, template root tampil dipage ini.
![about templte](/about-template.png)

## Metadata

Dalam direktori aplikasi, kita dapat memodifikasi elemen HTML **head** seperti judul dan meta menggunakan API Metadata.

Metadata dapat didefinisikan dengan mengekspor objek metadata atau fungsi generateMetadata dalam file layout.js atau page.js.
