---
layout: ../../../layouts/MarkdownLayout.astro
title: E2E Testing Next.js dengan Playwright
description:
imagePath: https://wallpapercave.com/wp/wp4924054.jpg
imageAlt: img-playwright
viewTransitionName: 'playwright-1'
date: 2025-07-14 10:00
icon: 'devicon:playwright'
tags:
  - testing
  - vitest
  - react-testing-library
  - playwright
---

# Setup

### Install Playwright

```bash
npx playwright install
```

<br/>

### Tambah playwright.config.ts di root proyek

```ts
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e', // Pastikan hanya mencari di folder e2e
  testMatch: '*.spec.ts', // Gunakan pola nama file yang berbeda
  // Jalankan semua tes secara paralel untuk eksekusi yang lebih cepat
  fullyParallel: true,
  // Cegah penggunaan .only saat menjalankan di CI
  forbidOnly: !!process.env.CI,
  // Ulangi tes yang gagal 2 kali di CI, 0 kali di development
  retries: process.env.CI ? 2 : 0,
  // Gunakan 1 worker di CI untuk penggunaan sumber daya yang dapat diprediksi, tidak terbatas di development
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run dev', // Pastikan ini menjalankan Vite dev server
    url: 'http://localhost:3002',
    reuseExistingServer: !process.env.CI,
  },
})
```

<br/>

### Tambah script di package.json

```bash
"test:e2e": "playwright test --ui",
"test:e2e-report": "playwright show-report",
```

### Perbedaan beforeEach, afterEach, beforeAll, afterAll

beforeEach dan afterEach adalah hook functions yang digunakan untuk menjalankan kode sebelum/sesudah setiap test case. Analoginya seperti "ritual" persiapan dan pembersihan yang otomatis dilakukan sebelum/sesudah tiap test.

1. beforeEach
   - Apa? Kode yang dijalankan sebelum setiap test dalam describe block.
   - Kapan Dipakai?
     - Setup data awal (e.g., login, buka halaman).
     - Inisialisasi variabel.
     - Reset state aplikasi.

Contoh: Login Sebelum Test UI

```ts
const { test, expect } = require('@playwright/test')

test.describe('Dashboard Test', () => {
  test.beforeEach(async ({ page }) => {
    // Dijalankan SEBELUM setiap test di bawah ini
    await page.goto('https://example.com/login')
    await page.fill('#username', 'user1')
    await page.fill('#password', 'pass123')
    await page.click('#login-button')
    await expect(page).toHaveURL(/dashboard/)
  })

  test('Test Menu Profile', async ({ page }) => {
    // Tidak perlu login lagi, karena sudah dihandle beforeEach
    await page.click('#profile')
    await expect(page).toHaveText('Profile Page')
  })

  test('Test Notifications', async ({ page }) => {
    await page.click('#notifications')
    await expect(page).toHaveText('Notification List')
  })
})
```

2. afterEach
   - Apa? Kode yang dijalankan setelah setiap test dalam describe block.
   - Kapan Dipakai?
     - Cleanup data (e.g., hapus data test).
     - Screenshot jika test gagal.
     - Logout.

Contoh: Cleanup Database Setelah Test API

```ts
const { test, expect } = require('@playwright/test')

test.describe('User API Test', () => {
  test.afterEach(async ({ request }) => {
    // Dijalankan SETIAP setiap test selesai
    await request.delete('https://api.example.com/test-users') // Hapus data test
  })

  test('Create User', async ({ request }) => {
    await request.post('https://api.example.com/users', {
      data: { name: 'John' },
    })
  })

  test('Update User', async ({ request }) => {
    await request.patch('https://api.example.com/users/1', {
      data: { name: 'Jane' },
    })
  })
})
```

**Perbedaan dengan beforeAll/afterAll**

| Hook       | Eksekusi                  | Contoh Penggunaan           |
| ---------- | ------------------------- | --------------------------- |
| beforeEach | Sebelum setiap test       | Login, buka halaman         |
| afterEach  | Setelah setiap test       | Hapus data, screenshot      |
| beforeAll  | Sekali sebelum semua test | Seed database, start server |
| afterAll   | Sekali setelah semua test | Stop server, cleanup global |

<br/>

# Basic Testing

### Tambah test pada folder tests/e2e/home.spec.ts

