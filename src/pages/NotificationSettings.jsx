import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
    Bell,
    BellRing,
    Store,
    Video,
    Trash2,
    History,
    ShieldCheck,
    CircleCheck,
    AlertCircle,
    ArrowRight
} from "lucide-react";

const SaveButton = ({ saved }) => (
    <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className={`w-full py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center shadow-lg ${saved ? "bg-emerald-500 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
    >
        <span className="flex items-center gap-2">
            {saved ? (
                <>
                    <CircleCheck className="w-4 h-4" />
                    Changes Saved Successfully
                </>
            ) : (
                "Save Notification Changes"
            )}
        </span>
    </motion.button>
);

const NotificationSettings = () => {
    const navigate = useNavigate();
    const [saved, setSaved] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [settings, setSettings] = useState({
        enableNotifications: true,
        newShopAlert: true,
        newVideoAlerts: true
    });

    const toggleSetting = (key) => {
        if (key !== 'enableNotifications' && !settings.enableNotifications) return;
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
        setSaved(false);
    };

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const Toggle = ({ active, onClick, disabled }) => (
        <button
            onClick={!disabled ? onClick : undefined}
            disabled={disabled}
            className={`relative w-14 h-7 rounded-full transition-all duration-300 focus:outline-none ${disabled ? "bg-slate-100 cursor-not-allowed opacity-50" : (active ? "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]" : "bg-slate-200 shadow-inner")
                }`}
        >
            <motion.div
                animate={{ x: active ? 30 : 4 }}
                className={`absolute top-1 w-5 h-5 rounded-full shadow-lg flex items-center justify-center ${disabled ? "bg-slate-300" : "bg-white"}`}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
                {active && !disabled && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
            </motion.div>
        </button>
    );

    const SettingsItem = ({ id, title, desc, icon: Icon, active, onClick, disabled }) => (
        <div
            className={`p-5 sm:p-6 md:p-8 flex items-center justify-between group transition-all duration-300 border-b border-slate-100/50 last:border-0 ${disabled ? "opacity-40 cursor-not-allowed grayscale-[0.5]" : "hover:bg-slate-50/80"}`}
        >
            <div className="flex items-center gap-4 sm:gap-6">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${disabled ? "bg-slate-100 text-slate-300" : (active ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-slate-50 text-slate-400 group-hover:bg-slate-100 border border-transparent")
                    }`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="space-y-1">
                    <h3 className="font-bold text-slate-800 tracking-tight text-xs sm:text-sm uppercase">{title}</h3>
                    <p className="text-[9px] sm:text-[11px] text-slate-400 font-medium uppercase tracking-wider leading-none">{desc}</p>
                </div>
            </div>
            <Toggle active={active} onClick={onClick} disabled={disabled} />
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FDFDFE] pb-32">
            {/* ── DESIGNER HEADER ── */}
            <header className="relative h-48 md:h-60 bg-slate-950 overflow-hidden flex items-end">
                {/* Custom Banner Background */}
                <div className="absolute inset-0">
                    <img
                        src="assets/notification-banner.jpg"
                        alt="Header Banner"
                        className="w-full h-full object-cover opacity-60"
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                    {/* Contrast Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    <div className="absolute inset-0 bg-slate-950/20" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-8 md:px-12 pb-10 md:pb-16 text-white">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-10">
                        <div className="space-y-4 sm:space-y-6">
                            <div className="space-y-2">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-2"
                                >
                                    <div className="flex gap-1">
                                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                        <span className="w-1.5 h-1.5 bg-emerald-500/50 rounded-full" />
                                        <span className="w-1.5 h-1.5 bg-emerald-500/20 rounded-full" />
                                    </div>
                                    <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.4em]">Privacy & Systems</p>
                                </motion.div>
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic leading-none"
                                >
                                    Notification <span className="relative">
                                        Settings
                                        <span className="absolute bottom-0 left-0 w-full h-1 bg-emerald-600/50 -rotate-1 rounded-full" />
                                    </span>
                                </motion.h1>
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="hidden md:flex flex-col items-end gap-3 text-right"
                        >
                            <div className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
                                <AlertCircle className="w-4 h-4 text-emerald-400" />
                                <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest leading-none">Global Sync Active</p>
                            </div>
                            <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.5em]">Mapman Ecosystem v8.4.2</p>
                        </motion.div>
                    </div>
                </div>
            </header>

            {/* ── MAIN SETTINGS ARCHITECTURE ── */}
            <main className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 -mt-4 md:-mt-6 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 xl:grid-cols-12 gap-8 md:gap-10 xl:gap-12">

                    {/* Primary Control Hub */}
                    <section className="lg:col-span-7 xl:col-span-8 space-y-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.06)] border border-slate-50 overflow-hidden"
                        >
                            <div className="px-8 py-8 border-b border-slate-50 bg-slate-50/30 flex items-center justify-between">
                                <div className="space-y-1">
                                    <h2 className="text-xs font-black text-slate-900 uppercase tracking-[0.3em]">Alert Configuration</h2>
                                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none">Manage how we reach you</p>
                                </div>
                                <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center">
                                    <BellRing className="w-4 h-4 text-emerald-600" />
                                </div>
                            </div>

                            <div className="divide-y divide-slate-50">
                                <SettingsItem
                                    id="enableNotifications"
                                    title="Push Notifications"
                                    desc="Receive real-time system alerts on your device"
                                    icon={Bell}
                                    active={settings.enableNotifications}
                                    onClick={() => toggleSetting('enableNotifications')}
                                />
                                <SettingsItem
                                    id="newShopAlert"
                                    title="Nearby Shop Alerts"
                                    desc="Get notified when new merchants join the map"
                                    icon={Store}
                                    active={settings.newShopAlert}
                                    onClick={() => toggleSetting('newShopAlert')}
                                    disabled={!settings.enableNotifications}
                                />
                                <SettingsItem
                                    id="newVideoAlerts"
                                    title="Video Stream Updates"
                                    desc="Notifications for high-velocity visual content"
                                    icon={Video}
                                    active={settings.newVideoAlerts}
                                    onClick={() => toggleSetting('newVideoAlerts')}
                                    disabled={!settings.enableNotifications}
                                />
                            </div>
                        </motion.div>

                        <div className="lg:hidden" onClick={handleSave}>
                            <SaveButton saved={saved} />
                        </div>
                    </section>

                    {/* Secondary Utility Stack */}
                    <section className="lg:col-span-5 xl:col-span-4 space-y-10">
                        <div className="space-y-6">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] pl-6">System Management</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                                {/* Viewed Videos */}
                                <Link to="/viewed-videos" className="block w-full">
                                    <motion.div
                                        whileHover={{ y: -8, scale: 1.01 }}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="w-full text-left p-7 bg-white rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] hover:shadow-[0_60px_120px_-30px_rgba(0,128,128,0.15)] border border-slate-50 group relative overflow-hidden transition-all duration-500 cursor-pointer"
                                    >
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50/40 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700 blur-2xl" />

                                        <div className="relative z-10 flex flex-col gap-6">
                                            <div className="w-16 h-16 bg-white shadow-[0_12px_25px_-8px_rgba(0,0,0,0.1)] rounded-[1.5rem] flex items-center justify-center p-4 group-hover:rotate-6 transition-all duration-500">
                                                <img
                                                    src="https://cdn-icons-png.flaticon.com/128/1182/1182705.png"
                                                    alt="History"
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider leading-none">Viewed History</h4>
                                                    <div className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                                                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-inherit" />
                                                    </div>
                                                </div>
                                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none opacity-60">Supervise your neural activity logs</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>

                                {/* Delete Account */}
                                <motion.button
                                    whileHover={{ y: -8, scale: 1.01 }}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 }}
                                    onClick={() => setIsDeleteModalOpen(true)}
                                    className="w-full text-left p-7 bg-white rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] hover:shadow-[0_60px_120px_-30px_rgba(239,68,68,0.12)] border border-slate-50 group relative overflow-hidden transition-all duration-500"
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-50/40 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700 blur-2xl" />

                                    <div className="relative z-10 flex flex-col gap-6">
                                        <div className="w-16 h-16 bg-white shadow-[0_12px_25px_-8px_rgba(0,0,0,0.1)] rounded-[1.5rem] flex items-center justify-center p-4 group-hover:-rotate-6 transition-all duration-500">
                                            <img
                                                src="https://cdn-icons-png.flaticon.com/128/6861/6861362.png"
                                                alt="Delete"
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <h4 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider leading-none">Account Termination</h4>
                                                <div className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
                                                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-inherit" />
                                                </div>
                                            </div>
                                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none opacity-60">Erase your identity and data logs</p>
                                        </div>
                                    </div>
                                </motion.button>
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="hidden lg:block px-4 py-8 bg-emerald-50/30 rounded-[2.5rem] border border-emerald-100/50"
                        >
                            <div className="flex flex-col gap-8">
                                <div className="space-y-2 px-4">
                                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Master Key Required</p>
                                    <p className="text-[11px] text-slate-500 font-medium">Any changes made here will propagate across all your linked devices instantly.</p>
                                </div>
                                <div onClick={handleSave}>
                                    <SaveButton saved={saved} />
                                </div>
                            </div>
                        </motion.div>
                    </section>
                </div>

                {/* Secure Badge Footer */}
                <footer className="mt-32 flex flex-col items-center gap-6">
                    <motion.div
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.8, ease: "anticipate" }}
                        className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shadow-sm"
                    >
                        <ShieldCheck className="w-6 h-6 text-blue-600" />
                    </motion.div>
                    <div className="text-center space-y-2">
                        <div className="flex items-center justify-center gap-3">
                            <div className="h-[1px] w-8 bg-slate-200" />
                            <p className="text-[10px] font-black text-slate-900 uppercase tracking-[0.4em] italic leading-none">Secured by Mapman-X9</p>
                            <div className="h-[1px] w-8 bg-slate-200" />
                        </div>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest opacity-50 leading-none">End-to-End Encryption Protocol Active</p>
                    </div>
                </footer>
            </main>

            {/* ── ACCOUNT TERMINATION MODAL ── */}
            <AnimatePresence>
                {isDeleteModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        {/* Backdrop Blur */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsDeleteModalOpen(false)}
                            className="absolute inset-0 bg-slate-950/40 backdrop-blur-md"
                        />

                        {/* Modal Container */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-sm bg-white rounded-[2rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)] border border-slate-100 overflow-hidden p-8 text-center space-y-6"
                        >
                            {/* Graphic Hub */}
                            <div className="relative mx-auto w-16 h-16 flex items-center justify-center">
                                <div className="absolute inset-0 bg-red-500/10 rounded-full animate-ping" />
                                <div className="relative w-full h-full bg-red-50 rounded-full flex items-center justify-center border border-red-100/50">
                                    <Trash2 className="w-7 h-7 text-red-500" />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="space-y-2">
                                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight italic">Terminate Identity?</h3>
                                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                                    This action is <span className="font-bold text-red-500 uppercase tracking-widest italic">irreversible</span>.
                                    All your neural data logs will be permanently erased.
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-2">
                                <button
                                    onClick={() => setIsDeleteModalOpen(false)}
                                    className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-black text-[9px] uppercase tracking-[0.2em] transition-all shadow-lg shadow-red-500/25 active:scale-[0.98]"
                                >
                                    Confirm Termination
                                </button>
                                <button
                                    onClick={() => setIsDeleteModalOpen(false)}
                                    className="w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-400 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all active:scale-[0.98]"
                                >
                                    Abort Session
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

