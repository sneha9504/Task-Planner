import { connectToDatabase } from "@/lib/db"

export async function GET() {
  try {
    const db = await connectToDatabase()
    const tasks = await db.collection("tasks").find().sort({ createdAt: -1 }).toArray()

    return Response.json(tasks)
  } catch (error) {
    console.error("Get tasks error:", error)
    return Response.json({ message: "Failed to fetch tasks" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { title, description, priority, dueDate, status } = await request.json()

    if (!title) {
      return Response.json({ message: "Title is required" }, { status: 400 })
    }

    const db = await connectToDatabase()
   const result = await db.collection("tasks").insertOne({
  title,
  description: description || "",
  priority: priority || "low",
  dueDate: dueDate ? new Date(dueDate) : null,
  status: status || "pending",
  completed: status === "completed",
  createdAt: new Date(),
})
    return Response.json({
      _id: result.insertedId,
      title,
      description,
      priority,
      completed: false,
      createdAt: new Date(),
    })
  } catch (error) {
    console.error("Create task error:", error)
    return Response.json({ message: "Failed to create task" }, { status: 500 })
  }
}
