---
title: Sveltekit Universal vs Server
description:
imagePath: https://i.pinimg.com/originals/d2/e8/34/d2e8346922934ea035cf7c5a8b477ad8.jpg
imageAlt: sveltekit
date: 2023-08-13 15:00
tags:
  - sveltekit
---

Seperti yang telah kita lihat, ada dua jenis fungsi pemuatan:

- File +page.js dan +layout.js mengekspor fungsi pemuatan universal yang berjalan di server dan di peramban
- File +page.server.js dan +layout.server.js mengekspor fungsi pemuatan server yang hanya berjalan di sisi server

Secara konseptual, keduanya adalah hal yang sama, tetapi ada beberapa perbedaan penting yang perlu diperhatikan.

### Kapan load function berjalan?

Fungsi pemuatan server selalu berjalan di server.

Secara default, fungsi pemuatan universal berjalan di server selama SSR saat pengguna pertama kali mengunjungi halaman kita. Fungsi-fungsi ini kemudian akan berjalan lagi selama hidrasi, menggunakan kembali respons apa pun dari permintaan pengambilan. Semua pemanggilan fungsi pemuatan universal selanjutnya terjadi di browser. kita dapat menyesuaikan perilaku melalui opsi halaman. Jika kita menonaktifkan rendering sisi server, kita akan mendapatkan SPA dan fungsi pemuatan universal yang selalu berjalan di klien.

Fungsi pemuatan dipanggil pada saat runtime, kecuali jika kita melakukan prerender halaman - dalam hal ini, fungsi ini dipanggil pada saat build.

### Kapan menggunakan universal dan Kapan menggunakan server ?

Fungsi pemuatan server sangat berguna ketika kita perlu mengakses data secara langsung dari basis data atau sistem berkas, atau perlu menggunakan variabel lingkungan privat.

Fungsi pemuatan universal berguna ketika kita perlu mengambil data dari API eksternal dan tidak memerlukan kredensial pribadi, karena SvelteKit dapat memperoleh data secara langsung dari API daripada melalui server kita. Mereka juga berguna ketika kita perlu mengembalikan sesuatu yang tidak dapat diserialisasikan, seperti konstruktor komponen Svelte.

Dalam kasus yang jarang terjadi, kita mungkin perlu menggunakan keduanya secara bersamaan - misalnya, kita mungkin perlu mengembalikan sebuah instance dari kelas kustom yang diinisialisasi dengan data dari server kita.
