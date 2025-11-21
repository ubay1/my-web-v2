---
layout: ../../../layouts/MarkdownLayout.astro
title: Adonis - Validation
description:
imagePath: /blog/adonis.webp
imageAlt: img-adonis
viewTransitionName: 'adonis-1'
date: 2025-11-18 09:10
icon: 'skill-icons:adonis'
tags:
  - fullstack
---

# Validation

1. **Setup VineJS**

```bash
node ace add vinejs
```

Command itu akan menginstall **@vinejs/vine** dan mendaftarkan service provider VineJS di adonisrc.ts.

2. **Membuat Validator**

Gunakan command: **node ace make:validator nama** = ini akan membuat file validator di folder app/validators. contoh:

```ts
import vine from '@vinejs/vine'

export const createPostValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(6),
    slug: vine.string().trim(),
    description: vine.string().trim().escape(),
  }),
)

export const updatePostValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(6),
    description: vine.string().trim().escape(),
  }),
)
```

3. **Menggunakan Validator di Controller**

Di controller, kamu bisa pakai <kbd>request.all()</kbd> untuk ambil data request (body + query + params)

```ts {2,6-8,12-14}
import { HttpContext } from '@adonisjs/core/http'
import { createPostValidator, updatePostValidator } from '#validators/post_validator'

export default class PostsController {
  async store({ request }: HttpContext) {
    const data = request.all()
    const payload = await createPostValidator.validate(data)
    return payload
  }

  async update({ request }: HttpContext) {
    const data = request.all()
    const payload = await updatePostValidator.validate(data)
    return payload
  }
}
```

Atau cara yang lebih direkomendasi: <kbd>request.validateUsing(...)</kbd>. Ini otomatis menggabungkan data dari body, query, dan file.

```ts {2,6-7,11-12}
import { HttpContext } from '@adonisjs/core/http'
import { createPostValidator, updatePostValidator } from '#validators/post_validator'

export default class PostsController {
  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createPostValidator)
    return payload
  }

  async update({ request }: HttpContext) {
    const payload = await request.validateUsing(updatePostValidator)
    return payload
  }
}
```

Jika validasi gagal, Adonis akan otomatis tangani error → lempar exception → di-handle di exception handler. Kamu gak perlu try/catch manual di controller hanya untuk validasi.
