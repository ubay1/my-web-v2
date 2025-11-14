---
layout: ../../../layouts/MarkdownLayout.astro
title: React - Context
description:
imagePath: /blog/react.webp
imageAlt: react
viewTransitionName: 'react-context'
date: 2023-11-11 09:00
icon: 'devicon:react'
tags:
  - react
---

# Context

React Context adalah salah satu fitur dari React yang memungkinkan kita untuk mentransfer data secara global melalui pohon komponen tanpa harus mengirim prop secara langsung dari satu komponen ke komponen lain secara bertingkat (prop drilling). Dengan menggunakan React Context, kita dapat menyediakan nilai yang akan tersedia untuk seluruh komponen dalam pohon komponen tanpa harus melewati prop dari komponen ke komponen.

Context berguna ketika kita memiliki data yang perlu diakses oleh banyak komponen di dalam aplikasi React tanpa harus menurunkannya melalui prop secara manual. Ini mengatasi masalah prop drilling yang dapat membuat kode menjadi tidak terorganisir dan sulit di-maintain.

React Context terdiri dari dua bagian utama:

1. Provider: Provider adalah komponen yang menyediakan nilai dari Context kepada komponen-komponen di dalamnya.

2. Consumer: Consumer adalah komponen yang mengonsumsi nilai dari Context. Dalam versi terbaru React (sejak React 16.8 ke atas), penggunaan Consumer tidak lagi dianjurkan secara langsung; sebaliknya, lebih disarankan menggunakan React Hook useContext untuk mengonsumsi nilai dari Context.

Berikut adalah contoh sederhana penggunaan React Context:

```tsx
// context/profile.tsx
import { createContext, useState, type ReactNode } from 'react'

const initialState = {
  name: '',
  age: 0,
  address: '',
}

type StateType = keyof typeof initialState

type ProfilType = typeof initialState

type ProfilContextType = [
  ProfilType,
  (field: StateType, value: string) => void,
  (value: ProfilType) => void,
]

export const ProfilContext = createContext<ProfilContextType>([initialState, () => {}, () => {}])

export function ProfilProvider({ children }: { children: ReactNode }) {
  const [profil, setProfil] = useState(initialState)

  const setData = (field: StateType, value: string) => {
    setProfil((data) => ({
      ...data,
      [field]: field === 'age' ? Number(value) : value,
    }))
  }
  const setFullData = (value: ProfilType) => {
    setProfil(() => ({
      ...value,
    }))
  }

  return (
    <ProfilContext.Provider value={[profil, setData, setFullData]}>
      {children}
    </ProfilContext.Provider>
  )
}
```

```tsx
// import ProfilProvider agar bisa digunakan di seluruh page/komponen yang membutuhkan informasi dari context
// ./App.tsx
import { ProfilProvider } from './context/profile'

function App() {
  return (
    <ProfilProvider>
      <div>
        <h1>Theme Example</h1>
      </div>
    </ProfilProvider>
  )
}

export default App
```

```tsx
// ./pages/index.tsx
import { useContext } from 'react'
import { ProfilContext } from './context/profile'

export default function Home() {
  const [profil, setData, setFullData] = useContext(ProfilContext)

  return (
    <div>
      <div style={styleSpace}>
        <h1>Context</h1>
        <div>{profil.age}</div>
        <button onClick={() => setData('age', '20')}> set profil age </button>
        <button onClick={() => setFullData({ name: 'ubay', address: 'aa', age: 22 })}>
          set full data
        </button>
        <div>fulldata = {JSON.stringify(profil)}</div>
      </div>
    </div>
  )
}
```
