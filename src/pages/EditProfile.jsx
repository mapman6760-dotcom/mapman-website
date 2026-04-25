import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    User,
    Camera,
    ArrowLeft,
    Mail,
    CheckCircle2,
    Sparkles,
    Loader2,
    Smartphone,
    MapPin,
    Globe,
    Building,
    ChevronDown,
    AlertCircle,
    ShieldCheck,
} from "lucide-react";
import { getProfile, updateProfile } from "../api/shop";
import indiaData from "../assets/india_states_districts.json";

const API_BASE_URL = "https://mapman-production.up.railway.app";

const EditProfile = () => {
    const navigate = useNavigate();
    const avatarInputRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [avatarFile, setAvatarFile] = useState(null);
    const [errors, setErrors] = useState({});

    // User data state
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        phone: "",
        state: "",
        district: "",
        country: "India",
        avatar: "",
    });

    useEffect(() => {
        fetchProfileData();
    }, []);

    const fetchProfileData = async () => {
        try {
            setLoading(true);
            const res = await getProfile();
            if (res.status === 200) {
                const data = res.data;
                setUserData({
                    name: data.userName || "",
                    email: data.email || "",
                    phone: data.phone || "",
                    state: data.state || "",
                    district: data.district || "",
                    country: data.country || "India",
                    avatar: data.profilePic
                        ? `${API_BASE_URL}${data.profilePic}`
                        : "https://cdn-icons-png.flaticon.com/128/3135/3135715.png",
                });
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
        } finally {
            setLoading(false);
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!userData.name.trim()) newErrors.name = "Required";
        else if (userData.name.length < 3) newErrors.name = "Too short";

        if (!userData.email.trim()) newErrors.email = "Required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) newErrors.email = "Invalid";

        if (!userData.state) newErrors.state = "Required";
        if (!userData.district) newErrors.district = "Required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setAvatarFile(file);
        const url = URL.createObjectURL(file);
        setUserData((prev) => ({ ...prev, avatar: url }));
    };

    const handleSaveProfile = async () => {
        if (!validate()) return;

        try {
            setSaving(true);
            const formData = new FormData();
            if (avatarFile) {
                formData.append("image", avatarFile);
            }
            formData.append("userName", userData.name);
            formData.append("phone", userData.phone);
            formData.append("email", userData.email);
            formData.append("state", userData.state);
            formData.append("district", userData.district);
            formData.append("country", userData.country);

            const res = await updateProfile(formData);
            if (res.status === 200) {
                navigate("/profile");
            } else {
                alert(res.message || "Failed to update profile");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert(error.message || "An error occurred while updating profile");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="w-full h-[60vh] flex flex-col items-center justify-center space-y-4">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest animate-pulse">
                    Syncing Identity...
                </p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-5xl mx-auto pb-16 px-4 md:px-8">
            {/* ── HEADER ── */}
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={() => navigate("/profile")}
                    className="group flex items-center gap-2.5 text-slate-500 hover:text-slate-900 transition-all font-bold"
                >
                    <div className="w-9 h-9 bg-white border border-slate-200 rounded-xl flex items-center justify-center shadow-sm group-hover:-translate-x-1 transition-all">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    <span className="text-[13px]">Back</span>
                </button>

                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full border border-blue-100">
                    <Sparkles className="w-3 h-3 text-blue-600" />
                    <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">
                        Identity Configuration
                    </span>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[2rem] border border-slate-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06)] overflow-hidden"
            >
                <div className="flex flex-col lg:flex-row min-h-[500px]">

                    {/* ── LEFT SIDE: PICKER & SUMMARY ── */}
                    <div className="w-full lg:w-[320px] bg-slate-50/50 border-b lg:border-b-0 lg:border-r border-slate-100 flex flex-col items-center p-8 lg:p-12 relative overflow-hidden shrink-0">
                        {/* Background Accent */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

                        <div className="relative group/avatar mb-6">
                            <div className="w-32 h-32 md:w-36 md:h-36 rounded-[2.5rem] p-1.5 bg-white shadow-xl relative z-10 overflow-hidden ring-4 ring-slate-100/30">
                                <img
                                    src={userData.avatar}
                                    alt="Profile"
                                    className="w-full h-full rounded-[2.1rem] object-cover transition-transform duration-700 group-hover/avatar:scale-110"
                                />
                            </div>
                            <input
                                ref={avatarInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleAvatarChange}
                            />
                            <button
                                type="button"
                                onClick={() => avatarInputRef.current?.click()}
                                className="absolute -bottom-1 -right-1 z-20 w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center justify-center shadow-lg transition-all border-4 border-white hover:scale-110 active:scale-95 group"
                            >
                                <Camera className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                            </button>
                        </div>

                        <div className="text-center space-y-3 relative z-10 w-full">
                            <div className="space-y-1">
                                <h2 className="text-xl font-black text-slate-900 tracking-tighter uppercase italic line-clamp-1">
                                    {userData.name || "Configure Identity"}
                                </h2>
                                <div className="flex items-center justify-center gap-1.5">
                                    <ShieldCheck className="w-3 h-3 text-blue-500" />
                                    <p className="text-slate-400 font-bold text-[9px] uppercase tracking-[0.15em]">{userData.phone || "Active Terminal"}</p>
                                </div>
                            </div>

                            <div className="pt-2 flex flex-col gap-2">
                                <div className="px-3 py-1.5 bg-white border border-slate-100 rounded-lg flex items-center justify-between">
                                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Status</span>
                                    <div className="flex items-center gap-1">
                                        <span className="w-1 h-1 bg-emerald-500 rounded-full"></span>
                                        <span className="text-[8px] font-black text-slate-800 uppercase tracking-tighter">Verified</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-50/50 rounded-full blur-[60px] opacity-40"></div>
                    </div>

                    {/* ── RIGHT SIDE: FORM FIELDS ── */}
                    <div className="flex-1 p-6 md:p-10 lg:p-12">
                        <div className="max-w-xl mx-auto space-y-10">

                            {/* Profile Group */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
                                    <h3 className="text-base font-black text-slate-900 tracking-tighter uppercase">Identity Profile</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Name */}
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between px-1">
                                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Legal Name</label>
                                            <AnimatePresence>
                                                {errors.name && (
                                                    <motion.span initial={{ opacity: 0, x: 5 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="text-[9px] font-bold text-rose-500 flex items-center gap-1">
                                                        <AlertCircle className="w-3 h-3" /> {errors.name}
                                                    </motion.span>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                        <div className="relative group">
                                            <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 transition-colors ${errors.name ? 'text-rose-500' : 'text-slate-400 group-focus-within:text-blue-600'}`} />
                                            <input
                                                type="text"
                                                className={`w-full h-12 pl-12 pr-4 bg-slate-50/50 border rounded-xl outline-none font-bold text-xs transition-all focus:bg-white focus:ring-4 ${errors.name ? 'border-rose-200 focus:border-rose-500 focus:ring-rose-500/5' : 'border-slate-100 focus:border-blue-600 focus:ring-blue-600/5'}`}
                                                placeholder="John Doe"
                                                value={userData.name}
                                                onChange={(e) => {
                                                    setUserData({ ...userData, name: e.target.value });
                                                    if (errors.name) setErrors({ ...errors, name: null });
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between px-1">
                                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Address Email</label>
                                            <AnimatePresence>
                                                {errors.email && (
                                                    <motion.span initial={{ opacity: 0, x: 5 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="text-[9px] font-bold text-rose-500 flex items-center gap-1">
                                                        <AlertCircle className="w-3 h-3" /> {errors.email}
                                                    </motion.span>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                        <div className="relative group">
                                            <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 transition-colors ${errors.email ? 'text-rose-500' : 'text-slate-400 group-focus-within:text-blue-600'}`} />
                                            <input
                                                type="email"
                                                className={`w-full h-12 pl-12 pr-4 bg-slate-50/50 border rounded-xl outline-none font-bold text-xs transition-all focus:bg-white focus:ring-4 ${errors.email ? 'border-rose-200 focus:border-rose-500 focus:ring-rose-500/5' : 'border-slate-100 focus:border-blue-600 focus:ring-blue-600/5'}`}
                                                placeholder="your@domain.com"
                                                value={userData.email}
                                                onChange={(e) => {
                                                    setUserData({ ...userData, email: e.target.value });
                                                    if (errors.email) setErrors({ ...errors, email: null });
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Regional Group */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
                                    <h3 className="text-base font-black text-slate-900 tracking-tighter uppercase">Regional Deployment</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between px-1">
                                            <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Active State</label>
                                            <AnimatePresence>
                                                {errors.state && (
                                                    <motion.span initial={{ opacity: 0, x: 5 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="text-[9px] font-bold text-rose-500 flex items-center gap-1">
                                                        <AlertCircle className="w-3 h-3" /> {errors.state}
                                                    </motion.span>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                        <div className="relative">
                                            <Building className={`absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 transition-colors ${errors.state ? 'text-rose-500' : 'text-slate-400'}`} />
                                            <select
                                                className={`w-full h-12 pl-12 pr-10 bg-slate-50/50 border rounded-xl outline-none font-bold text-xs transition-all appearance-none focus:bg-white focus:ring-4 ${errors.state ? 'border-rose-200 focus:border-rose-500 focus:ring-rose-500/5' : 'border-slate-100 focus:border-indigo-600 focus:ring-indigo-600/5'}`}
                                                value={userData.state}
                                                onChange={(e) => {
                                                    setUserData({ ...userData, state: e.target.value, district: "" });
                                                    if (errors.state) setErrors({ ...errors, state: null });
                                                }}
                                            >
                                                <option value="">Select State</option>
                                                {Object.keys(indiaData).map(st => <option key={st} value={st}>{st}</option>)}
                                            </select>
                                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300 pointer-events-none" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between px-1">
                                            <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">City Node</label>
                                            <AnimatePresence>
                                                {errors.district && (
                                                    <motion.span initial={{ opacity: 0, x: 5 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="text-[9px] font-bold text-rose-500 flex items-center gap-1">
                                                        <AlertCircle className="w-3 h-3" /> {errors.district}
                                                    </motion.span>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                        <div className="relative">
                                            <MapPin className={`absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 transition-colors ${errors.district ? 'text-rose-500' : 'text-slate-400'}`} />
                                            <select
                                                className={`w-full h-12 pl-12 pr-10 bg-slate-50/50 border rounded-xl outline-none font-bold text-xs transition-all appearance-none disabled:opacity-50 focus:bg-white focus:ring-4 ${errors.district ? 'border-rose-200 focus:border-rose-500 focus:ring-rose-500/5' : 'border-slate-100 focus:border-indigo-600 focus:ring-indigo-600/5'}`}
                                                value={userData.district}
                                                disabled={!userData.state}
                                                onChange={(e) => {
                                                    setUserData({ ...userData, district: e.target.value });
                                                    if (errors.district) setErrors({ ...errors, district: null });
                                                }}
                                            >
                                                <option value="">Select City</option>
                                                {(userData.state ? indiaData[userData.state] : []).map(ct => <option key={ct} value={ct}>{ct}</option>)}
                                            </select>
                                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300 pointer-events-none" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Terminal Read Only */}
                            <div className="space-y-2 opacity-60">
                                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Verified Terminal</label>
                                <div className="relative">
                                    <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                                    <input
                                        type="text"
                                        readOnly
                                        className="w-full h-12 pl-12 bg-slate-100/50 border border-slate-200 rounded-xl outline-none font-bold text-xs text-slate-500 cursor-not-allowed"
                                        value={userData.phone}
                                    />
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="pt-6 flex flex-col sm:flex-row items-center gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.01, y: -1 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={saving}
                                    onClick={handleSaveProfile}
                                    className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-[10px] font-black text-[11px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all shadow-xl shadow-blue-600/30 disabled:opacity-50"
                                >
                                    {saving ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Syncing...
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle2 className="w-4 h-4" />
                                            Commit Changes
                                        </>
                                    )}
                                </motion.button>

                                <button
                                    onClick={() => navigate("/profile")}
                                    className="w-full sm:w-auto h-14 px-12 bg-white border border-slate-200 hover:bg-slate-50 text-slate-500 rounded-[10px] font-black text-[11px] uppercase tracking-[0.3em] transition-all"
                                >
                                    Abort
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default EditProfile;
