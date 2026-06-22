import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Bookmark,
  Phone,
  ChevronRight,
  MapPin,
  ShieldCheck,
  Video,
  Maximize2,
  Clock,
  Briefcase,
  Info,
  X,
  Play,
  Navigation,
  MessageCircle,
  Star,
  Hash,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../config";
import SEO from "../components/SEO";
import { ShopDetailSkeleton } from "../components/SkeletonLoaders";




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
        headers: { "Content-Type": "application/json", usertoken: token },
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
      } catch {
        setError("Service temporarily unavailable");
      }
    } catch {
      setError("Unable to connect to the network");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ShopDetailSkeleton />;


  if (error || !shopInfo) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-8 p-10 bg-white rounded-3xl border border-slate-100 shadow-xl max-w-lg mx-auto text-center">
        <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center border border-slate-100">
          <img src="https://cdn-icons-png.flaticon.com/128/869/869432.png" alt="empty" className="w-10 h-10" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase mb-2">Store Not Found</h2>
          <p className="text-sm text-slate-500 leading-relaxed">We couldn't retrieve data for this business. It may be inactive or under synchronization.</p>
        </div>
        <div className="flex gap-3 w-full">
          <button onClick={() => navigate("/map")} className="flex-1 py-3.5 bg-blue-50 text-blue-600 border border-blue-100 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95">
            Explore Map
          </button>
        </div>
      </div>
    );
  }

  const shopBanner = shopInfo.shopImage;
  const gallery = [shopInfo.image1, shopInfo.image2, shopInfo.image3, shopInfo.image4].filter(Boolean);

  const contactLinks = [
    {
      title: "WhatsApp",
      sub: "Instant Message",
      img: "https://cdn-icons-png.flaticon.com/128/5968/5968841.png",
      href: `https://wa.me/${shopInfo.whatsappNumber}`,
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      text: "text-emerald-700",
    },
    {
      title: "Call Store",
      sub: "Direct Support",
      img: "https://cdn-icons-png.flaticon.com/128/9840/9840108.png",
      href: `tel:${shopInfo.shopNumber}`,
      bg: "bg-blue-50",
      border: "border-blue-100",
      text: "text-blue-700",
    },
    {
      title: "Directions",
      sub: "Open in Maps",
      img: "https://cdn-icons-png.flaticon.com/128/1865/1865269.png",
      href: `https://www.google.com/maps/dir/?api=1&destination=${shopInfo.lat},${shopInfo.long}`,
      bg: "bg-rose-50",
      border: "border-rose-100",
      text: "text-rose-700",
    },
  ];

  const shopSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": shopInfo.shopName,
    "image": shopInfo.shopImage,
    "url": window.location.href,
    "telephone": shopInfo.shopNumber,
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": shopInfo.address,
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": parseFloat(shopInfo.lat) || 0.0,
      "longitude": parseFloat(shopInfo.long) || 0.0
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-6xl mx-auto w-full pb-20 px-2 md:px-4 space-y-5 md:space-y-7"
    >
      <SEO
        title={`${shopInfo.shopName} | ${shopInfo.category}`}
        description={`Get address, location, telephone number, verified photos, video reel tour, and google directions for ${shopInfo.shopName} in ${shopInfo.address?.split(',').slice(0, 2).join(', ')}.`}
        canonical={window.location.href}
        schema={shopSchema}
      />
      {/* Image Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full overflow-hidden rounded-3xl bg-black shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedImage} alt="Full view" className="w-full h-auto max-h-[85vh] object-contain" />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-5 right-5 p-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white border border-white/10 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── SAVE ROW ── */}
      <div className="flex items-center justify-end pt-1">

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Verified</span>
          </div>
          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all border ${isSaved ? "bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-500/25" : "bg-white border-slate-200 text-slate-400 hover:text-amber-500 hover:border-amber-200"}`}
          >
            <Bookmark className="w-4 h-4" fill={isSaved ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      {/* ── HERO BANNER ── */}
      <section className="relative rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl bg-slate-900 h-[180px] sm:h-[220px] md:h-[280px] w-full group cursor-pointer" onClick={() => setSelectedImage(shopBanner)}>
        <img
          src={shopBanner}
          className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
          alt={shopInfo.shopName}
        />
        {/* Layered gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/50 via-transparent to-transparent" />

        {/* Category chip – top left */}
        <div className="absolute top-4 left-4 md:top-6 md:left-6">
          <span className="px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[9px] font-black text-white uppercase tracking-widest">
            {shopInfo.category}
          </span>
        </div>

        {/* Expand icon – top right */}
        <button
          onClick={(e) => { e.stopPropagation(); setSelectedImage(shopBanner); }}
          className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-white/10 hover:bg-white/25 backdrop-blur-md rounded-xl border border-white/20 text-white transition-all opacity-0 group-hover:opacity-100"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Bottom info */}
        <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 z-10">
          <div className="flex items-center gap-1.5 text-white/70 text-[10px] font-medium mb-2 md:mb-3">
            <MapPin className="w-3 h-3 text-rose-400 flex-shrink-0" />
            <span className="line-clamp-1">{shopInfo.address?.split(",").slice(0, 3).join(", ")}</span>
          </div>
          <h1 className="text-2xl md:text-5xl font-black text-white tracking-tight leading-none drop-shadow-2xl">
            {shopInfo.shopName}
          </h1>
        </div>
      </section>

      {/* ── QUICK STATS ROW ── */}
      <div className="grid grid-cols-3 gap-2 md:gap-4">
        {[
          { icon: <Clock className="w-4 h-4" />, label: "Hours", value: `${shopInfo.openTime} – ${shopInfo.closeTime}`, color: "blue" },
          { icon: <Briefcase className="w-4 h-4" />, label: "Category", value: shopInfo.category, color: "indigo" },
          { icon: <Video className="w-4 h-4" />, label: "Reels", value: `${videos.length} Videos`, color: "violet" },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-slate-100 rounded-2xl p-3 md:p-5 flex flex-col gap-2 shadow-sm hover:shadow-md hover:border-blue-100 transition-all">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">{stat.icon}</div>
            <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">{stat.label}</p>
            <p className="text-[10px] md:text-sm font-black text-slate-900 leading-tight line-clamp-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* ── GALLERY STRIP ── */}
      {gallery.length > 0 && (
        <div className="bg-white border border-slate-100 rounded-2xl md:rounded-[1.5rem] p-2 md:p-3 shadow-sm overflow-hidden">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={10}
            slidesPerView="auto"
            autoplay={{ delay: 3200, disableOnInteraction: false }}
            className="!w-full"
            style={{ height: "110px" }}
          >
            {gallery.map((img, i) => (
              <SwiperSlide key={i} style={{ width: "auto" }}>
                <div
                  className="h-full w-[140px] md:w-[240px] rounded-xl overflow-hidden border border-slate-50 group cursor-pointer relative shadow-sm"
                  onClick={() => setSelectedImage(img)}
                >
                  <img src={img} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={`Gallery ${i + 1}`} />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 flex items-center justify-center transition-all">
                    <Maximize2 className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* ── TABS ── */}
      <nav className="flex items-center gap-2 bg-white border border-slate-100 rounded-2xl p-1.5 shadow-sm w-fit">
        {[
          { id: "details", label: "Store Info", icon: <Info className="w-3.5 h-3.5" /> },
          { id: "videos", label: "Store Reel", icon: <Video className="w-3.5 h-3.5" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${activeTab === tab.id
              ? "bg-slate-900 text-white shadow-lg"
              : "text-slate-500 hover:bg-slate-50"
              }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </nav>

      {/* ── TAB CONTENT ── */}
      <AnimatePresence mode="wait">
        {activeTab === "details" ? (
          <motion.div
            key="details"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-8"
          >
            {/* LEFT COLUMN */}
            <div className="lg:col-span-8 space-y-5 md:space-y-7">

              {/* Description card */}
              <div className="bg-white border border-slate-100 rounded-2xl md:rounded-[1.5rem] p-6 md:p-8 shadow-sm space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-6 bg-blue-600 rounded-full" />
                  <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Business Story</h3>
                </div>
                <p className="text-base md:text-lg font-semibold text-slate-700 leading-relaxed">
                  {shopInfo.description ||
                    "Welcome to our premium establishment. We are committed to providing exceptional service and quality. Visit us to experience our unique offerings firsthand."}
                </p>
              </div>

              {/* Location dark card */}
              <div className="relative bg-slate-900 rounded-2xl md:rounded-[1.5rem] p-6 md:p-8 text-white shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-56 h-56 bg-blue-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center border border-white/10">
                      <MapPin className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-400">Location</h3>
                      <p className="text-[8px] text-white/40 uppercase font-medium">Verified Physical Address</p>
                    </div>
                  </div>
                  <p className="text-base md:text-lg font-bold leading-relaxed opacity-90">{shopInfo.address}</p>
                  <div className="pt-4 border-t border-white/10 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-white/50">Directions Ready</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 bg-white border border-slate-100 rounded-2xl md:rounded-[1.5rem] p-5 md:p-7 shadow-xl space-y-5">
                {/* Header */}
                <div className="text-center pb-4 border-b border-slate-50">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-blue-100">
                    <Phone className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-0.5">Get in Touch</h3>
                  <p className="text-[9px] text-slate-400 font-medium uppercase tracking-widest">Responds quickly</p>
                </div>

                {/* Links */}
                <div className="space-y-2.5">
                  {contactLinks.map((link, i) => (
                    <a
                      key={i}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`flex items-center justify-between p-3.5 rounded-2xl border ${link.bg} ${link.border} group/link transition-all hover:shadow-md active:scale-[0.98]`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-slate-100 shadow-sm group-hover/link:scale-110 transition-transform">
                          <img src={link.img} className="w-6 h-6 object-contain" alt={link.title} />
                        </div>
                        <div>
                          <p className={`text-[10px] font-black uppercase tracking-widest leading-none mb-0.5 ${link.text}`}>{link.title}</p>
                          <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">{link.sub}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover/link:translate-x-1 group-hover/link:text-slate-600 transition-all" />
                    </a>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={() => window.open(`tel:${shopInfo.shopNumber}`)}
                  className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" /> Contact Now
                </button>
              </div>
            </aside>
          </motion.div>
        ) : (
          <motion.div
            key="videos"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            {videos.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                {videos.map((video, idx) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.04 }}
                    onClick={() => navigate(`/video-player/${video.id}`, { state: { videos, index: idx } })}
                    className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-900 shadow-lg group cursor-pointer"
                  >
                    <video
                      src={video.video ? (video.video.startsWith('http') ? video.video : `${API_BASE_URL}${video.video}`) : ""}
                      className="absolute inset-0 w-full h-full object-cover filter brightness-[0.8] group-hover:brightness-100 transition-all duration-700"
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-100 group-hover:opacity-50 transition-opacity" />
                    {/* Play icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                        <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 text-[10px] font-bold text-white leading-tight line-clamp-2 drop-shadow-lg">
                      {video.videoTitle}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center gap-4 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                <Video className="w-10 h-10 text-slate-300" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">No Store Reels Available</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .swiper-pagination-bullet { background: #CBD5E1 !important; }
        .swiper-pagination-bullet-active { background: #2563EB !important; width: 20px !important; border-radius: 10px; }
      `}</style>
    </motion.div>
  );
};

export default ShopDetail;
