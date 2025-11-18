---
layout: ../../../layouts/MarkdownLayout.astro
title: Adonis - Middleware
description:
imagePath: /blog/adonis.webp
imageAlt: img-adonis
viewTransitionName: 'adonis-1'
date: 2025-11-15 10:00
icon: 'skill-icons:adonis'
tags:
  - fullstack
---

# Middleware

Middleware adalah kode yang dijalankan sebelum (atau sesudah) request masuk ke controller.

cara membuat middleware:

```shell
node ace make:middleware Auth
```

Dipakai buat:

- Auth
- Log request
- Rate-limit
- Kurangi/ubah payload request
- Check permission
- Inject data

## Stack Middleware

1. Server middleware
   - Jalan di semua HTTP request, bahkan jika URL tidak punya route.
   - Contoh: static assets middleware.
   - Registernya ada disini:

   ```ts
   import server from '@adonisjs/core/services/server'
   server.use([() => import('...')])
   ```

   <br />

2. Router middleware (global middleware)
   - Middleware yang jalan di semua request yang memiliki route yang match.
   - Contoh: body parser, session, auth.
   - Registernya ada disini:

   ```ts
   import router from '@adonisjs/core/services/router'
   router.use([() => import('...')])
   ```

   <br />

3. Named middleware
   - Middleware yang tidak otomatis dijalankan kecuali di-assign di route atau group.
   - Registernya ada disini:

   ```ts
   import router from '@adonisjs/core/services/router'
   router.named({
     auth: () => import('#middleware/auth_middleware'),
   })
   ```

   - Baru nanti di route:

   ```ts
   Route.get('/xxx', '…').middleware('auth')
   ```

## Format middleware

```ts
import { HttpContext } from '@adonisjs/core/http'
import { NextFn } from '@adonisjs/core/types/http'

export default class UserLocationMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    // …
    await next()
    // …
  }
}
```

Dalam method handle, kita bisa:

- <kbd>Abort request</kbd>: dengan throw error → tidak lanjut middleware + route handler.
- <kbd>Continue request</kbd>: dengan await next() → lanjut ke middleware selanjutnya/route handler.
- <kbd>Send response segera </kbd>: tidak perlu next(), langsung kirim response.

## Assign middleware ke routes & groups

- Untuk named middleware: assign ke route atau kelompok route.

```ts
import { middleware } from '#start/kernel'

router.get('posts', () => {}).use(middleware.userLocation())
// atau
router.get('payments', () => {}).use([middleware.auth(), middleware.userLocation()])
```

- Untuk route group:

```ts
router
  .group(() => {
    router.get('posts', () => {})
    router.get('users', () => {})
  })
  .use(middleware.userLocation())
```
