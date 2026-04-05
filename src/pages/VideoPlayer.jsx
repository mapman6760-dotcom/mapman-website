import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft,
    Store,
    MessageCircle,
    Bookmark,
    ChevronLeft,
    CirclePlay,
    RotateCcw,
    CheckCircle2
} from "lucide-react";

const API_BASE_URL = "https://mapman-production.up.railway.app";

/**
 * Immersive Video Player with Vertical Swipe Logic
 */
const VideoPlayer = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();

    // Normalize videos from state or fallback to dummy
    const videoList = location.state?.videos || [];

    const normalizedVideos = videoList.map(v => ({
        id: v.id || v.videoId || Math.random(),
        title: v.videoTitle || v.title || "Untitled Reel",
        description: v.description || v.reelDesc || "This video show the simple tricks for beginners",
        shopName: v.shopName || v.categoryName || "Mapman Merchant",
        videoUrl: v.videoUrl ||
            (v.categoryVideo ? `${API_BASE_URL}${v.categoryVideo}` : null) ||
            (v.video ? `${API_BASE_URL}${v.video}` : null) ||
            "https://assets.mixkit.co/videos/preview/mixkit-hand-applying-henna-on-another-hand-40049-large.mp4",
        coins: v.coins || 4,
        isWatched: v.isWatched || v.watched || true
    }));

    const startIndex = location.state?.index !== undefined ? location.state.index :
        normalizedVideos.findIndex(v => v.id == id) || 0;

    const [currentIndex, setCurrentIndex] = useState(startIndex);
    const containerRef = useRef(null);

    // Snap to the starting video on first load
    useEffect(() => {
        if (containerRef.current) {
            const height = containerRef.current.offsetHeight;
            containerRef.current.scrollTop = startIndex * height;
        }
    }, [startIndex]);

    const handleScroll = (e) => {
        const height = e.currentTarget.offsetHeight;
        const newIndex = Math.round(e.currentTarget.scrollTop / height);
        if (newIndex !== currentIndex && newIndex >= 0 && newIndex < normalizedVideos.length) {
            setCurrentIndex(newIndex);
        }
    };

    return (
        <div className="fixed inset-0 z-[1000] bg-black overflow-hidden select-none">
            {/* ── TOP ACTION BAR ── */}
            <div className="absolute top-0 left-0 right-0 p-4 pt-12 md:pt-6 z-50 flex items-center justify-between pointer-events-none">
                <button
                    onClick={() => navigate(-1)}
                    className="w-12 h-12 bg-white/20 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white pointer-events-auto active:scale-90 transition-transform shadow-xl"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>

                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-3xl px-4 py-2.5 rounded-full border border-white/10 pointer-events-auto cursor-pointer hover:bg-black/60 transition-colors shadow-2xl"
                    onClick={() => navigate(`/shop-detail/${normalizedVideos[currentIndex]?.id}`)}>
                    <div className="w-6 h-6 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg">
                        <Store className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Shop Details</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
                </div>

                <div className="bg-white px-5 py-2.5 rounded-full flex items-center gap-3 shadow-[0_20px_40px_rgba(0,0,0,0.4)] border border-slate-100 pointer-events-auto">
                    <img src="https://cdn-icons-png.flaticon.com/128/7892/7892416.png" className="w-5 h-5 object-contain" alt="Coins" />
                    <span className="text-sm font-black text-slate-900">{normalizedVideos[currentIndex]?.coins || 0}</span>
                </div>
            </div>

            {/* ── VERTICAL VIDEO FEED (SNAP SCROLL) ── */}
            <div
                ref={containerRef}
                onScroll={handleScroll}
                className="h-full w-full overflow-y-scroll snap-y snap-mandatory hide-scrollbar no-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {normalizedVideos.map((video, idx) => (
                    <div key={video.id || idx} className="h-full w-full snap-start relative flex items-center justify-center bg-zinc-950">
                        <video
                            id={`video-${idx}`}
                            className="w-full h-full object-cover"
                            src={video.videoUrl}
                            autoPlay={idx === currentIndex}
                            loop
                            muted
                            playsInline
                        />

                        {/* ── OVERLAY INTERFACE ── */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90 flex flex-col justify-end p-6 pb-24 md:pb-12">

                            {/* PROGRESS BAR */}
                            <div className="absolute bottom-[114px] left-0 right-0 h-1.5 bg-white/10 overflow-hidden">
                                <motion.div
                                    className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.6)]"
                                    initial={{ width: "0%" }}
                                    animate={{ width: idx === currentIndex ? "100%" : "0%" }}
                                    transition={{ duration: 15, ease: "linear" }}
                                />
                            </div>

                            <div className="flex items-end justify-between gap-6">
                                {/* VIDEO INFO */}
                                <div className="space-y-4 flex-1">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)] leading-none">
                                            {video.shopName}
                                        </h3>
                                        {video.isWatched && (
                                            <div className="px-3 py-1.5 bg-blue-600 rounded-xl flex items-center gap-2 shadow-xl shadow-blue-600/30 border border-white/10">
                                                <span className="text-[9px] font-black text-white uppercase tracking-widest whitespace-nowrap">Watched</span>
                                                <CheckCircle2 className="w-3 h-3 text-white" />
                                            </div>
                                        )}
                                    </div>

                                    <p className="text-[12px] font-bold text-white/80 uppercase tracking-widest leading-relaxed drop-shadow-md max-w-[300px]">
                                        {video.description}
                                    </p>
                                </div>

                                {/* ACTION BUTTONS */}
                                <div className="flex flex-col md:flex-row items-center gap-4">
                                    <button className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-emerald-600 shadow-[0_20px_40px_rgba(0,0,0,0.3)] active:scale-90 transition-transform group">
                                        <MessageCircle className="w-7 h-7 fill-current group-hover:scale-110 transition-transform" />
                                    </button>
                                    <button className="w-14 h-14 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-full flex items-center justify-center text-white shadow-[0_20px_40px_rgba(0,0,0,0.3)] active:scale-90 transition-transform hover:bg-white/20 group">
                                        <Bookmark className="w-7 h-7 group-hover:scale-110 group-hover:rotate-6 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* SMOOTH BOTTOM INDICATOR */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-40 h-1.5 bg-white/10 rounded-full backdrop-blur-xl" />
        </div>
    );
};

export default VideoPlayer;
