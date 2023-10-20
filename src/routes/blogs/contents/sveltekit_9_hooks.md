---
title: Sveltekit hooks
description:
imagePath: https://i.pinimg.com/originals/d2/e8/34/d2e8346922934ea035cf7c5a8b477ad8.jpg
imageAlt: sveltekit
date: 2023-08-22 08:00
tags:
  - sveltekit
---

## Hooks

'Hooks' adalah fungsi-fungsi di seluruh aplikasi yang Anda deklarasikan yang akan dipanggil oleh SvelteKit sebagai respons terhadap kejadian-kejadian tertentu, yang memberikan Anda kontrol yang baik terhadap perilaku framework.

Kode dalam modul-modul ini akan berjalan ketika aplikasi dijalankan, sehingga berguna untuk menginisialisasi klien basis data, Content Security Policy, dan lainnya.

### handle

Fungsi ini berjalan setiap kali server SvelteKit menerima permintaan - apakah itu terjadi saat aplikasi berjalan, atau selama prerendering - dan menentukan responsnya. Fungsi ini menerima objek yang mewakili permintaan dan sebuah fungsi yang disebut <b>resolve</b>, yang merender rute dan menghasilkan Response. Hal ini memungkinkan Anda untuk memodifikasi header atau badan respons, atau mem-bypass SvelteKit sepenuhnya (untuk mengimplementasikan rute secara terprogram). contoh dibawahini:

```tsx
import type { Handle } from '@sveltejs/kit';
export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/custom')) {
		return new Response('custom response');
	}
	const response = await resolve(event);
	return response;
};
```

### sequence

dengan sequence kita bisa membuat lebih dari 1 function di hooks.

```tsx
import { sequence } from '@sveltejs/kit/hooks';

async function first({ event, resolve }) {
	console.log('first pre-processing');
	const result = await resolve(event, {
		transformPageChunk: ({ html }) => {
			// transforms are applied in reverse order
			console.log('first transform');
			return html;
		},
		preload: () => {
			// this one wins as it's the first defined in the chain
			console.log('first preload');
		}
	});
	console.log('first post-processing');
	return result;
}

async function second({ event, resolve }) {
	console.log('second pre-processing');
	const result = await resolve(event, {
		transformPageChunk: ({ html }) => {
			return html;
		},
		preload: () => {
			console.log('second preload');
		},
		filterSerializedResponseHeaders: () => {
			console.log('second filterSerializedResponseHeaders');
		}
	});
	return result;
}
export const handle = sequence(first, second);
```
