---
title: Svelte Advance - Context Module
description:
imagePath: https://i.pinimg.com/originals/d2/e8/34/d2e8346922934ea035cf7c5a8b477ad8.jpg
imageAlt: svelte
date: 2023-10-10 09:00
tags:
  - svelte
---

"context module" sebenarnya mengacu pada penggunaan konteks modul di file .svelte untuk berbagi variabel, fungsi, atau logika lainnya antara berbagai komponen atau modul. <br>

kita dapat menggunakan blok script "context module" untuk menentukan variabel, fungsi, atau logika lainnya yang akan dibagikan di antara berbagai komponen yang mengimpor modul ini.

```svelte
<script context="module">
...
</script>
```

pada script "context module" Kode yang ada di dalamnya akan dijalankan sekali ketika modul pertama kali dievaluasi, bukan ketika sebuah komponen diinstansiasi. <br>

<blockquote>
perlu diketahui, bahwa variable didalam context="module" ini tidak reactive.
</blockquote>

pada contoh kali ini, kita menampilkan 2 buah audio. dimana audio tersebut hanya bisa memutar 1 audio saja. berikut contohnya.

```svelte title="App.svelte" {1,4}
<script>
	import AudioPlayer, { stopAll } from './AudioPlayer.svelte';
</script>

<button on:click={stopAll}> stop all audio </button>

<AudioPlayer
	src="https://sveltejs.github.io/assets/music/strauss.mp3"
	title="The Blue Danube Waltz"
/>

<AudioPlayer
	src="https://sveltejs.github.io/assets/music/holst.mp3"
	title="Mars, the Bringer of War"
/>
```

kita lihat kode diatas yang terblok, fungsi stopAll adalah milik dari context module, dimana fungsi itu akan melakukan loop dan menstop semua audio yang menyala. <br>

saat kita memanggil dan menampilkan komponen AudioPlayer.svelte di file App.svelte, maka kita akan menjalankan kode yang ada di <kbd>onMount</kbd> untuk menyimpan data audio ke variable elements context module. <br>

lalu saat kita klik play audio kita akan melakukan pengecekan, jik element dan audio berbeda maka lakukan stop pada audio.

```svelte title="AudioPlayer.svelte"
<script context="module">
	const elements = new Set();

	export function stopAll() {
		elements.forEach((element) => {
			element.pause();
		});
	}
</script>

<script>
	import { onMount } from 'svelte';

	export let src;
	export let title;

	let audio;
	let paused = true;

	onMount(() => {
		elements.add(audio);
	});

	function stopOthers() {
		elements.forEach((element) => {
			if (element !== audio) {
				element.pause();
			}
		});
	}
</script>

<article class:playing={!paused}>
	<h2>{title}</h2>
	<audio {src} bind:this={audio} bind:paused on:play={stopOthers} controls />
</article>

<style>
	h2 {
		margin: 0 0 0.3em 0;
	}
	audio {
		width: 100%;
	}
	.playing {
		color: #ff3e00;
	}
</style>
```

dengan adanya context module ini, kita bisa melakukan sharing kepada komponen yang menggunakan context yang sama.

<blockquote>
	check contohnya disini:
	<a href="https://svelte.dev/repl/92afadeb8b284f5dabd3c174e297be01?version=4.2.8" target="_blank">context modules</a>
</blockquote>