```ts
import { test, expect } from '@playwright/test'

test('check title page', async ({ page }) => {
  await page.goto('http://localhost:3002')
  await expect(page).toHaveTitle(/Starter Next.js/)
})

test('check error message', async ({ page }) => {
  await page.goto('http://localhost:3002')
  await page.getByTestId('home-example-form-input').fill('')
  await page.getByTestId('home-example-btn-submit').click()
  await expect(page.getByTestId('home-example-error-msg')).toContainText(
    'Username must be at least 3 characters long',
  )
})

test('check greeting message', async ({ page }) => {
  await page.goto('http://localhost:3002')
  await page.getByTestId('home-example-form-input').fill('ubay')
  await page.getByTestId('home-example-btn-submit').click()
  await expect(page.getByTestId('home-example-username')).toContainText('Hallo ubay')
})

test('goto page 2', async ({ page }) => {
  await page.goto('http://localhost:3002')
  await page.getByTestId('btn-goto-page2').click()
  await expect(page).toHaveURL('http://localhost:3002/page2')
  await expect(page.getByTestId('heading-greet')).toContainText('this is page 2')
})
```

kode test diatas mengacu pada kode di folder src/app/page.tsx menggunakan data-testid

<br/>

<!-- prettier-ignore-start -->
```tsx
'use client'

const baseSuccessVariant = buttonVariant({
  color: 'success',
  size: 'lg',
})
const baseBooleanVariant = buttonVariant({
  color: 'secondary',
  disabled: true,
  size: 'lg',
})
const baseCompoundVariant = buttonVariant({
  color: 'success',
  disabled: true,
  size: 'lg',
})
const baseCompount2Color = buttonVariant({
  color: 'primary',
  disabled: true,
  size: 'lg',
})

export default function Home() {
  const schema = z.object({
    username: z.string().min(3, {
      message: 'Username must be at least 3 characters long',
    }),
  })

  type FormValues = z.infer<typeof schema>

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '', // fix error "A component is changing an uncontrolled input to be controlled."
    },
  })

  const [value, setValue] = useState('')
  const onSubmit = (data: FormValues) => {
    setValue(data.username)
  }
  return (
    <div className={cn('flex flex-col h-screen px-8')}>
      // [!code focus:8]
      <p data-testid="heading-greet" className="text-4xl text-center font-bold font-manrope mt-8">
        Hallo developer this is nextjs 15 starter 
      </p>
      <p data-testid="heading-desc" className="text-2xl text-center font-manrope mt-2 mb-14">
        Shadcn UI, CVA, Tailwind CSS, React Hook Form, Zod, Zustand, React Query, Vitest, React
        Testing Library, Playwright
      </p>
      <Card>
        <CardContent>
          <p className="text-2xl font-bold font-manrope mb-4 text-left">Button component + CVA</p>
          <div className={cn(flex.start, 'flex-wrap gap-2')}>
            <button className={baseSuccessVariant} onClick={() => toast.success('Hallo')}>
              Success variant
            </button>
            <button className={baseBooleanVariant}>Boolean variant</button>
            <button className={baseCompoundVariant}>Compound variant</button>
            <button className={baseCompount2Color}>Compound variant with 2 color</button>
          </div>

          <hr className="my-8 border-1" />

          <p className="text-2xl font-bold font-manrope mb-4 text-left">
            Form (React Hook Form, Shadcn, Zod)
          </p>
          <Form {...form}>
            <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      // [!code focus:10]
                      <Input
                        data-testid="home-example-form-input"
                        type="text"
                        placeholder="Enter username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage data-testid="home-example-error-msg" />
                    {value && <p data-testid="home-example-username">Hallo {value}</p>}
                  </FormItem>
                )}
              />
              // [!code focus:4]
              <Button data-testid="home-example-btn-submit" className="mt-4" type="submit">
                Submit
              </Button>
            </form>
          </Form>

          <hr className="my-8 border-1" />

          // [!code focus:4]
          <Button asChild data-testid="btn-goto-page2">
            <Link href="/page2">Goto Page 2</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
```
<!-- prettier-ignore-end -->

<br/>

# API Testing

Berikut ini adalah contoh test API menggunakan Playwright, dimana kita coba untuk mengakses API dari https://dattebayo-api.onrender.com/characters.

```ts
import { test, expect } from '@playwright/test'

test.describe('Dattebayo API', () => {
  test('GET - List All Character Naruto', async ({ page }) => {
    await page.goto('http://localhost:3002/page2')
    const response = await page.request.get('https://dattebayo-api.onrender.com/characters')

    // Check response status code
    const responseCode = response.status()
    expect(responseCode).toBe(200)

    // Alternative ways to check status code
    // expect(response.ok()).toBeTruthy() // Checks if status is in 200-299 range
    // expect(response).toBeOK() // Playwright's built-in matcher for 200-299 status
  })
})
```
