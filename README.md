# 🛒 বাজার দর (BazarDor)

*প্রয়োজনীয় পণ্যের দাম এক নজরে।* A price-tracking web app for Bangladesh's everyday essentials: rice, lentils, oil, vegetables, fish, meat, eggs & milk, and spices.

[Live Demo](https://bazar-dor-web-assignment.vercel.app/) · [Features](#-key-features) · [Tech Stack](#️-technologies-used) · [Getting Started](#-getting-started) · [Deployment](#-deployment)

---

## 📖 Description

**BazarDor** (বাজার দর) lets people check today's price of daily-use products and see at a glance whether prices have gone up or down. Data is fetched live from the BazarDor REST API and shown with Bengali digits and the Bangla date.

Visitors can browse the home page and categories freely. The detailed *Product Details* page, with min, max, and average prices and a market-by-market breakdown across divisions, is a protected route that requires signing in. Authentication is built with **BetterAuth** (email/password plus Google and GitHub social login).

---

## ✨ Key Features

1. **Live Price Dashboard:** The home page features an infinite-scrolling price ticker, a hero section with a scroll-to-products CTA, and three main sections: *"আজ দাম বেড়েছে ▲"* (top risers), *"আজ দাম কমেছে ▼"* (top fallers), and *"সব পণ্য"* (all products in a responsive grid). Price changes use color-coded badges (green ▲, red ▼, grey —).
2. **Category Browsing & Sorting:** Filter products by category from the navbar, with the active category highlighted. Sort items by *ডিফল্ট* (Default), *দাম: কম থেকে বেশি* (Low to High), or *দাম: বেশি থেকে কম* (High to Low) using numeric price values.
3. **Dynamic & Protected Product Details:** `/product/[slug]` displays the product summary, minimum/max/average price, price history, and market-wise prices grouped by division. Unauthenticated visitors are securely redirected to sign in.
4. **Complete Authentication:** Sign up and sign in securely with email/password, **Google**, and **GitHub** social login via **BetterAuth**, complete with toast notifications and inline error handling.
5. **Profile Management:** View and update your profile information seamlessly.
6. **Polished UX:** Includes skeleton loaders, friendly 404 and empty states with a *"হোম পেজে ফিরে যান"* button, error boundaries, and localized Bengali digit/date formatting.
7. **Fully Responsive:** Adapts smoothly across mobile, tablet, and desktop screens with reliable dynamic routing.

---

## 🛠️ Technologies Used

| Category | Technology |
| :--- | :--- |
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router), [React 19](https://react.dev/) |
| **Language** | JavaScript |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + [DaisyUI v5](https://daisyui.com/) |
| **Authentication** | [BetterAuth](https://www.better-auth.com/) (Email/Password, Google, GitHub) |
| **Database** | PostgreSQL ([Neon](https://neon.tech/)) via `pg` |
| **Notifications** | `react-hot-toast` |
| **Data Source** | BazarDor REST API |
| **Font** | Noto Sans Bengali (`next/font`) |
| **Hosting** | [Vercel](https://vercel.com/) |

---

## 🗺️ Routes

| Route | Access | Description |
| :--- | :--- | :--- |
| `/` | Public | Hero, price ticker, risers, fallers, and all products |
| `/category/[slug]` | Public | Products filtered by category with sorting options |
| `/product/[slug]` | 🔒 Protected | Detailed price breakdown by division and market |
| `/signin` | Public | Sign in via credentials, Google, or GitHub |
| `/signup` | Public | Create a new account |
| `/profile` | 🔒 Protected | View your user profile |
| `/profile/update` | 🔒 Protected | Update your profile details |
| `*` | Public | Friendly custom 404 page |

---

## 🔌 API Endpoints

* **Base URL:** `https://api.api-store.workers.dev/api/bazardor`
* **Fallback URL:** `https://api.abcz.workers.dev/api/bazardor`

| Endpoint | Description |
| :--- | :--- |
| `/products` | Get all products |
| `/products?category=[slug]` | Get products filtered by category |
| `/products/[id]` | Get a single product's details |
| `/categories` | Get all product categories |
| `/categories/[slug]` | Get a single category's details |

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
│   ├── layout.js            # Root layout
│   ├── page.js              # Home page
│   ├── loading.js           # Loading skeletons
│   ├── error.js             # Error boundary
│   ├── not-found.js         # 404 page
│   └── globals.css          # Tailwind + DaisyUI theme
├── components/              # Navbar, Ticker, Hero, ProductCard, forms, etc.
├── lib/                     # Auth config, API helpers, formatters
├── public/                  # Static assets
└── middleware.js            # Protected route middleware