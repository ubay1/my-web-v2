---
layout: ../../../layouts/MarkdownLayout.astro
title: Adonis - Database Dengan Lucid
description: apa itu lucid, model, migrations, seeder, environment specific seeders
imagePath: /blog/adonis.webp
imageAlt: img-adonis
viewTransitionName: 'adonis-1'
date: 2025-11-25 11:00
icon: 'skill-icons:adonis'
tags:
  - fullstack
---

# Lucid

Lucid adalah ORM Active Record + query builder yang dibangun di atas Knex.js.

## Instalasi & Setup

```shell
node ace add @adonisjs/lucid
```

Ini akan: register service provider, command, dan buat file <kbd>config/database.ts</kbd>. file ini digunakan untuk konfigurasi database.

## Model

buat model

```shell
node ace make:model User
```

Contoh model sederhana:

```ts
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare email: string
}
```

## migrations

buat migrations

```shell
node ace make:migration users
```

contoh migration:

```ts
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('email')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
```

Setelah itu, jalankan migrasi: <kbd>node ace migration:run</kbd>

## seeders

buat seeder

```shell
node ace make:seeder User
```

contoh seeder:

```ts
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class UserSeeder extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        email: 'virk@adonisjs.com',
        password: 'secret',
      },
      {
        email: 'romain@adonisjs.com',
        password: 'supersecret',
      },
    ])
  }
}
```

Setelah itu, jalankan seeder: <kbd>node ace db:seed</kbd>

jika ingin menjalankan seeder tertentu, gunakan flag <kbd>--files</kbd>

```shell
node ace db:seed --files "./database/seeders/user_seeder.ts"
```

jika ingin memilih beberapa seeder dan menjalankan seeder

```shell
node ace db:seed -i
```

## Environment specific seeders

```ts
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class UserSeeder extends BaseSeeder {
  static environment = ['development', 'testing']

  async run() {}
}
```
