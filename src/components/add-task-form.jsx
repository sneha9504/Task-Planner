"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export default function AddTaskForm({ onAdd }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("low")
  const [dueDate, setDueDate] = useState("")
  const [status, setStatus] = useState("pending")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return

    setLoading(true)
    await onAdd({ title, description, priority, dueDate: dueDate || null, status })
    setTitle("")
    setDescription("")
    setPriority("low")
    setDueDate("")
    setStatus("pending")
    setLoading(false)
  }

  return (
    <Card className="border-border p-6 w-fit">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Task Title */}
        <div>
          <label className="text-sm font-medium block mb-1">Task Title</label>
          <Input
            className="w-72"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task..."
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-medium block mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            required
            className="w-72 border rounded-md p-2 text-sm"
          />
        </div>

        {/* Priority + Status in one row */}
        <div className="flex gap-4">
          <div>
            <label className="text-sm font-medium block mb-1">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="border rounded-md p-2 text-sm"
              required
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border rounded-md p-2 text-sm" 
              required
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Due Date with calendar */}
        <div>
          <label className="text-sm font-medium block mb-1">Due Date</label>
          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-fit cursor-pointer"
            required
          />
        </div>

        {/* Submit */}
        <Button className="mt-2 w-fit px-6" disabled={loading}>
          {loading ? "Adding..." : "Add Task"}
        </Button>
      </form>
    </Card>
  )
}
