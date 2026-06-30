"use client";

import { useState, use } from "react";
import { useParams, useRouter } from "next/navigation";
import { Star, ShieldCheck, Heart, ShoppingCart, Truck, AlertCircle, ArrowLeft, Minus, Plus } from "lucide-react";
import { useStore } from "../../../store/useStore";
import { MOCK_PRODUCTS, MOCK_REVIEWS } from "../../../utils/mockData";
import Link from "next/link";

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  
  const id = parseInt(params.id);
  const product = MOCK_PRODUCTS.find((p) => p.id === id);

  // States
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("A4");
  const [selectedFinish, setSelectedFinish] = useState("Standard Matte");
  const [splitPieces, setSplitPieces] = useState(product?.defaultSplitPieces || null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  // Reviews submission state
  const [reviews, setReviews] = useState(MOCK_REVIEWS[id] || []);
  const [newReviewName, setNewReviewName] = useState("");
  const [newReviewComment, setNewReviewComment] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);

  const addToCart = useStore((state) => state.addToCart);
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const wishlist = useStore((state) => state.wishlist);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4 font-sans">
        <AlertCircle size={48} className="mx-auto text-red-500 animate-bounce" />
        <h2 className="text-2xl font-bold font-fredoka">Product Not Found</h2>
        <p className="text-gray-muted text-sm">The poster you are looking for does not exist or has been removed.</p>
        <Link href="/products" className="inline-block bg-primary text-white py-2.5 px-6 rounded-full font-semibold">
          Back to Shop
        </Link>
      </div>
    );
  }

  const isFavorite = wishlist.some((item) => item.id === product.id);

  // Dynamic pricing calculation
  let price = product.price;
  if (selectedFinish === "Black Wooden Frame") price += 150;
  if (selectedSize === "A3") price += 50;
  if (selectedSize === "13x19 Inches") price += 100;

  const handleAddToCart = () => {
    addToCart(product, {
      size: selectedSize,
      finish: selectedFinish,
      splitPieces: product.isSplit ? splitPieces : null,
      quantity
    });
  };

  const handleBuyNow = () => {
    addToCart(product, {
      size: selectedSize,
      finish: selectedFinish,
      splitPieces: product.isSplit ? splitPieces : null,
      quantity
    });
    router.push("/checkout");
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) return;

    const newReview = {
      name: newReviewName.trim(),
      rating: newReviewRating,
      comment: newReviewComment.trim(),
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      })
    };

    setReviews([newReview, ...reviews]);
    setNewReviewName("");
    setNewReviewComment("");
    setNewReviewRating(5);
  };

  // Find related products
  const relatedProducts = MOCK_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 font-sans">
      
      {/* Back Button */}
      <Link href="/products" className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-primary transition uppercase tracking-wider">
        <ArrowLeft size={14} /> Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-left">
        {/* Left Column: Image Gallery and Visual Mockup Splitter */}
        <div className="space-y-6">
          <div className="relative aspect-[3/4] bg-gray-light/40 border border-border-light rounded-2xl overflow-hidden shadow-inner flex items-center justify-center p-6">
            
            {/* If product is a split poster, generate a split overlay layout preview */}
            {product.isSplit && splitPieces ? (
              <div 
                className="w-full h-full grid gap-1.5" 
                style={{
                  gridTemplateColumns: `repeat(${splitPieces}, minmax(0, 1fr))`
                }}
              >
                {Array.from({ length: splitPieces }).map((_, idx) => (
                  <div key={idx} className="relative w-full h-full overflow-hidden border-2 border-white shadow bg-white p-0.5 rounded-sm">
                    <div 
                      className="w-full h-full bg-cover"
                      style={{
                        backgroundImage: `url(${product.images[selectedImage]})`,
                        backgroundPosition: `${(idx / (splitPieces - 1)) * 100}% center`,
                        backgroundSize: `${splitPieces * 100}% 100%`
                      }}
                    ></div>
                  </div>
                ))}
              </div>
            ) : (
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg border border-border-light shadow-md"
              />
            )}

            {/* Poster White Border Effect Indicator */}
            <span className="absolute bottom-4 left-4 bg-white/90 text-[10px] font-bold text-primary px-3 py-1 rounded-full shadow-sm border border-border-light uppercase tracking-wider select-none">
              {product.isSplit ? `Panoramic ${splitPieces}-Piece Split` : "Chic White Border Styling"}
            </span>
          </div>

          {/* Thumbnail List */}
          {product.images.length > 1 && (
            <div className="flex gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`h-16 w-16 rounded-xl overflow-hidden border-2 transition shadow-sm bg-gray-50 flex items-center justify-center p-0.5 ${
                    selectedImage === idx ? "border-accent scale-105" : "border-border-light opacity-75 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="Poster view" className="h-full w-full object-cover rounded-lg" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Order Details */}
        <div className="space-y-6">
          {/* Metadata */}
          <div className="space-y-1">
            <span className="text-xs font-bold text-accent uppercase tracking-wider bg-accent/10 px-3 py-1 rounded-full">
              {product.category}
            </span>
            <h1 className="text-3xl font-bold font-fredoka text-primary mt-2">
              {product.name}
            </h1>
            <div className="flex items-center gap-2 pt-1">
              <div className="flex items-center text-amber-500">
                <Star size={16} className="fill-amber-500" />
                <span className="text-sm font-bold text-gray-800 ml-1">{product.rating}</span>
              </div>
              <span className="text-xs text-gray-muted">|</span>
              <span className="text-xs text-gray-muted font-semibold">({reviews.length} reviews)</span>
              <span className="text-xs text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-md ml-2 select-none">
                In Stock
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 pb-4 border-b border-border-light">
            <span className="text-3xl font-bold text-primary">${price.toFixed(2)}</span>
            <span className="text-sm text-gray-muted line-through">${(price * 2).toFixed(2)}</span>
            <span className="text-xs bg-red-150 text-red-600 font-bold px-2 py-0.5 rounded-md ml-1 select-none">
              50% OFF
            </span>
          </div>

          {/* 1. Size Selector */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-primary uppercase tracking-wide">1. Select Poster Size</h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[
                { code: "A6", label: "A6 (Pocket)", add: 0 },
                { code: "A5", label: "A5 (Small)", add: 0 },
                { code: "A4", label: "A4 (Standard)", add: 0 },
                { code: "A3", label: "A3 (Large)", add: 50 },
                { code: "13x19 Inches", label: "13x19 (Giant)", add: 100 }
              ].map((sz) => (
                <button
                  key={sz.code}
                  onClick={() => setSelectedSize(sz.code)}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs text-center transition ${
                    selectedSize === sz.code
                      ? "border-primary bg-primary text-white font-bold"
                      : "border-border-light hover:border-gray-muted"
                  }`}
                >
                  <span className="font-semibold">{sz.code}</span>
                  <span className={`text-[10px] mt-0.5 opacity-80 ${selectedSize === sz.code ? "text-gray-200" : "text-gray-muted"}`}>
                    {sz.add > 0 ? `+$${sz.add}` : "Base Price"}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Finish / Framing Selector */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-primary uppercase tracking-wide">2. Choose Print Finish</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { code: "Standard Matte", desc: "No frame, chic white border", add: 0 },
                { code: "Textured Matte", desc: "Premium textured surface", add: 0 },
                { code: "Black Wooden Frame", desc: "Durable ready-to-hang wooden frame", add: 150 }
              ].map((fn) => (
                <button
                  key={fn.code}
                  onClick={() => setSelectedFinish(fn.code)}
                  className={`flex flex-col p-3 rounded-xl border text-left text-xs transition ${
                    selectedFinish === fn.code
                      ? "border-primary bg-primary text-white font-bold"
                      : "border-border-light hover:border-gray-muted bg-white"
                  }`}
                >
                  <span>{fn.code}</span>
                  <span className={`text-[10px] mt-1 font-normal opacity-85 ${selectedFinish === fn.code ? "text-gray-200" : "text-gray-muted"}`}>
                    {fn.desc} ({fn.add > 0 ? `+$${fn.add}` : "Free"})
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. If Split Poster */}
          {product.isSplit && (
            <div className="space-y-3 bg-gray-light/35 p-4 rounded-2xl border border-border-light">
              <h3 className="text-sm font-bold text-primary uppercase tracking-wide">3. Split Panels Configuration</h3>
              <p className="text-[11px] text-gray-muted">Configure how many panels the image split spans</p>
              <div className="flex gap-3 pt-1">
                {[3, 4, 5].map((pc) => (
                  <button
                    key={pc}
                    onClick={() => setSplitPieces(pc)}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold border transition ${
                      splitPieces === pc
                        ? "bg-accent border-accent text-white font-bold"
                        : "bg-white border-border-light hover:border-gray-muted text-gray-700"
                    }`}
                  >
                    {pc} Piece Panel set
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Checkout buttons */}
          <div className="pt-4 border-t border-border-light space-y-4">
            <div className="flex flex-wrap items-center gap-4">
              {/* Quantity selector */}
              <div className="flex items-center border border-border-light rounded-full p-1 bg-gray-light/30">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-white text-gray-600 rounded-full transition"
                >
                  <Minus size={14} />
                </button>
                <span className="px-4 font-bold text-sm select-none">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-white text-gray-600 rounded-full transition"
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Add to Cart button */}
              <button
                onClick={handleAddToCart}
                className="flex-grow bg-white hover:bg-gray-light text-primary border-2 border-primary py-3 rounded-full font-semibold transition flex items-center justify-center gap-2 shadow-sm"
              >
                <ShoppingCart size={18} /> Add to Cart
              </button>

              {/* Wishlist toggle */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3 rounded-full border border-border-light hover:bg-gray-light transition ${
                  isFavorite ? "text-red-500 fill-red-500" : "text-gray-500"
                }`}
              >
                <Heart size={18} />
              </button>
            </div>

            {/* Direct Buy Button */}
            <button
              onClick={handleBuyNow}
              className="w-full bg-primary hover:bg-primary-hover text-white py-3.5 rounded-full font-bold shadow-md hover:shadow-lg transition flex items-center justify-center"
            >
              Buy It Now
            </button>
          </div>

          {/* Safety badges */}
          <div className="grid grid-cols-2 gap-4 text-[11px] text-gray-muted pt-2">
            <div className="flex items-center gap-1.5"><Truck size={14} className="text-accent" /> Dispatch in 24 Hours</div>
            <div className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-green-600" /> Damage-free Tube Packing</div>
          </div>
        </div>
      </div>

      {/* Tabs for Details & Reviews */}
      <div className="border-t border-border-light pt-8">
        <div className="flex border-b border-border-light text-sm font-semibold gap-6">
          <button
            onClick={() => setActiveTab("description")}
            className={`pb-3 border-b-2 transition ${activeTab === "description" ? "border-primary text-primary font-bold" : "border-transparent text-gray-500"}`}
          >
            Description & Quality Specs
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`pb-3 border-b-2 transition ${activeTab === "reviews" ? "border-primary text-primary font-bold" : "border-transparent text-gray-500"}`}
          >
            Customer Reviews ({reviews.length})
          </button>
        </div>

        <div className="py-6 text-left">
          {activeTab === "description" ? (
            <div className="space-y-4 text-sm text-gray-600 leading-relaxed max-w-3xl">
              <p>{product.description}</p>
              <h4 className="font-bold text-primary mt-6">Product Details & High-End Materials:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Heavy Cardstock:</strong> Crafted on premium 300 GSM ultra-thick photography cardstock media.</li>
                <li><strong>Anti-Glare Surface:</strong> High-grade matte finish layout prevents visual reflections from ceiling spotlights.</li>
                <li><strong>High Fidelity Colors:</strong> High resolution giclée printing using archival fade-resistant pigment ink.</li>
                <li><strong>Minimalist Framing:</strong> Handcrafted wooden frames featuring premium backing mounts (Optional).</li>
                <li><strong>Border Styling:</strong> Standard design incorporates a chic white border that adds focus without overlapping artwork.</li>
              </ul>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Review List */}
              <div className="lg:col-span-2 space-y-4">
                {reviews.length === 0 ? (
                  <p className="text-gray-muted text-xs">No reviews yet. Be the first to leave a feedback!</p>
                ) : (
                  reviews.map((rev, idx) => (
                    <div key={idx} className="bg-gray-light/30 border border-border-light rounded-2xl p-5 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-primary">{rev.name}</span>
                        <span className="text-[10px] text-gray-400">{rev.date}</span>
                      </div>
                      <div className="flex items-center text-amber-500">
                        {Array.from({ length: rev.rating }).map((_, starIdx) => (
                          <Star key={starIdx} size={12} className="fill-amber-500" />
                        ))}
                      </div>
                      <p className="text-xs text-gray-600 leading-normal">{rev.comment}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Review Submit Form */}
              <div className="bg-gray-light/40 border border-border-light p-6 rounded-2xl space-y-4 h-fit">
                <h4 className="font-bold text-sm text-primary font-fredoka">Write a Customer Review</h4>
                <form onSubmit={handleAddReview} className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-semibold text-gray-700">Your Name</label>
                    <input
                      type="text"
                      required
                      value={newReviewName}
                      onChange={(e) => setNewReviewName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full p-2.5 bg-white border border-border-light rounded-xl focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-gray-700">Rating</label>
                    <select
                      value={newReviewRating}
                      onChange={(e) => setNewReviewRating(parseInt(e.target.value))}
                      className="w-full p-2.5 bg-white border border-border-light rounded-xl focus:outline-none focus:border-accent"
                    >
                      <option value={5}>5 Stars - Outstanding</option>
                      <option value={4}>4 Stars - Great Quality</option>
                      <option value={3}>3 Stars - Satisfactory</option>
                      <option value={2}>2 Stars - Poor Quality</option>
                      <option value={1}>1 Star - Bad Finish</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-gray-700">Review Comments</label>
                    <textarea
                      rows={3}
                      required
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      placeholder="Share your thoughts about paper thickness, borders, colors..."
                      className="w-full p-2.5 bg-white border border-border-light rounded-xl focus:outline-none focus:border-accent resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-hover text-white py-2.5 rounded-xl font-semibold shadow-sm transition"
                  >
                    Submit Review
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-border-light pt-8 space-y-6 text-left">
          <h2 className="text-xl font-bold font-fredoka text-primary">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((prod) => (
              <div key={prod.id} className="group bg-white rounded-xl border border-border-light overflow-hidden transition flex flex-col justify-between hover:shadow-sm">
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 flex items-center justify-center p-3">
                  <Link href={`/products/${prod.id}`} className="w-full h-full">
                    <img src={prod.images[0]} alt={prod.name} className="w-full h-full object-cover rounded border border-border-light shadow-inner" />
                  </Link>
                </div>
                <div className="p-3 border-t border-border-light space-y-1">
                  <span className="text-[9px] font-bold text-accent uppercase tracking-wider">{prod.category}</span>
                  <Link href={`/products/${prod.id}`}>
                    <h3 className="font-bold text-xs text-gray-800 hover:text-accent transition truncate">{prod.name}</h3>
                  </Link>
                  <span className="text-sm font-bold text-primary">${prod.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
