---
layout: ../../../layouts/MarkdownLayout.astro
title: Frontend interview
description: List pertanyaan dan jawaban interview frontend.
imagePath: https://coderpad.io/wp-content/uploads/2022/06/Big-front-end-guide-to-interviewing-Blog-1024-x-683.png
imageAlt: img-fe-interview
viewTransitionName: 'fe-interview'
date: 2025-01-31 05:00
icon: 'fluent-color:people-20'
tags:
  - frontend
  - interview
---

# HTML

1. Jelaskan perbedaan <kbd>div</kbd> dan <kbd>span</kbd>

   - div adalah elemen block-level, artinya elemen ini akan otomatis memenuhi lebar dari parent-nya dan menyebabkan elemen lain turun ke baris berikutnya.
   - span adalah elemen inline, artinya hanya akan mengambil ruang sesuai dengan kontennya dan tidak menyebabkan elemen lain turun ke baris berikutnya.

2. Jelaskan perbedaan <kbd>HTML</kbd> vs <kbd>XHTML</kbd>

   - HTML lebih fleksibel, tidak wajib menutup tag, case-insensitive.
   - XHTML lebih ketat, wajib menutup semua tag, harus case-sensitive (harus lowercase).

3. Jelaskan perbedaan Element dan Tag HTML

   - Tag adalah bagian dari elemen, misalnya <kbd>p</kbd> atau <kbd>div</kbd>.
   - Element adalah keseluruhan struktur dari tag pembuka, isi, dan tag penutup.

   contoh:

   ```html
   <p>Ini adalah elemen</p>
   ```

   - <kbd>p dan /p</kbd> adalah tag
   - Elemen adalah keseluruhan code diatas

4. Apa yang dimaksud dengan Semantic HTML

   - Penggunaan elemen HTML sesuai dengan maknanya, misalnya <kbd>header</kbd> kita buat khusus untuk header, <kbd>article</kbd>, <kbd>section</kbd> daripada hanya <kbd>div</kbd>.

   berikut ini gambaran penggunaan semantic HTML: <img src="/semantic-html.webp" width="600" height="300" class="object-contain" />

5. Apa fungsi dari <kbd>!DOCTYPE html</kbd>
   - Menentukan bahwa dokumen menggunakan HTML5 dan membantu browser merender halaman dengan benar. Jika tidak ditulis, beberapa fitur modern HTML5 mungkin tidak berfungsi dengan baik.

<br/>
<br/>
<br/>

# CSS

1. Bisakah CSS menggunakan @import?

   - Ya, digunakan untuk mengimpor file CSS lain ke dalam satu file CSS utama.

   > 👉 Kelebihan: Bisa memisahkan file CSS. 👉 Kekurangan: Meningkatkan waktu load karena CSS dimuat secara async.

2. Perbedaan CSS padding vs margin

   - padding: Elemen akan memiliki ruang di dalam elemen (antara konten dan border).
   - margin: Elemen akan memiliki ruang di luar elemen (antara border dan elemen lain).

3. Apa saja Unit baru pada CSS3

   - <kbd>rem</kbd>: Berdasarkan root font-size.
   - <kbd>svh</kbd>, <kbd>lvh</kbd>, <kbd>dvh</kbd>, <kbd>vw</kbd>, dll: Berdasarkan tinggi/lebar viewport.
   - <kbd>fr</kbd>: Unit khusus untuk CSS Grid.

   contoh svh,lvh,&dvh: <img src="https://www.terluinwebdesign.nl/en/wp-content/uploads/2022/03/incoming-20-new-css-viewport-units-svh-lvh-dvh-svw-lvw-dvw.png" width="600" height="300" class="object-contain" />

4. Unit mana yang membantu desain web responsif?

   - <kbd>%</kbd>: Menyesuaikan dengan parent.
   - <kbd>rem</kbd>: Lebih stabil karena berdasarkan root.
   - <kbd>vh/vw</kbd>: Menyesuaikan dengan viewport.
   - <kbd>fr</kbd>: Untuk tata letak Grid yang fleksibel.

