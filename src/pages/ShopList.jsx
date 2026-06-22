import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, Store, Plus, MapPin, Loader2, Clock, Phone, ArrowRight, ExternalLink } from "lucide-react";
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-h-screen bg-[#F5F7FA] pb-20 font-sans"
    >
      <SEO
        title="My Shops Dashboard"
        description="Manage your business listings, review active shop coordinates, edit details, and analyze visitor views on MapMan."
        canonical="https://mapman.in/shop-list"
      />
      {/* ── REDESIGNED PREMIUM HEADER CARD ── */}
      <div className="relative w-full mb-6 md:mb-8 overflow-hidden shadow-xl rounded-none border-b border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-6 md:p-8 lg:px-12 lg:py-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none -ml-20 -mb-20"></div>

        <div className="flex items-center gap-6 relative z-10">
          <button
            onClick={() => navigate("/profile")}
            className="w-12 h-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center shadow-lg hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95 transition-all text-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="space-y-1.5">
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase italic leading-none drop-shadow-lg">
              My Shops
            </h1>
            <div className="flex items-center gap-2 pt-1.5">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              <p className="text-[10px] font-black text-blue-200 uppercase tracking-[0.3em] opacity-90">
                Manage your business listings
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 relative z-10">
          <button
            onClick={() => navigate("/edit-shop", { state: { createNew: true } })}
            className="bg-white/10 backdrop-blur-xl px-6 py-3.5 rounded-2xl flex items-center gap-3 shadow-xl border border-white/10 hover:bg-white/20 transition-all active:scale-95 group text-white font-bold text-sm tracking-wider uppercase"
          >
            <Plus className="w-4 h-4" />
            <span className="relative z-10">Add Shop</span>
          </button>
        </div>
      </div>

      <main className="max-w-6xl mx-auto p-2 md:p-4 mt-4">
        {shops.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-[2rem] border border-slate-100 shadow-sm mx-2">
            <div className="w-24 h-24 bg-blue-50 rounded-[2rem] shadow-sm flex items-center justify-center mb-6">
              <Store className="w-10 h-10 text-blue-500" />
            </div>
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2">No Shops Found</h3>
            <p className="text-sm text-slate-500 max-w-md">You haven't added any shops yet. Click the button above to register your first business.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {shops.map((shop, idx) => (
              <motion.div
                key={shop.id || idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => navigate("/edit-shop", { state: { shopId: shop.id, shopData: shop } })}
                className="relative bg-white/70 backdrop-blur-2xl rounded-[2.5rem] p-3 md:p-4 overflow-hidden border border-white/60 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-15px_rgba(37,99,235,0.15)] hover:-translate-y-2 transition-all duration-500 cursor-pointer group flex flex-col"
              >
                {/* Subtle Glow Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Banner Image */}
                <div className="w-full h-44 md:h-52 bg-slate-100 relative rounded-[2rem] overflow-hidden shadow-inner">
                  <img
                    src={shop.shopImage || "https://images.unsplash.com/photo-1621535281470-348633c7793d?w=800&fit=crop"}
                    alt={shop.shopName}
                    className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/30 to-slate-900/10 opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>

                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-lg">
                      <Store className="w-3.5 h-3.5 text-white/90" />
                      <span className="text-white text-[9px] font-black uppercase tracking-widest">
                        {shop.category || "General"}
                      </span>
                    </div>
                  </div>

                  <div className="absolute top-4 right-4">
                    <span className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border shadow-lg backdrop-blur-md transition-colors ${shop.status === 'active' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border-rose-500/30'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${shop.status === 'active' ? 'bg-emerald-400 animate-[pulse_2s_ease-in-out_infinite] shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.8)]'}`}></span>
                      {shop.status || "Unknown"}
                    </span>
                  </div>

                  {/* Title Area */}
                  <div className="absolute bottom-4 left-4 right-4 text-white z-10 transform group-hover:-translate-y-1 transition-transform duration-500">
                    <h3 className="text-xl md:text-2xl font-black tracking-tighter line-clamp-1 text-white drop-shadow-lg uppercase italic">
                      {shop.shopName}
                    </h3>
                    <div className="flex items-center gap-2 text-white/80 text-[10px] md:text-xs mt-1.5 font-medium">
                      <div className="p-1.5 bg-white/20 rounded-full backdrop-blur-sm border border-white/20">
                        <MapPin className="w-3 h-3 text-white" />
                      </div>
                      <span className="truncate tracking-wide">{shop.address ? shop.address.split(",").slice(0, 2).join(",") : "Location not specified"}</span>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="pt-5 px-2 pb-2 flex flex-col gap-4 relative z-10">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5 p-3.5 rounded-[1.25rem] bg-slate-50/80 hover:bg-white border border-slate-200/60 shadow-sm transition-all group-hover:border-blue-100 group-hover:shadow-blue-500/5">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-3.5 h-3.5 text-blue-500" />
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Timing</span>
                      </div>
                      <p className="text-xs font-black text-slate-800 tracking-tight">{shop.openTime} <span className="text-slate-400 font-medium mx-0.5">to</span> {shop.closeTime}</p>
                    </div>

                    <div className="flex flex-col gap-1.5 p-3.5 rounded-[1.25rem] bg-slate-50/80 hover:bg-white border border-slate-200/60 shadow-sm transition-all group-hover:border-emerald-100 group-hover:shadow-emerald-500/5">
                      <div className="flex items-center gap-2 mb-1">
                        <Phone className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Contact</span>
                      </div>
                      <p className="text-xs font-black text-slate-800 tracking-tight truncate">{shop.shopNumber || "Not Available"}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-200/60 mt-1">
                    <div className="flex flex-col">
                      <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Shop ID</span>
                      <span className="text-[10px] font-black text-slate-700 font-mono tracking-wider">{shop.id}</span>
                    </div>
                    <button className="flex items-center justify-center w-10 h-10 rounded-[1rem] bg-slate-900 text-white group-hover:bg-blue-600 transition-colors shadow-lg active:scale-95">
                      <ArrowRight className="w-4 h-4 group-hover:-rotate-45 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </motion.div>
  );
};

export default ShopList;
