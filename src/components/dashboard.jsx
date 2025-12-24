"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import AddTaskForm from "./add-task-form"
import TaskList from "./task-list"

import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const COLUMNS = [
  { key: "pending", title: "Pending" },
  { key: "in-progress", title: "In Progress" },
  { key: "completed", title: "Completed" },
]

export default function Dashboard({ user, onLogout }) {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    const res = await fetch("/api/tasks")
    const data = await res.json()
    setTasks(data || [])
    setLoading(false)
  }

  const handleAddTask = async (taskData) => {
    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    })
    fetchTasks()
  }

  const handleDeleteTask = async (id) => {
    await fetch(`/api/tasks/${id}`, { method: "DELETE" })
    setTasks((prev) => prev.filter((t) => t._id !== id))
  }

  const handleToggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task._id === id
          ? {
            ...task,
            status:
              task.status === "pending"
                ? "in-progress"
                : task.status === "in-progress"
                  ? "completed"
                  : "completed",
            completed: task.status !== "completed",
          }
          : task
      )
    )
  }

  // ✅ FILTER
  const filteredTasks = tasks.filter((task) => {
    const q = search.toLowerCase()
    return (
      (task.title.toLowerCase().includes(q) ||
        task.description?.toLowerCase().includes(q)) &&
      (priorityFilter === "all" ||
        task.priority === priorityFilter) &&
      (statusFilter === "all" || task.status === statusFilter)
    )
  })

  // ✅ STATS (FIXED)
  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "completed").length,
    pending: tasks.filter((t) => t.status !== "completed").length,
  }

  // ✅ DRAG HANDLER (FIXED)
  const handleDragEnd = (result) => {
    if (!result.destination) return

    const taskId = result.draggableId
    const newStatus = result.destination.droppableId

    setTasks((prev) =>
      prev.map((task) =>
        task._id === taskId
          ? {
            ...task,
            status: newStatus,
            completed: newStatus === "completed",
          }
          : task
      )
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">TaskPlanner</h1>
            <p className="text-sm text-muted-foreground">
              Welcome, {user?.name || user?.email}
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() => {
              if (window.confirm("Are you sure you want to sign out?"))
                onLogout()
            }}
          >
            Sign Out
          </Button>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 py-8 ">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6">
            <p className="text-sm text-muted-foreground">Total Tasks</p>
            <p className="text-3xl font-bold">{stats.total}</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground">Completed</p>
            <p className="text-3xl font-bold text-primary">
              {stats.completed}
            </p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-3xl font-bold text-accent">
              {stats.pending}
            </p>
          </Card>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* LEFT */}
          <div className="lg:w-[320px] shrink-0">
            <h2 className="text-lg font-semibold mb-4">
              Add New Task
            </h2>
            <AddTaskForm onAdd={handleAddTask} />
          </div>

          {/* RIGHT */}
          <div className="flex-1 min-w-0 space-y-4">
            {/* Search + Filters */}
            <div className="flex flex-wrap gap-3">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="border rounded px-3 py-2 text-sm "
              />

              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Priorities" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>


              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>



            </div>

            {/* 🟦 KANBAN */}
            {loading ? (
              <Card className="p-8 text-center">Loading...</Card>
            ) : (
              <DragDropContext onDragEnd={handleDragEnd}>
                <div
                  className="
    grid 
    grid-flow-col 
    auto-cols-fr 
    2xl:auto-cols-[1fr_1fr_1fr]

    gap-5
    items-start
  "
                >
                  {COLUMNS.map((col) => (
                    <Droppable
                      droppableId={col.key}
                      key={col.key}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className="bg-muted/40 rounded-lg p-3 min-h-[220px]"
                        >
                          <h3 className="font-semibold mb-3">
                            {col.title}
                          </h3>

                          <div className="flex flex-col gap-3 w-full">

                            {filteredTasks
                              .filter(
                                (task) =>
                                  task.status === col.key
                              )
                              .map((task, index) => (
                                <Draggable
                                  key={task._id}
                                  draggableId={task._id}
                                  index={index}
                                >
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className="w-full"
                                    >
                                      <TaskList
                                        tasks={[task]}
                                        onDelete={
                                          handleDeleteTask
                                        }
                                        onToggle={
                                          handleToggleTask
                                        }
                                      />
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                          </div>

                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  ))}
                </div>
              </DragDropContext>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
