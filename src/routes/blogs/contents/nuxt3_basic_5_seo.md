---
title: NUXT 3 basic - seo & meta (useHead)
description:
imagePath: https://nuxt.com/assets/design-kit/logo/icon-green.png
imageAlt: nuxt3
date: 2023-05-27 05:00:00
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
