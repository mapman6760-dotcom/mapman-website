import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ShieldCheck,
  Bell,
  Settings,
  Loader2,
  LogOut,
  MapPin,
  Star,
  Edit3,
  Store,
  BarChart2,
  Headphones,
  Phone,
  Mail,
  User,
  ArrowRight,
} from "lucide-react";
import { getProfile } from "../api/shop";

let cachedProfileData = null;
let cachedToken = undefined;

const Profile = ({ onLogout, isLoggedIn, setIsLoggedIn, openLogin }) => {
  const currentToken = localStorage.getItem("token");
  const isCacheValid = cachedProfileData && cachedToken === currentToken;

  const [loading, setLoading] = useState(!isCacheValid);
  const navigate = useNavigate();

  const [userData, setUserData] = useState(isCacheValid ? cachedProfileData : {
    name: "",
    email: "",
    phone: "",
    state: "",
    district: "",
    country: "India",
    role: "",
    avatar: "",
    points: 0,
  });

  useEffect(() => {
    if (isLoggedIn) {
      const token = localStorage.getItem("token");
      if (cachedProfileData && cachedToken === token) {
        setLoading(false);
        return;
      }
      fetchProfileData();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn]);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const res = await getProfile();
      if (res.status === 200) {
        const data = res.data;
        const profileInfo = {
          name: data.userName || "No Name",
          email: data.email || "No Email",
          phone: data.phone || "",
          state: data.state || "",
          district: data.district || "",
          country: data.country || "India",
          role: "Verified Account",
          avatar: data.profilePic
            ? data.profilePic
            : "https://cdn-icons-png.flaticon.com/128/3135/3135715.png",
          points: data.points || 0,
        };
        setUserData(profileInfo);
        cachedProfileData = profileInfo;
        cachedToken = localStorage.getItem("token");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const mainContent = document.querySelector("main");
    if (mainContent) {
      mainContent.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const quickActions = [
    {
      title: "My Shops",
      desc: "Manage listings",
      icon: "https://cdn-icons-png.flaticon.com/128/869/869432.png",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      hoverShadow: "hover:shadow-emerald-100",
      onClick: () => navigate("/shop-list"),
    },
    {
      title: "Analytics",
      desc: "View metrics",
      icon: "https://cdn-icons-png.flaticon.com/128/10050/10050999.png",
      color: "text-violet-600",
      bg: "bg-violet-50",
      border: "border-violet-100",
      hoverShadow: "hover:shadow-violet-100",
      onClick: () => navigate("/shop-analytics"),
    },
    {
      title: "Edit Profile",
      desc: "Update info",
      icon: "https://cdn-icons-png.flaticon.com/128/1077/1077012.png",
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
      hoverShadow: "hover:shadow-blue-100",
      onClick: () => navigate("/edit-profile"),
    },
    {
      title: "Support",
      desc: "Get help",
      icon: "https://cdn-icons-png.flaticon.com/128/4961/4961759.png",
      color: "text-orange-600",
      bg: "bg-orange-50",
      border: "border-orange-100",
      hoverShadow: "hover:shadow-orange-100",
      onClick: () => navigate("/support"),
    },
  ];

  const settingsItems = [
    {
      onClick: () => navigate("/notifications"),
      icon: "https://cdn-icons-png.flaticon.com/128/1827/1827370.png",
      iconBg: "bg-blue-50 text-blue-600",
      title: "Notifications",
      desc: "Manage your alerts and updates",
      badge: "",
      badgeBg: "bg-rose-500",
    },
    {
      onClick: () => navigate("/notification-settings"),
      icon: "https://cdn-icons-png.flaticon.com/128/3953/3953226.png",
      iconBg: "bg-slate-100 text-slate-600",
      title: "Preferences",
      desc: "Configure alerts & display settings",
      badge: null,
      badgeBg: "",
    },
  ];

  if (loading) {
    return (
      <div className="w-full h-80 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest animate-pulse">
          Syncing Profile...
        </p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="w-full min-h-[70vh] flex flex-col items-center justify-center gap-6 px-6 text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl flex items-center justify-center shadow-inner border border-blue-100">
          <ShieldCheck className="w-12 h-12 text-blue-500" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Sign In Required
          </h2>
          <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
            Log in to manage your profile, shops, and personalized experience.
          </p>
        </div>
        <button
          onClick={() => openLogin()}
          className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-sm tracking-wide transition-all shadow-lg shadow-blue-600/25 hover:scale-105 active:scale-95"
        >
          Login / Register
        </button>
      </div>
    );
  }

  return (
    <div className="w-full pb-24 no-scrollbar overflow-x-hidden">

      {/* ── COVER BANNER + AVATAR ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full overflow-hidden"
      >
        {/* Cover Photo */}
        <div className="relative h-44 md:h-56 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 overflow-hidden">
          {/* Decorative orbs */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/20 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-purple-500/20 rounded-full blur-[80px] -ml-20 -mb-10 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          {/* Edit cover button */}
          <button className="absolute top-4 right-4 px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-[10px] font-black text-white uppercase tracking-widest backdrop-blur-md transition-all flex items-center gap-1.5">
            <Edit3 className="w-3 h-3" /> Edit Cover
          </button>
        </div>

        {/* Avatar row — floated over the cover bottom */}
        <div className="relative bg-white border-b border-slate-100 shadow-sm px-6 md:px-8 pb-5">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-end gap-4">
            {/* Avatar */}
            <div className="relative -mt-12 shrink-0">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-[1.75rem] p-[3px] bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 shadow-2xl shadow-blue-500/30">
                <div className="w-full h-full rounded-[1.5rem] overflow-hidden bg-white">
                  <img
                    src={userData.avatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute -bottom-1.5 -right-1.5 w-8 h-8 bg-emerald-500 text-white rounded-xl shadow-lg flex items-center justify-center border-2 border-white">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>

            {/* Name & meta */}
            <div className="flex-1 min-w-0 pt-2 sm:pt-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                    {userData.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 mt-1.5">
                    <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      {userData.email}
                    </span>
                    {userData.phone && (
                      <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        {userData.phone}
                      </span>
                    )}
                    {userData.district && (
                      <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {userData.district}, {userData.state}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => navigate("/edit-profile")}
                  className="self-start sm:self-center flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-blue-600 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 border border-slate-800 hover:border-blue-500 group shrink-0"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="bg-white border-b border-slate-100">
          <div className="max-w-4xl mx-auto px-6 md:px-8 py-4 grid grid-cols-3 divide-x divide-slate-100">
            {[
              { label: "Points", value: userData.points, icon: <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> },
              { label: "Location", value: userData.country || "India", icon: <MapPin className="w-4 h-4 text-blue-500" /> },
              { label: "Status", value: "Verified", icon: <ShieldCheck className="w-4 h-4 text-emerald-500" /> },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-1 px-4">
                <div className="flex items-center gap-1.5">
                  {stat.icon}
                  <span className="font-black text-slate-900 text-sm">{stat.value}</span>
                </div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── PAGE BODY ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-6 space-y-6">

        {/* ── QUICK ACTIONS ── */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full" />
            <h2 className="text-xs font-black text-slate-900 uppercase tracking-[0.15em]">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickActions.map((tile, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                onClick={tile.onClick}
                className={`group relative flex flex-col items-start gap-3 p-5 bg-white rounded-2xl border ${tile.border} shadow-sm hover:shadow-lg ${tile.hoverShadow} transition-all duration-300 overflow-hidden text-left`}
              >
                <img src={tile.icon} alt="settings-icons" height={25} width={25} />
                <div>
                  <h3 className="font-black text-slate-800 text-sm tracking-tight">{tile.title}</h3>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">{tile.desc}</p>
                </div>
                <ArrowRight className={`absolute top-4 right-4 w-4 h-4 ${tile.color} opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300`} />
              </motion.button>
            ))}
          </div>
        </section>

        {/* ── ACCOUNT INFO CARD ── */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <div className="w-1 h-5 bg-gradient-to-b from-slate-400 to-slate-600 rounded-full" />
            <h2 className="text-xs font-black text-slate-900 uppercase tracking-[0.15em]">Account Details</h2>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            {[
              { icon: <User className="w-4 h-4 text-slate-500" />, label: "Full Name", value: userData.name },
              { icon: <Mail className="w-4 h-4 text-slate-500" />, label: "Email Address", value: userData.email },
              { icon: <Phone className="w-4 h-4 text-slate-500" />, label: "Phone", value: userData.phone || "Not set" },
              { icon: <MapPin className="w-4 h-4 text-slate-500" />, label: "Location", value: [userData.district, userData.state, userData.country].filter(Boolean).join(", ") || "Not set" },
            ].map((row, i, arr) => (
              <div key={i} className={`flex items-center gap-4 px-5 py-4 ${i < arr.length - 1 ? "border-b border-slate-50" : ""} hover:bg-slate-50/60 transition-colors`}>
                <div className="w-8 h-8 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center shrink-0">
                  {row.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{row.label}</div>
                  <div className="text-sm font-bold text-slate-800 mt-0.5 truncate">{row.value}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SETTINGS ── */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <div className="w-1 h-5 bg-gradient-to-b from-violet-400 to-purple-600 rounded-full" />
            <h2 className="text-xs font-black text-slate-900 uppercase tracking-[0.15em]">Settings</h2>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            {settingsItems.map((row, i, arr) => (
              <button
                key={i}
                onClick={row.onClick}
                className={`w-full flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-all text-left group ${i < arr.length - 1 ? "border-b border-slate-50" : ""}`}
              >
                <div className="relative shrink-0">
                  <img src={row.icon} alt="settings-icons" height={25} width={25} />
                  {row.badge && (
                    <span className={`absolute -top-1 -right-1 w-4 h-4 ${row.badgeBg} text-white text-[7px] font-black rounded-full flex items-center justify-center border border-white`}>
                      {row.badge}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-black text-slate-800 text-sm tracking-tight">{row.title}</h4>
                  <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{row.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all shrink-0" />
              </button>
            ))}
          </div>
        </section>

        {/* ── SIGN OUT ── */}
        <section>
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-between gap-4 px-5 py-4 bg-white rounded-2xl border border-rose-100 hover:bg-rose-50 hover:border-rose-200 text-left group transition-all duration-300 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform border border-rose-100">
                <LogOut className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-black text-rose-600 text-sm tracking-tight">Sign Out</h4>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Securely exit your account</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-rose-300 group-hover:text-rose-500 group-hover:translate-x-0.5 transition-all shrink-0" />
          </button>
        </section>

      </div>
    </div>
  );
};

export default Profile;
