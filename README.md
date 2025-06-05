# B2C-Store-Application

# B2C-Store-Application

A full-stack B2C (Business-to-Consumer) e-commerce web application for managing and browsing products such as keyboards, keycaps, and switches.

## Features

- Product listing, detail, add, and modify pages
- Category and type filtering
- User authentication (login)
- Prisma ORM with a PostgreSQL (or other) database
- API routes for CRUD operations
- Responsive UI built with Next.js and Tailwind CSS

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/) (or your chosen DB)
- [Tailwind CSS](https://tailwindcss.com/)
- [NextAuth.js](https://next-auth.js.org/) (for authentication)
- [React Icons](https://react-icons.github.io/react-icons/) (for UI icons)

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- A running PostgreSQL (or other supported) database

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/B2C-Store-Application.git
   cd B2C-Store-Application
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables:**

   - Copy `.env.example` to `.env` and fill in your database and other secrets.

4. **Set up the database:**

   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

5. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser:**
   - Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

```
b2c-app/
  ├─ src/
  │   ├─ app/
  │   │   ├─ products/
  │   │   │   ├─ [id]/page.tsx
  │   │   │   ├─ add-product/page.tsx
  │   │   │   ├─ modify-product/[id]/page.tsx
  │   │   │   ├─ ProductCard.tsx
  │   │   │   └─ ProductPage.tsx
  │   │   ├─ api/
  │   │   │   ├─ products/route.ts
  │   │   │   ├─ products/[id]/route.ts
  │   │   │   └─ auth/login/route.tsx
  │   ├─ lib/
  │   │   └─ prisma.ts
  ├─ prisma/
  │   └─ schema.prisma
  ├─ public/
  │   └─ images/
  ├─ next.config.ts
  └─ README.md
```

## Scripts

- `dev` - Start the development server
- `build` - Build for production
- `start` - Start the production server
- `prisma migrate dev` - Run database migrations
- `prisma studio` - Open Prisma Studio for DB browsing

## Environment Variables

- `DATABASE_URL` - Your database connection string
- `NEXTAUTH_SECRET` - Secret for NextAuth.js
- `NEXT_PUBLIC_BASE_URL` - Base URL for API requests

## License

MIT

---

**Feel free to customize this README for your team or deployment!**
