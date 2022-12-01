---
title: Belajar Context & Helpers pada NuxtJs 2
description: Belajar Context & Helpers pada NuxtJs 2.
imagePath: https://miro.medium.com/max/824/1*C1rcqGPCgGKwfo4B9lb17Q.png
imageAlt: img-nuxt
date: 2022-12-02
tags:
  - javascript
  - nuxtjs
---

# CONTEXT

jika kita masukan parameter **context**, kita bisa akses semua daftar yang tersedia. <br><br>

# #app

- **tipe:** ada di route vue instance
- **tersedia:** tersedia di klien & server
- **deskripsi:** Akar dari instansi Vue yang mencakup semua plugin. Misalnya, ketika menggunakan axios, Kita dapat mengakses $axios melalui context.app.$axios. <br><br>

# #isClient

- **tipe:** tipenya Boolean
- **tersedia:** tersedia di klien & server
- **deskripsi:** Boolean yang memberitahu bahwa render dilakukan di sisi-klien.<br><br>

# #isServer

- **tipe:** tipenya Boolean
- **tersedia:** tersedia di klien & server
- **deskripsi:** Boolean yang memberitahu bahwa render dilakukan di sisi-server.<br><br>

# #isStatic

- **tipe:** tipenya Boolean
- **tersedia:** tersedia di klien & server
- **deskripsi:** Boolean yang memberitahu bahwa Anda sedang di dalam aplikasi yang dihasilkan (generated app) (melalui nuxt generate).<br><br>

# #isDev

- **tipe:** tipenya Boolean
- **tersedia:** tersedia di klien & server
- **deskripsi:** Boolean yang memberitahu bahwa Anda sedang berada di dalam mode pengembangan (dev), dapat berguna untuk menyimpan (cache) beberapa data pada mode produksi.<br><br>

# #isHMR

- **tipe:** tipenya Boolean
- **tersedia:** tersedia di klien & server
- **deskripsi:** Boolean yang memberitahu bahwa metode/middleware dipanggil dari "webpack hot module replacement" (hanya pada sisi-klien dalam mode pengembangan (dev)).<br><br>

# #route

- **tipe:** ada di Rute Vue Router
- **tersedia:** tersedia di klien & server
- **deskripsi:** Instansi rute Vue Router.<br><br>

# #store

- **tipe:** ada di Vuex store
- **tersedia:** tersedia di klien & server
- **deskripsi:** Instansi Vuex Store. Tersedia hanya jika vuex store telah diatur.<br><br>

# #env

- **tipe:** tipenya object
- **tersedia:** tersedia di klien & server
- **deskripsi:** Environment variables yang diatur di nuxt.config.js, lihat env api.<br><br>

# #params

- **tipe:** tipenya object
- **tersedia:** tersedia di klien & server
- **deskripsi:** Alias dari route.params.<br><br>

# #query

- **tipe:** tipenya object
- **tersedia:** tersedia di klien & server
- **deskripsi:** Alias dari route.query.<br><br>

# #error

- **tipe:** tipenya Function
- **tersedia:** tersedia di klien & server
- **deskripsi:** Gunakan metode ini untuk menampilkan halaman error: error(parameter). Parameter-nya harus memiliki properti statusCode dan message. bisa juga digunakan dengan try/catch<br><br>

yang lainnya. <br>

# #req, res, redirect, nuxtState, beforeNuxtRender(fn)

<br><br>

# HELPER $nuxt

1. check koneksi internet: bisa gunakan **$nuxt.isOffline** dan **$nuxt.isOnline**, mengembalikan **boolean** true / false. <br><br>

2. refresh halaman: bisa gunakan **$nuxt.refresh()**, gunakan helper ini pada method. <br><br>

3. mengontrol loading: bisa gunakan **$nuxt.$loading.start()** & **$nuxt.$loading.finish()**
