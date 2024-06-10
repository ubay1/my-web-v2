---
title: NUXT 3 advance - middleware
description:
imagePath: https://img-c.udemycdn.com/course/750x422/4395942_c476_2.jpg
imageAlt: nuxt3
viewTransitionName: 'nuxt3-middleware'
date: 2023-06-01 09:00
icon: 'vscode-icons:file-type-nuxt'
tags:
  - nuxt3
  - vue
---

## Route Middleware

Ada tiga jenis route middleware:

1. Rute middleware anonim (atau inline), yang didefinisikan secara langsung pada halaman yang digunakan.
2. Rute middleware bernama, yang ditempatkan di direktori middleware/ dan akan secara otomatis dimuat melalui impor asinkron ketika digunakan pada halaman. (Catatan: Nama route middleware dinormalisasi menjadi kebab-case, sehingga someMiddleware menjadi some-middleware).
3. Middleware rute global, yang ditempatkan di direktori middleware/ (dengan akhiran .global) dan akan secara otomatis dijalankan pada setiap perubahan rute, semua halaman kena middleware ini tanpa mendefinisikannya terlebih dahulu.

Contoh middleware auth yang melindungi halaman /dashboard:

```ts
// @noErrors
// @filename: middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
	// isAuthenticated() is an example method verifying if a user is authenticated
	if (isAuthenticated() === false) {
		return navigateTo('/login');
	}
});
```

```vue
<!-- @filename: pages/dashboard.vue -->
<script setup>
definePageMeta({
	middleware: 'auth'
});
</script>

<template>
	<h1>Welcome to your dashboard</h1>
</template>
```
