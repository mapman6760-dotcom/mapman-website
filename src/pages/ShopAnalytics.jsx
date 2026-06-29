import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
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
import SEO from "../components/SEO";

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
        const apiData = res.data || {};
        const videos = Array.isArray(apiData) ? apiData : (apiData.totalVideos || apiData.videos || []);
        const views = apiData.totalViews !== undefined ? apiData.totalViews : videos.reduce((acc, curr) => acc + (curr.viewCount || curr.views || 0), 0);
        setData({ totalVideos: videos, totalViews: views });
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
    if (!dateString) return "Recently";
    const past = new Date(dateString);
    if (isNaN(past.getTime())) return "Recently";

    const now = new Date();
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
      badgeColor: "bg-blue-50 text-blue-600",
      bgGradient: "bg-white",
      iconBg: "bg-blue-50/50 border border-blue-100 shadow-sm",
      borderColor: "border-slate-100",
    },
    {
      label: "Total Views",
      value: data.totalViews.toLocaleString(),
      change: "+24%", // Mocked for design
      icon: <Eye className="w-5 h-5 text-emerald-600" />,
      badgeColor: "bg-emerald-50 text-emerald-600",
      bgGradient: "bg-white",
      iconBg: "bg-emerald-50/50 border border-emerald-100 shadow-sm",
      borderColor: "border-slate-100",
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
    <div className="min-h-screen no-scrollbar bg-slate-50/50">
      <SEO
        title="Shop Analytics Dashboard"
        description="Monitor your shop views, video performance metrics, and organic listing statistics on MapMan."
        canonical="https://mapman.in/shop-analytics"
      />
      {/* ── STYLISH FLOATING HEADER ── */}
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
            <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight uppercase leading-none flex items-center gap-2">
              Shop Analytics
              <span className="hidden md:flex bg-blue-50 text-blue-600 text-[9px] font-black uppercase px-2 py-0.5 rounded-md border border-blue-100 shadow-sm">
                Live
              </span>
            </h1>
            <div className="flex items-center gap-2 pt-0.5">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                Performance Dashboard
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 lg:px-10 py-6 max-w-[1400px] mx-auto space-y-6">

        {error && (
          <div className="bg-red-50 border border-red-100 p-4 rounded-1xl flex items-center justify-between">
            <p className="text-xs font-black text-red-600 uppercase tracking-widest">{error}</p>
            <button onClick={fetchData} className="text-[10px] font-bold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl transition-all shadow-md active:scale-95 uppercase tracking-wider">Retry</button>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          
          {/* ── REDESIGNED METRIC CARDS (LEFT SIDE ON DESKTOP) ── */}
          <div className="w-full lg:w-[320px] shrink-0 space-y-4 md:space-y-6">
            {getStats().map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group relative p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden bg-white flex flex-col gap-6"
              >
                {/* Stylish background glow */}
                <div className={`absolute -right-12 -top-12 w-40 h-40 rounded-full blur-[40px] opacity-40 group-hover:opacity-70 transition-opacity duration-500 ${stat.badgeColor.includes('blue') ? 'bg-blue-400' : 'bg-emerald-400'}`}></div>
                
                <div className="flex items-start justify-between relative z-10">
                  <div className={`w-14 h-14 md:w-16 md:h-16 ${stat.iconBg} rounded-[1.25rem] flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 shadow-sm border border-white`}>
                    {React.cloneElement(stat.icon, { className: "w-6 h-6 md:w-7 md:h-7" })}
                  </div>
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${stat.badgeColor} border border-white/50 backdrop-blur-md shadow-sm`}>
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span className="text-[10px] md:text-xs font-black">{stat.change}</span>
                  </div>
                </div>

                <div className="relative z-10 space-y-1 md:space-y-2 mt-2">
                  <h4 className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                    {stat.label}
                  </h4>
                  <p className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
                    {stat.value}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── VIDEO FEED (RIGHT SIDE ON DESKTOP) ── */}
          <div className="flex-1 space-y-6 md:space-y-8 min-w-0">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-4 bg-blue-600 rounded-full" />
                <h2 className="text-sm font-black text-slate-900 tracking-tight uppercase">
                  List Of My Videos ({data.totalVideos.length})
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {data.totalVideos.length > 0 ? (
                data.totalVideos.map((video, idx) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * (idx % 3) }}
                    onClick={() => navigate(`/video-player/${video.id}`, { state: { videos: data.totalVideos, index: idx, isMyVideos: true } })}
                    className="group bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-500 flex flex-col cursor-pointer"
                  >
                    <div className="relative aspect-video overflow-hidden bg-slate-900 flex items-center justify-center">
                      <video
                        src={video.video ? (video.video.startsWith('http') ? `${video.video}#t=0.1` : `${API_BASE_URL}${video.video}#t=0.1`) : ""}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700"
                        muted
                        playsInline
                        preload="none"
                        onMouseEnter={(e) => e.target.play().catch(() => {})}
                        onMouseLeave={(e) => { e.target.pause(); e.target.currentTime = 0; }}
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
              <div className="col-span-full flex flex-col items-center justify-center py-24 text-center bg-white rounded-[0.5rem] border border-slate-100 shadow-sm mx-4 mb-10 mt-10">
                <div className="w-20 h-20 bg-slate-50 rounded-[1rem] flex items-center justify-center mb-5 border border-slate-100 shadow-inner">
                  <Clapperboard className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight mb-2">No Videos Found</h3>
                <p className="text-sm text-slate-400 max-w-xs font-medium leading-relaxed">
                  Upload your first video to see analytics.
                </p>
              </div>
            )}
          </div>
        </div>
        </div>

        {/* Footer Status */}
        <div className="flex flex-col items-center justify-center pt-10 pb-16 space-y-4">
          <p className="text-[10px] text-slate-300 font-medium uppercase tracking-[0.1em]">
            © 2026 Mapman Shop Analytics
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShopAnalytics;

