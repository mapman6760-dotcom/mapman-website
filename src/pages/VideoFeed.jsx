import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Play,
    User,
    CloudUpload,
    Eye,
    Clock,
    MessageSquare,
    Heart,
    Share2,
    MoreVertical,
    ImageIcon,
    Loader2,
    Camera,
    Plus,
    X,
    FileVideo,
    AlignLeft,
    Tag,
    Store,
    Type,
    ChevronRight,
    AlertCircle,
    CheckCircle2,
    Lock,
    Sparkles,
    ChevronLeft,
    ShieldCheck,
    Grid,
    VideoOff
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchShop } from "../api/shop";

const API_BASE_URL = "https://mapman-production.up.railway.app";

const VideoFeed = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("all");
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isShopRegistered, setIsShopRegistered] = useState(true);
    const [shopInfo, setShopInfo] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [editingVideo, setEditingVideo] = useState(null);
    const [selectedReel, setSelectedReel] = useState(null);

    // Upload Modal State
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showRewardsModal, setShowRewardsModal] = useState(false);
    const [videoFile, setVideoFile] = useState(null);
    const [fileError, setFileError] = useState("");
    const [uploadForm, setUploadForm] = useState({
        videoTitle: "",
        description: "",
        shopCategory: "",
        shopName: ""
    });

    useEffect(() => {
        if (shopInfo) {
            setUploadForm(prev => ({
                ...prev,
                shopCategory: shopInfo.category || "",
                shopName: shopInfo.shopName || shopInfo.name || ""
            }));
        }
    }, [shopInfo]);

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const handleRegisterVideo = async () => {
        if (!videoFile || !uploadForm.videoTitle || !shopInfo) return;
        setIsSaving(true);
        try {
            const token = localStorage.getItem("token");
            const formData = new FormData();
            formData.append("shopId", shopInfo.id);
            formData.append("video", videoFile);
            formData.append("videoTitle", uploadForm.videoTitle);
            formData.append("shopName", uploadForm.shopName);
            formData.append("category", uploadForm.shopCategory);
            formData.append("description", uploadForm.description);

            const res = await fetch(`${API_BASE_URL}/shop/videoRegister`, {
                method: "POST",
                headers: { "usertoken": token },
                body: formData
            });
            const result = await res.json();
            if (result.status === 200) {
                setShowUploadModal(false);
                setVideoFile(null);
                setUploadForm({ ...uploadForm, videoTitle: "", description: "" });
                fetchData();
            }
        } catch (error) {
            console.error("Upload error:", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleUpdateVideo = async () => {
        if (!uploadForm.videoTitle || !shopInfo || !editingVideo) return;
        setIsSaving(true);
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${API_BASE_URL}/shop/updateVideoDetails`, {
                method: "POST",
                headers: {
                    "usertoken": token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    shopId: shopInfo.id,
                    videoTitle: uploadForm.videoTitle,
                    shopName: uploadForm.shopName,
                    category: uploadForm.shopCategory,
                    description: uploadForm.description,
                    videoId: editingVideo.id
                })
            });
            const result = await res.json();
            if (result.status === 200) {
                setShowUploadModal(false);
                setEditingVideo(null);
                fetchData();
            }
        } catch (error) {
            console.error("Update error:", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleReplaceVideo = async (file) => {
        if (!file || !editingVideo) return;
        setIsSaving(true);
        try {
            const token = localStorage.getItem("token");
            const formData = new FormData();
            formData.append("video", file);
            formData.append("videoId", editingVideo.id);

            const res = await fetch(`${API_BASE_URL}/shop/replaceVideo`, {
                method: "POST",
                headers: { "usertoken": token },
                body: formData
            });
            const result = await res.json();
            if (result.status === 200) {
                fetchData();
                setShowUploadModal(false);
                setEditingVideo(null);
            }
        } catch (error) {
            console.error("Replace video error:", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteVideo = async () => {
        if (!editingVideo) return;
        if (!window.confirm("Are you sure you want to delete this reel?")) return;
        setIsSaving(true);
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${API_BASE_URL}/shop/deleteVideo`, {
                method: "POST",
                headers: {
                    "usertoken": token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ videoId: editingVideo.id })
            });
            const result = await res.json();
            if (result.status === 200) {
                fetchData();
                setShowUploadModal(false);
                setEditingVideo(null);
            }
        } catch (error) {
            console.error("Delete error:", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleOpenEdit = async (vid) => {
        try {
            // Re-fetch shop info to ensure we have the latest metadata
            const shopRes = await fetchShop();
            let currentShop = shopInfo;
            if (shopRes.status === 200 && shopRes.data) {
                setShopInfo(shopRes.data);
                currentShop = shopRes.data;
            }

            setEditingVideo(vid);
            setUploadForm({
                videoTitle: vid.videoTitle || "",
                description: vid.description || "",
                shopCategory: vid.category || currentShop?.category || "",
                shopName: vid.shopName || currentShop?.shopName || currentShop?.name || ""
            });
            setVideoFile(null);
            setShowUploadModal(true);
        } catch (error) {
            console.error("Error opening edit modal:", error);
        }
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");

            // 1. Check Shop Status if in "My Videos" tab
            if (activeTab === "my") {
                try {
                    const shopResult = await fetchShop();
                    if (shopResult.status === 200 && shopResult.data) {
                        setIsShopRegistered(true);
                        setShopInfo(shopResult.data);
                    } else {
                        setIsShopRegistered(false);
                        setShopInfo(null);
                    }
                } catch (err) {
                    console.error("Shop check error:", err);
                    setIsShopRegistered(false);
                    setShopInfo(null);
                }
            }

            // 2. Fetch Videos
            const endpoint = activeTab === "all" ? "/shop/getCategoryVideos" : "/shop/myVideos";
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                headers: { "usertoken": token }
            });
            const result = await response.json();
            if (result.status === 200 && Array.isArray(result.data)) {
                setVideos(result.data);
            } else {
                setVideos([]);
            }
        } catch (error) {
            console.error("Error fetching videos:", error);
            setVideos([]);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        setFileError("");
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const maxSize = 10 * 1024 * 1024; // 10MB

            if (file.size > maxSize) {
                setFileError("Video size exceeds 10MB limit.");
                setVideoFile(null);
                e.target.value = "";
                return;
            }
            setVideoFile(file);
        }
    };

    return (
        <div className="flex flex-col h-full bg-transparent no-scrollbar relative">
            {/* 1. PROFESSIONAL HEADER & TABS */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10 px-8 pt-6 relative z-10">
                <div className="flex flex-col gap-1">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Discovery Hub</h2>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Explore Hub experiences through live motion</p>
                </div>

                <div className="flex items-center gap-2 bg-white/60 backdrop-blur-xl p-1.5 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
                    <button
                        onClick={() => setActiveTab("all")}
                        className={`px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all duration-300 ${activeTab === "all" ? "bg-slate-900 text-white shadow-xl scale-105" : "text-slate-500 hover:text-slate-700"}`}
                    >
                        All Videos
                    </button>
                    <button
                        onClick={() => setActiveTab("my")}
                        className={`px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all duration-300 ${activeTab === "my" ? "bg-slate-900 text-white shadow-xl scale-105" : "text-slate-500 hover:text-slate-700"}`}
                    >
                        My Videos
                    </button>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setShowRewardsModal(true)}
                        className="bg-white px-5 py-2.5 rounded-full flex items-center gap-3 shadow-sm border border-slate-100 hover:shadow-md transition-all active:scale-95 group"
                    >
                        <img src="https://cdn-icons-png.flaticon.com/128/7892/7892416.png" className="w-5 h-5 object-contain group-hover:rotate-12 transition-transform" alt="Coins" />
                        <span className="text-sm font-black text-slate-900 tracking-tighter">4</span>
                    </button>

                    {activeTab === "my" && (
                        <motion.button
                            layoutId="capture-btn"
                            onClick={async () => {
                                try {
                                    const res = await fetchShop();
                                    if (res.status === 200 && res.data && Object.keys(res.data).length > 0) {
                                        setShopInfo(res.data);
                                        setShowUploadModal(true);
                                    } else {
                                        navigate("/edit-shop");
                                    }
                                } catch (error) {
                                    console.error("Shop verification error:", error);
                                    navigate("/edit-shop");
                                }
                            }}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2.5 bg-blue-600 text-white px-7 py-4 rounded-xl font-bold text-sm shadow-lg transition-all hover:bg-blue-700"
                        >
                            <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
                                <Plus className="w-4 h-4 text-white" />
                            </div>
                            <span className="flex items-center gap-2">Capture Reel</span>
                        </motion.button>
                    )}
                </div>
            </div>

            {/* 2. DISCOVERY GRID */}
            {loading ? (
                <div className="flex-1 flex flex-col items-center justify-center">
                    <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Syncing Feed...</span>
                </div>
            ) : videos.length > 0 ? (
                <div className={`${activeTab === "all" ? "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6" : "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 px-4"} gap-5 bg-transparent pb-20 no-scrollbar`}>
                    <AnimatePresence mode="popLayout">
                        {videos.map((vid, i) => {
                            if (!vid) return null;
                            return (
                                <motion.div
                                    key={vid.id || i}
                                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ delay: i * 0.02 }}
                                    onClick={() => {
                                        if (activeTab === "all") {
                                            navigate(`/category-videos?category=${vid.categoryName}`);
                                        } else {
                                            navigate(`/video-player/${vid.id || i}`, {
                                                state: { videos: videos, index: i, isMyVideos: activeTab === "my" }
                                            });
                                        }
                                    }}
                                    className={`relative group cursor-pointer transition-all duration-500 ${activeTab === 'all' ? 'flex flex-col aspect-[3/4] overflow-hidden bg-white border-r border-b border-slate-100' : 'flex flex-col bg-white rounded-[2rem] p-4 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 border border-slate-100'}`}
                                >
                                    {activeTab === "all" ? (
                                        <>
                                            <div className="absolute inset-0">
                                                <img src={`${API_BASE_URL}${vid.categoryVideo}`} alt={vid.categoryName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                                            </div>
                                            <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
                                                <div className="px-2.5 py-1 rounded-md border text-white text-[7px] font-black uppercase tracking-widest shadow-xl backdrop-blur-md bg-white/10 border-white/20">{vid.categoryName}</div>
                                            </div>
                                            <div className="absolute bottom-5 left-5 right-5 z-10 text-white">
                                                <h4 className="text-[11px] font-black uppercase tracking-tight mb-3 line-clamp-2 leading-tight drop-shadow-lg group-hover:text-blue-400 transition-colors uppercase">{vid.categoryName} Reel</h4>
                                                <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20 rounded-md inline-flex">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                                    <span className="text-[7px] font-black text-emerald-400 uppercase tracking-widest">Active Studio</span>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="w-full aspect-video rounded-[1.5rem] overflow-hidden bg-slate-950 mb-4 relative group-hover:shadow-xl h-36 border border-slate-900 shadow-inner">
                                                <video src={`${API_BASE_URL}${vid.video}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" muted loop />
                                                <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 backdrop-blur-md rounded-lg text-[8px] font-black text-white/90 uppercase tracking-widest leading-none border border-white/10">{vid.id % 2 === 0 ? "LIVE" : "HD"}</div>
                                            </div>
                                            <div className="flex gap-4">
                                                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-slate-800 to-black p-0.5 shadow-lg group-hover:rotate-6 transition-transform">
                                                    <div className="w-full h-full rounded-[0.5rem] bg-slate-900 flex items-center justify-center text-white font-black text-[10px]">{vid.shopName?.charAt(0) || "M"}</div>
                                                </div>
                                                <div className="flex flex-col gap-1 min-w-0 flex-1 relative pr-8">
                                                    <h4 className="text-[12px] font-black text-slate-900 uppercase tracking-tight line-clamp-2 leading-tight transition-colors uppercase">{vid.videoTitle}</h4>
                                                    <div className="flex items-center gap-1.5 text-slate-400 text-[9px] font-bold uppercase tracking-tight opacity-70">
                                                        <span className="truncate">{vid.shopName}</span>
                                                        <div className="w-1 h-1 rounded-full bg-slate-200"></div>
                                                        <span>{vid.views || 0} views</span>
                                                    </div>

                                                    {/* Edit Menu Button */}
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleOpenEdit(vid);
                                                        }}
                                                        className="absolute right-0 top-0 w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-blue-600"
                                                    >
                                                        <MoreVertical className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center bg-white/50 backdrop-blur-xl rounded-[4rem] border-2 border-slate-100 py-32 px-10 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                    <div className="w-24 h-24 bg-white text-slate-200 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-2xl border border-slate-50"><Play className="w-10 h-10" /></div>
                    <h3 className="text-2xl font-black text-slate-400 uppercase tracking-widest mb-3">No Gallery Content</h3>
                    <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest max-w-[320px] leading-relaxed">System curators are currently indexing fresh motion experiences.</p>
                </div>
            )}

            {/* 3. PREMIUM UPLOAD MODAL (ENHANCED) */}
            <AnimatePresence>
                {showUploadModal && (
                    <div className="fixed inset-0 z-[120] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowUploadModal(false)}
                            className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 30 }}
                            className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-[0_50px_120px_rgba(0,0,0,0.25)] overflow-hidden border border-slate-100 flex flex-col no-scrollbar"
                        >
                            {/* Decorative Top Accent */}
                            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-indigo-600 to-blue-500 z-50"></div>

                            {/* Enhanced Header */}
                            <div className="bg-slate-50/80 px-8 py-7 border-b border-slate-100 flex items-center justify-between relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/30 rounded-full blur-[60px] -mr-16 -mt-16"></div>
                                <div className="flex items-center gap-4 relative z-10 transition-transform">
                                    <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-xl group hover:rotate-12 transition-all">
                                        <Sparkles className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase leading-none mb-1.5 flex items-center gap-2">
                                            {editingVideo ? "Refine Reel" : "Studio Reel"}
                                        </h3>
                                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest flex items-center gap-1.5">
                                            <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></div>
                                            {editingVideo ? "Modify Experience" : "List Experience"}
                                        </p>
                                    </div>
                                </div>
                                {editingVideo && (
                                    <button
                                        onClick={handleDeleteVideo}
                                        className="ml-auto mr-4 w-10 h-10 bg-rose-50 hover:bg-rose-100 text-rose-500 rounded-xl flex items-center justify-center transition-all border border-rose-100 shadow-sm relative z-10"
                                    >
                                        <AlertCircle className="w-5 h-5" />
                                    </button>
                                )}
                                <button onClick={() => { setShowUploadModal(false); setEditingVideo(null); }} className="w-10 h-10 bg-white hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-xl flex items-center justify-center transition-all border border-slate-100 shadow-sm relative z-10">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Enhanced Body */}
                            <div className="p-8 space-y-7 overflow-y-auto no-scrollbar max-h-[60vh]">
                                {/* Pick Video Area */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between px-1">
                                        <label className="text-[10px] font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                                            <Camera className="w-3.5 h-3.5 text-blue-600" /> Video Hub
                                        </label>
                                        <div className="px-2 py-0.5 bg-slate-100 rounded-md text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">Limit 10MB</div>
                                    </div>
                                    <div className="relative group/picker cursor-pointer">
                                        <input type="file" accept="video/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                        <motion.div
                                            whileHover={{ y: -2 }}
                                            className={`w-full h-40 border-2 border-dashed rounded-[2rem] flex flex-col items-center justify-center transition-all duration-500 ${videoFile ? 'border-emerald-500 bg-emerald-50/5' : 'border-slate-200 bg-slate-50 group-hover/picker:border-blue-400 group-hover/picker:bg-blue-50/5'}`}
                                        >
                                            <div className={`w-14 h-14 rounded-2xl mb-4 flex items-center justify-center shadow-lg transition-all duration-500 ${videoFile ? 'bg-emerald-600 text-white rotate-0' : 'bg-white text-slate-300 group-hover/picker:rotate-6'}`}>
                                                {videoFile ? <CheckCircle2 className="w-7 h-7" /> : <Plus className="w-7 h-7" />}
                                            </div>
                                            <span className={`text-[12px] font-black uppercase tracking-widest transition-colors ${videoFile ? 'text-emerald-700' : 'text-slate-500'}`}>
                                                {videoFile ? videoFile.name : editingVideo ? 'Replace Studio Video' : 'Select or Drop Studio Video'}
                                            </span>
                                            {videoFile && (
                                                <p className="text-[9px] text-emerald-600/60 font-black mt-1 uppercase tracking-widest">Valid Capture Component</p>
                                            )}
                                        </motion.div>
                                    </div>
                                    {editingVideo && (
                                        <button
                                            onClick={() => handleReplaceVideo(videoFile)}
                                            disabled={!videoFile || isSaving}
                                            className={`w-full h-12 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${videoFile ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'bg-slate-100 text-slate-300 cursor-not-allowed'}`}
                                        >
                                            {isSaving ? "Replacing..." : "Commit Video Replacement"}
                                        </button>
                                    )}
                                    {fileError && (
                                        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3 px-4 py-3 bg-red-50 text-red-600 rounded-2xl border border-red-100 shadow-sm shadow-red-200/20 mt-2">
                                            <div className="shrink-0 w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm"><AlertCircle className="w-4 h-4" /></div>
                                            <span className="text-[10px] font-black uppercase tracking-tight">{fileError}</span>
                                        </motion.div>
                                    )}
                                </div>

                                {/* Refined Field Group */}
                                <div className="space-y-5">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-800 uppercase tracking-widest px-1">Studio Details</label>
                                        <div className="space-y-3">
                                            {/* Title */}
                                            <div className="relative group">
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100 transition-all group-focus-within:border-blue-500/20 group-focus-within:bg-blue-50 group-focus-within:scale-110">
                                                    <Type className="w-4 h-4 text-slate-400 group-focus-within:text-blue-600" />
                                                </div>
                                                <input
                                                    type="text"
                                                    placeholder="REEL TITLE..."
                                                    className="w-full h-16 pl-16 pr-5 bg-white border-2 border-slate-100 rounded-3xl outline-none focus:border-blue-600/30 transition-all text-xs font-black uppercase tracking-tight placeholder:text-slate-200"
                                                    value={uploadForm.videoTitle}
                                                    onChange={(e) => setUploadForm({ ...uploadForm, videoTitle: e.target.value })}
                                                />
                                            </div>

                                            {/* Shop Name (Read Only) */}
                                            <div className="relative group/lock opacity-80">
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100">
                                                    <Store className="w-4 h-4 text-slate-400" />
                                                </div>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    className="w-full h-16 pl-16 pr-12 bg-slate-50 border-2 border-slate-100 rounded-3xl outline-none text-xs font-black text-slate-500 uppercase tracking-tight cursor-not-allowed"
                                                    value={uploadForm.shopName}
                                                />
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                                    <Lock className="w-3.5 h-3.5 text-slate-300" />
                                                </div>
                                            </div>

                                            {/* Category (Read Only) */}
                                            <div className="relative group/lock opacity-80">
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100">
                                                    <Tag className="w-4 h-4 text-slate-400" />
                                                </div>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    className="w-full h-16 pl-16 pr-12 bg-slate-50 border-2 border-slate-100 rounded-3xl outline-none text-xs font-black text-slate-500 uppercase tracking-tight cursor-not-allowed"
                                                    value={uploadForm.shopCategory}
                                                />
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                                    <Lock className="w-3.5 h-3.5 text-slate-300" />
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <div className="relative group">
                                                <div className="absolute left-4 top-4 w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100 transition-all group-focus-within:border-blue-500/20 group-focus-within:bg-blue-50 group-focus-within:scale-110">
                                                    <AlignLeft className="w-4 h-4 text-slate-400 group-focus-within:text-blue-600" />
                                                </div>
                                                <textarea
                                                    placeholder="DESCRIPTION..."
                                                    rows="3"
                                                    className="w-full pl-16 pr-5 py-5 bg-white border-2 border-slate-100 rounded-[2rem] outline-none focus:border-blue-600/30 transition-all text-xs font-black uppercase tracking-tight placeholder:text-slate-200 resize-none min-h-[100px]"
                                                    value={uploadForm.description}
                                                    onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Enhanced Footer */}
                            <div className="p-8 bg-slate-50/80 border-t border-slate-100 flex gap-4 relative overflow-hidden">
                                <button
                                    onClick={() => setShowUploadModal(false)}
                                    className="flex-1 h-14 bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-900 border border-slate-200 rounded-[10px] font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 shadow-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    className={`flex-[1.5] h-14 rounded-[10px] font-black text-[11px] uppercase tracking-[0.3em] shadow-xl transition-all flex items-center justify-center gap-3
                                        ${uploadForm.videoTitle && (videoFile || editingVideo)
                                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                                            : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'}`}
                                    disabled={(!videoFile && !editingVideo) || !uploadForm.videoTitle || isSaving}
                                    onClick={editingVideo ? handleUpdateVideo : handleRegisterVideo}
                                >
                                    {isSaving ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <span className="relative z-10">{editingVideo ? "Update Details" : "Confirm Release"}</span>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* 4. EARN REWARDS DIALOG (PROFESSIONAL) */}
            <AnimatePresence>
                {showRewardsModal && (
                    <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 text-center">
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

                            {/* Treasure Chest Illustration */}
                            <div className="w-32 h-32 mx-auto mb-6 relative">
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="relative z-10"
                                >
                                    <img src="https://img.freepik.com/premium-vector/purple-box-with-gold-bow-top-it-there-are-many-gold-coins-scattered-around-box-vector-illustration_345238-2441.jpg?semt=ais_incoming&w=740&q=80" className="w-full h-full object-cover rounded-2xl" alt="Treasure" />
                                </motion.div>
                                <div className="absolute inset-0 bg-orange-400/20 blur-3xl rounded-full" />
                            </div>

                            <div className="space-y-3 mb-8">
                                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic leading-tight">
                                    Earn Rewards for <br /> Watching Videos
                                </h3>
                                <p className="text-[11px] font-medium text-slate-400 leading-relaxed px-2 uppercase tracking-wide">
                                    For every video you watch, you will receive <span className="text-orange-600 font-bold">2 SuperCoins</span> as a reward.
                                </p>
                            </div>

                            <button
                                onClick={() => setShowRewardsModal(false)}
                                className="w-full h-14 rounded-2xl bg-gradient-to-r from-orange-400 to-amber-600 text-white font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.02] transition-all active:scale-95"
                            >
                                Yes, I Got It
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default VideoFeed;
