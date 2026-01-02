---
layout: ../../../layouts/MarkdownLayout.astro
title: Adonis - Database Dengan Lucid
description: apa itu db transaction, contoh sederhana, konsep utama: ACID, membuat transaction, Query dalam Transaksi, Commit atau Rollback, Managed Transactions, Savepoints, Pakai Transaksi dengan Query Builder / Model
imagePath: /blog/adonis.webp
imageAlt: img-adonis
viewTransitionName: 'adonis-1'
date: 2025-11-26 11:00
icon: 'skill-icons:adonis'
tags:
  - fullstack
---

# Apa itu DB Transaction

DB transaction (database transaction) itu adalah sekumpulan operasi database (misalnya INSERT, UPDATE, DELETE) yang dianggap satu kesatuan kerja.

Artinya: semua berhasil, atau semua gagal (tidak boleh setengah-setengah).

## Contoh sederhana

transfer uang:

- Saldo A dikurangi 100 ribu
- Saldo B ditambah 100 ribu

Kalau langkah 1 berhasil tapi langkah 2 gagal → data jadi rusak. Nah, transaction mencegah hal ini.

## Konsep utama: ACID

Transaction harus memenuhi 4 konsep ini:

- Atomicity (Atomicitas)
  - Semua query dijalankan utuh atau dibatalkan semua
  - Gagal satu → rollback semuanya
- Consistency (Konsistensi)
  - Data tetap valid sesuai aturan DB
  - Tidak melanggar constraint (foreign key, dll)
- Isolation (Isolasi)
  - Transaction satu tidak saling ganggu
  - User lain tidak lihat data “setengah jadi”
- Durability (Pemanahan)
  - Kalau sudah COMMIT, data pasti tersimpan
  - Walau server mati, data tetap ada

## 1. Membuat Transaction

```ts
import db from '@adonisjs/lucid/services/db'

const trx = await db.transaction() // Di sini trx itu objek transaksi yang nanti kita pakai untuk query.
```

## 2. Jalankan Query dalam Transaksi

```ts
await trx.insertQuery().table('users').insert({ username: 'virk' })

await trx.query().select('*').from('users')
```

## 3. Commit atau Rollback

```ts
try {
  await trx.insertQuery().table('users').insert({ username: 'virk' })
  await trx.commit()
} catch (error) {
  await trx.rollback()
}

// Jika gagal → rollback agar perubahan tidak disimpan. Kalau berhasil → commit agar disimpan di DB.
```

### 4. Managed Transactions (Otomatis)

Daripada pakai try/catch manual, kita bisa pakai managed transaction yang otomatis commit/rollback:

```ts
await db.transaction(async (trx) => {
  await trx.insertQuery().table('users').insert({ username: 'virk' })
})

// Kalau error → otomatis rollback,
// kalau sukses → otomatis commit.
```

### 4.1 Return nilai dari transaksi

```ts
const id = await db.transaction(async (trx) => {
  const result = await trx.insertQuery().table('users').insert({ username: 'virk' })
  return result[0]
})
// id akan berisi nilai yang kita return dari callback
```

## 5. Isolation Levels

Lucid juga mendukung definisi isolation level — bagaimana data terlihat oleh transaksi lain (misalnya “read committed”). Kita bisa set saat buat transaksi:

```ts
await db.transaction({ isolationLevel: 'read committed' })
// Level yang tersedia: read uncommitted, read committed, snapshot, repeatable read, serializable.
```

## 6. Savepoints (Nested Transactions)

Lucid otomatis bikin savepoint kalau kamu buat transaksi lagi di dalam transaksi:

```ts
const trx = await db.transaction()
const savepoint = await trx.transaction()
await trx.rollback()

// Savepoints memungkinkan kita rollback sebagian (nested) saja tanpa membatalkan semua.
```

## 7. Pakai Transaksi dengan Query Builder / Model

📌 Query Builder: Kita bisa terus memakai trx juga di query builder biasa:

```ts
await db.insertQuery({ client: trx }).table('users').insert({...})
```

Dan juga untuk update, delete, dll:

```ts
await db.query({ client: trx }).from('users').where('id', 1).update({...})

### 📌 Lucid Models

Supaya model memakai transaksi, tinggal panggil:

const user = new User()
user.useTransaction(trx)
await user.save()
```
