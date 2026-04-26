import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Film,
  Utensils,
  Hospital,
  Beer,
  ShoppingBag,
  Shirt,
  Trees,
  Fuel,
  Waves,
  Hotel,
  Grid,
  Zap,
  Star,
  Users,
  Compass,
  ArrowUpRight,
  Play,
  Search,
  MapPin,
  Smartphone,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

const Home = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const iconMap = {
    theater: <Film />,
    restaurant: <Utensils />,
    hospital: <Hospital />,
    bar: <Beer />,
    grocery: <ShoppingBag />,
    textile: <Shirt />,
    resort: <Trees />,
    bunk: <Fuel />,
    spa: <Waves />,
    hotel: <Hotel />,
    others: <Grid />,
  };

  const colorMap = {
    theater: {
      bg: "bg-rose-500/10",
      text: "text-rose-600",
      dot: "bg-rose-500",
      glow: "shadow-rose-500/20",
      card: "from-rose-50 via-pink-50/60 to-white",
      border: "border-rose-100",
    },
    restaurant: {
      bg: "bg-orange-500/10",
      text: "text-orange-600",
      dot: "bg-orange-500",
      glow: "shadow-orange-500/20",
      card: "from-orange-50 via-amber-50/60 to-white",
      border: "border-orange-100",
    },
    hospital: {
      bg: "bg-blue-500/10",
      text: "text-blue-600",
      dot: "bg-blue-500",
      glow: "shadow-blue-500/20",
      card: "from-blue-50 via-sky-50/60 to-white",
      border: "border-blue-100",
    },
    bar: {
      bg: "bg-amber-500/10",
      text: "text-amber-600",
      dot: "bg-amber-500",
      glow: "shadow-amber-500/20",
      card: "from-amber-50 via-yellow-50/60 to-white",
      border: "border-amber-100",
    },
    grocery: {
      bg: "bg-emerald-500/10",
      text: "text-emerald-600",
      dot: "bg-emerald-500",
      glow: "shadow-emerald-500/20",
      card: "from-emerald-50 via-green-50/60 to-white",
      border: "border-emerald-100",
    },
    textile: {
      bg: "bg-indigo-500/10",
      text: "text-indigo-600",
      dot: "bg-indigo-500",
      glow: "shadow-indigo-500/20",
      card: "from-indigo-50 via-purple-50/60 to-white",
      border: "border-indigo-100",
    },
    resort: {
      bg: "bg-teal-500/10",
      text: "text-teal-600",
      dot: "bg-teal-500",
      glow: "shadow-teal-500/20",
      card: "from-teal-50 via-cyan-50/60 to-white",
      border: "border-teal-100",
    },
    bunk: {
      bg: "bg-red-500/10",
      text: "text-red-600",
      dot: "bg-red-500",
      glow: "shadow-red-500/20",
      card: "from-red-50 via-rose-50/60 to-white",
      border: "border-red-100",
    },
    spa: {
      bg: "bg-cyan-500/10",
      text: "text-cyan-600",
      dot: "bg-cyan-500",
      glow: "shadow-cyan-500/20",
      card: "from-cyan-50 via-sky-50/60 to-white",
      border: "border-cyan-100",
    },
    hotel: {
      bg: "bg-violet-500/10",
      text: "text-violet-600",
      dot: "bg-violet-500",
      glow: "shadow-violet-500/20",
      card: "from-violet-50 via-purple-50/60 to-white",
      border: "border-violet-100",
    },
    others: {
      bg: "bg-slate-500/10",
      text: "text-slate-600",
      dot: "bg-slate-500",
      glow: "shadow-slate-500/20",
      card: "from-slate-50 via-gray-50/60 to-white",
      border: "border-slate-100",
    },
  };

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "https://mapman-production.up.railway.app/shop/home",
          {
            headers: { usertoken: token },
          },
        );
        const result = await response.json();
        if (result.status === 200) {
          const data = result.data.category || result.data.categories || [];
          setCategories(data);
        }
      } catch (error) {
        console.error("Error fetching home data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="space-y-16 lg:space-y-24 py-6">
      {/* --- SLEEK COMPACT BRAND BANNER --- */}
      <section className="relative group px-1">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl lg:rounded-3xl bg-slate-900 border border-slate-800 shadow-xl"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
          <div className="absolute -top-[20%] -right-[5%] w-[60%] h-[140%] bg-blue-600/20 blur-[80px] rounded-full animate-pulse"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center min-h-[160px] lg:min-h-[200px] p-6 lg:p-10 gap-8">
            <div className="flex-1 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-[10px] font-black uppercase tracking-widest">
                <Zap className="w-3 h-3 fill-current" />
                MapMan Exclusive Benefits
              </div>
              <h1 className="text-2xl lg:text-4xl font-black text-white tracking-tighter leading-tight">
                Your access to top rated{" "}
                <span className="text-blue-400"> Businesses</span>
              </h1>
              <p className="text-slate-400 text-xs lg:text-sm font-medium max-w-lg hidden sm:block">
                Discover, book, and experience the finest your city has to
                offer—all in one place.
              </p>
            </div>

            <div className="flex items-center gap-4 lg:gap-6 shrink-0">
              <button
                onClick={() => onSelectCategory("")}
                className="group px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-primary-600/20 flex items-center gap-2"
              >
                Explorer{" "}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="h-10 w-[1px] bg-white/10 hidden lg:block"></div>
              <div className="hidden lg:flex items-center gap-4">
                <div className="text-center">
                  <p className="text-lg font-black text-white leading-none">
                    50K+
                  </p>
                  <p className="text-[8px] text-slate-500 font-bold uppercase tracking-wider mt-1">
                    Businesses
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-black text-white leading-none">
                    20K+
                  </p>
                  <p className="text-[8px] text-slate-500 font-bold uppercase tracking-wider mt-1">
                    Users
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- COMPACT PROMOTION SECTION --- */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 px-1">
        <motion.div
          whileHover={{ y: -5 }}
          transition={{ duration: 0.4 }}
          className="relative group h-64 lg:h-72 rounded-2xl lg:rounded-[2.5rem] overflow-hidden bg-[#0a0a0a] border border-white/5 shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80"
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
            alt="Promo 1"
          />
          <div className="relative z-20 h-full flex flex-col justify-center p-8 lg:p-10 space-y-3 lg:space-y-4">
            <span className="px-2.5 py-1 bg-primary-600 rounded-lg text-white text-[9px] lg:text-[10px] font-black uppercase tracking-widest w-fit">
              Merchant Special
            </span>
            <h3 className="text-2xl lg:text-3xl font-black text-white tracking-tighter leading-tight">
              Boost Your Shop's <br /> With Mapman
            </h3>
            <p className="text-slate-400 text-xs lg:text-sm font-medium max-w-[240px]">
              Best and affordable way to get new customers.
            </p>
            <button className="flex items-center gap-2 text-primary-400 font-black text-[10px] lg:text-xs uppercase tracking-widest group/btn">
              Get Started Now{" "}
              <ArrowUpRight className="w-3.5 lg:w-4 h-3.5 lg:h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
            </button>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          transition={{ duration: 0.4 }}
          className="relative group h-64 lg:h-72 rounded-2xl lg:rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-900 border border-white/5 shadow-2xl shadow-blue-900/10"
        >
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>
          <div className="relative z-20 h-full flex flex-col justify-center p-8 lg:p-10 space-y-3 lg:space-y-4">
            <span className="px-2.5 py-1 bg-white/10 backdrop-blur-md rounded-lg text-white text-[9px] lg:text-[10px] font-black uppercase tracking-widest w-fit">
              Live Tracking
            </span>
            <h3 className="text-2xl lg:text-3xl font-black text-white tracking-tighter leading-tight">
              Upload video <br />& Promote
            </h3>
            <p className="text-blue-100 text-xs lg:text-sm font-medium max-w-[240px] opacity-80">
              Best and affordable way to get new customers.
            </p>
            <button
              onClick={() => onSelectCategory("")}
              className="flex items-center gap-2 text-white font-black text-[10px] lg:text-xs uppercase tracking-widest group/btn underline decoration-white/30 underline-offset-8"
            >
              Open Map Explorer{" "}
              <MapPin className="w-3.5 lg:w-4 h-3.5 lg:h-4 group-hover/btn:scale-125 transition-transform" />
            </button>
          </div>
          <div className="absolute right-[-5%] bottom-[-5%] w-1/2 h-4/5">
            <img
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80"
              className="w-full h-full object-cover rounded-tl-2xl lg:rounded-tl-[3rem] border-t border-l border-white/20 group-hover:rotate-[-2deg] transition-transform duration-700"
              alt="Promo 2"
            />
          </div>
        </motion.div>
      </section>

      {/* --- PREMIUM CATEGORIES HUB --- */}
      <section className="space-y-12 lg:space-y-16 px-1 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 lg:gap-10">
          <div className="space-y-4 lg:space-y-6">
            <div className="flex items-center gap-4">
              <span className="w-12 h-1.5 bg-primary-600 rounded-full"></span>
              <p className="text-primary-600 font-black text-xs lg:text-sm uppercase tracking-[0.4em]">
                Browse Ecosystem
              </p>
            </div>
            <h4 className="text-2xl lg:text-4xl font-black text-slate-900 tracking-tighter">
              Explore by Categories
            </h4>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 lg:gap-8">
          {categories
            .filter((cat) => cat.categoryImage != null)
            .map((cat, i) => {
              const name = cat.categoryName.toLowerCase();
              const colors = colorMap[name] || colorMap.others;
              const icon = iconMap[name] || iconMap.others;
              const imageUrl = cat.categoryImage
                ? `https://mapman-production.up.railway.app${cat.categoryImage}`
                : null;

              return (
                <motion.div
                  key={cat.id || i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  onClick={() =>
                    onSelectCategory(cat.categoryName.toLowerCase())
                  }
                  className="group cursor-pointer"
                >
                  <div className="relative h-full bg-white rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.04)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-700 overflow-hidden flex flex-col">
                    <div
                      className={`absolute top-0 left-0 w-full h-[5px] ${colors.dot} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />

                    <div className="p-6 lg:p-8 flex flex-col items-center flex-1 gap-6">
                      <div
                        className={`relative w-24 h-24 rounded-3xl ${colors.bg} flex items-center justify-center transition-all duration-700 shadow-inner`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent z-10" />
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={cat.categoryName}
                            className="w-14 h-14 object-contain filter drop-shadow-xl relative z-20 group-hover:scale-125 transition-transform duration-700"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.style.display = "none";
                              e.target.nextSibling.style.display = "block";
                            }}
                          />
                        ) : null}
                        <div
                          className={
                            imageUrl
                              ? "hidden"
                              : "block relative z-20 text-slate-800 group-hover:scale-125 transition-transform duration-700"
                          }
                        >
                          {React.cloneElement(icon, {
                            className: "w-12 h-12 stroke-[1.2]",
                          })}
                        </div>
                      </div>

                      <div className="text-center space-y-2.5">
                        <h4 className="text-base lg:text-lg font-black text-slate-900 tracking-tight uppercase italic group-hover:text-blue-600 transition-colors">
                          {cat.categoryName}
                        </h4>
                        <div className="space-y-1.5 flex flex-col items-center">
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest opacity-60">
                            Verified Domain
                          </p>
                          <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-100 rounded-full">
                            <div
                              className={`w-1 h-1 rounded-full ${colors.dot} animate-pulse`}
                            />
                            <span className="text-[8px] font-black text-slate-500 uppercase tracking-tighter">
                              Premium Access
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-auto flex items-center gap-2 text-blue-600 font-extrabold text-[9px] uppercase tracking-[0.2em] transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 pb-2">
                        Enter Vault <ArrowUpRight className="w-3 h-3" />
                      </div>
                    </div>

                    <div className="absolute top-4 right-4 flex items-center gap-1.5">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${colors.dot} animate-pulse`}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
        </div>
      </section>

      {/* --- PROFESSIONAL FEATURE SECTION (REDESIGNED) --- */}
      <section className="relative px-1 overflow-hidden pb-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/30 blur-[120px] rounded-full"></div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {[
            {
              icon: <Compass />,
              title: "Discovery Elite",
              color: "text-blue-600",
              bg: "bg-blue-600/10",
              desc: "MapMan leverages premium mapping to reveal top-tier local services and exclusive business hubs near you.",
            },
            {
              icon: <Zap />,
              title: "Quantum Connect",
              color: "text-amber-600",
              bg: "bg-amber-600/10",
              desc: "Accelerate your journey from discovery to booking with our instant, real-time service activation engine.",
            },
            {
              icon: <Users />,
              title: "Verified Trust",
              color: "text-emerald-600",
              bg: "bg-emerald-600/10",
              desc: "Join a high-integrity community of 2M+ users who define local excellence through authentic reviews.",
            },
          ].map((feat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              className="group relative bg-slate-50/50 hover:bg-white p-8 lg:p-10 rounded-[2.5rem] border border-slate-100/50 hover:shadow-[0_40px_80px_-15px_rgba(30,58,138,0.1)] transition-all duration-500 overflow-hidden"
            >
              <div
                className={`absolute top-0 right-0 w-32 h-32 ${feat.bg} rounded-bl-[5rem] opacity-20 -mr-8 -mt-8 transition-transform duration-700 group-hover:scale-110`}
              />

              <div
                className={`w-14 h-14 rounded-2xl ${feat.bg} ${feat.color} flex items-center justify-center mb-8 shadow-sm relative z-10 group-hover:scale-110 transition-transform duration-500`}
              >
                {React.cloneElement(feat.icon, {
                  className: "w-7 h-7 stroke-[2]",
                })}
              </div>

              <div className="space-y-4 relative z-10">
                <h5 className="text-xl font-black text-slate-900 uppercase tracking-tight leading-none transition-colors group-hover:text-slate-950">
                  {feat.title}
                </h5>
                <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-[260px]">
                  {feat.desc}
                </p>
                <div className="pt-6">
                  <span
                    className={`inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${feat.color} group-hover:gap-4 transition-all`}
                  >
                    Learn More <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
