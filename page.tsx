"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Shield, Lock } from "lucide-react"

export default function ComputerScreen() {
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isBooting, setIsBooting] = useState(true)
  const [bootMessages, setBootMessages] = useState<string[]>([])

  const correctPassword = "access123" // Demo password

  useEffect(() => {
    const bootSequence = [
      "Initializing system...",
      "Loading kernel modules...",
      "Checking file system integrity...",
      "Starting network services...",
      "System boot complete.",
      "Secure terminal ready.",
    ]

    let index = 0
    const interval = setInterval(() => {
      if (index < bootSequence.length) {
        setBootMessages((prev) => [...prev, bootSequence[index]])
        index++
      } else {
        setIsBooting(false)
        clearInterval(interval)
      }
    }, 800)

    return () => clearInterval(interval)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (password === correctPassword) {
      setMessage("Access granted. Welcome.")
      setIsAuthenticated(true)
    } else {
      setMessage("Access denied. Incorrect password.")
      setTimeout(() => setMessage(""), 3000)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md relative">
        {/* Screen glow effect */}
        <div className="absolute inset-0 bg-blue-500/5 rounded-lg blur-xl"></div>

        {/* Computer screen */}
        <div className="relative bg-gray-900 border-2 border-gray-800 rounded-lg overflow-hidden shadow-[0_0_15px_rgba(0,100,200,0.3)]">
          {/* Screen header */}
          <div className="bg-gray-800 p-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-blue-400" />
              <span className="text-xs text-gray-400">SECURE TERMINAL</span>
            </div>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
          </div>

          {/* Screen content */}
          <div className="p-6 h-[350px] flex flex-col">
            {isBooting ? (
              <div className="font-mono text-green-500 text-sm flex-1 overflow-y-auto">
                {bootMessages.map((msg, i) => (
                  <div key={i} className="mb-2">
                    <span className="text-blue-400">{">"}</span> {msg}
                  </div>
                ))}
              </div>
            ) : isAuthenticated ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                  <Shield size={32} className="text-green-500" />
                </div>
                <h2 className="text-green-500 text-xl font-bold mb-2">Access Granted</h2>
                <p className="text-gray-400">Welcome to the system.</p>
              </div>
            ) : (
              <div className="flex-1 flex flex-col">
                <div className="flex-1 flex flex-col items-center justify-center text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                    <Lock size={32} className="text-blue-500" />
                  </div>
                  <h2 className="text-white text-xl font-bold mb-2">Authentication Required</h2>
                  <p className="text-gray-400">Please enter your password to continue.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <div className="relative">
                      <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        className="bg-gray-800 border-gray-700 text-white pr-10"
                        autoComplete="off"
                      />
                      <Lock size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    </div>
                    {message && (
                      <p className={`text-sm ${message.includes("denied") ? "text-red-500" : "text-green-500"}`}>
                        {message}
                      </p>
                    )}
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    Authenticate
                  </Button>
                </form>
              </div>
            )}
          </div>

          {/* Scan line effect */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-blue-900/5 to-transparent opacity-20 animate-scan"></div>
        </div>
      </div>
    </div>
  )
}

