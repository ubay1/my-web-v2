---
layout: ../../../layouts/MarkdownLayout.astro
title: Frontend interview bagian 2 - react.js
description: List pertanyaan dan jawaban interview frontend bagian 2.
imagePath: /blog/js.webp
imageAlt: img-fe-interview
viewTransitionName: 'fe-interview'
date: 2025-02-03 08:00
icon: 'fluent-color:people-20'
tags:
  - frontend
  - interview
---

# React.js

1. Apa itu JSX ? dan bagaimana bisa dirender di HTML ?
   - JSX (JavaScript XML) adalah sintaks yang memungkinkan kita menulis HTML di dalam JavaScript.
   - JSX tidak bisa langsung dipahami oleh browser, jadi React menggunakan Babel untuk mengonversi JSX menjadi kode JavaScript biasa, misalnya:

   ```js
   React.createElement('h1', null, 'Hello, Ubay!')
   ```

2. Jelaskan lifecycle dari ReactJS?
   - Lifecycle adalah serangkaian metode yang dipanggil selama siklus hidup suatu komponen.
   - <kbd>Mounting:</kbd> constructor(), render(), componentDidMount()
   - <kbd>Updating:</kbd> shouldComponentUpdate(), render(), componentDidUpdate()
   - <kbd>Unmounting:</kbd> componentWillUnmount()

   > Pada Hooks, lifecycle" ini bisa digantikan dengan <kbd>useEffect()</kbd>.

3. Jelaskan perbedaan Real DOM vs Virtual DOM!

   <div class="overflow-x-auto">
     <table class="border p-2 min-w-[500px]"><thead><tr><th class="border p-2">Fitur</th><th class="border p-2">Real DOM</th><th class="border p-2">Virtual DOM</th></tr></thead><tbody><tr><td class="border p-2">Performa</td><td class="border p-2">Lambat</td><td class="border p-2">Cepat</td></tr><tr><td class="border p-2">Rendering</td><td class="border p-2">Mengubah semua elemen</td><td class="border p-2">Hanya mengubah elemen yang berubah</td></tr><tr><td class="border p-2">Efisiensi</td><td class="border p-2">Tidak optimal</td><td class="border p-2">Optimal dengan Diffing Algorithm (membandingkan Virtual DOM lama & baru)</td></tr></tbody></table>
   </div>

4. Mengapa ReactJS menggunakan virtual DOM dan bukan real DOM?
   - Virtual DOM mempercepat proses rendering dengan cara membandingkan perubahan sebelum mengupdate DOM asli. Ini disebut dengan <kbd>Reconciliation</kbd>.

5. Apa kegunaan prop key, dan apa yang terjadi jika tidak menggunakannya?
   - Key digunakan dalam list untuk memberikan identitas unik pada setiap elemen.
   - Jika tidak ada key, React harus mengecek ulang semua elemen dalam list, yang bisa memperlambat kinerja.

6. Kapan dan Mengapa menggunakan State Management dan tidak?
   - Gunakan state management jika state dipakai di banyak komponen.
   - Jika hanya beberapa komponen, cukup gunakan <kbd>useState()</kbd> atau <kbd>useContext()</kbd>

7. Apa saja Hooks yang pernah digunakan? Jelaskan juga setiap kegunaannya

   <div class="overflow-x-auto">
   <table class="border p-2 min-w-[500px]"><thead><tr><th class="border p-2">Hook</th><th class="border p-2">Fungsi</th></tr></thead><tbody><tr><td class="border p-2"><kbd>useState</kbd></td><td class="border p-2">Menyimpan state lokal</td></tr><tr><td class="border p-2"><kbd>useEffect</kbd></td><td class="border p-2">Menjalankan efek samping (API call, event listener, dll.)</td></tr><tr><td class="border p-2"><kbd>useContext</kbd></td><td class="border p-2">Menggunakan nilai dari Context API</td></tr><tr><td class="border p-2"><kbd>useMemo</kbd></td><td class="border p-2">Optimalisasi perhitungan berat</td></tr><tr><td class="border p-2"><kbd>useCallback</kbd></td><td class="border p-2">Optimalisasi fungsi agar tidak berubah setiap render</td></tr><tr><td class="border p-2"><kbd>useRef</kbd></td><td class="border p-2">Menyimpan referensi tanpa menyebabkan re-render</td></tr><tr><td class="border p-2"><kbd>useReducer</kbd></td><td class="border p-2">Alternatif <kbd>useState</kbd> untuk manajemen state yang kompleks</td></tr></tbody></table>
   </div>

