"use client"

import Link from "next/link"
import Image from "next/image"
import { Heart, Star } from "lucide-react"
import { useState } from "react"

interface ProductCardProps {
  id: string
  title: string
  price: number
  mrp: number
  image: string
  rating: number
  ratingCount: number
  merchants: Array<{ name: string; badge: string }>
}

export function ProductCard({ id, title, price, mrp, image, rating, ratingCount, merchants }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const discount = Math.round(((mrp - price) / mrp) * 100)

  return (
    <div className="group bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-border h-full flex flex-col">
      {/* Image container */}
      <div className="relative w-full aspect-square bg-secondary overflow-hidden flex-shrink-0">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {discount > 0 && (
          <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground px-2 py-1 rounded text-sm font-bold">
            {discount}% OFF
          </div>
        )}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-3 left-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
        >
          <Heart className={`w-5 h-5 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
        </button>
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col gap-2 flex-grow">
        {/* Title */}
        <Link href={`/product/${id}`}>
          <h3 className="text-sm font-semibold text-foreground line-clamp-2 hover:text-primary transition-colors min-h-[2.5rem]">
            {title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-0.5">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold">{rating}</span>
          </div>
          <span className="text-xs text-muted-foreground" suppressHydrationWarning={true}>
            ({ratingCount.toLocaleString()})
          </span>
        </div>

        {/* Pricing */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-foreground" suppressHydrationWarning={true}>
            ₹{price.toLocaleString()}
          </span>
          {mrp > price && (
            <span className="text-sm text-muted-foreground line-through" suppressHydrationWarning={true}>
              ₹{mrp.toLocaleString()}
            </span>
          )}
        </div>

        {/* Merchant badges */}
        <div className="flex gap-2 flex-wrap flex-grow">
          {merchants.map((merchant) => (
            <span key={merchant.name} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded font-medium">
              {merchant.badge}
            </span>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex gap-2 pt-2 mt-auto">
          <Link
            href={`/product/${id}`}
            className="flex-1 bg-primary text-primary-foreground py-2 rounded font-medium text-sm hover:opacity-90 transition-opacity text-center"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}
