---
layout: ../../../layouts/MarkdownLayout.astro
title: Adonis - Request
description: Query String & Route Params, Body Request, URL Request, Header Request
imagePath: /blog/adonis.webp
imageAlt: img-adonis
viewTransitionName: 'adonis-1'
date: 2025-11-18 09:00
icon: 'skill-icons:adonis'
tags:
  - fullstack
---

# Request

1. **Query String & Route Params**

- <kbd>request.qs()</kbd> = Mengembalikan semua query string yang diparse sebagai object.

```ts
// kalau URL: /posts?sort_by=id&direction=desc
request.qs() // → { sort_by: 'id', direction: 'desc' }
```

- <kbd>request.params()</kbd> = Mengembalikan object dari route params.

```ts
// route: /posts/:slug/comments/:id
// URL: /posts/hello-world/comments/2
request.params() // → { slug: 'hello-world', id: '2' }
```

- <kbd>request.param(name)</kbd> = Mengambil satu param berdasarkan nama.

```ts
const slug = request.param('slug')
const commentId = request.param('id')
```

2. **Body Request**

- <kbd>request.body()</kbd> = Mengembalikan body request yang sudah diparse (JSON, form, dsb.) sebagai object.

```ts
const body = request.body()
```

- <kbd>request.all()</kbd> = Menggabungkan (merge) data body + query string jadi satu object.

```ts
const data = request.all()
```

- Cherry-picking nilai:
  - <kbd>request.input(key, defaultValue?)</kbd> = ambil satu nilai spesifik (dari body atau query)

  ```ts
  const email = request.input('email')
  const comment = request.input('body', 'default comment')
  ```

  - <kbd>request.only([...keys])</kbd> = ambil beberapa field yang diinginkan dari request.

  ```ts
  const creds = request.only(['email', 'password'])
  ```

  - <kbd>request.except([...keys])</kbd> = ambil semua field kecuali field tertentu.

  ```ts
  const userData = request.except(['password_confirmation'])
  ```

3. **URL Request**

- <kbd>request.url(includeQs = false)</kbd> = Mengembalikan URL request relatif terhadap hostname, tanpa query string kecuali includeQs = true.

```ts
request.url() // misal → '/users'
request.url(true) // misal → '/users?page=1&limit=20'
```

- <kbd>request.completeUrl(includeQs = false)</kbd> = Sama seperti url(), tetapi mengembalikan complete URL (termasuk domain hostname).

```ts
request.completeUrl() // misal → 'http://example.com/users'
request.completeUrl(true) // misal → 'http://example.com/users?page=1'
```

4. **Header Request**

- <kbd>request.headers()</kbd> = Mengembalikan semua header request sebagai object.

```ts
const allHeaders = request.headers()
```

- <kbd>request.header(name, defaultValue?)</kbd> = Mengambil satu header. Nama header tidak case-sensitive.

```ts
const id = request.header('x-request-id')
const something = request.header('X-Custom-Header', 'default')
```
