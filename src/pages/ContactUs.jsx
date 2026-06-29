import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, User, FileText, Clock, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import SEO from "../components/SEO";

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

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

  const contactSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": "https://mapman.in/contact-us#webpage",
        "url": "https://mapman.in/contact-us",
        "name": "Contact Mapman - Support, Careers & Merchant Registration",
        "description": "Get in touch with the Mapman support team, powered by Pafagel Software Solutions Pvt Ltd, for partner inquiries and merchant support.",
        "inLanguage": "en-US"
      },
      {
        "@type": "ContactPoint",
        "telephone": "+91-9342376760",
        "contactType": "customer support",
        "email": "mapman6760@gmail.com",
        "areaServed": "IN",
        "availableLanguage": ["English", "Tamil"]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do I register my business on Mapman?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sign up for a free Mapman account, go to your profile, and click 'Add Shop' to input your coordinates, photos, and contact info. It takes under 5 minutes to list your business."
            }
          },
          {
            "@type": "Question",
            "name": "Is there a subscription fee for listing my shop?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Mapman offers a highly capable free tier for all local shops to get listed. We also provide premium merchant growth plans featuring advanced video analytics, priority map ranking, and premium ad placements."
            }
          },
          {
            "@type": "Question",
            "name": "How long does it take for my listing to get verified?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our quality audit team typically reviews and verifies new listings within 24 hours of submission to ensure high directory quality and accurate coordinates."
            }
          },
          {
            "@type": "Question",
            "name": "How can I get support if I face coordinate mapping issues?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can reach out directly via our contact form, email us at mapman6760@gmail.com, or call our support desk at +91 9342376760. We will manually audit and correct your coordinates."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="w-full bg-white min-h-screen animate-fade-in overflow-x-hidden">
      <SEO
        title="Contact Mapman - Support, Careers & Merchant Registration Support"
        description="Get in touch with the Mapman support team, powered by Pafagel Software Solutions Pvt Ltd. Contact us for merchant onboarding, coordinate updates, and business video promotions."
        canonical="https://mapman.in/contact-us"
        schema={contactSchema}
      />

      {/* ── TOP BANNER ── */}
      <div
        className="relative w-full overflow-hidden bg-slate-900 bg-cover bg-center"
        style={{ backgroundImage: `url(/assets/contactus.jpeg)` }}
      >
        {/* Text Readability Overlay */}
        <div className="absolute inset-0 bg-slate-950/70" />

        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "28px 28px"
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-28 text-center">
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.1] mb-6">
            We'd Love to
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 mt-2">Hear From You</span>
          </h1>
          <p className="text-base md:text-xl text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
            Have questions about local discovery, need help updating your shop coordinates, or want to explore partnership opportunities? Let's connect.
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            {[
              { icon: Mail, label: "mapman6760@gmail.com", href: "mailto:mapman6760@gmail.com" },
              { icon: Phone, label: "+91 9342376760", href: "tel:+919342376760" },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href || undefined}
                className="inline-flex items-center gap-3 px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-sm font-bold text-white transition-all backdrop-blur-md shadow-lg"
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
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:items-stretch">

          {/* ── LEFT: Contact Info (NAP Anchor) ── */}
          <div className="lg:col-span-5 relative overflow-hidden rounded-[2.5rem] bg-slate-950 p-8 md:p-12 shadow-2xl border border-slate-800 flex flex-col justify-between group/card">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[60px] -mr-16 -mt-16 pointer-events-none transition-transform duration-1000 group-hover/card:scale-150" />
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-cyan-500/10 rounded-full blur-[60px] -ml-10 -mb-10 pointer-events-none transition-transform duration-1000 group-hover/card:scale-150" />

            <div className="relative z-10 space-y-12">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-5">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">Active Support Team</span>
                </div>
                <h3 className="text-3xl font-black text-white tracking-tight mb-4 leading-tight">Corporate<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Authority</span></h3>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">
                  Mapman is developed, operated, and powered by the digital marketing and software engineering experts at <strong>Pafagel Software Solutions Pvt Ltd</strong>.
                </p>
              </div>

              <div className="space-y-5">
                {[
                  { icon: Mail, title: "Email Enquiries", detail: "mapman6760@gmail.com", href: "mailto:mapman6760@gmail.com", iconColor: "text-sky-400" },
                  { icon: Phone, title: "Phone Line", detail: "+91 9342376760", href: "tel:+919342376760", iconColor: "text-emerald-400" },
                  { icon: MapPin, title: "Headquarters", detail: "Chennai, Tamil Nadu, India", href: null, iconColor: "text-purple-400" },
                ].map((item, i) => (
                  <div key={i} className="group/item flex items-center gap-5 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/15 transition-all duration-300 cursor-default hover:-translate-y-1">
                    <div className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover/item:scale-110 shadow-inner">
                      <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                    </div>
                    <div>
                      <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{item.title}</div>
                      {item.href ? (
                        <a href={item.href} className="text-slate-200 font-bold text-sm hover:text-cyan-400 transition-colors block">{item.detail}</a>
                      ) : (
                        <p className="text-slate-200 font-bold text-sm leading-relaxed">{item.detail}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hours footer */}
            <div className="relative z-10 mt-12 pt-6 flex items-center justify-between border-t border-slate-900">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Office Hours</div>
                  <span className="text-xs text-slate-300 font-bold">
                    Mon – Fri (9:00am – 6:00pm)
                  </span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center relative">
                <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-pulse" />
              </div>
            </div>
          </div>

          {/* ── RIGHT: FORM ── */}
          <div className="lg:col-span-7 bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-12 shadow-sm flex flex-col justify-center">
            <div className="mb-8">
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Send a Message</h3>
              <p className="text-slate-500 text-sm font-medium mt-2 leading-relaxed">
                Fill out the form below. A Mapman local marketing strategist will review your requirements and respond within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                  placeholder="Inquiry about merchant onboarding, coordinates support, etc."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 focus:outline-none transition-all font-medium text-slate-800 placeholder-slate-400 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <MessageSquare className="w-3 h-3" /> Message
                </label>
                <textarea
                  name="message" value={formData.message} onChange={handleChange} required rows="4"
                  placeholder="Tell us details about your shop, location, or how we can assist you..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 focus:outline-none transition-all font-medium text-slate-800 placeholder-slate-400 text-sm resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:bg-blue-400 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-600/25 active:scale-95 transition-all"
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
                    <span className="text-xs font-black uppercase tracking-wider">Message sent successfully!</span>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* ── FAQ ACCORDION STRIP (LOCAL SEO IMPACT) ── */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 pb-20">
        <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-8 md:p-14 shadow-inner">
          
          <div className="text-center max-w-xl mx-auto mb-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100/50 border border-blue-200 rounded-full">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              <span className="text-[10px] font-black text-blue-700 uppercase tracking-widest">Support Desk</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Frequently Asked Questions</h3>
            <p className="text-slate-500 text-sm md:text-base font-medium">
              Find instant answers to common onboarding and support inquiries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                q: "How do I register my business on Mapman?",
                a: "Sign up for a free Mapman account, go to your profile, and click 'Add Shop' to input your coordinates, photos, and contact info. It takes under 5 minutes to list your business."
              },
              {
                q: "Is there a subscription fee for listing my shop?",
                a: "Mapman offers a highly capable free tier for all local shops to get listed. We also provide premium merchant growth plans featuring advanced video analytics, priority map ranking, and premium ad placements."
              },
              {
                q: "How long does it take for my listing to get verified?",
                a: "Our quality audit team typically reviews and verifies new listings within 24 hours of submission to ensure high directory quality and accurate coordinates."
              },
              {
                q: "How can I get support if I face coordinate mapping issues?",
                a: "You can reach out directly via our contact form, email us at mapman6760@gmail.com, or call our support desk at +91 9342376760. We will manually audit and correct your coordinates."
              }
            ].map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-md transition-all duration-300"
                >
                  <button 
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left font-black text-slate-900 text-sm md:text-base focus:outline-none"
                  >
                    <span>{faq.q}</span>
                    <span className="text-blue-500 shrink-0 pl-2">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>
                  <div className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[150px] mt-3 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-medium pt-2 border-t border-slate-50">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactUs;
