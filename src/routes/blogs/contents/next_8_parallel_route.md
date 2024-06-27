---
title: NEXT - Parallel Route
description: slot (@analytic, @other), default.tsx (untuk fallback jika file page.tsx tidak ada), loading & error UI
imagePath: https://wallpapercave.com/wp/wp11846968.png
imageAlt: next
viewTransitionName: 'next-parallel-route'
date: 2024-06-14 08:00
icon: 'devicon:nextjs'
tags:
  - next
  - react
---

## Parallel Route

dengan parallel route kita dapat merender halaman team & analytic secara bersamaan.
![parallel route - 1](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fparallel-routes.png&w=3840&q=75)

### Slot

Rute paralel dibuat dengan menggunakan slot. Slot didefinisikan dengan konvensi **@folder**. Sebagai contoh, struktur file berikut ini mendefinisikan dua slot: @analytic dan @team:

![parallel route - 2](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fparallel-routes-file-system.png&w=3840&q=75)

Slot diteruskan sebagai props ke parent layout. Untuk contoh di atas, komponen di app/layout.js sekarang menerima props slot @analytic dan @team, dan dapat merendernya secara paralel di samping children props:

```tsx
// @filename: app/layout.tsx

export default function Layout({
	children,
	team,
	analytic
}: {
	children: React.ReactNode;
	analytic: React.ReactNode;
	team: React.ReactNode;
}) {
	return (
		<>
			{children}
			{team}
			{analytic}
		</>
	);
}
```

Perlu diketahui, slot bukanlah segment rute dan tidak memengaruhi struktur URL. Misalnya, untuk **/@analytic/views**, URL-nya akan menjadi **/views** karena **@analytic adalah sebuah slot**.

## default.tsx

kita dapat menentukan file **default.js** untuk dirender sebagai fallback untuk slot yang tidak sesuai selama pemuatan awal atau pemuatan ulang halaman penuh.

jadi misal di folder **@analytic** tidak memiliki file **page.tsx**, namun di layout.tsx kita pasang.

lihat gambar dibawah ini.

![parallel route - 3](/parallel-routes1.png)

maka jika kita akses ke **/dashboard** itu akan menampilkan halaman 404. jika kita tetap ingin menampilkan dashboardnya dengan isi konten misal **dashboard analytic tidak ditemukan** kita bisa gunakan **default.tsx**.

berikut codenya:

```tsx
// @filename: app/dashboard/@analytic/default.tsx

export default function Page() {
	return (
		<div className="shadow-xl bg-red-400 text-black p-10 rounded-md flex items-center justify-center">
			dashboard analytic tidak ditemukan
		</div>
	);
}
```

hasilnya:
![parallel route - 4](/parallel-routes2.png)

dan **default.tsx** ini juga tampil misal saat kita melakukan fetching data di dashboard analytic dan terjadi error lalu error itu kita lempar dengan

```md
throw new Error('Gagal memuat dashboard anlytic')
```

maka yang akan tampil adalah content yang ada di file **default.tsx**, walaupun di dalam folder tsb ada file **error.tsx**

## Loading & Error UI

![parallel-routes5](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fparallel-routes-cinematic-universe.png&w=3840&q=75)

dengan parallel routes ini sangat membantu kita untuk mengetahui error yang terjadi.

sebagi contoh misal terjadi kesalahan saat load data di **slot @analytic**.

kita bisa menambahkan file **error.tsx** di dalam folder **@analytic**. yang berisi.

```tsx
// @filename: app/dashboard/@analytic/error.tsx

export default function Error({
	error,
	reset
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<div className="shadow-xl p-10 rounded-md bg-base-100 flex flex-col items-center justify-center">
			<div className="text-xl">{error.message}</div>
			<button className="mt-4 btn btn-secondary" onClick={() => reset()}>
				Coba lagi
			</button>
		</div>
	);
}
```

hasilnya seperti ini
![parallel route - 5](/parallel-routes3.png)
