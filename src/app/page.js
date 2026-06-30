"use client";

import Link from "next/link";
import { ArrowRight, Star, ShoppingCart, Heart, Shield, Sparkles, Award } from "lucide-react";
import { useStore } from "../store/useStore";
import { MOCK_PRODUCTS } from "../utils/mockData";

export default function Home() {
  const addToCart = useStore((state) => state.addToCart);
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const wishlist = useStore((state) => state.wishlist);

  // Get best selling items (first 4 items for featured display)
  const featuredProducts = MOCK_PRODUCTS.slice(0, 4);

  const isInWishlist = (id) => wishlist.some((item) => item.id === id);

  const handleQuickAdd = (product) => {
    // Default size/finish for quick add
    addToCart(product, {
      size: "A4",
      finish: "Standard Matte",
      quantity: 1
    });
  };

  return (
    <div className="space-y-16 pb-16 font-sans">
      {/* 1. Hero Section */}
      <section className="relative bg-gray-light overflow-hidden py-20 px-6 sm:px-12 lg:px-24 border-b border-border-light flex flex-col md:flex-row items-center justify-between gap-12 max-w-7xl mx-auto rounded-3xl mt-6 shadow-sm">
        <div className="space-y-6 max-w-xl text-left">
          <span className="inline-flex items-center gap-1 bg-accent/15 text-accent font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-wider">
            <Sparkles size={12} /> Premium 300 GSM Matte Prints
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-tight text-primary font-fredoka">
            Wall Art That <br />
            Defines <span className="text-accent">Your Style.</span>
          </h1>
          <p className="text-base text-gray-muted max-w-md">
            Discover a curated collection of aesthetic custom and split posters designed for F1, Anime, Movies, and sports enthusiasts.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/products" className="bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-full font-semibold shadow-md hover:shadow-lg transition flex items-center gap-2">
              Browse Collections <ArrowRight size={18} />
            </Link>
            <Link href="/custom" className="bg-white hover:bg-gray-light text-primary border border-border-light px-8 py-3.5 rounded-full font-semibold transition">
              Upload Custom Art 📁
            </Link>
          </div>
        </div>

        {/* Hero Banner Mockup Display */}
        <div className="relative w-full max-w-md aspect-4/3 md:aspect-square bg-white border-8 border-white shadow-2xl rounded-xl rotate-1 hover:rotate-0 transition duration-500 overflow-hidden flex items-center justify-center p-2 group">
          <img
            src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&auto=format&fit=crop&q=80"
            alt="Formula 1 wall mockup"
            className="w-full h-full object-cover rounded shadow-inner group-hover:scale-105 transition duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          <span className="absolute bottom-4 right-4 bg-white/90 text-[10px] font-bold text-primary px-3 py-1 rounded-full backdrop-blur-sm shadow-sm select-none uppercase tracking-wider">
            Mercedes AMG 4-Piece Split Layout
          </span>
        </div>
      </section>

      {/* 2. Trust Badges Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-border-light pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="p-3.5 bg-gray-light text-primary rounded-2xl"><Award size={24} /></div>
            <div>
              <h3 className="font-bold text-base text-primary font-fredoka">300 GSM Ultra-Matte Paper</h3>
              <p className="text-gray-muted text-xs mt-0.5">Heavy-duty cardstock reduces glare and sharpens contrast.</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="p-3.5 bg-gray-light text-accent rounded-2xl"><Sparkles size={24} /></div>
            <div>
              <h3 className="font-bold text-base text-primary font-fredoka">Split & Single Poster Layouts</h3>
              <p className="text-gray-muted text-xs mt-0.5">Choose panoramic split panels (3 to 9-piece) or single prints.</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="p-3.5 bg-gray-light text-green-600 rounded-2xl"><Shield size={24} /></div>
            <div>
              <h3 className="font-bold text-base text-primary font-fredoka">Fade-Resistant Vivid Inks</h3>
              <p className="text-gray-muted text-xs mt-0.5">Ensures colors remain deep and vibrant for decades.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Browse Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold font-fredoka text-primary">Browse Categories</h2>
            <p className="text-gray-muted text-xs mt-1">Handcrafted themes for your specific aesthetic space</p>
          </div>
          <Link href="/products" className="text-accent hover:text-accent-hover font-bold text-sm flex items-center gap-1 transition">
            See All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: "Anime", image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&auto=format&fit=crop&q=80" },
            { name: "Sports", image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=400&auto=format&fit=crop&q=80" },
            { name: "Movies", image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=80" },
            { name: "Gaming", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&auto=format&fit=crop&q=80" }
          ].map((cat, idx) => (
            <Link
              key={idx}
              href={`/products?category=${cat.name}`}
              className="group relative rounded-2xl overflow-hidden aspect-square shadow-sm hover:shadow-md border border-border-light transition"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-lg font-fredoka">{cat.name}</h3>
                <p className="text-gray-300 text-[10px] uppercase tracking-wider">Explore Prints &rarr;</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Trending Posters Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <h2 className="text-2xl font-bold font-fredoka text-primary">Trending Now</h2>
          <p className="text-gray-muted text-xs mt-1">Our best-selling posters and artistic compositions</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featuredProducts.map((prod) => (
            <div
              key={prod.id}
              className="group bg-white rounded-2xl overflow-hidden border border-border-light transition flex flex-col justify-between hover:shadow-sm"
            >
              {/* Product Card Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 flex items-center justify-center p-3 select-none">
                <Link href={`/products/${prod.id}`} className="w-full h-full">
                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    className="w-full h-full object-cover rounded border border-border-light shadow-inner group-hover:scale-103 transition duration-300"
                  />
                </Link>
                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(prod)}
                  className={`absolute top-5 right-5 p-2 bg-white/90 hover:bg-white rounded-full backdrop-blur-sm transition shadow-sm border border-border-light ${
                    isInWishlist(prod.id) ? "text-red-500 fill-red-500" : "text-gray-500"
                  }`}
                >
                  <Heart size={16} />
                </button>
                {/* Quick Add Overlay Button */}
                <div className="absolute bottom-4 inset-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden md:block">
                  <button
                    onClick={() => handleQuickAdd(prod)}
                    className="w-full bg-primary/95 text-white py-2 rounded-xl text-xs font-semibold hover:bg-primary transition shadow-md flex items-center justify-center gap-1.5"
                  >
                    <ShoppingCart size={12} /> Quick Add (A4)
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4 flex-grow flex flex-col justify-between space-y-2 border-t border-border-light text-left">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-accent uppercase tracking-wider">{prod.category}</span>
                  <Link href={`/products/${prod.id}`}>
                    <h3 className="font-bold text-sm text-gray-800 hover:text-accent transition line-clamp-1">
                      {prod.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-1 pt-0.5">
                    <Star size={12} className="text-amber-500 fill-amber-500" />
                    <span className="text-[11px] font-bold text-gray-700">{prod.rating}</span>
                    <span className="text-[10px] text-gray-muted">({prod.reviewsCount} reviews)</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-base font-bold text-primary">${prod.price}</span>
                    <span className="text-xs text-gray-muted line-through">${prod.originalPrice}</span>
                  </div>
                  <button
                    onClick={() => handleQuickAdd(prod)}
                    className="md:hidden bg-primary text-white p-2 rounded-lg hover:bg-primary-hover transition"
                  >
                    <ShoppingCart size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Custom Poster Uploader Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-md">
          {/* Subtle background decoration */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-accent opacity-10 blur-3xl rounded-full"></div>
          
          <div className="space-y-4 max-w-xl text-center md:text-left z-10">
            <span className="bg-white/10 text-accent font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-wider border border-white/10">
              Personalized Art Service
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-fredoka leading-tight">
              Create Your Own <br className="hidden sm:inline" /> Custom Wall Poster 🎨
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed max-w-md">
              Have an image or photo you love? Upload it, select your sizing, customize the layout cropping, and we will print it on 300 GSM cardstock with clean white borders.
            </p>
          </div>

          <div className="flex-shrink-0 z-10">
            <Link
              href="/custom"
              className="bg-white text-primary hover:bg-gray-light py-4 px-8 rounded-full font-bold shadow-lg transition flex items-center gap-2 text-sm"
            >
              Upload Your Artwork 📁
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
