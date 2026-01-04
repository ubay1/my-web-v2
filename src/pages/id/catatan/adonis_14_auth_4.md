---
layout: ../../../layouts/MarkdownLayout.astro
title: Adonis - Authentication (Access Tokens Guard)
description: apa itu access tokens guard
imagePath: /blog/adonis.webp
imageAlt: img-adonis
viewTransitionName: 'adonis-1'
date: 2025-12-02 12:00
icon: 'skill-icons:adonis'
tags:
  - fullstack
---

## Apa Itu Access Tokens Guard?

Access tokens guard digunakan untuk autentikasi API atau klien yang tidak bisa menyimpan cookie/session misalnya aplikasi mobile, frontend terpisah, atau API publik.

AdonisJS mengeluarkan opaque access tokens yang:

- Terlihat seperti string acak dengan prefix (oat\_)
- Disimpan sebagai hash di database
- Dicek setiap request tanpa bergantung pada session/cookie

## Setup - Model User

Sebelum pakai guard, model User harus dilengkapi dengan provider token:

```ts {5}
import { BaseModel } from '@adonisjs/lucid/orm'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'

export default class User extends BaseModel {
  static accessTokens = DbAccessTokensProvider.forModel(User)
}
```

> Ini memberitahu AdonisJS: “User ini bisa punya access tokens yang disimpan di tabel auth_access_tokens.”

kita juga bisa kustom:

- expiresIn: kapan token berakhir
- prefix: awalan token publik
- table: nama tabel lain
- type: tipe token (mis. auth_token)
- tokenSecretLength: panjang token acak

```ts {3-7}
export default class User extends BaseModel {
  static accessTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn: '30 days',
    prefix: 'oat_',
    table: 'auth_access_tokens',
    type: 'auth_token',
    tokenSecretLength: 40,
  })
}
```

## Tabel Database Token

Auth sudah menyediakan migrasi untuk tabel:

- id: Primary key
- tokenable_id: ID user
- type: Tipe token
- name: Nama token
- hash: Hash token
- abilities: Kemampuan token
- last_used_at: Terakhir dipakai
- expires_at: Waktu kadaluarsa

Jika kita mengonfigurasi paket auth secara manual karena suatu alasan, pastikan untuk membuat migrasi tabel **auth_access_tokens**.

```bash
node ace make:migration auth_access_tokens
```

lalu ubah isi dari file migrasi **auth_access_tokens** seperti ini:

```ts
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'auth_access_tokens'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('tokenable_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      table.string('type').notNullable()
      table.string('name').nullable()
      table.string('hash').notNullable()
      table.text('abilities').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.timestamp('last_used_at').nullable()
      table.timestamp('expires_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
```

## Mengeluarkan (Issue) Token

Contoh endpoint yang buat token baru:

```ts
import User from '#models/user'

router.post('/users/:id/tokens', async ({ params }) => {
  const user = await User.findOrFail(params.id)
  const token = await User.accessTokens.create(user)
  return {
    type: 'bearer',
    value: token.value!.release(), // ini string token yang harus disimpan klien.
  }

  //  return token
  /**
   * kalau return token aja, seperti ini:
   * response: {
   *   type: 'bearer',
   *   value: 'oat_MTA.aWFQUmo2WkQzd3M5cW0zeG5JeHdiaV9rOFQzUWM1aTZSR2xJaDZXYzM5MDE4MzA3NTU',
   *   expiresAt: null,
   * }
   */
})
```

## Konfigurasi Access Tokens Guard

Tambahkan ke config/auth.ts:

```ts {10-14}
import { tokensGuard, tokensUserProvider } from '@adonisjs/auth/access_tokens'

const authConfig = defineConfig({
  default: 'api',
  guards: {
    api: tokensGuard({
      provider: tokensUserProvider({
        tokens: 'accessTokens',
        model: () => import('#models/user'),
      }),
    }),
  },
})
export default authConfig
```

> tokens: 'accessTokens' harus sesuai nama static property di model.

## Authenticate Requests

1. Dengan Auth Middleware

Gunakan di routes:

```ts
import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

router
  .post('projects', async ({ auth }) => {
    console.log(auth.user) // User
    console.log(auth.authenticatedViaGuard) // 'api'
    console.log(auth.user!.currentAccessToken) // AccessToken
  })
  .use(
    middleware.auth({
      guards: ['api'],
    }),
  )
```

2. Cek Jika Request Terautentikasi

```ts
import { HttpContext } from '@adonisjs/core/http'

class PostsController {
  async store({ auth }: HttpContext) {
    if (auth.isAuthenticated) {
      await auth.user!.related('posts').create(postData)
    }
  }
}
```

3. Menampilkan authenticated user atau fail

method ini akan throw error E_UNAUTHORIZED_ACCESS jika user tidak terautentikasi.

```ts
import { HttpContext } from '@adonisjs/core/http'

class PostsController {
  async store({ auth }: HttpContext) {
    const user = auth.getUserOrFail()
    await user.related('posts').create(postData)
  }
}
```

4. Menampilkan token yang sedang digunakan

tambahkan properti ini di model:

```ts {1, 4}
import { AccessToken } from '@adonisjs/auth/access_tokens'

export default class User extends BaseModel {
  currentAccessToken?: AccessToken
}
```

## Daftar List Token

Lihat semua token user:

```ts
router
  .get('/tokens', async ({ auth }) => {
    return User.accessTokens.all(auth.user!)
  })
  .use(
    middleware.auth({
      guards: ['api'],
    }),
  )
```

```ts
@each(token in tokens)
  <h2> {{ token.name }} </h2>
  @if(token.isExpired())
    <p> Expired </p>
  @end

  <p> Abilities: {{ token.abilities.join(',') }} </p>
@end
```

## Hapus Token

```ts
await User.accessTokens.delete(auth.user!, token.identifier)
```

## Login & Logout dengan Access Tokens Guard

Login API

```ts
const user = await User.verifyCredentials(email, password)
const token = await auth.use('api').createToken(user)
return token
```

> Ini cenderung lebih rapih kalau kita mau satu method buat login.

Logout Hapus token aktif yang dipakai saat ini:

```ts
await auth.use('api').invalidateToken()
```

> Ini hanya revoke token yang membuat request, bukan semua token.
