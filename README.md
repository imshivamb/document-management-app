

# Document Management Dashboard

## Overview

This Document Management Dashboard is a Next.js 14 application that allows users to upload, view, and manage documents. It features user authentication, document storage, and a user-friendly interface for document management.

## Features

- **User Authentication**: Sign up, Sign in, Sign out
- **Document Upload**
- **Document List**: With Pagination
- **Document Preview**
- **Responsive Design**

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Authentication**: NextAuth.js
- **Database Management**: Drizzle ORM with SQLite
- **Styling**: Tailwind CSS
- **File Storage**: 0x0.st

## Prerequisites

- **Node.js**: v14 or later
- **npm**: v6 or later

## Setup Instructions

1. **Clone the repository:**
    ```sh
    git clone https://github.com/imshivamb/document-management-dashboard.git
    cd document-management-dashboard
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Set up environment variables:**
    Create a `.env.local` file in the root directory and add the following:
    ```env
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=your_secret_here
    DRIZZLE_DATABASE_URL=""
    ```

    Ensure to set your database URL in the environment variable. You can obtain one from a provider like neon.tech, or run a PostgreSQL instance locally using Docker with the following command:
    ```sh
    docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres
    ```

    The URL format would be:
    ```
    postgresql://username:password@hostname:port/dbname
    ```

4. **Set up the database:**
    ```sh
    npm run db:generate
    npm run db:push
    ```

5. **Run the development server:**
    ```sh
    npm run dev
    ```

6. **Open your browser:**
    Go to [http://localhost:3000](http://localhost:3000) to see the application.

## Database Management

- **Generate migrations:**
    ```sh
    npm run db:generate
    ```
- **Apply migrations:**
    ```sh
    npm run db:push
    ```
- **Open Drizzle Studio:**
    ```sh
    npm run db:studio
    ```


