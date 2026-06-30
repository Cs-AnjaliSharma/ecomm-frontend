"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingBag, Plus, Minus, Trash2, ArrowRight, Percent } from "lucide-react";
import { useStore } from "../../store/useStore";

export default function Cart() {
  const [couponCode, setCouponCode] = useState("");
  const [couponMessage, setCouponMessage] = useState({ type: "", text: "" });

  const cart = useStore((state) => state.cart);
  const appliedCoupon = useStore((state) => state.appliedCoupon);

  const updateQuantity = useStore((state) => state.updateQuantity);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const applyCoupon = useStore((state) => state.applyCoupon);

  const subtotal = useStore((state) => state.getCartSubtotal());
  const discount = useStore((state) => state.getCartDiscount());
  const total = useStore((state) => state.getCartTotal());

  // Free shipping progress bar calculations
  const shippingThreshold = 500;
  const shippingRemaining = Math.max(0, shippingThreshold - subtotal);

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans space-y-8">
      {/* Header */}
      <div className="text-left border-b border-border-light pb-4">
        <h1 className="text-3xl font-bold font-fredoka text-primary">Your Shopping Cart</h1>
        <p className="text-gray-muted text-xs mt-1">Review your selected prints and checkout securely.</p>
      </div>

      {cart.length === 0 ? (
        <div className="py-24 text-center space-y-4 max-w-md mx-auto">
          <div className="p-5 bg-gray-light text-gray-400 rounded-full w-fit mx-auto">
            <ShoppingBag size={40} />
          </div>
          <div>
            <h3 className="font-bold text-lg text-primary">Your cart is empty</h3>
            <p className="text-xs text-gray-muted mt-1">
              Add some of our customizable designs to your cart to checkout.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-block bg-primary hover:bg-primary-hover text-white py-2.5 px-8 rounded-full font-semibold shadow-sm transition text-xs"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Cart items table */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Free shipping bar */}
            <div className="p-4 bg-gray-light/40 border border-border-light rounded-2xl text-xs text-gray-700 text-left font-sans">
              {shippingRemaining > 0 ? (
                <p>
                  Add <span className="font-bold">${shippingRemaining.toFixed(2)}</span> more to qualify for <span className="font-bold text-accent">FREE SHIPPING</span>.
                </p>
              ) : (
                <p className="text-green-600 font-semibold flex items-center gap-1.5">
                  🎉 Free shipping applied to this order!
                </p>
              )}
            </div>

            {/* Cart Table List */}
            <div className="border border-border-light rounded-2xl overflow-hidden bg-white shadow-inner divide-y divide-border-light">
              {cart.map((item) => {
                let itemPrice = item.product.price;
                if (item.finish === "Black Wooden Frame") itemPrice += 150;
                if (item.size === "A3") itemPrice += 50;
                if (item.size === "13x19 Inches") itemPrice += 100;

                return (
                  <div key={item.variantId} className="flex flex-col sm:flex-row p-6 gap-6 items-start sm:items-center justify-between text-left">
                    <div className="flex gap-4 items-center">
                      <div className="h-20 w-16 bg-gray-50 flex-shrink-0 border border-border-light p-0.5 rounded overflow-hidden shadow-sm flex items-center justify-center">
                        <img
                          src={item.customImage || item.product.images[0]}
                          alt={item.product.name}
                          className="h-full w-full object-cover rounded-sm"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-gray-800 line-clamp-1">{item.product.name}</h4>
                        <p className="text-[11px] text-gray-400 mt-1">
                          Size: {item.size} | Finish: {item.finish}
                          {item.splitPieces && ` | Split: ${item.splitPieces} panels`}
                        </p>
                        {item.customNotes && (
                          <p className="text-[10px] text-accent mt-0.5 max-w-sm italic line-clamp-1">
                            Notes: &quot;{item.customNotes}&quot;
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-8 pt-4 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                      {/* Quantity selector */}
                      <div className="flex items-center border border-border-light rounded bg-white p-0.5">
                        <button
                          onClick={() => updateQuantity(item.variantId, -1)}
                          className="p-1 hover:bg-gray-light text-gray-500 transition"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-3 text-xs font-semibold select-none">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.variantId, 1)}
                          className="p-1 hover:bg-gray-light text-gray-500 transition"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Total price */}
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-sm text-primary">
                          ${(itemPrice * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.variantId)}
                          className="text-gray-400 hover:text-red-500 transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Order Summary details */}
          <div className="space-y-6 text-left">
            <div className="bg-gray-light/35 border border-border-light rounded-3xl p-6 space-y-6">
              <h3 className="font-bold text-base text-primary font-fredoka">Order Summary</h3>

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-gray-500">Apply Discount Coupon</label>
                <div className="flex gap-2">
                  <div className="relative flex-grow">
                    <input
                      type="text"
                      placeholder="e.g. WELCOME10"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      disabled={!!appliedCoupon}
                      className="w-full pl-8 pr-4 py-2 bg-white border border-border-light rounded-xl text-xs uppercase focus:outline-none focus:border-accent disabled:opacity-60"
                    />
                    <Percent size={14} className="absolute left-2.5 top-2.5 text-gray-400" />
                  </div>
                  {appliedCoupon ? (
                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      className="bg-red-50 text-red-600 hover:bg-red-150 text-xs font-semibold px-4 py-2 border border-red-200 rounded-xl transition"
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
                </div>
                {couponMessage.text && (
                  <p className={`text-[10px] font-semibold ${
                    couponMessage.type === "success" ? "text-green-600" : "text-red-500"
                  }`}>
                    {couponMessage.text}
                  </p>
                )}
              </form>

              {/* Price Details */}
              <div className="space-y-3 text-xs border-t border-border-light pt-4 text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-800">${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Coupon Discount</span>
                    <span className="font-semibold">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping Standard</span>
                  <span className="font-semibold text-gray-800">
                    {subtotal > shippingThreshold ? "FREE" : "$49.00"}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-primary pt-3 border-t border-gray-200">
                  <span>Estimated Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <div className="pt-2">
                <Link
                  href="/checkout"
                  className="w-full bg-primary hover:bg-primary-hover text-white py-3.5 rounded-xl font-bold shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 text-sm"
                >
                  Proceed to Checkout <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
