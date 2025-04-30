---
layout: ../../../layouts/MarkdownLayout.astro
title: Dart - OOP (Bagian 2)
description: abstract class, interface, multiple interface, mixin, multiple mixin, mixin dengan constraints (on), encapsulation, encapsulation (getter & setter), static members, polymorphism
imagePath: https://swansoftwaresolutions.com/wp-content/uploads/2020/02/08.20.20-What-is-Dart-and-how-is-it-used-1.jpg
imageAlt: img-dart
viewTransitionName: 'dart'
date: 2025-04-29 11:00
icon: 'logos:dart'
tags:
  - dart
  - flutter
---

#### 4. Abstract Class

Abstract class adalah class yang tidak dapat diinstansiasi langsung (tidak bisa dibuat objeknya secara langsung), tetapi hanya dapat diwariskan oleh class lain. Abstract class digunakan untuk mendefinisikan kontrak atau struktur umum untuk class anak.

**Kapan Menggunakan Abstract Class?**

- Ketika ingin mendefinisikan kontrak umum untuk class anak
- Ketika ingin membuat class yang tidak dapat diinstansiasi langsung
- Ketika ingin membuat class yang dapat diwariskan oleh class anak
- Ketika ingin membuat class yang dapat diwariskan oleh class anak dengan beberapa method yang sama

```dart
abstract class AbstractClass {
  String nama;
  int umur;

  AbstractClass(this.nama, this.umur);

  void greet() {
    print("hi aku $nama, dan umurku $umur");
  }
}
class ChildAbstractClass extends AbstractClass {
  ChildAbstractClass(String nama, int umur) : super(nama, umur);
  @override
  void greet() {
    super.greet();
  }
}

void main() {
  /**
    * jika kita mencoba membuat object dari abstract class maka akan terjadi error.
    * error: Cannot instantiate the abstract class 'AbstractClass'.
    * You can instantiate an instance of 'AbstractClassChild' instead.
   */
  var abstractClass = AbstractClass("budi", 20);

  var abstractClass = ChildAbstractClass('Johni', 24);
  abstractClass.nama = 'Johno';
  abstractClass.umur = 20;
  abstractClass.greet();
  // Output: hi aku Johno, dan umurku 20
}
```

<br />

##### 5. Interface

Dart menggunakan **abstract class** untuk mendefinisikan kontrak interface. Setiap class bisa berperan sebagai interface menggunakan kata kunci implements.

**Konsep Interface di Dart**

- Semua class secara implisit adalah interface (bisa di-implements).
- Biasanya menggunakan abstract class untuk mendefinisikan kontrak murni (tanpa implementasi).
- **Wajib mengimplementasikan semua method/properti** yang ada di interface.
- Mendukung **multiple inheritance** (berbeda dengan extends yang hanya single inheritance).

```dart
abstract class Interface1 {
  late String nama;
  void method1();
}

class ClassInterface implements interface1 {
  // jika properti tidak ditambahkan maka akan terjadi error
  String nama;

  ClassInterface(this.nama);

  // jika method tidak ditambahkan maka akan terjadi error
  @override
  void method1() {
    print("hallo aku adalah method1 dari interface dan aku bernama $nama")
  }
}

void main() {
  var classInterface = ClassInterface("Jinnyy");
  classInterface.method1();
}
```

<br />

**Multiple interface**

```dart
abstract class Interface1 {
  late String nama;
  void method1();
}
abstract class Interface2 {
  int? umur;
  void method2();
}

class ClassInterface implements interface1, inteface2 {
  String nama;
  int? umur;

  ClassInterface(this.nama, [this.umur = 0]);

  @override
  void method1() {
    print("hallo aku adalah method1 dari interface dan aku bernama $nama")
  }
  @override
  void method2() {
    print(
      "hallo aku adalah method2 dari interface dan aku berumur $umur tahun",
    );
  }
}

void main() {
  var classInterface = ClassInterface("Jinnyy");
  classInterface.method1();
  classInterface.method2();
}
```

<br />

##### 6. Mixin

Mixin adalah cara untuk menggunakan kembali kode di berbagai hierarki class tanpa menggunakan inheritance tradisional. Berbeda dengan extends (single inheritance) dan implements (wajib implementasi ulang), mixin memungkinkan kita menyuntikkan fungsionalitas ke dalam class dengan cara yang fleksibel.

**Konsep Mixin**

- Bukan class dan bukan interface, tapi berisi method/properti yang bisa dipakai class lain.
- Mendukung multiple mixins (bisa pakai banyak mixin dalam satu class).
- Tidak bisa diinstansiasi langsung (seperti abstract class).
- Menggunakan kata kunci `with` untuk menggabungkannya ke sebuah class.

```dart
mixin Mixin1 {
  String? nama;
  void method1() {
    print("hallo aku adalah method1 dari mixin1, dan namaku $nama");
  }
}

class ClassMixin with Mixin1{}

void main() {
  var classMixin = ClassMixin();
  classMixin.nama = "Jinnyy";
  classMixin.method1();
  // Output: hallo aku adalah method1 dari mixin1, dan namaku Jinnyy
}
```

