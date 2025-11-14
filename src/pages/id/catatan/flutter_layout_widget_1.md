---
layout: ../../../layouts/MarkdownLayout.astro
title: Flutter - Layout Widget (part 1)
description: Align, Aspect Ratio, Baseline, Center, Constrained Box, Container, Expanded, FittedBox, FractionallySizedBox, IntrinsictHeight & IntrinsictWidth, LimitedBox, Offstage, OverflowBox, Padding, SizedBox, SizedOverflowBox
imagePath: /blog/flutter.webp
imageAlt: img-dart
viewTransitionName: 'dart'
date: 2025-05-01 09:00
icon: 'logos:flutter'
tags:
  - dart
  - flutter
---

## Layout Widget Bagian 1

### 1. Align

menempatkan child widget pada posisi tertentu dalam parent-nya., dimana posisi tersebut diantaranya: **Alignment.topLeft, Alignment.topCenter, Alignment.topRight, Alignment.centerLeft, Alignment.center, Alignment.centerRight, Alignment.bottomLeft, Alignment.bottomCenter, Alignment.bottomRight**

### 2. Aspect Ratio

memaksa child widget memiliki rasio aspek tertentu (lebar/tinggi), Berguna untuk gambar, video, atau elemen yang perlu proporsi tetap.

### 3. Baseline

memungkinkan kita menyelaraskan beberapa widget teks atau widget lain yang memiliki baseline (seperti Text, RichText) pada posisi vertikal yang sama

### 4. Center

memposisikan child widget di tengah parent-nya. Center sebenarnya adalah wrapper khusus dari Align dengan alignment default **Alignment.center**, Jika butuh penyesuaian lebih fleksibel, gunakan Align.

### 5. Constrained Box

memberikan batasan minimum/maximum ukuran pada child, ini mirip seperti pada css min-width & max-width.

### 6. Container

Container adalah salah satu widget paling serbaguna dan paling sering digunakan di Flutter. Widget ini menggabungkan kemampuan layout, painting, dan positioning dalam satu widget yang mudah digunakan.

**Fungsi Utama Container**

- Membuat box dengan dekorasi (warna, border, shadow)
- Mengontrol ukuran (width/height) dan padding/margin
- Memposisikan child widget dengan alignment
- Berperilaku berbeda tergantung constraints yang diberikan

### 7. Expanded

widget layout penting di Flutter yang digunakan dalam Row, Column untuk mengisi ruang yang tersedia di sepanjang sumbu utama (main axis). kalau di css mirip flex grow

Fungsi Utama Expanded

- Mengisi ruang kosong di parent widget (Row/Column)
- Membagi ruang secara proporsional dengan widget Expanded lainnya
- Memaksa child widget mengembang memenuhi ruang yang dialokasikan

### 8. FittedBox

widget yang menyesuaikan ukuran dan posisi child-nya agar sesuai dengan ruang yang tersedia, dengan mempertahankan rasio aspek (aspect ratio) child widget. kalau di css ini adalah **object-fit**.

Fungsi Utama FittedBox:

- Scaling: Memperbesar/memperkecil child widget agar muat
- Positioning: Memposisikan child setelah di-scale
- Aspect Ratio: Mempertahankan proporsi asli child

### 9. FractionallySizedBox

widget layout yang memungkinkan kita menentukan ukuran child sebagai fraksi (persentase) dari ruang yang tersedia dari parent-nya. Widget ini sangat berguna untuk membuat desain yang responsif karena ukurannya menyesuaikan secara relatif terhadap parent.

Fungsi Utama:

- Mengatur lebar dan tinggi child sebagai persentase dari parent
- Membuat layout proporsional yang menyesuaikan berbagai ukuran layar
- Dapat digunakan untuk spacing relatif antar widget
- widthFactor, heightFactor (0.0 - 1.0). 1.0 = 100%

### 10. IntrinsictHeight & IntrinsictWidth

widget layout yang memaksa child-nya memiliki tinggi intrinsik yang sama dengan child yang paling tinggi di dalamnya. Widget ini berguna ketika kita perlu menyamakan tinggi beberapa widget dalam sebuah Row atau Column.

Konsep Dasar

