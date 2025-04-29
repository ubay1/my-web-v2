---
layout: ../../../layouts/MarkdownLayout.astro
title: Dart - Looping
description: for, while, do while, for in, forEach, labels, break, continue
imagePath: https://swansoftwaresolutions.com/wp-content/uploads/2020/02/08.20.20-What-is-Dart-and-how-is-it-used-1.jpg
imageAlt: img-dart
viewTransitionName: 'dart'
date: 2025-04-28 10:30
icon: 'logos:dart'
tags:
  - dart
  - flutter
---

## Iterative Statements (Perulangan)

Iterative statements digunakan untuk mengeksekusi blok kode berulang kali selama kondisi tertentu terpenuhi. Dart mendukung beberapa jenis perulangan:

#### 1. for loop

- Digunakan ketika kita tahu berapa kali perulangan akan dilakukan.

```dart
for (int i = 0; i < 5; i++) {
  print(i);
}
```

```dart
// for loop dengan list
List<String> buah = ['Apel', 'Mangga', 'Jeruk'];

for (int i = 0; i < buah.length; i++) {
  print(buah[i]);
}
```

<br/>

#### 2. while loop

- Digunakan ketika kita tidak tahu berapa kali perulangan akan dilakukan.
- Menjalankan blok kode selama kondisi benar (true).
- Pengecekan kondisi dilakukan sebelum eksekusi.

```dart
int i = 0;
while (i < 5) {
  print(i);
  i++;
}
```

```dart
int i = 0;
while (i > 5) {
  print(i); // tidak akan dieksekusi
  i++;
}
```

<br/>

#### 3. do-while loop

- Digunakan ketika kita tidak tahu berapa kali perulangan akan dilakukan.
- Menjalankan blok kode minimal sekali.
- Pengecekan kondisi dilakukan setelah eksekusi.

```dart
int i = 0;
do {
  print(i); // kondisi akan dieksekusi minimal sekali
  i++;
} while (i < 5); // loop akan terus berjalan, karena kondisi benar
```

```dart
int i = 0;
do {
  print(i); // kondisi akan dieksekusi minimal sekali
  i++;
} while (i > 5); // loop berhenti, karena kondisi salah
```

<br/>

#### 4. for-in loop

- Digunakan untuk mengiterasi elemen dalam List, Set, atau Map tanpa perlu indeks.

```dart
// contoh dengan list
List<String> buah = ['Apel', 'Mangga', 'Jeruk'];
for (String item in buah) {
  print(item);
}
```

```dart
// contoh dengan map
Map<String, int> hargaBuah = {
  'Apel': 5000,
  'Mangga': 7000,
  'Jeruk': 3000
};

for (var entry in hargaBuah.entries) {
  print("${entry.key} harganya ${entry.value} rupiah");
  // output:
  // Apel harganya 5000 rupiah
  // Mangga harganya 7000 rupiah
  // Jeruk harganya 3000 rupiah
}
```

<br/>

#### 5. forEach loop

- Cara modern untuk mengiterasi koleksi menggunakan fungsi lambda. lebih simple dibanding for-in loop.

```dart
// contoh dengan list
List<String> buah = ['Apel', 'Mangga', 'Jeruk'];
buah.forEach((item) {
  print(item);
});
```

```dart
// contoh dengan map
Map<String, int> hargaBuah = {
  'Apel': 5000,
  'Mangga': 7000,
  'Jeruk': 3000 // output:
}
hargaBuah.forEach((key, value) {
  print("${key} harganya ${value} rupiah");
})
```

<br/>

#### 6. Labels

- Label itu seperti **nama/tanda** yang bisa kita kasih ke perulangan (loop). Paling berguna kalau kita punya **loop di dalam loop** (nested loops) dan mau ngontrol alurnya lebih tepat.

<br/>

> Label cuma bisa dipake sama break dan continue

**Kegunaan Label**:

- Bisa milih loop mana yang mau di-stop (break) atau di-skip (continue).
- Biar lebih gampang ngatur loop yang banyak.
- Bikin kode lebih jelas kalau ada banyak loop bersarang.

**Cara Pakai Label**: Tinggal kasih nama + titik dua sebelum loop.

**Contoh Stop Loop Luar dari Dalam (pake break)**

```dart
luar: for(int i=1; i<=3; i++) {       // <-- Label "luar"
  dalam: for(int j=1; j<=3; j++) {    // <-- Label "dalam"
    if(i == 2 && j == 2) {
      break luar;  // Stop loop "luar" sekalian
    }
    print("i:$i, j:$j");
  }
}

/* Output:
i:1, j:1
i:1, j:2
i:1, j:3
i:2, j:1
*/
```

**Contoh Skip ke Loop Luar (pake continue)**

```dart
luar: for(int i=1; i<=3; i++) {
  dalam: for(int j=1; j<=3; j++) {
    if(j == 2) {
      continue luar;  // Langsung ke i berikutnya
    }
    print("i:$i, j:$j");
  }
}

/* Output:
i:1, j:1
i:2, j:1
i:3, j:1
*/
```

**Contoh Break dan Continue dalam Nested Loop**

```dart
outerLoop: for (int i = 1; i <= 3; i++) {
  innerLoop: for (int j = 1; j <= 3; j++) {
    // Contoh penggunaan continue dengan label
    if (i == 2 && j == 1) {
      print("Melewati innerLoop saat i=$i, j=$j");
      continue innerLoop; // Skip iterasi ini di innerLoop
    }

    // Contoh penggunaan break dengan label
    if (i == 3 && j == 2) {
      print("Keluar dari outerLoop saat i=$i, j=$j");
      break outerLoop; // Hentikan seluruh perulangan
    }

    print("i: $i, j: $j");
  }
}

/* Output:
i: 1, j: 1
i: 1, j: 2
i: 1, j: 3
Melewati innerLoop saat i=2, j=1
i: 2, j: 2
i: 2, j: 3
i: 3, j: 1
Keluar dari outerLoop saat i=3, j=2
*/
```
