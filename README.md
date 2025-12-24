# 🗂️ TaskPlanner – Task Management App

A modern task planner built with Next.js and MongoDB. Designed for productivity, clarity, and efficient task management with a clean dark UI.

## 🔗 Project Links

- 🌐 **Live Demo:** (https://task-planner-sw.vercel.app/)
- 💻 **GitHub Repository:** (https://github.com/sneha9504/Task-Planner)

## 🚀 Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS
- **UI Components:** shadcn/ui (Radix UI)
- **Backend:** Next.js API Routes
- **Database:** MongoDB
- **Auth:** User-based dashboard context (basic)

## 📦 Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone <your-repo-url>
cd taskplanner
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string
```

**Example:**

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskplanner
```

### 4️⃣ Run the development server

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

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
