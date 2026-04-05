import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft,
    AlertTriangle,
    Bookmark,
    Store,
    Phone,
    ChevronRight,
    Eye,
    Play,
    Share2,
    MapPin,
    Loader2,
    ShieldCheck,
    Video,
    ExternalLink,
    MessageCircle,
    Clock,
    Briefcase,
    Star,
    Users,
    Info,
    Calendar,
    Layers,
    Hash
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useNavigate, useParams } from "react-router-dom";

const API_BASE_URL = "https://mapman-production.up.railway.app";

const ShopDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("details");
    const [loading, setLoading] = useState(true);
    const [shopInfo, setShopInfo] = useState(null);
    const [videos, setVideos] = useState([]);
    const [isSaved, setIsSaved] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchShopData();
    }, [id]);

    const fetchShopData = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_BASE_URL}/shop/getShopById`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "usertoken": token,
                },
                body: JSON.stringify({ shopId: parseInt(id) }),
            });

            const text = await response.text();
            try {
                const result = JSON.parse(text);
                if (result.status === 200) {
                    setShopInfo(result.data.shop);
                    setVideos(result.data.shopVideos || []);
                    setIsSaved(result.data.shopSavedAlready);
                } else {
                    setError(result.message || "Merchant Sync Pending");
                }
            } catch (err) {
                console.error("Non-JSON Response:", text);
                setError("Network Hub Unavailable");
            }
        } catch (err) {
            console.error("Fetch error:", err);
            setError("Failed to connect to Mapman Core");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 bg-white rounded-[3rem]">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-10 h-10 border-2 border-slate-100 border-t-blue-600 rounded-full"
                />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Synchronizing Registry...</p>
            </div>
        );
    }

    if (error || !shopInfo) {
        return (
            <div className="min-h-[40vh] flex flex-col items-center justify-center gap-8 p-10 bg-white rounded-[4rem] border border-slate-50 shadow-sm">
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center border border-red-100">
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
                <div className="text-center space-y-2">
                    <h2 className="text-xl font-black text-slate-900 tracking-tighter uppercase leading-none">{error || "Access Interrupted"}</h2>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic opacity-60">Authentication Protocol Error</p>
                </div>
                <button
                    onClick={() => navigate(-1)}
                    className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm flex items-center gap-3 transition-all shadow-lg active:scale-95"
                >
                    <ArrowLeft className="w-4 h-4" /> Go Back
                </button>
            </div>
        );
    }

    const shopBanner = `${API_BASE_URL}${shopInfo.shopImage}`;
    const gallery = [
        shopInfo.image1,
        shopInfo.image2,
        shopInfo.image3,
        shopInfo.image4,
    ].filter(Boolean).map(img => `${API_BASE_URL}${img}`);

    return (
        <div className="max-w-5xl mx-auto w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            {/* ── CONTEXTUAL HEADER ── */}
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-3 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-blue-200 hover:bg-blue-50 transition-all group"
                    >
                        <ArrowLeft className="w-5 h-5 text-slate-600 group-hover:text-blue-600" />
                    </button>
                    <div>
                        <h1 className="text-lg font-black text-slate-900 uppercase tracking-tighter leading-none">{shopInfo.shopName}</h1>
                        <p className="text-[9px] font-black text-blue-600 uppercase tracking-[0.2em] mt-1.5 opacity-80 italic">Verified Merchant Hub</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {/* ── REPORT BUTTON (Redesigned as Card) ── */}
                    <button
                        className="w-12 h-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-300 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all shadow-sm active:scale-95"
                        title="Report Hub"
                    >
                        <AlertTriangle className="w-5 h-5" />
                    </button>

                    <button
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isSaved
                            ? 'bg-orange-500 text-white shadow-lg'
                            : 'bg-white border border-slate-100 text-slate-300 hover:text-orange-500'
                            }`}
                    >
                        <Bookmark className="w-5 h-5" fill={isSaved ? "currentColor" : "none"} />
                    </button>
                </div>
            </div>

            {/* ── HIGH-IMPACT HERO BANNER (REDUCED SIZE) ── */}
            <section className="relative h-[180px] md:h-[260px] w-full overflow-hidden bg-slate-900 rounded-[3rem] shadow-2xl">
                <img
                    src={shopBanner}
                    className="w-full h-full object-cover"
                    alt="Shop Banner"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/20" />

                <div className="absolute bottom-8 left-10 right-10 z-10 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="px-3 py-1 bg-blue-600 text-white text-[7px] font-black uppercase tracking-[0.3em] rounded-full border border-white/20 shadow-xl flex items-center gap-1.5">
                            <ShieldCheck className="w-2.5 h-2.5" /> HUB PASS
                        </span>
                    </div>

                    <div className="space-y-1">
                        <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter leading-[0.85]">
                            {shopInfo.shopName}
                        </h2>
                        <div className="flex items-center gap-3 text-white/50 font-bold uppercase text-[8px] md:text-[9px] tracking-[0.2em] pl-1">
                            <MapPin className="w-3 h-3 text-rose-500" />
                            {shopInfo.address.split(',').slice(0, 2).join(', ')}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CONDITIONAL GALLERY ── */}
            {gallery.length > 0 && (
                <section className="-mt-12 px-4 relative z-20">
                    <div className="bg-white/95 backdrop-blur-3xl p-3 rounded-[2.5rem] border border-slate-100 shadow-2xl overflow-hidden">
                        <Swiper
                            modules={[Pagination, Autoplay, Navigation]}
                            spaceBetween={12}
                            slidesPerView={2.2}
                            breakpoints={{ 640: { slidesPerView: 3.5 }, 1024: { slidesPerView: 5.5 } }}
                            loop={gallery.length >= 4}
                            className="w-full h-[120px] md:h-[150px]"
                        >
                            {gallery.map((img, i) => (
                                <SwiperSlide key={i}>
                                    <div className="w-full h-full rounded-2xl overflow-hidden shadow-sm border border-slate-50 hover:scale-[1.02] transition-transform">
                                        <img src={img} className="w-full h-full object-cover" alt={`Asset ${i}`} />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </section>
            )}

            {/* ── TABS ── */}
            <nav className={`sticky top-0 z-50 bg-[#FDFDFD]/90 backdrop-blur-3xl py-4 -mx-4 px-4 border-b border-slate-100 ${gallery.length === 0 ? 'mt-0' : ''}`}>
                <div className="flex items-center gap-3">
                    {[
                        { id: "details", label: "Intelligence", icon: <Info className="w-3 h-3" /> },
                        { id: "videos", label: "Digital Reel", icon: <Video className="w-3 h-3" /> }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] transition-all ${activeTab === tab.id ? 'bg-slate-950 text-white shadow-xl' : 'text-slate-400'
                                }`}
                        >
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </div>
            </nav>

            <main className="">
                <AnimatePresence mode="wait">
                    {activeTab === "details" ? (
                        <motion.div
                            key="intelligence"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                        >
                            <div className="lg:col-span-8 space-y-10">
                                <div className="space-y-6 px-1">
                                    <div className="flex items-center gap-4">
                                        <div className="w-1.5 h-8 bg-slate-900 rounded-full" />
                                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Official Descriptor</h3>
                                    </div>
                                    <p className="text-xl md:text-2xl font-bold text-slate-800 leading-[1.6] tracking-tight uppercase">
                                        {shopInfo.description || "The merchant Registry narrative is currently being synchronized. Connection protocols are active for direct voice inquiry."}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { icon: <Clock className="w-4 h-4" />, label: "Operation Hours", value: `${shopInfo.openTime}-${shopInfo.closeTime}`, grad: "from-blue-600/10 to-indigo-600/5", iconBg: "bg-blue-600/10 text-blue-600" },
                                        { icon: <Briefcase className="w-4 h-4" />, label: "Market Sector", value: shopInfo.category, grad: "from-emerald-600/10 to-teal-600/5", iconBg: "bg-emerald-600/10 text-emerald-600" },
                                        { icon: <Star className="w-4 h-4" />, label: "Member Status", value: "Verified Gold", grad: "from-amber-600/10 to-orange-600/5", iconBg: "bg-amber-600/10 text-amber-600" },
                                        { icon: <Hash className="w-4 h-4" />, label: "Registry ID", value: `MAP-${shopInfo.id}`, grad: "from-slate-600/10 to-zinc-600/5", iconBg: "bg-slate-600/10 text-slate-600" }
                                    ].map((stat, i) => (
                                        <div key={i} className={`group relative bg-gradient-to-br ${stat.grad} p-6 rounded-[2.5rem] border border-white transition-all hover:scale-[1.02] shadow-sm hover:shadow-xl`}>
                                            <div className={`w-11 h-11 mb-5 rounded-2xl flex items-center justify-center transition-all ${stat.iconBg} shadow-inner`}>
                                                {stat.icon}
                                            </div>
                                            <h4 className="text-[8px] font-black text-slate-400 uppercase tracking-[0.4em] mb-2">{stat.label}</h4>
                                            <p className="text-[12px] font-black text-slate-900 uppercase tracking-tight truncate leading-none">{stat.value}</p>
                                            <div className="absolute top-6 right-6 w-1.5 h-1.5 rounded-full bg-white/40 group-hover:scale-150 transition-transform" />
                                        </div>
                                    ))}
                                </div>

                                <div className="p-8 bg-slate-900 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[60px]" />
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="p-3 bg-white/10 rounded-xl border border-white/5">
                                            <MapPin className="w-6 h-6 text-blue-400" />
                                        </div>
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.5em]">Physical Access HUB</h3>
                                    </div>
                                    <p className="text-base font-bold uppercase tracking-tight leading-relaxed mb-8 opacity-90">{shopInfo.address}</p>
                                    <div className="w-full h-24 bg-white/5 rounded-2xl border border-white/5 border-dashed flex items-center justify-center">
                                        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30 animate-pulse">Satellite Uplink Protocol Active</p>
                                    </div>
                                </div>
                            </div>

                            <aside className="lg:col-span-4 space-y-6">
                                <div className="sticky top-24 space-y-6">
                                    <div className="bg-white p-7 rounded-[3rem] border border-slate-100 shadow-xl space-y-8">
                                        <div className="text-center pb-6 border-b border-slate-50">
                                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] mb-1 text-center w-full">Connectivity</h3>
                                            <p className="text-[8px] text-emerald-600 font-bold uppercase tracking-[0.3em] inline-flex items-center gap-1.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Protocol Ready
                                            </p>
                                        </div>
                                        <div className="space-y-4">
                                            {[
                                                { title: "WhatsApp Direct", icon: <MessageCircle className="w-5 h-5 text-green-500" />, action: `https://wa.me/${shopInfo.whatsappNumber}` },
                                                { title: "Voice Call", icon: <Phone className="w-5 h-5 text-blue-500" />, action: `tel:${shopInfo.shopNumber}` },
                                                { title: "Sat-Nav", icon: <ExternalLink className="w-5 h-5 text-rose-500" />, action: `https://www.google.com/maps/dir/?api=1&destination=${shopInfo.lat},${shopInfo.long}` }
                                            ].map((link, i) => (
                                                <a
                                                    key={i}
                                                    href={link.action}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="flex items-center justify-between p-7.5 bg-slate-50 hover:bg-slate-950 hover:text-white rounded-3xl border border-slate-100 transition-all group/link shadow-sm hover:shadow-lg active:scale-[0.98]"
                                                >
                                                    <div className="flex items-center gap-5">
                                                        <div className="p-3 bg-white group-hover/link:bg-white/10 rounded-xl shadow-sm transition-colors">{link.icon}</div>
                                                        <p className="text-[11px] font-black uppercase tracking-widest leading-none">{link.title}</p>
                                                    </div>
                                                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-white transition-all transform group-hover:translate-x-1" />
                                                </a>
                                            ))}
                                        </div>
                                        <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-lg transition-all active:scale-95 flex items-center justify-center">CONNECT NOW</button>
                                    </div>
                                </div>
                            </aside>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="portfolio"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3"
                        >
                            {videos.length > 0 ? (
                                videos.map((video, idx) => (
                                    <motion.div
                                        key={video.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.03 }}
                                        onClick={() => navigate(`/video-player/${video.id}`, {
                                            state: { videos: videos, index: idx }
                                        })}
                                        className="relative aspect-[9/14] rounded-2xl overflow-hidden bg-slate-950 shadow-lg group transition-all cursor-pointer"
                                    >
                                        <video
                                            src={`${API_BASE_URL}${video.video}`}
                                            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.7] group-hover:brightness-100 transition-all duration-700"
                                            muted loop playsInline preload="metadata"
                                            onMouseOver={e => e.target.play()}
                                            onMouseOut={e => { e.target.pause(); e.target.currentTime = 0; }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/80 group-hover:from-black/40 transition-all" />
                                        <div className="absolute bottom-4 left-3 right-3 text-[10px] font-black text-white uppercase tracking-wide leading-tight line-clamp-2 drop-shadow-lg">{video.videoTitle}</div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="col-span-full h-64 flex flex-col items-center justify-center gap-6">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Vault Synchronizing...</p>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <style>{`
        .p-7\\.5 { padding: 1.875rem; }
        .swiper-pagination-bullet { background: #CBD5E1 !important; }
        .swiper-pagination-bullet-active { background: #2563EB !important; width: 12px !important; border-radius: 4px; }
      `}</style>
        </div>
    );
};

export default ShopDetail;
