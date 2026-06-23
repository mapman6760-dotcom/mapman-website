import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  API_BASE_URL
} from "../config";
import {
  ChevronLeft,
  Loader2,
  Play,
  Sparkles,
  VideoOff,
  MoreVertical,
  Clock,
  User,
  Eye,
  MessageCircle,
  ChevronRight,
} from "lucide-react";
import { VideoCardSkeleton } from "../components/SkeletonLoaders";




const CategoryVideos = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "";

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [userPoints, setUserPoints] = useState(0);

  useEffect(() => {
    if (category) {
      fetchCategoryVideos(1, false);
    }
    fetchPoints();
  }, [category]);

  const fetchPoints = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/shop/fetchPoints`, {
        headers: { usertoken: token },
      });
      const result = await response.json();
      if (result.status === 200) {
        setUserPoints(result.data || 0);
      }
    } catch (error) {
      console.error("Error fetching points:", error);
    }
  };

  const fetchCategoryVideos = async (pageNum, isLoadMore = false) => {
    if (isLoadMore) setFetchingMore(true);
    else setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_BASE_URL}/shop/allVideos?category=${encodeURIComponent(category.toLowerCase())}&page=${pageNum}`,
        {
          method: "GET",
          headers: {
            usertoken: token,
          },
        },
      );

      const result = await response.json();
      if (result.status === 200 && Array.isArray(result.data)) {
        if (isLoadMore) {
          setVideos((prev) => [...prev, ...result.data]);
        } else {
          setVideos(result.data);
        }

        if (result.data.length < 30) {
          setHasMore(false);
        }
      } else {
        if (!isLoadMore) setVideos([]);
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching category videos:", error);
      if (!isLoadMore) setVideos([]);
    } finally {
      setLoading(false);
      setFetchingMore(false);
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchCategoryVideos(nextPage, true);
  };


  return (
    <div
      className="min-h-screen bg-slate-50/50 pb-32 animate-fade-in"
    >
      {/* ── STICKY HEADER ── */}

      {/* ── REDESIGNED PREMIUM HEADER CARD ── */}
      <div className="relative w-full mb-6 md:mb-10 overflow-hidden shadow-xl border-b border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-6 md:p-8 lg:px-12 lg:py-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none -ml-20 -mb-20"></div>
        
        <div className="flex items-center gap-6 relative z-10">
          <button
            onClick={() => navigate(-1)}
            className="w-12 h-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center shadow-lg hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95 transition-all text-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="space-y-1">
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase italic leading-none drop-shadow-lg">
              {category} Hub
            </h1>
            <div className="flex items-center gap-2 pt-1.5">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              <p className="text-[10px] font-black text-blue-200 uppercase tracking-[0.3em] opacity-90">
                Curated Video Experiences
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 relative z-10">
          <div className="bg-white/10 backdrop-blur-xl px-6 py-3 rounded-2xl flex items-center gap-3 shadow-xl border border-white/10 hover:bg-white/20 transition-all group">
            <img
              src="https://cdn-icons-png.flaticon.com/128/7892/7892416.png"
              className="w-6 h-6 object-contain group-hover:rotate-12 transition-transform drop-shadow-lg"
              alt="Coins"
            />
            <span className="text-lg font-black text-white tracking-tighter drop-shadow-md">
              {userPoints}
            </span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-2 md:px-6 py-6 lg:py-10">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <VideoCardSkeleton key={i} />
            ))}
          </div>
        ) : videos.length > 0 ? (
          <div className="space-y-12">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-6">

                {videos.map((vid, i) => (
                  <div
                    key={vid.id || i}
                    style={{ animationDelay: `${i * 45}ms` }}
                    onClick={() =>
                      navigate(`/video-player/${vid.id || i}`, {
                        state: { videos: videos, index: i, isMyVideos: false },
                      })
                    }
                    className="group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer bg-slate-950 border border-slate-800 shadow-xl hover:shadow-[0_20px_60px_-15px_rgba(59,130,246,0.25)] hover:-translate-y-1 transition-all duration-500 h-full animate-fade-in-up opacity-0"
                  >
                    {/* VIDEO */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-slate-900">
                      <video
                        src={vid.video ? (vid.video.startsWith('http') ? vid.video : `${API_BASE_URL}${vid.video}`) : ""}
                        className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 opacity-80 group-hover:opacity-100"
                        muted
                        loop
                        preload="metadata"
                        onMouseEnter={(e) => {
                          const video = e.currentTarget;
                          video._playPromise = video.play();
                          video._playPromise.catch(err => console.log("Play blocked", err));
                        }}
                        onMouseLeave={(e) => {
                          const video = e.currentTarget;
                          if (video._playPromise) {
                            video._playPromise.then(() => {
                              video.pause();
                              video.currentTime = 0;
                            }).catch(() => {});
                          } else {
                            video.pause();
                            video.currentTime = 0;
                          }
                        }}
                      />

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                      {/* Views badge */}
                      <div className="absolute top-3 left-3 z-10">
                        <div className="px-2.5 py-1 bg-black/50 backdrop-blur-xl rounded-lg border border-white/10 flex items-center gap-1.5 shadow-xl">
                          <Eye className="w-3 h-3 text-white" />
                          <span className="text-[9px] font-black text-white uppercase tracking-widest">{vid.views || 0}</span>
                        </div>
                      </div>

                      {/* Play button overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 shadow-2xl scale-75 group-hover:scale-100 transition-transform">
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        </div>
                      </div>

                      {/* Text overlay at bottom */}
                      <div className="absolute bottom-0 inset-x-0 p-4 z-10">
                        <h4 className="text-[13px] font-black text-white uppercase tracking-tight line-clamp-1 leading-tight group-hover:text-blue-400 transition-colors drop-shadow-lg">
                          {vid.videoTitle}
                        </h4>
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <span className="w-1 h-1 bg-cyan-400 rounded-full" />
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{category} Explorer</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

            </div>

            {hasMore && (
              <div className="flex justify-center pt-8">
                <button
                  onClick={handleLoadMore}
                  disabled={fetchingMore}
                  className="px-12 py-5 bg-slate-950 text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl hover:scale-105 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-4"
                >
                  {fetchingMore && <Loader2 className="w-4 h-4 animate-spin" />}
                  {fetchingMore ? "Indexing Feed..." : "Load More Experiences"}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center bg-white/50 backdrop-blur-xl rounded-[4rem] border-2 border-slate-100 py-32 px-10 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-[100px] -mr-32 -mt-32"></div>
            <div className="w-24 h-24 bg-white text-slate-200 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-2xl border border-slate-50">
              <VideoOff className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-slate-400 uppercase tracking-widest mb-3">
              No Experiences Found
            </h3>
            <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest max-w-[320px] leading-relaxed">
              No motion assets are currently indexed for this classification.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default CategoryVideos;
