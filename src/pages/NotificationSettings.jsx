import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Bell,
  BellRing,
  Store,
  Video,
  ChevronLeft,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Settings2,
  ChevronRight,
  Info,
  Trash2,
  Loader2,
} from "lucide-react";

const API_BASE_URL = "https://mapman-production.up.railway.app";

const SaveButton = ({ saved, loading, onClick }) => (
  <motion.button
    whileHover={{ scale: loading ? 1 : 1.01 }}
    whileTap={{ scale: loading ? 1 : 0.99 }}
    onClick={onClick}
    disabled={loading}
    className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center shadow-lg ${saved ? "bg-emerald-500 text-white shadow-emerald-500/20" : loading ? "bg-slate-300 text-white cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20"}`}
  >
    <div className="flex items-center gap-2">
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Synchronizing Matrix...</span>
        </>
      ) : saved ? (
        <>
          <CheckCircle2 className="w-4 h-4 text-emerald-200" />
          <span>Synchronized</span>
        </>
      ) : (
        <span>Update Preferences</span>
      )}
    </div>
  </motion.button>
);

const NotificationSettings = () => {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [settings, setSettings] = useState({
    enableNotifications: true,
    newShop: true,
    newVideo: true,
  });

  React.useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/shop/fetchNotificationPreference`, {
        headers: { "usertoken": token }
      });
      const result = await response.json();
      if (result.status === 200 && result.data) {
        setSettings({
          enableNotifications: result.data.enableNotifications === 1,
          newShop: result.data.newShop === 1,
          newVideo: result.data.newVideo === 1,
        });
      }
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };

  const toggleSetting = (key) => {
    if (key !== "enableNotifications" && !settings.enableNotifications) return;
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    setSaved(false);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const apiBody = {
        enableNotifications: settings.enableNotifications ? 1 : 0,
        newShop: settings.newShop ? 1 : 0,
        newVideo: settings.newVideo ? 1 : 0,
      };

      const response = await fetch(`${API_BASE_URL}/shop/notificationPreference`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "usertoken": token
        },
        body: JSON.stringify(apiBody)
      });

      const result = await response.json();
      if (result.status === 200) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const Toggle = ({ active, onClick, disabled }) => (
    <button
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      className={`relative w-10 h-5 rounded-full transition-all duration-300 focus:outline-none 
                ${disabled ? "bg-slate-100 cursor-not-allowed opacity-50" : active ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.2)]" : "bg-slate-200"}`}
    >
      <motion.div
        animate={{ x: active ? 22 : 3 }}
        className={`absolute top-1 w-3 h-3 rounded-full shadow-sm flex items-center justify-center ${disabled ? "bg-slate-300" : "bg-white"}`}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </button>
  );

  const SettingsItem = ({
    title,
    desc,
    icon: Icon,
    active,
    onClick,
    disabled,
  }) => (
    <div
      className={`p-4 sm:p-5 flex items-center justify-between group transition-all duration-300 border-b border-slate-50 last:border-0 ${disabled ? "opacity-30 cursor-not-allowed grayscale-[0.8]" : "hover:bg-slate-50/50"}`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 
                    ${disabled ? "bg-slate-100 text-slate-300" : active ? "bg-emerald-50 text-emerald-600 border border-emerald-100/50" : "bg-slate-50 text-slate-400"}`}
        >
          <Icon className="w-5 h-5" />
        </div>
        <div className="space-y-0.5">
          <h3 className="font-black text-slate-900 text-[11px] uppercase tracking-wider">
            {title}
          </h3>
          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tight opacity-70">
            {desc}
          </p>
        </div>
      </div>
      <Toggle active={active} onClick={onClick} disabled={disabled} />
    </div>
  );

  return (
    <div className="min-h-screen pb-32">
      {/* ── ALIGNED HEADER ── */}
      <header className="relative h-[150px] bg-slate-950 overflow-hidden flex items-end">
        <div className="absolute inset-0">
          <img
            src="assets/notification-banner.jpg"
            alt="Header Banner"
            className="w-full h-full object-cover opacity-60 scale-105"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div className="absolute inset-0 bg-slate-950/20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-8 md:px-12 pb-6 md:pb-8 text-white">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-10">
            <div className="space-y-3">
              <div className="space-y-1">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2"
                >
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  </div>
                  <p className="text-[8px] font-black text-emerald-400 uppercase tracking-[0.4em]">
                    Mapman Connect
                  </p>
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl md:text-3xl font-black tracking-tighter uppercase italic leading-none"
                >
                  Notification Settings
                </motion.h1>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="hidden md:flex flex-col items-end gap-3 text-right"
            >
              <div className="flex items-center gap-3 px-4 py-2 bg-white/10 border border-white/20 rounded-xl backdrop-blur-xl">
                <Settings2 className="w-3.5 h-3.5 text-emerald-400" />
                <p className="text-[8px] font-black uppercase tracking-widest text-white/70">
                  Secure Session
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* ── OPTIMIZED SETTINGS ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 -mt-4 md:-mt-8 relative z-20 space-y-8 md:space-y-10">
        {/* Main Alert Management Card - MOVED ABOVE THE SPLIT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden mt-10 md:mt-12"
        >
          <div className="px-6 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-[10px] font-black text-slate-950 uppercase tracking-[0.3em] italic">
                Alert Management
              </h2>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                Touchpoint Configuration
              </p>
            </div>
            <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center">
              <BellRing className="w-5 h-5 text-emerald-500" />
            </div>
          </div>

          <div className="divide-y divide-slate-50">
            <SettingsItem
              title="Push Notifications"
              desc="Critical system updates via authenticated push"
              icon={Bell}
              active={settings.enableNotifications}
              onClick={() => toggleSetting("enableNotifications")}
            />
            <SettingsItem
              title="Merchant Discovery"
              desc="Nearby business addition alerts"
              icon={Store}
              active={settings.newShop}
              onClick={() => toggleSetting("newShop")}
              disabled={!settings.enableNotifications}
            />
            <SettingsItem
              title="Visual Highlighting"
              desc="New shop highlights and visual stories"
              icon={Video}
              active={settings.newVideo}
              onClick={() => toggleSetting("newVideo")}
              disabled={!settings.enableNotifications}
            />
          </div>

          <div className="p-6 bg-slate-50/30 flex items-center gap-4 border-t border-slate-50">
            <Info className="w-4 h-4 text-blue-500" />
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">
              Preference modifications propagate across all system nodes
              instantly.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Side Utils & Management */}
          <section className="lg:col-span-12 xl:col-span-8 space-y-6">
            <h3 className="text-[8px] font-black text-slate-400 uppercase tracking-[0.4em] pl-2 italic">
              Administration
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <Link to="/viewed-videos">
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="p-6 bg-white rounded-2xl shadow-lg shadow-slate-200/40 border border-slate-100 relative group overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                        <img
                          src="https://cdn-icons-png.flaticon.com/128/1709/1709973.png"
                          alt="History"
                          className="w-6 h-6 object-contain"
                        />
                      </div>
                      <div>
                        <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-widest italic">
                          History
                        </h4>
                        <p className="text-[9px] text-slate-400 font-bold uppercase opacity-60">
                          Session Trail
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
                  </div>
                </motion.div>
              </Link>

              <motion.button
                whileHover={{ scale: 1.01 }}
                onClick={() => setIsDeleteModalOpen(true)}
                className="p-6 bg-white rounded-2xl shadow-lg shadow-slate-200/40 border border-slate-100 text-left w-full group overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center group-hover:bg-red-100 transition-colors">
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/18006/18006079.png"
                        alt="Delete"
                        className="w-6 h-6 object-contain"
                      />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-widest italic">
                        Terminate
                      </h4>
                      <p className="text-[9px] text-slate-400 font-bold uppercase opacity-60">
                        Identity Deletion
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-red-600 transition-colors" />
                </div>
              </motion.button>
            </div>
          </section>

          {/* Persistent Action Panel */}
          <section
            className="lg:col-span-12 xl:col-span-4 flex flex-col justify-end pb-1"
          >
            <SaveButton saved={saved} loading={loading} onClick={handleSave} />
          </section>
        </div>

        {/* Footer Aligned */}
        <footer className="mt-20 flex flex-col items-center gap-6 pb-20">
          <div className="w-12 h-12 rounded-2xl bg-white shadow-xl shadow-slate-200/50 border border-slate-50 flex items-center justify-center group">
            <ShieldCheck className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-center space-y-1">
            <p className="text-[10px] font-black text-slate-950 uppercase tracking-[0.4em] italic">
              Mapman Secure-X
            </p>
            <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest opacity-40">
              RSA Encryption Active
            </p>
          </div>
        </footer>
      </main>

      {/* ── MODAL ── */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDeleteModalOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-10 text-center space-y-6 border border-slate-100"
            >
              <div className="mx-auto w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/18006/18006079.png"
                  alt="Confirm Delete"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-900 uppercase italic">
                  Confirm?
                </h3>
                <p className="text-[11px] text-slate-500 font-bold uppercase tracking-tight leading-relaxed px-4 opacity-70">
                  identity deletion is{" "}
                  <span className="text-red-600 italic">permanent</span>.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="w-full py-4 bg-red-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em]"
                >
                  Erase Identity
                </button>
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="w-full py-4 bg-slate-50 text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-widest italic"
                >
                  Abort
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationSettings;
