import { connectToDatabase } from "@/lib/db"
import bcrypt from "bcryptjs"

export async function POST(request) {
  try {
    const { email, password, name } = await request.json()

    if (!email || !password) {
      return Response.json({ message: "Email and password are required" }, { status: 400 })
    }

    const db = await connectToDatabase()
    const usersCollection = db.collection("users")

    // Check if user exists
    const existingUser = await usersCollection.findOne({ email })
    if (existingUser) {
      return Response.json({ message: "User already exists" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const result = await usersCollection.insertOne({
      email,
      name: name || email,
      password: hashedPassword,
      createdAt: new Date(),
    })

    return Response.json({
      userId: result.insertedId,
      name: name || email,
      message: "User created successfully",
    })
  } catch (error) {
    console.error("Signup error:", error)
    return Response.json({ message: "Internal server error" }, { status: 500 })
  }
}
