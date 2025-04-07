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

## Docker

```bash

docker build -t nextjs-app .

# Run the container
docker run -d --name nextjs-app -p 3000:3000 nextjs-app

```