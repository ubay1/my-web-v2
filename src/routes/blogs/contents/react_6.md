---
title: React - useEffect (Mounted, Unmounted, watcher usestate)
description:
imagePath: https://wallpapercave.com/wp/wp4924054.jpg
imageAlt: react
date: 2023-11-07 09:00
tags:
  - react
---

# useEffect

useEffect adalah salah satu dari sekian banyak hooks yang disediakan oleh React. Hook ini memungkinkan kita untuk melakukan efek samping (side effects) di dalam komponen React fungsional. Efek samping bisa berupa operasi- operasi seperti pengambilan data dari API, langganan subscriptions, manipulasi DOM secara langsung, atau perubahan-perubahan lain di luar siklus render utama. <br/>

useEffect dijalankan setiap kali komponen dirender (saat mounting) dan setiap kali ada perubahan pada dependency yang didefinisikan (mirip watch pada vue). Pada intinya, useEffect memungkinkan kita untuk menangani hal-hal yang tidak berhubungan langsung dengan rendering tetapi diperlukan dalam suatu komponen, seperti membersihkan sumber daya, memperbarui data, atau berlangganan ke sumber eksternal.<br/>

```tsx title="struktur umum useEffect"
import { useEffect } from 'react';

export default function MyComponent() {
  useEffect(() => {
    // Lakukan sesuatu di sini yang membutuhkan efek samping
    // Contoh: memanggil API, langganan event, manipulasi DOM, dll.

    return () => {
      // Bersihkan efek samping di sini jika diperlukan
      // Contoh: membatalkan langganan, membersihkan sumber daya, dll.
    };

		// jika dependencies kosong, maka biasa digunakan untuk mounted
		// jika dependencies tidak kosong, maka biasa digunakan untuk watching data
  }, [/* dependencies */]);


  return (
    // Render tampilan komponen
  );
}
```

## Mounted

<blockquote>
jika ketika di development fetching data 2x, coba matikan React.StrictMode nya.
</blockquote>

```tsx title="contoh mounted melakukan fetching ke api"
import { useState, useEffect } from 'react';

export default function Mounted() {
	const [userData, setUserData] = useState<any>(null);
	const [error, setError] = useState(null);

	const fetchData = async () => {
		try {
			const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
			if (!response.ok) {
				throw new Error('Failed to fetch user data');
			}
			const data = await response.json();
			setUserData(data);
		} catch (error: any) {
			setError(error.message);
		}
	};

	useEffect(() => {
		fetchData();
	}, []); // [] artinya useEffect hanya dijalankan saat komponen ini pertama kali di-mount

	return (
		<div>
			<h2>User Data:</h2>
			{error ? (
				<p>Error: {error}</p>
			) : (
				userData && (
					<ul>
						<li>Name: {userData.name}</li>
						<li>Email: {userData.email}</li>
						<li>Phone: {userData.phone}</li>
					</ul>
				)
			)}
		</div>
	);
}
```

## Unmounted

berikut adalah beberapa contoh kejadian atau situasi yang mengakibatkan unmounted pada komponen React:

1. Navigasi: Ketika menggunakan routing di React (seperti React Router), komponen yang terkait dengan rute tertentu akan di-mount saat rute tersebut diakses dan di-unmount saat rute tersebut tidak lagi aktif.

2. Hapus Komponen: Jika suatu komponen dihapus atau di-unrender dari hierarki komponen, komponen tersebut di-unmount dari DOM.

3. Pembaruan State: Saat suatu state yang terkait dengan komponen berubah, itu dapat menyebabkan unmounting komponen dan mounting komponen yang baru.

4. Component Lifecycle Events: Saat metode lifecycle tertentu dijalankan dalam siklus hidup komponen (seperti componentWillUnmount pada komponen kelas), itu menandakan bahwa komponen telah di-unmount.

5. Penggunaan Effect Hooks: Pada penggunaan useEffect dalam komponen, fungsi cleanup yang diberikan pada return statement di dalam useEffect akan dijalankan saat komponen di-unmount.

6. Error Handling: Jika terjadi kesalahan (error) selama rendering suatu komponen, React dapat memutuskan untuk me-unmount komponen tersebut untuk menghindari masalah yang lebih besar.

Saat suatu komponen di-unmount, ini berarti bahwa komponen tersebut tidak lagi ada dalam hierarki komponen dan tidak ada lagi di dalam DOM, sehingga efek samping yang terkait dengan komponen tersebut (seperti langganan, event listener, atau penggunaan sumber daya lainnya) harus dibersihkan atau dihapus. Oleh karena itu, cleanup function di dalam useEffect sering digunakan untuk tindakan pembersihan yang diperlukan pada saat unmounting.

```tsx title="contoh unmount"
import React, { useState, useEffect } from 'react';

// Contoh 2: Pembersihan pada unmount dengan event listener
export default function EventListenerComponent() {
	useEffect(() => {
		// Menambahkan event listener pada mounting
		window.addEventListener('resize', handleResize);

		// Membersihkan event listener pada unmounting
		return () => {
			console.log('unmounted');
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const handleResize = () => {
		console.log('Window resized');
	};

	return <p>Event Listener Component</p>;
}
```

## watcher

kalau vue/svelte kan mounted ada sendiri watcher juga ada sendiri. ini kalau react mounted di useEffect, watcher di useEffect. jujur gw lebih nyaman vue/svelte hehe, gpp namanya belajar kan.

```tsx title="watcher usestate"
import { useState, useEffect } from 'react';

export default function Watcher() {
	const [count, setCount] = useState(0);
	const [message, setMessage] = useState('');

	useEffect(() => {
		// Efek ini akan dijalankan saat terjadi perubahan pada count
		if (count > 0) {
			console.log('kerender ketika tekan increment');
			setMessage(`Count value is ${count}`);
		} else {
			console.log('kerender ketika tekan reset');
			setMessage('Count is zero');
		}
	}, [count]); // useEffect akan dijalankan kembali jika count berubah

	return (
		<div>
			<h2>Counter with Effect:</h2>
			<p>{message}</p>
			<p>Count: {count}</p>
			<button onClick={() => setCount(count + 1)}>Increment</button>
			<button onClick={() => setCount(0)}>Reset</button>
		</div>
	);
}
```
