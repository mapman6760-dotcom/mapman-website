import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronRight,
  ShieldCheck,
  Bell,
  Settings,
  Loader2,
  BarChart2,
  Store,
  UserCircle2,
  Headphones,
  LogOut,
  MapPin,
  Star,
} from "lucide-react";
import { getProfile } from "../api/shop";
import { API_BASE_URL } from "../config";

const Profile = ({ onLogout, isLoggedIn, setIsLoggedIn, openLogin }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
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
        setUserData({
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
        });
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

  const actionTiles = [
    {
      title: "Profile Details",
      desc: "Verify Information",
      icon: <UserCircle2 className="w-6 h-6" />,
      gradient: "from-blue-500 to-blue-700",
      glow: "shadow-blue-500/30",
      onClick: () => navigate("/edit-profile"),
    },
    {
      title: "Shop Details",
      desc: "Active Business",
      icon: <Store className="w-6 h-6" />,
      gradient: "from-emerald-500 to-teal-700",
      glow: "shadow-emerald-500/30",
      onClick: () => navigate("/shop-list"),
    },
    {
      title: "Analytics",
      desc: "Weekly Growth",
      icon: <BarChart2 className="w-6 h-6" />,
      gradient: "from-violet-500 to-purple-700",
      glow: "shadow-violet-500/30",
      onClick: () => navigate("/shop-analytics"),
    },
    {
      title: "Support",
      desc: "24/7 Access",
      icon: <Headphones className="w-6 h-6" />,
      gradient: "from-orange-500 to-rose-600",
      glow: "shadow-orange-500/30",
      onClick: () => navigate("/support"),
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
      <div className="w-full h-full min-h-[60vh] flex flex-col items-center justify-center space-y-6 px-4 text-center">
        <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-2">
          <ShieldCheck className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
          Authentication Required
        </h2>
        <p className="text-sm font-medium text-slate-500 max-w-md">
          Please log in to access your profile, manage your account, and enjoy personalized features.
        </p>
        <button
          onClick={() => openLogin()}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-all shadow-lg active:scale-95"
        >
          Login / Register
        </button>
      </div>
    );
  }

  return (
    <div className="w-full pb-20 no-scrollbar space-y-6">

      {/* ── HERO PROFILE CARD ── */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 shadow-2xl border border-slate-800"
      >
        {/* Ambient glows */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/15 rounded-full blur-[80px] pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/15 rounded-full blur-[80px] pointer-events-none -ml-20 -mb-20" />

        <div className="relative z-10 p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">

            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-[1.5rem] p-[3px] bg-gradient-to-br from-blue-400 to-purple-600 shadow-2xl shadow-blue-500/30">
                <div className="w-full h-full rounded-[1.3rem] overflow-hidden bg-slate-900">
                  <img
                    src={userData.avatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Verified badge */}
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-xl shadow-lg flex items-center justify-center border-2 border-slate-900">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left space-y-3">
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-white tracking-tighter leading-none">
                  {userData.name}
                </h1>
                <p className="text-sm text-blue-200/70 font-medium mt-1.5">
                  {userData.email}
                </p>
              </div>

              {/* Stats row */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-3 pt-1">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl">
                  <Star className="w-3.5 h-3.5 text-amber-400" fill="currentColor" />
                  <span className="text-[11px] font-black text-white uppercase tracking-widest">{userData.points} Points</span>
                </div>
                {userData.district && (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-[11px] font-black text-white uppercase tracking-widest">{userData.district}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-[11px] font-black text-emerald-400 uppercase tracking-widest">Verified</span>
                </div>
              </div>

              {/* Edit Profile CTA */}
              <div className="pt-1 flex flex-wrap justify-center sm:justify-start gap-3">
                <button
                  onClick={() => navigate("/edit-profile")}
                  className="px-6 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white rounded-xl font-bold text-xs transition-all border border-white/10 hover:border-white/20 active:scale-95 shadow-lg"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── OPERATIONS GRID ── */}
      <section className="space-y-4 px-1">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-blue-700 rounded-full" />
          <h2 className="text-base font-black text-slate-900 tracking-tighter uppercase">
            Operations Center
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {actionTiles.map((tile, i) => (
            <motion.button
              key={i}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={tile.onClick}
              className="relative flex flex-col items-center text-center p-5 md:p-6 bg-white rounded-[1.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group overflow-hidden"
            >
              {/* Hover glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${tile.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-[1.5rem]`} />

              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${tile.gradient} shadow-lg ${tile.glow} flex items-center justify-center mb-3 text-white transition-transform duration-300 group-hover:scale-110`}>
                {tile.icon}
              </div>
              <h3 className="font-black text-slate-800 tracking-tight uppercase text-[10px] mb-1 leading-tight">
                {tile.title}
              </h3>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest opacity-70 leading-tight">
                {tile.desc}
              </p>
            </motion.button>
          ))}
        </div>
      </section>

      {/* ── SETTINGS & LOGOUT ── */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 px-1">

        {/* List rows */}
        <div className="md:col-span-2 space-y-3">
          {[
            {
              onClick: () => navigate("/notifications"),
              icon: <Bell className="w-5 h-5 text-blue-600" />,
              bg: "bg-blue-50 border-blue-100",
              title: "Notification Station",
              desc: "3 unread alerts waiting",
              badge: "3",
            },
            {
              onClick: () => navigate("/notification-settings"),
              icon: <Settings className="w-5 h-5 text-slate-600" />,
              bg: "bg-slate-50 border-slate-200",
              title: "System Preferences",
              desc: "Configure alerts & display",
              badge: null,
            },
          ].map((row, i) => (
            <button
              key={i}
              onClick={row.onClick}
              className="w-full flex items-center gap-4 p-4 bg-white hover:bg-slate-50 transition-all rounded-2xl border border-slate-100 shadow-sm hover:shadow-md text-left group"
            >
              <div className="relative shrink-0">
                <div className={`w-11 h-11 ${row.bg} border rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform`}>
                  {row.icon}
                </div>
                {row.badge && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[7px] font-black rounded-full flex items-center justify-center border border-white">
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

        {/* Logout */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={onLogout}
          className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-rose-600 to-red-700 border border-rose-700 px-6 py-5 flex flex-col items-center justify-center text-center transition-all shadow-lg shadow-rose-500/20 group min-h-[120px]"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-[1.5rem]" />
          <div className="relative z-10">
            <div className="w-11 h-11 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform">
              <LogOut className="w-5 h-5 text-white" />
            </div>
            <h4 className="text-white font-black text-[11px] uppercase tracking-[0.2em]">Sign Out</h4>
            <p className="text-rose-200 text-[9px] font-bold uppercase mt-1.5 opacity-70">Securely Exit</p>
          </div>
        </motion.button>

      </section>
    </div>
  );
};

export default Profile;
