# Document Management Dashboard

## Overview

This Document Management Dashboard is a Next.js 14 application that allows users to upload, view, and manage documents. It features user authentication, document storage, and a user-friendly interface for document management.

## Features

- User Authentication (Sign up, Sign in, Sign out)
- Document Upload
- Document List with Pagination
- Document Preview
- Responsive Design

## Tech Stack

- Next.js 14
- TypeScript
- NextAuth.js for authentication
- Drizzle ORM with SQLite for database management
- Tailwind CSS for styling
- 0x0.st for file storage

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

## Setup Instructions

1. Clone the repository:

git clone https://github.com/imshivamb/document-management-dashboard.git

cd document-management-dashboard

2. Install dependencies:

npm install

3. Set up environment variables:
Create a `.env.local` file in the root directory and add the following:

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_here
DRIZZLE_DATABASE_URL=""

make sure to put your database url in the env, you can get one from a provider like neon.tech 
OR
you can run a postgres bg locally using docker by running this command

docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres

the url would look like this

postgresql://username:password@hostname:port/dbname


4. Set up the database:

npm run db:generate
npm run db:push

5. Run the development server:

npm run dev

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Database Management

- Generate migrations: `npm run db:generate`
- Apply migrations: `npm run db:push`
- Open Drizzle Studio: `npm run db:studio`

