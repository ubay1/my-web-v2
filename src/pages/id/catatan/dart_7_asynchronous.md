---
layout: ../../../layouts/MarkdownLayout.astro
title: Dart - Asynchronous
description: future, future.wait, async await
imagePath: https://swansoftwaresolutions.com/wp-content/uploads/2020/02/08.20.20-What-is-Dart-and-how-is-it-used-1.jpg
imageAlt: img-dart
viewTransitionName: 'dart'
date: 2025-04-30 11:00
icon: 'logos:dart'
tags:
  - dart
  - flutter
---

## Asynchronous

asynchronous di dart mirip dengan javascript, dart menggunakan **Future**, dan **async await**. **Future** ini mirip **promise** di javascript.

#### 1. Future: Single Async Operation

```dart
Future<String> fetchUsername() {
  return Future.delayed(Duration(seconds: 2), () => 'John doe');
}
void main() async {
  print('Mulai');
  fetchUsername()
      .then((value) => print(value))
      .catchError((error) => print(error));
  print('Selesai');
  /** Output:
   * Mulai
   * Selesai
   * John doe
   */
}
```

<br />

#### 2. Future handling error

di future kita bisa gunakan **Future.error(message);** untuk mengembalikan error.

```dart
Future<String> fetchUsername() {
  return Future.error('Terjadi kesalahan');
}
void main() async {
  print('Mulai');
  fetchUsername()
      .then((value) => print(value))
      .catchError((error) => print(error));
  print('Selesai');
  /** Output:
   * Mulai
   * Selesai
   * John doe
   */
}
```

<br />

#### 3. Async Await

Dart menyediakan async dan await untuk menulis kode asynchronous seolah-olah synchronous.

```dart
// main.dart
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'interface.dart';

Future<dynamic> fetchData() async {
  try {
    final response = await http.get(
      Uri.parse('https://jsonplaceholder.typicode.com/users'),
    );
    if (response.statusCode != 200) {
      throw Exception('Terjadi kesalahan');
    } else {
      return response.body;
    }
  } catch (e) {
    print('error $e');
  }
}

void main() {
  print('memuat data ...');
  var data = await fetchData();
  if (data != null) {
    final IResponseUser jsonData = IResponseUser.fromJson(jsonDecode(data));
    for (var element in jsonData.data) {
      print(element.phone);
    }
  } else {
    print('No data received');
  }
}

// interface.dart
class IResponseUser {
  final List<UserData> data;

  IResponseUser({required this.data});

  // Factory constructor to create from Map/JSON
  factory IResponseUser.fromJson(List<dynamic> json) {
    List<UserData> userList =
        json.map((item) => UserData.fromJson(item)).toList();
    return IResponseUser(data: userList);
  }

  // Convert to Map/JSON
  List<Map<String, dynamic>> toJson() {
    return data.map((user) => user.toJson()).toList();
  }
}

class UserData {
  final int id;
  final String name;
  final String email;
  final String phone;

  UserData({
    required this.id,
    required this.name,
    required this.email,
    required this.phone,
  });

  factory UserData.fromJson(Map<String, dynamic> json) {
    return UserData(
      id: json['id'] as int,
      name: json['name'] as String,
      email: json['email'] as String,
      phone: json['phone'] as String,
    );
  }

  Map<String, dynamic> toJson() {
    return {'id': id, 'name': name, 'email': email, 'phone': phone};
  }
}
```

<br />

#### 4. Future.wait

menjalankan beberapa Future sekaligus, mirip seperti **Promise.all** di javascript.

```dart
Future<void> fetchMultiple() async {
  await Future.wait([
    fetchUser(),
    fetchPosts(),
  ]);
}
```
