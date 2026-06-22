import React from "react";
import { motion } from "framer-motion";
import { Target, Eye, ShieldCheck, Zap, Users, Award, MapPin, Globe } from "lucide-react";

const AboutUs = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20"
    >
      {/* ── HERO ── */}
      <motion.div variants={itemVariants} className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 border border-slate-800 shadow-2xl p-10 md:p-16 text-center">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -mr-32 -mt-32 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] -ml-32 -mb-32 pointer-events-none" />
        <div className="h-[2px] w-full absolute top-0 left-0 bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full">
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            <span className="text-xs font-black text-blue-300 uppercase tracking-[0.3em]">Who We Are</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tighter leading-tight">
            Connecting You to the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Heart of Your City</span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed font-medium">
            Mapman is a modern discovery platform designed to bridge the gap between local businesses and active explorers. We make finding and experiencing the best your city has to offer effortless and engaging.
          </p>
        </div>
      </motion.div>

      {/* ── INTRO + IMAGE ── */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-7 bg-gradient-to-b from-blue-400 to-blue-700 rounded-full" />
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter">Redefining Local Exploration</h2>
          </div>
          <p className="text-slate-500 leading-relaxed font-medium">
            Founded with a vision to empower local commerce, Mapman combines interactive mapping, video feeds, and curated categories. We believe every local shop has a unique story to tell, and we provide the stage for those stories to be seen and heard by the community.
          </p>
          <p className="text-slate-500 leading-relaxed font-medium">
            Whether you are looking for a hidden dining gem, a trusted healthcare provider, or a cozy weekend resort, Mapman guides you there with real-time accuracy and rich visual content.
          </p>

          <div className="grid grid-cols-2 gap-5 pt-2">
            {[
              { val: "50K+", label: "Verified Shops" },
              { val: "20K+", label: "Active Users" },
            ].map((stat, i) => (
              <div key={i} className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 p-5 shadow-xl">
                <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-full blur-[40px]" />
                <h4 className="text-3xl font-black text-white tracking-tighter">{stat.val}</h4>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-blue-600/10 rounded-[2.5rem] blur-2xl transform rotate-3 scale-95" />
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
            alt="Team collaboration"
            className="relative z-10 w-full h-[350px] object-cover rounded-[2rem] shadow-2xl border border-slate-200"
          />
        </div>
      </motion.div>

      {/* ── MISSION & VISION ── */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            icon: Target,
            gradient: "from-blue-500 to-blue-700",
            glow: "bg-blue-600/10",
            label: "Our Mission",
            text: "To build a trusted, highly accessible digital ecosystem that helps local businesses thrive while offering consumers a seamless, visual, and highly reliable way to explore their neighborhoods."
          },
          {
            icon: Eye,
            gradient: "from-emerald-500 to-teal-700",
            glow: "bg-emerald-600/10",
            label: "Our Vision",
            text: "To be the leading global location-based discovery platform, where physical and digital integration creates a more connected, vibrant, and prosperous community for everyone."
          }
        ].map((card, i) => (
          <div key={i} className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 p-8 shadow-xl group hover:-translate-y-1 transition-all duration-500">
            <div className={`absolute top-0 right-0 w-40 h-40 ${card.glow} rounded-full blur-[80px] -mr-10 -mt-10 pointer-events-none`} />
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-lg mb-5 text-white`}>
              <card.icon className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-white uppercase tracking-tight mb-3">{card.label}</h3>
            <p className="text-slate-400 leading-relaxed font-medium text-sm">{card.text}</p>
          </div>
        ))}
      </motion.div>

      {/* ── SERVICES ── */}
      <motion.div variants={itemVariants} className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full">
            <span className="text-xs font-black text-blue-600 uppercase tracking-widest">What We Offer</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Services We Offer</h2>
          <p className="text-slate-500 font-medium">Designed to empower both seekers and creators with premium features.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: MapPin, gradient: "from-blue-500 to-blue-700", glow: "shadow-blue-500/20", title: "Map Explorer", desc: "Dynamic, real-time map integration helping you discover verified local businesses around your location." },
            { icon: Zap, gradient: "from-amber-500 to-orange-600", glow: "shadow-amber-500/20", title: "Video Feeds", desc: "Explore businesses visually through short clips and reviews, bringing the marketplace to life." },
            { icon: Users, gradient: "from-emerald-500 to-teal-700", glow: "shadow-emerald-500/20", title: "Merchant Hub", desc: "Empower business owners to register, customize listings, showcase products, and analyze traffic." },
            { icon: Globe, gradient: "from-violet-500 to-purple-700", glow: "shadow-violet-500/20", title: "Smart Categories", desc: "Browse a highly organized ecosystem of services, from dining and hospitality to wellness and fuel." },
          ].map((service, i) => (
            <div key={i} className="group relative overflow-hidden bg-white rounded-[1.5rem] border border-slate-100 p-6 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 flex flex-col gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg ${service.glow} text-white group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-6 h-6" />
              </div>
              <h4 className="text-base font-black text-slate-900 tracking-tight">{service.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">{service.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── WHY US ── */}
      <motion.div variants={itemVariants} className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 border border-slate-800 p-8 md:p-12 lg:p-16 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -mr-32 -mt-32 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] -ml-32 -mb-32 pointer-events-none" />
        <div className="h-[2px] w-full absolute top-0 left-0 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-xs font-black text-blue-300 uppercase tracking-[0.25em]">Our Edge</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter leading-tight">
              Why Businesses & Explorers Choose Mapman
            </h2>
            <p className="text-slate-400 font-medium leading-relaxed">
              We focus on delivering high-quality visual discoveries, trusted community ratings, and seamless search tools.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: ShieldCheck, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20", title: "100% Verified Profiles", desc: "We verify listings to ensure phone numbers, locations, and details are accurate." },
              { icon: Award, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20", title: "Premium Experience", desc: "Enjoy an elegant, responsive UI designed for maximum comfort and speed." },
              { icon: Users, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20", title: "Active Community", desc: "Rely on reviews, ratings, and video insights uploaded by real local explorers." },
              { icon: Zap, color: "text-rose-400", bg: "bg-rose-500/10 border-rose-500/20", title: "Hyper-Local Reach", desc: "Find coordinates and distances to shops around you in a couple of clicks." },
            ].map((item, i) => (
              <div key={i} className={`flex gap-4 items-start p-5 rounded-2xl border ${item.bg} bg-white/5 backdrop-blur-sm group hover:bg-white/10 transition-all`}>
                <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center shrink-0`}>
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-black text-white text-sm tracking-tight">{item.title}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AboutUs;
