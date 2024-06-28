---
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

kita bisa ke link berikut ini <a href="https://shiki.style" target="_blank">Shikiji</a>

> Transformers hanya menerapkan kelas dan tidak dilengkapi dengan gaya; Anda dapat memberikan aturan CSS Anda sendiri untuk menatanya dengan benar.

beberapa transform yang ada di shikiji:

## transformerNotationDiff

transformer ini seperti yang ada di github/gitlab. kita bisa gunakan **[!code ++] dan [!code --]**

````md
```ts
console.log('hewwo'); // [\!code --]
console.log('hello'); // [\!code ++]
console.log('goodbye');
```
````

hasilnya

````md
```ts
console.log('hewwo'); // [!code --]
console.log('hello'); // [!code ++]
console.log('goodbye');
```
````

## transformerNotationHighlight

Gunakan **[!code highlight]** untuk membuat highlighted line

````md
```ts
console.log('Not highlighted');
console.log('Highlighted'); // [\!code highlight]
console.log('Not highlighted');
```
````

hasilnya

````md
```ts
console.log('Not highlighted');
console.log('Highlighted'); // [!code highlight]
console.log('Not highlighted');
```
````

### menghighlight beberapa baris sekaligus

````md
```ts
console.log('Highlighted'); // [\!code highlight:2]
console.log('Highlighted');
console.log('Not highlighted');
```
````

hasilnya

````md
```ts
console.log('Highlighted'); // [!code highlight:2]
console.log('Highlighted');
console.log('Not highlighted');
```
````

## transformerNotationWordHighlight

````md
```ts
// [\!code word:Hello]
const message = 'Hello World';
console.log(message); // prints Hello World
```
````

hasilnya

````md
```ts
// [!code word:Hello]
const message = 'Hello World';
console.log(message); // prints Hello World
```
````

## transformerNotationFocus

````md
```ts
console.log('Not focused');
console.log('Focused'); // [\!code focus]
console.log('Not focused');
```
````

hasilnya

````md
```ts
console.log('Not focused');
console.log('Focused'); // [!code focus]
console.log('Not focused');
```
````

## transformerNotationErrorLevel

````md
```ts
console.log('No errors or warnings');
console.error('Error'); // [\!code error]
console.warn('Warning'); // [\!code warning]
```
````

hasilnya

````md
```ts
console.log('No errors or warnings');
console.error('Error'); // [!code error]
console.warn('Warning'); // [!code warning]
```
````

## transformerRenderWhitespace

<!-- prettier-ignore -->
```js
function block( ) {
  space( )
		tab( )
}
````

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

```js {1,3-4}
console.log('hello');
console.log('hello');
console.log('hello');
console.log('hello');
```
