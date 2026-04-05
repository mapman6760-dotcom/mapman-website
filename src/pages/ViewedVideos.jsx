import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Search,
  Play,
  Bookmark,
  Store,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ViewedVideos = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isToggleOn, setIsToggleOn] = useState(true);

  const viewedVideos = [
    {
      id: 1,
      title: "Premium Mehandi Art",
      thumbnail:
        "https://images.unsplash.com/photo-1621252179027-94459d278660?w=600&h=400&fit=crop",

    },
    {
      id: 2,
      title: "Bridal Henna Session",
      thumbnail:
        "https://images.unsplash.com/photo-1590670460287-03649561869e?w=600&h=400&fit=crop",
    },
    {
      id: 3,
      title: "Party Design Reel",
      thumbnail:
        "https://images.unsplash.com/photo-1621252176993-94459d278660?w=600&h=400&fit=crop",
    },
  ];

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

          <div className="flex items-center gap-3">
            <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${isToggleOn ? 'text-emerald-500' : 'text-slate-400'}`}>
              {isToggleOn ? 'Auto-Play' : 'Manual'}
            </span>
            <button
              onClick={() => setIsToggleOn(!isToggleOn)}
              className={`w-11 h-6 rounded-full transition-all duration-500 relative flex items-center px-1 shadow-inner ${isToggleOn ? "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]" : "bg-slate-200"}`}
            >
              <motion.div
                layout
                className="w-4 h-4 bg-white rounded-full shadow-lg border border-slate-100"
              />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-8 py-8 space-y-8">
        {/* ── SEARCH ARCHITECTURE (MINIFIED) ── */}
        <div className="relative group max-w-md">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <Search className="w-4 h-4 text-slate-300 group-focus-within:text-blue-600 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search history..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-11 pr-6 bg-white border border-slate-100 rounded-2xl outline-none shadow-sm focus:border-blue-500/20 transition-all text-xs font-bold tracking-tight"
          />
        </div>

        {/* ── VIDEO FEED (COMPACT GRID) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence>
            {viewedVideos.map((video, idx) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="group relative overflow-hidden rounded-[20px] bg-white border border-slate-100 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500"
              >
                {/* Media Container */}
                <div className="aspect-video relative overflow-hidden bg-slate-900">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                  />

                  {/* Glass Badges */}
                  <div className="absolute top-4 left-4">
                    <div className="px-2 py-1 bg-black/40 backdrop-blur-md rounded-lg border border-white/10">
                      <span className="text-[8px] font-black text-white uppercase tracking-widest">
                        {video.duration}
                      </span>
                    </div>
                  </div>

                  <div className="absolute top-4 right-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-9 h-9 bg-white/20 hover:bg-white/90 backdrop-blur-lg rounded-xl flex items-center justify-center shadow-xl transition-all group/bookmark"
                    >
                      <Bookmark className="w-3.5 h-3.5 text-white group-hover/bookmark:text-slate-900 transition-colors" />
                    </motion.button>
                  </div>

                  {/* Central Play Hub (Smaller) */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <button className="w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-all duration-300">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </button>
                  </div>

                  {/* Action Footer (REDUCED) */}
                  <div className="absolute inset-x-2 bottom-2 p-2 bg-white/10 backdrop-blur-2xl rounded-xl border border-white/20 shadow-xl">
                    <div className="flex items-center justify-between gap-2.5">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
                          <Store className="w-3.5 h-3.5 text-white" />
                        </div>
                        <h3 className="text-[11px] font-black text-white tracking-tight leading-none italic uppercase truncate">
                          {video.title}
                        </h3>
                      </div>
                      <button className="px-3 py-1.5 bg-blue-600 hover:bg-white hover:text-blue-600 text-white rounded-lg text-[8px] font-black uppercase tracking-widest transition-all shadow-md active:scale-95 whitespace-nowrap">
                        Visit
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default ViewedVideos;
