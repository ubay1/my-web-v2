---
title: NUXT 3 advance - server folder
description:
imagePath: https://img-c.udemycdn.com/course/750x422/4395942_c476_2.jpg
imageAlt: nuxt3
date: 2023-06-02
tags:
  - nuxt3
  - vue
---

## Server Folder ~/server

### #api

kita bisa membuat api sendiri dengan folder **api** ini. misal disini kita buat 1 buat api yang akan mengget data dari url **jsonplaceholder** :

```ts
export default defineEventHandler(async (event) => {
	try {
		const data = await $fetch('https://jsonplaceholder.typicode.com/posts');
		return data;
	} catch (error) {
		return error;
	}
});
```

kita dapat mengaksesnya seperti ini:

```vue
<script setup>
const res = await $fetch('/api/hello');
console.log(res);
</script>
```

#### #matching HTTP method

handle file sesuai dengan suffix yang diberi ada **.get, .post, .put, .delete**

contoh disini kita membuat file dengan nama **test.get.ts**.

```ts
export default defineEventHandler(() => 'Test get handler');
```

jika kita menggunakan selain **.get**, lalu coba akses lewat tab url. maka kita akan mendapatkan error **405 method not allowed**.

#### #Handling Requests body payload with readBody

contoh disini kita membuat file dengan nama **submit.post.ts**.

```ts
export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	return { body };
});
```

kita bisa mengaksesnya seperti ini.

```vue
<script setup>
async function submit() {
	const res = await $fetch('/api/submit', { method: 'post', body: { test: 123 } });
	console.log(res);
}
</script>
```

#### #Handling Requests Query Parameters with getQuery

contoh disini kita membuat file dengan nama **query.get.ts**.

```ts
export default defineEventHandler((event) => {
	const query = getQuery(event);
	return { a: query.param1, b: query.param2 };
});
```

kita bisa mengaksesnya seperti ini.

```vue
<script setup>
const resQuery = await $fetch('/api/query?param1=11&param2=22');
console.log(resQuery);
</script>
```

#### #Error handling

kita bisa memberikan error handling pada tiap **api** dengan **createError**.

contoh:

kita buat file **api/hello.ts**.

```ts
export default defineEventHandler(async (event) => {
	try {
		const data = await $fetch('https://jsonplaceholder.typicode.com/posts');
		return data;
	} catch (error: any) {
		throw createError({
			statusCode: error.response.status,
			statusMessage: error.response.statusText
		});
	}
});
```

kita tambahkan utils dulu, dan kita buat list errornya. kita buat dengan nama **~/utils/errorMessageHandling.ts**:

```ts
export default (codeParam: number) => {
	const listError = [
		{ code: 404, message: 'data/page tidak dikethaui' },
		{ code: 500, message: 'server error' }
	];

	for (const [i, { code, message }] of listError.entries()) {
		if (code === codeParam) {
			return message;
		}
	}
};
```

lalu kita coba akses, jika code error ada di list **errorMessageHandling**, maka akan membalikan messagenya.

```vue
<script setup>
try {
	const resQuery = await $fetch('/api/hello');
	console.log(resQuery);
} catch (error) {
	const aa = errorMessageHandling(error.response.status);
	console.log(aa);
}
</script>
```

### #routes

masih belum tau kegunaan **server/routes** ini, yang pasti kita bisa membuat sebuah halaman dari **server/routes** ini.

contoh disini kita buat file dengan nama **hello.ts**.

```ts
export default defineEventHandler(() => 'Hello World!');
```

kita bisa mengaksesnya seperti ini : **http://localhost:3000/routes/hello**
