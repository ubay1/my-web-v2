---
title: Python - String
description:
imagePath: https://cdn.hashnode.com/res/hashnode/image/upload/v1584284080124/WSg9hzPr-.jpeg
imageAlt: react
date: 2023-12-02 09:00
tags:
  - python
---

# String

string adalah serangkaian karakter. Dalam Python, apa pun yang berada di dalam tanda kutip adalah sebuah string. Dan kita dapat menggunakan tanda kutip tunggal atau ganda.

```python
str1 = 'This is a string in Python'
str2 = "This is also a string"
```

1. jika string berisi tanda kutip tunggal, kita harus menempatkannya dalam tanda kutip ganda seperti ini:

```python
str3 = "It's a string"
```

2. jika string berisi tanda kutip ganda, kita dapat menggunakan tanda kutip tunggal

```python
str4 = '"Beautiful is better than ugly.". Said Tim Peters'
```

3. Jika string berisi tanda kutip tunggal, dan kita pun menempatkannya dalam tanda kutip tunggal juga, maka kita bisa gunakan backslash seperti ini:

```python
str5 = 'It\'s also a valid string'
```

4. Penerjemah Python akan memperlakukan karakter backslash (\) sebagai karakter khusus. Jika kita tidak menginginkannya, kita dapat menggunakan string mentah dengan menambahkan huruf r sebelum tanda kutip pertama.

```python
str6 = r'C:\python\bin'
```

### menggabungkan string dengan huruf f sebelum string

contoh ini kalau di JS seperti template literal `hello, ${nama_variabel}`

```python
str7 = f'hallo, {str5}'
```

### menggabungkan 2 string pada 1 variabel

```python
str8 = 'Good ' 'Morning!'
```

### menggabungkan 2 variabel dengan opeartor '+'

```python
str9 = 'Good'
str10 = 'Night'
merge_two_variabel = str9+' '+str10+'!'
```

### mengakses element string sesuai indexnya

```python
# +---+---+---+---+---+---+---+---+---+---+---+---+---+
# | P | y | t | h | o | n | | S | t | r | i | n | g |
# +---+---+---+---+---+---+---+---+---+---+---+---+---+
  # 0   1   2   3   4   5   6  7  8   9  10  11  12
# -13  -12 -11 -10 -9  -8  -7 -6 -5  -4  -3  -2  -1

char_1 = merge_two_variabel[0]
```

### menghitung panjang string dengan len()

```python
test_len = len(merge_two_variabel)
```

### slicing string dengan `[start:end]`

```python
test_slice = merge_two_variabel[0:11]
```
