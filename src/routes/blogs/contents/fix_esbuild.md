---
title: Memperbaiki esbuild error "You installed esbuild for another platform than the one you're currently using.This won't work because esbuild is written with native code and needs toinstall ..."
description: Memperbaiki esbuild yang error pada kodingan kita.
imagePath: https://user-images.githubusercontent.com/1941540/79317564-6a81a980-7f38-11ea-9817-1a668c618fce.png
imageAlt: img-esbuild
date: 2023-10-13
tags:
  - fixing
  - esbuild
---

## fix esbuild "You installed esbuild for another platform than the one you're currently using.This won't work because esbuild is written with native code and needs toinstall a platform-specific binary executable.":

- hapus oh my zsh (karena saya pake oh my zsh).
- jalankan node -p "process.arch", nanti akan keluar <b>X64</b>.
- hapus nvm yang sedang digunakan, nvm uninstall 18 karena saya pakai nodejs versi 18. kalau langsung install nodejs bisa hapus nodejs nya dari laptop.
- lalu install kembali nvm install 18 atau install lagi nodejsnya kalau mau tanpa nvm.
- jika sudah install, lalu hapus node_modules pada project.
- lalu lakukan npm install/yarn.
