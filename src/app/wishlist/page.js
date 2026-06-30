"use client";

import Link from "next/link";
import { Heart, ShoppingCart, Star, Trash2 } from "lucide-react";
import { useStore } from "../../store/useStore";

export default function Wishlist() {
  const wishlist = useStore((state) => state.wishlist);
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const addToCart = useStore((state) => state.addToCart);

  const handleAddToCart = (product) => {
    addToCart(product, {
      size: "A4",
      finish: "Standard Matte",
      quantity: 1
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans space-y-8">
      {/* Header */}
      <div className="text-left border-b border-border-light pb-4">
        <h1 className="text-3xl font-bold font-fredoka text-primary">Your Wishlist</h1>
        <p className="text-gray-muted text-xs mt-1">
          Save your favorite designs here and add them to your cart anytime.
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="py-24 text-center space-y-4 max-w-md mx-auto">
          <div className="p-5 bg-gray-light text-gray-400 rounded-full w-fit mx-auto">
            <Heart size={40} />
          </div>
          <div>
            <h3 className="font-bold text-lg text-primary">Wishlist is Empty</h3>
            <p className="text-xs text-gray-muted mt-1">
              Explore our collections and click the heart icon on posters to save them.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-block bg-primary hover:bg-primary-hover text-white py-2.5 px-8 rounded-full font-semibold shadow-sm transition text-xs"
          >
            Explore Collections
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {wishlist.map((prod) => (
            <div
              key={prod.id}
              className="group bg-white rounded-2xl overflow-hidden border border-border-light transition flex flex-col justify-between hover:shadow-sm"
            >
              {/* Image box */}
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 flex items-center justify-center p-3 select-none">
                <Link href={`/products/${prod.id}`} className="w-full h-full">
                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    className="w-full h-full object-cover rounded border border-border-light shadow-inner group-hover:scale-103 transition duration-300"
                  />
                </Link>
                {/* Remove heart */}
                <button
                  onClick={() => toggleWishlist(prod)}
                  className="absolute top-4 right-4 p-2 bg-white/95 hover:bg-white text-red-500 rounded-full backdrop-blur-sm transition shadow-sm border border-border-light"
                >
                  <Heart size={14} className="fill-red-500" />
                </button>
              </div>

              {/* Info details */}
              <div className="p-4 border-t border-border-light space-y-3 text-left">
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
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-sm font-bold text-primary">${prod.price}</span>
                  <button
                    onClick={() => handleAddToCart(prod)}
                    className="bg-primary hover:bg-primary-hover text-white text-[10px] font-semibold px-3 py-1.5 rounded-lg transition flex items-center gap-1"
                  >
                    <ShoppingCart size={11} /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
