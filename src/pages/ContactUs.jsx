import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, User, FileText, Clock, ArrowRight } from "lucide-react";
import SEO from "../components/SEO";

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

  return (
    <div className="w-full bg-white min-h-screen animate-fade-in overflow-x-hidden">
      <SEO
        title="Contact Us | Mapman"
        description="Get in touch with the Mapman team for support, partnership inquiries, or feedback. We'd love to hear from you."
        canonical="https://mapman.in/contact-us"
      />

      {/* ── TOP BANNER ── */}
      <div
        className="relative w-[100vw] left-1/2 -translate-x-1/2 overflow-hidden bg-slate-900 bg-cover bg-center"
        style={{ backgroundImage: `url(/assets/contactus.jpeg)` }}
      >
        {/* Text Readability Overlay */}
        <div className="absolute inset-0 bg-slate-900/60" />

        {/* Glass Bubbles */}
        {/* <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 backdrop-blur-md border border-white/10 rounded-full" />
        <div className="absolute -bottom-16 -left-20 w-72 h-72 bg-white/5 backdrop-blur-md border border-white/10 rounded-full" /> */}

        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "28px 28px"
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 border border-white/20 rounded-full mb-6">
            <span className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse" />
            <span className="text-xs font-bold text-white/90 uppercase tracking-widest">Get in Touch</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.1] mb-5">
            We'd Love to
            <span className="block text-cyan-300 mt-1">Hear From You</span>
          </h1>
          <p className="text-base md:text-lg text-blue-100 font-medium max-w-xl mx-auto leading-relaxed">
            Have questions, feedback, or business inquiries? Drop us a message and our team will respond promptly.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {[
              { icon: Mail, label: "mapman6760@gmail.com", href: "mailto:mapman6760@gmail.com" },
              { icon: Phone, label: "+91 9342376760", href: "tel:+919342376760" },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href || undefined}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-sm font-semibold text-white transition-all backdrop-blur-sm"
              >
                <item.icon className="w-4 h-4 text-cyan-300" />
                {item.label}
              </a>
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

      {/* ── MAIN GRID ── */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-stretch">

          {/* ── LEFT: Contact Info ── */}
          <div className="lg:col-span-5 relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 md:p-10 shadow-xl flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-16 -mt-16 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full -ml-10 -mb-10 pointer-events-none" />

            <div className="relative z-10 space-y-8">
              <div>
                <h3 className="text-2xl font-black text-white tracking-tight mb-2">Contact Information</h3>
                <p className="text-blue-200 text-sm font-medium leading-relaxed">
                  Reach out to us through any of our channels or visit our headquarters.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { icon: Mail, bg: "bg-white/10", color: "text-white", title: "Email Address", detail: "mapman6760@gmail.com", href: "mailto:mapman6760@gmail.com" },
                  { icon: Phone, bg: "bg-white/10", color: "text-white", title: "Phone Number", detail: "+91 9342376760", href: "tel:+919342376760" },
                  { icon: MapPin, bg: "bg-white/10", color: "text-white", title: "Office Address", detail: "Chennai, Tamil Nadu, India", href: null },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start group">
                    <div className={`w-11 h-11 ${item.bg} border border-white/20 rounded-2xl flex items-center justify-center ${item.color} shrink-0 group-hover:bg-white/20 transition-colors`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-blue-200 uppercase tracking-widest mb-1">{item.title}</div>
                      {item.href ? (
                        <a href={item.href} className="text-white font-semibold text-sm hover:text-cyan-300 transition-colors">{item.detail}</a>
                      ) : (
                        <p className="text-white font-semibold text-sm leading-relaxed">{item.detail}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hours footer */}
            <div className="relative z-10 mt-8 pt-6 border-t border-white/20 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                <Clock className="w-4 h-4 text-cyan-300" />
              </div>
              <span className="text-sm text-blue-100 font-semibold">
                Available: Mon – Fri (9am – 6pm)
              </span>
            </div>
          </div>

          {/* ── RIGHT: FORM ── */}
          <div className="lg:col-span-7 bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm flex flex-col justify-center">
            <div className="mb-8">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Send a Message</h3>
              <p className="text-slate-500 text-sm font-medium mt-1">Fill out the form below and we'll be back within 24 hours.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
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
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 focus:outline-none transition-all font-medium text-slate-800 placeholder-slate-400 text-sm"
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
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 focus:outline-none transition-all font-medium text-slate-800 placeholder-slate-400 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <MessageSquare className="w-3 h-3" /> Message
                </label>
                <textarea
                  name="message" value={formData.message} onChange={handleChange} required rows="4"
                  placeholder="Type your message here..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 focus:outline-none transition-all font-medium text-slate-800 placeholder-slate-400 text-sm resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2.5 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-600/20 active:scale-95 transition-all"
                >
                  {isSubmitting ? (
                    <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Sending...</>
                  ) : (
                    <>Send Message <Send className="w-3.5 h-3.5" /></>
                  )}
                </button>

                {isSuccess && (
                  <div className="flex items-center gap-2 text-emerald-600 animate-fade-in">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span className="text-xs font-bold uppercase tracking-wider">Message sent successfully!</span>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* ── FAQ STRIP ── */}
      {/* <div className="max-w-6xl mx-auto px-6 md:px-10 pb-16">
        <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-8 md:p-12">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-full mb-4">
              <MessageSquare className="w-4 h-4 text-blue-500" />
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Support Desk</span>
            </div>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">Frequently Asked Questions</h3>
            <p className="text-slate-500 text-base font-medium mt-3 max-w-xl mx-auto">Find quick answers to common questions about our platform and services.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { q: "How do I register my business?", a: "Sign up for a Mapman account, go to your profile, and click 'Add Shop' to list your business in minutes." },
              { q: "Is Mapman free to use?", a: "Mapman offers a free tier for consumers. Merchant plans are available with premium features for business owners." },
              { q: "How long does it take to respond?", a: "Our team typically responds within 24 hours on business days. Urgent issues are prioritized." },
              { q: "Can I update my shop details?", a: "Yes, merchants can edit their shop information, images, and hours anytime from the merchant dashboard." },
            ].map((faq, i) => (
              <div key={i} className="group flex flex-col gap-3 p-6 bg-slate-50 hover:bg-white border border-slate-100 hover:border-blue-100 rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                    <span className="text-blue-600 font-black text-sm">Q</span>
                  </div>
                  <div>
                    <h5 className="font-black text-slate-900 text-base tracking-tight mb-2 mt-1">{faq.q}</h5>
                    <p className="text-slate-500 text-sm leading-relaxed font-medium">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ContactUs;
