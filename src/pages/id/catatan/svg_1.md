---
layout: ../../../layouts/MarkdownLayout.astro
title: Belajar SVG
description: apa itu svg, atribut svg, apa itu viewbox, atribut rect, atribut polygon, bermain dengan rect, polygon, circle
imagePath: /blog/svg.webp
imageAlt: img-svg
viewTransitionName: 'svg-1'
date: 2025-06-28 09:00
icon: 'skill-icons:svg-light'
tags:
  - svg
---

# Apa itu SVG?

- SVG merupakan singkatan dari Scalable Vector Graphics
- SVG digunakan untuk mendefinisikan grafik berbasis vektor untuk Web
- SVG mendefinisikan grafik dalam format XML
- Setiap elemen dan atribut dalam file SVG dapat dianimasikan
- SVG merupakan rekomendasi W3C
- SVG terintegrasi dengan standar lain, seperti CSS, DOM, XSL dan JavaScript

<br/>

---

### Atribut SVG Umum

- <kbd>fill</kbd> berguna untuk menentukan warna dari element, bisa dengan hex-code/nama-warna atau <b>"none"</b> jika ingin warna transparant.
- <kbd>width</kbd> untuk lebar element.
- <kbd>height</kbd> untuk tinggi element.
- <kbd>stroke</kbd> untuk warna border element.
- <kbd>strokeWidth</kbd> untuk lebar border element.

### Atribut SVG Circle

- <kbd>cx</kbd> adalah posisi awal x element dari viewbox.
- <kbd>cy</kbd> adalah posisi awal y element dari viewbox.
- <kbd>r</kbd> adalah radius dari element.

### Atribut SVG Rect

- <kbd>x</kbd> adalah posisi awal x element dari viewbox.
- <kbd>y</kbd> adalah posisi awal y element dari viewbox.
- <kbd>r</kbd> adalah radius dari element.
- <kbd>rx</kbd> adalah radius dari sudut kiri atas.
- <kbd>ry</kbd> adalah radius dari sudut kanan bawah.

### Atribut SVG Polygon

- <kbd>points</kbd> adalah kumpulan koordinat x,y yang membentuk polygon, ditulis dalam format "x1,y1 x2,y2 x3,y3" dst.

<br/>

---

**ViewBox**

<kbd>viewBox="0 0 300 100"</kbd> digunakan untuk mengatur skala dan area tampilan konten di dalam SVG. <br /> Angka pertama (0) dan kedua (0) menunjukkan titik awal koordinat x dan y — yaitu pojok kiri atas dari area yang ingin ditampilkan. <br /> Angka ketiga (300) adalah lebar virtual area tersebut, dan angka keempat (100) adalah tingginya. <br /> Jadi, meskipun SVG ditampilkan dengan ukuran misalnya <kbd>width="200"</kbd> dan <kbd>height="200"</kbd>, browser akan menyesuaikan (menskalakan) area virtual 300x100 agar muat di dalam ukuran 200x200 piksel. <br /> Intinya, <kbd>viewBox="0 0 300 100"</kbd> berarti kita “melihat” bagian dari koordinat (0,0) sampai (300,100), dan bagian ini akan dipadatkan atau direntangkan supaya pas ke ukuran visual SVG yang ditentukan. <br/> <br/>

contoh viewbox dengan x,y minus: <img src="/svg-viewbox.png" alt="svg-viewbox-minus" width="auto" height={100}/>

dibawah ini adalah contoh penerapan dengan lebar viewBox 300. dimana setiap element circle memiliki radius 25. <br/>

```js
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="200"
  height="200"
  viewBox="0 0 300 100"
  style="background-color: rgb(254 226 226)"
>
  <circle cx="25" cy="50" r="25" fill="yellow"></circle>
  <circle cx="75" cy="50" r="25" fill="yellow"></circle>
  <circle cx="125" cy="50" r="25" fill="yellow"></circle>
  <circle cx="175" cy="50" r="25" fill="yellow"></circle>
  <circle cx="225" cy="50" r="25" fill="yellow"></circle>
  <circle cx="275" cy="50" r="25" fill="yellow"></circle>
</svg>
```

hasilnya: <img src="/svg/learn/svg1.svg" alt="svg-1" width="auto" height={100}/>

**Contoh 1 bermain dengan circle dan rect**

```js
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="200"
  height="200"
  viewBox="0 0 100 100"
  style="background-color: rgb(254 226 226)"
>
  <circle cx="50" cy="60" r="25" fill="#D1495B"></circle>
  <rect x="40" y="28" width="20" height="10" fill="#F79257"></rect>
  <circle cx="50" cy="25" r="5" fill="none" stroke="#F79257" strokeWidth="2"></circle>
</svg>
```

hasilnya: <img src="/svg/learn/svg2.svg" alt="svg-2" width="auto" height={100}/>

**Contoh 2 bermain dengan polygon dan rect**

```js
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="200"
  height="200"
  viewBox="0 -150 200 200"
  style="background-color:rgb(171, 229, 250);"
>
  <polygon points="20,-30 50,30 150,30 180,-30" fill="green"></polygon>
  <polygon points="50,-90 50,-50 90,-50 90,-90" fill="orange"></polygon>
  <rect x="90" y="-90" height="60" width="10" fill="brown"></rect>
</svg>
```

hasilnya: <img src="/svg/learn/svg3.svg" alt="svg-2" width="auto" height={100}/>

penjelasan svg polygon: <img src="/polygon.png" alt="svg-polygon" width="auto" height={100}/>

cara memahami penggunaan svg polygon:

1. Titik pertama adalah (50, -90), artinya koordinat x = 50 dan y = -90.

2. Dari (50, -90) ke (50, -50):
   - Nilai x tetap 50, jadi tidak ada pergerakan horizontal.
   - Nilai y berubah dari -90 ke -50, artinya garis bergerak vertikal ke bawah.

3. Dari (50, -50) ke (90, -50):
   - Nilai y tetap -50, jadi tidak ada pergerakan vertikal.
   - Nilai x berubah dari 50 ke 90, artinya garis bergerak horizontal ke kanan.

4. Dari (90, -50) ke (90, -90):
   - Nilai x tetap 90, jadi tidak ada pergerakan horizontal.
   - Nilai y berubah dari -50 ke -90, artinya garis bergerak vertikal ke atas.

5. Dari (90, -90) ke (50, -90):
   - Nilai y tetap -90, jadi tidak ada pergerakan vertikal.
   - Nilai x berubah dari 90 ke 50, artinya garis bergerak horizontal ke kiri.
