# Event Calendar App

A modern event planning application built with Next.js that allows users to create, manage, and schedule events.

## Features

- User authentication via OAuth (GitHub and Google)
- Create and manage events with titles, descriptions, date ranges, and color-coded labels
- Calendar visualization of events
- Personal dashboard to track your events

## Tech Stack

- Next.js 15.2.4 with React 19
- NextAuth.js for authentication
- PostgreSQL with Prisma ORM
- TailwindCSS and PrimeReact for UI components
- TypeScript for type safety

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```
Open `.env` and set the prisma DB URL to your PostgreSQL database. After that, run the following commands to set up your database:
```bash
# Generate Prisma client
npx prisma generate
# Run migrations
npx prisma migrate dev --name init
```


Open [http://localhost:3000](http://localhost:3000) in your browser.

