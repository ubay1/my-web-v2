---
title: React - useReducer
description:
imagePath: https://wallpapercave.com/wp/wp4924054.jpg
imageAlt: react
viewTransitionName: 'react-reducer'
date: 2023-11-13 09:00
icon: 'devicon:react'
tags:
  - react
---

# useReducer

useReducer digunakan untuk mengelola state yang lebih kompleks. Fungsi ini menerima reducer dan initialState, dan mengembalikan state saat ini beserta dispatch function untuk memicu perubahan pada state berdasarkan action yang didefinisikan.

```tsx
// @noErrors
// contoh useReducer pada object
import React, { ChangeEvent, useReducer } from 'react';

// Inisialisasi state awal
const initialState = {
	name: '',
	email: '',
	message: ''
};

type ACTION_TYPE = 'SET_FIELD' | 'RESET';
// Reducer untuk mengelola perubahan state berdasarkan action
const formReducer = (state: any, action: { type: ACTION_TYPE; field?: any; value?: string }) => {
	switch (action.type) {
		case 'SET_FIELD':
			return { ...state, [action.field]: action.value };
		case 'RESET':
			return initialState;
		default:
			return state;
	}
};

// Komponen utama
const UseReducer = () => {
	const [formData, dispatch] = useReducer(formReducer, initialState);

	const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = event.target;
		dispatch({ type: 'SET_FIELD', field: name, value });
	};

	const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log('Form submitted with data:', formData);
		// Lakukan sesuatu dengan data form, misalnya kirim ke backend
		dispatch({ type: 'RESET' }); // Reset form setelah submit
	};

	return (
		<form className="flex flex-col gap-2" onSubmit={handleSubmit}>
			<input
				className="text-black px-1"
				type="text"
				name="name"
				value={formData.name}
				onChange={handleChange}
				placeholder="Name"
			/>
			<input
				className="text-black px-1"
				type="email"
				name="email"
				value={formData.email}
				onChange={handleChange}
				placeholder="Email"
			/>
			<textarea
				name="message"
				className="text-black px-1"
				value={formData.message}
				onChange={handleChange}
				placeholder="Message"
			/>
			<button type="submit">Submit</button>
		</form>
	);
};

export default UseReducer;
```

```tsx
// @noErrors
// contoh useReducer pada array
import React, { useReducer } from 'react';

const initialState = {
	items: []
};

type ACTION_TYPE = 'ADD_ITEM' | 'REMOVE_ITEM' | 'CLEAR_ITEMS';
const reducer = (state: { items: any[] }, action: { type: ACTION_TYPE; payload?: string }) => {
	switch (action.type) {
		case 'ADD_ITEM':
			return {
				items: [...state.items, action.payload]
			};
		case 'REMOVE_ITEM':
			return {
				items: state.items.filter((_: any, index: any) => index !== action.payload)
			};
		case 'CLEAR_ITEMS':
			return {
				items: []
			};
		default:
			return state;
	}
};

const UseReducer = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const addItem = (item: any) => {
		dispatch({ type: 'ADD_ITEM', payload: item });
	};

	const removeItem = (index: any) => {
		dispatch({ type: 'REMOVE_ITEM', payload: index });
	};

	const clearItems = () => {
		dispatch({ type: 'CLEAR_ITEMS' });
	};

	return (
		<div>
			<h2>Shopping List</h2>
			<ul>
				{state.items.map((item: any, index: number) => (
					<li key={index}>
						{item} <button onClick={() => removeItem(index)}>Remove</button>
					</li>
				))}
			</ul>
			<input
				type="text"
				placeholder="Add item..."
				className="text-black px-1"
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						addItem(e.currentTarget.value);
						e.currentTarget.value = '';
					}
				}}
			/>
			<button onClick={clearItems}>Clear All</button>
		</div>
	);
};

export default UseReducer;
```
