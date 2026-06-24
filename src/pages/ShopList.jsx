import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Store, Plus, MapPin, Clock, Phone, ArrowRight, Building2, Sparkles } from "lucide-react";
import { API_BASE_URL } from "../config";
import SEO from "../components/SEO";
import { ShopListSkeleton } from "../components/SkeletonLoaders";


const ShopList = () => {
  const navigate = useNavigate();
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShops();
  }, []);

  const fetchShops = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/shop/fetchShop`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          usertoken: token,
        },
      });

      const result = await response.json();
      if (result.status === 200 && result.data) {
        setShops(Array.isArray(result.data) ? result.data : [result.data]);
      }
    } catch (error) {
      console.error("Error fetching shops:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ShopListSkeleton />;

  return (
    <div className="min-h-screen bg-[#F8FAFD] pb-20 animate-fade-in">
      <SEO
        title="My Shops Dashboard"
        description="Manage your business listings, review active shop coordinates, edit details, and analyze visitor views on MapMan."
        canonical="https://mapman.in/shop-list"
      />

      {/* ── PREMIUM HEADER ── */}
      <div className="relative w-full overflow-hidden shadow-xl border-b border-slate-800 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 py-8 md:py-10 px-6 md:px-10 z-10 mb-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] -ml-20 -mb-20 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/profile")}
                className="w-11 h-11 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white hover:bg-white/15 hover:scale-105 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                  <span className="text-[10px] font-black text-blue-300 uppercase tracking-[0.3em]">Merchant Dashboard</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-black text-white tracking-tighter leading-none">
                  My <span className="text-cyan-400">Shops</span>
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/edit-shop", { state: { createNew: true } })}
                className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-blue-600 text-white rounded-2xl font-black text-xs tracking-widest shadow-lg transition-all hover:scale-105 active:scale-95 border border-white/10 hover:border-blue-500 uppercase"
              >
                <Plus className="w-4 h-4" />
                Add Shop
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 pt-4 pb-10">
        {shops.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-3xl border border-slate-100 shadow-sm">
            <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mb-5 shadow-inner">
              <Store className="w-10 h-10 text-blue-400" />
            </div>
            <h3 className="text-xl font-black text-slate-800 tracking-tight mb-2">No Shops Yet</h3>
            <p className="text-sm text-slate-400 max-w-xs font-medium mb-6 leading-relaxed">
              You haven't registered any shops yet. Click below to add your first business listing.
            </p>
            <button
              onClick={() => navigate("/edit-shop", { state: { createNew: true } })}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black text-sm shadow-md transition-all hover:scale-105 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              Register Your First Shop
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {shops.map((shop, idx) => (
              <div
                key={shop.id || idx}
                style={{ animationDelay: `${idx * 50}ms` }}
                onClick={() => navigate("/edit-shop", { state: { shopId: shop.id, shopData: shop } })}
                className="group relative bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-400 cursor-pointer animate-fade-in-up opacity-0 flex flex-col"
              >
                {/* Banner Image */}
                <div className="relative w-full h-44 overflow-hidden bg-slate-100">
                  <img
                    src={shop.shopImage || "https://images.unsplash.com/photo-1621535281470-348633c7793d?w=800&fit=crop"}
                    alt={shop.shopName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Gradient for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  {/* Top badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="flex items-center gap-1.5 px-2.5 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-[9px] font-black text-white uppercase tracking-widest">
                      <Store className="w-3 h-3" />
                      {shop.category || "General"}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border backdrop-blur-md ${shop.status === 'active' ? 'bg-emerald-500/20 text-emerald-200 border-emerald-400/30' : 'bg-rose-500/20 text-rose-200 border-rose-400/30'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${shop.status === 'active' ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
                      {shop.status || "Unknown"}
                    </span>
                  </div>

                  {/* Shop name on image */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="text-base font-black text-white drop-shadow-lg tracking-tight line-clamp-1 uppercase">
                      {shop.shopName}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <MapPin className="w-3 h-3 text-blue-200 shrink-0" />
                      <span className="text-[10px] text-white/75 font-medium truncate">
                        {shop.address ? shop.address.split(",").slice(0, 2).join(",") : "Location not specified"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 flex flex-col gap-3 flex-1">
                  {/* Info Pills */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 px-3 py-2.5 bg-blue-50 border border-blue-100 rounded-xl">
                      <Clock className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      <div className="min-w-0">
                        <div className="text-[8px] font-black text-blue-400 uppercase tracking-widest">Hours</div>
                        <div className="text-[11px] font-black text-slate-800 truncate">{shop.openTime} – {shop.closeTime}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2.5 bg-emerald-50 border border-emerald-100 rounded-xl">
                      <Phone className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <div className="min-w-0">
                        <div className="text-[8px] font-black text-emerald-400 uppercase tracking-widest">Phone</div>
                        <div className="text-[11px] font-black text-slate-800 truncate">{shop.shopNumber || "N/A"}</div>
                      </div>
                    </div>
                  </div>

                  {/* Footer row */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div>
                      <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Shop ID</div>
                      <div className="text-xs font-black text-slate-700 font-mono">{shop.id}</div>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-900 group-hover:bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors gap-2">
                      Manage
                      <ArrowRight className="w-3.5 h-3.5 group-hover:-rotate-45 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ShopList;
