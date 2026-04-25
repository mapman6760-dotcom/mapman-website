import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronRight,
  ShieldCheck,
  Camera,
  Bell,
  ArrowLeft,
  Settings,
  Loader2,
} from "lucide-react";
import { getProfile } from "../api/shop";

const API_BASE_URL = "https://mapman-production.up.railway.app";

const Profile = ({ onLogout }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // User data state
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
    fetchProfileData();
  }, []);

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
            ? `${API_BASE_URL}${data.profilePic}`
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
      icon: (
        <img
          src="https://cdn-icons-png.flaticon.com/128/1077/1077012.png"
          alt="Profile"
          className="w-7 h-7 object-contain"
        />
      ),
      color: "blue",
      onClick: () => navigate("/edit-profile"),
    },
    {
      title: "Shop Details",
      desc: "Active Business",
      icon: (
        <img
          src="https://cdn-icons-png.flaticon.com/128/869/869432.png"
          alt="Shop Details"
          className="w-7 h-7 object-contain"
        />
      ),
      color: "emerald",
      onClick: () => navigate("/edit-shop"),
    },
    {
      title: "Analytics",
      desc: "Weekly Growth",
      icon: (
        <img
          src="https://cdn-icons-png.flaticon.com/128/3767/3767315.png"
          alt="Analytics"
          className="w-7 h-7 object-contain"
        />
      ),
      color: "purple",
      onClick: () => navigate("/shop-analytics"),
    },
    {
      title: "Support",
      desc: "24/7 Access",
      icon: (
        <img
          src="https://cdn-icons-png.flaticon.com/128/4961/4961759.png"
          alt="Support"
          className="w-7 h-7 object-contain"
        />
      ),
      color: "orange",
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
          <div className="absolute top-0 right-0 w-48 h-48 bg-slate-50 rounded-full blur-[80px] -mr-24 -mt-24"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-50/50 rounded-full blur-[60px] -ml-16 -mb-16"></div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6 lg:gap-8">
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

            <div className="flex-1 space-y-3 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <h1 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tighter leading-none">
                  {userData.name}
                </h1>
              </div>
              <p className="text-slate-400 font-bold max-w-xl text-[11px] lg:text-sm leading-relaxed opacity-80 uppercase tracking-widest">
                {userData.email} • {userData.points} Points
              </p>
              <div className="pt-2 flex flex-wrap justify-center sm:justify-start gap-4">
                <button
                  onClick={() => navigate("/edit-profile")}
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
              className={`flex flex-col items-center text-center p-6 lg:p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group relative overflow-hidden`}
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
          <button
            onClick={() => navigate("/notifications")}
            className="w-full flex items-center gap-4 p-5 bg-white hover:bg-slate-50 transition-all rounded-2xl border border-slate-100 shadow-sm hover:shadow-md text-left group"
          >
            <div className="relative shrink-0">
              <div className="w-11 h-11 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <Bell className="w-5 h-5 text-blue-600" />
              </div>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[7px] font-black rounded-full flex items-center justify-center border border-white">
                3
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-black text-slate-800 text-sm tracking-tight">
                Notification Station
              </h4>
              <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
                3 unread alerts waiting
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all shrink-0" />
          </button>

          <button
            onClick={() => navigate("/notification-settings")}
            className="w-full flex items-center gap-4 p-5 bg-white hover:bg-slate-50 transition-all rounded-2xl border border-slate-100 shadow-sm hover:shadow-md text-left group"
          >
            <div className="w-11 h-11 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center group-hover:bg-slate-100 transition-colors">
              <Settings className="w-5 h-5 text-slate-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-black text-slate-800 text-sm tracking-tight">
                System Preferences
              </h4>
              <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
                Configure alerts & display
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all shrink-0" />
          </button>
        </div>

        <button
          onClick={onLogout}
          className="group relative overflow-hidden bg-red-600 border border-red-700 rounded-3xl px-6 py-5 flex flex-col items-center justify-center text-center transition-all hover:bg-red-700"
        >
          <div className="w-12 h-12 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <img
              src="https://cdn-icons-png.flaticon.com/128/1828/1828427.png"
              alt="Logout"
              className="w-6 h-6 invert opacity-90"
            />
          </div>

          <h4 className="text-white font-black text-[11px] uppercase tracking-[0.2em]">
            Sign Out
          </h4>

          <p className="text-red-100 text-[9px] font-bold uppercase mt-2 opacity-70">
            Securely Sign Out
          </p>
        </button>
      </section>
    </div>
  );
};

export default Profile;
