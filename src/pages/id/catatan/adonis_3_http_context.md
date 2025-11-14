---
layout: ../../../layouts/MarkdownLayout.astro
title: Adonis - HTTP Context
description:
imagePath: /blog/adonis.webp
imageAlt: img-adonis
viewTransitionName: 'adonis-1'
date: 2025-11-14 14:00
icon: 'skill-icons:adonis'
tags:
  - fullstack
---

HttpContext adalah objek yang berisi semua data & utilitas terkait HTTP request yang masuk.

Setiap kali client manggil route, Adonis bakal bikin 1 instance HttpContext untuk request itu.

Isinya kaya:

- request
- response
- auth
- params
- session
- route
- logger
- dll

Dan ini otomatis di-inject ke controller action sebagai parameter.

## Contoh Sederhana

```ts
async store({ request, response }: HttpContext) {
  const body = request.body()
  return response.json(body)
}
```

{ request, response } itu diambil dari HttpContext.

## Bagian-Bagian HttpContext

1. request untuk Ngambil data masuk:

```ts
request.body()
request.input('email')
request.only(['email', 'password'])
request.headers()
request.method()
request.url()
```

<br />

2. response untuk Ngirim balik ke client:

```ts
response.ok({ message: 'Nice' })
response.status(201).json({ id: 1 })
response.notFound()
response.unauthorized()
response.redirect('/login')
```

<br />

3. params untuk route param:

```ts
// route
router.get('/users/:id', ...)

// controller
params.id
```

<br/>

4. auth untuk login/logout dan auth state:

```ts
await auth.use('web').authenticate()
const user = auth.user
```

<br/>

5. session (kalau pakai session-based auth)

```ts
session.put('cart', [1, 2, 3])
session.get('cart')
```

<br/>

6. route untuk mengetahui informasi tentang route yang sedang berjalan

```ts
route.name
route.pattern
```

<br/>

7. logger (Logging khusus untuk request):

```ts
logger.info('User created!')
```
