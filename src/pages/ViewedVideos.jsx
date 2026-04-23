import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Search,
  Play,
  Bookmark,
  Store,
  ChevronRight,
  Loader2,
  Calendar,
  Eye
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "https://mapman-production.up.railway.app";

const ViewedVideos = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewedVideos, setViewedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    fetchViewedVideos(1, false);
  }, []);

  const fetchViewedVideos = async (pageNum, isLoadMore = false) => {
    if (isLoadMore) setLoadingMore(true);
    else setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/shop/fetchMyViewedVideos?page=${pageNum}`, {
        headers: { "usertoken": token }
      });
      const result = await response.json();

      if (result.status === 200 && result.data) {
        if (isLoadMore) {
          setViewedVideos(prev => [...prev, ...result.data]);
        } else {
          setViewedVideos(result.data);
        }
        setHasMore(result.data.length === 10); // Assuming 10 per page
      } else {
        if (!isLoadMore) setViewedVideos([]);
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching viewed videos:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchViewedVideos(nextPage, true);
  };

  const filteredVideos = viewedVideos.filter(video =>
    video.videoTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.shopName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FDFDFE] pb-24">
      {/* ── COMPACT HEADER ── */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-3xl border-b border-slate-100/50 px-4 md:px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05, x: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center shadow-sm hover:border-blue-200 transition-all group"
            >
              <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
            </motion.button>
            <div className="space-y-0">
              <h1 className="text-lg font-black text-slate-900 tracking-tight leading-none uppercase italic">
                Viewed Videos
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-lg">
            <Eye className="w-3 h-3 text-blue-600" />
            <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest leading-none">
              {viewedVideos.length} Records
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-8 py-8 space-y-8">
        {/* ── SEARCH ARCHITECTURE ── */}
        <div className="relative group max-w-md">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <Search className="w-4 h-4 text-slate-300 group-focus-within:text-blue-600 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search within your history..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-11 pr-6 bg-white border border-slate-100 rounded-2xl outline-none shadow-sm focus:border-blue-500/20 transition-all text-xs font-bold tracking-tight"
          />
        </div>

        {/* ── VIDEO FEED ── */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Decoding Transmission...</p>
          </div>
        ) : filteredVideos.length > 0 ? (
          <div className="space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <AnimatePresence>
                {filteredVideos.map((video, idx) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.5 }}
                    onClick={() => navigate(`/video-player/${video.id}`, { state: { videos: [video], index: 0 } })}
                    className="group relative overflow-hidden rounded-[20px] bg-white border border-slate-100 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 cursor-pointer"
                  >
                    <div className="aspect-[16/12] relative overflow-hidden bg-slate-900">
                      <video
                        src={`${API_BASE_URL}${video.video}`}
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                        muted
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                      {/* Glass Badges */}
                      <div className="absolute top-4 left-4">
                        <div className="px-2 py-1 bg-black/40 backdrop-blur-md rounded-lg border border-white/10 flex items-center gap-1.5">
                          <Eye className="w-3 h-3 text-white" />
                          <span className="text-[8px] font-black text-white uppercase tracking-widest">
                            {video.views} Views
                          </span>
                        </div>
                      </div>

                      <div className="absolute top-4 right-4">
                        <div className="px-2 py-1 bg-white/10 backdrop-blur-md rounded-lg border border-white/10 flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 text-white/70" />
                          <span className="text-[7px] font-black text-white/70 uppercase tracking-widest">
                            {new Date(video.updatedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {/* Central Play Hub */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
                        <div className="w-14 h-14 bg-blue-600 shadow-xl shadow-blue-600/40 rounded-full flex items-center justify-center text-white transition-all duration-300">
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        </div>
                      </div>

                      {/* Action Footer */}
                      <div className="absolute inset-x-2 bottom-2 p-2 bg-white/10 backdrop-blur-2xl rounded-xl border border-white/20 shadow-xl overflow-hidden">
                        <div className="flex items-center justify-between gap-2.5">
                          <div className="flex items-center gap-2 overflow-hidden">
                            <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
                              <Store className="w-3.5 h-3.5 text-white" />
                            </div>
                            <div className="flex flex-col min-w-0">
                              <h3 className="text-[10px] font-black text-white tracking-tight leading-none italic uppercase truncate">
                                {video.videoTitle}
                              </h3>
                              <span className="text-[7px] font-bold text-white/50 uppercase tracking-widest truncate mt-0.5">
                                {video.shopName}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/shop-detail/${video.shopId}`);
                            }}
                            className="px-3 py-1.5 bg-white/10 hover:bg-white text-white hover:text-blue-600 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all shadow-md active:scale-95 whitespace-nowrap"
                          >
                            Explore
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {hasMore && (
              <div className="flex justify-center pt-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="px-8 py-4 bg-white border border-slate-100 shadow-lg shadow-slate-200/50 rounded-2xl flex items-center gap-3 group transition-all"
                >
                  {loadingMore ? (
                    <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                  )}
                  <span className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">
                    {loadingMore ? 'Syncing...' : 'Load More Experiences'}
                  </span>
                </motion.button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 space-y-6 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center border border-slate-100 shadow-inner">
              <Play className="w-8 h-8 text-slate-200" />
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">No Narrative Trail</h3>
              <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest max-w-[240px] leading-relaxed">
                Your visual session history is currently waiting for initial data points.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ViewedVideos;
