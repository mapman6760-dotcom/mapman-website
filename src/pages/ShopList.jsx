import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, Store, Plus, MapPin, Loader2, Clock, Phone, ArrowRight, ExternalLink } from "lucide-react";
import { API_BASE_URL } from "../config";

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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest animate-pulse">
            Loading Shops...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] pb-20 font-sans">
      {/* HEADER */}
      <header className="h-20 px-4 md:px-6 flex items-center justify-between border-b border-slate-200/60 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center shadow-sm hover:border-blue-300 hover:bg-blue-50 transition-all active:scale-95"
          >
            <ChevronLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div className="space-y-0.5">
            <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase italic leading-none">
              My Shops
            </h1>
            <p className="text-[9px] font-black text-blue-500/60 uppercase tracking-[0.2em]">
              Manage your business listings
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate("/edit-shop", { state: { createNew: true } })}
          className="bg-slate-900 hover:bg-black text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] transition-all shadow-lg hover:shadow-xl flex items-center gap-2 active:scale-95"
        >
          <Plus className="w-4 h-4" /> Add Shop
        </button>
      </header>

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
                className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-500 cursor-pointer group flex flex-col"
              >
                {/* Banner Image */}
                <div className="w-full h-40 md:h-48 bg-slate-100 relative overflow-hidden">
                  <img 
                    src={shop.shopImage || "https://images.unsplash.com/photo-1621535281470-348633c7793d?w=800&fit=crop"} 
                    alt={shop.shopName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white rounded-lg text-[9px] font-black uppercase tracking-widest border border-white/20 shadow-sm">
                      {shop.category || "General"}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4">
                     <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border shadow-sm backdrop-blur-md ${shop.status === 'active' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-slate-500/20 text-slate-300 border-slate-500/30'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${shop.status === 'active' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'}`}></span>
                      {shop.status || "Unknown"}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl md:text-2xl font-black tracking-tight line-clamp-1 group-hover:text-blue-300 transition-colors uppercase italic">
                      {shop.shopName}
                    </h3>
                    <div className="flex items-center gap-1.5 text-white/80 text-[10px] md:text-xs mt-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 shrink-0 text-blue-400" />
                      <span className="truncate">{shop.address ? shop.address.split(",").slice(0, 2).join(",") : "No address"}</span>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-100/60 group-hover:bg-blue-50/30 transition-colors">
                      <div className="w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0">
                        <Clock className="w-4 h-4 text-blue-500" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Timing</p>
                        <p className="text-[10px] font-bold text-slate-700 truncate">{shop.openTime} - {shop.closeTime}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-100/60 group-hover:bg-blue-50/30 transition-colors">
                      <div className="w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0">
                        <Phone className="w-4 h-4 text-emerald-500" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Contact</p>
                        <p className="text-[10px] font-bold text-slate-700 truncate">{shop.shopNumber || "N/A"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      ID: {shop.id}
                    </span>
                    <button className="flex items-center gap-1.5 text-[10px] font-black text-blue-600 uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                      Edit details <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ShopList;
