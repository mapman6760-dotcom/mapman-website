import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
  Link,
  BrowserRouter
} from "react-router-dom";
import {
  Mail,
  ChevronRight,
  ArrowLeft,
  ShieldCheck,
  Map,
  Smartphone,
  Bell,
  Bookmark,
  Home as LucideHome,
  MapPin,
  Plus,
  Play,
  User,
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
  Search,
  Settings,
  MessageCircle,
  LogOut,
  Menu,
  X,
  Globe,
  Zap,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import logo from "./assets/logo.png";
import Login from "./components/Login";
import Home from "./pages/Home";
import MapExplore from "./pages/MapExplore";
import VideoFeed from "./pages/VideoFeed";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import ShopAnalytics from "./pages/ShopAnalytics";
import NotificationSettings from "./pages/NotificationSettings";
import ShopDetail from "./pages/ShopDetail";
import SavedItems from "./pages/SavedItems";
import EditShop from "./pages/EditShop";
import VideoPlayer from "./pages/VideoPlayer";
import ViewedVideos from "./pages/ViewedVideos";
import CategoryVideos from "./pages/CategoryVideos";
import { getProfile } from "./api/shop";

const API_BASE_URL = "https://mapman-production.up.railway.app";

// --- Dashboard Component (Responsive Routing) ---
const Dashboard = ({ onLogout }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        if (res.status === 200) {
          setProfileData(res.data);
        }
      } catch (error) {
        console.error("Error fetching profile for header:", error);
      }
    };
    fetchProfile();
  }, []);

  const showFullMenu = !isCollapsed || isSidebarOpen;

  // Mapping of route paths to display IDs
  const getCurrentPageId = () => {
    const path = location.pathname;
    if (path === "/" || path === "/dashboard") return "dashboard";
    return path.substring(1); // remove leading slash
  };

  const currentPage = getCurrentPageId();

  useEffect(() => {
    // Scroll the main content area to top whenever path changes
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname]);

  const navigateToMap = (category = "") => {
    navigate(`/map?query=${encodeURIComponent(category)}`);
  };

  return (
    <div className="h-screen overflow-hidden bg-[#F5F5F5] flex font-sans">
      {/* MOBILE BACKDROP */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* 1. PROFESSIONAL COLLAPSIBLE SIDEBAR */}
      <aside
        className={`
          fixed inset-y-4 left-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
          lg:inset-y-0 lg:rounded-none lg:static lg:flex lg:flex-col lg:h-screen lg:shadow-none shrink-0
          ${isCollapsed ? "lg:w-[84px]" : "lg:w-64"}
          ${isSidebarOpen ? "translate-x-0 w-[280px]" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className={`
          flex flex-col h-full overflow-hidden relative bg-white/75 backdrop-blur-xl border-r border-white/40 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.1)]
          transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
          ${showFullMenu ? "w-[280px] lg:w-64" : "w-[84px]"}
        `}>
          <div className="absolute top-0 right-0 w-32 h-64 bg-blue-500/5 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-64 bg-indigo-500/5 blur-[100px] pointer-events-none" />

          {/* Brand Header & Toggle */}
          <div className={`p-8 lg:p-7 pb-4 lg:pb-3 flex items-center transition-all duration-500 ${!showFullMenu ? "lg:flex-col lg:gap-4" : "justify-between"}`}>
            <Link to="/" className={`flex items-center gap-4 group cursor-pointer transition-all duration-500 ${!showFullMenu ? "lg:scale-95" : "scale-100"}`}>
              <div className="w-12 h-12 lg:w-11 lg:h-11 bg-white border border-slate-200/50 rounded-[1.25rem] flex items-center justify-center transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.05)] group-hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] group-hover:border-blue-400/30">
                <img src={logo} alt="Logo" className="w-8 h-8 lg:w-7 lg:h-7 object-contain group-hover:scale-110 transition-transform duration-300" />
              </div>
              {showFullMenu && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="overflow-hidden whitespace-nowrap">
                  <span className="text-xl lg:text-lg font-black text-slate-900 tracking-tighter block leading-none">Mapman</span>
                  <span className="text-[9px] text-blue-600 font-bold uppercase tracking-[0.2em] mt-1.5 block opacity-60">Modern Explorer</span>
                </motion.div>
              )}
            </Link>

            <button
              className={`p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50/80 rounded-xl transition-all ${!showFullMenu ? "lg:flex" : "flex"}`}
              onClick={(e) => {
                e.stopPropagation();
                setIsCollapsed(!isCollapsed);
              }}
            >
              <Menu className={`w-4 h-4 transition-transform duration-500 ${isCollapsed ? "rotate-0" : "rotate-90"}`} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-8 space-y-10 lg:space-y-6 no-scrollbar scroll-smooth">
            <div className="space-y-2 lg:space-y-1.5">
              {showFullMenu && (
                <p className="px-4 text-[10px] text-slate-400 font-bold uppercase tracking-[0.25em] mb-4 opacity-50">
                  Main Hub
                </p>
              )}
              {[
                { id: "dashboard", path: "/dashboard", label: "Dashboard", icon: <LucideHome /> },
                { id: "map", path: "/map", label: "Map Explorer", icon: <MapPin /> },
                { id: "video", path: "/video", label: "Video Feed", icon: <Play /> },
                { id: "saved", path: "/saved", label: "Saved Items", icon: <Bookmark /> },
                { id: "profile", path: "/profile", label: "Profile", icon: <User /> },
              ].map((item, i) => (
                <button
                  key={i}
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                  className={`w-full group relative flex items-center transition-all duration-300 rounded-[1.25rem] 
                    ${!showFullMenu ? "lg:justify-center p-4 mb-2" : "px-4 py-3.5 mb-1 gap-4"} 
                    ${currentPage === item.id
                      ? "bg-blue-600 text-white shadow-[0_15px_30px_-5px_rgba(37,99,235,0.4)] scale-[1.02]"
                      : "text-slate-500 hover:bg-blue-50/60 hover:text-blue-600 active:scale-95"
                    }`}
                >
                  <div className={`transition-all duration-300 ${currentPage === item.id ? "scale-110" : "group-hover:scale-110"}`}>
                    {React.cloneElement(item.icon, { className: `w-5 h-5 lg:w-[18px] lg:h-[18px] ${currentPage === item.id ? "stroke-[3]" : "stroke-[2.2]"}` })}
                  </div>
                  {showFullMenu && (
                    <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-[14px] font-bold tracking-tight whitespace-nowrap">
                      {item.label}
                    </motion.span>
                  )}
                  {currentPage === item.id && (
                    <motion.div
                      layoutId="sidebarActivePill"
                      className="absolute left-0 w-1.5 h-6 bg-white rounded-r-full shadow-[0_0_15px_white]"
                    />
                  )}
                </button>
              ))}

              <div className="pt-8">
                {showFullMenu && (
                  <p className="px-4 text-[10px] text-slate-400 font-bold uppercase tracking-[0.25em] mb-4 opacity-50">
                    Transparency
                  </p>
                )}
                <div className="space-y-1">
                  {[
                    { id: "privacy-policy", path: "/privacy-policy", label: "Privacy Policy", icon: <ShieldCheck /> },
                    { id: "terms-conditions", path: "/terms-conditions", label: "Terms & Conditions", icon: <Globe /> },
                  ].map((item, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        navigate(item.path);
                        setSidebarOpen(false);
                      }}
                      className={`w-full group relative flex items-center transition-all duration-300 rounded-[1.25rem] 
                        ${!showFullMenu ? "lg:justify-center p-4 mb-2" : "px-4 py-3.5 mb-1 gap-4"} 
                        ${currentPage === item.id
                          ? "bg-blue-600 text-white shadow-[0_15px_30px_-5px_rgba(37,99,235,0.4)] scale-[1.02]"
                          : "text-slate-500 hover:bg-blue-50/60 hover:text-blue-600 active:scale-95"
                        }`}
                    >
                      <div className={`transition-all duration-300 ${currentPage === item.id ? "scale-110" : "group-hover:scale-110"}`}>
                        {React.cloneElement(item.icon, { className: `w-5 h-5 lg:w-[18px] lg:h-[18px] ${currentPage === item.id ? "stroke-[3]" : "stroke-[2.2]"}` })}
                      </div>
                      {showFullMenu && (
                        <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-[14px] font-bold tracking-tight whitespace-nowrap">
                          {item.label}
                        </motion.span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={`p-5 mt-auto transition-all duration-500 ${!showFullMenu ? "lg:bg-transparent" : "bg-slate-50/40 border-t border-slate-100/50"}`}>
            <button
              onClick={() => setShowLogoutDialog(true)}
              className={`flex items-center gap-4 text-red-500 bg-red-50/80 hover:bg-red-100 hover:text-red-700 transition-all duration-300 group ${!showFullMenu ? "lg:justify-center lg:w-14 lg:h-14 lg:rounded-2xl lg:mx-auto" : "w-full p-4 rounded-2xl shadow-sm hover:shadow-md"}`}
            >
              <div className={`transition-transform duration-300 ${!showFullMenu ? "scale-110" : "w-9 h-9 bg-white/80 rounded-xl flex items-center justify-center group-hover:scale-110 shadow-sm"}`}>
                <LogOut className="w-[18px] h-[18px] stroke-[2.5]" />
              </div>
              {showFullMenu && (
                <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-[12px] font-black uppercase tracking-widest leading-none">Sign Out</motion.span>
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* 2. MAIN AREA */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="h-20 lg:h-24 bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-6 lg:px-10 flex items-center justify-between shrink-0 z-40">
          <div className="flex items-center gap-4 lg:gap-0">
            <button className="lg:hidden p-2.5 -ml-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-6 h-6 stroke-[2.5]" />
            </button>
            <div className="relative hidden md:block lg:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 font-bold" />
              <input type="text" placeholder="Search services, places..." className="w-full h-11 pl-11 pr-4 bg-slate-100/50 border border-transparent focus:bg-white focus:border-blue-500/20 rounded-xl focus:ring-4 focus:ring-blue-500/5 outline-none transition-all font-medium text-sm" />
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-5">
            <button
              onClick={() => navigate("/notifications")}
              className={`p-2.5 rounded-xl border border-slate-100 transition-all shadow-sm group hover:border-blue-200/50 hover:bg-blue-50/50 ${currentPage === "notifications" ? "bg-blue-50 border-blue-200 shadow-md translate-y-[-2px]" : "bg-white"}`}
            >
              <div className="relative">
                <Bell className={`w-5 h-5 transition-transform duration-500 group-hover:rotate-12 ${currentPage === "notifications" ? "text-blue-600" : "text-slate-500"}`} />
                <div className="absolute -top-0.5 -right-0.5 w-[7px] h-[7px] bg-red-500 rounded-full ring-2 ring-white"></div>
              </div>
            </button>
            <button onClick={() => navigate("/profile")} className={`flex items-center gap-3 group cursor-pointer p-2 rounded-2xl transition-all ${currentPage === 'profile' ? 'bg-blue-50 ring-1 ring-blue-100' : 'hover:bg-slate-50'}`}>
              <div className="text-right hidden md:block">
                <p className="text-sm font-black text-slate-900 leading-none">
                  {profileData?.userName || "Profile Name"}
                </p>
              </div>
              <div className={`w-10 h-10 lg:w-11 lg:h-11 rounded-xl overflow-hidden ring-2 shadow-xl shadow-slate-200/50 group-hover:ring-blue-100 transition-all duration-300 ${currentPage === 'profile' ? 'ring-blue-500' : 'ring-slate-100'}`}>
                <img
                  src={profileData?.profilePic ? `${API_BASE_URL}${profileData.profilePic}` : "https://cdn-icons-png.flaticon.com/128/3135/3135715.png"}
                  alt="Profile"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </button>
          </div>
        </header>

        <main className="p-4 lg:p-6 max-w-screen-2xl mx-auto w-full flex-1 min-h-0 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Home onSelectCategory={navigateToMap} />} />
            <Route path="/map" element={<MapExplore isCollapsed={isCollapsed} />} />
            <Route path="/video" element={<VideoFeed />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<Profile onLogout={() => setShowLogoutDialog(true)} />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/shop-analytics" element={<ShopAnalytics />} />
            <Route path="/shop-detail/:id" element={<ShopDetail />} />
            <Route path="/saved" element={<SavedItems />} />
            <Route path="/edit-shop" element={<EditShop />} />
            <Route path="/video-player/:id" element={<VideoPlayer />} />
            <Route path="/notification-settings" element={<NotificationSettings />} />
            <Route path="/viewed-videos" element={<ViewedVideos />} />
            <Route path="/category-videos" element={<CategoryVideos />} />
            <Route path="*" element={
              <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400">
                <span className="text-4xl font-black uppercase tracking-widest opacity-20">404</span>
                <p className="mt-4 font-bold uppercase tracking-tight">Access Denied / Coming Soon</p>
              </div>
            } />
          </Routes>
        </main>
      </div>

      {/* 4. LOGOUT DIALOG */}
      <AnimatePresence>
        {showLogoutDialog && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowLogoutDialog(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
            <motion.div key="logout-modal" initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-[340px] bg-white rounded-[2rem] shadow-[0_30px_80px_rgba(0,0,0,0.12)] overflow-hidden p-8 text-center border border-slate-100">
              <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <LogOut className="w-8 h-8 stroke-[2.5]" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2 tracking-tighter uppercase">Sign Out</h3>
              <div className="space-y-2.5 pt-4">
                <button onClick={onLogout} className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-red-600/20 transition-all active:scale-95">Confirm Sign Out</button>
                <button onClick={() => setShowLogoutDialog(false)} className="w-full py-4 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all">Cancel</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- App Root ---
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
    setTimeout(() => setLoading(false), 1200);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
  };

  if (loading) return (
    <div className="min-h-screen bg-[#f0f9ff] flex items-center justify-center">
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center">
        <div className="w-20 h-20 mb-6"><img src={logo} alt="Loading..." className="w-full h-full object-contain animate-pulse" /></div>
        <div className="w-32 h-1.5 bg-blue-100/50 rounded-full overflow-hidden leading-none border border-blue-100">
          <div className="w-1/2 h-full bg-primary-600 animate-[loading_1.5s_ease-in-out_infinite]"></div>
        </div>
      </motion.div>
    </div>
  );

  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <AnimatePresence mode="wait">
          {!isLoggedIn ? (
            <Routes>
              <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} logo={logo} />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          ) : (
            <Dashboard onLogout={handleLogout} />
          )}
        </AnimatePresence>
      </div>
    </BrowserRouter>
  );
};

export default App;
