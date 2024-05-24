---
title: Generic function pada Typescript
description: Belajar generic function typescript
imagePath: https://miro.medium.com/max/1400/1*kIccf4SUwLmavuqDgjYlZA.jpeg
imageAlt: img-ts
date: 2022-12-05 08:00
tags:
  - typescript
---

## Function merge object

tanpa generic:

```ts twoslash
// @errors: 2339
function merge(objA: object, objB: object) {
	return Object.assign({}, objA, objB);
}
const mergeObj = merge({ name: 'ubay' }, { age: 18 });
mergeObj.age;
```

dengan generic:

```ts twoslash
function merge<T, U>(objA: T, objB: U) {
	return Object.assign({}, objA, objB);
}
const mergeObj = merge({ name: 'ubay' }, { age: 18 });
mergeObj.age;
```
