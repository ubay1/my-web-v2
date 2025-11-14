---
layout: ../../../layouts/MarkdownLayout.astro
title: Flutter - Layout Widget (part 2)
description: Align, Aspect Ratio, Baseline, Center, Constrained Box, Container, Expanded, FittedBox, FractionallySizedBox, IntrinsictHeight & IntrinsictWidth, LimitedBox, Offstage, OverflowBox, Padding, SizedBox, SizedOverflowBox
imagePath: /blog/flutter.webp
imageAlt: img-dart
viewTransitionName: 'dart'
date: 2025-05-02 09:00
icon: 'logos:flutter'
tags:
  - dart
  - flutter
---

## Layout Widget Bagian 2

### 1. CarouselView

### 2. Flow

seperti floating button

### 3. GridView

widget yang menampilkan koleksi widget dalam tata letak grid (berbaris dan berkolom). Berikut penjelasan lengkap dan contoh implementasinya:

Jenis GridView di Flutter

- GridView.count = Membuat grid dengan jumlah kolom tetap

```dart
GridView.count(
  crossAxisCount: 2, // Jumlah kolom
  children: List.generate(10, (index) {
    return Container(
      margin: EdgeInsets.all(8),
      color: Colors.blue[100],
      child: Center(child: Text('Item $index')),
    );
  }),
)
```

- GridView.extent = Membuat grid dengan lebar maksimum item

```dart
GridView.extent(
maxCrossAxisExtent: 150, // Lebar maksimum item
children: List.generate(10, (index) {
  return Container(
    margin: EdgeInsets.all(8),
    color: Colors.green[100],
    child: Center(child: Text('Item $index')),
  );
}),
)
```

- GridView.builder = Optimal untuk grid dengan banyak item (lazy loading)

```dart
GridView.builder(
  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
    crossAxisCount: 3, // 3 kolom
  ),
  itemCount: 50, // Jumlah total item
  itemBuilder: (context, index) {
    return Card(
      child: Image.network('https://picsum.photos/250?image=$index'),
    );
  },
)
```

- GridView.custom = Grid dengan custom delegate untuk kontrol penuh

```dart
GridView.custom(
  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
    crossAxisCount: 2,
  ),
  childrenDelegate: SliverChildListDelegate(
    List.generate(10, (index) => Text('Item $index')),
  ),
)
```

Tips Penggunaan GridView:

- ✅ Gunakan GridView.builder untuk data dinamis (lebih efisien)
- ✅ Atur childAspectRatio untuk kontrol rasio item
- ✅ Tambahkan shrinkWrap: true jika dalam Scrollable view
- ✅ Kombinasikan dengan MediaQuery untuk desain responsif

### 4. IndexedStack

widget yang memungkinkan Anda menampilkan satu child widget dari sekumpulan widget berdasarkan indeks yang ditentukan, sambil mempertahankan state semua child widget.

Keuntungan Menggunakan IndexedStack:

- Mempertahankan state - Form input, scroll position, dll tidak akan hilang
- Transisi instan - Tidak ada animasi, langsung berpindah
- Sederhana - Tidak perlu manajemen state kompleks

Kekurangan:

- Penggunaan memori lebih tinggi karena semua child tetap di-memory
- Tidak ada animasi transisi antara child

Tips Penggunaan:

- ✅ Ideal untuk bottom navigation dengan sedikit tab
- ✅ Cocok untuk form wizard multi-step
- ✅ Gunakan ketika state preservation lebih penting daripada performa
- ✅ Hindari jika memiliki banyak child kompleks (gunakan Visibility/Lazy loading)

### 5. LayoutBuilder

widget yang memberikan Anda informasi constraints parent dan memungkinkan pembuatan layout responsif berdasarkan ukuran yang tersedia.

Fungsi Utama:

- Membangun layout dinamis berdasarkan ukuran parent
- Membuat desain yang responsif terhadap berbagai ukuran layar
- Mengakses constraints dari parent widget

Tips Penggunaan

- ✅ Gunakan untuk membuat komponen responsif
- ✅ Hindari perhitungan berat di builder (gunakan cache jika perlu)
- ✅ Kombinasikan dengan MediaQuery untuk informasi lebih lengkap
- ✅ Ideal untuk widget yang perlu beradaptasi dengan ruang tersedia

LayoutBuilder sangat berguna ketika Anda perlu:

