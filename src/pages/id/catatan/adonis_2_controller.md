---
layout: ../../../layouts/MarkdownLayout.astro
title: Adonis - Controller
description: controller, single action controller
imagePath: /blog/adonis.webp
imageAlt: img-adonis
viewTransitionName: 'adonis-1'
date: 2025-11-14 12:00
icon: 'skill-icons:adonis'
tags:
  - fullstack
---

# Controller

Controller adalah tempat ngelola logika HTTP request.

untuk membuat controller bisa dengan menggunakan command

> node ace make:controller users

## Controller bertugas untuk apa aja ?

1. Menerima Request

Dapet data dari:

- body request
- query params
- path params
- header

contoh:

```ts
request.input('email')
params.id
```

<br />

2. Validasi Request (panggil validator) Controller biasanya akan:

```ts
const payload = await request.validateUsing(CreateUserValidator)
```

<br />

3. Panggil Service / Model

Controller tidak nyimpen bisnis logic berat. Dia cuma manggil **service/model** untuk ngelakuin pekerjaan.

```ts
const user = await UserService.create(input)
```

<br />

4. Mengembalikan Response

```ts
return response.ok({ message: 'success' })
```

<br />

Jadi Controller itu seperti ‘jembatan’. <br /> Controller cuma “perantara”, bukan tempat logic berat.

```ts
Frontend/client → Controller → Service → Model → Database → Controller → Client
```

Supaya kode bersih:

- Controller = untuk request/response
- Service = untuk bisnis logic
- Model = untuk database logic

Contoh controller: Controller menerima input → panggil service → kirim response.

```ts
import UserService from '#services/user_service'

export default class UsersController {
  constructor(protected userService: UserService) {}

  async store({ request, response }) {
    const payload = request.only(['email', 'password'])
    const user = await this.userService.create(payload)

    return response.status(201).json(user)
  }
}
```

<br />

# Single Action Controller

Single Action Controller adalah controller yang CUMA punya 1 method, biasanya namanya **handle()**.

## Tujuan Single-Action Controller

Dipakai kalau satu route cuma butuh satu logika, biar filenya simpel dan clean.

Biasanya untuk hal-hal seperti:

- Login
- Register
- Logout
- Webhook handlers
- Notifikasi
- Cron job handler

## Contoh Single-Action Controller

<br />

1. Buat controller

```shell
node ace make:controller Login --single
```

<br />

hasilnya seperti ini:

```ts
export default class SingleActionsController {
  async handle({ request, auth, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    console.log(email, password)
    return response.ok({ message: 'Hello World' })
    // return auth.use('web').attempt(email, password)
  }
}
```

<br/>
2. Routingnya seperti ini

```ts
import router from '@adonisjs/core/services/router'
import LoginController from '#controllers/login_controller'

router.post('/login', LoginController)
```

Tanpa specify method karena otomatis memanggil **handle()**.

## Kapan dipakai ?

Gunakan single-action kalau: Aksi kecil & spesifik

Contoh:

- /login
- /logout
- /webhook/payments
- /cron/generate-report
