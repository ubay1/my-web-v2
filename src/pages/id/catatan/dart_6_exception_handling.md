---
layout: ../../../layouts/MarkdownLayout.astro
title: Dart - Exception Handling
description: jenis-jenis exception built-in, try catch finally, menangkap exception spesifik, stack trace, melempar exception (throw), custom exception
imagePath: https://swansoftwaresolutions.com/wp-content/uploads/2020/02/08.20.20-What-is-Dart-and-how-is-it-used-1.jpg
imageAlt: img-dart
viewTransitionName: 'dart'
date: 2025-04-30 09:00
icon: 'logos:dart'
tags:
  - dart
  - flutter
---

## Exception Handling

Exception handling adalah mekanisme untuk menangani error atau situasi tak terduga saat program berjalan. Dart menyediakan beberapa cara untuk menangani exception secara efektif.

#### Jenis-Jenis Exception Built-in di Dart

**Beberapa exception umum yang disediakan Dart:**

- **FormatException** – Kesalahan format data
- **RangeError** – Indeks di luar batas
- **NoSuchMethodError** – Pemanggilan method tidak ada
- **IntegerDivisionByZeroException** – Pembagian oleh nol
- **FileSystemException** – Error operasi file

##### 1. try-catch-finally

**try-catch-finally** adalah blok kode yang digunakan untuk menangani exception. Blok try berisi kode yang mungkin akan menghasilkan exception, sedangkan blok catch menangani exception yang terjadi. Blok finally akan dieksekusi selalu, baik exception terjadi atau tidak. mirip dengan javascript.

```dart
void main() {
  try {
    var hasil = 10 ~/ 0; // Pembagian oleh nol
    print(hasil);
  } catch (e) {
    print('Error: $e');
    // Output: Error: IntegerDivisionByZeroException
  } finally {
    print('selesai');
  }
}
```

<br />

##### 2. Menangkap Exception Spesifik

```dart
try {
  var list = [1, 2, 3];
  print(list[5]); // Index out of range
} on RangeError {
  print('Indeks melebihi batas!');
} catch (e) {
  print('Error lain: $e');
}
```

<br />

##### 3. Stack Trace

Mendapatkan informasi detail tentang alur error

```dart
try {
  // Kode berbahaya
} catch (e, stackTrace) {
  print('Error: $e');
  print('Stack trace: $stackTrace');
}
```

##### 4. Melempar Exception (Throw)

```dart
void cekUmur(int umur) {
  if (umur < 18) {
    throw FormatException('Umur tidak valid');
  }
}

void main() {
  try {
    cekUmur(15);
  } catch (e) {
    print(e); // Output: FormatException: Umur tidak valid
  }
}
```

<br />

##### 5. Custom Exception

Membuat exception kustom dengan class

```dart
class SaldoKurangException implements Exception {
  final String message;
  SaldoKurangException(this.message);

  @override
  String toString() => 'SaldoKurangException: $message';
}

void tarikSaldo(double saldo, double jumlah) {
  if (jumlah > saldo) {
    throw SaldoKurangException('Saldo tidak cukup!');
  }
}

void main() {
  try {
    tarikSaldo(1000, 1500);
  } catch (e) {
    print(e); // Output: SaldoKurangException: Saldo tidak cukup!
  }
}
```
