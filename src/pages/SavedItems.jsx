import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Bookmark,
    Play,
    Store,
    Video,
    ChevronRight,
    ExternalLink,
    Info,
    ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "https://mapman-production.up.railway.app";

const SavedItems = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("shops");
    const [loading, setLoading] = useState(false);

    // Mock data
    const savedShops = [
        {
            id: 1,
            name: "Ini's Mehandi",
            category: "Premium Artist",
            time: "10:30 AM - 04:16 PM",
            image:
                "https://images.unsplash.com/photo-1621252179027-94459d278660?w=600&h=600&fit=crop",
            location: "Main Street, NY",
        },
        {
            id: 2,
            name: "Glam Hair Studio",
            category: "Luxury Salon",
            time: "11:00 AM - 08:00 PM",
            image:
                "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=600&fit=crop",
            location: "Fifth Avenue, NY",
        },
    ];

    const savedVideos = [
        {
            id: 1,
            title: "Co-bride Mehandi Art",
            shopName: "Ini's Mehandi",
            thumbnail:
                "https://images.unsplash.com/photo-1621252179027-94459d278660?w=600&h=800&fit=crop",
            views: "1.2k",
        },
        {
            id: 2,
            title: "Bridal Henna Concept",
            shopName: "Ini's Mehandi",
            thumbnail:
                "https://images.unsplash.com/photo-1590670460287-03649561869e?w=600&h=800&fit=crop",
            views: "890",
        },
        {
            id: 3,
            title: "Party Design Session",
            shopName: "Ini's Mehandi",
            thumbnail:
                "https://images.unsplash.com/photo-1621252176993-94459d278660?w=600&h=800&fit=crop",
            views: "2.5k",
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50/50 pb-32">
            {/* ── PREMIUM HEADER ── */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-slate-200/60 px-4 py-4 md:px-10 lg:py-5">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="space-y-1">
                            <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
                                Saved <span className="text-blue-600">Videos</span>
                            </h1>
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 bg-blue-600 text-white text-[7px] font-black uppercase tracking-widest rounded-full leading-none">
                                    Vault
                                </span>
                                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest opacity-70 leading-none">
                                    Secured Collection
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 border border-blue-100 rounded-2xl shadow-inner flex md:flex">
                            <Bookmark className="w-4 h-4 text-blue-600" fill="currentColor" />
                        </div>
                        <div className="text-right hidden sm:block">
                            <p className="text-[9px] font-black text-slate-900 uppercase tracking-widest leading-none">
                                Registry
                            </p>
                            <p className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest leading-none">
                                Optimized
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 md:px-10 py-10 space-y-16">
                {/* ── INTERACTIVE ENROLLMENT CARD ── */}
                <section className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 shadow-2xl p-6 md:p-9">
                    <div className="absolute inset-0">
                        <img
                            src="assets/notification-banner.jpg"
                            className="w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent" />
                    </div>

                    <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-[1.5rem] overflow-hidden border-2 border-white/20 shadow-2xl shrink-0 rotate-2 transition-transform hover:rotate-0 duration-500">
                                <img
                                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop"
                                    className="w-full h-full object-cover scale-110"
                                    alt="Enroll"
                                />
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_10px_#2563eb]" />
                                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400">
                                        Merchant Hub Expansion
                                    </p>
                                </div>
                                <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter italic leading-none">
                                    Entroll Shop Owners <br />{" "}
                                    <span className="text-blue-400">Business Network</span>
                                </h2>
                            </div>
                        </div>
                        <button className="group relative px-8 py-4 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 overflow-hidden">
                            <span className="relative z-10">Join Registry</span>
                            <ChevronRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>
                </section>

                {/* ── PREMIUM TAB SYSTEM ── */}
                <div className="space-y-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-200 pb-8">
                        <div className="space-y-4">
                            <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.5em] flex items-center gap-4">
                                <span className="w-10 h-[1px] bg-slate-200" /> Collection Filter
                            </p>
                            <div className="flex p-1.5 bg-slate-100 rounded-2xl w-fit">
                                {[
                                    {
                                        id: "shops",
                                        label: "Merchant Hubs",
                                        icon: <Store className="w-4 h-4" />,
                                    },
                                    {
                                        id: "videos",
                                        label: "Visual Vault",
                                        icon: <Video className="w-4 h-4" />,
                                    },
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-3 px-8 py-3.5 rounded-xl transition-all duration-500 font-black text-[10px] uppercase tracking-widest ${activeTab === tab.id
                                            ? "bg-white text-slate-900 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)] scale-[1.02]"
                                            : "text-slate-500 hover:text-slate-900"
                                            }`}
                                    >
                                        {tab.icon} {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-4 px-4 py-2 bg-emerald-50/50 rounded-full border border-emerald-100">
                            <ShieldCheck className="w-4 h-4 text-emerald-500" />
                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest leading-none">
                                {activeTab === "shops" ? savedShops.length : savedVideos.length}{" "}
                                Saved Entries Analyzed
                            </span>
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {activeTab === "shops" ? (
                            <motion.div
                                key="shops-grid"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.4 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
                            >
                                {savedShops.map((shop, i) => (
                                    <div
                                        key={shop.id}
                                        className="group relative bg-white p-4 rounded-[2rem] border border-slate-100 shadow-[0_15px_60px_-15px_rgba(0,0,0,0.06)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] transition-all duration-700"
                                    >
                                        <div className="flex gap-7 items-center">
                                            {/* Shop Thumbnail with Navigation Icon Overlay */}
                                            <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden shadow-2xl shrink-0 ring-1 ring-slate-100 ring-inset">
                                                <img
                                                    src={shop.image}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                                    alt={shop.name}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent mix-blend-overlay" />

                                                {/* Pro Navigation Overlay */}
                                                <div className="absolute bottom-2.5 right-2.5 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl cursor-pointer hover:bg-white hover:scale-110 transition-all z-10">
                                                    <div className="w-6.5 h-6.5 bg-blue-500 text-white rounded-lg flex items-center justify-center rotate-45 shadow-lg shadow-blue-500/30">
                                                        <ExternalLink className="w-3.5 h-3.5 rotate-[-45deg]" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex-1 min-w-0 py-2 pr-6 flex flex-col justify-between h-full min-h-[114px]">
                                                <div className="space-y-1.5">
                                                    <h4 className="text-xl font-extrabold text-slate-900 tracking-tight leading-none group-hover:text-blue-600 transition-colors">
                                                        {shop.name}
                                                    </h4>
                                                    <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold uppercase tracking-wider opacity-80">
                                                        <span>{shop.category}</span>
                                                        <span className="w-1 h-1 bg-slate-300 rounded-full" />
                                                        <span>{shop.time}</span>
                                                    </div>
                                                </div>

                                                {/* Ultra-Compact Premium Button */}
                                                <div className="mt-4 w-fit relative">
                                                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-amber-300 to-indigo-500 rounded-full blur-[4px] opacity-15 group-hover:opacity-30 transition-opacity" />
                                                    <div className="relative p-[1.5px] bg-gradient-to-r from-emerald-500 via-yellow-400 to-indigo-600 rounded-full ring-1 ring-white/5 group-hover:shadow-[0_0_12px_-5px_rgba(251,191,36,0.3)] transition-all">
                                                        <button
                                                            onClick={() =>
                                                                navigate(`/shop-detail/${shop.id}`)
                                                            }
                                                            className="flex items-center gap-2 px-4 py-1.5 bg-slate-950 text-white rounded-full text-[9px] font-black uppercase tracking-[0.12em] transition-all active:scale-95 shadow-inner"
                                                        >
                                                            <div className="p-0.5 bg-white rounded-md shadow-sm">
                                                                <Store className="w-3 h-3 text-slate-900" />
                                                            </div>
                                                            Details
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Top-Right Bookmark Button - Refined Shadow */}
                                                <div className="absolute top-5 right-5">
                                                    <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)] transition-all active:scale-90 border border-slate-50 group/save">
                                                        <Bookmark className="w-5 h-5 text-slate-900 fill-slate-900 group-hover/save:scale-110 transition-transform" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="videos-grid"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
                            >
                                {savedVideos.map((video, idx) => (
                                    <div
                                        key={video.id}
                                        className="group relative aspect-[9/13] overflow-hidden rounded-[2.2rem] bg-slate-950 shadow-xl border border-white/5 transition-all hover:-translate-y-1.5 duration-500"
                                    >
                                        <img
                                            src={video.thumbnail}
                                            className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-40 transition-all duration-700"
                                            alt={video.title}
                                        />

                                        <div
                                            onClick={() =>
                                                navigate(`/video-player/${video.id}`, {
                                                    state: { videos: savedVideos, index: idx },
                                                })
                                            }
                                            className="absolute inset-0 flex items-center justify-center cursor-pointer"
                                        >
                                            <div className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/20 transition-all scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-100 duration-500">
                                                <Play className="w-5 h-5 fill-white ml-0.5" />
                                            </div>
                                        </div>

                                        <div className="absolute top-4 right-4">
                                            <div className="px-2.5 py-1.5 rounded-xl bg-black/40 backdrop-blur-md flex items-center gap-2 text-[9px] font-black text-blue-400 border border-white/5 italic">
                                                <Bookmark className="w-3 h-3 fill-current" />{" "}
                                                {video.views}
                                            </div>
                                        </div>

                                        <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col gap-4">
                                            <div className="space-y-1">
                                                <h4 className="text-xs font-black text-white uppercase tracking-tighter leading-tight truncate">
                                                    {video.title}
                                                </h4>
                                                <p className="text-[8px] font-black text-blue-400 uppercase tracking-widest opacity-80">
                                                    {video.shopName}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => navigate(`/shop-detail/1`)}
                                                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2"
                                            >
                                                <Store className="w-4 h-4" /> Visit Store
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>

            {/* ── PROFESSIONAL FOOTER EMPTY STATE ── */}
            <div className="flex flex-col items-center justify-center gap-8 py-20">
                <div className="w-24 h-24 bg-slate-100 rounded-[2.5rem] flex items-center justify-center text-slate-300 relative group transition-all hover:bg-blue-50 hover:text-blue-200">
                    <ShieldCheck className="w-10 h-10 transition-transform group-hover:scale-110" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white shadow-xl rounded-full flex items-center justify-center">
                        <Info className="w-3.5 h-3.5 text-blue-500" />
                    </div>
                </div>
                <div className="text-center space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-900 italic">
                        Registry Integrity Verified
                    </p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest opacity-60">
                        End-to-End Encryption Enabled
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SavedItems;
