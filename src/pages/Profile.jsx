import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronRight,
  User,
  Zap,
  ShieldCheck,
  Camera,
  LogOut,
  Bell,
  ArrowLeft,
  Mail,
  CheckCircle2,
  Sparkles,
  Settings,
} from "lucide-react";

const Profile = ({ onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const navigate = useNavigate();
  const avatarInputRef = useRef(null);

  useEffect(() => {
    // Scroll the main content area to top when view changes
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [isEditing, showSupport]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setUserData((prev) => ({ ...prev, avatar: url }));
  };

  // Mock user data
  const [userData, setUserData] = useState({
    name: "Dhineshkumar R",
    email: "dhinesh.dev@mapman.io",
    role: "Premium Account",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
  });

  const actionTiles = [
    {
      title: "Profile Details",
      desc: "Verify Information",
      icon: <img src="https://cdn-icons-png.flaticon.com/128/1077/1077012.png" alt="Profile" className="w-7 h-7 object-contain" />,
      color: "blue",
      onClick: () => setIsEditing(true),
    },
    {
      title: "Shop Details",
      desc: "Active Business",
      icon: <img src="https://cdn-icons-png.flaticon.com/128/869/869432.png" alt="Shop Details" className="w-7 h-7 object-contain" />,
      color: "emerald",
      onClick: () => navigate("/edit-shop"),
    },
    {
      title: "Analytics",
      desc: "Weekly Growth",
      icon: <img src="https://cdn-icons-png.flaticon.com/128/3767/3767315.png" alt="Analytics" className="w-7 h-7 object-contain" />,
      color: "purple",
      onClick: () => navigate("/shop-analytics"),
    },
    {
      title: "Support",
      desc: "24/7 Access",
      icon: <img src="https://cdn-icons-png.flaticon.com/128/4961/4961759.png" alt="Support" className="w-7 h-7 object-contain" />,
      color: "orange",
      onClick: () => setShowSupport(true),
    },
  ];

  if (showSupport) {
    const contactItems = [
      {
        icon: "https://cdn-icons-png.flaticon.com/128/1817/1817646.png",
        title: "SMS",
        label: "Message",
        labelColor: "text-yellow-600 bg-yellow-50 border-yellow-100",
        desc: "Connect With Our Support Team",
        action: () => { },
        iconBg: "bg-yellow-50 border-yellow-200",
      },
      {
        icon: "https://cdn-icons-png.flaticon.com/128/5968/5968534.png",
        title: "Email",
        label: "Email Us",
        labelColor: "text-red-600 bg-red-50 border-red-100",
        desc: "mapman6760@gmail.com",
        action: () => window.open("mailto:mapman6760@gmail.com"),
        iconBg: "bg-red-50 border-red-200",
      },
      {
        icon: "https://cdn-icons-png.flaticon.com/128/724/724664.png",
        title: "Call",
        label: "Phone",
        labelColor: "text-blue-600 bg-blue-50 border-blue-100",
        desc: "+91 9342376760",
        action: () => window.open("tel:+919342376760"),
        iconBg: "bg-blue-50 border-blue-200",
      },
      {
        icon: "https://cdn-icons-png.flaticon.com/128/5968/5968841.png",
        title: "WhatsApp",
        label: "Chat",
        labelColor: "text-green-600 bg-green-50 border-green-100",
        desc: "+91 9342376760",
        action: () => window.open("https://wa.me/919342376760"),
        iconBg: "bg-green-50 border-green-200",
      },
    ];
    const legalItems = [
      {
        icon: "https://cdn-icons-png.flaticon.com/128/8945/8945503.png",
        title: "Privacy Policy",
        desc: "How we handle your data",
        action: () => navigate("/privacy-policy"),
        iconBg: "bg-indigo-50 border-indigo-200",
      },
      {
        icon: "https://cdn-icons-png.flaticon.com/128/12864/12864506.png",
        title: "Terms & Conditions",
        desc: "Rules governing your account",
        action: () => navigate("/terms-conditions"),
        iconBg: "bg-emerald-50 border-emerald-200",
      },
    ];

    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.3 }}
        className="w-full pb-16 px-4 md:px-8 space-y-6"
      >
        {/* ── TOP NAV ── */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowSupport(false)}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-xs font-semibold"
          >
            <div className="w-8 h-8 bg-white border border-slate-200 rounded-xl flex items-center justify-center shadow-sm">
              <ArrowLeft className="w-4 h-4" />
            </div>
            Back
          </button>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Help & Support</span>
        </div>



        {/* ── CONTACT SECTION ── */}
        <div className="space-y-3">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Contact Us</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {contactItems.map((item, i) => (
              <motion.button
                key={i}
                onClick={item.action}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex flex-col items-center text-center bg-white border border-slate-100 rounded-3xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 group gap-3"
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${item.iconBg}`}>
                  <img src={item.icon} alt={item.title} className="w-8 h-8 object-contain" />
                </div>
                {/* Title */}
                <div className="space-y-1">
                  <h4 className="text-sm font-black text-slate-800 tracking-tight">{item.title}</h4>
                  <p className="text-[10px] text-slate-400 font-medium leading-snug">{item.desc}</p>
                </div>
                {/* Label pill */}
                <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${item.labelColor}`}>
                  {item.label}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* ── LEGAL SECTION ── */}
        <div className="space-y-3">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Legal</p>
          <div className="grid grid-cols-2 gap-3">
            {legalItems.map((item, i) => (
              <motion.button
                key={i}
                onClick={item.action}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.07 }}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex flex-col items-center text-center bg-white border border-slate-100 rounded-3xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 group gap-3"
              >
                <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${item.iconBg}`}>
                  <img src={item.icon} alt={item.title} className="w-8 h-8 object-contain" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-black text-slate-800 tracking-tight">{item.title}</h4>
                  <p className="text-[10px] text-slate-400 font-medium leading-snug">{item.desc}</p>
                </div>
                <div className="w-6 h-6 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                  <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-blue-500 transition-colors" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>


        {/* ── FOOTER ── */}
        <div className="flex items-center justify-center gap-2 py-2">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
          <p className="text-[10px] text-slate-400 font-semibold">Mapman Support · Available 24 / 7</p>
        </div>
      </motion.div>
    );
  }

  if (isEditing) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.35 }}
        className="w-full pb-16 px-4 md:px-8 space-y-6"
      >
        {/* ── TOP NAV ── */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsEditing(false)}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-xs font-semibold"
          >
            <div className="w-8 h-8 bg-white border border-slate-200 rounded-xl flex items-center justify-center shadow-sm hover:shadow transition-all">
              <ArrowLeft className="w-4 h-4" />
            </div>
            Back
          </button>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Edit Profile</span>
        </div>

        {/* ── MAIN CARD ── */}
        <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">

          {/* Card Header */}
          <div className="bg-gradient-to-r from-slate-50 to-blue-50/40 border-b border-slate-100 px-6 py-5 flex items-center gap-4">
            {/* Avatar */}
            <div className="relative group/av shrink-0">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-md">
                <img
                  src={userData.avatar}
                  alt="Profile"
                  className="w-full h-full object-cover group-hover/av:scale-110 transition-transform duration-500"
                />
              </div>
              {/* Hidden file input */}
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
                className="absolute -bottom-1.5 -right-1.5 w-6 h-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center shadow transition-colors"
              >
                <Camera className="w-3 h-3" />
              </button>
            </div>

            {/* Header text */}
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-bold text-slate-900 truncate">{userData.name}</h2>
              <p className="text-xs text-slate-400 truncate mt-0.5">{userData.email}</p>
            </div>
          </div>

          {/* Form Body */}
          <div className="p-6 space-y-5">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">Account Information</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" /> Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full h-11 px-4 bg-slate-50 border border-slate-200 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-500/10 rounded-xl outline-none text-sm text-slate-800 font-medium transition-all"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" /> Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full h-11 px-4 bg-slate-50 border border-slate-200 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-500/10 rounded-xl outline-none text-sm text-slate-800 font-medium transition-all"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                />
              </div>
            </div>


          </div>

          {/* Card Footer — Actions */}
          <div className="px-6 pb-6 flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setIsEditing(false)}
              className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98]"
            >
              <CheckCircle2 className="w-4 h-4" />
              Save Changes
            </motion.button>
            <button
              onClick={() => setIsEditing(false)}
              className="h-11 px-6 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-semibold text-sm transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="w-full pb-16 no-scrollbar px-4 md:px-8 space-y-10">
      {/* 1. SLIM PREMIUM PROFILE CARD */}
      <section className="relative group p-1">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2rem] bg-white border border-slate-100 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.04)] p-5 lg:p-6"
        >
          {/* Background Detail */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-slate-50 rounded-full blur-[80px] -mr-24 -mt-24"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-50/50 rounded-full blur-[60px] -ml-16 -mb-16"></div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6 lg:gap-8">
            {/* Avatar Hub */}
            <div className="relative group/avatar cursor-pointer shrink-0">
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-[1.5rem] p-1 bg-gradient-to-br from-blue-600 to-indigo-700 shadow-lg relative transition-all duration-500 group-hover/avatar:scale-105">
                <div className="w-full h-full rounded-[1.3rem] bg-white overflow-hidden relative">
                  <img
                    src={userData.avatar}
                    alt="Profile"
                    className="w-full h-full object-cover group-hover/avatar:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera className="text-white w-5 h-5" />
                  </div>
                </div>
              </div>
              <div className="absolute -right-1.5 -top-1.5 w-7 h-7 bg-blue-600 text-white rounded-lg shadow-lg flex items-center justify-center border-2 border-white rotate-12 group-hover/avatar:rotate-0 transition-transform duration-500">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Text Hub */}
            <div className="flex-1 space-y-3 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <h1 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tighter leading-none">
                  {userData.name}
                </h1>
              </div>
              <p className="text-slate-400 font-bold max-w-xl text-[11px] lg:text-sm leading-relaxed opacity-80 uppercase tracking-widest">
                {userData.email} • Verified Studio Account
              </p>
              <div className="pt-2 flex flex-wrap justify-center sm:justify-start gap-4">
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs transition-all shadow-lg active:scale-95"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. COMPACT MANAGEMENT GRID */}
      <section className="space-y-6 px-1">
        <div className="flex items-center gap-4">
          <div className="w-2 h-7 bg-blue-600 rounded-full"></div>
          <h2 className="text-xl font-black text-slate-900 tracking-tighter uppercase leading-none">
            Operations Center
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {actionTiles.map((tile, i) => (
            <motion.button
              key={i}
              whileHover={{ y: -5, scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={tile.onClick}
              className="flex flex-col items-center text-center p-6 lg:p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group relative overflow-hidden"
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110 border
                                ${tile.color === "blue" ? "bg-blue-50 border-blue-100" : ""}
                                ${tile.color === "emerald" ? "bg-emerald-50 border-emerald-100" : ""}
                                ${tile.color === "purple" ? "bg-purple-50 border-purple-100" : ""}
                                ${tile.color === "orange" ? "bg-orange-50 border-orange-100" : ""}
                            `}
              >
                {tile.icon}
              </div>
              <h3 className="font-black text-slate-800 tracking-tight uppercase text-[11px] mb-1">
                {tile.title}
              </h3>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest opacity-60 leading-tight max-w-[100px]">
                {tile.desc}
              </p>
            </motion.button>
          ))}
        </div>
      </section>

      {/* 3. SLIM SETTINGS & LOGOUT */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-1">
        <div className="md:col-span-2 space-y-3">
          {/* NOTIFICATION STATION — SIMPLE & PROFESSIONAL */}
          <button
            onClick={() => navigate("/notifications")}
            className="w-full flex items-center gap-4 p-5 bg-white hover:bg-slate-50 transition-all rounded-2xl border border-slate-100 shadow-sm hover:shadow-md text-left group"
          >
            {/* Icon with badge */}
            <div className="relative shrink-0">
              <div className="w-11 h-11 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <Bell className="w-5 h-5 text-blue-600" />
              </div>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[7px] font-black rounded-full flex items-center justify-center border border-white">3</span>
            </div>
            {/* Text */}
            <div className="flex-1 min-w-0">
              <h4 className="font-black text-slate-800 text-sm tracking-tight">Notification Station</h4>
              <p className="text-[10px] text-slate-400 font-semibold mt-0.5">3 unread alerts waiting</p>
            </div>
            {/* Arrow */}
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all shrink-0" />
          </button>

          {/* NOTIFICATION SETTINGS — QUICK ACCESS */}
          <button
            onClick={() => navigate("/notification-settings")}
            className="w-full flex items-center gap-4 p-5 bg-white hover:bg-slate-50 transition-all rounded-2xl border border-slate-100 shadow-sm hover:shadow-md text-left group"
          >
            <div className="w-11 h-11 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center group-hover:bg-slate-100 transition-colors">
              <Settings className="w-5 h-5 text-slate-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-black text-slate-800 text-sm tracking-tight">Alert Preferences</h4>
              <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Configure system-wide notifications</p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all shrink-0" />
          </button>

        </div>

        <div className="flex items-center justify-center">
          <motion.button
            onClick={onLogout}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="w-full max-w-[180px] h-20 bg-red-600 hover:bg-red-700 group rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-all duration-500 shadow-lg shadow-red-600/20"
          >
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-white mb-1.5 group-hover:rotate-12 transition-transform relative z-10">
              <LogOut className="w-4 h-4" />
            </div>
            <h4 className="text-white text-[10px] font-black uppercase tracking-widest relative z-10 leading-none">
              Sign Out
            </h4>
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default Profile;
