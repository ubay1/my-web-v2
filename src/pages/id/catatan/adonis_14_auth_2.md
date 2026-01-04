---
layout: ../../../layouts/MarkdownLayout.astro
title: Adonis - Authentication (Verifying user credentials)
description: Tujuan, contoh dasar, AuthFinder.
imagePath: /blog/adonis.webp
imageAlt: img-adonis
viewTransitionName: 'adonis-1'
date: 2025-12-01 14:00
icon: 'skill-icons:adonis'
tags:
  - fullstack
---

## Tujuan

untuk menemukan user & memverifikasi passwordnya secara aman baik untuk login session maupun token tanpa langsung bergantung pada guard.

## Contoh Dasar (Tidak aman)

Ini adalah cara manual yang sering dipakai untuk verifikasi login:

```ts
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

const user = await User.findBy('email', email)

if (!user) {
  return response.abort('Invalid credentials')
}

const isPasswordValid = await hash.verify(user.password, password)

if (!isPasswordValid) {
  return response.abort('Invalid credentials')
}
// lanjut login
```

⚠️ Masalah:

Waktu respon berbeda jika user tidak ditemukan vs password salah

Ini bisa jadi titik timing attack untuk attacker Oleh karena itu tidak direkomendasikan.

Cara Aman: Pakai **AuthFinder** Mixin

AdonisJS punya mixin withAuthFinder yang:

- menambahkan method **verifyCredentials()**
- aman dari timing attack
- bekerja baik untuk session maupun token auth

## Setup Model

```ts
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import hash from '@adonisjs/core/services/hash'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'], // field unik untuk login
  passwordColumnName: 'password', // nama kolom password
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true }) declare id: number
  @column() declare email: string
  @column() declare password: string
}
```

🔑 Catatan:

- uids bisa email / username / phone, dll
- scrypt adalah hasher default (kita bisa pakai lainnya)

Setelah mixin diterapkan, kita bisa gunakan di controller:

```ts {10}
import User from '#models/user'
import { loginUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class LoginController {
  async store({ request, response, auth, session }: HttpContext) {
    const { email, password } = await request.validateUsing(loginUserValidator)

    try {
      // mencari user berdasarkan UID
      // kalau gagal → langsung throw E_INVALID_CREDENTIALS exception
      const user = await User.verifyCredentials(email, password)
      await auth.use('web').login(user)

      session.flash('success', 'Login sukses')

      return response.redirect('/')
    } catch {
      session.flashErrors({
        auth: 'User tidak ditemukan atau password salah',
      })

      return response.redirect().back()
    }
  }
}
```
