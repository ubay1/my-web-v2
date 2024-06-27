---
title: NEXT - Server Actions
description:
imagePath: https://wallpapercave.com/wp/wp11846968.png
imageAlt: next
viewTransitionName: 'next-server-actions'
date: 2024-06-17 08:00
icon: 'devicon:nextjs'
tags:
  - next
  - react
---

## Server Actions

> Server Actions adalah kita melakukan mutasi data langsung dikomponennya. jadi kita tidak perlu membuat endpoint api untuk melakukan mutasi data. syarat menggunakan server actions kita harus menggunkaan form dan memberikan action di form, atau bisa juga di button dengan nama formAction.

### Contoh penggunaan inline dan form action

```tsx
// @filename: app/page.tsx
export default async function Page() {
	async function actionDel(formData: FormData) {
		'use server';
		await prisma.gathering.delete({
			where: {
				id: formData.get('meetId') as string
			}
		});

		revalidatePath('/');
	}

	<form action={actionDel}>
		<input type="hidden" name="meetId" value={meet.id} />
		<Button>Delete</Button>
	</form>;
}
```
