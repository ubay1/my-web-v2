---
layout: ../../../layouts/MarkdownLayout.astro
title: Adonis - Response
description: Status & Header, Redirect, Streaming dan Download File, Aborting / Error, Event Setelah Response Selesai, Akses ke Node.js res Bawaan
imagePath: /blog/adonis.webp
imageAlt: img-adonis
viewTransitionName: 'adonis-1'
date: 2025-11-18 09:10
icon: 'skill-icons:adonis'
tags:
  - fullstack
---

# Response

1. **Pengiriman Response (Kirim Balik ke Client)**

- kita bisa langsung return value dari route handler. Itu opsi paling simpel:

```ts
router.get('/', async () => {
  return 'This is the homepage.'
  // atau return objek → di-serialize jadi JSON
  return { page: 'home' }
  // bisa juga return Date → di-convert otomatis
  return new Date()
})
```

- Atau pakai <kbd>response.send(...)<kbd> jika mau atur body secara eksplisit:

```ts
response.send('This is the homepage')
response.send({ page: 'home' })
response.send(new Date())

// Catatan: kalau kita panggil response.send beberapa kali, hanya yang terakhir yang dipakai.
```

2. **Status & Header Response**

- <kbd>Set status HTTP</kbd>

```ts
response.status(200).send({ page: 'home' })
response.status(201).send('') // misal: response kosong tapi status 201
```

- <kbd>safeStatus</kbd> = kalau mau set status hanya ketika belum ada statusnya:

```ts
response.safeStatus(200)
response.safeStatus(201) // nggak akan override kalau status sudah di-set
```

- **Set header**

- <kbd>response.header(name, value)</kbd> = set header (override).
- <kbd>response.safeHeader(name, value)</kbd> = set header hanya kalau belum ada .
- <kbd>response.append(name, value)</kbd> = tambahkan nilai header (misal untuk “Set-Cookie”).
- <kbd>response.removeHeader(name)</kbd> = hapus header existing.

3. **Redirect**.

- bisa redirect ke path tertentu:

```ts
response.redirect().toPath('/articles')
```

- Bisa redirect ke named route juga:

```ts
response.redirect().toRoute('articles.show', { id: params.id })
```

- Redirect “back” ke halaman sebelumnya (referer):

```ts
response.redirect().back()
```

- Status redirect bisa diubah (defaultnya 302):

```ts
response.redirect().status(301).toRoute('articles.show', { id: params.id })
```

- ambahkan query string di redirect:

```ts
response.redirect().withQs({ page: 1, limit: 20 }).toRoute('articles.index')
```

- Untuk terusan query string dari request sebelumnya:

```ts
response.redirect().withQs().back()
```

4. **Streaming dan Download File**

- <kbd>Streaming</kbd>: pakai response.stream(stream) untuk pipe stream (misal file):
  - Kalau error, bisa kasih callback juga untuk atur message + status:

  ```ts
  response.stream(imageStream, () => {
    return ['Unable to serve file', 400]
  })

  // Catatan: response.stream tidak otomatis set content-type atau content-length kita harus set sendiri header-nya
  ```

- <kbd>Download File</kbd>: lebih direkomendasikan pakai response.download(path) karena secara otomatis set content-type & content-length.
  - Opsional: bisa generate ETag (caching browser) dengan parameter kedua true.
  - Bisa juga handle error download dengan callback:

  ```ts
  response.download(filePath, true, (error) => {
    if (error.code === 'ENOENT') {
      return ['File does not exists', 404]
    }
    return ['Cannot download file', 400]
  })
  ```

  - Kalau mau “paksa download” (download sebagai attachment), bisa pakai:

  ```ts
  response.attachment(filePath, 'nama-file.jpg')
  ```

5. **Aborting / Error dari Response**

- Kamu bisa abort request dari response:

```ts
response.abort({ message: 'Cannot edit post' }, 403)

// Ini melempar exception E_HTTP_REQUEST_ABORTED dan langsung berhenti, kemudian ditangani oleh exception handler Adonis.
```

6. **Event Setelah Response Selesai**

- Ada method <kbd>response.onFinish(...)</kbd> untuk menjalankan callback setelah response sudah dikirim ke TCP socket (sesi “after finished”):

```ts
response.onFinish(() => {
  // misal logging atau cleanup
})
```

7. **Akses ke Node.js res Bawaan**

Kamu bisa ambil objek res asli dari Node.js (http.ServerResponse) lewat <kbd>response.response</kbd>
