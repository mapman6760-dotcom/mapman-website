import { useState, useEffect } from "react";
import {
  Bookmark,
  Play,
  Store,
  ChevronRight,
  ExternalLink,
  Info,
  ShieldCheck,
  Loader2,
  MapPin,
  Clock,
  Heart,
  Video,
  ChevronLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";



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
                ? item.shopImage
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
                ? item.video
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

  if (isLoading && savedShops.length === 0 && savedVideos.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-[#F8FAFD]">
        <div
          className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full shadow-inner animate-spin"
        />
        <div className="space-y-2 text-center">
          <p className="text-[10px] font-black text-slate-900 uppercase tracking-[0.4em] animate-pulse">
            Loading Your Saves
          </p>
          <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest opacity-60">
            Please wait while we sync your data
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFD] pb-20 animate-fade-in">

      {/* ── STYLISH FLOATING HEADER ── */}
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="relative w-full mb-6 md:mb-8 mt-2 overflow-hidden shadow-sm border border-slate-200/60 bg-white/80 backdrop-blur-xl rounded-[0.5rem] py-4 md:py-5 px-5 md:px-7 flex flex-col md:flex-row md:items-center justify-between gap-5 z-10">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100/50 to-purple-100/50 rounded-full blur-[60px] pointer-events-none -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-emerald-100/50 to-cyan-100/50 rounded-full blur-[60px] pointer-events-none -ml-20 -mb-20"></div>

          <div className="flex items-center gap-4 relative z-10">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 bg-slate-100 hover:bg-slate-200 border border-slate-200/60 rounded-xl flex items-center justify-center text-slate-600 hover:text-slate-900 transition-all active:scale-95 shadow-sm shrink-0"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex flex-col gap-0.5">
              <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight uppercase leading-none">
                Saved Items
              </h1>
              <div className="flex items-center gap-2 pt-0.5">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                  Your Collection
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 relative z-10 self-start md:self-auto">
            <div className="flex items-center gap-2 px-3.5 py-2 bg-white/60 backdrop-blur-md border border-slate-200/50 rounded-xl shadow-sm">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span className="font-black text-slate-700 text-[11px]">{(savedShops.length + savedVideos.length)}</span>
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">total saves</span>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 md:px-6 pt-4 pb-10 space-y-6">

        {/* ── TAB BAR ── */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex p-1.5 bg-white border border-slate-100 rounded-2xl shadow-sm w-fit">
            {[
              { id: "shops", label: "Saved Shops", icon: Store },
              { id: "videos", label: "Saved Videos", icon: Video },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                type="button"
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300 font-bold text-xs tracking-wider ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
              {activeTab === "shops" ? savedShops.length : savedVideos.length} saved
            </span>
          </div>
        </div>

        {/* ── SHOPS GRID ── */}
        {activeTab === "shops" && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 animate-fade-in">
            {savedShops.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-24 text-center bg-white rounded-[0.5rem] border border-slate-100 shadow-sm mx-4 mb-10 mt-10">
                <div className="w-20 h-20 bg-slate-50 rounded-[1rem] flex items-center justify-center mb-5 border border-slate-100 shadow-inner">
                  <Store className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight mb-2">No Saved Shops</h3>
                <p className="text-sm text-slate-400 max-w-xs font-medium leading-relaxed">
                  Explore the map and bookmark shops you love — they'll appear here.
                </p>
              </div>
            ) : (
              savedShops.map((shop, i) => (
                <div
                  key={shop.id}
                  className="group bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-400 flex flex-col"
                >
                  {/* Image Header */}
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    <img
                      src={shop.image}
                      alt={shop.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />

                    {/* Category badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm border border-white/80 rounded-lg text-[9px] font-black text-slate-700 uppercase tracking-widest">
                        {shop.category || "General"}
                      </span>
                    </div>

                    {/* Unsave button */}
                    <div className="absolute top-3 right-3">
                      <button
                        onClick={() => toggleSaveShop(shop.id)}
                        disabled={unsavingId === shop.id}
                        className="w-9 h-9 bg-white/90 backdrop-blur-sm border border-white/80 rounded-xl flex items-center justify-center shadow-sm hover:bg-red-50 hover:border-red-200 transition-all active:scale-90 disabled:opacity-50 group/unsave"
                      >
                        {unsavingId === shop.id ? (
                          <Loader2 className="w-3.5 h-3.5 text-blue-600 animate-spin" />
                        ) : (
                          <Bookmark className="w-3.5 h-3.5 text-blue-600 fill-blue-600 group-hover/unsave:text-red-500 group-hover/unsave:fill-red-500 transition-colors" />
                        )}
                      </button>
                    </div>

                    {/* Shop name on image */}
                    <div className="absolute bottom-3 left-4 right-4">
                      <h4 className="text-base font-black text-white tracking-tight line-clamp-1 uppercase drop-shadow-md">
                        {shop.name}
                      </h4>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 flex flex-col gap-3 flex-1">
                    {/* Location & Time */}
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-blue-500 mt-0.5 shrink-0" />
                        <span className="text-xs font-medium leading-snug line-clamp-2">{shop.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500">
                        <Clock className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="text-xs font-semibold text-slate-600">{shop.time}</span>
                      </div>
                    </div>

                    {/* Action Row */}
                    <div className="flex items-center gap-2 pt-2 border-t border-slate-100 mt-auto">
                      <button
                        onClick={() => navigate(`/shop-detail/${shop.id}`)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[11px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-sm"
                      >
                        <Store className="w-3.5 h-3.5" />
                        View Shop
                      </button>
                      {shop.latitude && shop.longitude && (
                        <button
                          onClick={() =>
                            window.open(`https://www.google.com/maps?q=${shop.latitude},${shop.longitude}`, "_blank")
                          }
                          className="w-10 h-10 flex items-center justify-center bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-xl transition-all active:scale-95"
                        >
                          <ExternalLink className="w-4 h-4 text-slate-500 hover:text-blue-600" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ── VIDEOS GRID ── */}
        {activeTab === "videos" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 animate-fade-in">
            {savedVideos.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-24 text-center bg-white rounded-[0.5rem] border border-slate-100 shadow-sm mx-4 mb-10 mt-10">
                <div className="w-20 h-20 bg-slate-50 rounded-[1rem] flex items-center justify-center mb-5 border border-slate-100 shadow-inner">
                  <Play className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight mb-2">No Saved Videos</h3>
                <p className="text-sm text-slate-400 max-w-xs font-medium leading-relaxed">
                  Browse the video feed and save clips you love — they'll appear here.
                </p>
              </div>
            ) : (
              savedVideos.map((video, idx) => (
                <div
                  key={video.id}
                  className="group relative aspect-[4/5] overflow-hidden rounded-3xl bg-slate-950 shadow-md border border-slate-100 transition-all hover:-translate-y-1 duration-400"
                >
                  <video
                    src={video.thumbnail ? (video.thumbnail.startsWith('http') ? video.thumbnail : `${API_BASE_URL}${video.thumbnail}`) : ""}
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-50 transition-all duration-700"
                    muted
                    playsInline
                    loop
                    preload="none"
                  />

                  <div
                    onClick={() => navigate(`/video-player/${video.id}`, { state: { videos: savedVideos, index: idx } })}
                    className="absolute inset-0 flex items-center justify-center cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/20 transition-all scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-100 duration-400">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                  </div>

                  {/* Unsave button */}
                  <div className="absolute top-2.5 right-2.5">
                    <button
                      onClick={() => toggleSaveVideo(video.id)}
                      disabled={unsavingId === video.id}
                      className="w-8 h-8 bg-white/90 backdrop-blur-md rounded-xl flex items-center justify-center shadow-sm hover:bg-red-50 transition-all active:scale-95 disabled:opacity-50"
                    >
                      {unsavingId === video.id ? (
                        <Loader2 className="w-3 h-3 animate-spin text-blue-600" />
                      ) : (
                        <Bookmark className="w-3 h-3 text-blue-600 fill-blue-600" />
                      )}
                    </button>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                    <h5 className="text-[10px] font-black text-white uppercase tracking-tight leading-tight truncate mb-0.5">
                      {video.title}
                    </h5>
                    <p className="text-[8px] font-bold text-blue-300 uppercase tracking-widest truncate">
                      {video.shopName}
                    </p>
                    <button
                      onClick={() => navigate(`/shop-detail/${video.shopId || 1}`)}
                      className="mt-2 w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-[9px] shadow-lg transition-all flex items-center justify-center gap-1.5 active:scale-95"
                    >
                      <Store className="w-3 h-3" /> Visit Store
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Footer verification strip */}
        <div className="flex items-center justify-center gap-3 pt-6">
          <div className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-100 rounded-full shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Registry Integrity Verified</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SavedItems;
