---
title: Sveltekit -  server only modules
description:
imagePath: https://miro.medium.com/v2/resize:fit:1400/1*G9fzmaoymDGy7scbkgpC7A.png
imageAlt: sveltekit
date: 2023-08-23 08:00
tags:
  - sveltekit
---

Seperti seorang teman yang baik, SvelteKit menjaga rahasia kita. Ketika menulis backend dan frontend di repositori yang sama, akan sangat mudah untuk mengimpor data sensitif secara tidak sengaja ke dalam kode frontend kita (variabel lingkungan yang berisi kunci API, misalnya). SvelteKit menyediakan cara untuk mencegah hal ini sepenuhnya: modul khusus server.

## Private environment variables

Modul $env/static/private dan $env/dynamic/private, yang tercakup dalam bagian modul, hanya dapat diimpor ke dalam modul yang hanya berjalan di server, seperti hooks.server.js atau +page.server.js.

## Membuat modul sendiri

kita dapat membuat modul kita sendiri khusus untuk server dengan dua cara:

- menambahkan .server ke nama berkas, misalnya secrets.server.js
- menempatkannya di $lib/server, misalnya $lib/server/secrets.js

kalau saya biasa menyimpannya di $lib/server
