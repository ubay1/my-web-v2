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

Kode dalam modul-modul ini akan berjalan ketika aplikasi dijalankan, sehingga berguna untuk menginisialisasi klien basis data, security, authorization dan lainnya.

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

export const handleSecurity: Handle = (async ({ event, resolve }) => {
	const securityHeaders = {
		'Content-Security-Policy':
			"img-src 'self' data:; font-src https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrFJA.ttf; object-src 'none';",
		// 'Cross-Origin-Embedder-Policy': 'require-corp',
		'Cross-Origin-Opener-Policy': 'same-origin',
		'Cross-Origin-Resource-Policy': 'same-origin',
		'Origin-Agent-Cluster': '?1',
		'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
		'Referrer-Policy': 'no-referrer',
		'Strict-Transport-Security': 'max-age=15552000; includeSubDomains',
		'X-Content-Type-Options': 'nosniff',
		'X-DNS-Prefetch-Control': 'off',
		'X-Download-Options': 'noopen',
		'X-Frame-Options': 'SAMEORIGIN',
		'X-Permitted-Cross-Domain-Policies': 'none',
		'X-XSS-Protection': '0'
	};

	const response = await resolve(event);
	Object.entries(securityHeaders).forEach(([header, value]) => response.headers.set(header, value));

	return response;
}) satisfies Handle;

export const handleRoutes: Handle = (async ({ event, resolve }) => {
	event.locals.token_skd = authenticateUser(event);

	if (event.url.pathname.startsWith('/dashboard') && !event.locals.token_skd) {
		return new Response(null, {
			status: 302,
			headers: {
				location: '/login'
			}
		});
	}

	if (
		(event.url.pathname.startsWith('/login') || event.url.pathname.startsWith('/register')) &&
		event.locals.token_skd
	) {
		return new Response(null, {
			status: 302,
			headers: {
				location: '/dashboard'
			}
		});
	}

	return await resolve(event);
}) satisfies Handle;

export const handle = sequence(handleSecurity, handleRoutes);
```
