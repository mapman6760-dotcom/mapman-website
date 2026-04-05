import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Navigation, Layers, Maximize, Filter, Star, Clock, ChevronRight, Loader2, Phone, MessageSquare, Globe, ZoomIn, ZoomOut, Eye, ImageIcon, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "https://mapman-production.up.railway.app";

// --- API Helper ---
const fetchShops = async (input = "") => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_BASE_URL}/shop/search?input=${input}`, {
            headers: { "usertoken": token }
        });
        const result = await response.json();
        if (result.status === 200) return result.data;
        return [];
    } catch (error) {
        console.error("Error fetching shops:", error);
        return [];
    }
};

const MapExplore = ({ isCollapsed, initialSearch }) => {
    const navigate = useNavigate();
    const [shops, setShops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchInput, setSearchInput] = useState(initialSearch || "");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedShop, setSelectedShop] = useState(null);
    const [zoom, setZoom] = useState(14);
    const [userPos, setUserPos] = useState(null);

    useEffect(() => {
        loadShops(initialSearch || "");
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((pos) => {
                setUserPos({ lat: pos.coords.latitude, lng: pos.coords.longitude });
            }, (err) => console.log("Geolocation error:", err));
        }
    }, [initialSearch]);

    // --- AUTOCOMPLETE LOGIC ---
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (searchInput.trim().length > 1 && showSuggestions) {
                const data = await fetchShops(searchInput);
                setSuggestions(data.slice(0, 5));
            } else {
                setSuggestions([]);
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [searchInput, showSuggestions]);

    const loadShops = async (input = "") => {
        setLoading(true);
        setShowSuggestions(false);
        const data = await fetchShops(input);
        setShops(data);
        setLoading(false);
        if (data.length > 0) setSelectedShop(data[0]);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        loadShops(searchInput);
    };

    // --- HAIVERSINE DISTANCE CALCULATION ---
    const getDistance = (targetLat, targetLong) => {
        if (!userPos || !targetLat || !targetLong) return "1.2 km";
        const R = 6371;
        const dLat = (targetLat - userPos.lat) * (Math.PI / 180);
        const dLon = (targetLong - userPos.lng) * (Math.PI / 180);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(userPos.lat * (Math.PI / 180)) * Math.cos(targetLat * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        return d.toFixed(1) + " km";
    };

    const getMarkerPos = (index) => {
        const angle = (index / (shops.length || 1)) * Math.PI * 2;
        const radius = 18 + (index * 6);
        return { x: `${50 + Math.cos(angle) * (radius * 1.2)}%`, y: `${40 + Math.sin(angle) * radius}%` };
    };

    return (
        <div className={`fixed inset-0 transition-all duration-500 ease-in-out bg-[#F8FAFC] z-10 flex flex-col overflow-hidden ${isCollapsed ? "lg:left-16" : "lg:left-60"} top-20 lg:top-24`}>

            {/* 1. LEFT-TOP COMPACT SEARCH & SMART AUTOCOMPLETE */}
            <div className="absolute top-6 left-6 z-40 pointer-events-none w-full max-w-[340px] lg:max-w-[400px]">
                <div className="relative pointer-events-auto">
                    <form onSubmit={handleSearch} className="flex items-center">
                        <div className="relative flex-1 group">
                            <div className="absolute inset-0 bg-blue-600/5 blur-2xl group-hover:bg-blue-600/10 transition-all duration-500 rounded-[1.5rem]"></div>
                            <div className="relative flex items-center bg-white/95 backdrop-blur-2xl border border-white/40 rounded-2xl shadow-[0_20px_40px_rgba(30,41,59,0.06)] overflow-hidden transition-all focus-within:ring-4 focus-within:ring-blue-600/5 focus-within:border-blue-600/20">
                                <Search className="ml-5 w-4 h-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search name, category..."
                                    value={searchInput}
                                    onFocus={() => setShowSuggestions(true)}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    className="flex-1 h-11 lg:h-12 pl-4 pr-10 bg-transparent outline-none text-[12px] font-bold text-slate-800 placeholder:text-slate-400 uppercase tracking-tighter"
                                />
                                {searchInput && (
                                    <button
                                        type="button"
                                        onClick={() => { setSearchInput(""); setSuggestions([]); }}
                                        className="absolute right-4 p-2 text-slate-300 hover:text-slate-600 transition-colors"
                                    >
                                        <Clock className="w-3.5 h-3.5" />
                                    </button>
                                )}
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
                                                    }}
                                                    className="w-full flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl transition-all group text-left border border-transparent hover:border-slate-100"
                                                >
                                                    <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-base group-hover:scale-110 transition-transform">
                                                        {getCategoryIcon(shop.category)}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between mb-0.5">
                                                            <p className="text-[10px] font-black text-slate-900 uppercase tracking-tight truncate">{shop.shopName}</p>
                                                            <span className="text-[7px] font-black text-blue-600 uppercase tracking-widest">{shop.category}</span>
                                                        </div>
                                                        <p className="text-[8px] font-medium text-slate-400 line-clamp-1 truncate leading-tight">
                                                            {shop.address || "Local Hub, Mapman sector"}
                                                        </p>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                        <div className="bg-slate-50/50 p-2.5 border-t border-slate-100/50 flex items-center justify-between">
                                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Matched {suggestions.length} Hubs</span>
                                            <button onClick={handleSearch} className="text-[8px] font-black text-blue-600 uppercase tracking-widest hover:underline flex items-center gap-1">
                                                Show All <ChevronRight className="w-2.5 h-2.5" />
                                            </button>
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
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center bg-white/40 z-50 backdrop-blur-xl">
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] animate-pulse">Syncing Map Data...</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <iframe
                    title="Big Map Explore"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                    src={selectedShop ? `https://maps.google.com/maps?q=${selectedShop.lat},${selectedShop.long}&z=${zoom}&output=embed` : `https://maps.google.com/maps?q=11.02,77.00&z=12&output=embed`}
                    className="filter saturate-[1.2] contrast-[1.1] grayscale-[0.1] brightness-[1.02] border-none"
                ></iframe>

                {/* Markers with improved look */}
                {!loading && shops.length > 0 && (
                    <div className="pointer-events-none absolute inset-0">
                        {shops.map((shop, i) => {
                            const pos = getMarkerPos(i);
                            return (
                                <Marker
                                    key={shop.id}
                                    x={pos.x}
                                    y={pos.y}
                                    label={shop.shopName}
                                    icon={getCategoryIcon(shop.category)}
                                    isActive={selectedShop?.id === shop.id}
                                    delay={i * 0.05}
                                    onClick={() => setSelectedShop(shop)}
                                />
                            );
                        })}
                    </div>
                )}

                {/* Controls - Premium Float */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
                    {[
                        { icon: ZoomIn, action: () => setZoom(z => Math.min(z + 1, 20)) },
                        { icon: ZoomOut, action: () => setZoom(z => Math.max(z - 1, 1)) },
                        { icon: Maximize, action: () => setZoom(12) },
                        { icon: Navigation, action: () => { } }
                    ].map((item, i) => (
                        <button key={i} onClick={item.action}
                            className="w-12 h-12 bg-white/90 backdrop-blur-2xl text-slate-800 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.1)] hover:text-blue-600 transition-all border border-white/50 flex items-center justify-center group hover:scale-110 active:scale-95"
                        >
                            <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        </button>
                    ))}
                </div>
            </div>

            {/* 3. REDESIGNED SLIDING CARDS */}
            <div className="absolute bottom-8 left-0 right-0 z-30 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <h3 className="text-[10px] font-black text-slate-900 bg-white/90 backdrop-blur-xl px-4 py-2.5 rounded-2xl shadow-xl border border-white/50 flex items-center gap-2.5 uppercase tracking-tighter">
                                <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
                                Verified Local Hubs ({shops.length})
                            </h3>
                        </div>
                    </div>

                    <div className="flex gap-5 overflow-x-auto no-scrollbar pb-6 -mx-2 px-2 snap-x scroll-smooth">
                        {shops.length > 0 ? (
                            shops.map((shop, i) => (
                                <motion.div
                                    key={shop.id}
                                    onClick={() => {
                                        setSelectedShop(shop);
                                        // navigate("/shop-detail"); // Uncomment if you want immediate navigation
                                    }}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.08 }}
                                    className={`min-w-[320px] sm:min-w-[360px] lg:min-w-[380px] h-[142px] bg-white border flex items-center p-4 rounded-[2rem] transition-all duration-500 cursor-pointer group snap-center relative ${selectedShop?.id === shop.id ? "border-blue-600 ring-4 ring-blue-500/5 shadow-[0_30px_60px_-15px_rgba(37,99,235,0.12)] scale-[1.02] z-10" : "border-slate-100 shadow-[0_15px_30px_-5px_rgba(0,0,0,0.04)] hover:border-blue-200"}`}
                                >
                                    {/* Left: Enhanced Image Frame */}
                                    <div className="w-[105px] h-full flex-shrink-0 relative overflow-hidden rounded-[1.5rem] bg-slate-50 border border-slate-100/50 group-hover:shadow-md transition-all duration-700">
                                        {shop.shopImage ? (
                                            <>
                                                <img
                                                    src={`${API_BASE_URL}${shop.shopImage}`}
                                                    alt={shop.shopName}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'flex';
                                                    }}
                                                />
                                                <div className="hidden w-full h-full flex-col items-center justify-center bg-slate-50">
                                                    <div className="p-3 bg-white rounded-2xl shadow-sm mb-2">
                                                        <ImageIcon className="w-6 h-6 text-slate-200" />
                                                    </div>
                                                    <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest text-center">Empty Hub</span>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50">
                                                <div className="p-3 bg-white rounded-2xl shadow-sm mb-2">
                                                    <ImageIcon className="w-6 h-6 text-slate-200" />
                                                </div>
                                                <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest text-center">Empty Hub</span>
                                            </div>
                                        )}
                                        <div className="absolute top-2 left-2 px-2.5 py-1 bg-blue-600/10 backdrop-blur-sm rounded-lg text-[7px] font-black text-blue-600 uppercase tracking-widest border border-blue-600/10">
                                            {shop.category}
                                        </div>
                                    </div>

                                    {/* Right: Refined Info Section */}
                                    <div className="flex-1 ml-6 flex flex-col h-full py-1">
                                        <div className="mb-1">
                                            <h4 className="text-[15px] font-black text-slate-900 tracking-tighter uppercase group-hover:text-blue-600 transition-colors flex items-center gap-2">
                                                {shop.shopName}
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                            </h4>
                                        </div>

                                        <p className="text-[10px] text-slate-500 font-medium line-clamp-2 uppercase tracking-tight leading-relaxed mb-auto">
                                            {shop.address || "Sector mapman, local discovery zone, india"}
                                        </p>

                                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                                            <div className="flex items-center gap-2.5 bg-blue-50/50 px-3 py-1.5 rounded-xl border border-blue-100/20">
                                                <Navigation className="w-3.5 h-3.5 text-blue-600" />
                                                <span className="text-[10px] font-black text-slate-800 tracking-tight">
                                                    {getDistance(parseFloat(shop.lat), parseFloat(shop.long))}
                                                </span>
                                            </div>
                                            <div
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(`/shop-detail/${shop.id}`);
                                                }}
                                                className="flex items-center gap-1.5 text-blue-600 font-black text-[10px] uppercase tracking-widest group/btn"
                                            >
                                                Go Now <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : !loading && (
                            <div className="w-full h-[130px] flex flex-col items-center justify-center bg-white/80 backdrop-blur-xl rounded-[1.5rem] border-2 border-dashed border-slate-200">
                                <Globe className="w-10 h-10 text-slate-200 mb-2 animate-pulse" />
                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Searching for Hubs in this sector...</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- STYLISH MARKER ---
const Marker = ({ x, y, label, icon, isActive, delay = 0, onClick }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 15, delay }}
        style={{ left: x, top: y }}
        onClick={onClick}
        className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 group cursor-pointer pointer-events-auto transition-all ${isActive ? "z-20 scale-125" : ""}`}
    >
        <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-4 bg-slate-900 text-white px-4 py-2 rounded-2xl shadow-2xl transition-all whitespace-nowrap ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-90 invisible group-hover:opacity-100 group-hover:scale-100 group-hover:visible"}`}>
            <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-[8px] border-transparent border-t-slate-900"></div>
        </div>
        <div className="relative">
            <div className={`absolute -inset-5 rounded-full opacity-0 transition-opacity ${isActive ? "bg-blue-600/30 opacity-100 animate-pulse" : "group-hover:bg-red-500/20 group-hover:opacity-100 animate-ping"}`}></div>
            <div className={`w-12 h-12 rounded-[1.5rem] border-4 border-white shadow-2xl flex items-center justify-center transform transition-all active:scale-95 ${isActive ? "bg-blue-600 shadow-blue-500/30" : "bg-red-500"}`}>
                <span className="text-2xl transition-transform group-hover:scale-110">{icon}</span>
            </div>
            <div className={`absolute left-1/2 -translate-x-1/2 top-full -mt-2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] transition-all ${isActive ? "border-t-blue-600" : "border-t-red-500"}`}></div>
        </div>
    </motion.div>
);


const getCategoryIcon = (category = "") => {
    const cat = category.toLowerCase();
    if (cat.includes("fancy") || cat.includes("shopping")) return "🛍️";
    if (cat.includes("hotel") || cat.includes("resturant") || cat.includes("food") || cat.includes("eating")) return "🍕";
    if (cat.includes("bikes") || cat.includes("transport") || cat.includes("auto")) return "🏍️";
    if (cat.includes("bunk") || cat.includes("fuel") || cat.includes("petrol")) return "⛽";
    if (cat.includes("medical") || cat.includes("pharmacy") || cat.includes("hospital")) return "💊";
    if (cat.includes("theatre") || cat.includes("cinema") || cat.includes("theter")) return "🎬";
    return "🏪";
};

export default MapExplore;
