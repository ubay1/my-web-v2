---
layout: ../../../layouts/MarkdownLayout.astro
title: Integrasi NEXT.js Versi 15 Dengan Firebase Cloud Message
description:
imagePath: https://wallpapercave.com/wp/wp11846968.png
imageAlt: next
viewTransitionName: 'next-fcm'
date: 2025-06-14 08:00
icon: ['devicon:nextjs', 'devicon:firebase']
tags:
  - next
  - react
  - firebase
---

# Integrasi NEXT.js Versi 15 Dengan Firebase Cloud Message

## 1. Firebase Project Setup

<br />

1. Buat Proyek Firebase:

- Buka Firebase Console.
- Klik "Add project" atau "Buat proyek".
- Ikuti langkah-langkah untuk membuat proyek baru. Berikan nama yang sesuai. <br />

1. Daftarkan Aplikasi Web

- Setelah proyek dibuat, di halaman gambaran umum proyek, klik ikon Web (&lt;/>) untuk menambahkan aplikasi web.
- Berikan nama nickname untuk aplikasi Anda (misal: nextjs-fcm-app).
- Centang "Set up Firebase Hosting for this app" (opsional, tapi disarankan jika Anda berencana meng-host dengan Firebase).
- Klik "Register app".

<br />

3. Simpan Konfigurasi Firebase Anda:

- Anda akan melihat objek konfigurasi Firebase (misal: firebaseConfig). Salin ini, Anda akan membutuhkannya di proyek Next.js Anda. <br/><br/>

```js
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID', // PENTING UNTUK FCM
  appId: 'YOUR_APP_ID',
  measurementId: 'YOUR_MEASUREMENT_ID', // Opsional jika tidak menggunakan Analytics
}
```

<br />

4. Aktifkan Cloud Messaging (FCM):

- Di Firebase Console, navigasi ke Project settings (ikon roda gigi di samping "Project Overview").
- Pilih tab Cloud Messaging.
- Gulir ke bawah ke bagian "Cloud Messaging API (Legacy)". Pastikan statusnya Enabled. Jika tidak, klik ikon titik tiga vertikal dan pilih "Manage API in Google Cloud Console" untuk mengaktifkannya.
- Catat Server Key Anda: Anda akan menemukan "Server key" di bagian ini. Ini adalah kunci rahasia yang akan Anda gunakan di backend untuk mengirim notifikasi. Jangan pernah mengekspos kunci ini di kode sisi klien Anda! <br/><br/>

## 2. Next.js Project Setup

### 1. Buat Proyek Next.js Baru (jika belum ada):

```bash
npx create-next-app@latest nextjs-fcm-demo --ts
cd nextjs-fcm-demo
```

### 2. Instal Firebase SDK:

```bash
npm install firebase
# atau
yarn add firebase
```

### 3. Buat File Konfigurasi Firebase:

Buat file firebase.ts (atau .js) di folder utils atau lib:

```ts
// utils/firebase.ts
import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID, // Opsional
}

// Inisialisasi Firebase jika belum diinisialisasi

let messaging: ReturnType<typeof getMessaging> // Gunakan any atau type spesifik jika Anda yakin
if (typeof window !== 'undefined' && 'navigator' in window) {
  // Pastikan hanya dijalankan di sisi klien
  // Pastikan Anda hanya menginisialisasi Messaging jika window tersedia
  // dan hanya di browser (bukan SSR)
  const app = initializeApp(firebaseConfig)
  messaging = getMessaging(app)
}

export { messaging, getToken, onMessage }
```

<br/>

### 4. Tambahkan Variabel Lingkungan:

Buat file .env.local di root proyek Next.js Anda dan tambahkan detail konfigurasi Firebase Anda:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY="YOUR_API_KEY"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
NEXT_PUBLIC_FIREBASE_APP_ID="YOUR_APP_ID"
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="YOUR_MEASUREMENT_ID"
```

<br/>

## 3. Firebase Client-Side Setup (di Komponen Next.js)

Sekarang, kita akan meminta izin notifikasi dan mendapatkan token perangkat di sisi klien.

### 1. Buat Komponen untuk Notifikasi:

```ts
// components/NotificationHandler.tsx
"use client"; // Pastikan komponen ini adalah Client Component di App Router