8. Mengapa Hooks harus selalu dipanggil di top-level sebuah component?
   - Karena React menggunakan rules of hooks, yaitu:
     - Hooks harus dipanggil dalam urutan yang sama di setiap render.
     - Tidak boleh dipanggil dalam loop, kondisi, atau nested function.
   - Jika dilanggar, bisa menyebabkan bug yang sulit dideteksi.

9. Apa itu high order component?
   - HOC adalah fungsi yang menerima komponen dan mengembalikan komponen baru dengan tambahan props atau behavior.

   ```js
   // component dengan HOC
   const withBorder = (Component) => (props) => (
     <div style={{ border: '1px solid red' }}>
       <Component {...props} />
     </div>
   )

   // component button
   const Button = () => {
     return <button>Click me</button>
   }
   export default withBorder(Button)
   ```

10. Kapan harus pake context kapan harus pake redux?

    <div class="overflow-x-auto">
      <table class="border p-2 min-w-[500px]"><thead><tr><th class="border p-2">Kriteria</th><th class="border p-2">Context API</th><th class="border p-2">Redux</th></tr></thead><tbody><tr><td class="border p-2">Kompleksitas</td><td class="border p-2">Sederhana</td><td class="border p-2">Kompleks</td></tr><tr><td class="border p-2">Skala</td><td class="border p-2">Kecil hingga menengah</td><td class="border p-2">Besar</td></tr><tr><td class="border p-2">Performanya</td><td class="border p-2">Bagus untuk state kecil</td><td class="border p-2">Lebih efisien untuk state besar</td></tr></tbody></table>
    </div>

11. Apa bedanya pure component sama functional component?
    - Pure Component: Hanya re-render jika state atau props berubah (digunakan pada React.PureComponent).
    - Functional Component: Re-render setiap kali parent-nya re-render.

12. Apa perbedaan Class Component dengan Functional Component?

    <div class="overflow-x-auto">
    <table class="border p-2 min-w-[500px]"><thead><tr><th class="border p-2">Jenis</th><th class="border p-2">Class Component</th><th class="border p-2">Functional Component</th></tr></thead><tbody><tr><td class="border p-2">Sintaks</td><td class="border p-2">Menggunakan class</td><td class="border p-2">Menggunakan function</td></tr><tr><td class="border p-2">State</td><td class="border p-2"><code>this.state</code></td><td class="border p-2"><code>useState()</code></td></tr><tr><td class="border p-2">Lifecycle</td><td class="border p-2"><code>componentDidMount()</code></td><td class="border p-2"><code>useEffect()</code></td></tr></tbody></table>
    </div>

    <br />

    > React lebih merekomendasikan Functional Component karena lebih ringan dan mudah dibaca.

