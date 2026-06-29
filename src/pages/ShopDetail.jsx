import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  Bookmark, Phone, MapPin, ShieldCheck, Video, Maximize2,
  Clock, X, Play, Navigation, MessageCircle, Star,
  Globe, Hash, CheckCircle2, CalendarCheck, ChevronRight, Eye, AlertCircle
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../config";
import SEO from "../components/SEO";
import { ShopDetailSkeleton } from "../components/SkeletonLoaders";

const ShopDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [shopInfo, setShopInfo] = useState(null);
  const [videos, setVideos] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [mainVideo, setMainVideo] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const videoRef = useRef(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  useEffect(() => { fetchShopData(); }, [id]);

  const fetchShopData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/shop/getShopById`, {
        method: "POST",
        headers: { "Content-Type": "application/json", usertoken: token },
        body: JSON.stringify({ shopId: parseInt(id) }),
      });
      const result = JSON.parse(await res.text());
      if (result.status === 200) {
        setShopInfo(result.data.shop);
        const vids = result.data.shopVideos || [];
        setVideos(vids);
        if (vids.length > 0) setMainVideo(vids[0]);
        setIsSaved(result.data.shopSavedAlready);
      } else setError(result.message || "Unavailable");
    } catch { setError("Network error"); }
    finally { setLoading(false); }
  };

  if (loading) return <ShopDetailSkeleton />;
  if (error || !shopInfo) return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 text-center p-8">
      <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center">
        <ShieldCheck className="w-8 h-8 text-slate-300" />
      </div>
      <h2 className="text-xl font-black text-slate-800">Store Not Found</h2>
      <p className="text-sm text-slate-500 max-w-xs">This business may be inactive or under review.</p>
      <button onClick={() => navigate("/map")} className="px-6 py-2.5 bg-green-600 text-white rounded-xl font-bold text-sm">Explore Map</button>
    </div>
  );

  const gallery = [shopInfo.image1, shopInfo.image2, shopInfo.image3, shopInfo.image4].filter(Boolean);
  const videoSrc = (v) => v?.video ? (v.video.startsWith("http") ? v.video : `${API_BASE_URL}${v.video}`) : "";

  return (
    <div className="w-full mx-auto pb-24">
      <SEO title={`${shopInfo.shopName} | ${shopInfo.category}`} description={shopInfo.address} canonical={window.location.href} />

      {/* Lightbox */}
      {selectedImage && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4" onClick={() => setSelectedImage(null)}>
          <button className="absolute top-5 right-5 p-2 bg-white/10 hover:bg-white/20 transition-all rounded-full text-white" onClick={() => setSelectedImage(null)}>
            <X className="w-5 h-5" />
          </button>
          <img src={selectedImage} className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl" alt="preview" onClick={(e) => e.stopPropagation()} />
        </div>,
        document.body
      )}

      {/* ── HERO BANNER ── */}
      <div className="relative w-full h-[200px] sm:h-[260px] rounded-none md:rounded-b-none overflow-hidden bg-slate-800 cursor-pointer group" onClick={() => setSelectedImage(shopInfo.shopImage)}>
        {shopInfo.shopImage
          ? <img src={shopInfo.shopImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]" alt={shopInfo.shopName} />
          : <div className="w-full h-full bg-gradient-to-br from-green-900 to-slate-900" />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* ── SHOP IDENTITY CARD ── */}
        <div className="bg-white border-b border-slate-100 px-4 md:px-6 pt-4 pb-5 mt-4 rounded-t-2xl shadow-sm">
        <div className="flex items-start gap-4">
          {/* Logo */}
          <div className="w-20 h-20 rounded-2xl border-4 border-white shadow-lg bg-amber-50 flex items-center justify-center overflow-hidden shrink-0 -mt-10 relative z-10">
            {shopInfo.shopImage
              ? <img src={shopInfo.shopImage} className="w-full h-full object-cover" alt="logo" />
              : <span className="text-3xl font-black text-amber-600">{shopInfo.shopName?.[0]}</span>}
          </div>
          <div className="flex-1 pt-1 min-w-0">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl font-black text-slate-900 leading-tight">{shopInfo.shopName}</h1>
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                </div>
                <p className="text-sm text-green-600 font-semibold flex items-center gap-1.5 mt-0.5">
                  <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />{shopInfo.category}
                </p>
                {/* <div className="flex items-center gap-1 mt-1">
                  {[1,2,3,4].map(s => <Star key={s} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />)}
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-200" />
                  <span className="text-xs text-slate-400 ml-1">(0 Reviews)</span>
                </div> */}
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 bg-green-50 border border-green-200 text-green-700 text-xs font-bold rounded-lg">Active</span>
                <button onClick={() => setIsSaved(!isSaved)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${isSaved ? "bg-amber-50 border-amber-200 text-amber-600" : "bg-white border-slate-200 text-slate-600"}`}>
                  <Bookmark className="w-3.5 h-3.5" fill={isSaved ? "currentColor" : "none"} /> Save
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Info strip */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
          {shopInfo.address && <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />{shopInfo.address}</span>}
          {shopInfo.openTime && <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-slate-400" />{shopInfo.openTime} – {shopInfo.closeTime} <span className="text-green-600 font-bold">Open Today</span></span>}
          {shopInfo.shopNumber && <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-slate-400" />{shopInfo.shopNumber} <span className="text-slate-400">Shop Number</span></span>}
          {shopInfo.websiteLink && <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-slate-400" />{shopInfo.websiteLink} <span className="text-slate-400">Website</span></span>}
        </div>

        {/* Action buttons */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <a href={`tel:${shopInfo.shopNumber}`} className="flex items-center justify-center gap-2 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-xs transition-all">
            <Phone className="w-3.5 h-3.5" /> Call Now
          </a>
          <a href={`https://wa.me/${shopInfo.whatsappNumber}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 py-2.5 bg-white border border-slate-200 hover:border-green-300 text-slate-700 rounded-xl font-bold text-xs transition-all">
            <MessageCircle className="w-3.5 h-3.5 text-green-500" /> WhatsApp
          </a>
          <a href={`https://www.google.com/maps/dir/?api=1&destination=${shopInfo.lat},${shopInfo.long}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 py-2.5 bg-white border border-slate-200 hover:border-blue-300 text-slate-700 rounded-xl font-bold text-xs transition-all">
            <Navigation className="w-3.5 h-3.5 text-blue-500" /> Get Directions
          </a>
          <a href={shopInfo.websiteLink ? (shopInfo.websiteLink.startsWith("http") ? shopInfo.websiteLink : `https://${shopInfo.websiteLink}`) : "#"} target="_blank" rel="noreferrer" onClick={(e) => { if (!shopInfo.websiteLink) { e.preventDefault(); showToast("Website not found"); } }} className="flex items-center justify-center gap-2 py-2.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 rounded-xl font-bold text-xs transition-all shadow-sm hover:shadow-md">
            <Globe className="w-3.5 h-3.5 text-slate-400" /> Visit Website
          </a>
        </div>
      </div>

      {/* ── SECTION 1: About | Highlights | Images ── */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 px-0 md:px-0">
        {/* About */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
          <h3 className="text-sm font-black text-slate-900 mb-3">About {shopInfo.shopName}</h3>
          <p className="text-xs text-slate-600 leading-relaxed mb-4">
            {shopInfo.description || `${shopInfo.shopName} is your one-stop destination for premium quality products. We are committed to providing healthy and natural products at affordable prices.`}
          </p>
          <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
            {[
              { label: "Category", value: shopInfo.category, color: "text-green-600" },
              { label: "Status", value: "Active", color: "text-green-600" },
              { label: "Joined On", value: shopInfo.joinedDate || "–", color: "text-slate-700" },
              { label: "Last Updated", value: shopInfo.updatedDate || "–", color: "text-slate-700" },
            ].map((row, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5">
                  {i === 0 && <Hash className="w-3 h-3" />}
                  {i === 1 && <CheckCircle2 className="w-3 h-3" />}
                  {i === 2 && <CalendarCheck className="w-3 h-3" />}
                  {i === 3 && <Clock className="w-3 h-3" />}
                  {row.label}
                </span>
                <span className={`font-bold ${row.color}`}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Business Highlights */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
          <h3 className="text-sm font-black text-slate-900 mb-4">Business Highlights</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Videos", value: videos.length, icon: "https://cdn-icons-png.flaticon.com/128/3074/3074767.png", bg: "bg-green-50 border-green-100", num: "text-green-700" },
              { label: "Photos", value: gallery.length, icon: "https://cdn-icons-png.flaticon.com/128/2659/2659360.png", bg: "bg-blue-50 border-blue-100", num: "text-blue-700" },
              { label: "Category", value: "1", icon: "https://cdn-icons-png.flaticon.com/128/7183/7183999.png", bg: "bg-amber-50 border-amber-100", num: "text-amber-700" },
              { label: "Status", value: "Active", icon: "https://cdn-icons-png.flaticon.com/128/4315/4315445.png", bg: "bg-emerald-50 border-emerald-100", num: "text-emerald-700" },
            ].map((item, i) => (
              <div key={i} className={`${item.bg} border rounded-xl p-3 flex flex-col gap-1`}>
                <img src={item.icon} alt="icons" height={25} width={25} className="mb-3" />
                <span className={`text-2xl font-black ${item.num}`}>{item.value}</span>
                <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wide">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Shop Images */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
          <h3 className="text-sm font-black text-slate-900 mb-3">Shop Images</h3>
          {gallery.length > 0 ? (
            <>
              <div className="grid grid-cols-2 gap-2">
                {gallery.slice(0, 4).map((img, i) => (
                  <div key={i} className="aspect-video rounded-lg overflow-hidden cursor-pointer group relative" onClick={() => setSelectedImage(img)}>
                    <img src={img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={`img ${i + 1}`} />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                      <Maximize2 className="w-4 h-4 text-white opacity-0 group-hover:opacity-100" />
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="h-32 flex items-center justify-center bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
              <p className="text-xs text-slate-400 font-bold">No Images Available</p>
            </div>
          )}
        </div>
      </div>

      {/* ── FEATURED VIDEOS ROW ── */}
      {videos.length > 0 && (
        <div className="mt-4 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-black text-slate-900">Featured Videos</h3>
            <button className="text-xs text-blue-600 font-bold flex items-center gap-1">View All Videos <ChevronRight className="w-3 h-3" /></button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
            {videos.map((v, idx) => (
              <div key={v.id} className="shrink-0 w-56 cursor-pointer group" onClick={() => setMainVideo(v)}>
                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900">
                  <video src={videoSrc(v)} className="w-full h-full object-cover brightness-75 group-hover:brightness-100 transition-all" muted playsInline preload="none" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow group-hover:scale-110 transition-transform">
                      <Play className="w-3.5 h-3.5 text-slate-900 fill-slate-900 ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-1.5 right-1.5 bg-black/70 text-white text-[9px] px-1 py-0.5 rounded">0:30</span>
                </div>
                <p className="text-[10px] font-bold text-slate-800 mt-1.5 line-clamp-1">{v.videoTitle}</p>
                <p className="text-[9px] text-green-600 font-semibold">{shopInfo.category}</p>
                <p className="text-[9px] text-slate-400 flex items-center gap-0.5 mt-0.5"><Eye className="w-2.5 h-2.5" /> 0</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── MAP | VIDEO PLAYER | MORE VIDEOS ── */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Map */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
          <h3 className="text-sm font-black text-slate-900 mb-3">Shop Location</h3>
          <div className="rounded-xl overflow-hidden border border-slate-100 mb-3" style={{ height: 160 }}>
            {shopInfo.lat && shopInfo.long
              ? <iframe title="map" width="100%" height="100%" style={{ border: 0 }} loading="lazy" src={`https://maps.google.com/maps?q=${shopInfo.lat},${shopInfo.long}&z=15&output=embed`} />
              : <div className="w-full h-full bg-slate-100 flex items-center justify-center"><MapPin className="w-8 h-8 text-slate-300" /></div>}
          </div>
          <p className="text-xs text-slate-500 leading-relaxed mb-3">{shopInfo.address}</p>
          <a href={`https://www.google.com/maps/dir/?api=1&destination=${shopInfo.lat},${shopInfo.long}`} target="_blank" rel="noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2 bg-green-50 border border-green-200 text-green-700 rounded-xl font-bold text-xs hover:bg-green-100 transition-all">
            <Navigation className="w-3.5 h-3.5" /> Get Directions ↗
          </a>
        </div>

        {/* Main Video Player */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
          {mainVideo ? (
            <>
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 cursor-pointer group" onClick={() => navigate(`/video-player/${mainVideo.id}`, { state: { videos } })}>
                <video ref={videoRef} src={videoSrc(mainVideo)} className="w-full h-full object-contain" controls playsInline preload="none" />
              </div>
              <div className="mt-3">
                <p className="text-sm font-bold text-slate-800">{mainVideo.videoTitle}</p>
                <span className="inline-block mt-1 px-2 py-0.5 bg-green-50 text-green-600 text-[9px] font-black uppercase rounded">{shopInfo.category}</span>
                <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1"><Eye className="w-3 h-3" /> 0 Views</p>
              </div>
            </>
          ) : (
            <div className="aspect-video rounded-xl bg-slate-100 flex flex-col items-center justify-center gap-2">
              <Video className="w-10 h-10 text-slate-300" />
              <p className="text-xs text-slate-400 font-bold">No Videos</p>
            </div>
          )}
        </div>

        {/* More Videos */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
          <h3 className="text-sm font-black text-slate-900 mb-3">More Videos</h3>
          {videos.length > 0 ? (
            <div className="space-y-3">
              {videos.slice(0, 4).map((v, idx) => (
                <div key={v.id} className="flex items-center gap-3 cursor-pointer group" onClick={() => setMainVideo(v)}>
                  <div className="relative w-20 h-13 rounded-lg overflow-hidden bg-slate-900 shrink-0">
                    <video src={videoSrc(v)} className="w-full h-full object-cover" muted preload="none" style={{ height: 52 }} />
                    <div className="absolute inset-0 flex items-center justify-center"><Play className="w-3.5 h-3.5 text-white fill-white" /></div>
                    <span className="absolute bottom-0.5 right-0.5 bg-black/70 text-white text-[8px] px-1 rounded">{idx === 0 ? "0:31" : idx === 1 ? "0:27" : "0:28"}</span>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">{v.videoTitle}</p>
                    <p className="text-[9px] text-slate-400 mt-0.5">{v.viewCount || 0} Views</p>
                  </div>
                </div>
              ))}
              {videos.length > 4 && (
                <button className="w-full py-2 mt-1 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50">View All Videos</button>
              )}
            </div>
          ) : (
            <div className="h-32 flex items-center justify-center"><p className="text-xs text-slate-400">No videos yet</p></div>
          )}
        </div>
      </div>

      {/* ── CONTACT + WHY CHOOSE US ── */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Contact Cards */}
        <div className="md:col-span-2 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
          <h3 className="text-sm font-black text-slate-900 mb-4">Contact {shopInfo.shopName}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Call Shop", sub: shopInfo.shopNumber, icon: "https://cdn-icons-png.flaticon.com/128/724/724664.png", href: `tel:${shopInfo.shopNumber}`, btn: "Call Now", bg: "bg-blue-50", btnCls: "bg-slate-900 text-white shadow hover:shadow-lg" },
              { label: "WhatsApp", sub: shopInfo.whatsappNumber, icon: "https://cdn-icons-png.flaticon.com/128/3670/3670051.png", href: `https://wa.me/${shopInfo.whatsappNumber}`, btn: "Chat Now", bg: "bg-green-50", btnCls: "bg-green-600 text-white shadow hover:shadow-lg" },
              { label: "Website", sub: shopInfo.websiteLink || "—", icon: "https://cdn-icons-png.flaticon.com/128/10453/10453141.png", href: shopInfo.websiteLink ? (shopInfo.websiteLink.startsWith("http") ? shopInfo.websiteLink : `https://${shopInfo.websiteLink}`) : "#", btn: "Visit Website", bg: "bg-blue-50", btnCls: "bg-blue-600 text-white shadow hover:shadow-lg", onClick: (e) => { if (!shopInfo.websiteLink) { e.preventDefault(); showToast("Website not found"); } } },
              { label: "Shop Number", sub: shopInfo.shopNumber, icon: "https://cdn-icons-png.flaticon.com/128/16103/16103201.png", href: `tel:${shopInfo.shopNumber}`, btn: "Call Now", bg: "bg-purple-50", btnCls: "bg-slate-900 text-white shadow hover:shadow-lg" },
            ].map((c, i) => (
              <div key={i} className={`${c.bg} rounded-xl p-3 flex flex-col items-center gap-2 text-center shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100/50 hover:-translate-y-1`}>
                <img src={c.icon} alt="contacts" width={25} height={25} className="mb-3 drop-shadow-sm" />
                <p className="text-[10px] font-black text-slate-700">{c.label}</p>
                <p className="text-[9px] text-slate-400 line-clamp-1">{c.sub || "—"}</p>
                <a href={c.href} target="_blank" rel="noreferrer" onClick={c.onClick} className={`w-full py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wide transition-all ${c.btnCls}`}>{c.btn}</a>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Mapman */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
          <h3 className="text-sm font-black text-slate-900 mb-3">Why Mapman?</h3>
          <ul className="space-y-2.5">
            {[
              "Verified Local Businesses",
              "Interactive Video Previews",
              "Accurate Location & Directions",
              "Direct WhatsApp & Call Booking"
            ].map((p, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> {p}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── TRUST BAR ── */}
      <div className="mt-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-2xl shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-3 divide-x divide-green-100">
          {[
            { icon: <ShieldCheck className="w-4 h-4" />, label: "Verified Business" },
            { icon: <CheckCircle2 className="w-4 h-4" />, label: "Active Status" },
            { icon: <Clock className="w-4 h-4" />, label: "Open Today" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-center gap-2 py-3 text-green-700 hover:bg-green-100/50 transition-colors first:rounded-l-2xl last:rounded-r-2xl">
              {item.icon}
              <span className="text-xs font-bold">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      </div>
      
      {/* ── TOAST MESSAGE ── */}
      {toastMessage && createPortal(
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[99999] bg-slate-900 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-slate-700">
          <AlertCircle className="w-4 h-4 text-rose-500" />
          <p className="text-xs font-black uppercase tracking-widest">{toastMessage}</p>
        </div>,
        document.body
      )}
    </div>
  );
};

export default ShopDetail;
