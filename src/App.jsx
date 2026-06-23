import React, { useState, useEffect, Suspense } from "react";

import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
  Link,
  BrowserRouter
} from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
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
  Phone,
  Clock,
  Send,
  Headset,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import logo from "./assets/logo.png";
const Login = React.lazy(() => import("./components/Login"));
const Home = React.lazy(() => import("./pages/Home"));
const MapExplore = React.lazy(() => import("./pages/MapExplore"));
const VideoFeed = React.lazy(() => import("./pages/VideoFeed"));
const Profile = React.lazy(() => import("./pages/Profile"));
const Notifications = React.lazy(() => import("./pages/Notifications"));
const EditProfile = React.lazy(() => import("./pages/EditProfile"));
const PrivacyPolicy = React.lazy(() => import("./pages/PrivacyPolicy"));
const TermsConditions = React.lazy(() => import("./pages/TermsConditions"));
const ShopAnalytics = React.lazy(() => import("./pages/ShopAnalytics"));
const NotificationSettings = React.lazy(() => import("./pages/NotificationSettings"));
const ShopDetail = React.lazy(() => import("./pages/ShopDetail"));
const SavedItems = React.lazy(() => import("./pages/SavedItems"));
const EditShop = React.lazy(() => import("./pages/EditShop"));
const VideoPlayer = React.lazy(() => import("./pages/VideoPlayer"));
const ViewedVideos = React.lazy(() => import("./pages/ViewedVideos"));
const CategoryVideos = React.lazy(() => import("./pages/CategoryVideos"));
const Support = React.lazy(() => import("./pages/Support"));
const ShopList = React.lazy(() => import("./pages/ShopList"));
const AboutUs = React.lazy(() => import("./pages/AboutUs"));
const ContactUs = React.lazy(() => import("./pages/ContactUs"));

const LoadingFallback = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
    <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest animate-pulse">Syncing Hub...</p>
  </div>
);
import { getProfile } from "./api/shop";
import { API_BASE_URL } from "./config";

