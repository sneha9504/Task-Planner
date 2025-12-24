"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function TaskList({ tasks, onDelete, onToggle }) {
  const handleDelete = (taskId, taskTitle) => {
    if (window.confirm(`Delete task?\n\n"${taskTitle}"`)) {
      onDelete(taskId)
    }
  }

  return (
    <div className="w-full space-y-3">
      {tasks.map((task) => {
        const isOverdue =
          task.dueDate &&
          new Date(task.dueDate) < new Date() &&
          task.status !== "completed"

        const priorityStyles = {
          low: "bg-green-500/10 text-green-400",
          medium: "bg-yellow-500/10 text-yellow-400",
          high: "bg-red-500/10 text-red-400",
        }

        return (
          <Card
            key={task._id}
            className={`w-full p-4 rounded-xl border bg-card ${
              isOverdue
                ? "border-red-500/50 bg-red-500/5"
                : "border-border"
            }`}
          >
            {/* Header */}
            <div className="flex justify-between items-start gap-3">
              <div className="space-y-1">
                <p
                  className={`font-medium ${
                    task.completed
                      ? "line-through text-muted-foreground"
                      : "text-foreground"
                  }`}
                >
                  {task.title}
                </p>

                {task.priority && (
                  <span
                    className={`inline-block px-2 py-0.5 text-xs rounded-full font-medium ${priorityStyles[task.priority]}`}
                  >
                    {task.priority}
                  </span>
                )}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  handleDelete(task._id, task.title)
                }
                className="text-red-500 hover:bg-red-500/10"
              >
                Delete
              </Button>
            </div>

            {/* Description */}
            {task.description && (
              <p className="text-sm text-muted-foreground mt-2">
                {task.description}
              </p>
            )}

            {/* Footer */}
            <div className="flex justify-between items-center mt-3 text-xs text-muted-foreground">
              {task.dueDate && (
                <span>
                  Due:{" "}
                  {new Date(task.dueDate).toLocaleDateString()}
                </span>
              )}

              {isOverdue && (
                <span className="text-red-500 font-semibold">
                  ⏰ Overdue
                </span>
              )}
            </div>
          </Card>
        )
      })}
    </div>
  )
}
