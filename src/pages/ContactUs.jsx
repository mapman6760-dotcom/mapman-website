import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, User, FileText, Clock } from "lucide-react";

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
  };

  const inputCls = "w-full px-4 py-3.5 bg-slate-900/60 border border-slate-700 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all font-medium text-white placeholder-slate-500 text-sm";

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16"
    >
      {/* ── HERO HEADER ── */}
      <motion.div variants={itemVariants} className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 border border-slate-800 shadow-2xl p-10 md:p-14 text-center">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -mr-32 -mt-32 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500/10 rounded-full blur-[100px] -ml-20 -mb-20 pointer-events-none" />
        <div className="h-[2px] w-full absolute top-0 left-0 bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full">
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            <span className="text-xs font-black text-blue-300 uppercase tracking-[0.3em]">Get in Touch</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tighter">
            We'd Love to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Hear From You</span>
          </h1>
          <p className="text-slate-400 text-base leading-relaxed font-medium">
            Have any questions, feedback, or business inquiries? Drop us a message and our team will get back to you shortly.
          </p>
        </div>
      </motion.div>

      {/* ── MAIN GRID ── */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-stretch">

        {/* ── LEFT: Contact Info ── */}
        <div className="lg:col-span-5 relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 border border-slate-800 p-8 md:p-10 shadow-2xl flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-[80px] -ml-10 -mb-10 pointer-events-none" />

          <div className="relative z-10 space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full" />
                <h3 className="text-xl font-black text-white uppercase tracking-tight">Contact Information</h3>
              </div>
              <p className="text-slate-400 text-sm font-medium leading-relaxed pl-4">
                Reach out to us through any of our channels or visit our headquarters.
              </p>
            </div>

            <div className="space-y-5">
              {[
                { icon: Mail, color: "from-blue-500 to-blue-700", glow: "shadow-blue-500/20", title: "Email Address", detail: "mapman6760@gmail.com", href: "mailto:mapman6760@gmail.com" },
                { icon: Phone, color: "from-emerald-500 to-teal-700", glow: "shadow-emerald-500/20", title: "Phone Number", detail: "+91 98765 43210", href: "tel:+919876543210" },
                { icon: MapPin, color: "from-rose-500 to-red-700", glow: "shadow-rose-500/20", title: "Office Address", detail: "123 Business Hub, 4th Floor, Tech Zone, Bangalore - 560001", href: "#" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start group">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg ${item.glow} shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1">{item.title}</h5>
                    {item.href !== "#" ? (
                      <a href={item.href} className="text-white font-medium text-sm hover:text-blue-400 transition-colors">{item.detail}</a>
                    ) : (
                      <p className="text-white font-medium text-sm leading-relaxed">{item.detail}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 mt-8 pt-6 border-t border-slate-800 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">
              Available: Mon – Fri (9am – 6pm)
            </span>
          </div>
        </div>

        {/* ── RIGHT: FORM ── */}
        <div className="lg:col-span-7 relative overflow-hidden bg-white border border-slate-100 rounded-[2rem] p-8 md:p-10 shadow-xl flex flex-col justify-center">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-50/50 rounded-full blur-[100px] -ml-20 -mt-20 pointer-events-none" />

          <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-blue-700 rounded-full" />
              <h3 className="text-lg font-black text-slate-900 tracking-tighter uppercase">Send a Message</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { icon: User, label: "Full Name", name: "name", type: "text", placeholder: "John Doe" },
                { icon: Mail, label: "Email Address", name: "email", type: "email", placeholder: "john@example.com" },
              ].map((field) => (
                <div key={field.name} className="space-y-2">
                  <label className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <field.icon className="w-3 h-3" /> {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 focus:outline-none transition-all font-medium text-slate-800 text-sm"
                  />
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <FileText className="w-3 h-3" /> Subject
              </label>
              <input
                type="text" name="subject" value={formData.subject} onChange={handleChange} required
                placeholder="Inquiry about merchant registration..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 focus:outline-none transition-all font-medium text-slate-800 text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <MessageSquare className="w-3 h-3" /> Message
              </label>
              <textarea
                name="message" value={formData.message} onChange={handleChange} required rows="4"
                placeholder="Type your message here..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 focus:outline-none transition-all font-medium text-slate-800 text-sm resize-none"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 disabled:from-blue-400 disabled:to-blue-500 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-600/20 active:scale-95 transition-all"
              >
                {isSubmitting ? (
                  <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Sending...</>
                ) : (
                  <>Send Message <Send className="w-3.5 h-3.5" /></>
                )}
              </button>

              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                    className="flex items-center gap-2 text-emerald-600"
                  >
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span className="text-xs font-bold uppercase tracking-wider">Message sent successfully!</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ContactUs;
