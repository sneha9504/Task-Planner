import { MongoClient } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI environment variable is not set")
}

let cachedClient = null
let cachedDb = null

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return cachedDb
  }

  const client = new MongoClient(MONGODB_URI)
  await client.connect()

  const db = client.db("taskplanner")
  cachedClient = client
  cachedDb = db

  return db
}
