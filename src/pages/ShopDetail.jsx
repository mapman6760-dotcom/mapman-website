import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  AlertTriangle,
  Bookmark,
  Phone,
  ChevronRight,
  MapPin,
  ShieldCheck,
  Video,
  ExternalLink,
  MessageCircle,
  Clock,
  Briefcase,
  Star,
  Info,
  Hash,
  X,
  Maximize2,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useNavigate, useParams } from "react-router-dom";

const API_BASE_URL = "https://mapman-production.up.railway.app";

const ShopDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");
  const [loading, setLoading] = useState(true);
  const [shopInfo, setShopInfo] = useState(null);
  const [videos, setVideos] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchShopData();
  }, [id]);

  const fetchShopData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/shop/getShopById`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          usertoken: token,
        },
        body: JSON.stringify({ shopId: parseInt(id) }),
      });

      const text = await response.text();
      try {
        const result = JSON.parse(text);
        if (result.status === 200) {
          setShopInfo(result.data.shop);
          setVideos(result.data.shopVideos || []);
          setIsSaved(result.data.shopSavedAlready);
        } else {
          setError(result.message || "Store information unavailable");
        }
      } catch (err) {
        setError("Service temporarily unavailable");
      }
    } catch (err) {
      setError("Unable to connect to the network");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 bg-white rounded-3xl shadow-sm border border-slate-100">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="w-12 h-12 border-4 border-slate-100 border-t-blue-600 rounded-full"
        />
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest animate-pulse">
          Loading Store Profile...
        </p>
      </div>
    );
  }

  if (error || !shopInfo) {
    return (
      <div className="max-w-6xl mx-auto w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-20 px-4">
        {/* ── EMPTY DATA CARD ── */}
        <div className="min-h-[50vh] flex flex-col items-center justify-center gap-8 p-12 bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          <div className="w-24 h-24 bg-slate-50 rounded-3xl flex items-center justify-center border border-slate-100 shadow-inner group-hover:scale-110 transition-transform duration-500">
            <AlertTriangle className="w-10 h-10 text-slate-300" />
          </div>

          <div className="text-center space-y-4 relative z-10">
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
              Store Profile Empty
            </h2>
            <p className="text-sm text-slate-500 max-w-sm mx-auto font-medium leading-relaxed">
              We couldn't retrieve any data for this business hub. The profile
              might be inactive or undergoing synchronization.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md pt-4">
            <button
              onClick={() => navigate(-1)}
              className="flex-1 px-8 py-4 btn-primary hover:btn-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all shadow-xl active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" /> Return Back
            </button>
            <button
              onClick={() => navigate("/map")}
              className="flex-1 px-8 py-4 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all border border-blue-100 shadow-sm active:scale-95"
            >
              Explore Map
            </button>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
            <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
            <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
          </div>
        </div>
      </div>
    );
  }

  const shopBanner = `${API_BASE_URL}${shopInfo.shopImage}`;
  const gallery = [
    shopInfo.image1,
    shopInfo.image2,
    shopInfo.image3,
    shopInfo.image4,
  ]
    .filter(Boolean)
    .map((img) => `${API_BASE_URL}${img}`);

  const ImageDialog = ({ image, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-4xl w-full h-auto overflow-hidden rounded-3xl bg-black shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image}
          alt="Full view"
          className="w-full h-auto max-h-[85vh] object-contain"
        />
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all border border-white/10"
        >
          <X className="w-6 h-6" />
        </button>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="max-w-6xl mx-auto w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-20 px-4">
      <AnimatePresence>
        {selectedImage && (
          <ImageDialog
            image={selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </AnimatePresence>

      {/* ── REFINED HEADER ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <button
            onClick={() => navigate(-1)}
            className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-blue-300 hover:bg-blue-50 transition-all group active:scale-90"
          >
            <ArrowLeft className="w-5 h-5 text-slate-800 group-hover:text-blue-600" />
          </button>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
              {shopInfo.shopName}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                Verified Premium Business
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all border ${
              isSaved
                ? "bg-amber-500 border-amber-500 text-white shadow-lg"
                : "bg-white border-slate-200 text-slate-400 hover:text-amber-500 hover:border-amber-200"
            }`}
            onClick={() => setIsSaved(!isSaved)}
          >
            <Bookmark
              className="w-5 h-5"
              fill={isSaved ? "currentColor" : "none"}
            />
          </button>
          <button className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm active:scale-95">
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ── PREMIUM HERO SECTION ── */}
      <section className="relative group overflow-hidden bg-slate-900 rounded-[2.5rem] shadow-2xl aspect-[21/9] md:aspect-[24/8]">
        <img
          src={shopBanner}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 cursor-pointer"
          alt={shopInfo.shopName}
          onClick={() => setSelectedImage(shopBanner)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

        <div className="absolute bottom-10 left-10 right-10 z-10 flex items-end justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white/90 text-sm font-medium">
              <MapPin className="w-4 h-4 text-rose-500 shadow-glow shadow-rose-500/50" />
              {shopInfo.address.split(",").slice(0, 3).join(", ")}
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-none drop-shadow-2xl">
              {shopInfo.shopName}
            </h2>
          </div>
          <button
            onClick={() => setSelectedImage(shopBanner)}
            className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl border border-white/20 text-white transition-all hidden md:block"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* ── REFINED GALLERY ROW ── */}
      {gallery.length > 0 && (
        <section className="px-2">
          <div className="bg-white p-4 rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden">
            <Swiper
              modules={[Pagination, Autoplay, Navigation]}
              spaceBetween={16}
              slidesPerView={"auto"}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              className="w-full h-[140px] md:h-[180px]"
            >
              {gallery.map((img, i) => (
                <SwiperSlide key={i} className="!w-[200px] md:!w-[280px]">
                  <div
                    className="w-full h-full rounded-2xl overflow-hidden shadow-md border border-slate-50 group cursor-pointer relative"
                    onClick={() => setSelectedImage(img)}
                  >
                    <img
                      src={img}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      alt={`Gallery ${i}`}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                      <Maximize2 className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100" />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}

      {/* ── NAVIGATION TABS ── */}
      <nav className="sticky top-4 z-40 bg-white/80 backdrop-blur-xl py-3 px-3 rounded-2xl border border-slate-200 shadow-lg flex items-center gap-2 max-w-fit mx-auto md:mx-0">
        {[
          {
            id: "details",
            label: "Store Info",
            icon: <Info className="w-4 h-4" />,
          },
          {
            id: "videos",
            label: "Store Reel",
            icon: <Video className="w-4 h-4" />,
          },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-3 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              activeTab === tab.id
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "text-slate-500 hover:bg-slate-100"
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </nav>

      <main className="min-h-[400px]">
        <AnimatePresence mode="wait">
          {activeTab === "details" ? (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10"
            >
              <div className="lg:col-span-8 space-y-12">
                <section className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-1.5 h-8 bg-blue-600 rounded-full" />
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em]">
                      Business Story
                    </h3>
                  </div>
                  <p className="text-xl md:text-2xl font-semibold text-slate-800 leading-relaxed tracking-tight">
                    {shopInfo.description ||
                      "Welcome to our premium establishment. We are committed to providing exceptional service and quality to our community. Visit us to experience our unique offerings firsthand."}
                  </p>
                </section>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    {
                      icon: <Clock className="w-5 h-5" />,
                      label: "Operating Hours",
                      value: `${shopInfo.openTime} - ${shopInfo.closeTime}`,
                      color: "blue",
                      desc: "Daily Business Schedule",
                    },
                    {
                      icon: <Briefcase className="w-5 h-5" />,
                      label: "Business Category",
                      value: shopInfo.category,
                      color: "indigo",
                      desc: "Market Sector",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="group p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300"
                    >
                      <div
                        className={`w-12 h-12 mb-6 rounded-2xl flex items-center justify-center bg-${item.color}-50 text-${item.color}-600 group-hover:scale-110 transition-transform`}
                      >
                        {item.icon}
                      </div>
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                        {item.label}
                      </h4>
                      <p className="text-lg font-bold text-slate-900 leading-tight">
                        {item.value}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-2 font-medium">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>

                <section className="p-10 bg-slate-900 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/20 transition-all duration-700" />
                  <div className="relative z-10 space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/10 rounded-2xl border border-white/10 shadow-xl">
                        <MapPin className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-blue-400">
                          Location Details
                        </h3>
                        <p className="text-[10px] text-white/40 uppercase font-medium">
                          Verified Physical Address
                        </p>
                      </div>
                    </div>
                    <p className="text-xl font-bold leading-relaxed opacity-95 max-w-xl">
                      {shopInfo.address}
                    </p>
                    <div className="pt-6 border-t border-white/10 flex flex-wrap gap-6">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">
                          Directions Ready
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">
                          Mapman Integrated
                        </span>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              <aside className="lg:col-span-4">
                <div className="sticky top-24 space-y-6">
                  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-2xl space-y-8">
                    <div className="text-center pb-6 border-b border-slate-50">
                      <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Phone className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-1">
                        Get in Touch
                      </h3>
                      <p className="text-[10px] text-slate-400 font-medium uppercase tracking-[0.1em]">
                        Responds quickly to inquiries
                      </p>
                    </div>

                    <div className="space-y-4">
                      {[
                        {
                          title: "WhatsApp",
                          img: "https://cdn-icons-png.flaticon.com/128/5968/5968841.png",
                          action: `https://wa.me/${shopInfo.whatsappNumber}`,
                          color: "emerald",
                          label: "Instant Message",
                        },
                        {
                          title: "Call Store",
                          img: "https://cdn-icons-png.flaticon.com/128/9840/9840108.png",
                          action: `tel:${shopInfo.shopNumber}`,
                          color: "blue",
                          label: "Direct Support",
                        },
                        {
                          title: "Get Directions",
                          img: "https://cdn-icons-png.flaticon.com/128/1865/1865269.png",
                          action: `https://www.google.com/maps/dir/?api=1&destination=${shopInfo.lat},${shopInfo.long}`,
                          color: "rose",
                          label: "Navigation Info",
                        },
                      ].map((link, i) => (
                        <a
                          key={i}
                          href={link.action}
                          target="_blank"
                          rel="noreferrer"
                          className={`flex items-center justify-between p-5 rounded-[2rem] border transition-all group/link active:scale-[0.98] shadow-sm hover:shadow-md
                            ${
                              link.color === "emerald"
                                ? "bg-emerald-50/30 border-emerald-100 lg:hover:bg-emerald-50 lg:hover:border-emerald-200"
                                : ""
                            }
                            ${
                              link.color === "blue"
                                ? "bg-blue-50/30 border-blue-100 lg:hover:bg-blue-50 lg:hover:border-blue-200"
                                : ""
                            }
                            ${
                              link.color === "rose"
                                ? "bg-rose-50/30 border-rose-100 lg:hover:bg-rose-50 lg:hover:border-rose-200"
                                : ""
                            }
                          `}
                        >
                          <div className="flex items-center gap-5">
                            <div
                              className={`w-14 h-14 bg-white rounded-2xl flex items-center justify-center border transition-all group-hover/link:scale-110
                                ${
                                  link.color === "emerald"
                                    ? "border-emerald-100 shadow-emerald-100/50"
                                    : ""
                                }
                                ${
                                  link.color === "blue"
                                    ? "border-blue-100 shadow-blue-100/50"
                                    : ""
                                }
                                ${
                                  link.color === "rose"
                                    ? "border-rose-100 shadow-rose-100/50"
                                    : ""
                                }
                              `}
                            >
                              <img
                                src={link.img}
                                className="w-8 h-8 object-contain"
                                alt={link.title}
                              />
                            </div>
                            <div>
                              <p className="text-[11px] font-bold text-slate-900 uppercase tracking-widest leading-none mb-1">
                                {link.title}
                              </p>
                              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest opacity-70">
                                {link.label}
                              </p>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-300 group-hover/link:translate-x-1 group-hover/link:text-slate-600 transition-all" />
                        </a>
                      ))}
                    </div>
                    <button
                      onClick={() => window.open(`tel:${shopInfo.shopNumber}`)}
                      className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-sm shadow-xl shadow-blue-600/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4" /> CONTACT NOW
                    </button>
                  </div>
                </div>
              </aside>
            </motion.div>
          ) : (
            <motion.div
              key="videos"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
            >
              {videos.length > 0 ? (
                videos.map((video, idx) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() =>
                      navigate(`/video-player/${video.id}`, {
                        state: { videos: videos, index: idx },
                      })
                    }
                    className="relative aspect-[9/16] rounded-3xl overflow-hidden bg-slate-900 shadow-xl group cursor-pointer"
                  >
                    <video
                      src={`${API_BASE_URL}${video.video}`}
                      className="absolute inset-0 w-full h-full object-cover filter brightness-[0.8] group-hover:brightness-100 transition-all duration-700"
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      onMouseOver={(e) => e.target.play()}
                      onMouseOut={(e) => {
                        e.target.pause();
                        e.target.currentTime = 0;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-100 group-hover:opacity-40 transition-opacity" />
                    <div className="absolute bottom-5 left-4 right-4 text-xs font-bold text-white leading-tight line-clamp-2 drop-shadow-lg">
                      {video.videoTitle}
                    </div>
                    <div className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-all">
                      <Video className="w-4 h-4 text-white" />
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full h-64 flex flex-col items-center justify-center gap-4 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                  <Video className="w-10 h-10 text-slate-300" />
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    No Store Reels Available
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <style>{`
                .shadow-glow { filter: drop-shadow(0 0 8px currentColor); }
                .swiper-slide { height: auto !important; }
                .swiper-pagination-bullet { background: #CBD5E1 !important; }
                .swiper-pagination-bullet-active { background: #2563EB !important; width: 24px !important; border-radius: 10px; }
            `}</style>
    </div>
  );
};

export default ShopDetail;
