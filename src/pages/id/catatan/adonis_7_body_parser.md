---
layout: ../../../layouts/MarkdownLayout.astro
title: Adonis - Body Parser
description: Allowed Method, Convert Empty Strings to Null, Parser JSON, Parser URL-Encoded Form (form HTML), Parser Multipart (File Upload), Parser raw
imagePath: /blog/adonis.webp
imageAlt: img-adonis
viewTransitionName: 'adonis-1'
date: 2025-11-18 08:00
icon: 'skill-icons:adonis'
tags:
  - fullstack
---

# Body Parser

1. **Apa itu Body Parser Middleware**

Body Parser adalah untuk parsing isi request body (payload) dari client. Konfigurasi body parser ada di file **config/bodyparser.ts**. Dengan body parser, Adonis bisa menangani berbagai tipe request body: JSON, form-url-encoded, multipart (form dengan upload file), dan raw text.

<br />

2. **Allowed Method**

kita bisa atur allowedMethods di config bodyparser untuk menentukan HTTP method mana saja body parser akan dijalankan. efaultnya adalah ['POST', 'PUT', 'PATCH', 'DELETE'].

<br />

3. **Convert Empty Strings to Null**

HTML form kadang mengirim string kosong ("") kalau field-nya kosong. Ini bisa bikin masalah di database (misal kolom nullable). Di config bodyparser, ada flag **convertEmptyStringsToNull**. Kalau di-enable (true), semua string kosong dari form / JSON / multipart akan dikonversi jadi null

<br />

4. **Parser JSON**

Ada bagian json di config bodyparser:

- **encoding**: encoding string, biasanya utf-8.
- **limit**: batas ukuran body JSON yang bisa diparse. Kalau melebihi, bakal error 413 (Payload Too Large).
- **strict**: kalau true, maka JSON yang diparse hanya boleh object atau array di level atas.
- **types**: array Content-Type header yang diijinkan untuk JSON parsing, seperti application/json, dsb.

<br />

5. **Parser URL-Encoded Form (form HTML)**

Di bagian form config:

- **encoding**: sama, biasanya utf-8.
- **limit**: batas ukuran form URL-encoded.
- **queryString**: opsi untuk parsing query string melalui qs (package qs). Bisa diatur seperti allowDots atau allowSparse.
- **types**: default: ['application/x-www-form-urlencoded'].

<br />

6. **Parser Multipart (File Upload)**

Untuk form dengan file upload (multipart/form-data), bagian multipart di config bodyparser mengatur:

- **autoProcess**: kalau true, file yang diupload secara otomatis diproses dan disimpan ke direktori tmp OS.
- **processManually**: array route pattern mana saja yang tidak ingin auto proses file-nya — bisa diatur manual.
- **encoding**: encoding untuk bagian multipart.
- **fieldsLimit**: batas ukuran total untuk fields (bukan file) multipart.
- **limit**: total batas ukuran request file + field.
- **types**: tipe Content-Type yang diproses multipart, biasanya ['multipart/form-data'].
- **convertEmptyStringsToNull**: juga bisa diterapkan di multipart.

<br />

7. **Parser raw**

Ada juga bagian raw di config, yang bisa kita gunakan kalau kita mau menerima body yang “mentah” (raw text), bukan JSON atau form.

## Catatan Penting / Caveats

- Pastikan allowedMethods di bodyparser config mencakup method yang akan kita pakai untuk request body (misal POST, PUT). Kalau tidak, body parser gak jalan untuk method tersebut.
- Jika kita terima request dengan payload sangat besar, atur limit di bagian JSON / multipart supaya bisa menampung data besar, tapi jangan terlalu besar supaya gak jadi celah DoS.
- Untuk upload file, kalau autoProcess false, maka kita harus baca stream secara manual — lebih kompleks, tapi lebih fleksibel.
- convertEmptyStringsToNull sangat berguna untuk form HTML agar data yang masuk lebih “bersih” dan lebih gampang di-database-kan.