// --- Header Component ---
const Header = ({ isLoggedIn, profileData, onLogout, openLogin, currentPage, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 w-full z-50 transition-all duration-300">
      {/* Top Announcement Bar */}
      <div className="w-full bg-[#1e293b] text-white/90 text-[10px] sm:text-[11px] font-medium py-2 px-4 flex items-center justify-center text-center tracking-wide border-b border-white/10">
        Powered by Pafagel Software Solutions Pvt Ltd. Discover the best local shops and reels! <span className="hidden sm:inline mx-2">|</span><br className="sm:hidden" /> <span className="font-bold text-white">Join Mapman Today!</span>
      </div>

      <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200/50 px-4 md:px-8 py-3.5 flex items-center justify-between shadow-sm">
        {/* Brand / Logo */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="relative w-10 h-10 bg-white border border-slate-200/60 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:border-blue-400/30 transition-all duration-500">
              <div className="absolute inset-0 bg-blue-500/10 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img src={logo} alt="Logo" className="w-7 h-7 object-contain group-hover:rotate-[360deg] transition-all duration-700 ease-out" />
            </div>
            <div className="overflow-hidden">
              <span className="text-lg font-black bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 bg-clip-text text-transparent tracking-tighter block leading-none">
                Mapman
              </span>
              <span className="text-[8px] text-blue-600 font-extrabold uppercase tracking-[0.2em] mt-1 block opacity-75">
                Modern Explorer
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-2">
            {[
              { path: "/", label: "Home" },
              { path: "/map", label: "Map Explorer" },
              { path: "/video", label: "Video Feed" },
              { path: "/about-us", label: "About Us" },
              { path: "/contact-us", label: "Contact Us" }
            ].map((link) => {
              const isActive = (currentPage === "" && link.path === "/") || currentPage === link.path.substring(1);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 text-sm font-bold tracking-tight rounded-xl transition-all duration-300 ${isActive
                    ? "text-blue-600 bg-blue-50/60"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50/50"
                    }`}
                >
                  {link.label}
                  {isActive && (
                    <div
                      className="absolute bottom-1 left-4 right-4 h-0.5 bg-blue-600 rounded-full animate-scale-in"
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {/* Saved Items Link (only if logged in) */}
          {isLoggedIn && (
            <button
              onClick={() => navigate("/saved")}
              className={`p-2.5 rounded-xl border transition-all duration-300 group hover:scale-105 ${currentPage === "saved"
                ? "bg-blue-50 border-blue-200 text-blue-600 shadow-sm"
                : "bg-white border-slate-200/60 text-slate-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50/30"
                }`}
              title="Saved Items"
            >
              <Bookmark className="w-5 h-5 transition-colors" />
            </button>
          )}

          {/* Notification bell */}
          <button
            onClick={() => {
              if (!isLoggedIn) {
                openLogin();
              } else {
                navigate("/notifications");
              }
            }}
            className={`p-2.5 rounded-xl border transition-all duration-300 group hover:scale-105 ${currentPage === "notifications"
              ? "bg-blue-50 border-blue-200 text-blue-600 shadow-sm"
              : "bg-white border-slate-200/60 text-slate-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50/30"
              }`}
            title="Notifications"
          >
            <div className="relative">
              <Bell className={`w-5 h-5 transition-transform duration-500 group-hover:rotate-12 ${currentPage === "notifications" ? "text-blue-600" : "text-slate-500"}`} />
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></div>
            </div>
          </button>

          {/* User Account / Profile / Login */}
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/profile")}
                className={`flex items-center gap-2 group cursor-pointer p-1 rounded-xl transition-all ${currentPage === "profile" ? "bg-blue-50/80 ring-1 ring-blue-100" : "hover:bg-slate-50"
                  }`}
              >
                <div className="text-right hidden sm:block pl-2">
                  <p className="text-xs font-black text-slate-900 leading-none">
                    {profileData?.userName || "Profile"}
                  </p>
                </div>
                <div className="w-9 h-9 rounded-lg overflow-hidden ring-2 ring-slate-100 shadow-sm group-hover:ring-blue-200 transition-all duration-500">
                  <img
                    src={profileData?.profilePic ? profileData.profilePic : "https://cdn-icons-png.flaticon.com/128/3135/3135715.png"}
                    alt="Profile"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </button>
            </div>
          ) : (
            <button
              onClick={openLogin}
              className="relative overflow-hidden px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md shadow-blue-500/10 active:scale-95 group"
            >
              <span className="relative z-10">Login</span>
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
            </button>
          )}

          {/* Mobile menu hamburger toggle */}
          <button
            className="lg:hidden p-2 text-slate-500 hover:text-slate-950 hover:bg-slate-50 rounded-xl transition-all"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown Panel */}
      {isMobileMenuOpen && (
        <div
          className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-slate-200/60 shadow-xl lg:hidden overflow-hidden z-40 px-6 py-5 flex flex-col gap-3 animate-fade-in-up"
        >
          {[
            { path: "/", label: "Home" },
            { path: "/map", label: "Map Explorer" },
            { path: "/video", label: "Video Feed" },
            { path: "/about-us", label: "About Us" },
            { path: "/contact-us", label: "Contact Us" }
          ].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`py-2 px-3 text-sm font-bold tracking-tight rounded-lg transition-colors ${(currentPage === "" && link.path === "/") || currentPage === link.path.substring(1)
                ? "text-blue-600 bg-blue-50/60"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

// --- Footer Component ---
const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-slate-950 via-[#00003a] to-slate-950 text-blue-100 overflow-hidden mt-auto border-t border-slate-800">

      {/* Ambient glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none -mr-40 -mt-40" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[150px] pointer-events-none -ml-40 -mb-40" />

      {/* Top neon accent line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-10">

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-slate-800/80">

          {/* ── Brand Column ── */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center shadow-lg transition-all group-hover:bg-white/20">
                <img src={logo} alt="Logo" className="w-7 h-7 object-contain drop-shadow-md" />
              </div>
              <div>
                <span className="text-2xl font-black text-white tracking-tighter block leading-none">Mapman</span>
                <span className="text-[9px] text-blue-400 font-bold uppercase tracking-[0.25em] mt-1 block">Explore · Connect · Discover</span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              The ultimate location-based business discovery platform. Watch shop videos, explore interactive maps, and find the best places in town.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              {[
                { icon: <MapPin className="w-4 h-4" />, text: "Chennai, Tamil Nadu, India", color: "text-cyan-400" },
                { icon: <Phone className="w-4 h-4" />, text: "+91 9342376760 ", color: "text-emerald-400" },
                { icon: <Mail className="w-4 h-4" />, text: "mapman6760@gmail.com", color: "text-purple-400" },
                { icon: <Globe className="w-4 h-4" />, text: "pafagelsoftwaresolutionspvtltd.in", color: "text-amber-400", href: "https://pafagelsoftwaresolutionspvtltd.in/" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-slate-400">
                  <span className={item.color}>{item.icon}</span>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                      {item.text}
                    </a>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-2 pt-1">
              {[
                { href: "https://pafagelsoftwaresolutionspvtltd.in/", icon: <Globe className="w-4 h-4" />, label: "Website", hover: "hover:bg-blue-600 hover:border-blue-500" },
                { href: "mailto:mapman6760@gmail.com", icon: <Mail className="w-4 h-4" />, label: "Email", hover: "hover:bg-sky-500 hover:border-sky-400" },
                { href: "tel:+919342376760", icon: <Phone className="w-4 h-4" />, label: "Phone", hover: "hover:bg-emerald-600 hover:border-emerald-500" },
                { href: "https://facebook.com", icon: <ShieldCheck className="w-4 h-4" />, label: "Facebook", hover: "hover:bg-blue-700 hover:border-blue-600" },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className={`w-9 h-9 rounded-xl bg-slate-800/60 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 ${s.hover}`}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div className="lg:col-span-2 lg:pl-4 space-y-5">
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-1">Quick Links</h4>
              <div className="h-[2px] w-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
            </div>
            <ul className="space-y-3">
              {[
                { path: "/", label: "Home" },
                { path: "/map", label: "Map Explorer" },
                { path: "/video", label: "Video Feed" },
                { path: "/about-us", label: "About Us" },
                { path: "/contact-us", label: "Contact Us" },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path}
                    className="group flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors duration-300">
                    <span className="w-1 h-1 bg-cyan-500 rounded-full group-hover:w-3 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Our Categories ── */}
          <div className="lg:col-span-3 space-y-5">
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-1">Our Categories</h4>
              <div className="h-[2px] w-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full" />
            </div>
            <ul className="space-y-3">
              {["Theater", "Restaurant", "Hospital", "Bar", "Grocery", "Textile", "Resort", "Bunk", "Spa", "Hotel"].map((cat, i) => (
                <li key={i}>
                  <Link to={`/map?category=${encodeURIComponent(cat)}`}
                    className="group flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors duration-300">
                    <span className="w-1 h-1 bg-purple-500 rounded-full group-hover:w-3 transition-all duration-300" />
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Legal & Policies & Apps ── */}
          <div className="lg:col-span-3 space-y-5">
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-1">Legal & Policies</h4>
              <div className="h-[2px] w-8 bg-gradient-to-r from-rose-400 to-orange-400 rounded-full" />
            </div>
            <ul className="space-y-3 mb-6">
              {[
                { path: "/privacy-policy", label: "Privacy Policy" },
                { path: "/terms-conditions", label: "Terms & Conditions" },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path}
                    className="group flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors duration-300">
                    <span className="w-1 h-1 bg-rose-400 rounded-full group-hover:w-3 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-slate-800/60">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Download App</h4>
              <div className="flex flex-col gap-3.5">
                <a href="https://apps.apple.com/in/app/mapman-app/id6762550173" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3.5 px-5 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/15 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all group w-full sm:w-[220px]">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/179/179309.png"
                    alt="App Store"
                    className="w-8 h-8 brightness-0 invert group-hover:scale-110 transition-transform opacity-90 group-hover:opacity-100"
                  />
                  <div className="flex flex-col text-left">
                    <span className="text-[9px] text-slate-400 group-hover:text-slate-300 font-bold uppercase tracking-widest leading-none mb-1 transition-colors">Download on the</span>
                    <span className="text-[17px] text-white font-black leading-none tracking-tight">App Store</span>
                  </div>
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.mapman.mapman" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3.5 px-5 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/15 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all group w-full sm:w-[220px]">
                  <img src="https://cdn-icons-png.flaticon.com/128/6124/6124997.png" alt="Play Store" className="w-8 h-8 group-hover:scale-110 transition-transform opacity-90 group-hover:opacity-100" />
                  <div className="flex flex-col text-left">
                    <span className="text-[9px] text-slate-400 group-hover:text-slate-300 font-bold uppercase tracking-widest leading-none mb-1 transition-colors">GET IT ON</span>
                    <span className="text-[17px] text-white font-black leading-none tracking-tight">Google Play</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
          <span>© {new Date().getFullYear()} Mapman. All rights reserved.</span>
          <span className="flex items-center gap-1.5">
            Crafted with <span className="text-red-500 animate-pulse">♥</span> for a better experience
          </span>
        </div>

      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 opacity-60" />

    </footer>
  );
};

// --- Dashboard Component (Responsive Routing) ---
const Dashboard = ({ onLogout, isLoggedIn, setIsLoggedIn }) => {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isLoginDrawerOpen, setIsLoginDrawerOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

    if (isLoggedIn) {
      fetchProfile();
    } else {
      setProfileData(null);
    }
  }, [isLoggedIn]);

  // Mapping of route paths to display IDs
  const getCurrentPageId = () => {
    const path = location.pathname;
    if (path === "/") return "";
    return path.substring(1); // remove leading slash
  };

  const currentPage = getCurrentPageId();

  useEffect(() => {
    // Scroll the main content area to top whenever path changes
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.warn("Scroll to top failed:", err);
    }
  }, [location.pathname]);

  const navigateToMap = (category = "") => {
    navigate(`/map?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col font-sans relative">
      {/* Header */}
      <Header
        isLoggedIn={isLoggedIn}
        profileData={profileData}
        onLogout={() => setShowLogoutDialog(true)}
        openLogin={() => setIsLoginDrawerOpen(true)}
        currentPage={currentPage}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Main Content Area */}
      <main className={`flex-1 w-full min-h-0 mb-16 md:mb-24 ${currentPage === "" ? "" : "max-w-7xl mx-auto px-2 sm:px-4 lg:px-4 pt-0"}`}>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home onSelectCategory={navigateToMap} isLoggedIn={isLoggedIn} openLogin={() => setIsLoginDrawerOpen(true)} />} />
            <Route path="/dashboard" element={<Navigate to="/" replace />} />
            <Route path="/map" element={<MapExplore />} />
            <Route path="/video" element={<VideoFeed isLoggedIn={isLoggedIn} openLogin={() => setIsLoginDrawerOpen(true)} />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<Profile onLogout={() => setShowLogoutDialog(true)} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} openLogin={() => setIsLoginDrawerOpen(true)} />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/shop-analytics" element={<ShopAnalytics />} />
            <Route path="/shop-detail/:id" element={<ShopDetail />} />
            <Route path="/saved" element={<SavedItems />} />
            <Route path="/edit-shop" element={<EditShop />} />
            <Route path="/video-player/:id" element={<VideoPlayer />} />
            <Route path="/notification-settings" element={<NotificationSettings />} />
            <Route path="/viewed-videos" element={<ViewedVideos />} />
            <Route path="/category-videos" element={<CategoryVideos />} />
            <Route path="/support" element={<Support />} />
            <Route path="/shop-list" element={<ShopList />} />
            <Route path="*" element={
              <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400">
                <span className="text-4xl font-black uppercase tracking-widest opacity-20">404</span>
                <p className="mt-4 font-bold uppercase tracking-tight">Access Denied / Coming Soon</p>
              </div>
            } />
          </Routes>
        </Suspense>
      </main>
      <Footer />

      {/* Login Drawer (Global) */}
      {isLoginDrawerOpen && (
        <div className="fixed inset-0 z-[200] flex justify-end">
          <div
            onClick={() => setIsLoginDrawerOpen(false)}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-fade-in"
          />
          <div
            className="relative w-full sm:max-w-[420px] h-full bg-white/95 backdrop-blur-3xl shadow-[0_0_100px_rgba(37,99,235,0.15)] overflow-hidden flex flex-col z-50 rounded-none border-l border-white animate-slide-in-right"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none -ml-32 -mb-32"></div>
            <button
              onClick={() => setIsLoginDrawerOpen(false)}
              className="absolute top-5 right-5 z-[200] w-10 h-10 flex items-center justify-center rounded-2xl bg-white/80 hover:bg-slate-50 text-slate-400 hover:text-red-500 transition-all shadow-sm border border-slate-100/50 backdrop-blur-md group"
            >
              <X className="w-5 h-5 stroke-[2.5] group-hover:rotate-90 transition-transform duration-300" />
            </button>
            <div className="flex-1 overflow-y-auto no-scrollbar w-full relative">
              <Suspense fallback={<LoadingFallback />}>
                <Login
                  logo={logo}
                  isDrawer={true}
                  onLogin={() => {
                    setIsLoggedIn(true);
                    setIsLoginDrawerOpen(false);
                  }}
                />
              </Suspense>
            </div>
          </div>
        </div>
      )}

      {showLogoutDialog && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div onClick={() => setShowLogoutDialog(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-fade-in" />
          <div className="relative w-full max-w-[340px] bg-white rounded-[2rem] shadow-[0_30px_80px_rgba(0,0,0,0.12)] overflow-hidden p-8 text-center border border-slate-100 animate-scale-in">
            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
              <LogOut className="w-8 h-8 stroke-[2.5]" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2 tracking-tighter uppercase">Sign Out</h3>
            <div className="space-y-2.5 pt-4">
              <button onClick={onLogout} className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-red-600/20 transition-all active:scale-95">Confirm Sign Out</button>
              <button onClick={() => setShowLogoutDialog(false)} className="w-full py-4 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- App Root ---
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
    setTimeout(() => setLoading(false), 1200);
  }, []);

  useEffect(() => {
    const handleUnauthorized = () => {
      handleLogout();
    };
    window.addEventListener("unauthorized", handleUnauthorized);
    return () => {
      window.removeEventListener("unauthorized", handleUnauthorized);
    };
  }, []);


  if (loading) return (
    <div className="min-h-screen bg-[#f0f9ff] flex items-center justify-center">
      <div className="flex flex-col items-center animate-scale-in">
        <div className="w-20 h-20 mb-6"><img src={logo} alt="Loading..." className="w-full h-full object-contain animate-pulse" /></div>
        <div className="w-32 h-1.5 bg-blue-100/50 rounded-full overflow-hidden leading-none border border-blue-100">
          <div className="w-1/2 h-full bg-primary-600 animate-[loading_1.5s_ease-in-out_infinite]"></div>
        </div>
      </div>
    </div>
  );

  return (
    <HelmetProvider>
      <Helmet>
        <title>Mapman - Discover Local Businesses & Shop Videos</title>
        <meta name="description" content="Mapman is the ultimate location-based business discovery platform. Discover nearby shops, watch local category video reels, and explore interactive maps." />
        <meta name="keywords" content="Mapman, MapMan, Map, Explorer, Business Hub, Shop Videos, Mapman Merchant, Local Shops, India Shops" />
        <meta property="og:title" content="Mapman - Discover Local Businesses & Shop Videos" />
        <meta property="og:description" content="Mapman is the ultimate location-based business discovery platform. Discover nearby shops, watch local category video reels, and explore interactive maps." />
        <meta property="og:type" content="website" />
      </Helmet>
      <BrowserRouter>
        <div className="min-h-screen">
          <Suspense fallback={<LoadingFallback />}>
            <Dashboard onLogout={handleLogout} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          </Suspense>
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
