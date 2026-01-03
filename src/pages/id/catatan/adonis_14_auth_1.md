---
layout: ../../../layouts/MarkdownLayout.astro
title: Adonis - Authentication
description: Pengenalan, konsep utama, guards yang tersedia, providers, penggunaan autentikasi, instalasi & konfigurasi, middleware initialize_auth, fitur di luar ruang lingkup paket auth.
imagePath: /blog/adonis.webp
imageAlt: img-adonis
viewTransitionName: 'adonis-1'
date: 2025-12-01 11:00
icon: 'skill-icons:adonis'
tags:
  - fullstack
---

## Pengenalan Sistem Autentikasi di AdonisJS

AdonisJS menyediakan sistem autentikasi yang kuat dan aman untuk login dan autentikasi pengguna dalam berbagai jenis aplikasi — baik aplikasi server-rendered, SPA, maupun mobile apps.

## Konsep Utama

Auth di AdonisJS dibangun di atas dua konsep penting:

- Guards — implementasi autentikasi spesifik, seperti session, token, atau basic auth.
- Providers — komponen yang bertugas mencari/mengambil data user (mis. dari database).

Guards menggunakan providers untuk validasi kredensial pengguna.

## Guards yang Tersedia

AdonisJS menyediakan beberapa guard bawaan:

1. Session Guard

- Cocok untuk: aplikasi web tradisional atau SPA yang berada di domain yang sama.
- Bekerja dengan: session + cookies.
- Direkomendasikan untuk aplikasi server-rendered.

2. Access Tokens Guard

- Cocok untuk: aplikasi API, mobile apps, atau klien yang tidak bisa menyimpan cookies.
- Menggunakan opaque access tokens (token acak yang disimpan server).
- Akses disimpan di database dan diverifikasi saat request masuk.
- Token harus disimpan dengan aman di klien.

3. Basic Auth Guard

- Implementasi HTTP Basic Auth (Authorization header berisi Base64 username:password).
- Tidak seaman session atau token, biasanya dipakai hanya sementara saat development.

## Providers

Providers bertugas mencari dan memverifikasi user di database ketika autentikasi dilakukan. AdonisJS menyediakan provider Lucid secara bawaan, namun kita juga bisa membuat provider custom sesuai kebutuhan.

## Instalasi & Konfigurasi

Untuk mengaktifkan sistem Auth di project, kita harus menambahkan package **@adonisjs/auth** dan memilih guard yang akan digunakan. Contoh command CLI untuk setup:

```bash
# Session guard (default)
node ace add @adonisjs/auth --guard=session

# Access tokens guard
node ace add @adonisjs/auth --guard=access_tokens

# Basic auth guard
node ace add @adonisjs/auth --guard=basic_auth
```

Instalasi ini akan:

- Menambahkan package Auth ke project.
- Mendaftarkan service provider di adonisrc.ts.
- Menambahkan middleware autentikasi di start/kernel.ts.
- Membuat model User (app/Models).
- Membuat migrasi database untuk tabel pengguna dan guard yang dipilih.

## Middleware Inisialisasi

Middleware **initialize_auth**:

- Tidak langsung melakukan autentikasi.
- Hanya menyiapkan objek auth di tiap request (**ctx.auth**).
- Untuk benar-benar melindungi route, kamu perlu menggunakan middleware **auth**.

## Fitur di Luar Ruang Lingkup Paket Auth

Paket Auth hanya fokus pada autentikasi request; selain itu tidak menangani:

- Registrasi user (form, email, aktivasi)
- Reset password / Email update
- Role/permission (gunakan Bouncer untuk authorization)
