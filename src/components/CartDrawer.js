"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ShoppingBag, Percent } from "lucide-react";
import { useStore } from "../store/useStore";

export default function CartDrawer() {
  const drawerRef = useRef();
  const [couponCode, setCouponCode] = useState("");
  const [couponMessage, setCouponMessage] = useState({ type: "", text: "" });

  const cart = useStore((state) => state.cart);
  const cartDrawerOpen = useStore((state) => state.cartDrawerOpen);
  const appliedCoupon = useStore((state) => state.appliedCoupon);

  const setCartDrawerOpen = useStore((state) => state.setCartDrawerOpen);
  const updateQuantity = useStore((state) => state.updateQuantity);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const applyCoupon = useStore((state) => state.applyCoupon);

  const subtotal = useStore((state) => state.getCartSubtotal());
  const discount = useStore((state) => state.getCartDiscount());
  const total = useStore((state) => state.getCartTotal());

  // Free shipping progress bar calculations (Threshold: $500)
  const shippingThreshold = 500;
  const shippingRemaining = Math.max(0, shippingThreshold - subtotal);
  const shippingPercentage = Math.min(100, (subtotal / shippingThreshold) * 100);

  // Close drawer if clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        cartDrawerOpen &&
        drawerRef.current &&
        !drawerRef.current.contains(event.target)
      ) {
        setCartDrawerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [cartDrawerOpen, setCartDrawerOpen]);

  // Sync state with store coupon on load
  useEffect(() => {
    if (appliedCoupon) {
      setCouponCode(appliedCoupon.code);
      setCouponMessage({ type: "success", text: "Promo applied!" });
    } else {
      setCouponCode("");
      setCouponMessage({ type: "", text: "" });
    }
  }, [appliedCoupon]);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    const res = applyCoupon(couponCode.trim());
    if (res.success) {
      setCouponMessage({ type: "success", text: res.message });
    } else {
      setCouponMessage({ type: "error", text: res.message });
    }
  };

  const handleRemoveCoupon = () => {
    applyCoupon(null);
    setCouponCode("");
    setCouponMessage({ type: "info", text: "Coupon removed" });
  };

  if (!cartDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm transition-opacity duration-300">
      <div className="absolute inset-0 overflow-hidden">
        <div 
          ref={drawerRef}
          className="absolute inset-y-0 right-0 flex max-w-full pl-10"
        >
          <div className="w-screen max-w-md bg-white shadow-xl flex flex-col h-full transform transition-transform duration-300">
            {/* Header */}
            <div className="px-6 py-5 border-b border-border-light flex items-center justify-between">
              <h2 className="text-lg font-bold font-fredoka text-primary flex items-center gap-2">
                <ShoppingBag size={20} /> Shopping Cart
              </h2>
              <button
                onClick={() => setCartDrawerOpen(false)}
                className="p-1 hover:bg-gray-light text-gray-500 rounded-full transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            {cart.length > 0 && (
              <div className="px-6 py-4 bg-gray-light/60 border-b border-border-light text-xs text-gray-700 space-y-2">
                {shippingRemaining > 0 ? (
                  <p>
                    Add <span className="font-bold">${shippingRemaining.toFixed(2)}</span> more for <span className="font-bold text-accent">FREE SHIPPING</span>
                  </p>
                ) : (
                  <p className="text-green-600 font-semibold flex items-center gap-1.5 font-sans">
                    🎉 You qualify for FREE SHIPPING!
                  </p>
                )}
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-accent h-2 rounded-full transition-all duration-500"
                    style={{ width: `${shippingPercentage}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Cart Items List */}
            <div className="flex-grow overflow-y-auto px-6 py-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <div className="p-4 bg-gray-light text-gray-400 rounded-full">
                    <ShoppingBag size={48} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-700">Your cart is empty</h3>
                    <p className="text-sm text-gray-400 mt-1">Add some custom posters to start decorating.</p>
                  </div>
                  <button
                    onClick={() => setCartDrawerOpen(false)}
                    className="bg-primary hover:bg-primary-hover text-white text-sm font-semibold py-2.5 px-6 rounded-full transition"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-border-light">
                  {cart.map((item) => {
                    let itemPrice = item.product.price;
                    if (item.finish === "Black Wooden Frame") itemPrice += 150;
                    if (item.size === "A3") itemPrice += 50;
                    if (item.size === "13x19 Inches") itemPrice += 100;

                    return (
                      <div key={item.variantId} className="flex py-4 gap-4">
                        {/* Thumbnail */}
                        <div className="h-20 w-16 flex-shrink-0 overflow-hidden border border-border-light rounded bg-gray-50 flex items-center justify-center p-0.5 shadow-sm">
                          <img
                            src={item.customImage || item.product.images[0]}
                            alt={item.product.name}
                            className="h-full w-full object-cover rounded-sm"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-grow flex flex-col justify-between">
                          <div>
                            <h4 className="text-sm font-bold text-gray-800 line-clamp-1">
                              {item.product.name}
                            </h4>
                            <p className="text-[11px] text-gray-400 mt-0.5">
                              Size: {item.size} | Finish: {item.finish}
                              {item.splitPieces && ` | Split: ${item.splitPieces} Pcs`}
                            </p>
                            {item.customNotes && (
                              <p className="text-[10px] text-accent mt-0.5 line-clamp-1">
                                Note: &quot;{item.customNotes}&quot;
                              </p>
                            )}
                          </div>

                          <div className="flex items-center justify-between pt-1">
                            {/* Quantity Controls */}
                            <div className="flex items-center border border-border-light rounded bg-white">
                              <button
                                onClick={() => updateQuantity(item.variantId, -1)}
                                className="p-1 hover:bg-gray-light text-gray-500 transition"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="px-2 text-xs font-semibold select-none">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.variantId, 1)}
                                className="p-1 hover:bg-gray-light text-gray-500 transition"
                              >
                                <Plus size={12} />
                              </button>
                            </div>

                            {/* Price / Delete */}
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-bold text-gray-800">
                                ${ (itemPrice * item.quantity).toFixed(2) }
                              </span>
                              <button
                                onClick={() => removeFromCart(item.variantId)}
                                className="text-gray-400 hover:text-red-500 transition"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer Calculator / Promo */}
            {cart.length > 0 && (
              <div className="border-t border-border-light bg-gray-50 px-6 py-6 space-y-4">
                {/* Coupon Code Entry */}
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-grow">
                    <input
                      type="text"
                      placeholder="Coupon (e.g. WELCOME10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      disabled={!!appliedCoupon}
                      className="w-full pl-8 pr-4 py-2 border border-border-light rounded-xl text-xs uppercase bg-white focus:outline-none focus:border-accent disabled:opacity-60"
                    />
                    <Percent size={14} className="absolute left-2.5 top-2.5 text-gray-400" />
                  </div>
                  {appliedCoupon ? (
                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      className="bg-red-50 text-red-600 hover:bg-red-100 text-xs font-semibold px-4 py-2 rounded-xl border border-red-200 transition"
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="bg-primary hover:bg-primary-hover text-white text-xs font-semibold px-4 py-2 rounded-xl transition"
                    >
                      Apply
                    </button>
                  )}
                </form>

                {couponMessage.text && (
                  <p className={`text-[10px] font-semibold -mt-2 ${
                    couponMessage.type === "success" ? "text-green-600" : "text-red-500"
                  }`}>
                    {couponMessage.text}
                  </p>
                )}

                {/* Subtotals */}
                <div className="space-y-1.5 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-800">${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({appliedCoupon?.code})</span>
                      <span className="font-semibold">-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-semibold text-gray-800">
                      {subtotal > shippingThreshold ? "FREE" : "$49.00"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-primary pt-2 border-t border-gray-200">
                    <span>Estimated Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Actions */}
                <div className="pt-2">
                  <Link
                    href="/checkout"
                    onClick={() => setCartDrawerOpen(false)}
                    className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-xl font-semibold shadow-md flex items-center justify-center gap-2 transition"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
