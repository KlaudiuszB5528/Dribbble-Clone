# Known Issues

Currently there's an issue with the next's caching I couldn't resolve(tried some solutions from [Next Docs](https://nextjs.org/docs/app/api-reference/functions/revalidatePath) and adding variables to segment forcing revalidate). Switching to client component would solve the issue but it's not a good solution. Probably the issue will be fix in the future releases.

# Dribbble-Clone

Dribbble clone created to practice Next.js 13 along with Grafbase, NextAuth.js

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev

# to run grafbase
npx grafbase dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Live Demo

You can see the live demo [here](https://dribbble-clone-nu.vercel.app/)

## Screenshots

![Main Page](/github/1.png)
![Create Project](/github/2.png)
![Profile Page](/github/3.png)
![Profile Page Menu Opened](/github/4.png)
