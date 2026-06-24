import React, { useState, useEffect } from "react";

import { Bell, Settings, Share2, MoreHorizontal, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NotificationList from "../components/NotificationList";
import { API_BASE_URL } from "../config";



const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchNotifications(1);
  }, []);

  const fetchNotifications = async (pageNum) => {
    if (loading) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_BASE_URL}/shop/fetchNotifications?page=${pageNum}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            usertoken: token,
          },
        },
      );

      const result = await response.json();

      if (result.status === 200) {
        const newData = result.data || [];
        if (pageNum === 1) {
          setNotifications(newData);
        } else {
          setNotifications((prev) => [...prev, ...newData]);
        }

        // If we got fewer than 30 items, there are no more notifications to load
        if (newData.length < 30) {
          setHasMore(false);
        }
      }
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchNotifications(nextPage);
  };

  const handleNotificationClick = async (notif) => {
    // 1. Mark as opened locally for immediate feedback
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, openStatus: "opened" } : n)),
    );

    // 2. Call the API to update status on server
    try {
      const token = localStorage.getItem("token");
      await fetch(`${API_BASE_URL}/shop/notificationOpenStatus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          usertoken: token,
        },
        body: JSON.stringify({ notificationId: notif.id }),
      });
    } catch (err) {
      console.error("Failed to update notification status:", err);
    }

    if (notif.msgType === "newShop") {
      const shopId = parseInt(notif.msgLink);
      navigate(`/shop-detail/${shopId}`);
    } else {
      let finalVideoUrl = "https://assets.mixkit.co/videos/preview/mixkit-hand-applying-henna-on-another-hand-40049-large.mp4";
      if (notif.msgImage) {
        finalVideoUrl = notif.msgImage.startsWith("http") 
          ? notif.msgImage 
          : `https://d7bnll1h35b3b.cloudfront.net${notif.msgImage}`;
      }

      // Professionally navigate to video player with fallback state
      navigate(`/video-player/${notif.msgLink}`, {
        state: {
          videos: [{
            id: notif.msgLink,
            title: notif.msgTitle || "Notification Video",
            description: notif.msgDesc || "Video from your notification",
            videoUrl: finalVideoUrl,
          }],
          index: 0
        }
      });
    }
  };

  return (
    <div className="min-h-screen pb-32">
      {/* ── DESIGNER HEADER (BANNER) ── */}
      <header className="relative w-[100vw] left-1/2 -translate-x-1/2 h-[120px] md:h-[150px] bg-slate-950 overflow-hidden flex items-end shadow-2xl border-b border-slate-800">
        <div className="absolute inset-0">
          <img
            src="assets/notification-banner.jpg"
            alt="Header Banner"
            className="w-full h-full object-cover opacity-60 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div className="absolute inset-0 bg-slate-950/20" />
          <div className="absolute inset-0 backdrop-blur-[1px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-2 md:px-8 lg:px-12 pb-4 md:pb-8 text-white">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-10">
            <div className="space-y-4 sm:space-y-6">
              <div className="space-y-2">
                <div
                  className="flex items-center gap-2 animate-fade-in"
                >
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                    <span className="w-1.5 h-1.5 bg-blue-500/50 rounded-full" />
                  </div>
                  <p className="text-[8px] font-black text-blue-400 uppercase tracking-[0.4em]">
                    Mapman Connect
                  </p>
                </div>
                <h1
                  className="text-2xl md:text-3xl font-black tracking-tighter uppercase italic leading-none animate-fade-in"
                >
                  Notifications
                </h1>
              </div>
            </div>

            <div
              className="hidden md:flex flex-col items-end gap-3 text-right animate-scale-in"
            >
              <button
                onClick={() => navigate("/notification-settings")}
                className="group flex items-center gap-3 px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl backdrop-blur-xl transition-all"
              >
                <Settings className="w-4 h-4 text-white group-hover:rotate-90 transition-transform duration-500" />
              </button>
            </div>
          </div>
        </div>
      </header>

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

      <main className="max-w-7xl mx-auto px-2 md:px-8 lg:px-12 -mt-4 md:-mt-8 relative z-20 space-y-6 md:space-y-12 pb-24">
        <div className="flex items-center justify-between px-2"></div>

        {loading && notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest animate-pulse">
              Fetching synchronization...
            </p>
          </div>
        ) : (
          <div
            className="animate-fade-in"
          >
            <NotificationList
              notifications={notifications}
              onNotificationClick={handleNotificationClick}
            />
          </div>
        )}

        {notifications.length > 0 && (
          <div className="pt-10 flex flex-col items-center gap-4">
            {hasMore ? (
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="relative px-6 py-2.5 bg-white border border-slate-200 shadow-[0_4px_15px_rgb(0,0,0,0.04)] hover:shadow-[0_10px_20px_rgb(0,0,0,0.08)] hover:border-blue-200 text-slate-700 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] hover:-translate-y-0.5 transition-all duration-500 active:scale-95 flex items-center gap-2 overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]" />
                {loading ? (
                  <Loader2 className="w-3 h-3 text-blue-600 animate-spin relative z-10" />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all duration-500 relative z-10">
                    <MoreHorizontal className="w-3 h-3 text-blue-600" />
                  </div>
                )}
                <span className="relative z-10 group-hover:text-blue-700 transition-colors duration-300">
                  {loading ? "Loading Memory..." : "Load More Memory"}
                </span>
              </button>
            ) : (
              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest opacity-40 leading-none italic">
                End of synchronization queue
              </p>
            )}
          </div>
        )}

        {notifications.length === 0 && !loading && (
          <div className="text-center py-20 opacity-40">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-500">
              No Notifications Logged
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Notifications;
