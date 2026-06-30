"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, Heart, ShoppingCart, Star, SlidersHorizontal, X, ArrowUpDown } from "lucide-react";
import { useStore } from "../../store/useStore";
import { MOCK_PRODUCTS } from "../../utils/mockData";
import Link from "next/link";

function CatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL Parameter synchronization
  const categoryParam = searchParams.get("category");
  const searchParam = searchParams.get("search");

  // State Management
  const [searchVal, setSearchVal] = useState(searchParam || "");
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [showOnlySplits, setShowOnlySplits] = useState(false);
  const [sortBy, setSortBy] = useState("Default");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sync state with URL params
  useEffect(() => {
    setSelectedCategory(categoryParam || "All");
  }, [categoryParam]);

  useEffect(() => {
    setSearchVal(searchParam || "");
  }, [searchParam]);

  const addToCart = useStore((state) => state.addToCart);
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const wishlist = useStore((state) => state.wishlist);

  const isInWishlist = (id) => wishlist.some((item) => item.id === id);

  const handleQuickAdd = (product) => {
    addToCart(product, {
      size: "A4",
      finish: "Standard Matte",
      quantity: 1
    });
  };

  // Filter & Sort Logic
  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    // 1. Search Query filter
    const matchesSearch =
      !searchVal ||
      product.name.toLowerCase().includes(searchVal.toLowerCase()) ||
      product.category.toLowerCase().includes(searchVal.toLowerCase()) ||
      product.description.toLowerCase().includes(searchVal.toLowerCase());

    // 2. Category filter
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    // 3. Price Range filter
    let matchesPrice = true;
    if (selectedPriceRange === "under-200") {
      matchesPrice = product.price < 200;
    } else if (selectedPriceRange === "200-300") {
      matchesPrice = product.price >= 200 && product.price <= 300;
    } else if (selectedPriceRange === "above-300") {
      matchesPrice = product.price > 300;
    }

    // 4. Split Poster filter
    const matchesSplit = !showOnlySplits || product.isSplit;

    return matchesSearch && matchesCategory && matchesPrice && matchesSplit;
  }).sort((a, b) => {
    // Sort Logic
    if (sortBy === "price-low-high") return a.price - b.price;
    if (sortBy === "price-high-low") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0; // Default
  });

  const clearAllFilters = () => {
    setSearchVal("");
    setSelectedCategory("All");
    setSelectedPriceRange("All");
    setShowOnlySplits(false);
    setSortBy("Default");
    router.push("/products");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    router.push(`/products?search=${encodeURIComponent(searchVal)}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      
      {/* 1. Header with Catalog Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-light pb-6 text-left">
        <div>
          <h1 className="text-3xl font-bold font-fredoka text-primary">
            {selectedCategory === "All" ? "Shop All Posters" : `${selectedCategory} Collection`}
          </h1>
          <p className="text-gray-muted text-xs mt-1">
            Displaying {filteredProducts.length} high-resolution prints
          </p>
        </div>

        {/* Search Bar inside Catalog */}
        <form onSubmit={handleSearchSubmit} className="relative max-w-sm w-full">
          <input
            type="text"
            placeholder="Search poster titles, descriptions..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border-light rounded-full text-sm bg-white focus:outline-none focus:border-accent"
          />
          <Search size={16} className="absolute left-3.5 top-3 text-gray-muted" />
        </form>
      </div>

      {/* 2. Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Filters - Desktop */}
        <aside className="hidden lg:block space-y-6 text-left border-r border-border-light pr-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm uppercase tracking-wider text-primary flex items-center gap-1.5">
              <SlidersHorizontal size={16} /> Filters
            </h3>
            <button onClick={clearAllFilters} className="text-xs text-accent hover:underline font-semibold">
              Clear All
            </button>
          </div>

          {/* Category List */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-xs text-primary uppercase">Categories</h4>
            <div className="flex flex-col gap-1.5 text-sm text-gray-600">
              {["All", "Anime", "Sports", "Movies", "Gaming", "Inspirational"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    router.push(cat === "All" ? "/products" : `/products?category=${cat}`);
                  }}
                  className={`text-left py-0.5 hover:text-primary transition ${
                    selectedCategory === cat ? "text-accent font-bold" : ""
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Price Ranges */}
          <div className="space-y-2.5 pt-4 border-t border-border-light">
            <h4 className="font-bold text-xs text-primary uppercase">Price Range</h4>
            <div className="flex flex-col gap-2 text-xs text-gray-700">
              {[
                { code: "All", label: "Any Price" },
                { code: "under-200", label: "Under $200" },
                { code: "200-300", label: "$200 - $300" },
                { code: "above-300", label: "Above $300" }
              ].map((range) => (
                <label key={range.code} className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="radio"
                    name="priceRange"
                    checked={selectedPriceRange === range.code}
                    onChange={() => setSelectedPriceRange(range.code)}
                    className="accent-primary"
                  />
                  <span>{range.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Layout type */}
          <div className="space-y-2.5 pt-4 border-t border-border-light">
            <h4 className="font-bold text-xs text-primary uppercase">Layout Config</h4>
            <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showOnlySplits}
                onChange={(e) => setShowOnlySplits(e.target.checked)}
                className="rounded accent-primary border-border-light h-4 w-4"
              />
              <span>Only Split Posters</span>
            </label>
          </div>
        </aside>

        {/* Main Grid Section */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Sorting / Filter Bar - Mobile Toggle */}
          <div className="flex items-center justify-between bg-gray-light/40 border border-border-light p-3 rounded-2xl">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-1.5 text-xs font-bold text-primary px-3 py-1.5 bg-white border border-border-light rounded-xl shadow-sm"
            >
              <SlidersHorizontal size={14} /> Filter
            </button>

            <div className="flex items-center gap-2 ml-auto text-xs text-gray-700">
              <ArrowUpDown size={14} className="text-gray-muted" />
              <span className="font-semibold text-gray-500">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-border-light px-2.5 py-1.5 rounded-xl focus:outline-none"
              >
                <option value="Default">Default Popularity</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating">Average Rating</option>
              </select>
            </div>
          </div>

          {/* Active search query tag display */}
          {(searchVal || selectedCategory !== "All" || selectedPriceRange !== "All" || showOnlySplits) && (
            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600 text-left">
              <span>Active filters:</span>
              {selectedCategory !== "All" && (
                <span className="bg-gray-light px-2.5 py-1 rounded-full flex items-center gap-1">
                  Category: {selectedCategory}
                  <button onClick={() => { setSelectedCategory("All"); router.push("/products"); }}><X size={10} /></button>
                </span>
              )}
              {selectedPriceRange !== "All" && (
                <span className="bg-gray-light px-2.5 py-1 rounded-full flex items-center gap-1">
                  Price: {selectedPriceRange}
                  <button onClick={() => setSelectedPriceRange("All")}><X size={10} /></button>
                </span>
              )}
              {showOnlySplits && (
                <span className="bg-gray-light px-2.5 py-1 rounded-full flex items-center gap-1">
                  Splits Only
                  <button onClick={() => setShowOnlySplits(false)}><X size={10} /></button>
                </span>
              )}
              {searchVal && (
                <span className="bg-gray-light px-2.5 py-1 rounded-full flex items-center gap-1 font-semibold text-accent">
                  Search: &quot;{searchVal}&quot;
                  <button onClick={() => { setSearchVal(""); router.push("/products"); }}><X size={10} /></button>
                </span>
              )}
            </div>
          )}

          {/* Product Grid Render */}
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <Search size={40} className="mx-auto text-gray-300 animate-pulse" />
              <h3 className="font-bold text-lg text-primary font-fredoka">No Products Found</h3>
              <p className="text-gray-muted text-xs">Try adjusting your filters or search keywords.</p>
              <button
                onClick={clearAllFilters}
                className="bg-primary text-white text-xs font-semibold py-2 px-6 rounded-full"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-border-light transition flex flex-col justify-between hover:shadow-sm"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 flex items-center justify-center p-3 select-none">
                    <Link href={`/products/${prod.id}`} className="w-full h-full">
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        className="w-full h-full object-cover rounded border border-border-light shadow-inner group-hover:scale-103 transition duration-300"
                      />
                    </Link>
                    <button
                      onClick={() => toggleWishlist(prod)}
                      className={`absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-full backdrop-blur-sm transition shadow-sm border border-border-light ${
                        isInWishlist(prod.id) ? "text-red-500 fill-red-500" : "text-gray-500"
                      }`}
                    >
                      <Heart size={14} />
                    </button>
                    {/* Hover add cart trigger */}
                    <div className="absolute bottom-3 inset-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden md:block">
                      <button
                        onClick={() => handleQuickAdd(prod)}
                        className="w-full bg-primary/95 text-white py-1.5 rounded-lg text-[11px] font-semibold hover:bg-primary transition shadow-md flex items-center justify-center gap-1"
                      >
                        <ShoppingCart size={11} /> Quick Add (A4)
                      </button>
                    </div>
                  </div>

                  {/* Info details */}
                  <div className="p-3.5 flex-grow flex flex-col justify-between space-y-2 border-t border-border-light text-left">
                    <div className="space-y-0.5">
                      <span className="text-[9px] font-bold text-accent uppercase tracking-wider">{prod.category}</span>
                      <Link href={`/products/${prod.id}`}>
                        <h3 className="font-bold text-xs text-gray-800 hover:text-accent transition line-clamp-1">
                          {prod.name}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-1">
                        <Star size={10} className="text-amber-500 fill-amber-500" />
                        <span className="text-[10px] font-bold text-gray-700">{prod.rating}</span>
                        <span className="text-[9px] text-gray-muted">({prod.reviewsCount})</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-0.5">
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm font-bold text-primary">${prod.price}</span>
                        <span className="text-[10px] text-gray-muted line-through">${prod.originalPrice}</span>
                      </div>
                      <button
                        onClick={() => handleQuickAdd(prod)}
                        className="md:hidden bg-primary text-white p-1.5 rounded-lg transition"
                      >
                        <ShoppingCart size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Sidebar Filters Backdrop panel */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden flex justify-end">
          <div className="w-80 bg-white h-full p-6 flex flex-col justify-between shadow-2xl relative animate-slide-in">
            <div className="space-y-6 text-left">
              <div className="flex items-center justify-between pb-3 border-b border-border-light">
                <h3 className="font-bold text-sm uppercase text-primary">Filters</h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1 hover:bg-gray-light rounded-full text-gray-500"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Categories */}
              <div className="space-y-2">
                <h4 className="font-bold text-xs uppercase text-primary">Categories</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {["All", "Anime", "Sports", "Movies", "Gaming", "Inspirational"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        router.push(cat === "All" ? "/products" : `/products?category=${cat}`);
                      }}
                      className={`text-left p-2 rounded-lg border transition ${
                        selectedCategory === cat ? "bg-primary border-primary text-white font-bold" : "border-border-light"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <h4 className="font-bold text-xs uppercase text-primary">Price</h4>
                <div className="flex flex-col gap-2 text-xs text-gray-700">
                  {[
                    { code: "All", label: "Any Price" },
                    { code: "under-200", label: "Under $200" },
                    { code: "200-300", label: "$200 - $300" },
                    { code: "above-300", label: "Above $300" }
                  ].map((range) => (
                    <label key={range.code} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="priceRangeMobile"
                        checked={selectedPriceRange === range.code}
                        onChange={() => setSelectedPriceRange(range.code)}
                        className="accent-primary"
                      />
                      <span>{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Layout */}
              <div className="space-y-2">
                <h4 className="font-bold text-xs uppercase text-primary">Layout</h4>
                <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showOnlySplits}
                    onChange={(e) => setShowOnlySplits(e.target.checked)}
                    className="accent-primary h-4 w-4 border-border-light"
                  />
                  <span>Only Split Posters</span>
                </label>
              </div>
            </div>

            <div className="pt-6 border-t border-border-light flex gap-4">
              <button
                onClick={clearAllFilters}
                className="w-1/2 border border-border-light py-2 rounded-xl text-xs font-semibold hover:bg-gray-light text-primary"
              >
                Clear All
              </button>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-1/2 bg-primary text-white py-2 rounded-xl text-xs font-semibold"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Main page component wrapped in Suspense for useSearchParams hook requirement in Next.js static builds
export default function Catalog() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-gray-muted text-sm font-semibold">
        Loading Collections...
      </div>
    }>
      <CatalogContent />
    </Suspense>
  );
}
