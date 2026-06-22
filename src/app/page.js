import Link from "next/link";
import { ArrowRight, Star, ShoppingCart, Heart, ShieldCheck, Truck, Headphones } from "lucide-react";

// Mock Products Data (Backend connect hone tak testing ke liye)
const FEATURED_PRODUCTS = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 199.99,
    rating: 4.8,
    reviews: 120,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    name: "Minimalist Leather Watch",
    price: 149.50,
    rating: 4.6,
    reviews: 85,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    name: "Ergonomic Office Chair",
    price: 299.99,
    rating: 4.9,
    reviews: 210,
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 4,
    name: "Ultra-Light Running Shoes",
    price: 89.99,
    rating: 4.5,
    reviews: 64,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60"
  }
];

const CATEGORIES = [
  { name: "Electronics", count: "1,200+ Products", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&auto=format&fit=crop&q=60" },
  { name: "Fashion", count: "4,500+ Products", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&auto=format&fit=crop&q=60" },
  { name: "Furniture", count: "800+ Products", image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=300&auto=format&fit=crop&q=60" },
  { name: "Accessories", count: "2,100+ Products", image: "https://images.unsplash.com/photo-1509319117193-57bab727e09d?w=300&auto=format&fit=crop&q=60" }
];

export default function Home() {
  return (
    <div className="space-y-16 pb-16">

      {/* 1. Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-900 to-purple-900 text-white overflow-hidden py-24 px-6 sm:px-12 lg:px-24">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <span className="inline-block bg-indigo-500/30 text-indigo-300 font-semibold px-4 py-1.5 rounded-full text-xs uppercase tracking-wider">
            Summer Season Sale
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-none">
            Upgrade Your Lifestyle, <br />
            <span className="text-indigo-400">Shop The Best Deals Today.</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Discover a curated collection of premium gadgets, high-end fashion, and comfortable furniture with quick delivery.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link href="/products" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-full font-semibold shadow-lg hover:shadow-indigo-500/20 transition flex items-center gap-2">
              Shop Now <ArrowRight size={18} />
            </Link>
            <Link href="/products" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3.5 rounded-full font-semibold transition">
              View Categories
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Core Features (Why Choose Us) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><Truck size={24} /></div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900">Free & Fast Delivery</h3>
              <p className="text-gray-500 text-sm mt-1">Free delivery on all orders above $50. Quick shipping guaranteed.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="p-3 bg-green-50 text-green-600 rounded-xl"><ShieldCheck size={24} /></div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900">Secure Payments</h3>
              <p className="text-gray-500 text-sm mt-1">Stripe & Razorpay integrated SSL-secured transaction gateway.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><Headphones size={24} /></div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900">24/7 Support Desk</h3>
              <p className="text-gray-500 text-sm mt-1">Direct support channel to assist with order tracking and refunds.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Browse Categories</h2>
            <p className="text-gray-500 text-sm mt-1">Explore our products sorted by lifestyle categories</p>
          </div>
          <Link href="/products" className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm flex items-center gap-1">
            See All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <Link key={idx} href={`/products?category=${cat.name}`} className="group relative rounded-2xl overflow-hidden aspect-square shadow-sm hover:shadow-md transition">
              <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-lg">{cat.name}</h3>
                <p className="text-gray-300 text-xs mt-0.5">{cat.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Featured Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
          <p className="text-gray-500 text-sm mt-1">Handpicked collection of our best selling items</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURED_PRODUCTS.map((prod) => (
            <div key={prod.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 transition flex flex-col">

              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                <button className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white hover:text-red-500 text-gray-600 rounded-full backdrop-blur-sm transition shadow-sm">
                  <Heart size={18} />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">{prod.category}</span>
                  <h3 className="font-semibold text-gray-800 group-hover:text-indigo-600 transition line-clamp-1">{prod.name}</h3>
                  <div className="flex items-center gap-1.5 pt-1">
                    <div className="flex items-center text-amber-500"><Star size={14} fill="currentColor" /></div>
                    <span className="text-sm font-semibold text-gray-700">{prod.rating}</span>
                    <span className="text-xs text-gray-400">({prod.reviews} reviews)</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                  <span className="text-xl font-bold text-gray-900">${prod.price}</span>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-xl transition flex items-center gap-1 text-sm font-medium shadow-sm hover:shadow-indigo-500/10">
                    <ShoppingCart size={16} /> Add
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