- Menghitung tinggi intrinsik: Widget ini menganalisis semua children untuk menentukan tinggi maksimum.
- Menyamakan tinggi: Memaksa semua children memiliki tinggi yang sama.
- Hanya untuk vertical layout: Utamanya digunakan dalam Column atau Row dengan arah vertikal.

> Peringatan: Widget ini melakukan layout pass tambahan untuk menghitung ukuran intrinsik, yang bisa mempengaruhi performa.

Alternatif yang Lebih Efisien:

- Gunakan CrossAxisAlignment.stretch (jika memungkinkan) pada Row/Column.
- Tentukan tinggi secara manual

Use Case yang Tepat:

- Form dengan label dan input
- Dashboard dengan card sama tinggi

### 11. LimitedBox

Fungsi Utama:

- Memberikan batasan maksimum ketika parent tidak memberikan constraint
- Tidak berpengaruh ketika parent sudah memberikan constraint terbatas
- Berguna dalam ListView/Column yang memiliki children dengan ukuran tidak terbatas

Cara Kerja:

- Jika parent TIDAK memberikan constraint (unbounded):
  - LimitedBox akan menggunakan maxWidth/maxHeight sebagai constraint
- Jika parent SUDAH memberikan constraint (bounded):
  - LimitedBox akan mengikuti constraint parent

### 12. Offstage

widget yang memungkinkan Anda menyembunyikan child widget dari tampilan tanpa menghapusnya dari widget tree. Berbeda dengan Visibility atau Opacity, Offstage benar-benar menghilangkan widget dari proses layout dan rendering, tetapi tetap mempertahankannya dalam memori. kalau di css ini seperti **display: none**.

Fungsi Utama:

- Menyembunyikan widget tanpa menghapusnya dari widget tree
- Menghemat resources layout/rendering untuk widget yang tidak terlihat
- Mempertahankan state widget yang disembunyikan

### 13. OverflowBox

widget layout yang memungkinkan child-nya melampaui batas (overflow) dari parent-nya tanpa memicu overflow error. Widget ini berguna ketika Anda perlu menampilkan konten yang sengaja ingin melampaui batas container parent.

Fungsi Utama:

- Memungkinkan child lebih besar dari parent
- Tidak memotong (clip) child yang overflow (kecuali di-wrap dengan ClipRect)
- Berguna untuk efek visual khusus dimana konten perlu "keluar" dari container

### 14. Padding

satu widget layout dasar di Flutter yang digunakan untuk menambahkan jarak (spasi) di sekitar child widget. Widget ini sangat penting untuk membuat desain yang rapi dan terorganisir.

Fungsi Utama:

- Menambahkan ruang kosong di sekitar widget child
- Memberikan jarak antara widget dengan parent atau widget lainnya
- Memisahkan konten dari batas (border) container

Performance Considerations:

- Padding adalah widget yang sangat ringan
- Tidak menyebabkan rebuild tidak perlu
- Alternatif yang lebih baik daripada Container jika hanya butuh padding

### 15. SizedBox

widget layout sederhana namun sangat powerful di Flutter yang digunakan untuk mengontrol ukuran ruang dengan cara yang efisien.

Fungsi Utama:

- Memberikan ukuran tetap (fixed size) pada child widget
- Membuat ruang kosong/spacer antara widget
- Membatasi ukuran minimum/maksimum widget child

### 16. SizedOverflowBox

widget layout khusus yang menggabungkan fungsi SizedBox dan OverflowBox, memungkinkan Anda untuk:

- **Menentukan ukuran preferensi (seperti SizedBox)**
- **Mengizinkan child melampaui batas (seperti OverflowBox)**
- **Mengontrol alignment child yang overflow**

Fungsi Utama:

- Memberikan ukuran preferensi ke parent
- Memungkinkan child melebihi batas ukuran yang ditentukan
- Mengontrol posisi child yang overflow

Tips Penggunaan:

- ✅ Gunakan untuk komponen UI kecil yang perlu overflow terkontrol
- ✅ Ideal untuk badge, tooltip, atau indikator visual
- ✅ Hindari untuk layout utama aplikasi
- ✅ Kombinasikan dengan ClipRect jika perlu membatasi overflow visual
