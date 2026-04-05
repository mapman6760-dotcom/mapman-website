import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Play,
  Eye,
  Clapperboard,
  MoreVertical,
  TrendingUp,
  BarChart3,
  Clock,
  Heart,
  Share2,
  Download,
  Calendar,
  ChevronRight,
  ArrowUpRight,
  Loader2
} from "lucide-react";
import { getShopAnalytics } from "../api/shop";

const ShopAnalytics = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ totalVideos: [], totalViews: 0 });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getShopAnalytics();
      if (res.status === 200) {
        setData(res.data);
      } else {
        throw new Error("Failed to load data");
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffInMs = now - past;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays}d ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)}w ago`;
    return past.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getStats = () => [
    {
      label: "Total Videos",
      value: data.totalVideos.length.toString(),
      change: "+4", // Mocked for design
      icon: <Clapperboard className="w-5 h-5 text-blue-600" />,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-100",
    },
    {
      label: "Total Views",
      value: data.totalViews.toLocaleString(),
      change: "+24%", // Mocked for design
      icon: <Eye className="w-5 h-5 text-indigo-600" />,
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-100",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white space-y-4 flex-col">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest animate-pulse">Syncing Shop Analytics...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen no-scrollbar bg-white">
      {/* ── TOP HEADER ── */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 p-4 md:px-10 flex items-center justify-between">
        <div className="flex items-center gap-4 lg:gap-8">
          <button
            onClick={() => navigate("/profile")}
            className="w-10 h-10 border border-slate-200 rounded-xl flex items-center justify-center hover:bg-slate-50 transition-all hover:scale-105 active:scale-95 shadow-sm"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div>
            <h1 className="text-lg md:text-xl font-black text-slate-900 tracking-tight flex items-center gap-3 uppercase">
              Shop Analytics
              <span className="hidden md:flex bg-blue-100 text-blue-700 text-[9px] font-black uppercase px-2 py-0.5 rounded-full border border-blue-200">
                Live
              </span>
            </h1>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-8 lg:p-10 max-w-[1400px] mx-auto space-y-10">

        {error && (
          <div className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center justify-between">
            <p className="text-xs font-black text-red-600 uppercase tracking-widest">{error}</p>
            <button onClick={fetchData} className="text-[10px] font-bold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl transition-all shadow-md active:scale-95 uppercase tracking-wider">Retry</button>
          </div>
        )}

        {/* ── REDESIGNED METRIC CARDS (SMALLER & COMPACT) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {getStats().map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.01 }}
              className={`relative group p-6 rounded-[2rem] overflow-hidden border border-white/20 shadow-xl transition-all duration-500
                                ${i === 0 ? "bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-700 shadow-blue-500/20" : "bg-gradient-to-br from-emerald-500 via-teal-600 to-teal-700 shadow-emerald-500/20"}
                            `}
            >
              <div className="relative z-10 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="text-[9px] font-black text-white/70 uppercase tracking-[0.2em]">
                    {stat.label}
                  </h4>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl md:text-3xl font-black text-white tracking-tighter">
                      {stat.value}
                    </p>
                    <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
                      <TrendingUp className="w-3 h-3 text-emerald-300" />
                      <span className="text-[10px] font-black text-white">{stat.change}</span>
                    </div>
                  </div>
                </div>

                <div className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:rotate-6 transition-transform">
                  {React.cloneElement(stat.icon, {
                    className: "w-6 h-6 stroke-[2.5]",
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── VIDEO FEED (4 CARDS GRID) ── */}
        <div className="space-y-8">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-4 bg-blue-600 rounded-full" />
              <h2 className="text-sm font-black text-slate-900 tracking-tight uppercase">
                List Of My Videos ({data.totalVideos.length})
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {data.totalVideos.length > 0 ? (
              data.totalVideos.map((video, idx) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (idx % 4) }}
                  className="group bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-500 flex flex-col"
                >
                  <div className="relative aspect-video overflow-hidden bg-slate-900 flex items-center justify-center">
                    <video
                      src={`https://mapman-production.up.railway.app${video.video}`}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700"
                      muted
                      playsInline
                      preload="metadata"
                      onMouseOver={(e) => e.target.play()}
                      onMouseOut={(e) => {
                        e.target.pause();
                        e.target.currentTime = 0;
                      }}
                    />

                    {/* Centered Play Icon Overlay (Minimal) */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                        <Play className="w-4 h-4 text-white fill-current" />
                      </div>
                    </div>

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-all duration-500 flex items-center justify-center">
                      {/* SHARE BUTTON ONLY ON HOVER */}
                      <button className="w-12 h-12 bg-white text-slate-900 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-2xl hover:bg-slate-50 active:scale-95">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>

                    {/* View Badge (Always visible on image bottom) */}
                    <div className="absolute bottom-4 left-4 z-10">
                      <div className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-2 border border-white/10 shadow-lg">
                        <Eye className="w-3 h-3 text-white" />
                        <span className="text-[9px] font-bold text-white uppercase tracking-wider">
                          {video.viewCount}
                        </span>
                      </div>
                    </div>

                    {/* Category Badge (Top left) */}
                    <div className="absolute top-4 left-2 z-10">
                      <span className="bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-lg text-[7px] font-black text-slate-800 uppercase tracking-widest shadow-sm">
                        {video.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1">
                      <h4 className="font-black text-slate-800 text-xs uppercase tracking-tight leading-tight line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {video.videoTitle}
                      </h4>
                      <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">
                        {getTimeAgo(video.createdAt)}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-50 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1 h-1 bg-emerald-500 rounded-full" />
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
                          {video.status}
                        </span>
                      </div>
                      <button className="p-1 hover:bg-slate-50 rounded-lg transition-colors">
                        <MoreVertical className="w-3.5 h-3.5 text-slate-300" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center space-y-4">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto border border-slate-100/50">
                  <Clapperboard className="w-6 h-6 text-slate-300" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-900 uppercase tracking-tight">No videos found</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Upload your first video to see analytics</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Status */}
        <div className="flex flex-col items-center justify-center pt-10 pb-16 space-y-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full border border-slate-200">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
              Database Synced: {new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          <p className="text-[10px] text-slate-300 font-medium uppercase tracking-[0.1em]">
            © 2026 Mapman Global Analytics
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShopAnalytics;

