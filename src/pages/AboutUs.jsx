import React from "react";
import { Target, Eye, ShieldCheck, Zap, Users, Award, MapPin, Globe, ArrowRight, Star, TrendingUp } from "lucide-react";
import SEO from "../components/SEO";

const AboutUs = () => {
  return (
    <div className="w-full bg-white min-h-screen animate-fade-in overflow-x-hidden">
      <SEO
        title="About Mapman - Our Vision, Tech Stack & Local Discovery Authority"
        description="Learn about Mapman, the premium video-first local business discovery platform powered by Pafagel Software Solutions. Discover our mission, E-E-A-T guidelines, and verified shop directory."
        canonical="https://mapman.in/about-us"
      />

      {/* ── TOP BANNER ── */}
      <div
        className="relative w-full overflow-hidden bg-slate-900 bg-cover bg-center"
        style={{ backgroundImage: `url(/assets/aboutus.jpeg)` }}
      >
        {/* Text Readability Overlay */}
        <div className="absolute inset-0 bg-slate-950/75" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-28 text-center">

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.1] mb-6">
            Connecting You to the
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 mt-2">Pulse of Your Neighborhood</span>
          </h1>
          <p className="text-base md:text-xl text-slate-300 font-medium max-w-3xl mx-auto leading-relaxed">
            Mapman is a next-generation hyper-local discovery platform designed to bridge the gap between passionate local businesses and active neighborhood explorers—making every city block visual, accessible, and alive.
          </p>

          {/* Stats Row */}
          <div className="mt-14 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[
              { val: "100+", label: "Verified Storefronts" },
              { val: "70+", label: "Daily Active Explorers" },
              { val: "100+", label: "Micro-Hub Cities Mapped" },
            ].map((s, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl py-5 px-4 backdrop-blur-md shadow-xl hover:bg-white/10 transition-all duration-300">
                <div className="text-2xl md:text-4xl font-black text-white">{s.val}</div>
                <div className="text-[9px] md:text-[10px] font-black text-cyan-400 uppercase tracking-widest mt-2">{s.label}</div>
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
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 space-y-24">

        {/* ── INTRO SECTION ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-8 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full" />
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Redefining Local Exploration</h2>
            </div>
            <p className="text-slate-600 leading-relaxed font-medium text-base">
              Developed and powered by the expert team at <strong>Pafagel Software Solutions Pvt Ltd</strong>, Mapman represents the pinnacle of location-intelligent technology. We recognized a major flaw in traditional business directories: dry text reviews and static images fail to capture the true essence, quality, and vibe of a business.
            </p>
            <p className="text-slate-600 leading-relaxed font-medium text-base">
              Mapman solves this by combining interactive live maps with short, engaging shop video reels. We empower users to explore verified local restaurants, resorts, fashion hubs, and essential services visually before visiting. Concurrently, we provide merchants with an incredibly affordable, high-impact digital showcase to capture immediate foot traffic and build local brand authority.
            </p>
            <button className="inline-flex items-center gap-2.5 px-7 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-blue-600/25 hover:scale-105 active:scale-95">
              Launch Map Explorer <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl rotate-2 scale-95 opacity-80" />
            <img
              src="https://static.vecteezy.com/system/resources/previews/003/177/404/large_2x/local-seo-market-strategy-business-search-engine-optimization-free-vector.jpg"
              alt="Local SEO Marketing and Business Discovery Platform Mapman"
              className="relative z-10 w-full h-[360px] object-cover rounded-3xl shadow-2xl border border-slate-100"
            />
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 z-20 bg-white rounded-2xl shadow-xl border border-slate-100 px-6 py-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <div className="text-sm font-black text-slate-900 leading-tight">Verified Trust</div>
                <div className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest mt-0.5">100% Manual Verification</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── MISSION & VISION ── */}
        <div>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full mb-4">
              <span className="text-xs font-black text-blue-600 uppercase tracking-widest">Our Strategic Direction</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Mission & Vision</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* MISSION */}
            <div className="group relative bg-slate-950 rounded-[2.5rem] p-10 sm:p-14 overflow-hidden shadow-2xl shadow-slate-950/20 hover:-translate-y-2 transition-all duration-500 border border-slate-800">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:bg-blue-500/20 transition-colors duration-700" />
              <div className="relative z-10 flex flex-col h-full">
                <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-4">Our Mission</h3>
                <div className="w-16 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mb-8 opacity-80 group-hover:w-28 transition-all duration-500" />
                <p className="text-blue-100/70 leading-relaxed font-medium text-lg">
                  To empower consumers with rapid, visually rich local discoveries using modern mapping and authentic video integrations. We aim to support local economies by giving small-to-medium business merchants an accessible, high-performance platform to tell their story, capture customer interest, and scale their footprint.
                </p>
              </div>
            </div>

            {/* VISION */}
            <div className="group relative bg-white rounded-[2.5rem] p-10 sm:p-14 overflow-hidden shadow-xl shadow-slate-100/50 hover:-translate-y-2 transition-all duration-500 border border-slate-100">
              <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-[80px] translate-y-1/3 translate-x-1/3 pointer-events-none group-hover:bg-emerald-500/10 transition-colors duration-700" />
              <div className="relative z-10 flex flex-col h-full">
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-4">Our Vision</h3>
                <div className="w-16 h-1.5 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full mb-8 opacity-80 group-hover:w-28 transition-all duration-500" />
                <p className="text-slate-500 leading-relaxed font-medium text-lg">
                  To establish Mapman as the global gold standard for hyper-local directory discovery and video commerce. By combining clean geolocation intelligence, strict merchant verification, and rich video aesthetics, we envision a future where every neighborhood shop is easily discoverable, and every local citizen feels instantly connected.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── SERVICES ── */}
        <div>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full mb-4">
              <span className="text-xs font-black text-blue-600 uppercase tracking-widest">Our Offerings</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Services We Offer</h2>
            <p className="text-slate-500 font-medium mt-3 text-sm md:text-base max-w-xl mx-auto">
              Engineered to deliver high utility for neighborhood explorers and maximum ROI for registered business owners.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: MapPin, bg: "bg-blue-50", color: "text-blue-600", border: "border-blue-100", title: "Nearby Business Discovery", desc: "Instantly find verified local services, boutiques, restaurants, and medical centers close to your coordinates using our live interactive map." },
              { icon: Zap, bg: "bg-amber-50", color: "text-amber-600", border: "border-amber-100", title: "Business Video Promotions", desc: "Say goodbye to boring text. Watch premium shop video reels showcasing products, store ambiance, and services in real-time." },
              { icon: Users, bg: "bg-emerald-50", color: "text-emerald-600", border: "border-emerald-100", title: "Smart Local Advertising", desc: "Allow physical storefronts to reach high-intent customers in their specific geographic radius with high-converting video promotions." },
              { icon: Globe, bg: "bg-violet-50", color: "text-violet-600", border: "border-violet-100", title: "Active Community Building", desc: "Build meaningful local connections by allowing explorers to review shops, bookmark favorites, and share visual discoveries." },
            ].map((service, i) => (
              <div key={i} className={`group bg-white border ${service.border} rounded-[2rem] p-8 shadow-sm hover:shadow-xl transition-all duration-400 hover:-translate-y-1.5 flex flex-col gap-5`}>
                <div className={`w-14 h-14 ${service.bg} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shrink-0 shadow-inner`}>
                  <service.icon className={`w-7 h-7 ${service.color}`} />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <h4 className="text-lg font-black text-slate-900 tracking-tight mb-2 leading-snug">{service.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── WHY US ── */}
        <div className="relative overflow-hidden bg-slate-50 border border-slate-100 rounded-[3rem] p-8 md:p-16 shadow-inner">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-5 space-y-6">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.25em] block">Rigorous Trust Standards</span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-[1.15]">
                Why Businesses & Explorers Trust Mapman
              </h2>
              <p className="text-slate-500 font-medium leading-relaxed text-base">
                Unlike unverified, spam-heavy local listing boards, Mapman enforces high-quality video guidelines, manual coordinate audits, and strict E-E-A-T credentials.
              </p>
              <div className="w-20 h-1 bg-blue-600 rounded-full" />
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: ShieldCheck, bg: "bg-blue-100/50", color: "text-blue-600", title: "100% Audited Listings", desc: "Every address coordinates, contact number, and business category is verified by our team." },
                { icon: Award, bg: "bg-amber-100/50", color: "text-amber-600", title: "Premium Visual Engine", desc: "A sleek, lightning-fast UI designed to minimize friction and load dynamic feeds instantly." },
                { icon: Users, bg: "bg-emerald-100/50", color: "text-emerald-600", title: "Authentic Local Crowd", desc: "Enjoy recommendations backed by real local explorers and verified merchant video uploads." },
                { icon: Zap, bg: "bg-rose-100/50", color: "text-rose-600", title: "Hyper-Local Accuracy", desc: "Precision latitude/longitude coordinates mapping ensures you arrive at the exact doorstep." },
              ].map((item, i) => (
                <div key={i} className="group flex flex-col gap-4 p-6 bg-white border border-slate-100 rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="font-black text-slate-900 text-base tracking-tight">{item.title}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed font-medium">{item.desc}</p>
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
