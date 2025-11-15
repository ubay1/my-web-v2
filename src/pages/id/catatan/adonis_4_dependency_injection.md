---
layout: ../../../layouts/MarkdownLayout.astro
title: Adonis - Dependency Injection
description:
imagePath: /blog/adonis.webp
imageAlt: img-adonis
viewTransitionName: 'adonis-1'
date: 2025-11-14 15:00
icon: 'skill-icons:adonis'
tags:
  - fullstack
---

# Dependency Injection

Dependency Injection = cara ngasih (meng-inject) sebuah object/class yang dibutuhin oleh kode kita, tanpa kita bikin sendiri di dalam function/class itu.

Alias: <br/> ➡️ Kamu butuh sesuatu? Framework yang nyediain. <br/> ➡️ Bukan kamu yang instansiasi object-nya manual.

## Contoh

```ts
// controllers/users_controller.ts

import { inject } from '@adonisjs/core'
import { UserService } from '#services/user_service'

@inject()
export default class UsersController {
  constructor(private userService: UserService) {}

  index() {
    return this.userService.getAllUsers()
  }

  test() {
    return this.userService.getUserByEmail('a@gmail.com')
  }
}
```

```ts
// services/user_service.ts
export class UserService {
  async getAllUsers() {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9]
  }
  async getUserByEmail(email: string) {
    return email
  }
}
```

<br/>

Cara gunainnya di routes.

```ts
// start/routes.ts
router.get('/users', [UsersController, 'index']).as('users.index')
router.get('/users/test', [UsersController, 'test']).as('users.test')
```
