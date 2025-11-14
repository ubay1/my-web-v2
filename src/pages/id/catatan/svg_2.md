---
layout: ../../../layouts/MarkdownLayout.astro
title: Belajar SVG - part 2
description: atribut line, bermain dengan line
imagePath: /blog/svg.webp
imageAlt: img-svg
viewTransitionName: 'svg-1'
date: 2025-06-29 09:00
icon: 'skill-icons:svg-light'
tags:
  - svg
---

### Atribut SVG Line

- <kbd>x1</kbd> adalah posisi awal x element dari viewbox.
- <kbd>y1</kbd> adalah posisi awal y element dari viewbox.
- <kbd>x2</kbd> adalah posisi akhir x element dari viewbox.
- <kbd>y2</kbd> adalah posisi akhir y element dari viewbox.
- <kbd>stroke</kbd> untuk warna border element.
- <kbd>strokeWidth</kbd> untuk lebar border element.
- <kbd>strokeLinecap</kbd> untuk bentuk ujung garis.

**Contoh 1 bermain dengan line dan circle**

```js
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="200"
  height="200"
  viewBox="0 0 200 200"
  class="bg-orange-100"
>
  <circle cx="100" cy="50" r="30" fill="#cd803d" />
  <circle cx="90" cy="45" r="4" fill="#fff" />
  <circle cx="110" cy="45" r="4" fill="#fff" />
  <rect x="90" y="60" height="6" width="20" fill="none" stroke="#fff" stroke-width="2" rx="4" />
  <line
    x1="55"
    y1="90"
    x2="145"
    y2="90"
    stroke="#cd803d"
    stroke-width="35"
    stroke-linecap="round"
  />
  <line
    x1="75"
    y1="150"
    x2="100"
    y2="90"
    stroke="#cd803d"
    stroke-width="35"
    stroke-linecap="round"
  />
  <line
    x1="100"
    y1="90"
    x2="125"
    y2="150"
    stroke="#cd803d"
    stroke-width="35"
    stroke-linecap="round"
  />
  <circle cx="100" cy="85" r="4" fill="#000" />
  <circle cx="100" cy="100" r="4" fill="#000" />
</svg>
```

hasilnya: <img src="/svg/learn/svg4.svg" alt="svg-4" width="auto" height={100}/>
