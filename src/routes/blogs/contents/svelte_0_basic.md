---
title: Svelte Basic (data, props)
description:
imagePath: https://i.pinimg.com/originals/d2/e8/34/d2e8346922934ea035cf7c5a8b477ad8.jpg
imageAlt: svelte
date: 2023-10-01 09:00
tags:
  - svelte
---

## State

Kalau di react menggunakan useState kalau di vue 3 menggunakan ref/reactive.
tapi di svelte untuk akses state sama seperti mengakses variabel pada JS. contohnya dibawah ini:

```svelte title="state"
<script lang="ts">
	let a: string | null = 'akoh';
</script>

<div class="text-white p-4">
	<div class="font-bold text-3xl underline mb-2">State</div>
	<div>state a = <b>{a}</b></div>
	<button class="btn-primary" on:click={() => (a = 'kamoh')}>ganti ke kamoh</button>
</div>
```

## Tag @html

```svelte title="tag @html"
<script lang="ts">
	let tagHtml: string | null =
		'<div class="text-orange-5 font-bold"> menampilkan tag @html dari string </div>';
</script>

<div>
	{@html tagHtml}
</div>
```
