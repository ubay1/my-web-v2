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

Middleware adalah fungsi/class yang nge-intercept request sebelum masuk controller.

cara bikin middleware:

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
   - Register lewat:

   ```ts
   import server from '@adonisjs/core/services/server'
   server.use([() => import('...')])
   ```

   <br />

2. Router middleware (global middleware)
   - Middleware yang jalan di semua request yang memiliki route yang match.
   - Contoh: body parser, session, auth.
   - Register lewat:

   ```ts
   import router from '@adonisjs/core/services/router'
   router.use([() => import('...')])
   ```

   <br />

3. Named middleware
   - Middleware yang tidak otomatis dijalankan kecuali di-assign di route atau group.
   - Register lewat:

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

## Membuat middleware