5. Apa yang dimaksud dengan CSS Specificity?

   - Urutan prioritas dalam menerapkan aturan CSS (inline style > ID selector > class selector > tag selector).

   <br />
   <table class="border p-2">
      <thead>
         <tr>
            <th class="border p-2"> Selector </th>
            <th class="border p-2"> Specificity </th>
         </tr>
      </thead>
      <tbody class="border p-2">
         <tr> <td class="border p-2"> element (p, div) </td> <td class="border p-2"> 0,0,1 </td> </tr>
         <tr> <td class="border p-2"> class, :pseudo-class (.box, :hover) </td> <td class="border p-2"> 0,1,0 </td> </tr>
         <tr> <td class="border p-2"> id (#container) </td> <td class="border p-2"> 1,0,0 </td> </tr>
         <tr> <td class="border p-2"> Inline styles (style="") </td> <td class="border p-2"> 1000 </td> </tr>
      </tbody>
   </table>

   <br/>

   > Semakin besar angka specificity, semakin tinggi prioritasnya.

6. Bagaimana Cara membuat variabel di dalam CSS

```css
:root {
  --primary-color: #ff5733;
}
div {
  background-color: var(--primary-color);
}
```

7.  Jelaskan perbedaan dari inline, block, dan inline-block

    - inline: hanya sebesar kontennya, tidak bisa set width dan height.
    - block: memenuhi lebar parent dan bisa diatur ukuran.
    - inline-block: kombinasi inline dan block, bisa diatur width dan height tanpa pindah ke baris baru.

8.  Apa itu Pseudo-Class dalam CSS?

    - Pseudo-Class adalah Selector khusus untuk kondisi tertentu, misalnya <kbd>:hover</kbd>, <kbd>:active</kbd>, <kbd>:visited</kbd>, dll.

    ```css
    a:hover {
      color: red;
    }
    input:focus {
      border: 2px solid blue;
    }
    ```

9.  Bagaimana cara membuat sebuah div yang ada di dalam div lain berada di tengah (center)?

    ```css
    .parent {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .parent {
      display: grid;
      place-items: center;
      height: 100vh;
    }
    ```

10. Apa itu Grid System di CSS?

    - Sistem tata letak berbasis grid yang memudahkan pengaturan layout.

11. Sebutkan apa saja aturan pada CSS Ruleset

    - Selector { property: value; } (contoh: p { color: red; }).

<br />
<br />

# Javascript

1. Apakah Javascript Async atau sync?

   - Secara default sync, tapi bisa async dengan setTimeout, Promise, async/await.

     > - Async: Kode bisa berjalan di latar belakang tanpa menghentikan eksekusi kode lainnya. JavaScript menggunakan callback, promises, dan async/await untuk menangani proses async.
     > - Sync: Kode dieksekusi secara berurutan, satu per satu. Jika satu operasi memakan waktu lama, maka kode di bawahnya akan menunggu.

2. Apa perbedaan var, const dan let?

   - Var: dapat diubah nilai setelah dideklarasikan. Bisa diubah nilai setelah dideklarasikan.
   - Const: dapat diubah nilai setelah dideklarasikan. Tidak boleh diubah nilai setelah dideklarasikan.
   - Let: dapat diubah nilai setelah dideklarasikan. Bisa diubah nilai setelah dideklarasikan.

3. Tipe data pada Js

   - string, number, boolean, null, undefined, symbol, bigint, object.

4. Apa itu DOM?

   - Document Object Model adalah representasi objek-objek HTML, CSS, dan JavaScript dalam sebuah dokumen HTML.

   contoh manipulasi DOM:

   ```js
   document.getElementById('title').innerText = 'Hello!'
   ```

5. Apa perbedaan antara Array & Object ?

   - Array: koleksi berurutan, indeks numerik.
   - Object: koleksi key-value.

6. Perbedaan == dan === ?

   - <kbd>==</kbd> : mengecek nilai.
   - <kbd>===</kbd> : mengecek nilai dan tipe data. contoh:

   <br/>
   contoh:

   ```js
   1 == '1' // true
   1 === '1' // false
   ```

7. Apa itu this?

   - Dalam object, this merujuk ke object itu sendiri.
   - Dalam function biasa, this merujuk ke global (window).

   contoh:

   ```js
   const obj = {
     name: 'Ubay',
     greet: function () {
       console.log(this.name)
     },
   }
   obj.greet() // "Ubay"

   function getPath() {
     return this.location.pathname // sama saja dengan `window.location.pathname`
   }
   ```

8. Apa perbedaan dari arrow function dan regular function?

   - Arrow function:
     1. sintaks lebih ringkas
     2. tidak memiliki this, mengikuti this dari parent
     3. tidak bisa di hoist
     4. tidak memiliki argumen
     5. cocok untuk callback, one line function.
   - Regular function:
     1. sintaks panjang
     2. memiliki this sendiri
     3. bisa di hoist
     4. memiliki argumen
     5. cocok untuk Method, constructor function, function declaration.

   contoh 1. sintaks:

   ```js
   // regular function
   function sayHello(name) {
     return `Hello, ${name}!`
   }
   console.log(sayHello('Ubay')) // "Hello, Ubay!"

   // arrow function
   const sayHello = (name) => `Hello, ${name}!`
   console.log(sayHello('Ubay')) // "Hello, Ubay!"
   ```

   contoh 2. this binding:

   ```js
   // regular function
   // this mengacu ke person karena dipanggil dari objek.
   const person = {
     name: 'Ubay',
     sayName: function () {
       console.log(this.name)
     },
   }
   person.sayName() // "Ubay"

   // arrow function
   // Arrow function tidak memiliki this sendiri, sehingga mengambil this dari global scope, bukan person.
   const person = {
     name: 'Ubay',
     sayName: () => {
       console.log(this.name)
     },
   }
   person.sayName() // undefined
   ```

   contoh 3. hoisting

   ```js
   // regular function
   sayHello('Ubay') // "Hello, Ubay!"
   function sayHello(name) {
     console.log(`Hello, ${name}!`)
   }

   // arrow function
   sayHello('Ubay') // ❌ Error: Cannot access 'sayHello' before initialization
   const sayHello = (name) => console.log(`Hello, ${name}!`)
   ```

   contoh 4. arguments

   ```js
   // regular function
   function showArgs() {
     console.log(arguments)
   }
   showArgs(1, 2, 3) // [1, 2, 3]

   // arrow function
   const showArgs = () => {
     console.log(arguments)
   }
   showArgs(1, 2, 3) // ❌ Error: arguments is not defined

   // solusinya kita bisa gunakan rest parameter
   const showArgs = (...args) => {
     console.log(args)
   }
   showArgs(1, 2, 3) // [1, 2, 3]
   ```

   contoh 5. constructors

   ```js
   // regular function
   function Person(name) {
     this.name = name
   }
   const ubay = new Person('Ubay')
   console.log(ubay.name) // "Ubay"

   // arrow function
   const Person = (name) => {
     this.name = name
   }
   const ubay = new Person('Ubay') // ❌ Error: Person is not a constructor
   ```

   <br/>

   > NOTED:
   >
   > - Gunakan Arrow Function untuk callback, function expression, dan ketika tidak butuh this.
   > - Gunakan Regular Function jika butuh hoisting, arguments object, atau menggunakan this dengan cara tradisional.

9. Apa itu undefined dan null?

   - <kbd>undefined</kbd>: variabel yang belum diinisialisasi.
   - <kbd>null</kbd>: nilai kosong yang diatur secara eksplisit.

10. Apa perbedaan for, while, dan do while loop?

- <kbd>for loop</kbd>: Gunakan saat jumlah iterasi sudah diketahui, misal menampilkan angka 1-5
- <kbd>while loop</kbd>: Gunakan saat perulangan harus berjalan selama suatu kondisi true, tanpa jumlah pasti.
- <kbd>do..while loop</kbd>: Gunakan saat ingin menjalankan kode minimal sekali, meskipun kondisi awal false

contoh for loop menampilkan angka 1-5

```js
for (let i = 1; i <= 5; i++) {
  console.log(i)
}
```

contoh while loop, Loop sampai dapat angka random < 0.1

```js
let num = Math.random()
while (num >= 0.1) {
  console.log(num)
  num = Math.random()
}
console.log('yeay nilai < 0.1 = ', num)
```

contoh do while loop, Memutar Dadu Sampai Mendapat Angka 6

```js
let dice
// dadu dilempar sekali lalu di cek pada while, jika angka !== 6 maka lakukan lemparan lagi sampai dapat angka 6.
do {
  dice = Math.floor(Math.random() * 6) + 1
  console.log('Dadu keluar:', dice)
} while (dice !== 6)

console.log('Akhirnya dapat angka 6!')
```

<br />

> kenapa do while disebut selalu berjalan minimal satu kali ?
>
> Karena dalam do while, kode di dalam blok {} dijalankan dulu, lalu baru dicek kondisinya.
>
> Bandingkan dengan while, yang mengecek kondisi dulu sebelum menjalankan kode.

<br />

> perbedaan while & do while
>
> while (cek dulu, baru eksekusi)
>
> ```js
> let angka = 10
> // Karena angka > 10 false sejak awal, kode di dalam {} tidak akan pernah dijalankan.
> while (angka > 10) {
>   // ❌ Kondisi langsung false
>   console.log('Ini tidak akan pernah muncul!')
> }
> ```
>
> do while (eksekusi dulu, baru cek)
>
> ```js
> let angka = 10
> // Walaupun angka > 10 itu false sejak awal, console.log tetap dijalankan satu kali sebelum dicek.
> do {
>   console.log('Ini pasti muncul minimal sekali!')
> } while (angka > 10)
> ```

11. Apa itu closure ?

    - closure adalah Fungsi dalam fungsi yang mengakses variabel luar.
