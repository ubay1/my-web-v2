---
layout: ../../../layouts/MarkdownLayout.astro
title: Dart - Instalasi & Tipe data
description: int, double, num, String, bool, List<T>, Set<T>, Map<key, value>, var, final, const, Object, Null Safety (?), is, as, runtimeType
imagePath: /blog/dart.webp
imageAlt: img-dart
viewTransitionName: 'dart'
date: 2025-04-28 09:00
icon: 'logos:dart'
tags:
  - dart
  - flutter
---

## Installation dart sdk & VS Code Extension

- Install dart sdk https://dart.dev/get-dart
- Install VS Code Extension (dart, code runner)

## Tipe data

Dart adalah bahasa pemrograman yang **statically typed** artinya tipe data diperiksa saat kompilasi. Namun, Dart juga mendukung **type inference** (penyimpulan tipe) dan **null safety** untuk keamanan.

#### 1. Angka (int, double, num)

- **int**: Bilangan bulat (contoh: 10, -5, 0xFF).
- **double**: Bilangan desimal (contoh: 3.14, -2.5, 1.2e5).
- **num**: Bisa menampung int dan double.

```dart
int umur = 25;
double harga = 9.99;
num nilai = 42;  // Bisa int atau double
```

<br />

#### 2. Teks (String)

- **String**: Kumpulan karakter (UTF-16).
- Bisa pakai tanda kutip tunggal ('...') atau ganda ("...").
- Mendukung interpolasi (${ekspresi}).

```dart
String nama = 'Budi';
String salam = "Halo, $nama!";  // Interpolasi
String multiBaris = '''
Ini adalah
teks multi-baris.
''';
String multiLine2 = "Hello $name\nMy name is Ubay";
```

<br />

#### 3. Boolean (bool)

```dart
bool isAktif = true;
bool isLogin = false;
```

<br />

#### 4. List (Array)

- **List\<T\>** adalah Kumpulan data berurutan, **\<T\>** adalah tipe datanya.
- Bisa **fixed-length** (panjang tetap) atau **growable** (bisa ditambah).

```dart
List<int> angka = [1, 2, 3, 4, 5];
List<String> nama = ['Alice', 'Bob', 'Charlie'];
angka.add(6);  // Menambahkan elemen baru
angka.addAll([7, 8, 9]);  // Menambahkan beberapa elemen baru
```

<br />

#### 5. Set

- **Set\<T\>**: Kumpulan data unik (tidak boleh duplikat), **\<T\>** adalah tipe datanya.
- Tidak memiliki urutan.

```dart
Set<int> angka = {1, 2, 3, 4, 5};
Set<String> nama = {'Alice', 'Bob', 'Charlie'};
angka.add(6);  // Menambahkan elemen baru
angka.addAll({7, 8, 9});  // Menambahkan beberapa elemen baru
angka.remove(1);  // Menghapus angka yang memiliki nilai 1
nama.addAll({'ee', 'ff'});
```

<br />

#### 6. Map & Tipe Data Dynamic

- **Map\<K, V\>** : Kumpulan pasangan kunci-nilai (key-value)

```dart
Map<String, dynamic> user = {"name": 'agus', 'age': 20}; // menggunakan tipe dynamic agar bisa menambah value dengan tipe apapun.
user['age'] = 25; // menambah nilai age
user['address'] = 'jakarta'; // menambah key value baru
user['family'] = {
  'istri': 'ani',
  'anak': ['budi', 'andre'],
};
```

<br />

#### 7. var, final, dan const

- **var**: Tipe data dapat berubah.
- **final**: Tipe data tidak dapat berubah setelah pertama kali diinisialisasi.
- **const**: Tipe data tidak dapat berubah setelah pertama kali diinisialisasi dan nilai tetap.

```dart
var angka = 10;
final nama = 'Alice';
const pi = 3.14;
```

<br />

#### 8. Object dan Null Safety

- **Object**: Object bisa menampung tipe apa saja.
- **Null**: Nilai yang tidak ada.
- **Null Safety**: Dart mendukung null safety, artinya variabel tidak boleh null kecuali diberi tanda **?**

```dart
Object obj = 'Halo';
obj = 42;

String name = null; // Invalid (tidak bisa)
String? name2 = null; // Valid (Null Safety)
```

<br />

#### 9. Pengecekan & Konversi Tipe

- **is**: Memeriksa tipe data.
- **as**: Konversi paksa (error jika gagal).
- **runtimeType**: Mengecek tipe saat runtime.

```dart
dynamic nilai = 'Halo';

int nilai2 = 2;
String str = nilai2 as String; // Konversi ke string, error jika gagal
print(str);

if (nilai is String) {
  print('type dari variabel nilai adalah ' + nilai.runtimeType.toString());
} else {
  print('no Ini bukan String');
}
```
