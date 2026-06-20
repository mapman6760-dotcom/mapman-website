import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone,
  ChevronRight,
  ArrowLeft,
  ShieldCheck,
  User,
  Lock,
  MapPin,
  Globe,
  Building,
  CheckCircle2,
  Shield,
  Layers,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import {
  sendEmailOtp,
  verifyEmailOtp,
  sendEmailRecoveryOtp,
  verifyEmailRecoveryOtp,
  updatePhoneSendOtp,
  updatePhoneVerifyOtp,
} from "../api/auth";
import { getProfile } from "../api/shop";
import indiaData from "../assets/india_states_districts.json";
import SEO from "./SEO";

const Login = ({ onLogin, logo, isDrawer = false }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [profileData, setProfileData] = useState({
    name: "",
    city: "",
    state: "",
    country: "India",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  // Recovery Flow State
  const [lostStep, setLostStep] = useState(0); // 0: hidden, 1-6: recovery steps
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [recoveryOtp, setRecoveryOtp] = useState(["", "", "", "", "", ""]);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleNext = async (e) => {
    e.preventDefault();
    if (step === 1 && phoneNumber) {
      if (!/^\d{10}$/.test(phoneNumber)) {
        setError("Please enter a valid 10-digit mobile number");
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const fullNumber = `91${phoneNumber}`;
        await sendEmailOtp(fullNumber);
        setStep(2);
      } catch (err) {
        showToast(err.message || "Failed to send OTP. Please try again.");
        setError(err.message || "Failed to send OTP. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleFinalSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const otpStr = otp.join("");
      if (otpStr.length < 6) {
        throw new Error("Please enter the full 6-digit code");
      }
      const fullNumber = `91${phoneNumber}`;
      const response = await verifyEmailOtp(fullNumber, parseInt(otpStr, 10));
      if (response.status === 200 && response.data?.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);

        // Verify profile completion automatically
        try {
          const profileRes = await getProfile();
          if (profileRes.status === 200 && profileRes.data) {
            const profile = profileRes.data;
            const isComplete =
              profile.userName &&
              profile.state &&
              profile.district &&
              profile.country;

            if (isComplete) {
              onLogin(); // Navigate to dashboard directly if profile is complete
              navigate("/dashboard");
            } else {
              setStep(3); // Show profile completion if data is missing
            }
          } else {
            setStep(3);
          }
        } catch (profileErr) {
          console.error("Profile check failed:", profileErr);
          setStep(3);
        }
      } else {
        throw new Error(
          response.message || "Verification failed. Please try again.",
        );
      }
    } catch (err) {
      showToast(err.message || "Verification failed. Please check your code.");
      setError(err.message || "Verification failed. Please check your code.");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    if (
      !profileData.name ||
      !profileData.city ||
      !profileData.state ||
      !profileData.country
    ) {
      setError("All fields are required");
      return;
    }
    onLogin();
    navigate("/dashboard");
  };

  const handleOtpChange = (element, index, isRecovery = false) => {
    if (isNaN(element.value)) return false;
    if (isRecovery) {
      const newOtp = [...recoveryOtp];
      newOtp[index] = element.value;
      setRecoveryOtp(newOtp);
    } else {
      const newOtp = [...otp];
      newOtp[index] = element.value;
      setOtp(newOtp);
    }
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  // Recovery API Handlers
  const handleRecoveryEmailOtp = async () => {
    if (!recoveryEmail) return setError("Please enter your registered email");
    setLoading(true);
    setError(null);
    try {
      await sendEmailRecoveryOtp(recoveryEmail);
      setLostStep(3);
    } catch (err) {
      showToast(err.message || "Failed to send email OTP.");
      setError(err.message || "Failed to send email OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyRecoveryEmailOtp = async () => {
    const otpStr = recoveryOtp.join("");
    if (otpStr.length < 6)
      return setError("Please enter the full 6-digit code");
    setLoading(true);
    setError(null);
    try {
      await verifyEmailRecoveryOtp(recoveryEmail, parseInt(otpStr, 10));
      setRecoveryOtp(["", "", "", "", "", ""]); // Reset for next step
      setLostStep(4);
    } catch (err) {
      showToast(err.message || "Failed to verify email OTP.");
      setError(err.message || "Failed to verify email OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePhoneOtp = async () => {
    if (!/^\d{10}$/.test(newPhone))
      return setError("Please enter a valid 10-digit mobile number");
    setLoading(true);
    setError(null);
    try {
      await updatePhoneSendOtp(recoveryEmail, `91${newPhone}`);
      setLostStep(5);
    } catch (err) {
      showToast(err.message || "Failed to send OTP to new number.");
      setError(err.message || "Failed to send OTP to new number.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyUpdatePhoneOtp = async () => {
    const otpStr = recoveryOtp.join("");
    if (otpStr.length < 6)
      return setError("Please enter the full 6-digit code");
    setLoading(true);
    setError(null);
    try {
      const res = await updatePhoneVerifyOtp(
        recoveryEmail,
        `91${newPhone}`,
        parseInt(otpStr, 10),
      );
      if (res.status === 200 && res.data?.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        setLostStep(6); // Success screen
      } else {
        throw new Error(res.message || "Verification failed");
      }
    } catch (err) {
      showToast(err.message || "Failed to verify new phone OTP.");
      setError(err.message || "Failed to verify new phone OTP.");
    } finally {
      setLoading(false);
    }
  };

  const states = Object.keys(indiaData);
  const cities = profileData.state ? indiaData[profileData.state] : [];

  return (
    <div className={`w-full flex flex-col md:flex-row bg-[#ffffff] overflow-hidden font-sans ${isDrawer ? "h-full min-h-[600px]" : "h-[100dvh]"}`}>
      <SEO
        title="Register & Discover Local Shops & Business Videos"
        description="Welcome to Mapman. Sign in to register your business, watch custom shop reels, explore local shops on our interactive map, and discover verified establishments."
        canonical="https://mapman.in/login"
      />
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -40, x: "-50%" }}
            animate={{ opacity: 1, y: 24, x: "-50%" }}
            exit={{ opacity: 0, y: -40, x: "-50%" }}
            className="fixed top-0 left-1/2 z-[100] bg-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.2)] text-white px-6 py-4 rounded-2xl flex items-center gap-4 border border-white/10 backdrop-blur-md"
          >
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse shadow-[0_0_10px_#2563eb]" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] leading-none">
              {toast}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Left Section: Immersive Visuals - Adaptive Tablet/Desktop */}
      {!isDrawer && (
        <div className="hidden md:flex md:w-[40%] lg:w-[55%] relative h-full shrink-0 border-r border-slate-100 overflow-hidden">
          <div className="absolute inset-0 bg-slate-950">
            <img
              src="https://images.unsplash.com/photo-1449034446853-66c86144b0ad?q=80&w=2070&auto=format&fit=crop"
              alt="Mapman Landscape"
              className="w-full h-full object-cover opacity-60 mix-blend-luminosity grayscale hover:grayscale-0 transition-all duration-[3s] ease-in-out scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          <div className="relative z-10 w-full h-full flex flex-col p-8 lg:p-20 justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 lg:w-14 lg:h-14 bg-white rounded-xl lg:rounded-2xl flex items-center justify-center p-2 lg:p-3 shadow-2xl">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-white text-lg lg:text-2xl font-black tracking-tighter leading-none uppercase italic">
                  Mapman
                </h1>
                <p className="text-blue-500 text-[8px] lg:text-[10px] uppercase font-black tracking-[0.3em] mt-1 lg:mt-2 opacity-80">
                  Modern Explorer Hub
                </p>
              </div>
            </div>

            <div className="space-y-6 lg:space-y-8 max-w-xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[1.1] tracking-tighter">
                  Explore the world, <br />
                  <span className="text-blue-600 italic">differently.</span>
                </h2>
                <p className="text-slate-400 text-sm lg:text-lg mt-4 lg:mt-6 font-medium leading-relaxed max-w-md">
                  Sophisticated mapping platform built for modern professionals
                  and global explorers.
                </p>
              </motion.div>
            </div>

            <div className="text-slate-500 text-[9px] lg:text-[11px] font-medium tracking-wide">
              &copy; 2026 Mapman.{" "}
              <span className="text-slate-700">All rights reserved.</span>
            </div>
          </div>
        </div>
      )}

      {/* Right Section: Auth Forms */}
      <div className={`w-full h-full flex flex-col bg-gradient-to-br from-blue-50/30 via-white to-white md:from-white md:to-white overflow-y-auto relative no-scrollbar ${isDrawer ? "" : "md:w-[60%] lg:w-[45%]"}`}>
        {/* Mobile Sticky Header - Refined */}
        <div className="md:hidden sticky top-0 z-50 bg-white/70 backdrop-blur-2xl border-b border-slate-100/50 shrink-0">
          <div className="px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center p-1.5 shadow-lg">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-base font-black text-slate-900 tracking-tighter uppercase italic">
                Mapman
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-600/5 border border-blue-600/10 text-blue-600 rounded-full text-[8px] font-black uppercase tracking-widest">
              <div className="w-1 h-1 bg-blue-600 rounded-full animate-pulse" />
              Digital ID
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 md:p-8 lg:p-16">
          <div className="w-full max-w-[340px] sm:max-w-[360px] space-y-10 py-8">
            <AnimatePresence mode="wait">
              {lostStep > 0 ? (
                <motion.div
                  key="recoveryFlow"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="space-y-5">
                    {lostStep < 6 && (
                      <button
                        onClick={() => {
                          setError(null);
                          if (lostStep === 1) setLostStep(0);
                          else setLostStep(lostStep - 1);
                        }}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-50 text-slate-400 hover:text-blue-600 transition-all border border-slate-100"
                      >
                        <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                      </button>
                    )}
                    <div className="space-y-2">
                      <h3 className="text-2xl md:text-3xl font-black text-slate-950 tracking-tight leading-tight uppercase italic">
                        {lostStep === 1 && "Change Number"}
                        {lostStep === 2 && "Email Verification"}
                        {lostStep === 3 && "Check Your Email"}
                        {lostStep === 4 && "New Phone Number"}
                        {lostStep === 5 && "Verify New Number"}
                        {lostStep === 6 && ""}
                      </h3>
                    </div>
                  </div>

                  {lostStep === 1 && (
                    <div className="space-y-6">
                      <div className="p-4 bg-amber-50 border border-amber-200/50 rounded-xl flex gap-3">
                        <Lock className="w-5 h-5 text-amber-500 shrink-0" />
                        <p className="text-[11px] text-amber-800 font-medium">
                          Verify your identity first before changing your phone
                          number.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                          Verify VIA
                        </label>
                        <button
                          onClick={() => setLostStep(2)}
                          className="w-full p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all flex items-center gap-4 text-left group"
                        >
                          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 group-hover:scale-110 transition-transform">
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-[13px] font-bold text-slate-900 group-hover:text-blue-600 flex items-center gap-1">
                              Recover via Email{" "}
                              <ChevronRight className="w-3.5 h-3.5" />
                            </p>
                            <p className="text-[10px] text-slate-500 mt-0.5">
                              Verification link sent to your registered email
                            </p>
                          </div>
                        </button>
                      </div>
                    </div>
                  )}

                  {lostStep === 2 && (
                    <div className="space-y-6">
                      <div className="relative">
                        <input
                          type="email"
                          required
                          placeholder="Enter Registered Email"
                          className="w-full h-12 bg-white border border-slate-200 rounded-xl px-10 font-medium text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all"
                          value={recoveryEmail}
                          onChange={(e) => setRecoveryEmail(e.target.value)}
                        />
                        <svg
                          className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      {error && (
                        <div className="p-3 bg-red-50 text-red-600 rounded-xl text-[10px] font-black uppercase tracking-widest text-center border border-red-100">
                          {error}
                        </div>
                      )}
                      <button
                        onClick={handleRecoveryEmailOtp}
                        disabled={loading}
                        className="btn-primary w-full py-3"
                      >
                        {loading ? (
                          <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                        ) : (
                          "Get OTP"
                        )}
                      </button>
                    </div>
                  )}

                  {lostStep === 3 && (
                    <div className="space-y-6">
                      <div className="p-4 bg-blue-50 border-2 border-blue-400/50 rounded-xl flex items-center justify-between">
                        <p className="text-[11px] font-bold text-slate-800">
                          Verification OTP Sent
                        </p>
                        <p className="text-[11px] font-bold text-blue-600">
                          {recoveryEmail}
                        </p>
                      </div>
                      <div className="flex justify-between gap-1 sm:gap-2">
                        {recoveryOtp.map((data, index) => (
                          <input
                            key={index}
                            type="text"
                            maxLength="1"
                            className="w-10 sm:w-11 h-12 text-center text-xl font-black rounded-lg border border-slate-200 bg-slate-50/50 focus:border-blue-600 focus:bg-white outline-none transition-all"
                            value={data}
                            onChange={(e) =>
                              handleOtpChange(e.target, index, true)
                            }
                            onFocus={(e) => e.target.select()}
                          />
                        ))}
                      </div>
                      {error && (
                        <div className="p-3 bg-red-50 text-red-600 rounded-xl text-[10px] font-black uppercase tracking-widest text-center border border-red-100">
                          {error}
                        </div>
                      )}
                      <button
                        onClick={handleVerifyRecoveryEmailOtp}
                        disabled={loading}
                        className="btn-primary w-full py-3"
                      >
                        {loading ? (
                          <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                        ) : (
                          "Proceed"
                        )}
                      </button>
                    </div>
                  )}

                  {lostStep === 4 && (
                    <div className="space-y-6">
                      <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex gap-2 items-start">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                        <p className="text-[11px] text-emerald-800 font-medium leading-relaxed">
                          Identity verified. Enter your new phone number below
                        </p>
                      </div>
                      <div className="relative group">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-black">
                          +91
                        </span>
                        <input
                          type="tel"
                          required
                          placeholder="Enter New Phone Number"
                          className="w-full h-12 bg-white border border-slate-200 rounded-xl pl-12 pr-5 font-medium text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all"
                          value={newPhone}
                          onChange={(e) => setNewPhone(e.target.value)}
                        />
                      </div>
                      {error && (
                        <div className="p-3 bg-red-50 text-red-600 rounded-xl text-[10px] font-black uppercase tracking-widest text-center border border-red-100">
                          {error}
                        </div>
                      )}
                      <button
                        onClick={handleUpdatePhoneOtp}
                        disabled={loading}
                        className="btn-primary w-full py-3"
                      >
                        {loading ? (
                          <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                        ) : (
                          "Get OTP"
                        )}
                      </button>
                    </div>
                  )}

                  {lostStep === 5 && (
                    <div className="space-y-6">
                      <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between">
                        <p className="text-[13px] font-black text-slate-900">
                          +91{newPhone}
                        </p>
                        <button
                          onClick={() => setLostStep(4)}
                          className="text-[10px] font-bold text-blue-600 hover:underline flex items-center gap-1"
                        >
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>{" "}
                          Change Number
                        </button>
                      </div>
                      <div className="flex justify-between gap-1 sm:gap-2">
                        {recoveryOtp.map((data, index) => (
                          <input
                            key={index}
                            type="text"
                            maxLength="1"
                            className="w-10 sm:w-11 h-12 text-center text-xl font-black rounded-lg border border-slate-200 bg-slate-50/50 focus:border-blue-600 focus:bg-white outline-none transition-all"
                            value={data}
                            onChange={(e) =>
                              handleOtpChange(e.target, index, true)
                            }
                            onFocus={(e) => e.target.select()}
                          />
                        ))}
                      </div>
                      {error && (
                        <div className="p-3 bg-red-50 text-red-600 rounded-xl text-[10px] font-black uppercase tracking-widest text-center border border-red-100">
                          {error}
                        </div>
                      )}
                      <button
                        onClick={handleVerifyUpdatePhoneOtp}
                        disabled={loading}
                        className="btn-primary w-full py-3"
                      >
                        {loading ? (
                          <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                        ) : (
                          "Confirm"
                        )}
                      </button>
                    </div>
                  )}

                  {lostStep === 6 && (
                    <div className="space-y-6 text-center py-6">
                      <div className="w-20 h-20 mx-auto bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 mb-2">
                        Number Updated!
                      </h3>
                      <p className="text-sm text-slate-500 font-medium mb-6">
                        Your phone number has been successfully changed.
                      </p>
                      <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex justify-center items-center gap-2 mb-8 text-emerald-700">
                        <Smartphone className="w-4 h-4" />
                        <span className="font-bold">+91{newPhone}</span>
                      </div>
                      <button
                        onClick={() => {
                          onLogin();
                          navigate("/dashboard");
                        }}
                        className="btn-primary w-full py-3"
                      >
                        Go to Dashboard
                      </button>
                    </div>
                  )}
                </motion.div>
              ) : step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                      <Sparkles className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-slate-950 tracking-[-0.04em] leading-[1.1] uppercase italic">
                      Sign in to <br />
                      <span className="text-blue-600">Mapman</span>
                    </h3>
                    <p className="text-slate-400 text-xs font-medium">
                      Identify yourself to continue your exploration.
                    </p>
                  </div>

                  <form onSubmit={handleNext} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                        Mobile Number
                      </label>
                      <div className="relative group">
                        <input
                          type="tel"
                          required
                          maxLength="10"
                          placeholder="Enter 10-digit number"
                          className="w-full h-12 bg-white border border-slate-200 rounded-xl px-5 font-medium text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                      </div>
                      <div className="flex justify-end pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            setError(null);
                            setLostStep(1);
                          }}
                          className="text-[10px] font-black text-slate-700 hover:text-blue-600 uppercase tracking-widest transition-colors underline"
                        >
                          Lost Mobile Number?
                        </button>
                      </div>
                    </div>

                    {error && (
                      <div className="p-3 bg-red-50 text-red-600 rounded-xl text-[10px] font-black uppercase tracking-widest text-center border border-red-100">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />{" "}
                          SYNCING...
                        </span>
                      ) : (
                        <>
                          Send OTP <ChevronRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              ) : step === 2 ? (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="space-y-5">
                    <button
                      onClick={() => setStep(1)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-50 text-slate-400 hover:text-blue-600 transition-all border border-slate-100"
                    >
                      <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                    </button>
                    <div className="space-y-2">
                      <h3 className="text-2xl md:text-3xl font-black text-slate-950 tracking-[-0.04em] leading-tight uppercase italic">
                        Verify <br /> <span className="text-blue-600">OTP</span>
                      </h3>
                      <p className="text-slate-500 text-xs font-medium">
                        Enter the 6-digit transmission code sent to <br />
                        <span className="text-blue-600 font-black">
                          {phoneNumber}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between gap-1 sm:gap-2">
                    {otp.map((data, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength="1"
                        className="w-10 sm:w-11 h-12 text-center text-xl font-black rounded-lg border border-slate-200 bg-slate-50/50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/5 outline-none transition-all"
                        value={data}
                        onChange={(e) => handleOtpChange(e.target, index)}
                        onFocus={(e) => e.target.select()}
                      />
                    ))}
                  </div>

                  {error && (
                    <div className="p-3 bg-red-50 text-red-600 rounded-xl text-[10px] font-black uppercase tracking-widest text-center border border-red-100">
                      {error}
                    </div>
                  )}

                  <div className="space-y-6">
                    <button
                      onClick={handleFinalSubmit}
                      disabled={loading}
                      className="btn-primary w-full"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />{" "}
                          VALIDATING...
                        </span>
                      ) : (
                        <>Verify OTP</>
                      )}
                    </button>
                    <p className="text-center text-[9px] font-black uppercase tracking-[0.3em] text-slate-300">
                      Signal lost?{" "}
                      <button
                        onClick={() => {
                          setError(null);
                          const fullNumber = `91${phoneNumber}`;
                          sendEmailOtp(fullNumber).catch((err) =>
                            setError(err.message),
                          );
                        }}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        Resend
                      </button>
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center mb-2">
                      <Layers className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black text-slate-950 tracking-[-0.04em] leading-tight uppercase italic">
                      Profile <br />{" "}
                      <span className="text-blue-600">Completion</span>
                    </h3>
                    <p className="text-slate-400 text-xs font-medium">
                      One final step to personalize your experience.
                    </p>
                  </div>

                  <form onSubmit={handleProfileSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                        Full Identity
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Legal name"
                        className="w-full h-12 bg-white border border-slate-200 rounded-xl px-5 font-medium text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all"
                        value={profileData.name}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                          State
                        </label>
                        <div className="relative">
                          <select
                            className="w-full h-12 bg-white border border-slate-200 rounded-xl px-5 font-medium text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all appearance-none cursor-pointer"
                            value={profileData.state}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                state: e.target.value,
                                city: "",
                              })
                            }
                          >
                            <option value="">Region</option>
                            {states.map((st) => (
                              <option key={st} value={st}>
                                {st}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300 pointer-events-none" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                          City
                        </label>
                        <div className="relative">
                          <select
                            className="w-full h-12 bg-white border border-slate-200 rounded-xl px-5 font-medium text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all appearance-none cursor-pointer"
                            value={profileData.city}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                city: e.target.value,
                              })
                            }
                            disabled={!profileData.state}
                          >
                            <option value="">Locality</option>
                            {cities.map((ct) => (
                              <option key={ct} value={ct}>
                                {ct}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                        <Globe className="w-3 h-3 text-blue-600" /> Country
                      </label>
                      <div className="relative">
                        <select
                          className="w-full h-12 bg-white border border-slate-200 rounded-xl px-4 font-medium text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all appearance-none"
                          value={profileData.country}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              country: e.target.value,
                            })
                          }
                        >
                          <option value="India">India</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300 pointer-events-none" />
                      </div>
                    </div>

                    {error && (
                      <div className="p-3 bg-red-50 text-red-600 rounded-lg text-[10px] font-black uppercase tracking-widest text-center border border-red-100">
                        {error}
                      </div>
                    )}

                    <button type="submit" className="btn-primary w-full">
                      Establish Account{" "}
                      <CheckCircle2 className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
