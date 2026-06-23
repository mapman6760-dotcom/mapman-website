import React from "react";
import { Target, Eye, ShieldCheck, Zap, Users, Award, MapPin, Globe, ArrowRight, Star, TrendingUp } from "lucide-react";
import SEO from "../components/SEO";

const AboutUs = () => {
  return (
    <div className="w-full bg-white min-h-screen animate-fade-in">
      <SEO
        title="About Us | Mapman"
        description="Learn about Mapman — the modern local discovery platform connecting communities to the best businesses around them."
        canonical="https://mapman.in/about-us"
      />

      {/* ── TOP BANNER ── */}
      <div
        className="relative w-[100vw] left-1/2 -translate-x-1/2 overflow-hidden bg-slate-900 bg-cover bg-center"
        style={{ backgroundImage: `url(assets/aboutus.jpeg)` }}
      >
        {/* Text Readability Overlay */}
        <div className="absolute inset-0 bg-slate-900/60" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 border border-white/20 rounded-full mb-6">
            <span className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse" />
            <span className="text-xs font-bold text-white/90 uppercase tracking-widest">Who We Are</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.1] mb-5">
            Connecting You to the
            <span className="block text-cyan-300 mt-1">Heart of Your City</span>
          </h1>
          <p className="text-base md:text-lg text-blue-100 font-medium max-w-2xl mx-auto leading-relaxed">
            Mapman is a modern discovery platform designed to bridge the gap between local businesses and active explorers — making every neighborhood more accessible and alive.
          </p>

          {/* Stats Row */}
          <div className="mt-12 grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {[
              { val: "100+", label: "Verified Shops" },
              { val: "70+", label: "Active Users" },
              { val: "100+", label: "Cities" },
            ].map((s, i) => (
              <div key={i} className="bg-white/10 border border-white/20 rounded-2xl py-4 px-3 backdrop-blur-sm">
                <div className="text-2xl md:text-3xl font-black text-white">{s.val}</div>
                <div className="text-[10px] font-bold text-blue-200 uppercase tracking-widest mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20V60Z" fill="white" />
          </svg>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-14 space-y-20">

        {/* ── INTRO SECTION ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full" />
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Redefining Local Exploration</h2>
            </div>
            <p className="text-slate-500 leading-relaxed font-medium text-base">
              MapMan is a smart local business discovery platform that helps users find nearby shops, services, and businesses through an interactive map experience. We make local exploration easier by connecting people with trusted businesses in their area.
            </p>
            <p className="text-slate-500 leading-relaxed font-medium text-base">
              We also empower businesses to grow their visibility through engaging video promotions and location-based exposure. Our goal is to bridge the gap between local businesses and communities, creating meaningful connections that drive growth, discovery, and success.
            </p>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-blue-600/20 hover:scale-105 active:scale-95">
              Explore Map <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl rotate-2 scale-95" />
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
              alt="Team collaboration"
              className="relative z-10 w-full h-[340px] object-cover rounded-3xl shadow-xl border border-slate-100"
            />
            {/* Floating Badge */}
            <div className="absolute -bottom-5 -left-5 z-20 bg-white rounded-2xl shadow-xl border border-slate-100 px-5 py-3 flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <div className="text-sm font-black text-slate-900">Fast Growing</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Community Platform</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── MISSION & VISION ── */}
        <div>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full mb-4">
              <span className="text-xs font-black text-blue-600 uppercase tracking-widest">Our Purpose</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Mission & Vision</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {[
              {
                icon: Target,
                bgGradient: "bg-gradient-to-br from-blue-500 to-indigo-600",
                hoverShadow: "hover:shadow-[0_20px_40px_rgba(37,99,235,0.12)]",
                lightBg: "bg-blue-50",
                iconColor: "text-blue-600",
                borderColor: "border-blue-100/50",
                label: "Our Mission",
                text: "To help people discover nearby businesses quickly and easily through an interactive map platform. We empower local businesses to increase their visibility and attract more customers through engaging video promotions."
              },
              {
                icon: Eye,
                bgGradient: "bg-gradient-to-br from-emerald-500 to-teal-600",
                hoverShadow: "hover:shadow-[0_20px_40px_rgba(16,185,129,0.12)]",
                lightBg: "bg-emerald-50",
                iconColor: "text-emerald-600",
                borderColor: "border-emerald-100/50",
                label: "Our Vision",
                text: "To become the most trusted platform for local business discovery and digital advertising. We aim to connect communities with businesses while helping every local shop grow and succeed in the digital world."
              }
            ].map((card, i) => (
              <div key={i} className={`group relative overflow-hidden bg-white border border-slate-100 hover:${card.borderColor} rounded-[2rem] p-8 sm:p-10 transition-all duration-500 ${card.hoverShadow} hover:-translate-y-2 cursor-default`}>

                {/* Decorative Background Blob */}
                <div className={`absolute -top-20 -right-20 w-56 h-56 rounded-full ${card.bgGradient} opacity-[0.03] group-hover:opacity-[0.08] blur-3xl transition-all duration-700 group-hover:scale-150`} />

                {/* Top Section */}
                <div className="flex items-start justify-between mb-8 relative z-10">
                  <div className={`w-16 h-16 ${card.lightBg} border border-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500`}>
                    <card.icon className={`w-8 h-8 ${card.iconColor}`} />
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ${card.lightBg}`}>
                    <ArrowRight className={`w-5 h-5 ${card.iconColor}`} />
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-slate-600 transition-all duration-300">
                    {card.label}
                  </h3>
                  <div className={`w-12 h-1.5 ${card.bgGradient} rounded-full mb-6 opacity-70 group-hover:w-24 transition-all duration-500`} />
                  <p className="text-slate-500 leading-relaxed font-medium text-[15px] group-hover:text-slate-600 transition-colors duration-300">
                    {card.text}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* ── SERVICES ── */}
        <div>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full mb-4">
              <span className="text-xs font-black text-blue-600 uppercase tracking-widest">What We Offer</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Services We Offer</h2>
            <p className="text-slate-500 font-medium mt-2">Designed to empower both seekers and creators with premium features.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: MapPin, bg: "bg-blue-50", color: "text-blue-600", border: "border-blue-100", title: "Nearby Business Discovery", desc: "Find trusted local businesses, shops, and services around you with an interactive map." },
              { icon: Zap, bg: "bg-amber-50", color: "text-amber-600", border: "border-amber-100", title: "Business Video Promotions", desc: "Explore engaging videos from registered businesses to learn about their products and services before visiting." },
              { icon: Users, bg: "bg-emerald-50", color: "text-emerald-600", border: "border-emerald-100", title: "Smart Advertising for Local Shops", desc: "Help businesses increase visibility, attract customers, and grow their brand through location-based promotions." },
              { icon: Globe, bg: "bg-violet-50", color: "text-violet-600", border: "border-violet-100", title: "Community & Business Connection", desc: "Bridge the gap between customers and local businesses by creating meaningful local connections." },
            ].map((service, i) => (
              <div key={i} className={`group bg-white border ${service.border} rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-400 hover:-translate-y-1 flex flex-col gap-4`}>
                <div className={`w-12 h-12 ${service.bg} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className={`w-6 h-6 ${service.color}`} />
                </div>
                <div>
                  <h4 className="text-base font-black text-slate-900 tracking-tight mb-2">{service.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── WHY US ── */}
        <div className="relative overflow-hidden bg-white border border-slate-100 rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-full">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Our Edge</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1]">
                Why Businesses & Explorers Choose Mapman
              </h2>
              <p className="text-slate-500 font-medium leading-relaxed text-lg">
                We focus on delivering high-quality visual discoveries, trusted community ratings, and seamless search tools.
              </p>

              <div className="pt-4">
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-all shadow-lg active:scale-95">
                  Join the Community <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { icon: ShieldCheck, bg: "bg-blue-50", color: "text-blue-600", title: "100% Verified Profiles", desc: "We verify listings to ensure phone numbers, locations, and details are accurate." },
                { icon: Award, bg: "bg-amber-50", color: "text-amber-600", title: "Premium Experience", desc: "Enjoy an elegant, responsive UI designed for maximum comfort and speed." },
                { icon: Users, bg: "bg-emerald-50", color: "text-emerald-600", title: "Active Community", desc: "Rely on reviews and video insights uploaded by real local explorers." },
                { icon: Zap, bg: "bg-rose-50", color: "text-rose-600", title: "Hyper-Local Reach", desc: "Find coordinates and distances to shops around you in a couple of clicks." },
              ].map((item, i) => (
                <div key={i} className="group flex flex-col gap-4 p-6 bg-slate-50 hover:bg-white border border-slate-100 hover:border-blue-100 rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-black text-slate-900 text-base tracking-tight">{item.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;