- Membuat komponen yang beradaptasi dengan ukuran parent
- Mengubah tata letak berdasarkan ruang yang tersedia
- Membangun UI yang responsif tanpa ketergantungan pada ukuran layar absolut
- Mengoptimalkan tampilan untuk berbagai perangkat

### 6. ListView

widget scrollable yang menampilkan daftar children widget secara linear (vertikal atau horizontal). Berikut penjelasan lengkapnya:

1. ListView (Konstruktor Dasar) = Untuk daftar pendek dengan children langsung

```dart
ListView(
  padding: EdgeInsets.all(8),
  children: [
    ListTile(title: Text('Item 1')),
    ListTile(title: Text('Item 2')),
    ListTile(title: Text('Item 3')),
  ],
)
```

2. ListView.builder (Lazy Loading) = Optimal untuk daftar panjang/dinamis

```dart
ListView.builder(
  itemCount: 100, // Jumlah total item
  itemBuilder: (context, index) {
    return ListTile(
      title: Text('Item $index'),
    );
  },
)
```

3. ListView.separated = Dengan pemisah antar item

```dart
ListView.separated(
  itemCount: 50,
  separatorBuilder: (context, index) => Divider(),
  itemBuilder: (context, index) {
    return ListTile(title: Text('Item $index'));
  },
)
```

4. ListView.custom = Dengan kontrol maksimal menggunakan SliverChildDelegate

```dart
ListView.custom(
  childrenDelegate: SliverChildBuilderDelegate(
    (context, index) => ListTile(title: Text('Item $index')),
    childCount: 100,
  ),
)
```

Tips Performa:

- ✅ Gunakan ListView.builder untuk daftar panjang
- ✅ Tetapkan itemExtent jika tinggi item tetap (meningkatkan performa)
- ✅ Hindari widget kompleks sebagai children
- ✅ Gunakan const constructor untuk children yang statis

### 7. Stack

widget yang memungkinkan Anda menumpuk beberapa widget satu di atas yang lain, dengan kontrol posisi yang presisi. Widget ini sangat berguna untuk membuat desain kompleks dengan lapisan-lapisan elemen UI.

Fungsi Utama:

- Menumpuk widget secara overlapping (bertumpuk)
- Mengontrol posisi tiap child widget
- Membuat desain layered (berlapis)
- Cocok untuk UI kompleks dengan elemen saling tumpang tindih

Tips Penggunaan

- ✅ Gunakan Positioned untuk kontrol presisi
- ✅ Atur clipBehavior ke Clip.none jika perlu overflow
- ✅ Hindari nested Stack yang berlebihan
- ✅ Untuk z-index, urutan child menentukan tumpukan (child/widget paling bawah berarti ada di paling atas)

### 8. Table

widget yang memungkinkan Anda membuat tata letak berbasis tabel dengan baris dan kolom, memberikan kontrol presisi atas penempatan sel-sel. Berikut penjelasan lengkapnya:

Fungsi Utama:

- Membuat layout berbasis tabel dengan baris dan kolom
- Mengatur alignment konten dalam sel
- Menentukan lebar kolom yang fleksibel
- Cocok untuk data tabular atau layout terstruktur

Tips Penggunaan

- ✅ Gunakan IntrinsicColumnWidth untuk konten dinamis
- ✅ Tambahkan Padding dalam TableCell untuk spasi internal
- ✅ Kombinasikan dengan SingleChildScrollView untuk tabel lebar
- ✅ Gunakan border untuk meningkatkan keterbacaan

### 9. Wrap

widget layout yang secara otomatis mengalirkan children-nya ke baris/kolom berikutnya ketika ruang horizontal/vertikal tidak cukup. Berikut penjelasan lengkapnya. kalau di css flexbox mirip seperti flex-wrap.

Fungsi Utama:

- Mengatur children secara flow layout (mengalir seperti teks)
- Otomatis membuat baris/kolom baru saat ruang habis
- Cocok untuk tag clouds, chips, atau item dinamis
- Tidak menyebabkan overflow error

Tips Penggunaan

- ✅ Gunakan untuk koleksi dinamis dengan ukuran bervariasi
- ✅ Atur spacing dan runSpacing untuk tampilan rapi
- ✅ Cocok untuk tag, filter, atau kategori
- ✅ Hindari untuk data terstruktur/berurutan
