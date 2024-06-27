---
title: Shikiji
description: syntax highlighter
imagePath: https://www.markdownguide.org/assets/images/markdown-guide-og.jpg
imageAlt: next
viewTransitionName: 'next-server-actions'
date: 2024-07-01 08:00
icon: 'skill-icons:markdown-light'
tags:
  - markdown
---

```tsx
// prettier-ignore
// ---cut---
// @filename: app/page.tsx

export default async function Page() {
	async function actionDel(formData: FormData) {
		'use server'; // [!code --]
		await prisma.gathering.delete({ // [!code ++]
			where: { // [!code highlight:3]
				id: formData.get('meetId') as string
			}
		});

		revalidatePath('/'); // [!code focus]
	}

	<form action={actionDel}>
		<input type="hidden" name="meetId" value={meet.id} />
		<Button>Delete</Button>
	</form>;
}
```
