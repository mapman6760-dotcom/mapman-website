import React from "react";
import { motion } from "framer-motion";

const CookiePolicy = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-4xl mx-auto px-4 py-8 md:py-12"
    >
      <div className="mb-8">
        <span className="px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-600 text-xs font-black uppercase tracking-widest">
          Privacy Settings
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 tracking-tight mb-2 mt-4">
          Cookie Policy
        </h1>
        <p className="text-slate-500 font-medium text-sm md:text-base">
          Mapman – Cookie & Tracker Usage Policy
        </p>
      </div>

      <div className="space-y-6 text-slate-700 leading-relaxed font-medium">
        <div>
          <p className="mb-6">
            Like many modern applications, Mapman uses cookies and tracking technologies to understand app usage, maintain user sessions, and customize your experience.
          </p>
          <p>
            This Cookie Policy details what cookies are, why we use them, and how you can manage your preferences.
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3">
            1. What Are Cookies?
          </h2>
          <p>
            Cookies are small text files stored on your computer or mobile device when you load websites or applications in a browser. They are widely used to make websites work, or work more efficiently, as well as to provide reporting data.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3">
            2. How We Use Cookies
          </h2>
          <p>
            We use both first-party and third-party cookies for several reasons:
          </p>
          <ul className="space-y-3 pl-4 list-disc">
            <li>
              <strong>Essential Cookies:</strong> These cookies are critical to let you log in, access secured parts of the application, and save your session. Without these cookies, features like OTP authentication status and saved business items would not work.
            </li>
            <li>
              <strong>Performance & Analytics Cookies:</strong> These help us monitor how users interact with Mapman, allowing us to identify bugs, count visits, and analyze traffic to improve overall performance.
            </li>
            <li>
              <strong>Functional Cookies:</strong> These remember choices you make, such as map zoom preferences or whether you dismiss certain tutorial banners, providing a more customized experience.
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3">
            3. Local Storage Usage
          </h2>
          <p>
            In addition to cookies, Mapman makes use of <strong>HTML5 Local Storage</strong> to persist user authentication tokens (`token`) and user identifiers (`userId`). This allows us to keep you logged in across sessions and prevent you from having to verify your OTP code every time you open the website.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3">
            4. Managing Your Preferences
          </h2>
          <p>
            Most web browsers allow you to control cookies through their settings menu. You can:
          </p>
          <ul className="space-y-3 pl-4 list-disc">
            <li>Configure your browser to block cookies or notify you when a new cookie is placed.</li>
            <li>Clear cookies and local storage directly from your browser's security/privacy tab.</li>
          </ul>
          <p className="pt-2 italic text-slate-500">
            Please note: If you disable or delete essential cookies, some parts of Mapman (such as signing in or saving merchant items) may not function correctly.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3">
            5. Changes to This Policy
          </h2>
          <p>
            We may update our Cookie Policy periodically. We encourage you to check this page regularly to stay informed about how we use cookies and related tracking technologies.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3">
            6. Contact Us
          </h2>
          <p>
            If you have any questions or concerns regarding our use of cookies, please email us:
          </p>
          <a href="mailto:mapman6760@gmail.com" className="font-bold text-blue-700 text-lg hover:underline transition-all">
            mapman6760@gmail.com
          </a>
        </section>

        <div className="pt-10 pb-12 border-t border-slate-100 text-[10px] md:text-[11px] text-slate-400 uppercase tracking-[0.2em] font-bold">
          Last Updated: June 2026
        </div>
      </div>
    </motion.div>
  );
};

export default CookiePolicy;
