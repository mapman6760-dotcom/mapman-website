import React from "react";
import { motion } from "framer-motion";

const TermsConditions = () => {
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
                    Terms and Conditions
                </h1>
                <p className="text-slate-500 font-medium text-sm md:text-base">
                    Mapman – Terms And Conditions
                </p>
            </div>

            {/* ── CONTENT AREA ── */}
            <div className="space-y-6 text-slate-700 leading-relaxed text-sm md:text-base">
                <div>
                    <p className="mb-6">
                        Welcome to Mapman. These Terms and Conditions govern your access to and use of the Mapman mobile application operated by us.
                    </p>
                    <p>
                        By downloading, accessing, or using Mapman, you agree to be bound by these Terms. If you do not agree, please do not use the App.
                    </p>
                </div>

                {/* Section 1 */}
                <section className="space-y-4">
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                        1. Use of the App
                    </h2>
                    <ul className="space-y-3 pl-4">
                        <li className="flex items-start gap-3">
                            <span className="mt-2.5 w-1 h-1 bg-slate-400 rounded-full shrink-0" />
                            <span>You must be at least 13 years old to use Mapman.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-2.5 w-1 h-1 bg-slate-400 rounded-full shrink-0" />
                            <span>You agree to use the App only for lawful purposes.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-2.5 w-1 h-1 bg-slate-400 rounded-full shrink-0" />
                            <span>You must not misuse the App, interfere with its operation, or attempt unauthorized access.</span>
                        </li>
                    </ul>
                </section>

                {/* Section 2 */}
                <section className="space-y-4 pt-4">
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                        2. User Account & Authentication
                    </h2>
                    <ul className="space-y-3 pl-4">
                        <li className="flex items-start gap-3">
                            <span className="mt-2.5 w-1 h-1 bg-slate-400 rounded-full shrink-0" />
                            <span>Mapman uses mobile number–based OTP authentication.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-2.5 w-1 h-1 bg-slate-400 rounded-full shrink-0" />
                            <span>You agree to use the App only for lawful purposes.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-2.5 w-1 h-1 bg-slate-400 rounded-full shrink-0" />
                            <span>We are not responsible for unauthorized access resulting from loss or misuse of your device.</span>
                        </li>
                    </ul>
                </section>

                {/* Section 3 */}
                <section className="space-y-4 pt-4">
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                        3. Location-Based Services
                    </h2>
                    <ul className="space-y-3 pl-4">
                        <li className="flex items-start gap-3">
                            <span className="mt-2.5 w-1 h-1 bg-slate-400 rounded-full shrink-0" />
                            <span>Mapman provides features that rely on location data.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-2.5 w-1 h-1 bg-slate-400 rounded-full shrink-0" />
                            <span>By using the App, you consent to the collection and use of location information as described in our Privacy Policy.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-2.5 w-1 h-1 bg-slate-400 rounded-full shrink-0" />
                            <span>You can enable or disable location access at any time through your device settings; some features may not function properly without it.</span>
                        </li>
                    </ul>
                </section>

                {/* Section 4 */}
                <section className="space-y-4 pt-4">
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                        4. User Responsibilities
                    </h2>
                    <p>You agree not to:</p>
                    <ul className="space-y-3 pl-4">
                        <li className="flex items-start gap-3">
                            <span className="mt-2.5 w-1 h-1 bg-slate-400 rounded-full shrink-0" />
                            <span>Provide false or misleading information.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-2.5 w-1 h-1 bg-slate-400 rounded-full shrink-0" />
                            <span>Use the App for illegal or harmful activities.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-2.5 w-1 h-1 bg-slate-400 rounded-full shrink-0" />
                            <span>Attempt to copy, modify, reverse engineer, or distribute the App.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-2.5 w-1 h-1 bg-slate-400 rounded-full shrink-0" />
                            <span>Violate any applicable laws or regulations.</span>
                        </li>
                    </ul>
                </section>

                {/* Section 5 */}
                <section className="space-y-4 pt-4">
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                        5. Intellectual Property
                    </h2>
                    <ul className="space-y-3 pl-4">
                        <li className="flex items-start gap-3">
                            <span className="mt-2.5 w-1 h-1 bg-slate-400 rounded-full shrink-0" />
                            <span>All content, features, and functionality in Mapman (including design, text, graphics, logos, and icons) are the exclusive property of Mapman.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-2.5 w-1 h-1 bg-slate-400 rounded-full shrink-0" />
                            <span>You may not reproduce or redistribute any part of the App without prior written permission.</span>
                        </li>
                    </ul>
                </section>

                {/* Section 6 */}
                <section className="space-y-4 pt-4">
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                        6. Third-Party Services
                    </h2>
                    <ul className="space-y-3 pl-4">
                        <li className="flex items-start gap-3">
                            <span className="mt-2.5 w-1 h-1 bg-slate-400 rounded-full shrink-0" />
                            <span>The App may integrate third party services such as map providers, SMS/OTP services, or analytics tools.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-2.5 w-1 h-1 bg-slate-400 rounded-full shrink-0" />
                            <span>Mapman is not responsible for the content, policies, or practices of third party services.</span>
                        </li>
                    </ul>
                </section>

                {/* Section 7 */}
                <section className="space-y-4 pt-4">
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                        7. Service Availability
                    </h2>
                    <ul className="space-y-3 pl-4">
                        <li className="flex items-start gap-3">
                            <span className="mt-2.5 w-1 h-1 bg-slate-400 rounded-full shrink-0" />
                            <span>We strive to keep Mapman available at all times, but we do not guarantee uninterrupted or error free operation.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-2.5 w-1 h-1 bg-slate-400 rounded-full shrink-0" />
                            <span>We may suspend, update, or discontinue the App or any feature at any time without notice.</span>
                        </li>
                    </ul>
                </section>

                {/* Section 8 */}
                <section className="space-y-4 pt-4">
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                        8. Termination
                    </h2>
                    <ul className="space-y-3 pl-4">
                        <li className="flex items-start gap-3">
                            <span className="mt-2.5 w-1 h-1 bg-slate-400 rounded-full shrink-0" />
                            <span>We reserve the right to suspend or terminate access to Mapman if you violate these Terms.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-2.5 w-1 h-1 bg-slate-400 rounded-full shrink-0" />
                            <span>You may stop using the App at any time.</span>
                        </li>
                    </ul>
                </section>

                {/* Section 9 */}
                <section className="space-y-4 pt-4">
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                        9. Limitation of Liability
                    </h2>
                    <ul className="space-y-3 pl-4">
                        <li className="flex items-start gap-3">
                            <span className="mt-2.5 w-1 h-1 bg-slate-400 rounded-full shrink-0" />
                            <span>Mapman is provided on an "as is" and "as available" basis.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-2.5 w-1 h-1 bg-slate-400 rounded-full shrink-0" />
                            <span>We are not liable for any direct, indirect, incidental, or consequential damages arising from your use of the App.</span>
                        </li>
                    </ul>
                </section>

                {/* Section 10 */}
                <section className="space-y-4 pt-4">
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                        10. Indemnification
                    </h2>
                    <p>You agree to indemnify and hold Mapman harmless from any claims, damages, or expenses arising from your use of the App or violation of these Terms.</p>
                </section>

                {/* Section 11 */}
                <section className="space-y-4 pt-4">
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                        11. Changes to These Terms
                    </h2>
                    <ul className="space-y-3 pl-4">
                        <li className="flex items-start gap-3">
                            <span className="mt-2.5 w-1 h-1 bg-slate-400 rounded-full shrink-0" />
                            <span>We may update these Terms from time to time.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-2.5 w-1 h-1 bg-slate-400 rounded-full shrink-0" />
                            <span>Continued use of the App after changes means you accept the updated Terms.</span>
                        </li>
                    </ul>
                </section>

                {/* Section 12 */}
                <section className="space-y-4 pt-4">
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                        12. Governing Law
                    </h2>
                    <p>These Terms are governed by and interpreted in accordance with the laws of India.</p>
                </section>

                {/* Section 13 */}
                <section className="space-y-4 pt-4">
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                        13. Contact Us
                    </h2>
                    <p>If you have any questions about these Terms and Conditions, please contact us:</p>
                    <a href="mailto:mapman6760@gmail.com" className="font-bold text-blue-700 text-lg hover:underline transition-all">mapman6760@gmail.com</a>
                </section>

                <div className="pt-10 pb-12 border-t border-slate-100 text-[10px] md:text-[11px] text-slate-400 uppercase tracking-[0.2em] font-bold">
                    Last Updated: April 2026
                </div>
            </div>
        </motion.div>
    );
};

export default TermsConditions;
