"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Image from "next/image"

export default function AccountPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-card border border-border rounded-lg p-8">
            <div className="flex items-center gap-6 mb-8">
              {user.photoURL ? (
                <Image
                  src={user.photoURL}
                  alt={user.displayName || "User"}
                  width={80}
                  height={80}
                  className="rounded-full"
                />
              ) : (
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground text-2xl font-bold">
                    {user.displayName?.[0] || user.email?.[0]?.toUpperCase()}
                  </span>
                </div>
              )}
              <div>
                <h1 className="text-2xl font-bold text-foreground">{user.displayName || "User"}</h1>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Account Information</h2>
                <div className="space-y-2">
                  <p><span className="font-medium">Email:</span> {user.email}</p>
                  <p><span className="font-medium">Name:</span> {user.displayName || "Not set"}</p>
                  <p><span className="font-medium">Account created:</span> {user.metadata.creationTime}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Quick Actions</h2>
                <div className="space-y-2">
                  <button className="w-full text-left px-4 py-2 border border-border rounded hover:bg-secondary">
                    View Wishlist
                  </button>
                  <button className="w-full text-left px-4 py-2 border border-border rounded hover:bg-secondary">
                    Order History
                  </button>
                  <button className="w-full text-left px-4 py-2 border border-border rounded hover:bg-secondary">
                    Account Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
