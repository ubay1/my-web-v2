---
title: Python - Syntax
description:
imagePath: https://cdn.hashnode.com/res/hashnode/image/upload/v1584284080124/WSg9hzPr-.jpeg
imageAlt: python
viewTransitionName: 'python-syntax'
date: 2023-12-01 09:00
tags:
  - python
---

# Syntax

1.  python tidak membutuhkan semicolon (;) seperti java / C#, python menggunakan <b>whitespace dan indentation </b> mirip seperti yml

```python title="contoh indentitation"
def main():
  print('ini function')

main()
```

2. python menggunakan karakter backslash ('\') untuk melanjutkan pernyataan di baris kedua:

```python title="contoh penggunaan backslash"
a = True
b = False
c = True
if (a == True) and (b == False) and \
 (c == True):
print("Continuation of statements")
```

3. keyword dalam python

```python title="list keyword"
import keyword
print(keyword.kwlist)

# result

# False class finally is return

# None continue for lambda try

# True def from nonlocal while

# and del global not with

# as elif if or yield

# assert else import pass

# break except in raise

```

4. string literals

Python menggunakan tanda kutip tunggal ('), tanda kutip ganda ("), tanda kutip tunggal tiga kali lipat ('''), dan tanda kutip tiga kali lipat (""") untuk menyatakan literal string. \n

Literal string harus dikelilingi dengan jenis tanda kutip yang sama. Misalnya, jika kita menggunakan tanda kutip tunggal untuk memulai literal string, kita harus menggunakan tanda kutip tunggal yang sama untuk mengakhirinya.

untuk membuat string multiple line kita bisa gunakan (""") atau (''')

```python title="string literal"
s1 = 'string literal = This is a string'
print(s1)
s2 = "string literal = Another string using double quotes"
print(s2)
s3 = """string literal = string can span
multiple line"""
print(s3)
```
