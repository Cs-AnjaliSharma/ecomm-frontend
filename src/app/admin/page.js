"use client";

import { useState } from "react";
import { DollarSign, ShoppingBag, Percent, TrendingUp, Plus, Edit, Trash2, CheckCircle2, AlertCircle } from "lucide-react";
import { MOCK_PRODUCTS } from "../../utils/mockData";

export default function AdminDashboard() {
  const [productsList, setProductsList] = useState(MOCK_PRODUCTS);
  
  // Form states
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Anime");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  
  const [alert, setAlert] = useState({ type: "", message: "" });

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!name.trim() || !price || !imageUrl.trim() || !description.trim()) return;

    const newProd = {
      id: productsList.length + 1,
      name: name.trim(),
      category,
      price: parseFloat(price),
      originalPrice: parseFloat(price) * 2,
      rating: 4.8,
      reviewsCount: 1,
      images: [imageUrl.trim()],
      description: description.trim(),
      sizes: ["A6", "A5", "A4", "A3"],
      finishes: ["Standard Matte", "Textured Matte", "Black Wooden Frame"]
    };

    setProductsList([...productsList, newProd]);
    
    // Reset Form
    setName("");
    setPrice("");
    setImageUrl("");
    setDescription("");
    setIsAdding(false);

    setAlert({ type: "success", message: "Product successfully added to catalog!" });
    setTimeout(() => setAlert({ type: "", message: "" }), 3000);
  };

  const handleEditInit = (prod) => {
    setEditingId(prod.id);
    setName(prod.name);
    setCategory(prod.category);
    setPrice(prod.price.toString());
    setImageUrl(prod.images[0]);
    setDescription(prod.description);
    setIsAdding(true);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!name.trim() || !price || !imageUrl.trim() || !description.trim()) return;

    const updatedList = productsList.map((prod) => {
      if (prod.id === editingId) {
        return {
          ...prod,
          name: name.trim(),
          category,
          price: parseFloat(price),
          images: [imageUrl.trim()],
          description: description.trim()
        };
      }
      return prod;
    });

    setProductsList(updatedList);
    
    // Reset Form
    setName("");
    setPrice("");
    setImageUrl("");
    setDescription("");
    setEditingId(null);
    setIsAdding(false);

    setAlert({ type: "success", message: "Product details successfully updated!" });
    setTimeout(() => setAlert({ type: "", message: "" }), 3000);
  };

  const handleDeleteProduct = (id) => {
    if (confirm("Are you sure you want to remove this product from catalog?")) {
      setProductsList(productsList.filter((prod) => prod.id !== id));
      setAlert({ type: "error", message: "Product removed from catalog." });
      setTimeout(() => setAlert({ type: "", message: "" }), 3000);
    }
  };

  const handleCancel = () => {
    setName("");
    setPrice("");
    setImageUrl("");
    setDescription("");
    setEditingId(null);
    setIsAdding(false);
  };

  // Mock Sales Analytics Chart Data
  const monthlySales = [
    { month: "Jan", sales: 12000 },
    { month: "Feb", sales: 19000 },
    { month: "Mar", sales: 15000 },
    { month: "Apr", sales: 24000 },
    { month: "May", sales: 32000 },
    { month: "Jun", sales: 46000 }
  ];

  const maxSale = Math.max(...monthlySales.map((s) => s.sales));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans space-y-10 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-light pb-4">
        <div>
          <h1 className="text-3xl font-bold font-fredoka text-primary">Admin Dashboard</h1>
          <p className="text-gray-muted text-xs mt-1">Manage catalog products and review store revenue charts.</p>
        </div>
        <button
          onClick={() => {
            if (isAdding) handleCancel();
            else setIsAdding(true);
          }}
          className="bg-primary hover:bg-primary-hover text-white text-xs font-semibold py-2.5 px-6 rounded-full shadow transition flex items-center gap-1.5 self-start sm:self-center"
        >
          <Plus size={16} /> {isAdding ? "Cancel Form" : "Add New Poster"}
        </button>
      </div>

      {/* Alert Notifications */}
      {alert.message && (
        <div className={`p-4 rounded-xl text-xs font-semibold flex items-center gap-2 border select-none ${
          alert.type === "success" ? "bg-green-50 border-green-200 text-green-600" : "bg-red-50 border-red-200 text-red-600"
        }`}>
          {alert.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          {alert.message}
        </div>
      )}

      {/* 1. Analytics Stats Indicators */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-border-light rounded-2xl p-5 shadow-sm space-y-2.5">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Sales</span>
            <DollarSign size={20} />
          </div>
          <div>
            <h4 className="text-2xl font-bold text-primary font-fredoka">$148,250</h4>
            <p className="text-[10px] text-green-600 font-bold flex items-center gap-0.5 mt-0.5">
              <TrendingUp size={12} /> +12.5% this month
            </p>
          </div>
        </div>

        <div className="bg-white border border-border-light rounded-2xl p-5 shadow-sm space-y-2.5">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-bold uppercase tracking-wider">Orders Count</span>
            <ShoppingBag size={20} />
          </div>
          <div>
            <h4 className="text-2xl font-bold text-primary font-fredoka">412 Orders</h4>
            <p className="text-[10px] text-gray-muted mt-0.5">Average cart size: $359</p>
          </div>
        </div>

        <div className="bg-white border border-border-light rounded-2xl p-5 shadow-sm space-y-2.5">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-bold uppercase tracking-wider">Coupons Issued</span>
            <Percent size={20} />
          </div>
          <div>
            <h4 className="text-2xl font-bold text-primary font-fredoka">3 Active</h4>
            <p className="text-[10px] text-accent font-bold mt-0.5">154 codes redeemed</p>
          </div>
        </div>

        <div className="bg-white border border-border-light rounded-2xl p-5 shadow-sm space-y-2.5">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-bold uppercase tracking-wider">Active Visitors</span>
            <TrendingUp size={20} />
          </div>
          <div>
            <h4 className="text-2xl font-bold text-primary font-fredoka">1,240 Online</h4>
            <p className="text-[10px] text-green-600 font-bold flex items-center gap-0.5 mt-0.5">
              Conversion rate: 3.1%
            </p>
          </div>
        </div>
      </section>

      {/* 2. Visual Charts Simulation */}
      <section className="bg-white border border-border-light rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h3 className="font-bold text-sm uppercase tracking-wide text-primary">Monthly Sales Performance</h3>
          <p className="text-[11px] text-gray-muted mt-0.5">Simulated store earnings (USD) over the last 6 months</p>
        </div>

        {/* Custom CSS Chart bars layout */}
        <div className="flex justify-between items-end h-64 border-b border-border-light pb-2 pt-6 gap-2 sm:gap-6 select-none">
          {monthlySales.map((item, idx) => {
            const barHeight = (item.sales / maxSale) * 100;
            return (
              <div key={idx} className="flex-grow flex flex-col items-center gap-2 group">
                <span className="text-[9px] font-bold text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                  ${item.sales / 1000}K
                </span>
                <div
                  className="w-full bg-gray-light hover:bg-accent rounded-t-lg transition-all duration-500 ease-out"
                  style={{ height: `${barHeight}%`, minHeight: "10px" }}
                ></div>
                <span className="text-[10px] font-bold text-gray-500">{item.month}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Product Add Form Overlay/Block */}
      {isAdding && (
        <section className="bg-gray-light/30 border border-border-light rounded-3xl p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wide text-primary">
              {editingId ? "Edit Product Details" : "Create New Catalog Entry"}
            </h3>
            <p className="text-[11px] text-gray-muted mt-0.5">Specify name, details, prices, and high-res thumbnail</p>
          </div>

          <form onSubmit={editingId ? handleSaveEdit : handleAddProduct} className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-gray-700">Poster Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Star Wars Retro Fan Art"
                className="w-full p-2.5 bg-white border border-border-light rounded-xl focus:outline-none focus:border-accent"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-gray-700">Category Theme</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 bg-white border border-border-light rounded-xl focus:outline-none focus:border-accent font-semibold"
              >
                <option value="Anime">Anime</option>
                <option value="Sports">Sports</option>
                <option value="Movies">Movies</option>
                <option value="Gaming">Gaming</option>
                <option value="Inspirational">Inspirational</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-gray-700">Base Price (USD)</label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 249"
                className="w-full p-2.5 bg-white border border-border-light rounded-xl focus:outline-none focus:border-accent"
              />
            </div>

            <div className="md:col-span-3 space-y-1">
              <label className="font-semibold text-gray-700">High-Resolution Image URL</label>
              <input
                type="url"
                required
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Paste direct image link (e.g. from Unsplash https://images.unsplash.com/...)"
                className="w-full p-2.5 bg-white border border-border-light rounded-xl focus:outline-none focus:border-accent"
              />
            </div>

            <div className="md:col-span-3 space-y-1">
              <label className="font-semibold text-gray-700">Product Description</label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detail high-density pigment ink print specs..."
                className="w-full p-3 bg-white border border-border-light rounded-xl focus:outline-none focus:border-accent resize-none"
              ></textarea>
            </div>

            <div className="md:col-span-3 flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleCancel}
                className="border border-border-light py-2 px-6 rounded-xl font-semibold hover:bg-gray-light transition text-primary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-primary hover:bg-primary-hover text-white py-2 px-6 rounded-xl font-semibold shadow transition"
              >
                {editingId ? "Save Changes" : "Create Entry"}
              </button>
            </div>
          </form>
        </section>
      )}

      {/* 4. CRUD Product Management Table */}
      <section className="bg-white border border-border-light rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border-light">
          <h3 className="font-bold text-sm uppercase tracking-wide text-primary">Catalog Management</h3>
          <p className="text-[11px] text-gray-muted mt-0.5">Edit variant pricing or delete mock items</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-gray-light/50 border-b border-border-light text-gray-505 font-bold uppercase tracking-wider">
                <th className="p-4 w-20">Thumbnail</th>
                <th className="p-4">Poster Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4 text-center w-24">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {productsList.map((prod) => (
                <tr key={prod.id} className="hover:bg-gray-light/20 transition">
                  <td className="p-4">
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      className="h-10 w-8 object-cover rounded border border-border-light bg-gray-50 shadow-sm"
                    />
                  </td>
                  <td className="p-4 font-bold text-gray-800">{prod.name}</td>
                  <td className="p-4">
                    <span className="bg-gray-light px-2 py-0.5 rounded font-semibold text-gray-600">
                      {prod.category}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-gray-800">${prod.price}</td>
                  <td className="p-4">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => handleEditInit(prod)}
                        title="Edit product"
                        className="p-1 text-gray-400 hover:text-accent transition rounded"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(prod.id)}
                        title="Delete product"
                        className="p-1 text-gray-400 hover:text-red-500 transition rounded"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
