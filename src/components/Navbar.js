"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, Heart, Search, Menu, X, User } from "lucide-react";
import { useStore } from "../store/useStore";

export default function Navbar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const cart = useStore((state) => state.cart);
  const wishlist = useStore((state) => state.wishlist);
  const setCartDrawerOpen = useStore((state) => state.setCartDrawerOpen);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-border-light font-sans">
      {/* 1. Announcement Bar */}
      <div className="bg-primary text-white text-xs font-semibold py-2 px-4 text-center tracking-wider uppercase select-none">
        🎉 BUY 3 GET 2 FREE | FREE SHIPPING ON PREPAID ORDERS 🎉
      </div>

      {/* 2. Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tighter text-primary font-fredoka flex-shrink-0">
          POSTERIZED
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 text-sm font-semibold tracking-wide text-gray-700">
          <Link href="/products" className="hover:text-accent transition">Shop All</Link>
          <Link href="/products?category=Anime" className="hover:text-accent transition">Anime</Link>
          <Link href="/products?category=Sports" className="hover:text-accent transition">Sports</Link>
          <Link href="/products?category=Movies" className="hover:text-accent transition">Movies</Link>
          <Link href="/products?category=Gaming" className="hover:text-accent transition">Gaming</Link>
          <Link href="/custom" className="text-accent hover:text-accent-hover font-bold transition flex items-center gap-1">
            Custom Upload ✨
          </Link>
        </nav>

        {/* Search Bar - Desktop */}
        <form onSubmit={handleSearchSubmit} className="hidden lg:flex items-center relative max-w-xs w-full">
          <input
            type="text"
            placeholder="Search anime, sports, F1..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-1.5 border border-border-light rounded-full text-sm bg-gray-50 focus:outline-none focus:border-accent focus:bg-white transition"
          />
          <Search size={16} className="absolute left-3.5 text-gray-muted" />
        </form>

        {/* Action Buttons (Search, Wishlist, Cart) */}
        <div className="flex items-center gap-4">
          {/* User / Admin Icon */}
          <Link href="/admin" title="Admin Dashboard" className="p-2 text-gray-600 hover:text-primary transition rounded-full hover:bg-gray-light">
            <User size={20} />
          </Link>

          {/* Wishlist Link */}
          <Link href="/wishlist" className="relative p-2 text-gray-600 hover:text-primary transition rounded-full hover:bg-gray-light">
            <Heart size={20} />
            {wishlist.length > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-accent text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center animate-pulse">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart Icon Drawer Trigger */}
          <button
            onClick={() => setCartDrawerOpen(true)}
            className="relative p-2 text-gray-600 hover:text-primary transition rounded-full hover:bg-gray-light"
          >
            <ShoppingCart size={20} />
            {cartItemsCount > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-primary text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-primary transition rounded-full hover:bg-gray-light"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border-light bg-white px-4 py-4 space-y-3 flex flex-col font-semibold shadow-inner">
          {/* Search bar mobile */}
          <form onSubmit={handleSearchSubmit} className="relative w-full mb-2">
            <input
              type="text"
              placeholder="Search posters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-border-light rounded-xl text-sm focus:outline-none focus:border-accent"
            />
            <Search size={16} className="absolute left-3 top-2.5 text-gray-muted" />
          </form>

          <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-accent transition">Shop All</Link>
          <Link href="/products?category=Anime" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-accent transition">Anime</Link>
          <Link href="/products?category=Sports" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-accent transition">Sports</Link>
          <Link href="/products?category=Movies" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-accent transition">Movies</Link>
          <Link href="/products?category=Gaming" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-accent transition">Gaming</Link>
          <Link href="/custom" onClick={() => setMobileMenuOpen(false)} className="py-1 text-accent font-bold transition">
            Custom Upload ✨
          </Link>
        </div>
      )}
    </header>
  );
}
