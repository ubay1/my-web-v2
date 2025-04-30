---
layout: ../../../layouts/MarkdownLayout.astro
title: Dart - OOP (Bagian 1)
description: class & object, constructor, shortcut constructor, named constructor, constructor dengan parameter opsional, inheritance
imagePath: https://swansoftwaresolutions.com/wp-content/uploads/2020/02/08.20.20-What-is-Dart-and-how-is-it-used-1.jpg
imageAlt: img-dart
viewTransitionName: 'dart'
date: 2025-04-29 09:00
icon: 'logos:dart'
tags:
  - dart
  - flutter
---

## OOP (Object Oriented Programming)

Dart adalah bahasa pemrograman berorientasi objek yang mendukung semua konsep OOP utama. Berikut penjelasan lengkap dengan contoh praktis:

##### 1. Class & Object

Class adalah blueprint untuk membuat object.

> Blueprint adalah cetakan atau rancangan awal untuk membuat objek. Dalam OOP, class adalah blueprint yang mendefinisikan properti (data) dan method (perilaku) yang akan dimiliki oleh objek. Objek dibuat berdasarkan blueprint ini.

<br />

```dart
void main(){
  // membuat object dari class Mobil
  var mobil1 = Mobil();
  mobil1.brand = "Tesla";
  print(mobil1.brand); // Output: "Tesla"
  mobil1.klakson(); // Output: "tin tin
}

class Mobile {
  /** property (variabel dalam class)
    * property tidak bisa jika tanpa nilai,
      jika ingin tanpa nilai maka harus dibuat null-safe.
      atau bisa juga gunakan late String brand.
      namun jika gunakan late maka variabel wajib diisi.
   */
  String? brand;

  // method (fungsi dalam class)
  void klakson() {
    print("tin tin");
  }
}
```

<br />

##### 2. Constructor

Constructor adalah method khusus yang otomatis dipanggil saat pembuatan objek (instance) dari sebuah class. Fungsinya untuk menginisialisasi nilai awal dari properti class.

**Kapan Menggunakan Constructor?**

- Saat ingin mengatur nilai awal properti class
- Untuk validasi data sebelum objek dibuat
- Saat perlu beberapa cara inisialisasi (named constructor)
- Untuk pembuatan objek dengan logika khusus (factory)

**a. Constrictor dasar**

```dart
class Mobil {
  String merk;
  int tahun;

  // Constructor
  Mobil(String merk, int tahun) {
    this.merk = merk;
    this.tahun = tahun;
  }
}

void main() {
  var mobilSaya = Mobil('Toyota', 2020);
  print('${mobilSaya.merk} - ${mobilSaya.tahun}'); // Output: Toyota - 2020
}
```

**b. Shortcut Constructor (Recommended)**

```dart
class Mobil {
  String merk;
  int tahun;

  // Constructor pendek
  Mobil(this.merk, this.tahun);
}
void main() {
  var mobilSaya = Mobil('Toyota', 2020);
  print('${mobilSaya.merk} - ${mobilSaya.tahun}'); // Output: Toyota - 2020
}
```

**c. Named Constructor**

- Named constructor adalah constructor yang dapat diberi nama. Fungsinya untuk memberikan nama yang lebih deskriptif pada constructor.

```dart
class Mobil {
  String merk;
  int tahun;
  int? berat;
  // Constructor utama
  Mobil(this.merk, this.tahun, [this.berat = 0 ]);
  // Named Constructor
  Mobil.berat(this.merk, this.tahun, this.berat);
}
void main() {
  var mobilSaya = Mobil('Toyota', 2020);
  print('${mobilSaya.merk}: tahun ${mobilSaya.tahun}, berat ${mobilSaya.berat}kg');
  // Output: Toyota: tahun 2020, berat 0kg

  var mobilBerat = Mobil.berat('Honda', 2019, 100);
  print(
    "${namedConstructorBerat.merk}: tahun ${namedConstructorBerat.tahun}, berat ${namedConstructorBerat.berat}kg",
  );
  // Output: Honda: tahun 2019, berat 100kg
}
```

**d. Constructor dengan Parameter Opsional**

- Menggunakan {} (named parameter)

```dart
class OptionalParameterWithNamed {
  String name;
  int age;

  /**
    * required: wajib diisi
    * age = 0: nilai default karena optional
   */
  OptionalParameterWithNamed({required this.name, this.age = 0});

  void greet() {
    print("hi aku $name, dan umurku $age");
  }
}

void main() {
  var optionalParameterWithNamed = OptionalParameterWithNamed(name: "budi");
  optionalParameterWithNamed.greet();
  // Output: hi aku budi, dan umurku 0
}
```

<br />

- Menggunakan [] (positional parameter)

```dart
class OptionalParameterWithPositional {
  String name;
  int age;

  OptionalParameterWithPositional(this.name, [this.age = 0]);

  void greet() {
    print("hi aku $name, dan umurku $age");
  }
}
void main() {
  var optionalParameterWithPositional = OptionalParameterWithPositional("budi");
  optionalParameterWithPositional.greet();
  // Output: hi aku budi, dan umurku 0
}
```

<br />

##### 3. Inheritance (Pewarisan)

Pewarisan adalah konsep dasar dalam pemrograman berorientasi objek (OOP) yang memungkinkan sebuah class mewarisi properti dan method dari class lain. Di Dart, kita bisa mengimplementasikan pewarisan menggunakan kata kunci **extends**.

**Konsep Penting dalam Inheritance (Pewarisan)**

- Superclass (Class Induk): Class yang diwariskan
- Subclass (Class Anak): Class yang mewarisi
- **super**: Kata kunci untuk mengakses class induk
- **@override**: Anotasi untuk menandai method yang dioverride

**Catatan**

- Dart hanya mendukung single inheritance (sebuah class hanya bisa mewarisi dari satu class induk)
- Untuk kebutuhan multiple inheritance, Dart menyediakan **mixin**

```dart
class InheritParent {
  String nama;
  int umur;
  InheritParent(this.nama, this.umur);
  void greet() {
    print("hi aku $nama, dan umurku $umur");
  }
}

class InheritChild extends InheritParent {
  InheritChild(String nama, int umur) : super(nama, umur);
  @override
  void greet() {
    super.greet();
  }
}

void main() {
  var inheritChild = InheritChild("budi", 20);
  inheritChild.greet();
  // Output: hi aku budi, dan umurku 20
}
```
