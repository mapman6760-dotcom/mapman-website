import React from "react";
import { motion } from "framer-motion";

const RefundPolicy = () => {
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
          Terms of Service
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 tracking-tight mb-2 mt-4">
          Refund Policy
        </h1>
        <p className="text-slate-500 font-medium text-sm md:text-base">
          Mapman – Cancellation & Refund Policy
        </p>
      </div>

      <div className="space-y-6 text-slate-700 leading-relaxed font-medium">
        <div>
          <p className="mb-6">
            Thank you for subscribing or purchasing services on Mapman. Please read this policy carefully. It describes your rights and duties concerning cancellations, subscription terminations, and refunds.
          </p>
          <p>
            By subscribing to any premium listing, marketing banner, or promotional package on Mapman, you agree to the terms of this Refund Policy.
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3">
            1. Subscription Cancellations
          </h2>
          <p>
            You can cancel your subscription at any time. When you cancel:
          </p>
          <ul className="space-y-3 pl-4 list-disc">
            <li>Your premium features, verification badges, and listing ads will remain active until the end of your current billing period.</li>
            <li>No further charges will be made to your credit card or payment method once the current cycle expires.</li>
            <li>We do not offer pro-rated refunds for mid-cycle cancellations.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3">
            2. Refund Eligibility
          </h2>
          <p>
            Refunds are evaluated on a case-by-case basis. Below are the conditions under which refunds may be granted:
          </p>
          <ul className="space-y-3 pl-4 list-disc">
            <li>
              <strong>Technical Failures:</strong> If you were charged but the advertising banner or premium merchant profile was not activated due to a technical error on our platform, and we fail to resolve it within 7 business days, you are eligible for a full refund.
            </li>
            <li>
              <strong>Duplicate Billing:</strong> If our payment gateway processor records duplicate transactions for the same subscription package, the extra charges will be fully refunded to your original payment method.
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3">
            3. Non-Refundable Situations
          </h2>
          <p>
            We cannot issue refunds in the following circumstances:
          </p>
          <ul className="space-y-3 pl-4 list-disc">
            <li>You change your mind after buying a promotion banner or advertising package that has already started running.</li>
            <li>Your merchant profile is suspended or removed due to violations of our Terms & Conditions (e.g., uploading illegal materials or false business information).</li>
            <li>Your listing does not receive the expected amount of user traffic or interactions.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3">
            4. How to Request a Refund
          </h2>
          <p>
            To request a refund, please send an email to our support team with:
          </p>
          <ul className="space-y-3 pl-4 list-disc">
            <li>Your registered merchant email or phone number.</li>
            <li>The transaction receipt or invoice number.</li>
            <li>A detailed description of the reason you are requesting a refund.</li>
          </ul>
          <p className="pt-2">
            Refund requests must be submitted within <strong>14 calendar days</strong> of the transaction date.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3">
            5. Processing Times
          </h2>
          <p>
            Once approved, your refund will be processed and credited back to your original payment method within <strong>5 to 10 business days</strong>, depending on your bank or credit card provider.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3">
            6. Contact Us
          </h2>
          <p>
            If you have questions about this policy or need assistance with your payments, please reach out to us at:
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

export default RefundPolicy;
