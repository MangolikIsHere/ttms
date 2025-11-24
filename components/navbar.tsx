"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { useCart } from "@/components/cart-context"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { ShoppingCart, LogOut, LogIn, User, Menu, X } from "lucide-react"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { SearchBar } from "@/components/search-bar"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  const router = useRouter()
  const { user } = useAuth()
  const { items } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const accountRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountOpen(false)
      }
    }
    window.addEventListener("click", handleClick)
    return () => window.removeEventListener("click", handleClick)
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
    setMenuOpen(false)
    setAccountOpen(false)
    router.push("/")
  }

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <nav className="sticky top-0 z-40 bg-background border-b border-border shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-gradient-shift">
              MADshop
            </div>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md">
            <SearchBar />
          </div>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden lg:flex gap-6 items-center">
            <Link href="/products" className="text-foreground hover:text-primary transition-smooth">
              Products
            </Link>
            {user && (
              <Link href="/dashboard" className="text-foreground hover:text-primary transition-smooth">
                Dashboard
              </Link>
            )}
          </div>

          {/* Right side icons and buttons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Cart */}
            <Link href="/cart" className="relative hover:text-primary transition-smooth">
              <ShoppingCart size={24} className="hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-bounce-in">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Auth / Avatar */}
            {user ? (
              // Avatar + dropdown menu (replaces explicit Sign In / Logout UI)
              <div ref={accountRef} className="relative">
                <button
                  onClick={() => setAccountOpen((s) => !s)}
                  className="flex items-center gap-2 p-2 rounded-full hover:bg-muted/50 transition-all border border-transparent hover:border-primary/20"
                  title={user.displayName || user.email || "Account"}
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "avatar"}
                      className="w-8 h-8 rounded-full object-cover border-2 border-primary/30 shadow-sm"
                      onError={(e) => {
                        // Hide broken image and show fallback
                        const target = e.currentTarget
                        target.style.display = 'none'
                        const fallback = target.nextElementSibling as HTMLElement
                        if (fallback) {
                          fallback.style.display = 'flex'
                        }
                      }}
                    />
                  ) : null}
                  
                  {/* Show initials as fallback - always rendered but conditionally shown */}
                  <div 
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-primary via-primary to-accent text-white flex items-center justify-center font-bold text-sm shadow-md border-2 border-white/20"
                    style={{ display: user.photoURL ? 'none' : 'flex' }}
                  >
                    {(user.displayName?.charAt(0) || user.email?.charAt(0) || "U").toUpperCase()}
                  </div>
                </button>

                {accountOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-card border border-border rounded-xl shadow-xl z-50 py-2 animate-scaleIn backdrop-blur-sm">
                    <div className="px-4 py-3 border-b border-border/50">
                      <div className="flex items-center gap-3 mb-2">
                        {user.photoURL ? (
                          <img
                            src={user.photoURL}
                            alt="Profile"
                            className="w-10 h-10 rounded-full object-cover border-2 border-primary/20"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center font-bold text-sm">
                            {(user.displayName?.charAt(0) || user.email?.charAt(0) || "U").toUpperCase()
                            }
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-foreground truncate">
                            {user.displayName || user.email?.split("@")[0] || "User"}
                          </p>
                          <p className="text-xs text-foreground/60 truncate">{user.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setAccountOpen(false)
                          router.push("/dashboard")
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-muted/80 transition-colors flex items-center gap-3 text-sm"
                      >
                        <User size={16} className="text-primary" />
                        <span>Dashboard</span>
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 hover:bg-destructive/10 hover:text-destructive transition-colors flex items-center gap-3 text-sm"
                      >
                        <LogOut size={16} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/auth"
                className="flex items-center gap-2 px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-smooth btn-hover-glow text-sm"
              >
                <LogIn size={18} />
                <span className="hidden sm:inline">Sign In</span>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 hover:bg-muted rounded-lg transition-smooth"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-border py-4 space-y-3 animate-slideInFromTop">
            <div className="px-2">
              <SearchBar />
            </div>
            <Link
              href="/products"
              className="block px-4 py-2 hover:bg-muted rounded transition-smooth"
              onClick={() => setMenuOpen(false)}
            >
              Products
            </Link>
            {user && (
              <Link
                href="/dashboard"
                className="block px-4 py-2 hover:bg-muted rounded transition-smooth"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
            {!user && (
              <Link
                href="/auth"
                className="block px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-smooth"
                onClick={() => setMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
