---
layout: ../../layouts/MarkdownLayout.astro
title: NEXT - Project Structure
description:
imagePath: https://wallpapercave.com/wp/wp11846968.png
imageAlt: next
viewTransitionName: 'next-project-structure'
date: 2024-06-11 09:00
icon: 'devicon:nextjs'
tags:
  - next
  - react
---

## App router

```md
my-nextjs-app/
│
├── app/
│ ├── layout.js
│ ├── page.js
│ ├── about/
│ │ ├── page.js
│ ├── blog/
│ │ ├── layout.js
│ │ ├── page.js
│ │ ├── [slug]/
│ │ │ ├── page.js
│ ├── api/
│ │ ├── hello/
│ │ │ ├── route.js
│ ├── globals.css
│
├── public/
│ ├── favicon.ico
│
├── components/
│ ├── Navbar.js
│ ├── Footer.js
│
├── styles/
│ ├── Home.module.css
│
├── .gitignore
├── package.json
├── README.md
└── next.config.js
```

Structure di app router mirip sekali dengan sveltekit, ya mungkin karna 1 company kali yah hehe. yang pasti kalau udah pernah pake sveltekit pasti gampang mahaminnya.. oke lanjut ke catatan selanjutnya
