Error:{

    
Worked - https://api.vidinfra.com/cdn/v1/distributions?page=1&limit=10&sort=-created_at&filter[status][eq]=provisioning&filter[status][eq]=active

-----------------------------------------------------Not Working----------------------------------------------

Like operator 
https://api.vidinfra.com/cdn/v1/distributions?page=1&limit=10&sort=-created_at&filter[cname][like]=distributions

between Operator
https://api.vidinfra.com/cdn/v1/distributions?page=1&limit=10&sort=-created_at&filter[created_at][between]=2025-08-05%2C2025-09-15


https://api.vidinfra.com/cdn/v1/distributions?page=1&limit=10&sort=-created_at&filter[priority][eq]=medium


Sort in Table col 
https://api.vidinfra.com/cdn/v1/distributions?page=1&limit=10&sort=cname this is working -but others field sort is not working thats why Label , Status  sort is muted 

}

Check out the live app here: [Vidinfra CDN Dashboard](https://vdinfra.vercel.app)

# 📡 Vidinfra CDN Admin Dashboard

A modern admin dashboard for managing and monitoring CDN content distributions. Built with **Next.js 15**, **TypeScript**, and modern React tooling, this interface enables users to efficiently search, filter, and explore their CDN distributions.



---

## 🚀 Features

### 📊 Data Table
- Pagination with `page` and `limit` controls
- Column sorting with visual indicators
- Responsive design (mobile and desktop optimized)
- Loading, empty, and error states

### 🔍 Filtering System
- **CNAME**: Debounced text search
- **Status**: Dropdown filter (`active`, `inactive`, `pending`)
- **Created At**: From/to date range picker
- All filters are synced with the URL via `nuqs` for sharable states

### 📄 Displayed Columns
- **Label**
- **CNAME**
- **Origin**
- **Status** (with color-coded badges)
- **Created At** (nicely formatted)

---

## 🛠 Tech Stack

- [Next.js 15 (App Router)](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Axios](https://axios-http.com/)
- [@tanstack/react-query](https://tanstack.com/query/latest)
- [@tanstack/react-table](https://tanstack.com/table/latest)
- [shadcn/ui](https://ui.shadcn.com/)
- [nuqs](https://github.com/rixo/nuqs) – Query string state management

---


### 🔗 Endpoint
```http
GET /v1/distributions

# Pagination only
GET /v1/distributions?page=1&limit=10

# With filters
GET /v1/distributions?page=1&limit=10&filter[cname][like]=example&filter[status][eq]=active

# With sorting
GET /v1/distributions?page=1&limit=10&sort=-created_at


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
