---
layout: ../../../layouts/MarkdownLayout.astro
title: Mengenal tailwind variants
description: mengenal tailwind variant, agar lebih rapih dalam membuat komponen
imagePath: https://ded9.com/wp-content/uploads/2023/08/c21c1baf-7863-41a1-961e-6959a29d4f84.webp
imageAlt: img-tw
viewTransitionName: 'tw-1'
date: 2025-07-11 09:00
icon: 'devicon:tailwindcss'
tags:
  - tailwind
---

```tsx
import { tv } from 'tailwind-variants'

export const buttonVariant = tv({
  variants: {
    color: {
      primary: 'bg-blue-500 hover:bg-blue-700',
      secondary: 'bg-purple-500 hover:bg-purple-700',
      success: 'bg-green-500 hover:bg-green-700',
    },
    size: {
      sm: 'py-1 px-3 text-xs',
      md: 'py-1.5 px-4 text-sm',
      lg: 'py-2 px-6 text-md',
    },
    disabled: {
      true: 'opacity-50 bg-gray-500 pointer-events-none',
    },
  },

  // menampilkan jika kondisi warna "success" & disabled true
  // beberapa kondisi variants
  compoundVariants: [
    {
      color: 'success',
      disabled: true,
      class: 'bg-gray-300 text-gray-700 ',
      // Kamu juga bisa menggunakan "className"
    },
    {
      color: ['primary', 'secondary'],
      disabled: true,
      class: 'text-slate-700 bg-slate-300',
    },
  ],
  // default variants
  defaultVariants: {
    color: 'primary',
    size: 'md',
    disabled: false,
  },
  base: 'font-semibold text-white py-1 px-3 rounded-full active:opacity-80',
  // jika menggunakan slots, base akan ditimpa
  // dan jika kita membuat slot lain, kita dapat menggunakan slot tersebut
  slots: {
    base: 'font-bold font-manrope text-white py-1 px-3 rounded-full active:opacity-80',
    icon: 'w-4 h-4 mr-2',
    label: '',
  },
})

// menimpa gaya komponen tunggal, kita dapat menggunakan seperti ini
/**
  // override color variant
  button({ color: 'secondary', class: 'bg-pink-500 hover:bg-pink-500' });
 */

// overiding slots, we can use like this
/** 
  const card = tv({ 
    slots: { 
      base: 'md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-gray-900', 
    }
  })
   
  const { base } = card();

  <div className={base({ class: 'bg-purple-100 dark:bg-purple-800' })}></div>
 **/
```

cara menggunakan

```tsx
const { base: baseSuccessVariant } = buttonVariant({
  color: 'success',
  size: 'lg',
})
const { base: baseBooleanVariant } = buttonVariant({
  color: 'secondary',
  disabled: true,
  size: 'lg',
})
const { base: baseCompoundVariant } = buttonVariant({
  color: 'success',
  disabled: true,
  size: 'lg',
})
const { base: baseCompount2Color } = buttonVariant({
  color: 'primary',
  disabled: true,
  size: 'lg',
})

export default function Home() {
  return (
    <div className={cn(flexCol.center, 'h-screen')}>
      <p className="text-4xl font-bold font-manrope mb-8">Hallo developer</p>
      <div className={cn(flex.center, 'gap-2')}>
        <button className={baseSuccessVariant()} onClick={() => toast.success('Hallo')}>
          Success variant
        </button>
        <button className={baseBooleanVariant()}>Boolean variant</button>
        <button className={baseCompoundVariant()}>Compound variant</button>
        <button className={baseCompount2Color()}>Compound variant with 2 color</button>
      </div>
    </div>
  )
}
```
