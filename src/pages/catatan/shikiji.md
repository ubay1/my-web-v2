---
layout: ../../layouts/MarkdownLayout.astro
title: Shikiji
description: syntax highlighter
imagePath: https://www.markdownguide.org/assets/images/markdown-guide-og.jpg
imageAlt: next
viewTransitionName: 'shikiji'
date: 2024-07-01 08:00
icon: 'skill-icons:markdown-light'
tags:
  - markdown
---

Dokumentasi lengkap ada <a href="https://shiki.style" class="underline" target="_blank">disini</a>

> Transformers hanya menerapkan kelas dan tidak dilengkapi dengan gaya; Anda dapat memberikan aturan CSS Anda sendiri untuk menatanya dengan benar.

beberapa transform yang ada di shikiji:

## transformerNotationDiff

transformer ini seperti yang ada di github/gitlab. kita bisa gunakan **[!code ++] dan [!code --]**

```ts
console.log('hewwo'); // [\!code --]
console.log('hello'); // [\!code ++]
console.log('goodbye');
```


hasilnya

```ts
console.log('hewwo'); // [!code --]
console.log('hello'); // [!code ++]
console.log('goodbye');
```


## transformerNotationHighlight

Gunakan **[!code highlight]** untuk membuat highlighted line

```ts
console.log('Not highlighted');
console.log('Highlighted'); // [\!code highlight]
console.log('Not highlighted');
```


hasilnya

```ts
console.log('Not highlighted');
console.log('Highlighted'); // [!code highlight]
console.log('Not highlighted');
```


### menghighlight beberapa baris sekaligus

```ts
console.log('Highlighted'); // [\!code highlight:2]
console.log('Highlighted');
console.log('Not highlighted');
```


hasilnya

```ts
console.log('Highlighted'); // [!code highlight:2]
console.log('Highlighted');
console.log('Not highlighted');
```


## transformerNotationWordHighlight

```ts
// [\!code word:Hello]
const message = 'Hello World';
console.log(message); // prints Hello World
```


hasilnya

```ts
// [!code word:Hello]
const message = 'Hello World';
console.log(message); // prints Hello World
```


## transformerNotationFocus

```ts
console.log('Not focused');
console.log('Focused'); // [\!code focus]
console.log('Not focused');
```


hasilnya

```ts
console.log('Not focused');
console.log('Focused'); // [!code focus]
console.log('Not focused');
```


## transformerNotationErrorLevel

```ts
console.log('No errors or warnings');
console.error('Error'); // [\!code error]
console.warn('Warning'); // [\!code warning]
```


hasilnya

```ts
console.log('No errors or warnings');
console.error('Error'); // [!code error]
console.warn('Warning'); // [!code warning]
```


## transformerRenderWhitespace

<!-- prettier-ignore -->
```js
function block( ) {
  space( )
		tab( )
}
```

Tambahkan code css berikut ini untuk melihat hasilnya

```css
code .tab,
code .space {
	position: relative;
}

code .tab::before {
	content: '⇥';
	position: absolute;
	opacity: 0.3;
}

code .space::before {
	content: '·';
	position: absolute;
	opacity: 0.3;
}
```

## transformerMetaHighlight

````md
```js {1,3-4}
console.log('1')
console.log('2')
console.log('3')
console.log('4')
```
````


hasilnya

```js {1,3-4}
console.log('1')
console.log('2')
console.log('3')
console.log('4')
```

## transformerMetaWordHighlight

````md
```js /Hello/
const msg = 'Hello World'
console.log(msg)
console.log(msg) // prints Hello World
```
````

Renders (with custom CSS rules):

```js /Hello/
const msg = 'Hello World'
console.log(msg) // prints Hello World
```