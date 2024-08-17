---
title: NEXT - Route Group (parentName)
description:
imagePath: https://wallpapercave.com/wp/wp11846968.png
imageAlt: next
viewTransitionName: 'next-route-group'
date: 2024-06-13 14:00
icon: 'devicon:nextjs'
tags:
  - next
  - react
---

## Mengatur rute tanpa memengaruhi jalur URL

Untuk mengatur rute tanpa memengaruhi URL, buat grup untuk menyatukan rute terkait. **Folder dalam tanda kurung akan dihilangkan dari URL** (mis. (marketing) atau (shop)).

![route-group-1](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Froute-group-organisation.png&w=3840&q=75)

Meskipun rute di dalam (marketing) dan (shop) memiliki hirarki URL yang sama, kita dapat membuat layout yang berbeda untuk setiap grup dengan menambahkan file layout.js di dalam masing-masing folder.

![route-group-2](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Froute-group-multiple-layouts.png&w=3840&q=75)

## Memilih segmen tertentu ke dalam layout

Untuk memilih rute tertentu ke dalam layout, buat grup rute baru (misalnya (shop)) dan pindahkan rute yang memiliki layout yang sama ke dalam grup tersebut (misalnya account dan cart). Rute di luar grup tidak akan berbagi layout (misal: checkout).

![route-group3](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Froute-group-opt-in-layouts.png&w=3840&q=75)

## Membuat beberapa root layout

Untuk membuat beberapa root layout, hapus file layout.js yang ada di root folder (/app), dan tambahkan file layout.js di dalam setiap grup rute. Hal ini berguna untuk mempartisi aplikasi menjadi beberapa bagian yang memiliki UI atau pengalaman yang sama sekali berbeda. **Tag html dan body perlu ditambahkan ke setiap layout akar**.

![route-group4](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Froute-group-multiple-root-layouts.png&w=3840&q=75)

Pada contoh di atas, baik (marketing) dan (shop) memiliki layout akarnya masing-masing.
