---
title: React - Context
description:
imagePath: https://wallpapercave.com/wp/wp4924054.jpg
imageAlt: react
viewTransitionName: 'react-context'
date: 2023-11-11 09:00
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
// @noErrors
import React, { createContext, useContext, useState } from 'react';

// Membuat context untuk nilai tema
const ThemeContext = createContext<string | any>('');

// Komponen Provider yang menyediakan nilai tema
function ThemeProvider({ children }: any) {
	const [theme, setTheme] = useState('light');

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
	};

	return <ThemeContext.Provider value={{ theme, toggleTheme }}> {children} </ThemeContext.Provider>;
}

// Komponen Consumer yang mengonsumsi nilai tema dari context
function ThemeConsumer() {
	const { theme, toggleTheme } = useContext(ThemeContext);

	return (
		<div>
			<h3>Current Theme: {theme}</h3>
			<button onClick={toggleTheme}>Toggle Theme</button>
		</div>
	);
}

// Komponen utama menggunakan ThemeProvider sebagai Provider
function App() {
	return (
		<ThemeProvider>
			<div>
				<h1>Theme Example</h1>
				<ThemeConsumer />
			</div>
		</ThemeProvider>
	);
}

export default App;
```

Pada contoh di atas, ThemeProvider menyediakan toggleTheme sebagai nilai ke dalam Context. Kemudian, ThemeConsumer menggunakan useContext untuk mengakses fungsi toggleTheme yang disediakan oleh Provider.

Perlu diingat bahwa dalam contoh ini, toggleTheme hanyalah sebuah fungsi sederhana yang diimplementasikan sebagai contoh.
