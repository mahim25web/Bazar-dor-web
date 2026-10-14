# 🛒 বাজার দর (BazarDor)

*প্রয়োজনীয় পণ্যের দাম এক নজরে।*  
A price-tracking web app for Bangladesh's everyday essentials: rice, lentils, oil, vegetables, fish, meat, eggs & milk, and spices.

[Live Demo](https://bazardor-beige.vercel.app/) · [Features](#-key-features) · [Tech Stack](#️-technologies-used) · [Getting Started](#-getting-started) · [Deployment](#-deployment)

---

## 📖 Description

**BazarDor** (বাজার দর) lets people check today's price of daily-use products and see at a glance whether prices have gone up or down. Data is fetched live from the BazarDor REST API and shown with Bengali digits and the Bangla date.

Visitors can browse the home page and categories freely. The detailed **Product Details** page, with min, max and average prices and a market-by-market breakdown across divisions, is a **protected route** that requires signing in. Authentication is built with **BetterAuth** (email/password plus Google and GitHub social login).

The app is fully responsive across mobile, tablet and desktop.

---

## 🔗 Links

- **Live Site:** 
- **Repository:** 

---

## ✨ Key Features

1. **Live Price Dashboard:** The home page shows an infinite-scrolling price ticker, a hero section with a scroll-to-products CTA, and three sections: *"আজ দাম বেড়েছে ▲"* (top 6 risers), *"আজ দাম কমেছে ▼"* (top 6 fallers) and *"সব পণ্য"* (all products in a responsive grid). Price changes use colour-coded badges (green ▲, red ▼, grey —).
2. **Category Browsing & Sorting:** Filter products by category from the navbar, with the active category highlighted. Sort by *ডিফল্ট* (Default), *দাম: কম থেকে বেশি* (Low to High), or *দাম: বেশি থেকে কম* (High to Low). Sorting uses the numeric price, never Bengali text.
3. **Dynamic & Protected Product Details:** `/product/[slug]` shows the product summary (emoji, category tags, unit), minimum / maximum / average price, price history (yesterday, last week, last month) and **market-wise prices grouped by division**. Visitors who aren't signed in are redirected to sign in with a toast, then returned to the page.
4. **Complete Authentication:** Sign up and sign in with email and password, **Google** and **GitHub** social login, sign out, toast notifications and inline form errors powered by BetterAuth.
5. **Profile Management:** View your profile and update your name on a dedicated page using BetterAuth's `updateUser`.
6. **Polished UX:** Skeleton loaders during data loading, friendly 404 and empty states with a *"হোম পেজে ফিরে যান"* button, an error boundary, toast feedback for auth and redirects, Bengali digit formatting, and the Bangla date.
7. **Fully Responsive:** The navbar, ticker, hero, and grids adapt seamlessly to mobile, tablet, and desktop devices. Dynamic routes work on refresh with no hard 404.

---

## 🛠️ Technologies Used

| Category | Technology |
| :--- | :--- |
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router), [React 19](https://react.dev/) |
| **Language** | JavaScript |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + [DaisyUI v5](https://daisyui.com/) with a custom theme |
| **Authentication** | [BetterAuth](https://www.better-auth.com/) (email/password, Google, GitHub) |
| **Database** | PostgreSQL ([Neon](https://neon.tech/)) via `pg` |
| **Notifications** | [react-hot-toast](https://react-hot-toast.com/) |
| **Data Source** | BazarDor REST API (primary + fallback host) |
| **Font** | Noto Sans Bengali (`next/font`) |
| **Hosting** | [Vercel](https://vercel.com/) |

*Concepts used:* Components & props, `useState`, `useEffect`, event handling, conditional rendering, array methods, data fetching, routing, dynamic routing, server/client components, protected routes (middleware), and authentication.

---

## 🗺️ Routes

| Route | Access | Description |
| :--- | :--- | :--- |
| `/` | Public | Hero, price ticker, risers, fallers, and all products |
| `/category/[slug]` | Public | Products in a category, with sorting |
| `/product/[slug]` | 🔒 Protected | Detailed price information by market |
| `/signin` | Public | Sign in (email/password, Google, GitHub) |
| `/signup` | Public | Create an account |
| `/profile` | 🔒 Protected | View your user profile |
| `/profile/update` | 🔒 Protected | Update your profile name |
| `*` | Public | Friendly 404 page |

---

## 🔌 API

- **Base URL:** `https://api.api-store.workers.dev/api/bazardor`
- **Fallback URL:** `https://api.abcz.workers.dev/api/bazardor`

| Endpoint | Description |
| :--- | :--- |
| `/products` | Get all products |
| `/products?category=chal` | Products filtered by category |
| `/products/1` | Get a single product |
| `/categories` | Get all categories |
| `/categories/chal` | Get a single category |

---

## 📂 Project Structure

```text
bazardor/
├── app/
│   ├── api/auth/[...all]/   # BetterAuth route handler
│   ├── category/[slug]/     # Category page
│   ├── product/[slug]/      # Protected product details
│   ├── profile/             # Profile + update form
│   ├── signin/  signup/     # Auth pages
│   ├── layout.js  page.js   # Root layout and home page
│   ├── loading.js  error.js  not-found.js
│   └── globals.css          # Tailwind + DaisyUI theme
├── components/              # Navbar, Ticker, Hero, ProductCard, forms, skeletons…
├── lib/                     # auth, auth-client, API helpers, Bengali formatting
├── public/                  # Static assets
└── middleware.js            # Protected-route redirect