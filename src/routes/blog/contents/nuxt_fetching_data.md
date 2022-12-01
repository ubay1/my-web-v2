---
title: Belajar Asyncronus fetching  data di nuxt
description: Asyncronus fetch data di nuxtjs ada 2 yaitu fetch dan asyncData
imagePath: https://miro.medium.com/max/824/1*C1rcqGPCgGKwfo4B9lb17Q.png
imageAlt: img-nuxt
date: 2022-12-02
tags:
  - nuxtjs
---

# Fetch Hook

fetch adalah hook yang dipanggil selama rendering sisi server setelah instance komponen dibuat, dan pada klien saat menavigasi. Fetch hook harus mengembalikan sebuah promise (baik secara eksplisit, atau implisit menggunakan **async await**). <br><br>

menggunakan **$fetchState** untuk menampilkan placeholder, ada 3 **$fetchState** yaitu pending, error, dan timestamp yang bertipe **boolean**: <br><br>

```vue
<template>
<div>
  <p v-if="$fetchState.pending">
        Fetching mountains...
  </p>
  <p v-else-if="$fetchState.error">
    An error occured :(
  </p>
  <div v-else>
    <h1>Nuxt Mountains</h1>
    <ul>
      <li v-for="mountain of mountains" :key="`index-${mountain.id}`">
        {{ mountain.title }}
      </li>
    </ul>
    <button class="
      bg-red-500
      px-1
      py-1
      rounded-md
      shadow-md
      text-white"
      @click="$fetch"
    >
      Refresh
    </button>
  </div>
<div>
</template>

<script>
export default {
  async fetch () {
    const id = params.id
    this.mountains = await
    this.$nuxt
    .$nuxtRepository
    .index()
    // menggunkan repository pattern
  },
  fetchOnServer: true,
  fetchDelay: 500,
  data () {
    return {
      mountains: []
    }
  }
}
</script>
```

<br>

# Fetch dimethod

kita bisa gunakan **$fetch** pada button, <br>

```vue
<template>
	<div>
		<button
			class="
  bg-red-500 
    px-1
    py-1
    rounded-md 
    shadow-md
    text-white"
			@click="$fetch"
		>
			Refresh
		</button>
	</div>
</template>
```

<br>

fetch memiliki opsi, diantaranya **fetchOnServer** dan **fetchDelay**: <br>

1. **fetchOnServer** : defaultnya **true**, jika diubah ke **false** maka akan melakukan fetch melalui sisi klien. <br>
2. **fetchDelay** : tipenya **integer**, menampilkan data dengan delay sesuai yang kita inputkan. <br><br>

# Caching

kita dapat gunakan **keep-alive** pada component **Nuxt** dan **nuxt-child** to menyimpan hasil **fetch** pada halaman yang telah dikunjungi. keep-alive bisa dikombinasikan dengan lifecycle **activated**. <br><br>

# Activated Hook

Hook activated Vue digunakan di sini dengan keep-live untuk mengambil kembali data.

```vue
<template>
	<div></div>
</template>

<script>
export default {
	activated() {
		const a = this.$fetchState.timestamp;
		if (a <= Date.now() - 60000) {
			this.$fetch();
		}
	}
};
</script>
```

<br>

# asyncData

Tidak seperti fetch, asyncData tidak dapat mengakses instance komponen **this**. Sebaliknya, ia menerima **context** sebagai **parameternya**. pada asyncData kita tidak bisa mengirim data hasil fetching ke **data()**, tapi kita langsung bisa menggunakannya pada html. lihat contoh berikut ini. <br>

```vue
<template>
	<div>
		<h1>{{ post.title }}</h1>
		<p>{{ post.description }}</p>
	</div>
</template>

<script>
export default {
	async asyncData({ params, app }) {
		const id = params.id;
		const post = await app.$nuxtRepository.show(id);
		return { post };
	}
};
</script>
```
