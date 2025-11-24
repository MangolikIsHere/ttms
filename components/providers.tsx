"use client"

import type { ReactNode } from "react"
import { AuthProvider } from "@/components/auth-provider"
import { CartProvider } from "@/components/cart-context"
import { ThemeProvider } from "next-themes"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider 
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
        <CartProvider>{children}</CartProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
