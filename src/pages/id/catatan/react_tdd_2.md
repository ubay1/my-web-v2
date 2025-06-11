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
