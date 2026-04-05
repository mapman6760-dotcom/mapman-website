import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Settings, Share2, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NotificationList from "../components/NotificationList";

const Notifications = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FDFDFE] pb-32">
      {/* ── DESIGNER HEADER (BANNER) ── */}
      <header className="relative h-[150px] bg-slate-950 overflow-hidden flex items-end shadow-2xl">
        {/* Custom Banner Background */}
        <div className="absolute inset-0">
          <img
            src="assets/notification-banner.jpg"
            alt="Header Banner"
            className="w-full h-full object-cover opacity-60 scale-105"
          />
          {/* Contrast Gradient \& Texture */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div className="absolute inset-0 bg-slate-950/20" />
          <div className="absolute inset-0 backdrop-blur-[1px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-8 md:px-12 pb-6 md:pb-8 text-white">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-10">
            <div className="space-y-4 sm:space-y-6">
              <div className="space-y-2">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2"
                >
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                    <span className="w-1.5 h-1.5 bg-blue-500/50 rounded-full" />
                  </div>
                  <p className="text-[8px] font-black text-blue-400 uppercase tracking-[0.4em]">
                    Mapman Connect
                  </p>
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl md:text-3xl font-black tracking-tighter uppercase italic leading-none"
                >
                  Notifications
                </motion.h1>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="hidden md:flex flex-col items-end gap-3 text-right"
            >
              <button
                onClick={() => navigate("/notification-settings")}
                className="group flex items-center gap-3 px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl backdrop-blur-xl transition-all"
              >
                <Settings className="w-4 h-4 text-white group-hover:rotate-90 transition-transform duration-500" />
              </button>
            </motion.div>
          </div>
        </div>
      </header>

      {/* ── MOBILE QUICK ACTIONS ── */}
      <div className="md:hidden sticky top-0 z-50 px-6 py-4 bg-white/70 backdrop-blur-3xl border-b border-slate-100 flex items-center justify-between">
        <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest italic">
          Notifications
        </h2>
        <button
          onClick={() => navigate("/notification-settings")}
          className="p-2.5 bg-blue-50 text-blue-600 rounded-xl"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {/* ── CONTENT FEED (REFINED & RESPONSIVE) ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 -mt-4 md:-mt-8 relative z-20 space-y-12 pb-32">
        <div className="flex items-center justify-between px-2"></div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <NotificationList />
        </motion.div>

        <div className="pt-10 flex flex-col items-center gap-4">
          <button className="px-10 py-4 bg-slate-950 text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-xl active:scale-95">
            Load More Memory
          </button>
          <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest opacity-40 leading-none italic">
            End of synchronization queue
          </p>
        </div>
      </main>
    </div>
  );
};

export default Notifications;
