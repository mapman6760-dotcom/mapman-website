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
} from "lucide-react";
import { sendEmailOtp, verifyEmailOtp } from "../api/auth";
import { getProfile } from "../api/shop";
import indiaData from "../assets/india_states_districts.json";

const Login = ({ onLogin, logo }) => {
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

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleNext = async (e) => {
    e.preventDefault();
    if (step === 1 && phoneNumber) {
      if (!/^91\d{10}$/.test(phoneNumber)) {
        setError("Please enter mobile number in 91XXXXXXXXXX format");
        return;
      }
      setLoading(true);
      setError(null);
      try {
        await sendEmailOtp(phoneNumber);
        setStep(2);
      } catch (err) {
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
      const response = await verifyEmailOtp(phoneNumber, parseInt(otpStr, 10));
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

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const states = Object.keys(indiaData);
  const cities = profileData.state ? indiaData[profileData.state] : [];

  return (
    <div className="h-screen w-full flex flex-col md:flex-row bg-[#ffffff] overflow-hidden font-sans">
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
              <h2 className="text-3xl md:text-4xl lg:text-6xl font-black text-white leading-[1.1] tracking-tighter">
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
            &copy; 2026 Mapman Global.{" "}
            <span className="text-slate-700">All rights reserved.</span>
          </div>
        </div>
      </div>

      {/* Right Section: Auth Forms */}
      <div className="w-full md:w-[60%] lg:w-[45%] h-full flex flex-col bg-white overflow-y-auto relative no-scrollbar">
        {/* Mobile Sticky Header */}
        <div className="md:hidden sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-50 shrink-0">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Logo" className="w-8 h-8 object-contain" />
              <span className="text-lg font-black text-slate-900 tracking-tighter uppercase italic">
                Mapman
              </span>
            </div>
            <div className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[9px] font-black uppercase tracking-widest">
              Digital ID
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-6 sm:p-12 md:p-8 lg:p-16">
          <div className="w-full max-w-[340px] sm:max-w-[360px] space-y-10">
            <AnimatePresence mode="wait">
              {step === 1 ? (
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
                    <h3 className="text-3xl md:text-4xl font-black text-slate-950 tracking-[-0.04em] leading-[1.1] uppercase italic">
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
                          placeholder="91XXXXXXXXXX"
                          className="w-full h-12 bg-white border border-slate-200 rounded-xl px-5 font-medium text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
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
                          Initiate Session <ChevronRight className="w-4 h-4" />
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
                      <h3 className="text-3xl md:text-4xl font-black text-slate-950 tracking-[-0.04em] leading-tight uppercase italic">
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
                          sendEmailOtp(phoneNumber).catch((err) =>
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
