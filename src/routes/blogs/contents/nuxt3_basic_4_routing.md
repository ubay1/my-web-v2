---
title: NUXT 3 basic - routing (dynamic route, catch all route, nested route, route parameter)
description:
imagePath: https://img-c.udemycdn.com/course/750x422/4395942_c476_2.jpg
imageAlt: nuxt3
date: 2023-05-26 08:30:00
tags:
  - nuxt3
  - vue
---

## Routing

Salah satu fitur inti dari Nuxt adalah router sistem file. Setiap file Vue di dalam direktori **pages/** membuat URL (atau rute) yang sesuai yang akan menampilkan konten file. Dengan menggunakan impor dinamis untuk setiap halaman, Nuxt memanfaatkan pemecahan kode untuk mengirimkan jumlah minimum JavaScript untuk rute yang diminta.

### Navigation

untuk navigasi antar page, kita bisa menggunakan **NuxtLink** / **nuxt-link**, contoh:

```js
<template>
	<header>
		<nav>
			<ul>
				<li>
					<nuxt-link to="/about">About</nuxt-link>
				</li>
				<li>
					<nuxt-link to="/posts/1">Post 1</nuxt-link>
				</li>
				<li>
					<nuxt-link to="/posts/2">Post 2</nuxt-link>
				</li>
			</ul>
		</nav>
	</header>
</template>
```

### Dynamic Route

Jika kita menempatkan apa pun di dalam tanda kurung siku, itu akan diubah menjadi parameter rute dinamis. kita dapat mencampur dan mencocokkan beberapa parameter dan bahkan teks non-dinamis dalam nama file atau direktori.
contoh:

```js
-| pages/
---| index.vue
---| users-[group]/
-----| [id].vue
```

[group] diatasa kita bisa isi apapun sesuka kita. kita dapat membuat seperti ini:

```js
<nuxt-link to="/users-test/2"/> User test </nuxt-link>
```

Jika kita ingin parameter bersifat opsional, kita harus mengapitnya dalam tanda kurung siku ganda - misalnya, ~/pages/[[id]]/index.vue atau ~/pages-[group]/[[id]].vue

```js
-| pages/
---| index.vue
---| users-[group]/
-----| [[id]].vue
```

kita bisa akses seperti ini:

```js
<nuxt-link to="/users-test/2"/> User test </nuxt-link>
<nuxt-link to="/users-test"/> User test </nuxt-link>
```

### Catch-All Route

Jika kita memerlukan rute penampung-semua, kita membuatnya dengan menggunakan file bernama seperti **[...slug].vue**. Ini akan cocok dengan semua rute di bawah jalur itu. kita bisa membuat route seperti ini.

```js
-| pages/
---| index.vue
---| users/
-----| [...detail].vue
```

kita bisa membiuat navigasi seperti ini:

```js
<nuxt-link to="/users/ubay/delonge"/> User test </nuxt-link>
```

### Nested Routes

```js
-| pages/
---| index.vue
---| ilp/
-----| posyandu
-------| balita.vue
-------| balita
---------| index.vue
```

kita bisa membuat child route, dengan menggunakan **NuxtPage**.

```vue
<!-- balita.vue -->
<template>
	<div>
		<h1>I am the parent view</h1>
		<NuxtPage />
	</div>
</template>

<script setup></script>
```

```vue
<!-- balita/index.vue -->
<template>
	<div class="mt-10">
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, sed deleniti laudantium
		veniam quidem explicabo iusto eaque quaerat blanditiis iste aspernatur sunt vel magnam fuga
		dolores non, culpa nam! Maiores. wkwk
	</div>
</template>

<script setup></script>
```

### Route Parameter

untuk mendapatkan query parameter kita bisa gunakan **useRoute()**.
conoth kita mempunyai file **pages/posts/[id].vue**.

```vue
<script setup>
const route = useRoute();

// ketika akses /posts/1, route.params.id = 1
console.log(route.params.id);
</script>
```
