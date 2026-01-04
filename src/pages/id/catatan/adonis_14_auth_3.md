---
layout: ../../../layouts/MarkdownLayout.astro
title: Adonis - Authentication (Session Guard)
description: apa itu session guard, konfigurasi, login dengan session guard, logout dengan session guard, protected route, mendapatkan user yang login, silent auth middleware, fitur remember me, middleware guest
imagePath: /blog/adonis.webp
imageAlt: img-adonis
viewTransitionName: 'adonis-1'
date: 2025-12-02 08:00
icon: 'skill-icons:adonis'
tags:
  - fullstack
---

## Apa Itu Session Guard?

Session guard adalah cara autentikasi stateful menggunakan session & cookie, cocok untuk aplikasi server-rendered atau SPA pada domain yang sama. Ini menggunakan session store untuk menyimpan status login pengguna.

## Konfigurasi Session Guard

Pada file config/auth.ts, kita akan melihat config seperti ini (ini mirip dengan yang sudah kita miliki):

```ts
import { defineConfig } from '@adonisjs/auth'
import { sessionGuard, sessionUserProvider } from '@adonisjs/auth/session'

const authConfig = defineConfig({
  default: 'web',
  guards: {
    web: sessionGuard({
      useRememberMeTokens: false,
      provider: sessionUserProvider({
        model: () => import('#models/user'),
      }),
    }),
  },
})

export default authConfig
```

> **useRememberMeTokens**: Kalau true, maka AdonisJS akan mendukung fitur Remember Me (login otomatis setelah session habis) dengan menyimpan token di database.

## Login dengan Session Guard

Contoh paling sederhana:

- Verifikasi kredensial user (biasanya pakai verifyCredentials())
- Panggil auth.use('web').login(user) untuk membuat session

```ts {10}
import User from '#models/user'
import { loginUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class LoginController {
  async store({ request, response, auth, session }: HttpContext) {
    const { email, password } = await request.validateUsing(loginUserValidator)

    try {
      const user = await User.verifyCredentials(email, password)
      await auth.use('web').login(user)
      // Setelah itu session dibuat dan cookie dikirim ke browser
      // sehingga user tetap login di permintaan selanjutnya.

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

## Melindungi Route

Gunakan middleware auth untuk mencegah akses tanpa autentikasi:

```ts
router.get('/dashboard', () => {}).use(middleware.auth())
```

Secara default middleware ini akan pakai guard default (web). Kalau mau multi-guard (mis. session + token), bisa diset:

```ts
middleware.auth({ guards: ['web', 'api'] })

/**
 * Kalau user tidak login:
 * - API → respon JSON error 401
 * - Web → redirect ke `/login` (otomatis)
 */
```

## Mendapatkan User yang Login

```ts
auth.user
```

## Atau kalau mau error kalau belum login

```ts
auth.getUserOrFail()
```

## Kalau mau cek tanpa error

```ts
await auth.check()
if (auth.isAuthenticated) { ... }
```

## Silent Auth

Ada juga **silent_auth** middleware:

- Sama seperti **auth**, tapi **tidak throw error**
- Cocok kalau route tidak wajib login, tapi kita tetap mau user dikenali jika sudah login

tambahkan di **start/kernel.ts**

```ts
router.use([
  // ...
  () => import('#middleware/silent_auth_middleware'),
])
```

## Logout

Logout sangat mudah:

```ts
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .post('logout', async ({ auth, response }) => {
    await auth.use('web').logout()
    return response.redirect('/login')
  })
  .use(middleware.auth())
```

> Session akan dihapus dari server dan cookie akan dibersihkan.

## Fitur Remember Me

Kalau kita aktifkan { useRememberMeTokens: true } pada config:

- Buat table remember_me_tokens (pakai migrasi)
  - **node ace make:migration remember_me_tokens**

  ```ts
  import { BaseSchema } from '@adonisjs/lucid/schema'

  export default class extends BaseSchema {
    protected tableName = 'remember_me_tokens'

    async up() {
      this.schema.createTable(this.tableName, (table) => {
        table.increments()
        table
          .integer('tokenable_id')
          .notNullable()
          .unsigned()
          .references('id')
          .inTable('users')
          .onDelete('CASCADE')

        table.string('hash').notNullable().unique()
        table.timestamp('created_at').notNullable()
        table.timestamp('updated_at').notNullable()
        table.timestamp('expires_at').notNullable()
      })
    }

    async down() {
      this.schema.dropTable(this.tableName)
    }
  }
  ```

- Tambahkan static rememberMeTokens di model User

  ```ts {6}
  import { BaseModel } from '@adonisjs/lucid/orm'
  import { DbRememberMeTokensProvider } from '@adonisjs/auth/session'

  export default class User extends BaseModel {
    // ...rest of the model properties
    static rememberMeTokens = DbRememberMeTokensProvider.forModel(User)
  }
  ```

- Mengaktifkan Remember Me tokens didalam **config/auth.ts**

  ```ts {8-9}
  import { defineConfig } from '@adonisjs/auth'
  import { sessionGuard, sessionUserProvider } from '@adonisjs/auth/session'

  const authConfig = defineConfig({
    default: 'web',
    guards: {
      web: sessionGuard({
        useRememberMeTokens: true,
        rememberMeTokensAge: '2 years',
        provider: sessionUserProvider({
          model: () => import('#models/user'),
        }),
      }),
    },
  })

  export default authConfig
  ```

- Saat login pakai auth.use('web').login(user, true) Ini akan menyimpan token ke cookie sehingga user tetap login meskipun session sudah expired

## Middleware guest

Middleware guest akan memeriksa apakah user sudah login. Jika sudah, maka akan diarahkan ke halaman lain (biasanya dashboard).

```ts
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router.get('/dashboard', () => {}).use(middleware.guest())
```

Bisa juga pakai multiple guard:

```ts
router.get('/dashboard', () => {}).use(middleware.guest({ guards: ['web', 'api'] }))
```
