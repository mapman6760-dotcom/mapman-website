import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  Navigation,
  Layers,
  Maximize,
  Filter,
  Star,
  Clock,
  ChevronRight,
  Loader2,
  Phone,
  MessageSquare,
  Globe,
  ZoomIn,
  ZoomOut,
  Eye,
  ImageIcon,
  ArrowUpRight,
  X,
  Store,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Map, Marker as MapMarker } from "pigeon-maps";

const API_BASE_URL = "https://mapman-production.up.railway.app";

// --- API Helper ---
const fetchShops = async (input = "") => {
  try {
    console.log(input);

    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/shop/search?input=${input}`, {
      headers: { usertoken: token },
    });
    console.log(`${API_BASE_URL}/shop/search?input=${input}`);

    const result = await response.json();
    console.log(result.data);
    if (result.status === 200) return result.data;
    return [];
  } catch (error) {
    console.error("Error fetching shops:", error);
    return [];
  }
};

const MapExplore = ({ isCollapsed }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("category") || "";

  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(initialSearch);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);
  const [showShopModal, setShowShopModal] = useState(false);
  const [zoom, setZoom] = useState(14);
  const [userPos, setUserPos] = useState(null);
  const [center, setCenter] = useState([11.02, 77.0]);

  useEffect(() => {
    loadShops(initialSearch);
    setSearchInput(initialSearch);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          setUserPos(coords);
        },
        (err) => console.log("Geolocation error:", err),
      );
    }
  }, [initialSearch]);

  // --- HAIVERSINE DISTANCE CALCULATION ---
  const getRawDistance = React.useCallback((targetLat, targetLong) => {
    if (!userPos || !targetLat || !targetLong) return 999999;
    const R = 6371;
    const dLat = (parseFloat(targetLat) - userPos.lat) * (Math.PI / 180);
    const dLon = (parseFloat(targetLong) - userPos.lng) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(userPos.lat * (Math.PI / 180)) *
        Math.cos(parseFloat(targetLat) * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }, [userPos]);

  const getDistance = React.useCallback((targetLat, targetLong) => {
    const d = getRawDistance(targetLat, targetLong);
    if (d === 999999) return "1.2 km";
    return d.toFixed(1) + " km";
  }, [getRawDistance]);

  // Re-sort shops dynamically whenever user position or shops list changes
  const sortedShops = React.useMemo(() => {
    if (!userPos || shops.length === 0) return shops;
    return [...shops].sort(
      (a, b) => getRawDistance(a.lat, a.long) - getRawDistance(b.lat, b.long),
    );
  }, [shops, userPos, getRawDistance]);

  // --- AUTOCOMPLETE LOGIC ---
  useEffect(() => {
    const timer = setTimeout(async () => {
      // Show suggestions starting from the first character
      if (searchInput.trim().length > 0 && showSuggestions) {
        const data = await fetchShops(searchInput);
        const filtered = data.filter((shop) => shop.lat && shop.long);
        setSuggestions(filtered.slice(0, 5));
      } else {
        setSuggestions([]);
      }
    }, 200); // Shorter debounce for snappier feel
    return () => clearTimeout(timer);
  }, [searchInput, showSuggestions]);

  const loadShops = async (input = "") => {
    setLoading(true);
    setShowSuggestions(false);
    const data = await fetchShops(input);
    // Only include shops with valid latitude and longitude
    const validShops = data.filter(
      (shop) =>
        shop.lat &&
        shop.long &&
        !isNaN(parseFloat(shop.lat)) &&
        !isNaN(parseFloat(shop.long)),
    );
    // Sort by distance if user position is available
    const loadedSortedShops = userPos
      ? validShops.sort(
          (a, b) =>
            getRawDistance(a.lat, a.long) - getRawDistance(b.lat, b.long),
        )
      : validShops;

    setShops(loadedSortedShops);
    setLoading(false);
    if (loadedSortedShops.length > 0) {
      setSelectedShop(loadedSortedShops[0]);
      setCenter([
        parseFloat(loadedSortedShops[0].lat),
        parseFloat(loadedSortedShops[0].long),
      ]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadShops(searchInput);
  };

  return (
    <div
      className={`fixed inset-0 transition-all duration-500 ease-in-out bg-[#F8FAFC] z-10 flex flex-col overflow-hidden ${isCollapsed ? "lg:left-16" : "lg:left-60"} top-16 lg:top-20`}
    >
      {/* 1. LEFT-TOP COMPACT SEARCH & SMART AUTOCOMPLETE */}
      <div className="absolute top-6 left-6 z-40 pointer-events-none w-full max-w-[340px] lg:max-w-[400px]">
        <div className="relative pointer-events-auto">
          <form onSubmit={handleSearch} className="flex items-center">
            <div className="relative flex-1 group">
              <div className="absolute inset-0 bg-blue-600/5 blur-2xl group-hover:bg-blue-600/10 transition-all duration-500 rounded-[1.5rem]"></div>
              <div className="relative flex items-center bg-white border border-slate-100 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] transition-all duration-300 focus-within:shadow-[0_10px_40px_-10px_rgba(37,99,235,0.15)] focus-within:border-blue-500/30 px-2 py-1 gap-2">
                <div className="w-8 h-8 flex items-center justify-center text-slate-400">
                  <Search className="w-4 h-4 stroke-[2.5]" />
                </div>
                <input
                  type="text"
                  placeholder="Search hubs..."
                  value={searchInput}
                  onFocus={() => setShowSuggestions(true)}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="flex-1 h-10 bg-transparent outline-none text-[13px] font-bold text-slate-900 placeholder:text-slate-400 placeholder:font-medium"
                />
                <AnimatePresence>
                  {searchInput && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      type="button"
                      onClick={() => {
                        setSearchInput("");
                        setSuggestions([]);
                        loadShops("");
                        navigate("/map");
                      }}
                      className="w-8 h-8 flex items-center justify-center text-slate-300 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  )}
                </AnimatePresence>
                <button
                  type="submit"
                  className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-md hover:bg-blue-600 hover:shadow-blue-600/30 active:scale-95 transition-all"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              {/* --- COMPACT AUTOCOMPLETE DROPDOWN --- */}
              <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-3xl border border-white/40 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.1)] overflow-hidden z-[60]"
                  >
                    <div className="p-1.5 max-h-[350px] overflow-y-auto no-scrollbar">
                      {suggestions.map((shop, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setSearchInput(shop.shopName);
                            loadShops(shop.shopName);
                            setCenter([
                              parseFloat(shop.lat),
                              parseFloat(shop.long),
                            ]);
                            navigate(`/shop-detail/${shop.id}`);
                          }}
                          className="w-full flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl transition-all group text-left border border-transparent hover:border-slate-100"
                        >
                          <div className="w-10 h-10 rounded-xl bg-slate-50 shadow-sm flex items-center justify-center overflow-hidden border border-slate-100 group-hover:scale-105 transition-transform">
                            {shop.shopImage ? (
                              <img
                                src={shop.shopImage}
                                alt={shop.shopName}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.style.display = "none";
                                  e.target.nextSibling.style.display = "flex";
                                }}
                              />
                            ) : null}
                            <div
                              className={`${shop.shopImage ? "hidden" : "flex"} w-full h-full items-center justify-center bg-white`}
                            >
                              <img
                                src="https://cdn-icons-png.flaticon.com/128/14104/14104037.png"
                                alt="placeholder"
                                className="w-6 h-6 opacity-30 object-contain"
                              />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-0.5">
                              <p className="text-[11px] font-black text-slate-900 uppercase tracking-tight truncate">
                                {shop.shopName}
                              </p>
                              <span className="text-[8px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded-md">
                                {shop.category}
                              </span>
                            </div>
                            <p className="text-[8px] font-medium text-slate-400 line-clamp-1 truncate leading-tight">
                              {shop.address || "Local Hub, Mapman sector"}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="bg-slate-50/50 p-2.5 border-t border-slate-100/50 flex items-center justify-between">
                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
                        Matched {suggestions.length} Hubs
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </form>
        </div>
      </div>

      {/* 2. MAP AREA with SATURATION */}
      <div className="flex-1 relative overflow-hidden bg-slate-100">
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-white/40 z-50 backdrop-blur-xl"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] animate-pulse">
                  Syncing Map Data...
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="h-full w-full">
          <Map
            center={center}
            zoom={zoom}
            onBoundsChanged={({ center, zoom }) => {
              setCenter(center);
              setZoom(zoom);
            }}
          >
            {sortedShops.map((shop, i) => (
              <MapMarker
                key={shop.id}
                anchor={[parseFloat(shop.lat), parseFloat(shop.long)]}
                onClick={() => {
                  setSelectedShop(shop);
                  setCenter([parseFloat(shop.lat), parseFloat(shop.long)]);
                  setShowShopModal(true);
                }}
              >
                <MarkerUI
                  shop={shop}
                  isActive={selectedShop?.id === shop.id}
                  delay={i * 0.05}
                />
              </MapMarker>
            ))}
          </Map>
        </div>

        {/* Controls - Premium Float */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
          {[
            { icon: ZoomIn, action: () => setZoom((z) => Math.min(z + 1, 20)) },
            { icon: ZoomOut, action: () => setZoom((z) => Math.max(z - 1, 1)) },
            { icon: Maximize, action: () => setZoom(12) },
            { icon: Navigation, action: () => {} },
          ].map((item, i) => (
            <button
              key={i}
              onClick={item.action}
              className="w-12 h-12 bg-white/90 backdrop-blur-2xl text-slate-800 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.1)] hover:text-blue-600 transition-all border border-white/50 flex items-center justify-center group hover:scale-110 active:scale-95"
            >
              <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          ))}
        </div>
      </div>

      {/* 3. REDESIGNED SLIDING CARDS */}
      <div className="absolute bottom-8 left-0 right-0 z-30 px-2 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h3 className="text-[10px] font-black text-slate-900 bg-white/90 backdrop-blur-xl px-4 py-2.5 rounded-2xl shadow-xl border border-white/50 flex items-center gap-2.5 uppercase tracking-tighter">
                <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
                Verified Local Hubs ({sortedShops.length})
              </h3>
            </div>
          </div>

          <div className="flex gap-5 overflow-x-auto no-scrollbar pb-6 -mx-2 px-2 snap-x scroll-smooth">
            {sortedShops.length > 0
              ? sortedShops.map((shop, i) => (
                  <motion.div
                    key={shop.id}
                    onClick={() => {
                      setSelectedShop(shop);
                      setCenter([parseFloat(shop.lat), parseFloat(shop.long)]);
                      navigate(`/shop-detail/${shop.id}`);
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className={`min-w-[280px] sm:min-w-[320px] lg:min-w-[340px] h-[115px] bg-white border flex items-center p-3 rounded-[1.5rem] transition-all duration-500 cursor-pointer group snap-center relative ${selectedShop?.id === shop.id ? "border-blue-600 ring-4 ring-blue-500/5 shadow-[0_30px_60px_-15px_rgba(37,99,235,0.12)] scale-[1.02] z-10" : "border-slate-100 shadow-[0_15px_30px_-5px_rgba(0,0,0,0.04)] hover:border-blue-200"}`}
                  >
                    {/* Left: Enhanced Image Frame */}
                    <div className="w-[85px] h-full flex-shrink-0 relative overflow-hidden rounded-[1.2rem] bg-slate-50 border border-slate-100/50 group-hover:shadow-md transition-all duration-700">
                      {shop.shopImage ? (
                        <img
                          src={shop.shopImage}
                          alt={shop.shopName}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                      ) : null}
                      <div
                        className={`${shop.shopImage ? "hidden" : "flex"} w-full h-full flex-col items-center justify-center bg-slate-50`}
                      >
                        <div className="p-3 bg-white rounded-2xl shadow-sm mb-2">
                          <img
                            src="https://cdn-icons-png.flaticon.com/128/14104/14104037.png"
                            alt="placeholder"
                            className="w-8 h-8 opacity-40 object-contain"
                          />
                        </div>
                        <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest text-center">
                          Local Hub
                        </span>
                      </div>
                      <div className="absolute top-2 left-2 px-2.5 py-1 bg-blue-600/10 backdrop-blur-sm rounded-lg text-[7px] font-black text-blue-600 uppercase tracking-widest border border-blue-600/10">
                        {shop.category}
                      </div>
                    </div>

                    {/* Right: Refined Info Section */}
                    <div className="flex-1 ml-4 flex flex-col h-full py-0.5">
                      <div className="mb-0.5">
                        <h4 className="text-[13px] font-black text-slate-900 tracking-tighter uppercase group-hover:text-blue-600 transition-colors flex items-center gap-2">
                          {shop.shopName}
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        </h4>
                      </div>

                      <p className="text-[10px] text-slate-500 font-medium line-clamp-2 uppercase tracking-tight leading-relaxed mb-auto">
                        {shop.address ||
                          "Sector mapman, local discovery zone, india"}
                      </p>

                      <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-50">
                        <div className="flex items-center gap-2 bg-blue-50/50 px-2 py-1 rounded-lg border border-blue-100/20">
                          <Navigation className="w-3 h-3 text-blue-600" />
                          <span className="text-[9px] font-black text-slate-800 tracking-tight">
                            {getDistance(
                              parseFloat(shop.lat),
                              parseFloat(shop.long),
                            )}
                          </span>
                        </div>
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/shop-detail/${shop.id}`);
                          }}
                          className="flex items-center gap-1 text-blue-600 font-black text-[9px] uppercase tracking-widest group/btn"
                        >
                          Go Now{" "}
                          <ArrowUpRight className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              : !loading && (
                  <div className="w-full h-[130px] flex flex-col items-center justify-center bg-white/80 backdrop-blur-xl rounded-[1.5rem] border-2 border-dashed border-slate-200">
                    <Globe className="w-10 h-10 text-slate-200 mb-2 animate-pulse" />
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">
                      Searching for Hubs in this sector...
                    </p>
                  </div>
                )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showShopModal && selectedShop && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowShopModal(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[320px] bg-white rounded-[2rem] shadow-[0_30px_80px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col border border-slate-100"
            >
              <button 
                onClick={() => setShowShopModal(false)}
                className="absolute top-4 right-4 z-10 w-8 h-8 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="h-36 relative bg-slate-100">
                {selectedShop.shopImage ? (
                  <img src={selectedShop.shopImage} alt={selectedShop.shopName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-200">
                    <ImageIcon className="w-10 h-10 text-slate-400 opacity-50" />
                  </div>
                )}
                <div className="absolute bottom-3 left-3 px-3 py-1 bg-blue-600/90 backdrop-blur-md rounded-lg text-[10px] font-black text-white uppercase tracking-widest shadow-lg">
                  {selectedShop.category}
                </div>
              </div>
              
              <div className="p-5 flex flex-col gap-3">
                <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase leading-tight mb-1">
                    {selectedShop.shopName}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed flex items-start gap-1">
                    <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-blue-500" />
                    {selectedShop.address || "Local Hub, Mapman sector"}
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                    <Navigation className="w-4 h-4 text-blue-600" />
                    <span className="text-[11px] font-black text-slate-800 tracking-tight">
                      {getRawDistance(parseFloat(selectedShop.lat), parseFloat(selectedShop.long)).toFixed(2)} km away
                    </span>
                  </div>
                </div>
                
                <div className="mt-1 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => {
                      if (selectedShop.lat && selectedShop.long) {
                        window.open(`https://www.google.com/maps?q=${selectedShop.lat},${selectedShop.long}`, "_blank");
                      }
                    }}
                    className="flex items-center justify-center gap-2 py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all"
                  >
                    <Navigation className="w-3.5 h-3.5" /> Directions
                  </button>
                  <button 
                    onClick={() => navigate(`/shop-detail/${selectedShop.id}`)}
                    className="flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-600/20 transition-all active:scale-95"
                  >
                    <Store className="w-3.5 h-3.5" /> View Shop
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

// --- MEMOIZED MARKER UI COMPONENT ---
const MarkerUI = React.memo(({ shop, isActive, delay = 0, onClick }) => {
  const bgColorClass = getCategoryColor(shop.category);
  const borderColorClass = getCategoryBorderColor(shop.category);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 15, delay }}
      onClick={onClick}
      className={`relative z-10 -translate-x-1/2 -translate-y-1/2 group cursor-pointer pointer-events-auto transition-all ${isActive ? "z-20 scale-125" : ""}`}
    >
      <div
        className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white border-2 ${borderColorClass} px-3 py-1.5 rounded-[10px] shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all flex flex-col items-center justify-center min-w-[70px] ${isActive ? "scale-105 z-30 ring-2 ring-blue-500/20" : "scale-100 opacity-90 hover:opacity-100"}`}
      >
        <span className="text-[13px] font-black text-slate-800 leading-tight whitespace-nowrap">{shop.shopName}</span>
        <span className="text-[11px] font-medium text-slate-500 leading-tight capitalize whitespace-nowrap">{shop.category}</span>
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white"></div>
      </div>
      <div className="relative flex items-center justify-center">
        <div
          className={`w-5 h-5 rounded-full border-[3px] border-white shadow-sm ${bgColorClass} transition-transform duration-300 ${isActive ? "ring-4 ring-blue-500/20" : ""}`}
        ></div>
      </div>
    </motion.div>
  );
});

const getCategoryColor = (category = "") => {
  const cat = category.toLowerCase();
  if (cat.includes("theater") || cat.includes("cinema")) return "bg-purple-500";
  if (cat.includes("restaurant") || cat.includes("food") || cat.includes("eating")) return "bg-orange-500";
  if (cat.includes("hospital") || cat.includes("medical") || cat.includes("health")) return "bg-red-500";
  if (cat.includes("bar") || cat.includes("pub") || cat.includes("drink")) return "bg-amber-500";
  if (cat.includes("grocery") || cat.includes("shopping") || cat.includes("store")) return "bg-green-500";
  if (cat.includes("textile") || cat.includes("cloth") || cat.includes("fashion")) return "bg-pink-500";
  if (cat.includes("resort") || cat.includes("park")) return "bg-emerald-500";
  if (cat.includes("bunk") || cat.includes("fuel") || cat.includes("petrol")) return "bg-slate-700";
  if (cat.includes("spa") || cat.includes("salon") || cat.includes("beauty")) return "bg-rose-400";
  if (cat.includes("hotel") || cat.includes("stay")) return "bg-blue-500";
  if (cat.includes("furniture") || cat.includes("wood")) return "bg-teal-500";
  return "bg-indigo-500";
};

const getCategoryBorderColor = (category = "") => {
  const cat = category.toLowerCase();
  if (cat.includes("theater") || cat.includes("cinema")) return "border-purple-500";
  if (cat.includes("restaurant") || cat.includes("food") || cat.includes("eating")) return "border-orange-500";
  if (cat.includes("hospital") || cat.includes("medical") || cat.includes("health")) return "border-red-500";
  if (cat.includes("bar") || cat.includes("pub") || cat.includes("drink")) return "border-amber-500";
  if (cat.includes("grocery") || cat.includes("shopping") || cat.includes("store")) return "border-green-500";
  if (cat.includes("textile") || cat.includes("cloth") || cat.includes("fashion")) return "border-pink-500";
  if (cat.includes("resort") || cat.includes("park")) return "border-emerald-500";
  if (cat.includes("bunk") || cat.includes("fuel") || cat.includes("petrol")) return "border-slate-700";
  if (cat.includes("spa") || cat.includes("salon") || cat.includes("beauty")) return "border-rose-400";
  if (cat.includes("hotel") || cat.includes("stay")) return "border-blue-500";
  if (cat.includes("furniture") || cat.includes("wood")) return "border-teal-500";
  return "border-indigo-500";
};

const getCategoryIcon = (category = "") => {
  const cat = category.toLowerCase();
  let iconName = "Others";

  // Mapping provided by USER list: theater, restaurant, hospital, bar, grocery, textile, resort, bunk, spa, hotel, others
  if (cat.includes("theater") || cat.includes("cinema")) iconName = "Theater";
  else if (
    cat.includes("restaurant") ||
    cat.includes("food") ||
    cat.includes("eating")
  )
    iconName = "Restaurant";
  else if (
    cat.includes("hospital") ||
    cat.includes("medical") ||
    cat.includes("health")
  )
    iconName = "Hospital";
  else if (cat.includes("bar") || cat.includes("pub") || cat.includes("drink"))
    iconName = "Bar";
  else if (
    cat.includes("grocery") ||
    cat.includes("shopping") ||
    cat.includes("store")
  )
    iconName = "Grocery";
  else if (
    cat.includes("textile") ||
    cat.includes("cloth") ||
    cat.includes("fashion")
  )
    iconName = "Textile";
  else if (cat.includes("resort") || cat.includes("park")) iconName = "Resorts";
  else if (
    cat.includes("bunk") ||
    cat.includes("fuel") ||
    cat.includes("petrol")
  )
    iconName = "Bunk";
  else if (
    cat.includes("spa") ||
    cat.includes("salon") ||
    cat.includes("beauty")
  )
    iconName = "Spa";
  else if (cat.includes("hotel") || cat.includes("stay")) iconName = "Hotel";

  return (
    <img
      src={`/assets/${iconName}.png`}
      alt={category}
      className="w-full h-full object-contain"
    />
  );
};

export default MapExplore;
