---
title: NUXT 3 basic - seo & meta (useHead)
description:
imagePath: https://img-c.udemycdn.com/course/750x422/4395942_c476_2.jpg
imageAlt: nuxt3
viewTransitionName: 'nuxt3-seo'
date: 2023-05-27 05:00
tags:
  - nuxt3
  - vue
---

## useHead

contoh menggunakan useHead:

```vue
<script setup lang="ts">
useHead({
	title: 'My App',
	meta: [{ name: 'description', content: 'My amazing site.' }],
	bodyAttrs: {
		class: 'test'
	},
	script: [{ innerHTML: "console.log('Hello world')" }]
});
</script>
```
