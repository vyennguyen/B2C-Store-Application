# B2C-Store-Application

A full-stack B2C (Business-to-Consumer) e-commerce web application for managing and browsing products such as keyboards, keycaps, and switches.

## Features

- Product listing, detail, add, and modify pages
- Category and type filtering
- User authentication (login & registration)
- Prisma ORM with a PostgreSQL (or other) database
- API routes for CRUD operations
- Responsive UI built with Next.js and Tailwind CSS
- Admin dashboard for product/user management

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
  │   │   │   ├─ users/[id]/route.ts
  │   │   │   ├─ auth/login/route.ts
  │   │   │   ├─ auth/register/route.ts
  │   │   │   └─ auth/[...nextauth]/route.ts
  │   ├─ lib/
  │   │   └─ prisma.ts
  ├─ prisma/
  │   └─ schema.prisma
  ├─ public/
  │   └─ images/
  ├─ next.config.ts
  └─ README.md
```

## API Endpoints

### Product Endpoints

- `GET /api/products`  
  List all products.

- `POST /api/products`  
  Create a new product.  
  **Body:**

  ```json
  {
    "name": "string",
    "type": "Keyboard|Keycap|Switch",
    "categories": ["string"],
    "images": ["string"],
    "description": "string",
    "price": number,
    "availability": boolean,
    // Nested: keyboard, keycap, switch (see schema)
  }
  ```

- `GET /api/products/[id]`  
  Get a product by ID.

- `PATCH /api/products/[id]`  
  Update a product by ID.

- `DELETE /api/products/[id]`  
  Delete a product by ID.

### User Endpoints

- `GET /api/users/[id]`  
  Get user details (admin only).

- `DELETE /api/users/[id]`  
  Delete a user (admin only).

### Auth Endpoints

- `POST /api/auth/register`  
  Register a new user.  
  **Body:**

  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```

- `POST /api/auth/login`  
  Login a user.  
  **Body:**

  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

- `GET /api/auth/session`  
  Get the current session (NextAuth).

- `POST /api/auth/[...nextauth]`  
  NextAuth.js authentication handler (do not call directly).

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
