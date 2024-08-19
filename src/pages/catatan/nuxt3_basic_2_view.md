---
layout: ../../layouts/MarkdownLayout.astro
title: NUXT 3 basic - views (components, layouts)
description:
imagePath: https://img-c.udemycdn.com/course/750x422/4395942_c476_2.jpg
imageAlt: nuxt3
viewTransitionName: 'nuxt3-views'
date: 2023-05-25 10:55
icon: 'devicon:typescript'
tags:
  - nuxt3
  - vue
---

## View

Nuxt menyediakan beberapa lapisan komponen untuk mengimplementasikan antarmuka pengguna aplikasi kita.

### #Components

Sebagian besar komponen adalah bagian antarmuka pengguna yang dapat digunakan kembali, seperti tombol dan menu. Di Nuxt, Kita dapat membuat komponen ini di direktori **components/**, dan komponen ini akan tersedia secara otomatis di seluruh aplikasi kita tanpa harus mengimpornya.
kerennya di nuxt3. misal kita taruh componentnya di dalam folder. misal didalam folder **components/test/anu.vue**. jika kita gunakan komponen itu namanya akan menjadi **test-anu**.

#### # Custom directories

kita juga bisa membuat custom directories. <br/>
pertama kita buat komponen **components/posyandu-bayi/main.vue**

```vue
<!-- @filename: components/posyandu-bayi/main.vue -->
<template>
	<div>ini posyandu bayi</div>
</template>
<script setup></script>
```

pada **nuxt.config.ts** kita bisa tambahkan ini:

```ts
// @noErrors
// @filename: nuxt.config.ts
export default defineNuxtConfig({
	components: [{ path: '~/components/posyandu-bayi', prefix: 'PosBayi' }, '~/components']
});
```

sekarang kita bisa panggil komponennya dimana saja dengan nama **PosBayiMain**

#### # Direct imports

Kita juga bisa mengimpor komponen secara eksplisit dari #components jika kita ingin atau perlu mem-bypass fungsionalitas impor otomatis Nuxt.

```vue
<template>
	<PosyBayiMain />
</template>
<script setup>
import { PosBayiMain } from '#components';
</script>
```

#### # ClientOnly Component

Nuxt menyediakan komponen **ClientOnly** untuk merender komponen hanya di sisi klien.

```vue
<template>
	<div>
		<Sidebar />
		<ClientOnly>
			<!-- this component will only be rendered on client-side -->
			<Comments />
		</ClientOnly>
	</div>
</template>
```

kita juga bisa menggunakan **fallbackTag** untuk menunggu component selesai dirender di client.

```vue
<template>
	<div>
		<Sidebar />
		<!-- This renders the "span" element on the server side -->
		<ClientOnly fallbackTag="span">
			<!-- this component will only be rendered on client side -->
			<Comments />
			<template #fallback>
				<!-- this will be rendered on server side -->
				<p>Loading comments...</p>
			</template>
		</ClientOnly>
	</div>
</template>
```

#### #.client Component

komponen akan dirender hanya pada sisi klien, Kita dapat menambahkan akhiran **.client** pada komponen kita.

```md
| components/
--| Comments.client.vue
```

kita bisa kombinasikan dengan ClientOnly dan **fallbackTag**

#### #.server Component

dengan menggunakan server component, kita dapat mengecilkan bundle size.
untuk menggunakan server component kita harus menambahkan ini pada file **nuxt.config.ts**.

```ts
// @noErrors
// @filename: nuxt.config.ts
export default defineNuxtConfig({
	experimental: {
		componentIslands: true
	}
});
```

<div class="bg-gray-4 text-black italic p-2"> kita bisa testing untuk melihat perbedaan antar .client dan .server komponen, kita bisa install ekstensi <b>Quick Javascript Switcher</b>, lalu kita coba matikan javascriptnya dan refresh halamannya. atau bisa lihat contoh dibawah ini.
</div>

ketika javascript dimatikan, komponen **PosBayiMain2** tidak tampil. karna hanya tampil di client.

```vue
<template>
	<div>
		<!-- this .server component -->
		<PosBayiMain />
		<!-- this .client component -->
		<PosBayiMain2 />
	</div>
</template>
```

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
