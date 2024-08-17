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

> Server Actions adalah kita melakukan mutasi data langsung dikomponennya. jadi kita tidak perlu membuat **endpoint api** untuk melakukan mutasi data. syarat menggunakan server actions kita harus menggunkaan form dan memberikan action di form, atau bisa juga di button dengan nama formAction.

### Contoh penggunaan inline dan form action

```tsx
// @filename: app/page.tsx
export default async function Page() {
	async function deleteData(formData: FormData) {
		'use server';
		await prisma.gathering.delete({
			where: {
				id: formData.get('meetId') as string
			}
		});

		revalidatePath('/');
	}

	<form action={deleteData}>
		<input type="hidden" name="meetId" value={meet.id} />
		<Button>Delete</Button>
	</form>;
}
```

### Contoh penggunaan server actions di external file

disini kita menambahkan error handling di server, jika data yang diinput tidak sesuai.

```tsx
// @filename: app/actions.ts
'use server';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const constraintStr = z.string().min(1);

const schema = z.object({
	title: constraintStr,
	address: constraintStr,
	description: constraintStr
});

export async function addMeet(prevState: any, formData: FormData) {
	const result = schema.safeParse(Object.fromEntries(formData.entries()));

	if (!result.success) {
		return {
			type: 'error' as const,
			errors: result.error.flatten().fieldErrors
		};
	}

	try {
		await prisma.gathering.create({
			data: {
				title: result.data.title,
				address: result.data.address,
				description: result.data.description
			}
		});

		revalidatePath('/', 'layout');

		return {
			type: 'success' as const,
			message: 'Added event'
		};
	} catch (error) {
		return {
			type: 'error' as const,
			message: 'Failed to create event'
		};
	}
}
```

```tsx
// @filename: app/page.tsx // [!code focus]

import AddForm from '@/components/AddForm'; // [!code focus]

export default async function Home() {
	return (
		<main className="container py-8">
			<section className="flex justify-center">
				<AddForm /> // [!code focus]
			</section>
		</main>
	);
}
```

disini kita menambahkan error handling di client, dan memeberikan actions untuk button jika pending maka button disabled.

```tsx
// @filename: components/AddForm.tsx

'use client';

import { addMeet } from '@/app/action';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useRef } from 'react';
import { useFormState } from 'react-dom';
import { useFormStatus } from 'react-dom';

export default function AddForm() {
	const { pending } = useFormStatus();
	const [state, formAction] = useFormState(addMeet, { type: undefined, message: null });
	const ref = useRef<HTMLFormElement>(null);

	state?.type === 'success' && ref.current?.reset();

	return (
		<form action={formAction} ref={ref} className="space-y-4">
			<div className="flex items-center w-full">
				<Label htmlFor="title" className="basis-1/4">
					Title :
				</Label>
				<div className="basis-3/4">
					<Input type="text" id="title" name="title" />
					<small className="text-destructive">
						{state?.type === 'error' && state?.errors?.title}
					</small>
				</div>
			</div>
			<div className="flex items-center w-full">
				<Label htmlFor="address" className="basis-1/4">
					Address :
				</Label>
				<div className="basis-3/4">
					<Input type="text" id="address" name="address" />
					<small className="text-destructive">
						{state?.type === 'error' && state?.errors?.address}
					</small>
				</div>
			</div>
			<div className="flex items-center w-full">
				<Label htmlFor="description" className="basis-1/4">
					Description :
				</Label>
				<div className="basis-3/4">
					<Textarea id="description" name="description" className="resize-none" />
					<small className="text-destructive">
						{state?.type === 'error' && state?.errors?.description}
					</small>
				</div>
			</div>
			<div className="text-end">
				<Button aria-disabled={pending} disabled={pending}>
					{pending ? 'Adding...' : 'Add'}
				</Button>
			</div>
		</form>
	);
}
```
