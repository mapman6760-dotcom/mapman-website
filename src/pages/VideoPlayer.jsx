import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Store,
  MessageCircle,
  Bookmark,
  ChevronLeft,
  CirclePlay,
  RotateCcw,
  CheckCircle2,
  Volume2,
  VolumeX,
  Pause,
  Play,
} from "lucide-react";

const API_BASE_URL = "https://mapman-production.up.railway.app";

/**
 * Immersive Video Player with Vertical Swipe Logic
 */
const VideoPlayer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  // Normalize videos from state or fallback to dummy
  const videoList = location.state?.videos || [];

  const [normalizedVideos, setNormalizedVideos] = useState(
    videoList.map((v) => ({
      id: v.id || v.videoId || Math.random(),
      shopId: v.shopId,
      title: v.videoTitle || v.title || "Untitled Reel",
      description:
        v.description ||
        v.reelDesc ||
        "This video show the simple tricks for beginners",
      shopName: v.shopName || v.categoryName || "Mapman Merchant",
      whatsappNumber: v.whatsappNumber,
      videoUrl:
        v.videoUrl ||
        (v.categoryVideo ? `${API_BASE_URL}${v.categoryVideo}` : null) ||
        (v.video ? `${API_BASE_URL}${v.video}` : null) ||
        "https://assets.mixkit.co/videos/preview/mixkit-hand-applying-henna-on-another-hand-40049-large.mp4",
      coins: v.coins || 4,
      isWatched: v.isWatched || v.watched || false,
      savedAlready: v.savedAlready || false,
    })),
  );

  const startIndex =
    location.state?.index !== undefined
      ? location.state.index
      : normalizedVideos.findIndex((v) => v.id == id) || 0;

  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showRewardsModal, setShowRewardsModal] = useState(false);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [userPoints, setUserPoints] = useState(0);

  const isMyVideos = location.state?.isMyVideos || false;
  const trackedVideos = useRef(new Set());
  const pointsTracked = useRef(new Set());
  const containerRef = useRef(null);
  const videoRefs = useRef([]);

  useEffect(() => {
    fetchPoints();
  }, []);

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

    const [toastMsg, setToastMsg] = useState("");

    const showToast = (msg) => {
        setToastMsg(msg);
        setTimeout(() => setToastMsg(""), 3000);
    };

    const handleVideoEnd = async (video) => {
        // Track the view when fully played
        await trackView(video.id);
        
        // Add points and refresh balance only if fully played and not in restricted view
        if (!isMyVideos && !pointsTracked.current.has(video.id)) {
            try {
                const token = localStorage.getItem("token");
                await fetch(`${API_BASE_URL}/shop/addPoints`, {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",
                        usertoken: token 
                    }
                });
                pointsTracked.current.add(video.id);
                fetchPoints(); // Refresh the points count display
            } catch (error) {
                console.error("Error adding points:", error);
            }
        }

        // Auto-scroll to the next video
        if (currentIndex < normalizedVideos.length - 1) {
            const nextIndex = currentIndex + 1;
            const height = containerRef.current.offsetHeight;
            containerRef.current.scrollTo({
                top: nextIndex * height,
                behavior: 'smooth'
            });
            // Note: handleScroll will catch the scroll and update currentIndex
        } else {
            // Show toast if it's the final video in the feed
            showToast("this is last video");
        }
    };

  const trackView = async (videoId) => {
    if (isMyVideos || trackedVideos.current.has(videoId)) return;

    try {
      const token = localStorage.getItem("token");
      await fetch(`${API_BASE_URL}/shop/viewedVideos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          usertoken: token,
        },
        body: JSON.stringify({ videoId }),
      });
      trackedVideos.current.add(videoId);
    } catch (error) {
      console.error("Error tracking view:", error);
    }
  };

  const handleSaveShop = async () => {
    const currentVideo = normalizedVideos[currentIndex];
    const newStatus = currentVideo.savedAlready ? "unsaved" : "saved";

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/shop/saveShop`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          usertoken: token,
        },
        body: JSON.stringify({
          shopId: currentVideo.shopId,
          status: newStatus,
        }),
      });

      const result = await response.json();
      if (result.status === 200) {
        setNormalizedVideos((prev) =>
          prev.map((v, idx) =>
            idx === currentIndex ? { ...v, savedAlready: !v.savedAlready } : v,
          ),
        );
      }
    } catch (error) {
      console.error("Error saving shop:", error);
    } finally {
      setShowSaveConfirm(false);
    }
  };

  const handleWhatsApp = (number) => {
    if (number) {
      window.open(`https://wa.me/${number}`, "_blank");
    }
  };

  // Snap to the starting video on first load
  useEffect(() => {
    if (containerRef.current) {
      const height = containerRef.current.offsetHeight;
      containerRef.current.scrollTop = startIndex * height;
    }
  }, [startIndex]);

  const handleScroll = (e) => {
    const height = e.currentTarget.offsetHeight;
    const newIndex = Math.round(e.currentTarget.scrollTop / height);
    if (
      newIndex !== currentIndex &&
      newIndex >= 0 &&
      newIndex < normalizedVideos.length
    ) {
      setCurrentIndex(newIndex);
    }
  };

  // Auto-play/pause logic for sound
  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (video) {
        if (idx === currentIndex) {
          if (isPlaying) {
            video.play().catch((err) => console.log("Autoplay blocked:", err));
          } else {
            video.pause();
          }
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [currentIndex, isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-black overflow-hidden select-none">
      {/* ── TOP ACTION BAR ── */}
      <div className="absolute top-0 left-0 right-0 p-4 pt-12 md:pt-6 z-50 flex items-center justify-between pointer-events-none">
        <button
          onClick={() => navigate(-1)}
          className="w-12 h-12 bg-white/20 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white pointer-events-auto active:scale-90 transition-transform shadow-xl"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-2 pointer-events-auto">
          <div
            className="flex items-center gap-2 bg-black/40 backdrop-blur-3xl px-4 py-2.5 rounded-full border border-white/10 cursor-pointer hover:bg-black/60 transition-colors shadow-2xl"
            onClick={() =>
              navigate(`/shop-detail/${normalizedVideos[currentIndex]?.shopId}`)
            }
          >
            <div className="w-6 h-6 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg">
              <Store className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-[10px] font-black text-white uppercase tracking-widest">
              Shop Details
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
          </div>

          {!isMyVideos && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowRewardsModal(true);
              }}
              className="h-12 bg-white/20 backdrop-blur-xl border border-white/20 rounded-full flex items-center gap-3 px-4 text-white active:scale-90 transition-transform shadow-xl"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/7892/7892416.png"
                className="w-5 h-5 object-contain"
                alt="Coins"
              />
              <span className="text-xs font-black tracking-tighter">
                {userPoints}
              </span>
            </button>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMuted(!isMuted);
            }}
            className="w-12 h-12 bg-white/20 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white active:scale-90 transition-transform shadow-xl"
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* ── VERTICAL VIDEO FEED (SNAP SCROLL) ── */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory hide-scrollbar no-scrollbar"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {normalizedVideos.map((video, idx) => (
          <div
            key={video.id || idx}
            className="h-full w-full snap-start relative flex items-center justify-center bg-black"
          >
            {/* ── VIDEO CONTAINER (PORTRAIT CENTERED) ── */}
            <div
              className="relative w-full h-full max-w-[450px] mx-auto bg-black flex items-center justify-center overflow-hidden cursor-pointer"
              onClick={togglePlay}
            >
              <video
                ref={(el) => (videoRefs.current[idx] = el)}
                src={video.videoUrl}
                className="w-full h-full object-cover lg:object-contain relative z-10"
                loop
                playsInline
                muted={isMuted}
                onEnded={() => handleVideoEnd(video)}
              />

              {/* PLAY/PAUSE OVERLAY INDICATOR */}
              <AnimatePresence>
                {!isPlaying && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none"
                  >
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-2xl rounded-full flex items-center justify-center text-white border border-white/20 shadow-2xl">
                      <Play className="w-7 h-7 fill-current opacity-80" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* AUDIO TOGGLE OVERLAY */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMuted(!isMuted);
                }}
                className="absolute bottom-32 right-6 w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 z-[60] active:scale-90 transition-transform"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>

              {/* PROGRESS BAR - MOVED TO ABSOLUTE BOTTOM */}
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/10 overflow-hidden z-[60]">
                <motion.div
                  className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)]"
                  initial={{ width: "0%" }}
                  animate={{
                    width: idx === currentIndex && isPlaying ? "100%" : "0%",
                  }}
                  transition={{ duration: 15, ease: "linear" }}
                />
              </div>
            </div>

            {/* ── OVERLAY INTERFACE ── */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/95 flex flex-col justify-end p-6 pb-26 md:pb-14 pointer-events-none">
              <div className="flex items-end justify-between gap-6 pointer-events-auto">
                {/* VIDEO INFO */}
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)] leading-none">
                      {video.shopName}
                    </h3>
                    {!isMyVideos &&
                      (video.isWatched ||
                        pointsTracked.current.has(video.id)) && (
                        <div className="px-3 py-1.5 bg-blue-600 rounded-xl flex items-center gap-2 shadow-xl shadow-blue-600/30 border border-white/10">
                          <span className="text-[9px] font-black text-white uppercase tracking-widest whitespace-nowrap">
                            Watched
                          </span>
                          <CheckCircle2 className="w-3 h-3 text-white" />
                        </div>
                      )}
                  </div>

                  <p className="text-[12px] font-bold text-white/80 uppercase tracking-widest leading-relaxed drop-shadow-md max-w-[300px]">
                    {video.description}
                  </p>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex flex-col md:flex-row items-center gap-4">
                  {!isMyVideos && (
                    <>
                      <button
                        onClick={() => handleWhatsApp(video.whatsappNumber)}
                        className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-emerald-600 shadow-[0_20px_40px_rgba(0,0,0,0.3)] active:scale-90 transition-transform group"
                      >
                        <img src="https://cdn-icons-png.flaticon.com/128/4423/4423697.png" alt="whatsapp" className="w-7 h-7" />
                      </button>
                      <button
                        onClick={() => setShowSaveConfirm(true)}
                        className={`w-14 h-14 backdrop-blur-3xl border border-white/20 rounded-full flex items-center justify-center shadow-[0_20px_40px_rgba(0,0,0,0.3)] active:scale-90 transition-transform hover:bg-white/20 group ${video.savedAlready ? "bg-blue-600 text-white" : "bg-white/10 text-white"}`}
                      >
                        <Bookmark
                          className="w-7 h-7 group-hover:scale-110 group-hover:rotate-6 transition-transform"
                          fill={video.savedAlready ? "currentColor" : "none"}
                        />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SMOOTH BOTTOM INDICATOR */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-40 h-1.5 bg-white/10 rounded-full backdrop-blur-xl" />

      {/* ── SAVE CONFIRMATION DIALOG ── */}
      <AnimatePresence>
        {showSaveConfirm && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSaveConfirm(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-[320px] bg-white rounded-[2.5rem] shadow-2xl p-8 border border-slate-100 overflow-hidden"
            >
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Bookmark className="w-8 h-8 fill-current" />
              </div>
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-2">
                {normalizedVideos[currentIndex]?.savedAlready
                  ? "Remove Store?"
                  : "Save this Store?"}
              </h3>
              <p className="text-xs text-slate-500 font-medium mb-8 leading-relaxed uppercase tracking-wide px-2">
                {normalizedVideos[currentIndex]?.savedAlready
                  ? "Are you sure you want to remove this shop from your saved items?"
                  : "Keep track of this shop in your saved items for quick access later."}
              </p>
              <div className="space-y-3">
                <button
                  onClick={handleSaveShop}
                  className="w-full py-4 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-blue-600/20 active:scale-95 transition-all"
                >
                  Confirm Action
                </button>
                <button
                  onClick={() => setShowSaveConfirm(false)}
                  className="w-full py-4 bg-slate-50 text-slate-400 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] active:scale-95 transition-all"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── EARN REWARDS DIALOG (PROFESSIONAL) ── */}
      <AnimatePresence>
        {showRewardsModal && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowRewardsModal(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-[300px] bg-white rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(30,58,138,0.25)] p-8 border border-white overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 to-amber-600" />
              <div className="w-32 h-32 mx-auto mb-6 relative">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative z-10"
                >
                  <img
                    src="https://img.freepik.com/premium-vector/purple-box-with-gold-bow-top-it-there-are-many-gold-coins-scattered-around-box-vector-illustration_345238-2441.jpg?semt=ais_incoming&w=740&q=80"
                    className="w-full h-full object-cover rounded-2xl"
                    alt="Treasure"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-orange-400/20 blur-3xl rounded-full" />
              </div>
              <div className="space-y-3 mb-8">
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic leading-tight">
                  Your Rewards Hub
                </h3>
                <p className="text-[11px] font-medium text-slate-400 leading-relaxed px-2 uppercase tracking-wide">
                  Current Balance:{" "}
                  <span className="text-orange-600 font-bold">
                    {userPoints} SuperCoins
                  </span>
                </p>
              </div>
              <button
                onClick={() => setShowRewardsModal(false)}
                className="w-full h-14 rounded-2xl bg-gradient-to-r from-orange-400 to-amber-600 text-white font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all active:scale-95"
              >
                Yes, I Got It
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* ── TOAST MESSAGE ── */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-32 left-1/2 -translate-x-1/2 z-[3000] px-6 py-3 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl"
          >
            <p className="text-xs font-black text-white uppercase tracking-widest">{toastMsg}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoPlayer;
