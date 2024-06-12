---
title: NEXT - Dynamic Route, Catch-all Segments, Optional Catch-all Segments
description: Dynamic route, Catch-all Segments, Optional Catch-all Segments
imagePath: https://wallpapercave.com/wp/wp11846968.png
imageAlt: next
viewTransitionName: 'next-route-group'
date: 2024-06-14 07:00
icon: 'devicon:nextjs'
tags:
  - next
  - react
---

## Dynamic route

kita bisa membuat folder seperti ini **[slug]**.

contoh:

```tsx
// @filename: app/blog/[slug]/page.tsx
// @noErrors
export default function Page({ params }: { params: { slug: string } }) {
	return <div>My Post: {params.slug}</div>;
}
```

kita bisa mengaksesnya **/blog/a**

## Catch-all Segments

kita bisa membuat folder seperti ini **[...slug]**

contoh:

```tsx
// @filename: app/blog/[...slug]/page.tsx
// @noErrors
export default function Page({ params }: { params: { slug: string } }) {
	return <div>My Post: {params.slug}</div>;
}
```

jika kita mengakses misal **/shop/a/b/c**, maka paramsnya akan seperti ini

```md
{ slug: ['a', 'b', 'c'] }
```

## Optional Catch-all Segments

jika dengan **Catch all Segments**, kita tidak bisa mengakses seperti ini saja **/shop**. ini akan menyebebkan error not-found. jika kita menemukan kasus dimana kita ingin masih bisa akses tanpa menyertakan params kita bisa gunakan **Optional Catch-all Segments**. kita cukup membungkus nya seperti ini
**[[...slug]]**
