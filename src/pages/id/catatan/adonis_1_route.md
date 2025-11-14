---
layout: ../../../layouts/MarkdownLayout.astro
title: Adonis - Routing
description:
imagePath: /blog/adonis.webp
imageAlt: img-adonis
viewTransitionName: 'adonis-1'
date: 2025-11-14 10:00
icon: 'skill-icons:adonis'
tags:
  - fullstack
---

# Routing

> node ace list:routes - untuk melihat daftar routes

## Route Params

1. route params menggunakan :param, contoh /posts/:id.
2. optional params: jika diakhiri dengan tanda tanya (?) contoh /posts/:id?
3. wildcard params: menggunakan (\_), contoh /docs/:category/
4. matcher params: menggunakan where() dan regex. cast digunakan untuk mengubah nilai params menjadi tipe data tertentu.
5. builtin matcher params: adonisjs memiliki beberapa matcher params bawaan, seperti uuid, number, string.

## HTTP Method

1. http method bawaan: get, post, put, delete, patch.
2. http method any: digunakan untuk menangani semua http method.
3. custom http method menggunakan route.route().

## Route Middleware

- route middleware menggunakan chaining use() method.
- route middleware digunakan untuk memproteksi route tertentu.
- cara membuat middleware:
  1. membuat file middleware di folder app/middleware.
  2. menambahkan middleware ke file kernel.ts.

  ```ts
  import AuthMiddleware from '#middleware/auth_middleware'
  export const middleware = {
    auth: () => new AuthMiddleware(),
    guest: import('#middleware/guest_middleware'),
  }
  ```

  <br/>
  3. menggunakan middleware di route.

  ```ts
  router
    .get('/dashboard', async ({ response }) => {
      return response.ok({ message: 'Welcome to dashboard' })
    })
    .use(['auth'])
  ```

  <br/>
  4. middleware global group

  ```ts
  export const middleware = { global: [() => import('#middleware/auth_middleware')] }
  ```

Jadi singkatnya: use() → pasang middleware ke route atau grup. middleware.global → untuk semua route.

## Route Identifier

- route identifier menggunakan as() method.
- route identifier bukan untuk url browser tapi untuk penamaan route aja. contoh:
  ```ts
  router
    .get('/users/:id', async ({ params }) => {
      return `User ID: ${params.id}`
    })
    .as('user.show')
  ```
  kemudian di view:
  ```vue
  <Link :href="route('user.show', { id: 123 })">User 123</Link>
  ```

## Route Group

- Basic route group

```ts
router.group(() => {
  router.get('grup1', () => 'This is grup1') // localhost:3000/grup1
  router.get('grup2', () => 'This is grup2') // localhost:3000/grup2
})
```

<br />

- Route group dengan prefix

```ts
router
  .group(() => {
    router.get('grup3', () => 'This is grup3') // localhost:3000/api/grup3
    router.get('grup4', () => 'This is grup4') // localhost:3000/api/grup4
  })
  .prefix('/api')
```

<br />

- Nested route group dengan prefix

```ts
router
  .group(() => {
    router
      .group(() => {
        router.get('grup5', () => 'This is grup5') //  localhost:3000/api/v1/grup5
        router.get('grup6', () => 'This is grup6') // localhost:3000/api/v1/grup6
      })
      .prefix('/v1')
  })
  .prefix('/api')
```

<br />

- Nested route group dengan identifier

```ts
router
  .group(() => {
    router.get('grup-identifier', () => 'This is grup-identifier').as('grup-identifier.index') // api.grup-identifier.index

    router
      .group(() => {
        router
          .get('grup-identifier2', () => 'This is grup-identifier2 index')
          .as('grup-identifier2.index') // api.commerce.grup-identifier2.index
      })
      .as('commerce')
  })
  .prefix('api')
  .as('api')
```
