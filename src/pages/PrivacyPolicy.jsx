import React from "react";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-4xl mx-auto px-2 py-6"
        >
            {/* ── HEADER ── */}
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 tracking-tight mb-2">
                    Privacy Policy
                </h1>
                <p className="text-slate-500 font-medium text-sm md:text-base">
                    Mapman – Privacy Policy
                </p>
            </div>

            {/* ── CONTENT AREA ── */}
            <div className="space-y-6 text-slate-700 leading-relaxed">
                <div>
                    <p className="mb-6">
                        Mapman operates the Mapman mobile application (the "App"). Your privacy is important to us.
                        This Privacy Policy explains how we collect, use, and protect your information when you use Mapman.
                    </p>
                    <p>
                        By using the App, you agree to the practices described in this Privacy Policy.
                    </p>
                </div>

                {/* Section 1 */}
                <section className="space-y-6">
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                        1. Information We Collect
                    </h2>

                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-slate-800">1.1 Personal Information</h3>
                        <p>We collect only the minimum personal information required to provide our services:</p>
                        <ul className="space-y-3 pl-4">
                            <li className="flex items-start gap-3">
                                <span className="mt-2.5 w-1 h-1 bg-slate-400 rounded-full shrink-0" />
                                <span>Mobile phone number – used solely for OTP-based login and account verification.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="mt-2.5 w-1 h-1 bg-slate-400 rounded-full shrink-0" />
                                <span>We do not collect passwords.</span>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4 pt-2">
                        <h3 className="text-lg font-bold text-slate-800">1.2 Location Information</h3>
                        <ul className="space-y-3 pl-4">
                            <li className="flex items-start gap-3">
                                <span className="mt-2.5 w-1 h-1 bg-slate-400 rounded-full shrink-0" />
                                <span>Mapman collects location data to enable map-based and location-dependent features.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="mt-2.5 w-1 h-1 bg-slate-400 rounded-full shrink-0" />
                                <span>Location access is collected only with your permission.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="mt-2.5 w-1 h-1 bg-slate-400 rounded-full shrink-0" />
                                <span>You can enable or disable location access at any time through your device settings.</span>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4 pt-2">
                        <h3 className="text-lg font-bold text-slate-800">1.3 Usage Information</h3>
                        <p>We may collect limited, non-personal usage data such as:</p>
                        <ul className="space-y-3 pl-4">
                            <li className="flex items-start gap-3">
                                <span className="mt-2.5 w-1 h-1 bg-slate-400 rounded-full shrink-0" />
                                <span>App interactions</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="mt-2.5 w-1 h-1 bg-slate-400 rounded-full shrink-0" />
                                <span>Device information (model, OS version)</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="mt-2.5 w-1 h-1 bg-slate-400 rounded-full shrink-0" />
                                <span>Crash logs and performance data</span>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Section 2 */}
                <section className="space-y-4 pt-4">
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                        2. How We Use Your Information
                    </h2>
                    <p>We use the collected information to:</p>
                    <ul className="space-y-3 pl-4">
                        <li className="flex items-start gap-3">
                            <span className="mt-2.5 w-1 h-1 bg-slate-400 rounded-full shrink-0" />
                            <span>Authenticate users using OTP</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-2.5 w-1 h-1 bg-slate-400 rounded-full shrink-0" />
                            <span>Provide and improve map-based features</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-2.5 w-1 h-1 bg-slate-400 rounded-full shrink-0" />
                            <span>Maintain app performance and security</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-2.5 w-1 h-1 bg-slate-400 rounded-full shrink-0" />
                            <span>Communicate important service-related updates</span>
                        </li>
                    </ul>
                </section>

                {/* Section 3 */}
                <section className="space-y-4 pt-4">
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                        3. Data Sharing
                    </h2>
                    <p className="font-bold text-slate-800 uppercase text-sm tracking-wide">We do not sell your personal data.</p>
                    <p>We may share limited data only with:</p>
                    <ul className="space-y-3 pl-4">
                        <li className="flex items-start gap-3">
                            <span className="mt-2.5 w-1 h-1 bg-slate-400 rounded-full shrink-0" />
                            <span>Service providers (such as OTP SMS services or map providers) strictly for app functionality</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-2.5 w-1 h-1 bg-slate-400 rounded-full shrink-0" />
                            <span>Legal authorities if required by law</span>
                        </li>
                    </ul>
                </section>

                {/* Section 4 */}
                <section className="space-y-4 pt-4">
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                        4. Data Security
                    </h2>
                    <p>We use reasonable technical and organizational measures to protect your data.</p>
                    <ul className="space-y-3 pl-4">
                        <li className="flex items-start gap-3">
                            <span className="mt-2.5 w-1 h-1 bg-slate-400 rounded-full shrink-0" />
                            <span>Data is encrypted during transmission</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-2.5 w-1 h-1 bg-slate-400 rounded-full shrink-0" />
                            <span>However, no method of electronic storage is 100% secure</span>
                        </li>
                    </ul>
                </section>

                {/* Section 5 */}
                <section className="space-y-4 pt-4">
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                        5. User Choices & Rights
                    </h2>
                    <p>You have the right to:</p>
                    <ul className="space-y-3 pl-4">
                        <li className="flex items-start gap-3">
                            <span className="mt-2.5 w-1 h-1 bg-slate-400 rounded-full shrink-0" />
                            <span>Access or update your information</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-2.5 w-1 h-1 bg-slate-400 rounded-full shrink-0" />
                            <span>Withdraw location permissions via device settings</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-2.5 w-1 h-1 bg-slate-400 rounded-full shrink-0" />
                            <span>Request account and data deletion</span>
                        </li>
                    </ul>
                    <p className="pt-2 italic text-slate-500">To exercise these rights, contact us using the email below.</p>
                </section>

                {/* Section 6 */}
                <section className="space-y-4 pt-4">
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                        6. Data Retention
                    </h2>
                    <p>We retain personal data only for as long as necessary to provide the App's services or comply with legal obligations.</p>
                </section>

                {/* Section 7 */}
                <section className="space-y-4 pt-4">
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                        7. Children's Privacy
                    </h2>
                    <p>Mapman is not intended for children under 13. We do not knowingly collect personal information from children.</p>
                </section>

                {/* Section 8 */}
                <section className="space-y-4 pt-4">
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                        8. Changes to This Policy
                    </h2>
                    <p>We may update this Privacy Policy from time to time. Changes will be reflected on this page with an updated date.</p>
                </section>

                {/* Section 9 */}
                <section className="space-y-4 pt-4">
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                        9. Contact Us
                    </h2>
                    <p>If you have any questions about this Privacy Policy, please contact us:</p>
                    <a href="mailto:mapman6760@gmail.com" className="font-bold text-blue-700 text-lg hover:underline transition-all">mapman6760@gmail.com</a>
                </section>

                <div className="pt-10 pb-12 border-t border-slate-100 text-[10px] md:text-[11px] text-slate-400 uppercase tracking-[0.2em] font-bold">
                    Last Updated: April 2026
                </div>
            </div>
        </motion.div>
    );
};

export default PrivacyPolicy;
