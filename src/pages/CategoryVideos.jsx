import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronLeft,
    Loader2,
    Play,
    Sparkles,
    VideoOff,
    MoreVertical,
    Clock,
    User,
    Eye,
    MessageCircle,
    ChevronRight,
} from "lucide-react";

const API_BASE_URL = "https://mapman-production.up.railway.app";

const CategoryVideos = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const category = searchParams.get("category") || "";

    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [fetchingMore, setFetchingMore] = useState(false);
    const [userPoints, setUserPoints] = useState(0);

    useEffect(() => {
        if (category) {
            fetchCategoryVideos(1, false);
        }
        fetchPoints();
    }, [category]);

    const fetchPoints = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_BASE_URL}/shop/fetchPoints`, {
                headers: { usertoken: token }
            });
            const result = await response.json();
            if (result.status === 200) {
                setUserPoints(result.data || 0);
            }
        } catch (error) {
            console.error("Error fetching points:", error);
        }
    };

    const fetchCategoryVideos = async (pageNum, isLoadMore = false) => {
        if (isLoadMore) setFetchingMore(true);
        else setLoading(true);

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `${API_BASE_URL}/shop/allVideos?category=${encodeURIComponent(category.toLowerCase())}&page=${pageNum}`,
                {
                    method: "GET",
                    headers: {
                        usertoken: token,
                    },
                },
            );

            const result = await response.json();
            if (result.status === 200 && Array.isArray(result.data)) {
                if (isLoadMore) {
                    setVideos((prev) => [...prev, ...result.data]);
                } else {
                    setVideos(result.data);
                }

                if (result.data.length < 30) {
                    setHasMore(false);
                }
            } else {
                if (!isLoadMore) setVideos([]);
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching category videos:", error);
            if (!isLoadMore) setVideos([]);
        } finally {
            setLoading(false);
            setFetchingMore(false);
        }
    };

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchCategoryVideos(nextPage, true);
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-32">
            {/* ── STICKY HEADER ── */}

            <header className="sticky top-0 z-[60] backdrop-blur-2xl border-b border-slate-200/60 transition-all">
                <div className="max-w-[1440px] mx-auto px-6 h-14 md:h-16 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => navigate(-1)}
                            className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all text-slate-800"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <div className="space-y-1">
                            <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
                                {category} Hub
                            </h1>
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                                <p className="text-[9px] font-black text-blue-500/60 uppercase tracking-[0.3em]">
                                    Curated Experiences
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="bg-white px-5 py-2.5 rounded-full flex items-center gap-3 shadow-sm border border-slate-100 hover:shadow-md transition-all active:scale-95 group">
                            <img
                                src="https://cdn-icons-png.flaticon.com/128/7892/7892416.png"
                                className="w-5 h-5 object-contain group-hover:rotate-12 transition-transform"
                                alt="Coins"
                            />
                            <span className="text-sm font-black text-slate-900 tracking-tighter">
                                {userPoints}
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-10">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40">
                        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                            Syncing Selection...
                        </span>
                    </div>
                ) : videos.length > 0 ? (
                    <div className="space-y-12">
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                            <AnimatePresence mode="popLayout">
                                {videos.map((vid, i) => (
                                    <motion.div
                                        key={vid.id || i}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.03 }}
                                        onClick={() =>
                                            navigate(`/video-player/${vid.id || i}`, {
                                                state: { videos: videos, index: i, isMyVideos: false },
                                            })
                                        }
                                        className="group relative flex flex-col rounded-[15px] overflow-hidden border border-slate-200/60 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] transition-all duration-700 cursor-pointer"
                                    >
                                        {/* Immersive Visual Hub */}
                                        <div className="relative aspect-video overflow-hidden">
                                            <video
                                                src={`${API_BASE_URL}${vid.video}`}
                                                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                                                muted
                                                loop
                                                onMouseEnter={(e) => e.target.play()}
                                                onMouseLeave={(e) => {
                                                    e.target.pause();
                                                    e.target.currentTime = 0;
                                                }}
                                            />

                                            {/* Top Float Badges */}
                                            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                                                <div className="px-3 py-1.5 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 flex items-center gap-2 shadow-2xl">
                                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                                                    <span className="text-[8px] font-black text-white uppercase tracking-[0.2em]">
                                                        Studio
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Action Float */}
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                                                <div className="w-14 h-14 bg-blue-600/90 backdrop-blur-md rounded-[12px] flex items-center justify-center text-white shadow-2xl rotate-[-10deg] group-hover:rotate-0 transition-transform">
                                                    <Play className="w-6 h-6 fill-current ml-1" />
                                                </div>
                                            </div>

                                            {/* Bottom Info Bar Overlay */}
                                            <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                        </div>

                                        {/* Architectural Meta Flow */}
                                        <div className="p-6 flex flex-col gap-5">
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 rounded-[12px] bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 flex items-center justify-center text-slate-800 font-bold shrink-0 transition-all group-hover:rotate-3 shadow-sm">
                                                    {vid.shopName?.charAt(0) || "M"}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-[14px] font-black text-slate-900 uppercase tracking-tight line-clamp-1 group-hover:text-blue-600 transition-colors leading-none mb-2">
                                                        {vid.videoTitle}
                                                    </h4>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">
                                                            {vid.shopName}
                                                        </span>
                                                        <div className="px-1.5 py-0.5 bg-blue-50 rounded text-[7px] font-black text-blue-600 uppercase tracking-widest">
                                                            Verified
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-50">
                                                <div className="flex items-center gap-2">
                                                    <Eye className="w-3.5 h-3.5 text-slate-300" />
                                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                                        {vid.views || 0} Views
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-end">
                                                    {vid.whatsappNumber && (
                                                        <div className="flex items-center gap-1.5 text-blue-600 group/chat">
                                                            <span className="text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                                                                Connect
                                                            </span>
                                                            <MessageCircle className="w-4 h-4" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {hasMore && (
                            <div className="flex justify-center pt-8">
                                <button
                                    onClick={handleLoadMore}
                                    disabled={fetchingMore}
                                    className="px-12 py-5 bg-slate-950 text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl hover:scale-105 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-4"
                                >
                                    {fetchingMore && <Loader2 className="w-4 h-4 animate-spin" />}
                                    {fetchingMore ? "Indexing Feed..." : "Load More Experiences"}
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center bg-white/50 backdrop-blur-xl rounded-[4rem] border-2 border-slate-100 py-32 px-10 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                        <div className="w-24 h-24 bg-white text-slate-200 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-2xl border border-slate-50">
                            <VideoOff className="w-10 h-10" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-400 uppercase tracking-widest mb-3">
                            No Experiences Found
                        </h3>
                        <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest max-w-[320px] leading-relaxed">
                            No motion assets are currently indexed for this classification.
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default CategoryVideos;
