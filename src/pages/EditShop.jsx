import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  Trash2,
  ChevronDown,
  Clock,
  Camera,
  Store,
  MapPin,
  MessageCircle,
  Phone,
  FileText,
  Save,
  ShieldCheck,
  ImagePlus,
  Loader2,
  Sparkles,
  CheckCircle2,
  ArrowUpRight,
  Globe,
  Eye,
  Plus,
  Search,
  Navigation,
  X,
  Check,
  LocateFixed,
  Grid,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { fetchShop, registerShop } from "../api/shop";

const API_BASE_URL = "https://mapman-production.up.railway.app";

/* ─── Reusable Components ─── */
const InputField = ({
  label,
  value,
  icon: Icon,
  onChange,
  placeholder,
  type = "text",
  readOnly = false,
  onClick,
}) => (
  <div className="group space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
      {Icon && <Icon className="w-3 h-3 text-blue-500" />}
      {label}
    </label>
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-sm transition-all duration-300 group-focus-within:border-blue-500 group-focus-within:ring-4 group-focus-within:ring-blue-500/5 group-hover:border-slate-200 group-hover:shadow-md ${onClick ? "cursor-pointer" : ""}`}
    >
      <input
        type={type}
        value={value}
        readOnly={readOnly}
        placeholder={placeholder}
        onChange={(e) => !readOnly && onChange?.(e.target.value)}
        className={`w-full px-5 py-4 text-sm font-bold text-slate-800 bg-transparent outline-none placeholder:text-slate-200 ${onClick ? "cursor-pointer" : ""}`}
      />
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-blue-600 transition-all duration-500 group-focus-within:w-full" />
    </div>
  </div>
);

const TextAreaField = ({ label, value, icon: Icon, onChange, placeholder }) => (
  <div className="group space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
      {Icon && <Icon className="w-3 h-3 text-blue-500" />}
      {label}
    </label>
    <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-sm transition-all duration-300 group-focus-within:border-blue-500 group-focus-within:ring-4 group-focus-within:ring-blue-500/5 group-hover:border-slate-200 group-hover:shadow-md">
      <textarea
        rows={4}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full px-5 py-4 text-sm font-bold text-slate-800 bg-transparent outline-none resize-none placeholder:text-slate-200 leading-relaxed"
      />
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-blue-600 transition-all duration-500 group-focus-within:w-full" />
    </div>
  </div>
);

const EditShop = () => {
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showDeleteShopModal, setShowDeleteShopModal] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [catLoading, setCatLoading] = useState(false);
  const [shopId, setShopId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [viewState, setViewState] = useState("loading"); // loading, empty, register, edit
  const [showMapPicker, setShowMapPicker] = useState(false);
  const [mapSearch, setMapSearch] = useState("");
  const [geocoding, setGeocoding] = useState(false);

  const [shopData, setShopData] = useState({
    name: "",
    category: "",
    location: "",
    lat: "11.02",
    long: "77.00",
    description: "",
    whatsapp: "",
    contact: "",
    registerNumber: "",
    openTime: "",
    closeTime: "",
    website: "",
    shopImage: null, // File object for upload
    shopImageUrl: null, // For preview
    gallery: [null, null, null, null], // File objects for image1-image4
    galleryUrls: [null, null, null, null], // Previews
  });

  useEffect(() => {
    loadShop();
  }, []);

  const loadShop = async () => {
    try {
      setLoading(true);
      const res = await fetchShop();
      if (res.status === 200 && res.data) {
        const d = res.data;
        setShopId(d.id);
        const currentShopImage = d.shopImage
          ? `${API_BASE_URL}${d.shopImage}`
          : null;

        // Map gallery images if they exist
        const currentGallery = [
          d.image1 ? `${API_BASE_URL}${d.image1}` : null,
          d.image2 ? `${API_BASE_URL}${d.image2}` : null,
          d.image3 ? `${API_BASE_URL}${d.image3}` : null,
          d.image4 ? `${API_BASE_URL}${d.image4}` : null,
        ];

        setShopData({
          name: d.shopName || "",
          category: d.category || "",
          location: d.address || "",
          lat: d.lat || "",
          long: d.long || "",
          description: d.description || "",
          whatsapp: d.whatsappNumber || "",
          contact: d.shopNumber || "",
          registerNumber: d.registerNumber || "",
          openTime: d.openTime || "",
          closeTime: d.closeTime || "",
          website: d.website || "",
          shopImage: null, // Reset to null so we don't try to upload a string
          shopImageUrl: currentShopImage,
          gallery: [null, null, null, null],
          galleryUrls: currentGallery,
        });
        setMapSearch(d.address || "");
        setViewState("edit");
      } else {
        setViewState("empty");
      }
    } catch (error) {
      console.error("Error loading shop:", error);
      setViewState("empty");
    } finally {
      setLoading(false);
    }
  };

  // --- REVERSE GEOCODING ---
  const fetchAddress = async (lt, lg) => {
    try {
      setGeocoding(true);
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lt}&lon=${lg}`,
      );
      const data = await res.json();
      if (data && data.display_name) {
        setMapSearch(data.display_name);
        setShopData((prev) => ({
          ...prev,
          location: data.display_name,
          lat: lt.toString(),
          long: lg.toString(),
        }));
      }
    } catch (err) {
      console.error("Reverse geocoding error:", err);
    } finally {
      setGeocoding(false);
    }
  };

  useEffect(() => {
    if (showMapPicker) {
      // Small delay to ensure container is ready
      const timer = setTimeout(() => {
        if (!window.L) {
          const script = document.createElement("script");
          script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
          script.onload = initMap;
          document.head.appendChild(script);

          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
          document.head.appendChild(link);
        } else {
          initMap();
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [showMapPicker]);

  const initMap = () => {
    if (!window.L || !document.getElementById("picker-map")) return;

    // Check if map already exists
    if (window._pickerMap) window._pickerMap.remove();

    const startLat = parseFloat(shopData.lat) || 11.02;
    const startLng = parseFloat(shopData.long) || 77.0;

    const m = window.L.map("picker-map", {
      center: [startLat, startLng],
      zoom: 15,
      zoomControl: false,
    });

    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OSM",
    }).addTo(m);

    window._pickerMap = m;

    // Handle center change (dragging)
    m.on("moveend", () => {
      const center = m.getCenter();
      fetchAddress(center.lat, center.lng);
    });

    // Initial address fetch or locate
    if (!shopData.lat || shopData.lat === "11.02") {
      handleManualLocate();
    } else {
      fetchAddress(startLat, startLng);
    }
  };

  const handleDeleteShop = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${API_BASE_URL}/shop/deleteShop?shopId=${shopId}`,
        {
          method: "GET",
          headers: { usertoken: token },
        },
      );
      const result = await res.json();
      if (result.status === 200) {
        navigate("/map-explore");
      }
    } catch (error) {
      console.error("Delete shop error:", error);
    }
  };

  const handleDeleteImage = async (imageKey, idx) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/shop/deleteShopImage`, {
        method: "POST",
        headers: {
          usertoken: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ shopId, input: imageKey }),
      });
      const result = await res.json();
      if (result.status === 200) {
        const newUrls = [...shopData.galleryUrls];
        newUrls[idx] = null;
        setShopData({ ...shopData, galleryUrls: newUrls });
      }
    } catch (error) {
      console.error("Delete image error:", error);
    }
  };

  const handleManualLocate = () => {
    if (navigator.geolocation && window._pickerMap) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          window._pickerMap.setView([latitude, longitude], 17);
          fetchAddress(latitude, longitude);
        },
        (err) => {
          console.error("Geoloc error", err);
          fetchAddress(11.02, 77.0); // Fallback
        },
      );
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE_URL}/shop/home`, {
          headers: { usertoken: token },
        });
        const result = await res.json();
        if (result.status === 200) {
          const cats = result.data.category || result.data.categories || [];
          setCategories(cats);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleCreateCategory = async () => {
    if (newCatName.trim()) {
      try {
        setCatLoading(true);
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE_URL}/shop/addNewCategory`, {
          method: "POST",
          headers: {
            usertoken: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ categoryName: newCatName }),
        });
        const result = await res.json();
        if (result.status === 200) {
          setShopData({ ...shopData, category: newCatName });
          setShowAddCategoryModal(false);
          setNewCatName("");
          // Optionally refresh categories list
          const catRes = await fetch(`${API_BASE_URL}/shop/home`, {
            headers: { usertoken: token },
          });
          const catData = await catRes.json();
          if (catData.status === 200)
            setCategories(
              catData.data.category || catData.data.categories || [],
            );
        }
      } catch (err) {
        console.error("Add category error:", err);
      } finally {
        setCatLoading(false);
      }
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const formData = new FormData();
      formData.append("shopName", shopData.name);
      formData.append("category", shopData.category);
      formData.append("lat", shopData.lat || "11.02");
      formData.append("long", shopData.long || "77.00");
      formData.append("description", shopData.description);
      formData.append("openTime", shopData.openTime);
      formData.append("closeTime", shopData.closeTime);
      formData.append("address", shopData.location);
      formData.append("registerNumber", shopData.registerNumber);
      formData.append("shopNumber", shopData.contact);
      formData.append("whatsappNumber", shopData.whatsapp);

      if (shopData.shopImage instanceof File) {
        formData.append("shopImage", shopData.shopImage);
      }

      shopData.gallery.forEach((file, index) => {
        if (file instanceof File) {
          formData.append(`image${index + 1}`, file);
        }
      });

      const res = await registerShop(formData);

      if (res.status === 200) {
        setSaved(true);
        setViewState("edit");
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      console.error("Error saving shop:", error);
      alert(error.message || "Failed to save configuration");
    } finally {
      setSaving(false);
    }
  };

  const handleImageChange = (e, type, index = null) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    if (type === "main") {
      setShopData({ ...shopData, shopImage: file, shopImageUrl: previewUrl });
    } else if (type === "gallery") {
      const newGallery = [...shopData.gallery];
      const newUrls = [...shopData.galleryUrls];
      newGallery[index] = file;
      newUrls[index] = previewUrl;
      setShopData({ ...shopData, gallery: newGallery, galleryUrls: newUrls });
    }
  };

  /* ─── Renderers ─── */
  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full shadow-lg shadow-blue-600/20"
        />
        <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] animate-pulse">
          Synchronizing Details...
        </p>
      </div>
    );
  }

  if (viewState === "empty") {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        {/* HEADER FOR EMPTY STATE */}
        <header className="h-20 lg:h-24 px-8 flex items-center justify-between border-b border-slate-200/60 bg-white sticky top-0 z-50">
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate(-1)}
              className="w-11 h-11 bg-white border border-slate-200 rounded-xl flex items-center justify-center shadow-sm hover:border-blue-300 hover:bg-blue-50 transition-all active:scale-95 group"
            >
              <ChevronLeft className="w-5 h-5 text-slate-600 group-hover:text-blue-600" />
            </button>
            <div className="space-y-0.5">
              <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase italic">
                Merchant Hub
              </h1>
              <p className="text-[9px] font-black text-blue-500/60 uppercase tracking-[0.2em]">
                Management Console
              </p>
            </div>
          </div>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-[380px] bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] p-10 text-center relative overflow-hidden group"
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full blur-[60px] -mr-16 -mt-16 transition-all group-hover:bg-blue-100/50" />

            <div className="relative z-10 space-y-8">
              {/* Central Icon */}
              <div className="mx-auto w-24 h-24 relative flex items-center justify-center">
                <div className="absolute inset-0 bg-slate-50 rounded-[2rem] rotate-6 group-hover:rotate-0 transition-transform duration-500" />
                <div className="relative w-20 h-20 bg-white rounded-[1.8rem] shadow-lg border border-slate-50 flex items-center justify-center p-4">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/869/869432.png"
                    className="w-full h-full object-contain"
                    alt="Shop Icon"
                  />
                </div>
              </div>

              {/* Text Content */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <span className="text-[9px] font-black text-blue-600 uppercase tracking-[0.4em]">
                    Onboarding Portal
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest leading-relaxed max-w-[240px] mx-auto">
                  Establish your professional digital presence across the Mapman
                  ecosystem.
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setViewState("register")}
                  className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-4 group/btn"
                >
                  <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
                    <Plus className="w-3.5 h-3.5 text-white" />
                  </div>
                  Add Shop Details
                </motion.button>
                <p className="mt-5 text-[7px] font-bold text-slate-300 uppercase tracking-widest flex items-center justify-center gap-2">
                  <ShieldCheck className="w-2.5 h-2.5 opacity-50" /> Secure
                  Merchant Access
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-32">
      {/* ─── STICKY NAVIGATION ─── */}
      <header className="sticky top-0 z-[60] bg-white/70 backdrop-blur-2xl border-b border-slate-200/60 transition-all">
        <div className="max-w-[1440px] mx-auto px-6 h-20 md:h-24 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => {
                if (viewState === "register") setViewState("empty");
                else navigate(-1);
              }}
              className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all text-slate-800"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="space-y-1">
              <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
                {viewState === "register"
                  ? "Register Shop Details"
                  : "Edit Shop Details"}
              </h1>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                <p className="text-[9px] font-black text-blue-500/60 uppercase tracking-[0.3em]">
                  Direct Merchant Gateway
                </p>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => navigate("/shop-analytics")}
              className="px-6 py-3 text-emerald-600 hover:text-emerald-700 font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center gap-2"
            >
              <Eye className="w-4 h-4" /> Analytics
            </button>
            {viewState === "edit" && (
              <button
                onClick={() => setShowDeleteShopModal(true)}
                className="w-12 h-12 bg-rose-50 border border-rose-100 rounded-2xl flex items-center justify-center text-rose-500 hover:bg-rose-100 transition-all shadow-sm active:scale-95"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* ─── LEFT COLUMN: PREVIEW & VISUALS (5 COLS) ─── */}
          <div className="lg:col-span-5 space-y-8">
            {/* BANNER UPLOAD */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                  Brand Presence
                </h3>
                <span className="text-[8px] font-bold text-slate-300 uppercase italic">
                  16:9 Aspect Ratio
                </span>
              </div>
              <div className="relative group rounded-[2.5rem] overflow-hidden bg-slate-200 border-2 border-white shadow-2xl aspect-video">
                <img
                  src={
                    shopData.shopImageUrl ||
                    shopData.shopImage ||
                    "https://images.unsplash.com/photo-1621535281470-348633c7793d?w=1200&fit=crop"
                  }
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 brightness-[0.8]"
                  alt="Brand Banner"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                <div className="absolute inset-x-8 bottom-8 flex items-end justify-between">
                  {shopData.name && (
                    <div className="space-y-1">
                      <p className="text-white text-xl font-black italic tracking-tighter uppercase">
                        {shopData.name}
                      </p>
                      <div className="flex items-center gap-2 text-white/60 text-[10px] font-bold uppercase tracking-widest">
                        <MapPin className="w-3 h-3 text-blue-400" />
                        {shopData.location.split(",")[0]}
                      </div>
                    </div>
                  )}
                  <div className="relative">
                    <input
                      type="file"
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                      onChange={(e) => handleImageChange(e, "main")}
                    />
                    <button className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20 hover:bg-white hover:text-blue-600 transition-all shadow-2xl active:scale-90 ml-auto">
                      <Camera className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* GALLERY UPLOAD */}
            <div className="space-y-4">
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">
                Shop Showcase (Max 4)
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="relative aspect-square rounded-3xl bg-white border-2 border-dashed border-slate-200 flex items-center justify-center group overflow-hidden hover:border-blue-500 hover:bg-blue-50 transition-all duration-500 cursor-pointer"
                  >
                    {shopData.galleryUrls[i] ? (
                      <>
                        <img
                          src={shopData.galleryUrls[i]}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteImage(`image${i + 1}`, i);
                          }}
                          className="absolute top-3 right-3 w-8 h-8 bg-black/40 backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white/20 hover:bg-rose-600 transition-all z-20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <div className="flex flex-col items-center gap-3 text-slate-300 group-hover:text-blue-500 transition-colors">
                        <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-white group-hover:shadow-lg transition-all">
                          <ImagePlus className="w-5 h-5" />
                        </div>
                        <span className="text-[8px] font-black uppercase tracking-[0.25em]">
                          Frame {i + 1}
                        </span>
                      </div>
                    )}
                    <input
                      type="file"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => handleImageChange(e, "gallery", i)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ─── RIGHT COLUMN: FORMS (7 COLS) ─── */}
          <div className="lg:col-span-7 space-y-10">
            {/* IDENTITY SECTION */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-2 h-8 bg-blue-600 rounded-full" />
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic">
                  Essential Identity
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Shop Nomenclature"
                  icon={Store}
                  value={shopData.name}
                  placeholder="Enter shop name"
                  onChange={(v) => setShopData({ ...shopData, name: v })}
                />

                {/* CUSTOM CATEGORY DROPDOWN */}
                <div className="space-y-3 relative">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                      Category Tag
                    </p>
                  </div>
                  <div className="relative group">
                    <button
                      onClick={() =>
                        setShowCategoryDropdown(!showCategoryDropdown)
                      }
                      className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl px-5 flex items-center justify-between group-hover:bg-slate-100 transition-all"
                    >
                      <div className="flex items-center">
                        <span
                          className={`text-[11px] font-bold uppercase tracking-tight ${shopData.category ? "text-slate-800" : "text-slate-300"}`}
                        >
                          {shopData.category || "Select Classification"}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform ${showCategoryDropdown ? "rotate-180" : ""}`}
                      />
                    </button>

                    <AnimatePresence>
                      {showCategoryDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute z-[80] top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-50 overflow-hidden"
                        >
                          <div className="max-h-60 overflow-y-auto no-scrollbar py-2">
                            {categories.map((cat, idx) => (
                              <button
                                key={idx}
                                onClick={() => {
                                  setShopData({
                                    ...shopData,
                                    category: cat.categoryName,
                                  });
                                  setShowCategoryDropdown(false);
                                }}
                                className="w-full px-6 py-4 flex items-center hover:bg-slate-50 text-left transition-all"
                              >
                                <span className="text-[10px] font-black text-slate-800 uppercase tracking-tight italic">
                                  {cat.categoryName}
                                </span>
                              </button>
                            ))}
                            <div className="px-2 pb-2 pt-1 border-t border-slate-50 mt-1">
                              <button
                                onClick={() => {
                                  setShowCategoryDropdown(false);
                                  setShowAddCategoryModal(true);
                                }}
                                className="w-full h-12 bg-blue-600 rounded-xl flex items-center justify-center gap-3 text-white shadow-lg shadow-blue-600/20 active:scale-95 transition-all"
                              >
                                <Plus className="w-4 h-4" />
                                <span className="text-[10px] font-black uppercase tracking-widest">
                                  Add Category
                                </span>
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <InputField
                label="Geo-Location Mapping"
                icon={MapPin}
                readOnly
                placeholder="Drop Your Location"
                onClick={() => setShowMapPicker(true)}
                value={shopData.location}
              />

              <TextAreaField
                label="Merchant Narrative"
                icon={FileText}
                placeholder="Enter description"
                value={shopData.description}
                onChange={(v) => setShopData({ ...shopData, description: v })}
              />
            </div>

            {/* COMMUNICATION & HOURS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* CONTACT CARD */}
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-indigo-600 rounded-full" />
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight italic">
                    Communication
                  </h3>
                </div>
                <div className="space-y-4">
                  <InputField
                    label="System WhatsApp"
                    icon={MessageCircle}
                    placeholder="Enter whatsapp number"
                    value={shopData.whatsapp}
                    onChange={(v) => setShopData({ ...shopData, whatsapp: v })}
                  />
                  <InputField
                    label="Registry ID"
                    icon={ShieldCheck}
                    placeholder="Enter registration number"
                    value={shopData.registerNumber}
                    onChange={(v) =>
                      setShopData({ ...shopData, registerNumber: v })
                    }
                  />
                  <InputField
                    label="Public Contact"
                    icon={Phone}
                    placeholder="Enter contact number"
                    value={shopData.contact}
                    onChange={(v) => setShopData({ ...shopData, contact: v })}
                  />
                </div>
              </div>

              {/* TIMING CARD */}
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight italic">
                    Synchronization
                  </h3>
                </div>
                <div className="space-y-4">
                  <InputField
                    label="Activation (Open)"
                    icon={Clock}
                    value={shopData.openTime}
                    onChange={(v) => setShopData({ ...shopData, openTime: v })}
                  />
                  <InputField
                    label="Termination (Close)"
                    icon={Clock}
                    value={shopData.closeTime}
                    onChange={(v) => setShopData({ ...shopData, closeTime: v })}
                  />
                  <div className="pt-2">
                    <div className="bg-blue-50 border border-blue-100/50 p-4 rounded-2xl flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shrink-0">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest leading-none">
                        System syncing configured <br />
                        <span className="text-[7px] opacity-60">
                          Status: Active
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* MASTER CTA */}
            <div className="pt-2 flex justify-center lg:justify-start">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                disabled={saving}
                className="px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black text-[10px] transition-all shadow-xl shadow-blue-600/20 group relative overflow-hidden uppercase tracking-[0.2em]"
              >
                <AnimatePresence mode="wait">
                  {saving ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center justify-center gap-3"
                    >
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Synchronizing...</span>
                    </motion.div>
                  ) : saved ? (
                    <motion.div
                      key="saved"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center justify-center gap-3 text-emerald-300"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Configuration Committed</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="default"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center justify-center gap-3"
                    >
                      <span>
                        {viewState === "register"
                          ? "Register Shop Registry"
                          : "Update Shop Configuration"}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </motion.button>
            </div>
          </div>
        </div>
      </main>

      {/* ─── DELETE SHOP CONFIRMATION ─── */}
      <AnimatePresence>
        {showDeleteShopModal && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-8 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDeleteShopModal(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-sm bg-white rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(244,63,94,0.3)] p-10 border border-white overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-rose-600" />
              <div className="w-20 h-20 bg-rose-50 text-rose-600 rounded-[1.75rem] flex items-center justify-center mx-auto mb-6">
                <Trash2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic mb-4">
                Confirm Teardown
              </h3>
              <p className="text-sm font-medium text-slate-500 leading-relaxed mb-8">
                Are you sure you want to delete your shop? This process is
                manual and{" "}
                <span className="text-rose-600 font-bold uppercase tracking-tighter">
                  irreversible
                </span>
                .
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <button
                  onClick={() => setShowDeleteShopModal(false)}
                  className="h-16 rounded-2xl bg-slate-50 text-slate-500 font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all active:scale-95"
                >
                  Terminate
                </button>
                <button
                  onClick={handleDeleteShop}
                  className="h-16 rounded-2xl bg-rose-600 text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-rose-600/30 hover:bg-rose-700 transition-all active:scale-95"
                >
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── ADD CATEGORY DIALOG ─── */}
      <AnimatePresence>
        {showAddCategoryModal && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddCategoryModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-[2rem] shadow-2xl p-8 border border-white"
            >
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-4">
                    <Plus className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic">
                    Create Category
                  </h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Define shop classification
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      Category Identity
                    </p>
                    <input
                      type="text"
                      placeholder="Enter new classification..."
                      value={newCatName}
                      onChange={(e) => setNewCatName(e.target.value)}
                      className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl px-6 text-sm font-bold text-slate-800 uppercase tracking-tight focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/20 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <button
                    onClick={() => setShowAddCategoryModal(false)}
                    className="h-14 rounded-2xl bg-slate-50 text-slate-500 font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateCategory}
                    disabled={catLoading}
                    className="h-14 rounded-2xl bg-blue-600 text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {catLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Syncing...
                      </>
                    ) : (
                      "Apply Sync"
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── MAP PICKER MODAL (SWIGGY STYLE) ─── */}
      <AnimatePresence>
        {showMapPicker && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-20 md:p-32">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMapPicker(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="relative w-full max-w-xl bg-white rounded-[10px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)] overflow-hidden flex flex-col h-[70vh] md:h-[600px] border border-white"
            >
              {/* MODAL HEADER */}
              <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h3 className="font-black text-slate-900 uppercase tracking-tighter italic">
                    Mapman Geo-Picker
                  </h3>
                </div>
                <button
                  onClick={() => setShowMapPicker(false)}
                  className="w-10 h-10 hover:bg-slate-50 rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              {/* MAP INTERFACE */}
              <div className="flex-1 relative bg-slate-100 overflow-hidden">
                <div id="picker-map" className="w-full h-full z-10" />

                {/* OVERLAYS ARE CENTERED */}

                {/* FLOATING SEARCH & LOCATE */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[90%] z-20">
                  <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 flex items-center">
                    <Search className="ml-4 w-5 h-5 text-slate-300" />
                    <input
                      type="text"
                      placeholder="Locality or brand area..."
                      className="flex-1 h-12 px-4 text-sm font-bold text-slate-800 bg-transparent outline-none uppercase tracking-tight placeholder:text-slate-200"
                      value={mapSearch}
                      onChange={(e) => setMapSearch(e.target.value)}
                    />
                    <button
                      onClick={handleManualLocate}
                      className="w-12 h-12 flex items-center justify-center bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors mr-2"
                    >
                      <LocateFixed className="w-5 h-5" />
                    </button>
                    <button className="h-12 px-6 bg-slate-900 hover:bg-black text-white rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all">
                      Search
                    </button>
                  </div>
                </div>

                {/* CENTER PIN MOCK (STAYS CENTERED) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(50%+20px)] z-30 pointer-events-none">
                  <div className="relative flex flex-col items-center">
                    <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-[0_20px_40px_rgba(37,99,235,0.4)] ring-4 ring-white transition-transform scale-110">
                      <MapPin className="w-7 h-7 text-white" />
                    </div>
                    <div className="h-4 w-1 bg-blue-600 rounded-full mt-1 animate-bounce" />
                  </div>
                </div>

                {/* BOTTOM ACTION CARD - CENTERED */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[92%] z-40">
                  <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-white">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center shrink-0">
                        <Navigation className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-[9px] font-black text-blue-500 uppercase tracking-widest leading-none">
                          Pinned Hub Coordinate
                        </p>
                        {geocoding ? (
                          <div className="flex items-center gap-2 py-1">
                            <Loader2 className="w-3.5 h-3.5 text-blue-600 animate-spin" />
                            <p className="text-[11px] font-black text-blue-600 uppercase tracking-widest animate-pulse">
                              Syncing Registry Address...
                            </p>
                          </div>
                        ) : (
                          <p className="text-[11px] font-bold text-slate-800 line-clamp-2 uppercase tracking-tighter leading-relaxed">
                            {mapSearch || "Targeting location..."}
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setShowMapPicker(false);
                      }}
                      className="w-full md:w-auto px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-3 active:scale-95"
                    >
                      <Check className="w-4 h-4" /> Confirm Global Map
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EditShop;
