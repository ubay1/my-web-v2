---
layout: ../../../layouts/MarkdownLayout.astro
title: C# Basic
description: Variable, Constant
imagePath: https://miro.medium.com/v2/resize:fit:1400/0*37EBhGL1RVwycOsl.png
imageAlt: img-c#
viewTransitionName: 'c#'
date: 2025-02-04 09:00
icon: 'vscode-icons:file-type-csharp'
tags:
  - c#
---

## Variable

variabel pada c# ada 5 jenis, yaitu: <kbd>int</kbd>, <kbd>double</kbd>, <kbd>char</kbd>, <kbd>string</kbd>, <kbd>bool</kbd>

- int adalah tipe data yang digunakan untuk menyimpan bilangan bulat
- double adalah tipe data yang digunakan untuk menyimpan bilangan desimal
- char adalah tipe data yang digunakan untuk menyimpan karakter, hanya bisa menyimpan satu karakter
- string adalah tipe data yang digunakan untuk menyimpan teks
- bool adalah tipe data yang digunakan untuk menyimpan nilai benar atau salah

```csharp
int tableHeight = 100;
string tableName = "Meja makan";
Console.WriteLine("int -> " + tableHeight); // 100
Console.WriteLine("string -> " +tableName); // Meja makan

tableHeight = 300;
tableName = "Meja dapur";

Console.WriteLine("mengubah nilai pada tipe int -> " + tableHeight); // 300
Console.WriteLine("mengubah nilai pada tipe string -> " + tableName); // Meja dapur
```

<br />

> di C# untuk logging kita gunakan <kbd>Console.WriteLine</kbd>, dan untuk memasukan nilai string kita tidak bisa menggunakan string '', kita hanya bisa menggunakan string ""

## Constant

constant adalah variabel yang nilainya tidak bisa diubah, untuk membuat constant, kita menggunakan kata kunci 'const'

```csharp
const double PI = 3.14;
Console.WriteLine("constant -> "+ PI); // constant -> 3.14
```

## Comments

comment di C# ada 2, bisa gunakan // ataupun /\*\* \*/