import { useEffect } from "react";
import { messaging } from "@/lib/firebase/firebase"; // Sesuaikan path jika berbeda
import { getToken, onMessage } from "firebase/messaging";

const NotificationHandler = () => {
  useEffect(() => {
    const setupFCM = async () => {
      if (!messaging) {
        console.log("Firebase Messaging not available.");
        return;
      }

      try {
        // 1. Minta Izin Notifikasi
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          console.log("Notification permission granted.");

          // 2. Dapatkan Token Pendaftaran Perangkat
          const currentToken = await getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_VAVID_KEY,
          });

          if (currentToken) {
            // setToken(currentToken);
            console.log("FCM Registration Token:", currentToken);
            // TODO: Kirim token ini ke backend Anda untuk disimpan
            // agar Anda bisa mengirim notifikasi ke perangkat ini nanti.
          } else {
            console.log(
              "No registration token available. Request permission to generate one."
            );
          }

          // 3. Tangani Notifikasi saat aplikasi di latar depan (foreground)
          onMessage(messaging, (payload) => {
            console.log("Message received. ", payload);
            // setNotification(payload); // Tampilkan di UI
            // Tampilkan notifikasi di browser secara manual jika perlu
            const notificationTitle = payload.notification?.title || "Hallo";
            const notificationOptions = {
              body: payload.notification?.body,
              icon: "/icon.svg", // Pastikan ada icon di public folder Anda
            };
            new Notification(notificationTitle, notificationOptions);
          });
        } else {
          console.log("Unable to get permission to notify.");
        }
      } catch (error) {
        console.error(
          "Error getting FCM token or setting up messaging:",
          error
        );
      }
    };

    setupFCM();
  }, []);

  return <></>;
};

export default NotificationHandler;
```

<br />

> Penting tentang VAPID Key: Anda bisa mendapatkan vapidKey dari Firebase Console Anda: Project settings -> Cloud Messaging -> gulir ke bawah ke "Web Push certificates". Anda akan melihat "Key pair". Salin string publiknya atau generate key pair.

<br/>

### 2. Integrasikan ke Halaman Anda:

Panggil komponen NotificationHandler di layout atau halaman utama Anda agar saat aplikasi dimuat, script ini berjalan.

```ts
// app/layout.tsx atau app/page.tsx
import NotificationHandler from '../components/NotificationHandler';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <NotificationHandler />
      </body>
    </html>
  );
}
```

<br/>

## 4. Service Worker Setup

Service Worker diperlukan agar aplikasi Anda dapat menerima notifikasi saat tidak aktif (di latar belakang atau browser ditutup).

### 1. Buat File Service Worker:

Buat file firebase-messaging-sw.js (nama ini adalah konvensi Firebase, jadi ikuti saja) di folder public di root proyek Next.js Anda.

```bash
touch public/firebase-messaging-sw.js
```

<br/>

Isi public/firebase-messaging-sw.js:

```js
// public/firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js')

let firebaseAppInitialized = false // Flag untuk melacak apakah Firebase sudah diinisialisasi
let firebaseMessagingInstance = null // Variabel untuk menyimpan instance messaging

async function initializeFirebaseInSw() {
  if (firebaseAppInitialized && firebaseMessagingInstance) {
    return firebaseMessagingInstance // Jika sudah diinisialisasi, kembalikan instance yang ada
  }

  try {
    const response = await fetch('/api/firebase-config') // Mengambil konfigurasi dari API Route
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const firebaseConfig = await response.json()

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
    }
    firebaseAppInitialized = true
    firebaseMessagingInstance = firebase.messaging() // Dapatkan instance messaging DI SINI

    console.log('Firebase initialized in Service Worker via API Route.')
    return firebaseMessagingInstance
  } catch (error) {
    console.error('Failed to fetch or initialize Firebase in Service Worker:', error)
    return null // Kembalikan null jika gagal
  }
}

// *** PENTING: Inisialisasi Firebase App dan dapatkan instance messaging
// di event `activate` atau pastikan dipanggil sebelum menggunakan `messaging`. ***
self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    initializeFirebaseInSw().then((messagingInstance) => {
      if (messagingInstance) {
        // Setelah messaging instance tersedia, baru panggil onBackgroundMessage
        messagingInstance.onBackgroundMessage((payload) => {
          console.log('[firebase-messaging-sw.js] Received background message ', payload)

          const notificationTitle = payload.notification?.title || 'Background Message Title'
          const notificationOptions = {
            body: payload.notification?.body || 'Background Message Body',
            icon: payload.notification?.icon || '/firebase-logo.png',
            data: payload.data,
          }

          self.registration.showNotification(notificationTitle, notificationOptions)
        })
      }
      return self.clients.claim()
    }),
  )
})

