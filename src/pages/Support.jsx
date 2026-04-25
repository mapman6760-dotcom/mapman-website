import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";

const Support = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const contactItems = [
    {
      icon: "https://cdn-icons-png.flaticon.com/128/1817/1817646.png",
      title: "SMS",
      label: "Message",
      labelColor: "text-yellow-600 bg-yellow-50 border-yellow-100",
      desc: "Connect With Our Support Team",
      action: () => {},
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
    <div className="w-full min-h-screen bg-[#F5F5F5] pb-16 px-4 md:px-8 pt-6 space-y-6">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-xs font-semibold"
        >
          <div className="w-8 h-8 bg-white border border-slate-200 rounded-xl flex items-center justify-center shadow-sm">
            <ArrowLeft className="w-4 h-4" />
          </div>
          Back to Profile
        </button>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Help & Support Active
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3 px-1">
            <div className="w-1.5 h-5 bg-blue-600 rounded-full"></div>
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest italic">
              Contact Transmission
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {contactItems.map((item, i) => (
              <motion.button
                key={i}
                onClick={item.action}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex flex-col items-center text-center bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 group gap-4"
              >
                <div
                  className={`w-16 h-16 rounded-2xl border flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${item.iconBg}`}
                >
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-black text-slate-800 tracking-tight uppercase">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-bold leading-snug">
                    {item.desc}
                  </p>
                </div>
                <span
                  className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${item.labelColor}`}
                >
                  {item.label}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 px-1">
            <div className="w-1.5 h-5 bg-blue-600 rounded-full"></div>
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest italic">
              Legal Registry
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {legalItems.map((item, i) => (
              <motion.button
                key={i}
                onClick={item.action}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.07 }}
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="flex items-center bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 group gap-6 text-left"
              >
                <div
                  className={`w-16 h-16 rounded-2xl border shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${item.iconBg}`}
                >
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-black text-slate-800 tracking-tight uppercase">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-bold mt-0.5 opacity-70">
                    {item.desc}
                  </p>
                </div>
                <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 pt-10 border-t border-slate-200/50">
          <div className="text-center space-y-1">
            <p className="text-[10px] font-black text-slate-950 uppercase tracking-[0.4em] italic leading-none">
              Mapman Support Ecosystem
            </p>
            <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest opacity-40">
              Available 24 / 7 · Global Nodes Active
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
