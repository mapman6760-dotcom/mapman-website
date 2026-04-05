import React, { useState } from "react";
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
    Image as ImageIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const EditShop = () => {
    const navigate = useNavigate();
    const [shopData, setShopData] = useState({
        name: "Airpods shop",
        category: "Resort",
        location: "611, Tajnagar, Pallipalayam, Tamil Nadu, India",
        description: "Airpods Shop",
        whatsapp: "9025821501",
        contact: "9025821501",
        openTime: "9:30 AM",
        closeTime: "6:30 PM",
    });

    /* ─── Reusable field card ─── */
    const Field = ({ label, value, icon: Icon, rightIcon: RightIcon, onChange, placeholder }) => (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="flex items-stretch">
                <div className="w-[3px] bg-blue-600 shrink-0" />
                <div className="flex-1 px-4 py-3.5">
                    <p className="text-[8.5px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">{label}</p>
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 flex-1 min-w-0">
                            {Icon && <Icon className="w-4 h-4 text-slate-300 shrink-0" />}
                            <input
                                type="text"
                                value={value}
                                placeholder={placeholder}
                                onChange={(e) => onChange?.(e.target.value)}
                                className="w-full text-[12.5px] md:text-sm font-semibold text-slate-800 bg-transparent outline-none truncate placeholder:text-slate-200"
                            />
                        </div>
                        {RightIcon && (
                            <RightIcon
                                className={`w-4 h-4 shrink-0 ${RightIcon === Trash2 ? "text-red-400 hover:text-red-500 cursor-pointer" : "text-slate-300"}`}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    /* ─── Section label ─── */
    const SectionLabel = ({ label }) => (
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.35em] px-1 mb-3">{label}</p>
    );

    return (
        <div className="min-h-screen bg-slate-50 pb-28">
            {/* ══════════════════════════════════
          STICKY HEADER
      ══════════════════════════════════ */}
            <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
                <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate(-1)}
                            className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center hover:bg-slate-100 transition-all active:scale-90"
                        >
                            <ChevronLeft className="w-5 h-5 text-slate-800" />
                        </button>
                        <div>
                            <h1 className="text-sm md:text-base font-black text-slate-900 tracking-tight leading-none">Edit Shop Details</h1>
                            <p className="text-[8px] text-blue-600 font-bold uppercase tracking-widest mt-1 opacity-70">Merchant Registry</p>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate("/shop-analytics")}
                        className="flex items-center gap-1.5 text-emerald-600 font-bold text-[10px] hover:opacity-70 transition-opacity"
                    >
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                        analytics
                    </button>
                </div>
            </header>

            {/* ══════════════════════════════════
          PAGE BODY  (max-w-6xl centred)
      ══════════════════════════════════ */}
            <main className="max-w-6xl mx-auto px-4 md:px-8 py-6 md:py-10">

                {/* ── COVER BANNER ── */}
                <div className="relative w-full rounded-3xl overflow-hidden bg-slate-200 shadow-md group mb-8 md:mb-10
                        aspect-[16/9] md:aspect-[21/7]">
                    <img
                        src="https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=1200&fit=crop"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                        alt="Shop Banner"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <button className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                        <Camera className="w-4 h-4" />
                    </button>
                    <span className="absolute bottom-4 left-4 text-[8px] font-black uppercase tracking-[0.4em] text-white/60">Cover Image</span>
                </div>

                {/* ══════════════════════════════════
            TWO-COLUMN GRID  (desktop/tablet)
            Single column on mobile
        ══════════════════════════════════ */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

                    {/* ─── LEFT COLUMN: Core fields ─── */}
                    <div className="space-y-5">

                        {/* Basic Info */}
                        <div>
                            <SectionLabel label="Shop Info" />
                            <div className="space-y-3">
                                <Field
                                    label="Shop Name"
                                    value={shopData.name}
                                    icon={Store}
                                    rightIcon={Trash2}
                                    onChange={(v) => setShopData({ ...shopData, name: v })}
                                />
                                <Field
                                    label="Category"
                                    value={shopData.category}
                                    rightIcon={ChevronDown}
                                    onChange={(v) => setShopData({ ...shopData, category: v })}
                                />
                                <Field
                                    label="Location"
                                    value={shopData.location}
                                    icon={MapPin}
                                    onChange={(v) => setShopData({ ...shopData, location: v })}
                                />
                                <Field
                                    label="Description"
                                    value={shopData.description}
                                    icon={FileText}
                                    onChange={(v) => setShopData({ ...shopData, description: v })}
                                />
                            </div>
                        </div>

                        {/* Contact */}
                        <div>
                            <SectionLabel label="Contact Details" />
                            <div className="space-y-3">
                                <Field
                                    label="WhatsApp Number"
                                    value={shopData.whatsapp}
                                    icon={MessageCircle}
                                    onChange={(v) => setShopData({ ...shopData, whatsapp: v })}
                                />
                                <Field
                                    label="Public / Shop Contact Number"
                                    value={shopData.contact}
                                    icon={Phone}
                                    onChange={(v) => setShopData({ ...shopData, contact: v })}
                                />
                            </div>
                        </div>

                        {/* Timings */}
                        <div>
                            <SectionLabel label="Operating Hours" />
                            <div className="grid grid-cols-2 gap-3">
                                <Field
                                    label="Open time"
                                    value={shopData.openTime}
                                    rightIcon={Clock}
                                    onChange={(v) => setShopData({ ...shopData, openTime: v })}
                                />
                                <Field
                                    label="Close time"
                                    value={shopData.closeTime}
                                    rightIcon={Clock}
                                    onChange={(v) => setShopData({ ...shopData, closeTime: v })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* ─── RIGHT COLUMN: Photo upload + status ─── */}
                    <div className="space-y-5 lg:sticky lg:top-28">

                        {/* Photo Upload */}
                        <div>
                            <SectionLabel label="Shop Photos (upto 4)" />
                            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                                <div className="flex items-stretch">
                                    <div className="w-[3px] bg-blue-600 shrink-0" />
                                    <div className="flex-1 px-4 py-4">
                                        <div className="grid grid-cols-2 gap-3">
                                            {[0, 1, 2, 3].map((i) => (
                                                <div
                                                    key={i}
                                                    className="aspect-square rounded-xl bg-slate-50 border-2 border-dashed border-slate-200
                                     flex items-center justify-center relative cursor-pointer
                                     hover:border-blue-400 hover:bg-blue-50 transition-all group"
                                                >
                                                    <div className="flex flex-col items-center gap-1.5 opacity-25 group-hover:opacity-60 transition-opacity pointer-events-none">
                                                        <ImagePlus className="w-6 h-6 text-slate-600" />
                                                        <span className="text-[7px] font-bold uppercase tracking-widest text-slate-500">Photo {i + 1}</span>
                                                    </div>
                                                    <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Verified badge card */}
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                            <div className="flex items-stretch">
                                <div className="w-[3px] bg-emerald-500 shrink-0" />
                                <div className="flex-1 px-4 py-4 flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                                        <ShieldCheck className="w-5 h-5 text-emerald-600" />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black uppercase tracking-widest text-emerald-600 mb-0.5">Registry Verified</p>
                                        <p className="text-[10px] text-slate-400 font-semibold leading-snug">Merchant authentication secure via Mapman Gateway.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CTA — visible on desktop in sidebar too */}
                        <div className="hidden lg:block">
                            <button
                                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                            >
                                <Save className="w-4 h-4" />
                                Update Shop Details
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* ══════════════════════════════════
          FIXED FOOTER (mobile / tablet)
      ══════════════════════════════════ */}
            <footer className="fixed bottom-0 left-0 right-0 py-4 px-4 bg-white/90 backdrop-blur-xl border-t border-slate-100 z-50 lg:hidden">
                <div className="max-w-6xl mx-auto">
                    <button
                        className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                    >
                        <Save className="w-4 h-4" />
                        Update Shop Details
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default EditShop;
