"use client"

import { useState } from "react"
import AuthForm from "@/components/auth-form"
import Dashboard from "@/components/dashboard"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  const handleLogin = (userData) => {
    setUser(userData)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUser(null)
  }

  return (
    <main className="min-h-screen bg-background">
      {isLoggedIn ? <Dashboard user={user} onLogout={handleLogout} /> : <AuthForm onLogin={handleLogin} />}
    </main>
  )
}
