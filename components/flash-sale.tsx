"use client"

import { useState, useEffect } from "react"
import { ProductCard } from "./product-card"
import { Clock, Zap } from "lucide-react"

interface FlashSaleProps {
  products: Array<{
    id: string
    title: string
    price: number
    mrp: number
    image: string
    rating: number
    ratingCount: number
    merchants: Array<{ name: string; badge: string }>
  }>
}

export function FlashSale({ products }: FlashSaleProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-lg p-6 text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Zap className="w-8 h-8 text-yellow-300" />
          <h2 className="text-3xl font-bold">Flash Sale</h2>
        </div>
        
        {/* Countdown Timer */}
        <div className="flex items-center gap-2 bg-black/20 rounded-lg px-4 py-2">
          <Clock className="w-5 h-5" />
          <span className="text-sm font-medium">Ends in:</span>
          <div className="flex gap-1">
            <span className="bg-white text-red-500 px-2 py-1 rounded text-sm font-bold min-w-[32px] text-center">
              {timeLeft.hours.toString().padStart(2, '0')}
            </span>
            <span>:</span>
            <span className="bg-white text-red-500 px-2 py-1 rounded text-sm font-bold min-w-[32px] text-center">
              {timeLeft.minutes.toString().padStart(2, '0')}
            </span>
            <span>:</span>
            <span className="bg-white text-red-500 px-2 py-1 rounded text-sm font-bold min-w-[32px] text-center">
              {timeLeft.seconds.toString().padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg overflow-hidden">
            <ProductCard {...product} />
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-6">
        <button className="bg-white text-red-500 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
          View All Flash Sale Items
        </button>
      </div>
    </div>
  )
}
