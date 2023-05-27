---
title: NUXT 3 basic - views (components, layouts)
description:
imagePath: https://nuxt.com/assets/design-kit/logo/icon-green.png
imageAlt: nuxt3
date: 2023-05-25 10:55:00
tags:
  - nuxt3
  - vue
---

## View

Nuxt menyediakan beberapa lapisan komponen untuk mengimplementasikan antarmuka pengguna aplikasi Anda.

### Components

Sebagian besar komponen adalah bagian antarmuka pengguna yang dapat digunakan kembali, seperti tombol dan menu. Di Nuxt, Kita dapat membuat komponen ini di direktori **components/**, dan komponen ini akan tersedia secara otomatis di seluruh aplikasi kita tanpa harus mengimpornya.
kerennya di nuxt3. misal kita taruh componentnya di dalam folder. misal didalam folder **components/test/anu.vue**. jika kita gunakan komponen itu namanya akan menjadi **test-anu**.

### Layouts

Layout adalah pembungkus di sekitar halaman yang berisi Antarmuka Pengguna umum untuk beberapa halaman, seperti tampilan header dan footer. Layout menggunakan komponen **slot** untuk menampilkan konten halaman.
untuk dapat mengganti layout default per halaman kita bisa gunakan seperti ini:

```vue
<script>
// bekerja di `<script setup>` dan `<script>`
definePageMeta({
	layout: 'custom'
});
</script>
```