13. Apa itu SSR dan CSR, kapan kita harus make CSR atau SSR?
    - SSR dan CSR adalah dua teknik dalam rendering halaman web. Masing-masing punya kelebihan dan kekurangan tergantung pada kebutuhan aplikasi.
      - ✅ SSR adalah proses rendering halaman web di server sebelum dikirim ke browser.
      - 📌 Cara Kerja SSR:
        - Browser mengirim request ke server.
        - Server membangun halaman HTML lengkap dan mengirimkannya ke browser.
        - Browser langsung menampilkan halaman yang sudah di-render oleh server.
      - 📌 Kelebihan SSR:
        - ✅ SEO-friendly → Mesin pencari bisa membaca halaman dengan mudah.
        - ✅ Faster First Load → Halaman langsung muncul karena sudah di-render oleh server.
        - ✅ Baik untuk konten yang sering berubah (misalnya berita, e-commerce, dll.).
      - ⚠ Kekurangan SSR:
        - ❌ Setiap request membutuhkan render ulang di server → bisa lebih lambat untuk navigasi selanjutnya.
        - ❌ Beban server lebih tinggi dibanding CSR.

      <br />
      <br />
      - ✅ CSR adalah proses rendering halaman web di browser menggunakan JavaScript setelah menerima halaman kosong dari server.
        - 📌 Cara Kerja CSR:
          - Browser meminta halaman ke server.
          - Server hanya mengirim HTML dasar + JavaScript (tanpa konten).
          - JavaScript di browser mengambil data dari API, lalu merender halaman secara dinamis.
        - 📌 Kelebihan CSR:
          - ✅ Lebih cepat setelah halaman pertama dimuat, karena navigasi hanya perlu update bagian tertentu tanpa reload halaman.
          - ✅ Interaktif dan lancar seperti aplikasi (SPA - Single Page Application).
          - ✅ Beban server lebih ringan, karena rendering dilakukan di client.
        - ⚠ Kekurangan CSR:
          - ❌ SEO lebih sulit (karena mesin pencari hanya melihat HTML kosong sebelum JavaScript dijalankan).
          - ❌ First Load lebih lambat karena butuh download dan eksekusi JavaScript sebelum halaman muncul.

      <br />
      <br />
      - 📌 4. Kapan Menggunakan SSR atau CSR?

      <br />
      - ✅ Gunakan SSR jika:
        - Website membutuhkan SEO yang kuat (misalnya blog, berita, e-commerce).
        - Halaman harus muncul secepat mungkin saat pertama kali diakses.
        - Konten berubah sering, tapi tetap butuh indeksasi oleh Google.

      <br />
      - ✅ Gunakan CSR jika:
        - Aplikasi bersifat interaktif seperti dashboard, chat, atau media sosial.
        - Navigasi antar halaman harus cepat tanpa reload.
        - Tidak terlalu peduli dengan SEO atau hanya menargetkan pengguna login.

14. Perbedaan Controlled vs uncontrolled components di React?
    - <kbd>Controlled</kbd>: State dikontrol oleh React (useState).
    - <kbd>Uncontrolled</kbd>: Menggunakan ref untuk mendapatkan nilai input.

15. Bagaimana cara agar browser dan server dapat berkomunikasi tanpa reload halaman?
    - AJAX (fetch, axios)
    - WebSocket (untuk real-time)
    - Server-Sent Events (SSE)

16. Apa itu memoization? Apa manfaatnya dalam aplikasi React?
    - Memoization adalah teknik caching untuk mencegah perhitungan ulang yang tidak perlu.
    - React Hooks yang mendukung memoization:
      - <kbd>useMemo()</kbd>: Mencegah perhitungan ulang nilai.
      - <kbd>useCallback()</kbd>: Mencegah pembuatan ulang fungsi.

    > Manfaat: Meningkatkan performa dengan menghindari render ulang yang tidak perlu.

