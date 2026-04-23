import React, { useState } from "react";
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
} from "lucide-react";
import { sendEmailOtp, verifyEmailOtp } from "../api/auth";
import indiaData from "../assets/india_states_districts.json";

const Login = ({ onLogin, logo }) => {
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
        setStep(3);
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
    // In a real app, you'd save this to the backend here.
    // For now, as per instructions, we just navigate to dashboard.
    onLogin();
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
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 bg-[#f0f9ff] relative overflow-hidden">
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?w=1600&q=80")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(2px)",
        }}
      />

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 20, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className="fixed top-0 left-1/2 z-[100] bg-slate-900 shadow-2xl text-white px-6 py-3 rounded-2xl flex items-center gap-3 border border-white/10"
          >
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            <span className="text-xs font-black uppercase tracking-widest leading-none">
              {toast}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-4xl bg-white rounded-[1.5rem] overflow-hidden flex shadow-2xl flex-col md:flex-row min-h-[520px]"
      >
        {/* Left Side: Decorative Branding */}
        <div className="hidden md:flex md:w-[45%] bg-gradient-to-br from-blue-600 to-blue-800 p-12 relative overflow-hidden text-white flex-col justify-center">
          {/* Decorative Blobs */}
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-20 -right-20 w-80 h-80 bg-blue-400 rounded-full blur-2xl opacity-40"></div>
          <div className="absolute -bottom-20 left-10 w-40 h-40 bg-blue-300/20 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/5 rounded-full pointer-events-none"></div>

          <div className="relative z-10 space-y-4">
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center p-2.5 mb-6">
              <img
                src={logo}
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <h2 className="text-4xl font-black tracking-tighter leading-none">
              WELCOME
            </h2>
            <p className="text-lg font-bold opacity-90 tracking-widest uppercase">
              Your Destination Awaits
            </p>
            <p className="text-blue-100 text-xs leading-relaxed max-w-[240px] font-medium">
              Join thousands of users discovering the world with Mapman. Secure,
              simple, and intuitive navigation.
            </p>
          </div>
        </div>

        <div className="w-full md:w-[55%] p-8 sm:p-10 md:p-12 flex flex-col justify-center relative bg-white">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-1">
                  <h3 className="text-3xl font-black text-slate-800 tracking-tight">
                    Sign in
                  </h3>
                  <p className="text-slate-400 text-xs font-medium">
                    Verify your phone number to explore
                  </p>
                </div>

                <form onSubmit={handleNext} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                      <Smartphone className="w-4 h-4" /> Mobile Number
                    </label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 group-focus-within:bg-blue-50 transition-colors">
                        <User className="w-4 h-4 text-slate-400 group-focus-within:text-blue-600" />
                      </div>
                      <input
                        type="tel"
                        required
                        placeholder="91XXXXXXXXXX"
                        className="w-full pl-16 pr-4 py-3.5 rounded-xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200 text-slate-700 font-semibold text-sm"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs font-bold animate-pulse text-center">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70"
                  >
                    {loading ? (
                      <span className="flex items-center gap-3 text-xs">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Verifying...
                      </span>
                    ) : (
                      <>
                        Sign In <ChevronRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-slate-100" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-4 text-slate-400 font-bold tracking-widest">
                        Or
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      showToast("This feature currently not available")
                    }
                    className="w-full py-3.5 bg-white border border-slate-200 text-slate-700 font-bold text-sm rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-3 shadow-sm active:scale-[0.98]"
                  >
                    <img
                      src="https://www.google.com/favicon.ico"
                      className="w-4 h-4"
                      alt="G"
                    />
                    Sign In with Google
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
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setStep(1)}
                    className="p-2 hover:bg-slate-50 rounded-xl transition-colors"
                  >
                    <ArrowLeft className="w-6 h-6 text-slate-800" />
                  </button>
                  <h3 className="text-3xl font-black text-slate-800 tracking-tight">
                    Verification
                  </h3>
                </div>

                <div className="space-y-2">
                  <p className="text-slate-500 font-medium">
                    We've sent a 6-digit security code to <br />
                    <span className="font-black text-blue-600 underline decoration-blue-200 underline-offset-4">
                      {phoneNumber}
                    </span>
                  </p>
                </div>

                <div className="flex justify-between gap-2">
                  {otp.map((data, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      className="w-full h-14 text-center text-xl font-black rounded-xl border-2 border-slate-100 bg-slate-50 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200"
                      value={data}
                      onChange={(e) => handleOtpChange(e.target, index)}
                      onFocus={(e) => e.target.select()}
                    />
                  ))}
                </div>

                {error && (
                  <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs font-bold text-center">
                    {error}
                  </div>
                )}

                <button
                  onClick={handleFinalSubmit}
                  disabled={loading}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70"
                >
                  {loading ? (
                    <span className="flex items-center gap-3 text-xs">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Validating...
                    </span>
                  ) : (
                    <>
                      Secure Login <ShieldCheck className="w-5 h-5" />
                    </>
                  )}
                </button>

                <p className="text-center text-sm font-bold text-slate-500">
                  Didn't receive code?{" "}
                  <button
                    onClick={() => {
                      setError(null);
                      sendEmailOtp(phoneNumber).catch((err) =>
                        setError(err.message),
                      );
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    Resend
                  </button>
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-1">
                  <h3 className="text-3xl font-black text-slate-800 tracking-tight">
                    Profile Info
                  </h3>
                  <p className="text-slate-400 text-xs font-medium">
                    One last step to complete your account
                  </p>
                </div>

                <form
                  onSubmit={handleProfileSubmit}
                  className="space-y-4 p-6 rounded-[2rem]"
                >
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                      <User className="w-3.5 h-3.5" /> Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-blue-500 outline-none transition-all text-sm font-semibold"
                      value={profileData.name}
                      onChange={(e) =>
                        setProfileData({ ...profileData, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <Building className="w-3.5 h-3.5" /> State
                      </label>
                      <select
                        className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-blue-500 outline-none transition-all text-sm font-semibold appearance-none"
                        value={profileData.state}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            state: e.target.value,
                            city: "",
                          })
                        }
                      >
                        <option value="">Select State</option>
                        {states.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5" /> City
                      </label>
                      <select
                        className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-blue-500 outline-none transition-all text-sm font-semibold appearance-none"
                        value={profileData.city}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            city: e.target.value,
                          })
                        }
                        disabled={!profileData.state}
                      >
                        <option value="">Select City</option>
                        {cities.map((ct) => (
                          <option key={ct} value={ct}>
                            {ct}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                      <Globe className="w-3.5 h-3.5" /> Country
                    </label>
                    <select
                      className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-blue-500 outline-none transition-all text-sm font-semibold appearance-none"
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
                  </div>

                  {error && (
                    <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs font-bold text-center">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-3 mt-4"
                  >
                    Complete Profile <CheckCircle2 className="w-5 h-5" />
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
