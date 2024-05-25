---
title: NUXT 3 basic - environtment variabel
description:
imagePath: https://img-c.udemycdn.com/course/750x422/4395942_c476_2.jpg
imageAlt: nuxt3
viewTransitionName: 'nuxt3-env'
date: 2023-05-25 09:00
tags:
  - nuxt3
  - vue
---

## Env Variable & Private Token

ada 2 cara untuk menyimpan data penting seperti URL API, static token dll.

1. pakai **runtimeConfig** yang ada di **nuxt.config.ts**
2. pakai Environtment Variabel (.env)

bedanya runtimeConfig dan Environtment Variabel,

- kalau pakai runtime menampilkan data kita ke seluruh aplikasi.
- Secara default, key yang ada di runtimeConfig ini hanya tersedia di sisi server.
- key dalam runtimeConfig.public juga tersedia di sisi klien. Nilai tersebut harus didefinisikan di nuxt.config dan dapat diganti menggunakan variabel lingkungan.

contoh, kita buat runtimeConfig seperti ini.

```ts
// @noErrors
runtimeConfig: {
  apiSecret: "https://anonymous.id",
  public: {
    apiBases: 'https://anonymous-dev.id',
  },
},
```

hasil nya akan keluar ini jika kita beri log:

```ts
// @noErrors
{
  app: { baseURL: '/', buildAssetsDir: '/_nuxt/', cdnURL: '' },
  nitro: {
    routeRules: {
      '/__nuxt_error': [Object],
      '/vue/advances/**': [Object],
      '/nuxt/fetching/**': [Object]
    },
    envPrefix: 'NUXT_'
  },
  public: { apiBases: 'https://anonymous.id' },
  apiSecret: 'https://anonymous-dev.id'
}
```

misal kita ingin ubah nilai apiSecret ini melalui environtment variabel (.env), kita bisa buat seperti ini.

```ts
// @noErrors
NUXT_API_SECRET = anonymous;
NUXT_PUBLIC_API_BASES = anonymous_client;
```

maka jika kita cek log lagi, hasilnya

```ts
// @noErrors
{
  app: { baseURL: '/', buildAssetsDir: '/_nuxt/', cdnURL: '' },
  nitro: {
    routeRules: {
      '/__nuxt_error': [Object],
      '/vue/advances/**': [Object],
      '/nuxt/fetching/**': [Object]
    },
    envPrefix: 'NUXT_'
  },
  public: { apiBases: 'anonymous_client' },
  apiSecret: 'anonymous'
}
```
