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

      {/* ── STYLISH FLOATING HEADER ── */}
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="relative w-full mb-6 md:mb-8 mt-2 overflow-hidden shadow-sm border border-slate-200/60 bg-white/80 backdrop-blur-xl rounded-[0.5rem] py-4 md:py-5 px-5 md:px-7 flex flex-col md:flex-row md:items-center justify-between gap-5 z-10">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100/50 to-purple-100/50 rounded-full blur-[60px] pointer-events-none -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-emerald-100/50 to-cyan-100/50 rounded-full blur-[60px] pointer-events-none -ml-20 -mb-20"></div>

          <div className="flex items-center gap-4 relative z-10">
            <button
              onClick={() => navigate("/profile")}
              className="w-10 h-10 bg-slate-100 hover:bg-slate-200 border border-slate-200/60 rounded-xl flex items-center justify-center text-slate-600 hover:text-slate-900 transition-all active:scale-95 shadow-sm shrink-0"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex flex-col gap-0.5">
              <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight uppercase leading-none">
                My Shops
              </h2>
              <div className="flex items-center gap-2 pt-0.5">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                  Merchant Dashboard
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 relative z-10 self-start md:self-auto">
            <button
              onClick={() => navigate("/edit-shop", { state: { createNew: true } })}
              className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl font-bold text-[10px] uppercase tracking-wider shadow-md shadow-slate-900/20 hover:bg-slate-800 transition-all active:scale-95"
            >
              <div className="w-4 h-4 bg-white/20 rounded flex items-center justify-center">
                <Plus className="w-3 h-3 text-white" />
              </div>
              <span>Add Shop</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 pt-4 pb-10">
        {shops.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-[0.5rem] border border-slate-100 shadow-sm mx-4 mb-10 mt-10">
            <div className="w-20 h-20 bg-slate-50 rounded-[1rem] flex items-center justify-center mb-5 border border-slate-100 shadow-inner">
              <Store className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-black text-slate-800 tracking-tight mb-2">No Shops Yet</h3>
            <p className="text-sm text-slate-400 max-w-xs font-medium mb-6 leading-relaxed">
              You haven't registered any shops yet. Click below to add your first business listing.
            </p>
            <button
              onClick={() => navigate("/edit-shop", { state: { createNew: true } })}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-[0.5rem] font-black text-sm shadow-md transition-all hover:scale-105 active:scale-95"
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
