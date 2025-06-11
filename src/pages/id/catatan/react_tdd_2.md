---
layout: ../../../layouts/MarkdownLayout.astro
title: React Testing - Rendering Komponen
description:
imagePath: https://wallpapercave.com/wp/wp4924054.jpg
imageAlt: img-react-test
viewTransitionName: 'react-tdd-1'
date: 2025-05-11 10:00
icon: 'devicon:react'
tags:
  - react
  - testing
  - vitest
  - react-testing-library
---

## Rendering Komponen

React testing library berfungsi sebagai wrapper untuk react dom. Kita dapat menggunakan fungsi render untuk merender komponen yang akan kita tes. <br/>

```js
import { describe, it } from 'vitest'
import { render } from '@testing-library/react'

import App from './App'

describe('App', () => {
  it('renders App component', () => {
    render(<App />)
  })
})
```

<br />

untuk menyeleksi element mana yang ingin kita test, di React testing library ada banyak method yang bisa kita gunakan. diantaranya <br/>

<img alt="rtl-1" src="/rtl-1.png" width="300"/>
<img alt="rtl-2" src="/rtl-2.png" width="300"/>
<img alt="rtl-3" src="/rtl-3.png" width="300"/>
<img alt="rtl-4" src="/rtl-4.png" width="300"/>
<img alt="rtl-5" src="/rtl-5.png" width="300"/>

<br />

## Mengakses DOM komponen

kita juga bisa mengakses dom komponen yang akan kita tes. <br/>

```tsx
// components/Testing.tsx
import { useState } from 'react'

export const TestingCount = () => {
  const [count, setCount] = useState(0)
  return (
    <div>
      <p data-testid="count">{count}</p>
      <button data-testid="btn-count" onClick={() => setCount(count + 1)}>
        Tambah
      </button>
    </div>
  )
}
```

```tsx
// components/Testing.test.tsx
import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { TestingCount } from './Testing'

describe('Testing Component Counter', () => {
  it('menampilkan nilai default', () => {
    render(<TestingCount />)
    expect(screen.getByTestId('count')).toHaveTextContent('0')
  })

  it('menambah count saat button di klik', () => {
    render(<TestingCount />)
    const button = screen.getByTestId('btn-count')
    fireEvent.click(button)
    expect(screen.getByTestId('count')).toHaveTextContent('1')
  })
})
```

- fireEvent berfungsi untuk mengirimkan event pada element. <br/>
- screen berfungsi untuk mengakses dom komponen. <br/>
- expect berfungsi untuk membandingkan nilai yang diharapkan dengan nilai yang dihasilkan. <br/>
- toHaveTextContent milik jestDom, kita bisa cek listnya disini https://github.com/testing-library/jest-dom <br/>