17. Bagaimana perbedaan pengunaan useMemo dan useCallback?
    - ✔ useMemo → Cache hasil perhitungan, menghindari perhitungan ulang yang mahal.
    - ✔ useCallback → Cache fungsi, mencegah pembuatan fungsi baru di setiap render.
    - ⚡ Gunakan useMemo untuk perhitungan berat, dan useCallback untuk optimasi fungsi agar tidak menyebabkan re-render!

    <br />

    ## 📌 1. useMemo → Mem-Cache Nilai Hasil Perhitungan
    - ✅ Gunakan useMemo saat ada perhitungan berat yang tidak ingin dieksekusi berulang kali setiap re-render.
    - ✅ Mengembalikan nilai yang telah dihitung dan hanya dihitung ulang jika dependensinya berubah.

    <br />
    - ❌ Tanpa useMemo (Setiap Render Hitung Ulang)

    ```jsx
    import { useState } from 'react'

    function ExpensiveComponent({ numbers }) {
      const sum = numbers.reduce((acc, num) => acc + num, 0) // Perhitungan berat

      return <div>Sum: {sum}</div>
    }

    export default function App() {
      const [count, setCount] = useState(0)
      const numbers = Array.from({ length: 1000000 }, (_, i) => i + 1) // Data besar

      return (
        <div>
          <ExpensiveComponent numbers={numbers} />
          <button onClick={() => setCount(count + 1)}>Increment {count}</button>
        </div>
      )
    }
    ```

    <br />

    > 🔴 Masalah:
    >
    > - Setiap kali tombol diklik, perhitungan reduce dijalankan ulang, padahal tidak ada perubahan pada numbers.
    > - Ini memperlambat UI karena perhitungan yang berat selalu dilakukan ulang.

    <br />
    - ✅ Dengan useMemo()

    ```jsx
    import { useState, useMemo } from 'react'

    function ExpensiveComponent({ numbers }) {
      const sum = useMemo(() => {
        console.log('Calculating sum...')
        return numbers.reduce((acc, num) => acc + num, 0)
      }, [numbers]) // Hanya dihitung ulang jika `numbers` berubah

      return <div>Sum: {sum}</div>
    }

    export default function App() {
      const [count, setCount] = useState(0)
      const numbers = Array.from({ length: 1000000 }, (_, i) => i + 1) // Data besar

      return (
        <div>
          <ExpensiveComponent numbers={numbers} />
          <button onClick={() => setCount(count + 1)}>Increment {count}</button>
        </div>
      )
    }
    ```

    <br />

    > ✅ Keuntungan useMemo
    >
    > - Perhitungan reduce tidak dieksekusi ulang setiap kali state berubah.
    > - Hanya dihitung saat numbers berubah, meningkatkan performa.

    <br/>

    ## 📌 2. useCallback → Mem-Cache Fungsi
    - ✅ Gunakan useCallback saat sebuah fungsi sering dibuat ulang tanpa perlu.
    - ✅ Mencegah re-render komponen anak yang menerima fungsi sebagai prop (karena setiap render, fungsi dianggap berbeda).

    <br />
    - ❌ Tanpa useCallback (Fungsi Dibuat Ulang Terus)

    ```jsx
    import { useState } from 'react'

    function Child({ onClick }) {
      console.log('Child re-rendered!')
      return <button onClick={onClick}>Click Me</button>
    }

    export default function App() {
      const [count, setCount] = useState(0)

      const handleClick = () => {
        console.log('Button clicked!')
      }

      return (
        <div>
          <Child onClick={handleClick} />
          <button onClick={() => setCount(count + 1)}>Increment {count}</button>
        </div>
      )
    }
    ```

    <br />

    > 🔴 Masalah:
    >
    > - Setiap kali App re-render (karena count berubah), handleClick dibuat ulang.
    > - Child selalu re-render meskipun onClick tidak berubah (karena dianggap sebagai fungsi baru).

    <br />
    - ✅ dengan useCallback()

    ```jsx
    import { useState, useCallback } from 'react'

    function Child({ onClick }) {
      console.log('Child re-rendered!')
      return <button onClick={onClick}>Click Me</button>
    }

    export default function App() {
      const [count, setCount] = useState(0)

      const handleClick = useCallback(() => {
        console.log('Button clicked!')
      }, []) // Fungsi hanya dibuat sekali

      return (
        <div>
          <Child onClick={handleClick} />
          <button onClick={() => setCount(count + 1)}>Increment {count}</button>
        </div>
      )
    }
    ```

    <br />

    > ✅ Keuntungan useCallback
    >
    > - handleClick tidak dibuat ulang setiap render (hanya dibuat sekali).
    > - Child tidak akan re-render kecuali ada perubahan pada onClick.
    > - Menghemat performa pada komponen yang sering menerima fungsi sebagai prop.

18. Apa itu React Router?
    - React Router adalah library yang memungkinkan navigasi antar halaman dalam aplikasi React.
