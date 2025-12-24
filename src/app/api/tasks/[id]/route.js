import { connectToDatabase } from "@/lib/db"
import { ObjectId } from "mongodb"

export async function PATCH(request, context) {
  try {
    const { id } = await context.params

    if (!id || !ObjectId.isValid(id)) {
      return Response.json(
        { message: "Invalid task ID" },
        { status: 400 }
      )
    }

    const updates = await request.json()
    const db = await connectToDatabase()

    const result = await db.collection("tasks").updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    )

    if (result.matchedCount === 0) {
      return Response.json(
        { message: "Task not found" },
        { status: 404 }
      )
    }

    return Response.json({ message: "Task updated successfully" })
  } catch (error) {
    console.error("Update task error:", error)
    return Response.json(
      { message: "Failed to update task" },
      { status: 500 }
    )
  }
}
export async function DELETE(request, context) {
  try {
    // ✅ IMPORTANT: await params
    const { id } = await context.params

    console.log("DELETE ID:", id)

    if (!id || !ObjectId.isValid(id)) {
      return Response.json(
        { message: "Invalid task ID" },
        { status: 400 }
      )
    }

    const db = await connectToDatabase()

    const result = await db.collection("tasks").deleteOne({
      _id: new ObjectId(id),
    })

    if (result.deletedCount === 0) {
      return Response.json(
        { message: "Task not found" },
        { status: 404 }
      )
    }

    return Response.json(
      { message: "Task deleted successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("DELETE error:", error)
    return Response.json(
      { message: "Failed to delete task" },
      { status: 500 }
    )
  }
}

