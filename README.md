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
```

### 5️⃣ Open in browser

Navigate to [http://localhost:3000](http://localhost:3000)

## ✨ Features

### 🧩 Task Management

- **Add tasks** with:
  - Title
  - Description
  - Priority (Low / Medium / High)
  - Status (Pending / In Progress / Completed)
  - Due date
- **Delete tasks** with confirmation alert
- **Edit tasks** to update details
- **Mark tasks as completed**

### 📋 Task Organization

- **Task list view** with all tasks displayed
- **Status-based grouping:**
  - 🟨 Pending
  - 🟦 In Progress
  - 🟩 Completed
- **Easy status updates** via dropdown or form
- **Organized task cards** with clear visual hierarchy

### 🔍 Search, Filter & Sort

- **Search** tasks by title or description
- **Filter by:**
  - Priority (Low / Medium / High)
  - Status (Pending / In Progress / Completed)
- **Real-time filtering** without page reload
- Built with `shadcn/ui Select` for dark-mode support

### ⏰ Smart Visual Indicators

- 🔴 **Overdue tasks** highlighted automatically
- 📅 **Due date** displayed on each task card
- **Priority badges** with color coding:
  - 🟢 Low
  - 🟡 Medium
  - 🔴 High

### 📊 Dashboard Stats

- Total tasks
- Completed tasks
- Pending tasks
- **Real-time updates** on any task action

### 🌙 UI & UX

- Dark-mode friendly interface
- Clean card-based layout
- Fully responsive design
- Accessible components (Radix UI)
- Intuitive task interactions

## 📁 Project Structure

```
taskplanner/
├── .next/                        # Next.js build output
├── node_modules/                 # Dependencies
├── public/                       # Static assets
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── login/
│   │   │   │   └── signup/
│   │   │   └── tasks/
│   │   │       └── [id]/
│   │   │           └── route.js  # CRUD operations for tasks
│   │   ├── components/
│   │   │   ├── ui/               # shadcn/ui components
│   │   │   ├── add-task-form.jsx # Task creation form
│   │   │   ├── auth-form.jsx     # Authentication form
│   │   │   ├── dashboard.jsx     # Main dashboard component
│   │   │   ├── task-list.jsx     # Task list display
│   │   │   └── theme-provider.jsx # Dark mode provider
│   │   ├── favicon.ico
│   │   ├── globals.css           # Global styles
│   │   ├── layout.js             # Root layout
│   │   └── page.jsx              # Home/landing page
│   └── lib/
│       ├── db.js                 # MongoDB connection
│       └── utils.ts              # Utility functions
├── .env                          # Environment variables
├── .gitignore
├── package.json                  # Dependencies
└── README.md                     # This file
```

## 🎯 Usage

### Creating a Task

1. Click the **"Add Task"** button
2. Fill in the task details:
   - Title (required)
   - Description
   - Priority level
   - Status
   - Due date
3. Click **"Create Task"**

### Managing Tasks

- **View tasks:** Browse all tasks in list view
- **Edit tasks:** Click on a task card to edit details
- **Delete tasks:** Click the delete icon (with confirmation)
- **Update status:** Change status via dropdown (Pending / In Progress / Completed)
- **Mark complete:** Update task status to Completed

### Filtering & Searching

- Use the **search bar** to find tasks by title/description
- Use **filter dropdowns** to narrow by priority or status
- Filters work in combination with search

## ⚠️ Assumptions

- Authentication is handled externally (user object passed to Dashboard)
- MongoDB is properly configured and accessible
- Modern browser with ES6+ support

## 🔧 Future Enhancements

- [ ] User authentication (NextAuth / JWT)
- [ ] Due date reminders & notifications
- [ ] Activity logs for task changes
- [ ] Role-based access (Admin / Member)


## 👨‍💻 Author

**Your Name**
- GitHub: (https://github.com/sneha9504)
- LinkedIn: (https://www.linkedin.com/in/snehawani/)

⭐ **Star this repository** if you find it helpful!

📧 **Questions?** Open an issue or reach out at snehawani4321@gmail.com
