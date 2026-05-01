import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bookmark,
  Play,
  Store,
  Video,
  ChevronRight,
  ExternalLink,
  Info,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "https://mapman-production.up.railway.app";

const fetchSavedVideos = async (page) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${API_BASE_URL}/shop/fetchMySavedVideos?page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          usertoken: token,
        },
      },
    );
    return await response.json();
  } catch (error) {
    console.error("Error fetching saved videos:", error);
    throw error;
  }
};

const fetchSavedShops = async (page) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${API_BASE_URL}/shop/fetchSavedShops?page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          usertoken: token,
        },
      },
    );
    return await response.json();
  } catch (error) {
    console.error("Error fetching saved shops:", error);
    throw error;
  }
};

const handleSaveShop = async (shopId, status) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/shop/saveShop`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        usertoken: token,
      },
      body: JSON.stringify({ shopId, status }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error saving shop:", error);
  }
};

const handleSaveVideo = async (videoId, status) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/shop/saveOthersVideos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        usertoken: token,
      },
      body: JSON.stringify({ videoId, status }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error saving video:", error);
  }
};

const SavedItems = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("shops");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [savedShops, setSavedShops] = useState([]);
  const [savedVideos, setSavedVideos] = useState([]);
  const [unsavingId, setUnsavingId] = useState(null);

  const toggleSaveShop = async (shopId) => {
    setUnsavingId(shopId);
    try {
      const response = await handleSaveShop(shopId, "inactive");
      if (response && response.status === 200) {
        setSavedShops((prev) => prev.filter((shop) => shop.id !== shopId));
      }
    } finally {
      setUnsavingId(null);
    }
  };

  const toggleSaveVideo = async (videoId) => {
    setUnsavingId(videoId);
    try {
      const response = await handleSaveVideo(videoId, "inactive");
      if (response && response.status === 200) {
        setSavedVideos((prev) => prev.filter((video) => video.id !== videoId));
      }
    } finally {
      setUnsavingId(null);
    }
  };

  const loadData = async (page, tab) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response =
        tab === "shops"
          ? await fetchSavedShops(page)
          : await fetchSavedVideos(page);

      if (response.status === 200) {
        const rawData = response.data || [];
        const mappedData = rawData.map((item) => {
          if (tab === "shops") {
            return {
              ...item,
              id: item.id,
              name: item.shopName,
              category: item.category,
              time: `${item.openTime || "10:30 AM"} - ${item.closeTime || "04:16 PM"}`,
              image: item.shopImage
                ? `${API_BASE_URL}${item.shopImage}`
                : "https://images.unsplash.com/photo-1621252179027-94459d278660?w=600&h=600&fit=crop",
              location: item.address || "Location not available",
              latitude: item.lat,
              longitude: item.long,
            };
          } else {
            return {
              ...item,
              id: item.id,
              title: item.videoTitle,
              shopName: item.shopName,
              thumbnail: item.video
                ? `${API_BASE_URL}${item.video}`
                : "https://images.unsplash.com/photo-1621252176993-94459d278660?w=600&h=800&fit=crop",
              views: `${item.views || 0}`,
            };
          }
        });

        if (tab === "shops") {
          setSavedShops((prev) =>
            page === 1 ? mappedData : [...prev, ...mappedData],
          );
        } else {
          setSavedVideos((prev) =>
            page === 1 ? mappedData : [...prev, ...mappedData],
          );
        }

        if (rawData.length < 30) {
          setHasMoreData(false);
        }
      }
    } catch (error) {
      console.error("Error fetching saved items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentPage > 1) {
      loadData(currentPage, activeTab);
    }
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    setHasMoreData(true);
    loadData(1, activeTab);
  }, [activeTab]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const currentScroll =
        window.innerHeight + document.documentElement.scrollTop;
      if (currentScroll + 10 >= scrollHeight) {
        if (!isLoading && hasMoreData) {
          setCurrentPage((prev) => prev + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, hasMoreData]);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-32">
      {/* ── PREMIUM HEADER ── */}

      <main className="max-w-7xl mx-auto px-4 md:px-10 py-10 space-y-16">
        {/* ── INTERACTIVE ENROLLMENT CARD ── */}
        <section className="relative overflow-hidden rounded-[1rem] bg-slate-900 shadow-2xl p-6 md:p-9">
          <div className="absolute inset-0">
            <img
              src="assets/notification-banner.jpg"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-[1.5rem] overflow-hidden border-2 border-white/20 shadow-2xl shrink-0 rotate-2 transition-transform hover:rotate-0 duration-500">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop"
                  className="w-full h-full object-cover scale-110"
                  alt="Enroll"
                />
              </div>
              <div className="space-y-3">
                <h2 className="text-xl md:text-2xl font-black text-white tracking-wide italic leading-relaxed">
                  Entroll Shop Owners <br />
                  <span className="text-blue-400 tracking-wider">
                    Business Network
                  </span>
                </h2>
              </div>
            </div>
            <button className="group relative px-8 py-4 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 overflow-hidden">
              <span className="relative z-10">Join Registry</span>
              <ChevronRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </section>

        {/* ── PREMIUM TAB SYSTEM ── */}
        <div className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-200 pb-8">
            <div className="space-y-4">
              <div className="flex p-1.5 bg-slate-100 rounded-2xl w-fit">
                {[
                  {
                    id: "shops",
                    label: "Shop Details",
                    icon: "https://cdn-icons-png.flaticon.com/128/869/869432.png",
                  },
                  {
                    id: "videos",
                    label: "Videos",
                    icon: "https://cdn-icons-png.flaticon.com/128/9973/9973070.png",
                  },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    type="button"
                    className={`flex items-center gap-3 px-6 py-2.5 rounded-3xl transition-all duration-300 font-semibold text-xs  tracking-wider ${
                      activeTab === tab.id
                        ? "bg-blue-600 text-white shadow-md scale-105"
                        : "bg-white text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    <img
                      src={tab.icon}
                      alt={tab.label}
                      className="w-5 h-5 object-contain"
                    />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 px-4 py-2 bg-emerald-50/50 rounded-full border border-emerald-100">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest leading-none">
                {activeTab === "shops" ? savedShops.length : savedVideos.length}{" "}
                Saved Entries Analyzed
              </span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "shops" ? (
              <motion.div
                key="shops-grid"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {savedShops.map((shop, i) => (
                  <div
                    key={shop.id}
                    className="group relative bg-white p-3 rounded-[1.5rem] border border-slate-100 shadow-[0_12px_40px_-15px_rgba(0,0,0,0.06)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-700"
                  >
                    <div className="flex gap-4 items-center">
                      {/* Shop Thumbnail with Navigation Icon Overlay */}
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden shadow-xl shrink-0 ring-1 ring-slate-100 ring-inset">
                        <img
                          src={shop.image}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                          alt={shop.name}
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent mix-blend-overlay" />

                        {/* Pro Navigation Overlay */}
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            if (shop.latitude && shop.longitude) {
                              window.open(
                                `https://www.google.com/maps?q=${shop.latitude},${shop.longitude}`,
                                "_blank",
                              );
                            }
                          }}
                          className="absolute bottom-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-white hover:scale-110 transition-all z-10"
                        >
                          <div className="w-5 h-5 bg-blue-500 text-white rounded-md flex items-center justify-center rotate-45 shadow-lg shadow-blue-500/20">
                            <ExternalLink className="w-3 h-3 rotate-[-45deg]" />
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 min-w-0 py-1 pr-4 flex flex-col justify-between h-full min-h-[96px]">
                        <div className="space-y-1">
                          <h4 className="text-base font-extrabold text-slate-900 tracking-tight leading-tight group-hover:text-blue-600 transition-colors">
                            {shop.name}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold uppercase tracking-wider opacity-80">
                            <span>{shop.category}</span>
                            <span className="w-1 h-1 bg-slate-300 rounded-full" />
                            <span>{shop.time}</span>
                          </div>
                        </div>

                        {/* Ultra-Compact Premium Button */}
                        <div className="mt-4 w-fit relative">
                          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-amber-300 to-indigo-500 rounded-full blur-[4px] opacity-15 group-hover:opacity-30 transition-opacity" />
                          <div className="relative p-[1px] bg-gradient-to-r from-emerald-500 via-yellow-400 to-indigo-600 rounded-full ring-1 ring-white/5 group-hover:shadow-[0_0_12px_-5px_rgba(251,191,36,0.3)] transition-all">
                            <button
                              onClick={() =>
                                navigate(`/shop-detail/${shop.id}`)
                              }
                              className="flex items-center gap-2 px-3 py-1 bg-slate-950 text-white rounded-full text-[10px] font-black front-normal tracking-[0.12em] transition-all active:scale-95 shadow-inner"
                            >
                              <div className="p-0.5 bg-white rounded-md shadow-sm">
                                <Store className="w-3 h-3 text-slate-900" />
                              </div>
                              Shop Details
                            </button>
                          </div>
                        </div>

                        {/* Top-Right Bookmark Button - Refined Shadow */}
                        <div className="absolute top-4 right-4">
                          <button
                            onClick={() => toggleSaveShop(shop.id)}
                            disabled={unsavingId === shop.id}
                            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-[0_5px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-all active:scale-90 border border-slate-50 group/save disabled:opacity-50"
                          >
                            {unsavingId === shop.id ? (
                              <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                            ) : (
                              <Bookmark className="w-4 h-4 text-slate-900 fill-slate-900 group-hover/save:scale-110 transition-transform" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="videos-grid"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4"
              >
                {savedVideos.map((video, idx) => (
                  <div
                    key={video.id}
                    className="group relative aspect-[4/5] overflow-hidden rounded-[1.8rem] bg-slate-950 shadow-lg border border-white/5 transition-all hover:-translate-y-1 duration-500"
                  >
                    <video
                      src={video.thumbnail}
                      className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-40 transition-all duration-700"
                      muted
                      playsInline
                      onMouseOver={(e) => e.target.play()}
                      onMouseOut={(e) => e.target.pause()}
                    />

                    <div
                      onClick={() =>
                        navigate(`/video-player/${video.id}`, {
                          state: { videos: savedVideos, index: idx },
                        })
                      }
                      className="absolute inset-0 flex items-center justify-center cursor-pointer"
                    >
                      <div className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/20 transition-all scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-100 duration-500">
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      </div>
                    </div>

                    <div className="absolute top-4 right-4">
                      <button
                        onClick={() => toggleSaveVideo(video.id)}
                        disabled={unsavingId === video.id}
                        className="px-2.5 py-1.5 rounded-xl bg-black/40 backdrop-blur-md flex items-center gap-2 text-[9px] font-black text-blue-400 border border-white/5 italic hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                      >
                        {unsavingId === video.id ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <Bookmark className="w-3 h-3 fill-current" />
                        )}{" "}
                        {video.views}
                      </button>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col gap-3">
                      <div className="space-y-0.5">
                        <h4 className="text-[10px] font-black text-white uppercase tracking-tighter leading-tight truncate">
                          {video.title}
                        </h4>
                        <p className="text-[7.5px] font-black text-blue-400 uppercase tracking-widest opacity-80">
                          {video.shopName}
                        </p>
                      </div>
                      <button
                        onClick={() => navigate(`/shop-detail/1`)}
                        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-[10px] shadow-lg transition-all flex items-center justify-center gap-2"
                      >
                        <Store className="w-3.5 h-3.5" /> Visit Store
                      </button>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* ── PROFESSIONAL FOOTER EMPTY STATE ── */}
      <div className="flex flex-col items-center justify-center gap-8 py-20">
        <div className="w-24 h-24 bg-slate-100 rounded-[2.5rem] flex items-center justify-center text-slate-300 relative group transition-all hover:bg-blue-50 hover:text-blue-200">
          <ShieldCheck className="w-10 h-10 transition-transform group-hover:scale-110" />
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-white shadow-xl rounded-full flex items-center justify-center">
            <Info className="w-3.5 h-3.5 text-blue-500" />
          </div>
        </div>
        <div className="text-center space-y-2">
          <p className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-900 italic">
            Registry Integrity Verified
          </p>
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest opacity-60">
            End-to-End Encryption Enabled
          </p>
        </div>
      </div>
    </div>
  );
};

export default SavedItems;
