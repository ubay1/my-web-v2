---
title: Sveltekit -  routing lanjutan (rest parameter, advance layout (group, +page@.svelte, +page@{nama_group}.svelte, +layout@.svelte))
description:
imagePath: https://miro.medium.com/v2/resize:fit:1400/1*G9fzmaoymDGy7scbkgpC7A.png
imageAlt: svelte
viewTransitionName: 'sveltekit-routing-advance'
date: 2023-08-20 08:00
tags:
  - sveltekit
---

## Rest Parameter

rest parameter berguna jika jumlah segmen rute tidak diketahui.

contoh route dibawah ini:
<b>src/routes/a/[...rest]/z/+page.svelte</b>.
kita bisa akses /a/z (yaitu tidak ada parameter sama sekali) atau juga /a/b/z dan /a/b/c/z dan seterusnya.

```md
src/routes/
├ a/
│ ├ +page.svelte
│ ├ [...rest]/
│ ├ +page.svelte
│ ├ z/
│ └ +page.svelte
└ +page.svelte
```

## 404 Pages

kita juga dapat menambahkan page error, pada routes. jadi ketika kita akses ke route /a/kocak maka yang tampil ada halaman error.

```md
src/routes/
├ a/
│ ├ +page.svelte
│ ├ [...rest]/
│ ├ +error.svelte
│ ├ z/
│ └ +page.svelte
└ +page.svelte
└ +error.svelte
```

contoh isi dari +error.svelte

```svelte title="src/routes/+page.svelte"
<script lang="ts">
	import { page } from '$app/stores';
</script>

<div>{$page.status}</div>
<div>
	{$page.status === 404 ? 'Maaf, Halaman yang anda minta tidak ditemukan.' : $page.error?.message}
</div>

<button on:click={() => (window.location.href = '/')}> Kembali </button>
```

## Advance layout

Mungkin kita memiliki beberapa rute yang merupakan rute 'app' yang seharusnya memiliki satu tata letak (misalnya /dashboard atau /item), dan yang lainnya adalah rute 'marketing' yang seharusnya memiliki tata letak yang berbeda (/tentang atau /testimonial). Kita dapat mengelompokkan rute-rute ini dengan direktori yang namanya dibungkus dalam tanda kurung.

contoh directorynya seperti dibawah ini:
untuk mengakses routesnya kita tidak perlu menuliskan (app)/(marketing). kita langsung masukan routes yang ada didalam folder (app)/(marketing). kita bisa mengakses routes tersebut seperti ini <b>url/dashboard, url/item.</b>

```md
src/routes/
│ (app)/
│ ├ dashboard/
│ ├ item/
│ └ +page .svelte
│ └ +layout.svelte
│ (marketing)/
│ ├ about/
│ ├ testimonials/
│ └ +layout.svelte
├ admin/
└ +layout.svelte
```

### +page@

kita dapat menentukan suatu page dapat menggunakan layout yang mana yang ada didalam routes group. contoh kita memiliki hirarki folder seperti ini:

```md
src/routes/
├ (app)/
│ ├ item/
│ │ ├ [id]/
│ │ │ ├ embed/
│ │ │ │ └ +page.svelte
│ │ │ └ +layout.svelte
│ │ └ +layout.svelte
│ └ +layout.svelte
└ +layout.svelte
```

ada beberapa opsi dari hirarki diatas:

```md
+page@[id].svelte - turunan dari src/routes/(app)/item/[id]/+layout.svelte
+page@item.svelte - turunan dari src/routes/(app)/item/+layout.svelte
+page@(app).svelte - turunan dari src/routes/(app)/+layout.svelte
+page@.svelte - turunan dari src/routes/+layout.svelte
+page.svelte - jika page ini memiliki layout maka yang digunakan layout tsb, jika tidak ada maka akan menjadi turunan dari src/routes/(app)/item/[id]/+layout.svelte
```

contoh jika kita menggunakan layout yang ada di root (app)

```md
src/routes/
├ (app)/
│ ├ item/
│ │ ├ [id]/
│ │ │ ├ embed/
│ │ │ │ └ +page@(app).svelte
│ │ │ └ +layout.svelte
│ │ └ +layout.svelte
│ └ +layout.svelte
└ +layout.svelte
```

### +layout@

Tidak semua kasus penggunaan cocok untuk pengelompokan tata letak, dan kita juga tidak perlu merasa harus menggunakannya. Mungkin saja kasus penggunaan kita akan menghasilkan pengelompokan (grup) yang rumit, Tidak masalah untuk menggunakan cara lain seperti komposisi (fungsi pemuatan yang dapat digunakan kembali atau komponen Svelte) atau if-statement untuk mencapai apa yang kita inginkan.