<br />

**Multiple Mixin**

```dart
mixin Mixin1 {
  String? nama;
  void method1() {
    print("hallo aku adalah method1 dari mixin1, dan namaku $nama");
  }
}
mixin Mixin2 {
  int? umur;
  void method2() {
    print("hallo aku adalah method1 dari mixin2, dan umurku $umur tahun");
  }
}

class ClassMixin with Mixin1, Mixin2{}

void main() {
  var classMixin = ClassMixin();
  classMixin.nama = "Jinnyy";
  classMixin.umur = 30;
  classMixin.method1();
  // Output: hallo aku adalah method1 dari mixin1, dan namaku Jinnyy
  classMixin.method2();
  // Output: hallo aku adalah method1 dari mixin2, dan umurku 30 tahun
}
```

<br />

**Mixin dengan Constraints (Menggunakan on)** Jika sebuah mixin hanya boleh digunakan oleh class tertentu, gunakan on.

```dart
abstract class Kendaraan {}

mixin Mesin on Kendaraan {
  String? brand;
  void nyalakanMesin() {
    print("mesin $brand dinyalakan");
  }
}

class ClassMixinConstraint extends Kendaraan with Mesin {
  String? brand;
  ClassMixinConstraint({this.brand = 'no brand'});
}

void main() {
  ClassMixinConstraint(brand: 'Toyota').nyalakanMesin();
  // Output: mesin Toyota dinyalakan
}
```

<br />

##### 7. Encapsulation

Encapsulation adalah salah satu konsep dasar OOP (Object-Oriented Programming) yang bertujuan untuk:

- Menyembunyikan detail implementasi dari luar class.
- Mengontrol akses ke data (properti/method) dalam class.
- Mencegah modifikasi data yang tidak sah.

Di Dart, encapsulation dilakukan menggunakan access modifiers **\_** (underscore) untuk membuat member bersifat **private**.

**Menggunakan Getter & Setter**

```dart
// file:main.dart

class Encapsulation {
  // tidak akan tampil di file test.dart
  String? _nama;

  Encapsulation([this._nama]);

  // tidak akan tampil di file test.dart
  void _greet(String message) {
    print("hallo aku $message");
  }

  // setter untuk mengubah nilai private property _nama
  set setNama(String newNama) => _nama = newNama;
  // getter untuk mengakses nilai private property _nama
  String? get getNama => _nama;
  void get getGreet => _greet(_nama ?? 'null');
}


// file: test.dart
import 'main.dart';

void main() {
  var test = Encapsulation();
  test.setNama = "idih john";
  test.getGreet;
  // Output: hallo aku idih john
}
```

<br />

##### 8. Static Members

Static members adalah properti atau method yang dimiliki oleh class itu sendiri, bukan oleh instance (objek) dari class. Mereka bisa diakses langsung melalui nama class tanpa harus membuat objek. tidak bisa menggunakan constructor.

**Konsep Static di Dart**

- Static Property (Variabel statik):
  - Nilainya sama untuk semua instance.
  - Berguna untuk menyimpan data yang dibagi antar-objek.
- Static Method (Method statik):
  - Bisa dipanggil tanpa membuat objek.
  - Tidak bisa mengakses this (karena tidak terikat ke instance).

**Kapan Menggunakan Static?**

- Konfigurasi Awal (contoh: koneksi database, API base URL).
- Singleton Pattern (memastikan hanya ada 1 instance class).
- Load Resource Sekali (contoh: caching data statik).

```dart
class StaticProperty {
  static String? _nama = 'Anonymous';
  static void setName(String newNama) => _nama = newNama;
  static void getNama() => print("Hallo namaku $_nama");
}
void main() {
  StaticProperty.setName("idih john");
  StaticProperty.getNama();
  // Output: Hallo namaku idih john
}
```

<br />

##### 9. Polymorphism

Polymorphism adalah memungkinkan objek dari berbagai class untuk merespons method yang sama dengan **cara yang berbeda**.

**Analogi Sederhana Perbedaan Inheritance & Polymorphism**

- Inheritance = Anak mewarisi sifat orang tua (misal: warna mata).
- Polymorphism = Anak bisa merespon hal yang sama dengan cara berbeda (misal: saat disuruh "berbicara", anak menjawab "Mom!" sedangkan orang tua menjawab "Yes?").

**Contoh lain**

Misal binatang, binatang memiliki suara yang berbeda-beda. contohnya seperti dibawah ini.

```dart
// parent class
class Animal {
  void sound() => print("suara binatang berbeda-beda");
}

// Inheritance
class Cat extends Animal {
  @override
  void sound() => print("Meow!"); // ini Polymorphism, method sama tapi suara berbeda
}
class Dog extends Animal {
  @override
  void sound() => print("Guk Guk!"); // ini Polymorphism, method sama tapi suara berbeda
}
```
