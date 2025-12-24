import { connectToDatabase } from "@/lib/db"
import bcrypt from "bcryptjs"

export async function POST(request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return Response.json({ message: "Email and password are required" }, { status: 400 })
    }

    const db = await connectToDatabase()
    const usersCollection = db.collection("users")

    // Find user
    const user = await usersCollection.findOne({ email })
    if (!user) {
      return Response.json({ message: "Invalid email or password" }, { status: 401 })
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return Response.json({ message: "Invalid email or password" }, { status: 401 })
    }

    return Response.json({
      userId: user._id,
      name: user.name,
      email: user.email,
    })
  } catch (error) {
    console.error("Login error:", error)
    return Response.json({ message: "Internal server error" }, { status: 500 })
  }
}
