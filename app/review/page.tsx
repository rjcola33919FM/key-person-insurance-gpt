"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type FormState = "idle" | "submitting" | "success";

export default function Classic() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "", business: "", email: "", phone: "", owners: "", concern: "",
  });

  const [showExit, setShowExit] = useState(false);
  const exitFired = useRef(false);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (e.clientY < 10 && !exitFired.current) {
        exitFired.current = true;
        setShowExit(true);
      }
    };
    document.addEventListener("mouseleave", handler);
    return () => document.removeEventListener("mouseleave", handler);
  }, []);

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    setFormState("submitting");
    setTimeout(() => setFormState("success"), 1200);
  }

  function scrollToForm() {
    document.getElementById("schedule")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">

      {/* ── Sticky Header ──────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200 px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white text-xs font-bold">KP</div>
            <span className="font-bold text-gray-900 text-sm">Key Person Advisor</span>
          </div>
          <button
            onClick={scrollToForm}
            className="bg-slate-800 text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-slate-700 transition-colors"
          >
            Schedule My Review
          </button>
        </div>
      </header>

      <div className="pt-14">

        {/* ── 1. HERO ────────────────────────────────────────────────────────── */}
        <section className="bg-slate-900 text-white px-6 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
              What Happens to Your Business If a Key Person Is Suddenly Gone?
            </h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
              Key person insurance helps your business access the cash, time, and control needed to survive a leadership, ownership, or revenue crisis.
            </p>
            <button
              onClick={scrollToForm}
              className="bg-white text-slate-900 font-bold text-base px-10 py-4 rounded-xl hover:bg-gray-100 transition-colors"
            >
              Schedule My Business Protection Review
            </button>
            <p className="text-slate-400 text-sm mt-5">
              A short, confidential review to identify key person risk, funding gaps, and continuity exposure.
              &nbsp;·&nbsp; Takes less than 10 minutes &nbsp;·&nbsp; Confidential &nbsp;·&nbsp; No obligation
            </p>
          </div>
        </section>

        {/* ── 2. PROBLEM / LIQUIDITY ────────────────────────────────────────── */}
        <section className="px-6 py-16 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              The Risk Is Not Just Loss. It&apos;s Immediate Financial Pressure.
            </h2>
            <p className="text-gray-600 text-base mb-6">When a key person is suddenly gone, the business may face:</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {[
                "Lost revenue", "Payroll pressure", "Customer uncertainty",
                "Lender concerns", "Family stress", "Partner conflict",
                "A forced sale or rushed transition",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-700 text-base">
                  <span className="w-2 h-2 rounded-full bg-slate-700 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="bg-slate-900 text-white rounded-2xl px-8 py-7">
              <p className="text-lg font-bold mb-2">The issue is not just grief. It is liquidity.</p>
              <p className="text-slate-300 leading-relaxed">
                The business may need cash quickly to keep operating, replace leadership, retain staff, reassure customers, and protect the value of what has been built.
              </p>
            </div>
          </div>
        </section>

        {/* ── 3. SEGMENTED RISK ────────────────────────────────────────────── */}
        <section className="px-6 py-16 bg-gray-50 border-y border-gray-200">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">

              <div className="bg-white rounded-2xl border border-gray-200 p-8">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 font-bold text-sm mb-5">01</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Single Owner</h3>
                <p className="text-gray-600 leading-relaxed mb-4 font-medium">
                  If you&apos;re the sole owner, the question is simple: If something happened to you, who keeps the business running — and with what money?
                </p>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Your family may inherit the business, but they may not have the time, experience, or cash to operate it. Key person insurance can help provide funds to stabilize the business, protect employees, manage debt, and avoid a rushed sale.
                </p>
                <button
                  onClick={scrollToForm}
                  className="w-full bg-slate-800 text-white text-sm font-semibold py-3 rounded-xl hover:bg-slate-700 transition-colors"
                >
                  Schedule a Review to Evaluate Your Coverage
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-8">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 font-bold text-sm mb-5">02</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Business Partners</h3>
                <p className="text-gray-600 leading-relaxed mb-4 font-medium">
                  If you have partners, the risk shifts: You may have a buy-sell agreement — but is it funded?
                </p>
                <p className="text-gray-600 text-sm mb-3">
                  If one partner dies, the surviving partner may need immediate cash to buy out the family. Without funding, this can lead to:
                </p>
                <ul className="text-sm text-gray-600 space-y-1.5 mb-6">
                  {["Ownership disputes", "Debt strain", "Loss of control"].map((r) => (
                    <li key={r} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />{r}
                    </li>
                  ))}
                </ul>
                <p className="text-gray-600 text-sm mb-6">
                  Key person insurance can help create the liquidity needed to maintain control and treat the family fairly.
                </p>
                <button
                  onClick={scrollToForm}
                  className="w-full bg-slate-800 text-white text-sm font-semibold py-3 rounded-xl hover:bg-slate-700 transition-colors"
                >
                  Check If Your Buy-Sell Is Properly Funded
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* ── 4. SOLUTION ──────────────────────────────────────────────────── */}
        <section className="px-6 py-16 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              A Simple Concept. A Critical Financial Tool.
            </h2>
            <p className="text-gray-600 text-base mb-6">Key person insurance provides liquidity when your business needs it most.</p>
            <p className="text-gray-700 mb-4">
              The business owns a policy on a key owner, partner, or employee. If that person passes away, the business receives funds that can help:
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Cover operating expenses",
                "Pay down debt",
                "Retain employees",
                "Reassure customers and lenders",
                "Fund ownership transitions",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-700">
                  <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 text-xs flex-shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-gray-500 text-sm leading-relaxed border-l-4 border-slate-200 pl-4">
              The right structure depends on your revenue, debt, ownership structure, and long-term goals. Many modern strategies include flexible term options with conversion features and permanent solutions designed for long-term financial flexibility.
            </p>
          </div>
        </section>

        {/* ── 5. FINAL CTA + FORM ──────────────────────────────────────────── */}
        <section id="schedule" className="bg-slate-900 px-6 py-20">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white mb-3">
                Start With Clarity — Not a Policy
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                The first step is not buying insurance.<br />
                The first step is understanding your risk.
              </p>
              <div className="flex justify-center gap-4 mt-5 flex-wrap">
                <span className="text-xs text-slate-400 border border-slate-600 rounded-full px-4 py-1.5">Confidential</span>
                <span className="text-xs text-slate-400 border border-slate-600 rounded-full px-4 py-1.5">No obligation</span>
                <span className="text-xs text-slate-400 border border-slate-600 rounded-full px-4 py-1.5">Takes less than 10 minutes</span>
              </div>
            </div>

            {formState === "success" ? (
              <div className="bg-white rounded-2xl p-10 text-center">
                <div className="text-4xl mb-4">✓</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Request Received</h3>
                <p className="text-gray-600">A licensed specialist will reach out shortly to schedule your business protection review.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="bg-white rounded-2xl p-8 flex flex-col gap-5">
                <h3 className="text-lg font-bold text-gray-900">Schedule My Business Protection Review</h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Name</label>
                    <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Business Name</label>
                    <input required value={form.business} onChange={(e) => setForm({ ...form, business: e.target.value })} placeholder="Your company" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Email</label>
                    <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Phone</label>
                    <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="(555) 000-0000" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Number of Owners / Partners</label>
                    <input value={form.owners} onChange={(e) => setForm({ ...form, owners: e.target.value })} placeholder="e.g. 2" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Primary Concern</label>
                    <select value={form.concern} onChange={(e) => setForm({ ...form, concern: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-400">
                      <option value="">Select one…</option>
                      <option value="single-owner">Single owner continuity</option>
                      <option value="partner-buysell">Partner buy-sell funding</option>
                      <option value="loan-protection">Business loan protection</option>
                      <option value="key-employee">Key employee protection</option>
                      <option value="not-sure">Not sure</option>
                    </select>
                  </div>
                </div>

                <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-5 text-center text-sm text-gray-400">
                  Calendar scheduling embed — connect Calendly or HubSpot Meetings here
                </div>

                <button
                  type="submit"
                  disabled={formState === "submitting"}
                  className="w-full bg-slate-800 text-white font-bold text-base py-4 rounded-xl hover:bg-slate-700 disabled:opacity-50 transition-colors"
                >
                  {formState === "submitting" ? "Submitting…" : "Schedule My Business Protection Review →"}
                </button>

                <p className="text-xs text-gray-400 text-center">
                  A focused review to identify gaps in coverage, buy-sell funding, and business continuity planning.
                </p>
              </form>
            )}
          </div>
        </section>

        {/* ── 6. COMPLIANCE FOOTER ─────────────────────────────────────────── */}
        <footer className="bg-gray-100 border-t border-gray-200 px-6 py-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs text-gray-500 leading-relaxed">
              I can educate and help you prepare for a policy review, but I cannot provide a binding quote, tax advice, legal advice, or a final suitability recommendation. A licensed professional must review your goals, health, business structure, illustrations, and state-specific rules.
            </p>
          </div>
        </footer>

      </div>

      {/* ── Exit Intent Modal ─────────────────────────────────────────────── */}
      {showExit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Before you leave — want to check if your coverage is outdated?
            </h3>
            <p className="text-gray-600 text-sm mb-6">
              Most key person policies are never reviewed after they&apos;re issued. A quick check takes less than 10 minutes.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => { setShowExit(false); scrollToForm(); }}
                className="w-full bg-slate-800 text-white font-semibold py-3 rounded-xl hover:bg-slate-700 transition-colors text-sm"
              >
                Schedule My Free Review
              </button>
              <button
                onClick={() => setShowExit(false)}
                className="text-gray-400 text-xs hover:text-gray-600 text-center"
              >
                No thanks, I&apos;ll skip the review
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
