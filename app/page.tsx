import { Header } from "@/components/header"
import { CategoryNav } from "@/components/category-nav"
import { HeroCarousel } from "@/components/hero-carousel"
import { ProductCard } from "@/components/product-card"
import { Footer } from "@/components/footer"
import { FlashSale } from "@/components/flash-sale"

// Mock data for featured products
const featuredProducts = [
  {
    id: "1",
    title: "Sony WH-1000XM5 Wireless Headphones",
    price: 24999,
    mrp: 29999,
    image: "/wireless-headphones.png",
    rating: 4.6,
    ratingCount: 3421,
    merchants: [
      { name: "amazon", badge: "Amazon" },
      { name: "flipkart", badge: "Flipkart" },
    ],
  },
  {
    id: "2",
    title: "Apple MacBook Air M3 13-inch",
    price: 99999,
    mrp: 109999,
    image: "/macbook-air.jpg",
    rating: 4.7,
    ratingCount: 2154,
    merchants: [
      { name: "amazon", badge: "Amazon" },
      { name: "flipkart", badge: "Flipkart" },
    ],
  },
  {
    id: "3",
    title: "Samsung Galaxy S24 Ultra",
    price: 84999,
    mrp: 99999,
    image: "/galaxy-s24.jpg",
    rating: 4.5,
    ratingCount: 4521,
    merchants: [
      { name: "amazon", badge: "Amazon" },
      { name: "flipkart", badge: "Flipkart" },
    ],
  },
  {
    id: "4",
    title: "Dyson V15 Detect Cordless Vacuum",
    price: 54999,
    mrp: 64999,
    image: "/dyson-vacuum.jpg",
    rating: 4.4,
    ratingCount: 892,
    merchants: [
      { name: "amazon", badge: "Amazon" },
      { name: "flipkart", badge: "Flipkart" },
    ],
  },
  {
    id: "5",
    title: "PUMA Men's Athletic Running Shoes",
    price: 3999,
    mrp: 5999,
    image: "/puma-shoes.jpg",
    rating: 4.2,
    ratingCount: 1876,
    merchants: [
      { name: "amazon", badge: "Amazon" },
      { name: "flipkart", badge: "Flipkart" },
    ],
  },
  {
    id: "6",
    title: "L'Oreal Paris Revitalift Anti-Aging Face Cream",
    price: 1299,
    mrp: 1899,
    image: "/loreal-cream.jpg",
    rating: 4.5,
    ratingCount: 2341,
    merchants: [
      { name: "amazon", badge: "Amazon" },
      { name: "flipkart", badge: "Flipkart" },
    ],
  },
  {
    id: "7",
    title: "Nike Dri-FIT Training Shorts",
    price: 1999,
    mrp: 2999,
    image: "/nike-shorts.jpg",
    rating: 4.4,
    ratingCount: 876,
    merchants: [
      { name: "amazon", badge: "Amazon" },
      { name: "flipkart", badge: "Flipkart" },
    ],
  },
  {
    id: "8",
    title: "Atomic Habits by James Clear",
    price: 399,
    mrp: 599,
    image: "/atomic-habits.jpg",
    rating: 4.7,
    ratingCount: 5432,
    merchants: [
      { name: "amazon", badge: "Amazon" },
      { name: "flipkart", badge: "Flipkart" },
    ],
  },
]

// Mock data for flash sale products
const flashSaleProducts = [
  {
    id: "flash-1",
    title: "iPhone 15 Pro Max 256GB",
    price: 134900,
    mrp: 159900,
    image: "/iphone-15-pro.jpg",
    rating: 4.8,
    ratingCount: 1234,
    merchants: [
      { name: "amazon", badge: "Amazon" },
      { name: "flipkart", badge: "Flipkart" },
    ],
  },
  {
    id: "flash-2",
    title: "Sony PlayStation 5 Console",
    price: 49990,
    mrp: 54990,
    image: "/ps5-console.jpg",
    rating: 4.7,
    ratingCount: 892,
    merchants: [
      { name: "amazon", badge: "Amazon" },
      { name: "flipkart", badge: "Flipkart" },
    ],
  },
  {
    id: "flash-3",
    title: "Dell XPS 13 Laptop",
    price: 89999,
    mrp: 109999,
    image: "/dell-xps.jpg",
    rating: 4.6,
    ratingCount: 567,
    merchants: [
      { name: "amazon", badge: "Amazon" },
      { name: "flipkart", badge: "Flipkart" },
    ],
  },
  {
    id: "flash-4",
    title: "Apple Watch Series 9",
    price: 41900,
    mrp: 45900,
    image: "/apple-watch.jpg",
    rating: 4.5,
    ratingCount: 2341,
    merchants: [
      { name: "amazon", badge: "Amazon" },
      { name: "flipkart", badge: "Flipkart" },
    ],
  },
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <CategoryNav />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Carousel */}
          <HeroCarousel />

          {/* Flash Sale Section */}
          <section className="mt-12">
            <FlashSale products={flashSaleProducts} />
          </section>

          {/* Featured Products Section */}
          <section className="mt-12">
            <h2 className="text-3xl font-bold mb-8 text-foreground">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </section>

          {/* Categories Grid */}
          <section className="mt-16">
            <h2 className="text-3xl font-bold mb-8 text-foreground">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: "Electronics", icon: "📱", slug: "electronics" },
                { name: "Fashion", icon: "👗", slug: "fashion" },
                { name: "Home", icon: "🏠", slug: "home-appliances" },
                { name: "Beauty", icon: "💄", slug: "beauty" },
                { name: "Sports", icon: "⚽", slug: "sports" },
                { name: "Books", icon: "📚", slug: "books" },
              ].map((cat) => (
                <a
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="flex flex-col items-center gap-3 p-4 rounded-lg bg-card border border-border hover:border-primary hover:shadow-md transition-all"
                >
                  <span className="text-4xl">{cat.icon}</span>
                  <span className="text-center font-semibold text-sm">{cat.name}</span>
                </a>
              ))}
            </div>
          </section>

          {/* Value Proposition */}
          <section className="mt-16 bg-primary text-primary-foreground rounded-lg p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">100%</div>
                <p className="text-sm opacity-90">Price Comparison</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">10k+</div>
                <p className="text-sm opacity-90">Products Available</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">2+</div>
                <p className="text-sm opacity-90">Trusted Merchants</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
