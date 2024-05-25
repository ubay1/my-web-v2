---
title: NUXT 3 basic - assets (public/, assets/)
description:
imagePath: https://img-c.udemycdn.com/course/750x422/4395942_c476_2.jpg
imageAlt: nuxt3
viewTransitionName: 'nuxt3-assets'
date: 2023-05-26 05:00
tags:
  - nuxt3
  - vue
---

## Assets

Nuxt menggunakan dua direktori untuk menangani aset seperti stylesheet, font, atau gambar.

1. Konten direktori **public/** disajikan di root server apa adanya.
2. Direktori **assets/** berisi konvensi setiap aset yang kita inginkan untuk diproses oleh alat build (Vite atau webpack).

### Directori public/

kita bisa mendapatkan file di direktori **public/** dari kode aplikasi kita atau dari browser dengan URL root **/**

contoh kita memiliki file image di folder **public/img/nuxt.png**, kita bisa mengaksesnya seperti ini :

```vue
<!-- @filename: public/ -->
<template>
	<img src="/img/nuxt.png" alt="Discover Nuxt 3" />
</template>
```

### Directori assets/

kita bisa mendapatkan file di direktori **assets/** dengan cara mengakses langsung ke folder assets **~/assets**. contoh:

```vue
<!-- @filename: assets/ -->
<template>
	<img src="~/assets/img/nuxt.png" alt="Discover Nuxt 3" />
</template>
```
