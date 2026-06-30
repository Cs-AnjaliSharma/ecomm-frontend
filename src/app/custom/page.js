"use client";

import { useState, useRef } from "react";
import { Upload, X, Crop, ShoppingCart, Sparkles, CheckCircle2, FileImage } from "lucide-react";
import { useStore } from "../../store/useStore";

export default function CustomPoster() {
  const fileInputRef = useRef();
  const addToCart = useStore((state) => state.addToCart);

  // States
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [cropRatio, setCropRatio] = useState("5:7"); // 5:7, 2:3, 1:1
  const [selectedSize, setSelectedSize] = useState("A4");
  const [selectedFinish, setSelectedFinish] = useState("Standard Matte");
  const [customNotes, setCustomNotes] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  // Price calculation
  let price = 399; // Base price for custom poster printing
  if (selectedFinish === "Black Wooden Frame") price += 150;
  if (selectedSize === "A3") price += 50;
  if (selectedSize === "13x19 Inches") price += 100;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    setIsSuccess(false);
  };

  const handleAddToCart = () => {
    if (!previewUrl) return;

    // Create a virtual custom product object
    const customProduct = {
      id: 999, // Custom poster reserved ID
      name: `Custom Wall Art (${selectedFile?.name || "Uploaded Photo"})`,
      price: 399,
      category: "Custom",
      images: [previewUrl],
      description: `High resolution custom poster print. Instructions: ${customNotes || "None"}`
    };

    addToCart(customProduct, {
      size: selectedSize,
      finish: selectedFinish,
      quantity,
      customImage: previewUrl,
      customNotes: customNotes.trim()
    });

    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  // Maps crop ratio class to visual container aspect ratio
  const getCropClass = () => {
    if (cropRatio === "2:3") return "aspect-[2/3]";
    if (cropRatio === "1:1") return "aspect-square";
    return "aspect-[5/7]"; // Default
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1 bg-accent/15 text-accent font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-wider">
          <Sparkles size={12} /> Custom Poster Studio
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold font-fredoka text-primary">
          Design Your Own Wall Art
        </h1>
        <p className="text-gray-muted text-sm leading-relaxed">
          Upload any high-resolution image and customize printing sizes or wood framing. We print on ultra-thick 300 GSM photo paper.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-4">
        {/* Left Column: Image Upload Dragzone and Cropper overlay */}
        <div className="space-y-6">
          {!previewUrl ? (
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={triggerFileInput}
              className="border-3 border-dashed border-border-light rounded-3xl p-12 text-center hover:border-accent transition duration-300 bg-gray-light/10 hover:bg-gray-light/30 cursor-pointer flex flex-col items-center justify-center space-y-4 aspect-[4/3]"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <div className="p-5 bg-white border border-border-light text-accent rounded-full shadow-sm">
                <Upload size={32} />
              </div>
              <div>
                <h3 className="font-bold text-sm text-gray-805">Drag & Drop Your Image</h3>
                <p className="text-xs text-gray-muted mt-1">Supports PNG, JPG, JPEG (Max size: 25MB)</p>
              </div>
              <button
                type="button"
                className="bg-primary hover:bg-primary-hover text-white py-2 px-6 rounded-full text-xs font-semibold shadow-sm transition"
              >
                Browse Files
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wide flex items-center gap-1.5">
                  <FileImage size={16} className="text-accent" /> File: {selectedFile?.name || "image.png"}
                </span>
                <button
                  onClick={handleRemoveImage}
                  className="text-xs font-bold text-red-500 hover:underline flex items-center gap-1"
                >
                  <X size={14} /> Remove Image
                </button>
              </div>

              {/* Crop Frame Overlay Visual Simulation */}
              <div className="bg-gray-light/30 border border-border-light rounded-3xl p-6 flex items-center justify-center min-h-[400px]">
                <div className={`relative max-w-xs w-full overflow-hidden shadow-2xl rounded border-8 border-white bg-white group ${getCropClass()}`}>
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover transition"
                  />
                  {/* Decorative crop corner marks */}
                  <div className="absolute inset-4 border border-dashed border-white/50 pointer-events-none"></div>
                  <div className="absolute top-2 left-2 h-4 w-4 border-t-2 border-l-2 border-white"></div>
                  <div className="absolute top-2 right-2 h-4 w-4 border-t-2 border-r-2 border-white"></div>
                  <div className="absolute bottom-2 left-2 h-4 w-4 border-b-2 border-l-2 border-white"></div>
                  <div className="absolute bottom-2 right-2 h-4 w-4 border-b-2 border-r-2 border-white"></div>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition duration-300"></div>
                </div>
              </div>

              {/* Aspect Ratio selector */}
              <div className="space-y-2 text-left">
                <label className="text-xs font-bold text-primary uppercase flex items-center gap-1.5">
                  <Crop size={14} /> Adjust Sizing Ratio
                </label>
                <div className="flex gap-3">
                  {["5:7", "2:3", "1:1"].map((ratio) => (
                    <button
                      key={ratio}
                      onClick={() => setCropRatio(ratio)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold border transition ${
                        cropRatio === ratio
                          ? "bg-primary border-primary text-white font-bold"
                          : "bg-white border-border-light hover:border-gray-muted text-gray-700"
                      }`}
                    >
                      {ratio} Crop Layout
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Print Spec Configurations */}
        <div className="space-y-6 text-left">
          <div className="border-b border-border-light pb-4">
            <h2 className="text-xl font-bold font-fredoka text-primary">Print & Material Selection</h2>
            <p className="text-xs text-gray-muted mt-1">Specify sizes and wood mounting frames</p>
          </div>

          {/* Size Select */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-primary uppercase tracking-wide">1. Select Print Size</h3>
            <div className="grid grid-cols-3 gap-3">
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
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs text-center transition ${
                    selectedSize === sz.code
                      ? "border-primary bg-primary text-white font-bold"
                      : "border-border-light hover:border-gray-muted bg-white"
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

          {/* Finish Select */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-primary uppercase tracking-wide">2. Choose Finish & Mounting</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { code: "Standard Matte", desc: "Borderless matte finish", add: 0 },
                { code: "Textured Matte", desc: "Heavy canvas-feel finish", add: 0 },
                { code: "Black Wooden Frame", desc: "Solid framing, backing mount", add: 150 }
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

          {/* Instructions Notes */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-primary uppercase tracking-wide">3. Printing Instructions (Optional)</h3>
            <textarea
              rows={3}
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              placeholder="e.g. Please crop closely to the center subject. Make borderless. Keep colors extra vibrant..."
              className="w-full p-3 border border-border-light rounded-2xl text-xs bg-white focus:outline-none focus:border-accent resize-none"
            ></textarea>
          </div>

          {/* CTA Add to Cart */}
          <div className="pt-6 border-t border-border-light space-y-4">
            <div className="flex items-center justify-between text-sm font-bold text-primary">
              <span>Dynamic Printing Cost:</span>
              <span className="text-2xl font-fredoka">${price.toFixed(2)}</span>
            </div>

            <div className="flex gap-4">
              {/* Quantity selector */}
              <div className="flex items-center border border-border-light rounded-full p-1 bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-light text-gray-600 rounded-full transition"
                >
                  <X size={10} /> {/* Minus equivalent */}
                </button>
                <span className="px-4 font-bold text-xs select-none">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-light text-gray-600 rounded-full transition"
                >
                  <Upload size={10} className="rotate-180" /> {/* Plus equivalent */}
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!previewUrl}
                className="flex-grow bg-primary hover:bg-primary-hover text-white py-3.5 rounded-full font-bold shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart size={16} /> Add Custom Poster
              </button>
            </div>

            {isSuccess && (
              <p className="text-xs text-green-600 font-semibold flex items-center gap-1.5 justify-center py-2 bg-green-50 border border-green-200 rounded-xl animate-fade-in select-none">
                <CheckCircle2 size={16} /> Custom artwork successfully added to shopping cart!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