// Event listener untuk push message
self.addEventListener('push', (event) => {
  event.waitUntil(
    (async () => {
      // Panggil initializeFirebaseInSw() untuk memastikan Firebase terinisialisasi
      // dan instance messaging tersedia jika Anda ingin menggunakannya di sini.
      // Namun, untuk menampilkan notifikasi dari `push` event, Anda tidak memerlukan
      // instance `messaging` itu sendiri, hanya payload dari event.data.
      await initializeFirebaseInSw() // Tetap panggil untuk inisialisasi global

      const payload = event.data?.json()
      if (!payload) {
        console.error('Push event data is missing or not JSON.')
        return
      }

      console.log('[firebase-messaging-sw.js] Received push message ', payload)

      const notificationTitle = payload.notification?.title || 'Push Message Title'
      const notificationOptions = {
        body: payload.notification?.body || 'Push Message Body',
        icon: payload.notification?.icon || '/icon.svg',
        data: payload.data,
      }

      return self.registration.showNotification(notificationTitle, notificationOptions)
    })(),
  )
})

// Event listener untuk notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const targetUrl = event.notification.data?.url || '/'

  event.waitUntil(
    clients
      .matchAll({
        type: 'window',
        includeUncontrolled: true,
      })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url.includes(targetUrl) && 'focus' in client) {
            return client.focus()
          }
        }
        return clients.openWindow(targetUrl)
      }),
  )
})
```

<br/>

### 2. Buat api firebase config:

API ini yang akan di hit oleh firebase-message-sw.js

```ts
// app/api/firebase-config/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  })
}
```

### 3. Buat API untuk send notif

- API ini yang akan di hit dari client untuk send notif. pertama install firebase-admin SDK terlebih dahulu

```bash
npm install firebase-admin
# atau
yarn add firebase-admin
```

<br/>

- Buat API Route untuk Mengirim Notifikasi:

Atur Variabel Lingkungan untuk Kredensial Admin SDK: Daripada menyimpan file JSON serviceAccountKey.json secara langsung di proyek Anda (yang berisiko terekspos di Git jika tidak hati-hati), lebih aman untuk mengekstrak kredensialnya ke variabel lingkungan.

> untuk mendapatkan serviceAccountKey.json, ada di project setting > service account. jika anda belum punya privae key silahkan lakukan generate key untuk mendapatkan private key. lalu simpan di tempat yang aman,

Buka file JSON serviceAccountKey.json yang Anda unduh. Anda akan menemukan tiga kunci utama: project_id, private_key, dan client_email.

Tambahkan ini ke file .env di root proyek Next.js Anda:

```bash
# Pastikan untuk mengganti placeholder dengan nilai sebenarnya dari file JSON Anda
FIREBASE_PROJECT_ID="your-project-id"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_VALUE_HERE\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL="firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com"
```

<br/>

```ts
// app/api/send-notification/route.ts
import { NextResponse } from 'next/server'
import admin from 'firebase-admin'

// Inisialisasi Firebase Admin SDK jika belum diinisialisasi
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
  })
}

export async function POST(request: Request) {
  const { token, title, body, imageUrl, data } = await request.json()

  if (!token || !title || !body) {
    return NextResponse.json({ error: 'Token, title, and body are required.' }, { status: 400 })
  }

  const message = {
    notification: {
      title: title,
      body: body,
      imageUrl: imageUrl,
    },
    data: data || {},
    token: token,
  }

  try {
    const response = await admin.messaging().send(message)
    console.log('Successfully sent message:', response)
    return NextResponse.json({ message: 'Successfully sent message', response }, { status: 200 })
  } catch (error: any) {
    console.error('Error sending message:', error)
    return NextResponse.json(
      { error: 'Error sending message', details: error.message },
      { status: 500 },
    )
  }
}

// Jika Anda juga ingin mengizinkan metode lain, definisikan di sini:
// export async function GET(request: Request) { ... }
```
