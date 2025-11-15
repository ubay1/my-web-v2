---
layout: ../../../layouts/MarkdownLayout.astro
title: Adonis - Resource Controller
description:
imagePath: /blog/adonis.webp
imageAlt: img-adonis
viewTransitionName: 'adonis-1'
date: 2025-11-15 15:00
icon: 'skill-icons:adonis'
tags:
  - fullstack
---

# Resource Controller

```shell
node ace make:controller posts --resource
```

Resource controller adalah controller yang otomatis punya 7 action RESTful sesuai konvensi CRUD.

Struktur action-nya:

- index – list semua data
- create – form create (biasanya untuk web, API sering skip)
- store – simpan data
- show – detail data
- edit – form edit (biasanya untuk web)
- update – update data
- destroy – hapus data

## untuk daftarkan routenya bisa dengan seperti ini.

```ts
Route.resource('/posts', PostsController)
```

adonis otomatis akan membuat:

| Method            | Path            | Action  |
| ----------------- | --------------- | ------- |
| <kbd>GET</kbd>    | /users          | index   |
| <kbd>GET</kbd>    | /users/create   | create  |
| <kbd>POST</kbd>   | /users          | store   |
| <kbd>GET</kbd>    | /users/:id      | show    |
| <kbd>GET</kbd>    | /users/:id/edit | edit    |
| <kbd>PUT</kbd>    | /users/:id      | update  |
| <kbd>PATCH</kbd>  | /users/:id      | update  |
| <kbd>DELETE</kbd> | /users/:id      | destroy |

## Limit resource

kita juga bisa limit resource yang ingin ditampilkan

```ts
Route.resource('/posts', 'PostsController').only(['index', 'store'])
```
