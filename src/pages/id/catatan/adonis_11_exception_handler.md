---
layout: ../../../layouts/MarkdownLayout.astro
title: Adonis - Exception Handler
description:
imagePath: /blog/adonis.webp
imageAlt: img-adonis
viewTransitionName: 'adonis-1'
date: 2025-11-25 09:10
icon: 'skill-icons:adonis'
tags:
  - fullstack
---

# Exception Handler

AdonisJS punya HttpExceptionHandler standar di file <kbd>app/exceptions/handler.ts</kbd> HttpExceptionHandler ini mewarisi (extends) class ExceptionHandler bawaan Adonis, yang menangani banyak logika umum.

Ada dua method penting di Exception Handler:

- handle(error, ctx) → untuk mengubah exception jadi HTTP response.
- report(error, ctx) → untuk mencatat error (log) atau melaporkannya ke sistem eksternal (sentry, dsb).

## Bagaimana Exception Handler Didaftarkan

Di file start/kernel.ts, kita harus register handler error ke server:

```ts
server.errorHandler(() => import('#exceptions/handler'))

// #exceptions/handler adalah alias default ke file app/exceptions/handler.ts.
```

## Bagaimana Error Di-handle

Secara default, handle di ExceptionHandler melakukan:

- Cek kalau error punya method handle (self-handled exception) → kalau ada, panggil dan kembalikan response spesifik.
- Cek apakah ada status page (template) untuk error.status → misal halaman 404, 500.
- Kalau tidak kedua hal di atas, pakai content negotiation renderer (mis → JSON / HTML tergantung accept header).

## Melaporkan (Report) Exception

- <kbd>report(error, ctx)</kbd> bisa kita override untuk custom behavior ketika error terjadi.
- Defaultnya, Adonis akan logging:
  - 400 - 499 → level warning
  - 500 - 5xx → level error
- kita bisa custom context log (mis: kirim requestId, userId, IP, dsb) lewat method context(ctx) di handler:

```ts
protected context(ctx) {
  return {
    requestId: ctx.request.id(),
    userId: ctx.auth.user?.id,
    ip: ctx.request.ip(),
  }
}
```

## Membuat Custom Exception

generate exception sendiri:

```shell
node ace make:exception UnAuthorizedException
```

- Exception custom bisa extend dari class Exception di <kbd>@adonisjs/core/exceptions</kbd>.
- Di dalam class exception, bisa definisikan status dan code static:

```ts
static status = 403
static code = 'E_UNAUTHORIZED'
```

- Bisa juga override handle(error, ctx) di exception itu sendiri (self-handle):

```ts
async handle(error: this, ctx: HttpContext) {
  ctx.response.status(error.status).send(error.message)
}
```

- Dan override report(error, ctx) untuk log atau reporting khusus:

```ts
async report(error: this, ctx: HttpContext) {
  ctx.logger.error({ err: error }, error.message)
}
```

## Status Pages (Halaman Error Khusus)

```ts
protected statusPages = {
  '404': (_, { view }) => view.render('errors/not-found'),
  '500..599': (_, { view }) => view.render('errors/server-error'),
}
```

Ini berguna kalau kita punya web app server-rendered dan mau tampilkan halaman error custom (Edge view/Inertia View). Kalau API JSON, mungkin kita tidak butuh status pages → bisa disable.
