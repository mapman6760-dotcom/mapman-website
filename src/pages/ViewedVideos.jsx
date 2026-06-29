import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE_URL } from "../config";
import {
  ChevronLeft, Loader2, Play, Eye, Search, Bookmark,
  Share2, MessageCircle, TrendingUp, BarChart2, VideoOff,
  Heart, X, History, Clock,
} from "lucide-react";
import { VideoCardSkeleton } from "../components/SkeletonLoaders";
import SEO from "../components/SEO";

// Extracted VideoCard to prevent re-renders on parent state changes
const VideoCard = ({ vidObj, i, videos, savedIds, likedIds, hoveredId, navigate, handleVideoHover, toggleLike, toggleSave, handleShare, handleWhatsApp, videoRefs }) => {
  // Handle case where viewed videos are wrapped in a model class (e.g. vid.videoId)
  const vid = vidObj.videoId || vidObj;

  const videoSrc = vid.video
    ? vid.video.startsWith("http")
      ? vid.video
      : `${API_BASE_URL}${vid.video}`
    : "";
  const isSaved = savedIds.has(vid.id || vidObj.id);
  const isLiked = likedIds.has(vid.id || vidObj.id);
  const isHovered = hoveredId === (vid.id || vidObj.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (i % 12) * 0.05, duration: 0.4 }}
      onClick={() => navigate(`/video-player/${vid.id || vidObj.id || i}`, { state: { videos, index: i, isMyVideos: true } })}
      className="group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer bg-white border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500"
    >
      {/* Thumbnail */}
      <div
        className="relative overflow-hidden bg-slate-900"
        style={{ aspectRatio: "16/10" }}
        onMouseEnter={() => handleVideoHover(vid.id || vidObj.id, true)}
        onMouseLeave={() => handleVideoHover(vid.id || vidObj.id, false)}
      >
        <video
          ref={(el) => { if (el) videoRefs.current[vid.id || vidObj.id] = el; }}
          src={videoSrc}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          muted
          loop
          playsInline
          preload="none"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />

        {/* Top badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
          <span className="px-2 py-1 bg-black/50 backdrop-blur-md rounded-lg text-[9px] font-black text-white uppercase tracking-widest border border-white/10">
            Viewed
          </span>
          <div className="flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-md rounded-lg border border-white/10">
            <Eye className="w-3 h-3 text-white/80" />
            <span className="text-[9px] font-black text-white">{vid.views || 0}</span>
          </div>
        </div>

        {/* Play overlay */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}>
          <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/40 shadow-2xl">
            <Play className="w-6 h-6 text-white fill-white ml-0.5" />
          </div>
        </div>

        {/* Shop avatar bottom left */}
        {vid.shopImage && (
          <div className="absolute bottom-3 left-3 z-10">
            <div className="w-8 h-8 rounded-xl overflow-hidden border-2 border-white/30 shadow-lg">
              <img src={vid.shopImage.startsWith("http") ? vid.shopImage : `${API_BASE_URL}${vid.shopImage}`} className="w-full h-full object-cover" alt="" />
            </div>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-3.5 flex flex-col gap-2.5 flex-1">
        <div>
          <h4 className="font-black text-slate-900 text-sm leading-tight line-clamp-1 group-hover:text-blue-600 transition-colors">
            {vid.videoTitle || "Untitled Video"}
          </h4>
          <p className="text-[10px] text-slate-500 font-semibold mt-0.5 truncate">
            {vid.shopName || "Unknown Shop"}
          </p>
        </div>

        {vid.description && (
          <p className="text-[10px] text-slate-400 leading-relaxed line-clamp-2">{vid.description}</p>
        )}

        {/* Action row */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-50 mt-auto">
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => toggleLike(e, vid.id || vidObj.id)}
              className={`p-1.5 rounded-lg transition-all hover:scale-110 ${isLiked ? "text-rose-500 bg-rose-50" : "text-slate-400 hover:text-rose-400 hover:bg-rose-50"}`}
            >
              <Heart className={`w-3.5 h-3.5 ${isLiked ? "fill-rose-500" : ""}`} />
            </button>
            <button
              onClick={(e) => toggleSave(e, vid.id || vidObj.id)}
              className={`p-1.5 rounded-lg transition-all hover:scale-110 ${isSaved ? "text-blue-600 bg-blue-50" : "text-slate-400 hover:text-blue-500 hover:bg-blue-50"}`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-blue-600" : ""}`} />
            </button>
            <button
              onClick={(e) => handleShare(e, vid)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-violet-500 hover:bg-violet-50 transition-all hover:scale-110"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
          {vid.shopNumber && (
            <button
              onClick={(e) => handleWhatsApp(e, vid)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-[9px] font-black uppercase tracking-wider transition-all hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-3 h-3" />
              WhatsApp
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ViewedVideos = () => {
  const navigate = useNavigate();

  const [videos, setVideos] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [userPoints, setUserPoints] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [savedIds, setSavedIds] = useState(new Set());
  const [likedIds, setLikedIds] = useState(new Set());
  const [hoveredId, setHoveredId] = useState(null);
  const videoRefs = useRef({});

  useEffect(() => {
    fetchViewedVideos(1, false);
    fetchPoints();
  }, []);

  useEffect(() => {
    const q = searchQuery.toLowerCase();
    setFiltered(
      q
        ? videos.filter((vObj) => {
          const v = vObj.videoId || vObj;
          return (v.videoTitle || "").toLowerCase().includes(q) ||
            (v.shopName || "").toLowerCase().includes(q);
        })
        : videos
    );
  }, [searchQuery, videos]);

  const fetchPoints = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/shop/fetchPoints`, {
        headers: { usertoken: token },
      });
      const result = await res.json();
      if (result.status === 200) setUserPoints(result.data || 0);
    } catch (e) { }
  };

  const fetchViewedVideos = async (pageNum, isLoadMore = false) => {
    if (isLoadMore) setFetchingMore(true);
    else setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${API_BASE_URL}/shop/fetchMyViewedVideos?page=${pageNum}`,
        { headers: { usertoken: token } }
      );
      const result = await res.json();
      if (result.status === 200 && Array.isArray(result.data)) {
        const newVids = result.data;
        if (isLoadMore) {
          setVideos((prev) => [...prev, ...newVids]);
        } else {
          setVideos(newVids);
        }
        if (newVids.length < 10) setHasMore(false); // Assuming 10 per page
      } else {
        if (!isLoadMore) { setVideos([]); }
        setHasMore(false);
      }
    } catch (e) {
      if (!isLoadMore) { setVideos([]); }
    } finally {
      setLoading(false);
      setFetchingMore(false);
    }
  };

  const handleLoadMore = () => {
    const next = page + 1;
    setPage(next);
    fetchViewedVideos(next, true);
  };

  const toggleSave = (e, id) => {
    e.stopPropagation();
    setSavedIds((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const toggleLike = (e, id) => {
    e.stopPropagation();
    setLikedIds((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const handleShare = (e, vid) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({ title: vid.videoTitle, url: window.location.href });
    }
  };

  const handleWhatsApp = (e, vid) => {
    e.stopPropagation();
    if (vid.shopNumber) {
      window.open(`https://wa.me/${vid.shopNumber}`, "_blank");
    }
  };

  const handleVideoHover = (id, enter) => {
    setHoveredId(enter ? id : null);
    const el = videoRefs.current[id];
    if (!el) return;
    if (enter) {
      el._p = el.play();
      el._p.catch(() => { });
    } else {
      if (el._p) el._p.then(() => { el.pause(); el.currentTime = 0; }).catch(() => { });
      else { el.pause(); el.currentTime = 0; }
    }
  };

  const totalViews = videos.reduce((acc, vObj) => {
    const v = vObj.videoId || vObj;
    return acc + (v.views || 0);
  }, 0);

  const sidebarStats = [
    { label: "Total History", value: videos.length, icon: <History className="w-4 h-4" />, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Total Views", value: totalViews.toLocaleString(), icon: <Eye className="w-4 h-4" />, color: "text-violet-600", bg: "bg-violet-50" },
    { label: "Saved", value: savedIds.size, icon: <Bookmark className="w-4 h-4" />, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Liked", value: likedIds.size, icon: <Heart className="w-4 h-4" />, color: "text-rose-600", bg: "bg-rose-50" },
  ];

  return (
    <div className="min-h-screen bg-slate-50/80 pb-32 overflow-x-hidden">
      <SEO
        title="Viewed Videos | Mapman"
        description="Your history of viewed videos on Mapman."
        canonical="https://mapman.in/viewed-videos"
      />

      {/* ── STYLISH FLOATING HEADER ── */}
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="relative w-full mb-6 md:mb-8 mt-2 overflow-hidden shadow-sm border border-slate-200/60 bg-white/80 backdrop-blur-xl rounded-[0.5rem] py-5 px-5 md:px-7 flex flex-col gap-5 z-10">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100/50 to-purple-100/50 rounded-full blur-[60px] pointer-events-none -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-emerald-100/50 to-cyan-100/50 rounded-full blur-[60px] pointer-events-none -ml-20 -mb-20"></div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="w-10 h-10 bg-slate-100 hover:bg-slate-200 border border-slate-200/60 rounded-xl flex items-center justify-center text-slate-600 hover:text-slate-900 transition-all active:scale-95 shadow-sm shrink-0"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex flex-col gap-0.5">
                <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight uppercase leading-none">
                  Viewed Videos
                </h1>
                <div className="flex items-center gap-2 pt-0.5">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                    Watch History
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 self-start md:self-auto">
              <div className="flex items-center gap-2 px-3.5 py-2 bg-white/60 backdrop-blur-md border border-slate-200/50 rounded-xl shadow-sm">
                <img src="https://cdn-icons-png.flaticon.com/128/7892/7892416.png" className="w-4 h-4 object-contain" alt="points" />
                <span className="font-black text-slate-700 text-[11px]">{userPoints}</span>
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">pts</span>
              </div>
            </div>
          </div>

          <div className="relative z-10">
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search your viewing history..."
                className="w-full bg-slate-100/50 border border-slate-200/60 rounded-xl pl-11 pr-10 py-3 text-slate-800 placeholder-slate-400 text-sm font-medium focus:outline-none focus:border-blue-300 focus:bg-white transition-all shadow-inner"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            
            <div className="flex items-center gap-6 flex-wrap mt-3 px-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {filtered.length} video{filtered.length !== 1 ? "s" : ""} found
              </span>
              {searchQuery && (
                <span className="px-2.5 py-1 bg-blue-50 border border-blue-100 rounded-lg text-[9px] font-black text-blue-600 uppercase tracking-widest">
                  Filtering: "{searchQuery}"
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="flex gap-8 items-start">

          {/* ── VIDEO GRID ── */}
          <div className="flex-1 min-w-0 space-y-8">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                {[...Array(8)].map((_, i) => <VideoCardSkeleton key={i} />)}
              </div>
            ) : filtered.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                  {filtered.map((vidObj, i) => (
                    <VideoCard
                      key={vidObj.id || (vidObj.videoId && vidObj.videoId.id) || i}
                      vidObj={vidObj}
                      i={i}
                      videos={videos}
                      savedIds={savedIds}
                      likedIds={likedIds}
                      hoveredId={hoveredId}
                      navigate={navigate}
                      handleVideoHover={handleVideoHover}
                      toggleLike={toggleLike}
                      toggleSave={toggleSave}
                      handleShare={handleShare}
                      handleWhatsApp={handleWhatsApp}
                      videoRefs={videoRefs}
                    />
                  ))}
                </div>
                {hasMore && !searchQuery && (
                  <div className="flex justify-center pt-4">
                    <button
                      onClick={handleLoadMore}
                      disabled={fetchingMore}
                      className="flex items-center gap-3 px-10 py-4 bg-slate-900 hover:bg-blue-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                    >
                      {fetchingMore && <Loader2 className="w-4 h-4 animate-spin" />}
                      {fetchingMore ? "Loading..." : "Load More Videos"}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-[0.5rem] border border-slate-100 shadow-sm mx-4 mb-10 mt-10">
                <div className="w-20 h-20 bg-slate-50 rounded-[1rem] flex items-center justify-center mb-5 border border-slate-100 shadow-inner">
                  <VideoOff className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight mb-2">No Videos Found</h3>
                <p className={`text-sm text-slate-400 max-w-xs font-medium leading-relaxed ${searchQuery ? "mb-6" : ""}`}>
                  {searchQuery ? `No results for "${searchQuery}". Try a different search.` : "Your watch history is empty."}
                </p>
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-[0.5rem] font-black text-sm shadow-md transition-all hover:scale-105 active:scale-95">
                    Clear Search
                  </button>
                )}
              </div>
            )}
          </div>

          {/* ── ANALYTICS SIDEBAR ── */}
          <aside className="hidden xl:flex flex-col gap-5 w-72 shrink-0 sticky top-8">
            {/* Stats card */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-50 flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-blue-600" />
                <span className="font-black text-slate-900 text-xs uppercase tracking-widest">History Stats</span>
              </div>
              <div className="p-4 grid grid-cols-2 gap-3">
                {sidebarStats.map((s, i) => (
                  <div key={i} className={`${s.bg} rounded-xl p-3 flex flex-col gap-1.5`}>
                    <div className={`${s.color}`}>{s.icon}</div>
                    <div className="font-black text-slate-900 text-lg leading-none">{s.value}</div>
                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending card */}
            {videos.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-50 flex items-center gap-2">
                  <History className="w-4 h-4 text-rose-500" />
                  <span className="font-black text-slate-900 text-xs uppercase tracking-widest">Recent Watches</span>
                </div>
                <div className="p-3 space-y-2">
                  {[...videos]
                    .slice(0, 5)
                    .map((vidObj, i) => {
                      const vid = vidObj.videoId || vidObj;
                      const src = vid.video
                        ? vid.video.startsWith("http") ? vid.video : `${API_BASE_URL}${vid.video}`
                        : "";
                      return (
                        <button
                          key={vid.id || vidObj.id || i}
                          onClick={() => navigate(`/video-player/${vid.id || vidObj.id || i}`, { state: { videos, index: i, isMyVideos: true } })}
                          className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors text-left group"
                        >
                          <div className="relative w-14 h-10 rounded-lg overflow-hidden bg-slate-900 shrink-0">
                            <video src={src} className="w-full h-full object-cover" muted preload="none" />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                              <Play className="w-3 h-3 text-white fill-white" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[11px] font-black text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">{vid.videoTitle || "Untitled"}</p>
                            <div className="flex items-center gap-1 mt-0.5">
                              <Clock className="w-3 h-3 text-slate-400" />
                              <span className="text-[9px] text-slate-400 font-bold">Viewed</span>
                            </div>
                          </div>
                          <span className="text-[10px] font-black text-slate-300">#{i + 1}</span>
                        </button>
                      );
                    })}
                </div>
              </div>
            )}

            {/* History badge */}
            <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-2xl p-5 text-center border border-slate-800">
              <div className="text-4xl mb-2">🕰️</div>
              <h3 className="font-black text-white text-sm tracking-tight">Watch History</h3>
              <p className="text-[10px] text-blue-300 font-bold uppercase tracking-widest mt-1">Activity Log</p>
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-[9px] text-white/50 font-black uppercase tracking-widest">Tracking Active</span>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default ViewedVideos;
