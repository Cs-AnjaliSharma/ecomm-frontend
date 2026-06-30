"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore } from "../../store/useStore";
import { CheckCircle2, ShoppingBag, ShieldCheck, CreditCard, QrCode, ArrowLeft, Loader2 } from "lucide-react";

export default function Checkout() {
  const cart = useStore((state) => state.cart);
  const clearCart = useStore((state) => state.clearCart);

  const subtotal = useStore((state) => state.getCartSubtotal());
  const discount = useStore((state) => state.getCartDiscount());
  const total = useStore((state) => state.getCartTotal());

  // Forms states
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  
  // Checkout flow control states
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsProcessing(true);

    // Simulate payment gateway loading delay (Razorpay/Stripe mock)
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      const generatedId = `PST-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedId);
      clearCart(); // Reset cart state upon purchase completion
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center font-sans space-y-6 animate-fade-in">
        <div className="p-4 bg-green-50 border border-green-200 text-green-600 rounded-full w-fit mx-auto animate-bounce">
          <CheckCircle2 size={56} />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold font-fredoka text-primary">Order Placed Successfully!</h1>
          <p className="text-sm text-gray-500">Thank you for shopping with Posterized. Your wall art is being prepped.</p>
        </div>

        <div className="bg-gray-light/40 border border-border-light rounded-2xl p-6 text-left space-y-3 text-xs text-gray-700">
          <div className="flex justify-between font-semibold">
            <span>Order Reference:</span>
            <span className="text-primary font-bold">{orderId}</span>
          </div>
          <div className="flex justify-between">
            <span>Confirmation Sent to:</span>
            <span className="font-semibold text-gray-800">{email || "your-email@example.com"}</span>
          </div>
          <div className="flex justify-between">
            <span>Dispatch Timeline:</span>
            <span className="font-semibold text-accent">Within 24 Hours</span>
          </div>
          <div className="flex justify-between">
            <span>Estimated Delivery:</span>
            <span className="font-semibold text-gray-800">3 - 5 Working Days</span>
          </div>
        </div>

        <div className="pt-4">
          <Link
            href="/products"
            className="bg-primary hover:bg-primary-hover text-white py-3 px-8 rounded-full font-bold shadow-md transition text-sm"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans space-y-8">
      {/* Header */}
      <div className="text-left border-b border-border-light pb-4">
        <h1 className="text-3xl font-bold font-fredoka text-primary">Checkout</h1>
        <p className="text-gray-muted text-xs mt-1">Provide delivery credentials and complete checkout.</p>
      </div>

      {cart.length === 0 ? (
        <div className="py-20 text-center space-y-4 max-w-sm mx-auto">
          <ShoppingBag size={40} className="mx-auto text-gray-300" />
          <h2 className="text-lg font-bold">Your Checkout is Empty</h2>
          <p className="text-xs text-gray-muted">Add products to your cart before proceeding to checkout.</p>
          <Link href="/products" className="inline-block bg-primary text-white py-2 px-6 rounded-full text-xs font-semibold">
            Browse Posters
          </Link>
        </div>
      ) : (
        <form onSubmit={handleCheckoutSubmit} className="grid grid-cols-1 lg:grid-cols-5 gap-12 text-left">
          {/* Left Column: Form entries */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* Contact details */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-primary uppercase tracking-wide border-b border-gray-100 pb-2">
                1. Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-gray-700">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. rahul@example.com"
                    className="w-full p-2.5 bg-white border border-border-light rounded-xl focus:outline-none focus:border-accent"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-gray-700">Mobile Phone</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 9876543210"
                    className="w-full p-2.5 bg-white border border-border-light rounded-xl focus:outline-none focus:border-accent"
                  />
                </div>
              </div>
            </div>

            {/* Delivery address */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-primary uppercase tracking-wide border-b border-gray-100 pb-2">
                2. Shipping Address
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-gray-700">First Name</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="e.g. Rahul"
                    className="w-full p-2.5 bg-white border border-border-light rounded-xl focus:outline-none focus:border-accent"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-gray-700">Last Name</label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="e.g. Sharma"
                    className="w-full p-2.5 bg-white border border-border-light rounded-xl focus:outline-none focus:border-accent"
                  />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="font-semibold text-gray-700">Street Address & Flat / Apartment</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. Sector-15, Flat 302, Green Valley Apartments"
                    className="w-full p-2.5 bg-white border border-border-light rounded-xl focus:outline-none focus:border-accent"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-gray-700">City / District</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. New Delhi"
                    className="w-full p-2.5 bg-white border border-border-light rounded-xl focus:outline-none focus:border-accent"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-gray-700">PIN Code / ZIP</label>
                  <input
                    type="text"
                    required
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    placeholder="e.g. 110001"
                    className="w-full p-2.5 bg-white border border-border-light rounded-xl focus:outline-none focus:border-accent"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-primary uppercase tracking-wide border-b border-gray-100 pb-2">
                3. Secure Payment Gateway
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`p-4 rounded-xl border flex items-center justify-between transition ${
                    paymentMethod === "card" ? "border-primary bg-primary/5 font-bold text-primary" : "border-border-light bg-white hover:border-gray-muted"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <CreditCard size={18} /> Card (Visa/Mastercard)
                  </span>
                  <span className="text-[10px] text-gray-400">Mock Stripe</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("upi")}
                  className={`p-4 rounded-xl border flex items-center justify-between transition ${
                    paymentMethod === "upi" ? "border-primary bg-primary/5 font-bold text-primary" : "border-border-light bg-white hover:border-gray-muted"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <QrCode size={18} /> UPI (GPay/PhonePe QR)
                  </span>
                  <span className="text-[10px] text-gray-400">Mock Razorpay</span>
                </button>
              </div>

              {/* Dynamic details based on method */}
              <div className="bg-gray-light/30 border border-border-light p-5 rounded-2xl text-xs space-y-3">
                {paymentMethod === "card" ? (
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-3 space-y-1">
                      <label className="font-semibold text-gray-600">Card Number</label>
                      <input
                        type="text"
                        placeholder="4242 4242 4242 4242 (Simulated)"
                        className="w-full p-2.5 bg-white border border-border-light rounded-xl focus:outline-none"
                      />
                    </div>
                    <div className="col-span-2 space-y-1">
                      <label className="font-semibold text-gray-600">Expiration Date</label>
                      <input
                        type="text"
                        placeholder="MM / YY"
                        className="w-full p-2.5 bg-white border border-border-light rounded-xl focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-gray-600">CVC</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full p-2.5 bg-white border border-border-light rounded-xl focus:outline-none"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row items-center gap-6 py-2">
                    <div className="h-28 w-28 bg-white border-4 border-white shadow rounded-lg flex items-center justify-center p-2 text-primary font-bold border-border-light">
                      QR CODE
                    </div>
                    <div className="space-y-2 text-center sm:text-left">
                      <p className="font-bold text-gray-800">Scan QR Code using GPay/PhonePe</p>
                      <p className="text-[10px] text-gray-muted leading-relaxed">
                        Scan the code or complete with UPI ID. We will verify the transaction instantly.
                      </p>
                      <input
                        type="text"
                        placeholder="your-name@upi"
                        className="p-2 border border-border-light rounded-lg text-xs w-full focus:outline-none max-w-xs"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Order summary sidebar */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-light/35 border border-border-light rounded-3xl p-6 space-y-6 sticky top-24">
              <h3 className="font-bold text-base text-primary font-fredoka">Order Details</h3>
              
              {/* Items Summary list */}
              <div className="divide-y divide-gray-200 overflow-y-auto max-h-60 space-y-3 pr-2">
                {cart.map((item) => {
                  let itemPrice = item.product.price;
                  if (item.finish === "Black Wooden Frame") itemPrice += 150;
                  if (item.size === "A3") itemPrice += 50;
                  if (item.size === "13x19 Inches") itemPrice += 100;

                  return (
                    <div key={item.variantId} className="flex gap-3 py-3 items-center justify-between text-xs text-gray-600">
                      <div className="flex gap-2.5 items-center">
                        <img
                          src={item.customImage || item.product.images[0]}
                          alt={item.product.name}
                          className="h-10 w-8 object-cover rounded border border-border-light bg-white"
                        />
                        <div>
                          <p className="font-bold text-gray-850 line-clamp-1">{item.product.name}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5">
                            {item.size} / {item.finish} x {item.quantity}
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-gray-800">${(itemPrice * item.quantity).toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>

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
                    {subtotal > 500 ? "FREE" : "$49.00"}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-primary pt-3 border-t border-gray-200">
                  <span>Grand Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Submit trigger */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-primary hover:bg-primary-hover text-white py-3.5 rounded-full font-bold shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 text-sm disabled:opacity-75 disabled:cursor-wait"
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Verifying Transaction...
                  </>
                ) : (
                  <>
                    Complete Order & Pay
                  </>
                )}
              </button>

              <div className="flex gap-2 items-center justify-center text-[10px] text-gray-400">
                <ShieldCheck size={14} className="text-green-500" /> SSL Secured & Encrypted Payment
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
