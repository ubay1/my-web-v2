---
layout: ../../../layouts/MarkdownLayout.astro
title: Dart - Function
description: void function, return function, arrow function, anonym function, first class function, positional parameter, optional parameter, named parameter, lexical closure, tipe function, high order function.
imagePath: https://swansoftwaresolutions.com/wp-content/uploads/2020/02/08.20.20-What-is-Dart-and-how-is-it-used-1.jpg
imageAlt: img-dart
viewTransitionName: 'dart'
date: 2025-04-28 11:00
icon: 'logos:dart'
tags:
  - dart
  - flutter
---

## Function

Fungsi adalah blok kode yang melakukan tugas tertentu dan bisa dipanggil berkali-kali. Dart mendukung berbagai jenis fungsi dengan fitur modern.

#### 1. Fungsi Dasar

**void**: Menandakan fungsi tidak mengembalikan nilai.

```dart
void main() {
  basicFunc();
}

void basicFunc() {
  print('Hello salam kenal');
}
```

<br/>

#### 2. fungsi dengan parameter

a. positional parameter

- Parameter wajib diisi sesuai urutan

```dart
void main() {
  positionalParameter('Ubay', 'Frontend Engineer');
}

void positionalParameter(String name, String job) {
  print('Nama saya $name, pekerjaan saya $job');
}
```

<br/>

b. optional parameter

- Ditandai dengan [ ] dan bisa memiliki nilai default.
- required: wajib diisi
- ? : opsional
- ?? : jika null maka diisi dengan nilai default, kalo di js ini namanya **null coalescing operator**

```dart
void main() {
  optionalParameter('Ubay');
}
void optionalParameter(String name, [String hobi = 'gak punya hobi']) {
  print('Nama saya $name, hobi saya $hobi');
}
```

<br/>

c. named parameter

- Ditandai dengan {}, dipanggil dengan nama parameter.
- required: wajib diisi
- ? : opsional
- ?? : jika null maka diisi dengan nilai default

```dart
void main() {
  namedParameter(name: 'Ubay', umur: 20);
}
void namedParameter({required String name, int? umur}) {
  print("Nama saya $name, umur saya ${umur ?? 0}");
}
```

<br/>

#### 3. fungsi dengan return

- Gunakan tipe data sebelum nama fungsi.

```dart
void main() {
  print(fungsiWithReturn());
}
String fungsiWithReturn() {
  return 'Hallo saya ubay';
}
```

<br/>

#### 4. fungsi dengan return (arrow function)

- Gunakan tipe data sebelum nama fungsi.

```dart
void main() {
  print(fungsiWithReturn2(10, 40));
}
int fungsiWithReturn2(int a, int b) => a + b;
```

<br/>

#### 5. first class function

- Fungsi bisa disimpan dalam variabel atau dilewatkan sebagai argumen.

```dart
void main() {
  // simpan fungsi ke variabel
  var tampungFirstClassFunction = firstClassFunction;
  tampungFirstClassFunction('Hello ini first class function');
}
void firstClassFunction(String msg) => print(msg.toUpperCase());
```

<br/>

#### 6. anonymous function

- Fungsi tanpa nama, sering digunakan untuk callback.

```dart
void main() {
  nums.forEach((num) => print("anonymous func = $num"));
}
List<int> nums = [1, 2, 3, 4];
```

<br/>

#### 7. lexical closure

Lexical Closures adalah fungsi yang bisa mengingat dan mengakses variabel dari scope tempat ia dibuat, meskipun scope tersebut sudah **selesai dieksekusi**.

- closure wajib disimpan di variabel
- jika kita langsung print functionnya tanpa menyimpan ke variabel outputnya adalah functionnya

```dart
void main() {
  // closure wajib disimpan di variabel
  var tambahDua = buatPenambah(2); // disimpan ke angkaTambahan
  // jika kita langsung print functionnya tanpa menyimpan ke variabel outputnya adalah (String key) => "$key = $angkaTambahan";
  print(buatPenambah(2));
  print(tambahDua(3));  // Output: 5 (3 + 2)
}

Function buatPenambah(int angkaTambahan) {
  return (String key) => "$angka = $angkaTambahan";
}
```

<br/>

#### 8. Tipe Function pada dart

**Tipe Function** di Dart adalah tipe data yang digunakan untuk merepresentasikan fungsi. Artinya, kita bisa menyimpan fungsi dalam variabel, mengirim fungsi sebagai argumen ke fungsi lain, atau mengembalikan fungsi dari suatu fungsi.

> Kapan Pakai Tipe Function?
>
> - Membuat higher-order function (fungsi yang menerima/mengembalikan fungsi).
> - Menyimpan fungsi dalam variabel untuk dipanggil nanti.
> - Menerapkan callback (misal: event handler, async operations).

---

a. Deklarasi Variabel dengan Tipe Function

- Kita bisa membuat variabel yang bisa menampung fungsi.

```dart
void greet() {
  print("Hello, Dart!");
}

void main() {
  Function sayHello = greet;  // Menyimpan fungsi `greet` ke variabel `sayHello`
  sayHello();  // Memanggil fungsi melalui variabel
}

/** Output:
 * Hello, Dart!
 */
```

b. Fungsi sebagai Parameter (Higher-Order Function)

- Kita bisa mengirim fungsi sebagai argumen ke fungsi lain.

```dart

// saat kirim parameter di index ke 3 harus bertipe function, dimana function tersebut akan digunakan untuk melakukan proses dari parameter a dan b
void prosesInput(int a, int b, Function operasi) {
  print(operasi(a, b));
}

int tambah(int x, int y) => x + y;
int kali(int x, int y) => x * y;

void main() {
  prosesInput(3, 4, tambah);
  prosesInput(3, 4, kali);    // Output: 12
}
```

c. Fungsi Mengembalikan Fungsi

> contoh dibawah ini adalah lexical closure

<br/>

```dart
Function buatPenambah(int n) {
  return (int x) => x + n;  // Mengembalikan fungsi lambda
}

void main() {
  var tambahLima = buatPenambah(5);  // `tambahLima` sekarang adalah fungsi (x) => x + 5
  print(tambahLima(10));  // Output: 15
}
```

d. Tipe Fungsi yang Lebih Spesifik

- Kita bisa menentukan signature (struktur parameter dan return type) dari Function agar lebih aman.

```dart
int hitung(int a, int b, int Function(int, int) operasi) {
  return operasi(a, b);
}

void main() {
  int hasil = hitung(6, 3, (x, y) => x - y);  // Fungsi lambda sebagai argumen
  print(hasil);  // Output: 3
}

/** Penjelasan
 * int Function(int, int) artinya:
 * - Fungsi yang menerima 2 parameter harus int.
 * - Fungsi tersebut akan mengembalikan nilai int.
 */
```
