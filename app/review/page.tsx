"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type FormState = "idle" | "submitting" | "success";

const POLICY_WARNING_SIGNS = [
  "Your policy was issued more than 3 years ago and your revenue has grown",
  "Your coverage amount was set based on older debt or payroll figures",
  "Your policy has no living benefits or accelerated death benefit riders",
  "You have a buy-sell agreement but aren't certain it's funded",
  "You've never confirmed whether your term policy has a conversion option",
  "Your business has taken on new lenders, investors, or succession obligations",
  "You've added partners or key employees since the policy was issued",
  "Your permanent policy hasn't been reviewed for funding adequacy",
];

export default function Review() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "", business: "", email: "", phone: "", owners: "", concern: "",
  });
  const [checkedCount, setCheckedCount] = useState(0);
  const [checked, setChecked] = useState<boolean[]>(Array(POLICY_WARNING_SIGNS.length).fill(false));

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

  function toggleCheck(i: number) {
    const next = [...checked];
    next[i] = !next[i];
    setChecked(next);
    setCheckedCount(next.filter(Boolean).length);
  }

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    setFormState("submitting");
    setTimeout(() => setFormState("success"), 1200);
  }

  function scrollToForm() {
    document.getElementById("schedule")?.scrollIntoView({ behavior: "smooth" });
  }

  function scrollToLearn() {
    document.getElementById("warning-signs")?.scrollIntoView({ behavior: "smooth" });
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
              Most business owners have some form of coverage — but few have confirmed whether it still matches the size, structure, and risk of the business they run today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={scrollToForm}
                className="bg-white text-slate-900 font-bold text-base px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors"
              >
                Schedule My Business Protection Review
              </button>
              <button
                onClick={scrollToLearn}
                className="border border-slate-500 text-white font-semibold text-base px-8 py-4 rounded-xl hover:border-white transition-colors"
              >
                See the Warning Signs
              </button>
            </div>
            <p className="text-slate-400 text-sm mt-5">
              Confidential &nbsp;·&nbsp; No obligation &nbsp;·&nbsp; Takes less than 10 minutes
            </p>
          </div>
        </section>

        {/* ── 2. SELF-DIAGNOSTIC CHECKLIST ─────────────────────────────────── */}
        <section id="warning-signs" className="px-6 py-16 bg-gray-50 border-b border-gray-200">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              8 Warning Signs Your Key Person Policy May Be Outdated
            </h2>
            <p className="text-gray-600 text-base mb-8">
              Check any that apply to your business. Each one is a reason to schedule a review.
            </p>

            <div className="flex flex-col gap-3 mb-8">
              {POLICY_WARNING_SIGNS.map((sign, i) => (
                <label
                  key={i}
                  className={`flex items-start gap-4 px-5 py-4 rounded-xl border cursor-pointer transition-all ${
                    checked[i]
                      ? "bg-slate-800 border-slate-800 text-white"
                      : "bg-white border-gray-200 text-gray-700 hover:border-slate-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked[i]}
                    onChange={() => toggleCheck(i)}
                    className="mt-0.5 flex-shrink-0 accent-white w-4 h-4"
                  />
                  <span className="text-sm leading-relaxed">{sign}</span>
                </label>
              ))}
            </div>

            {/* Dynamic result based on count */}
            {checkedCount === 0 && (
              <div className="bg-white border border-gray-200 rounded-2xl px-6 py-5 text-center">
                <p className="text-gray-500 text-sm">Select any that apply to see your risk assessment.</p>
              </div>
            )}
            {checkedCount >= 1 && checkedCount <= 2 && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl px-6 py-5">
                <p className="font-semibold text-amber-800 mb-1">At least one gap identified.</p>
                <p className="text-amber-700 text-sm mb-4">Even one outdated element can leave your business exposed at the worst possible time. A policy review can identify exactly what needs attention.</p>
                <button onClick={scrollToForm} className="bg-slate-800 text-white text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-slate-700 transition-colors">
                  Schedule a Review →
                </button>
              </div>
            )}
            {checkedCount >= 3 && checkedCount <= 5 && (
              <div className="bg-orange-50 border border-orange-300 rounded-2xl px-6 py-5">
                <p className="font-semibold text-orange-800 mb-1">Multiple gaps identified — your policy needs attention.</p>
                <p className="text-orange-700 text-sm mb-4">With {checkedCount} warning signs present, your current coverage likely has meaningful gaps. A licensed specialist can compare what you have against what the business actually needs.</p>
                <button onClick={scrollToForm} className="bg-slate-800 text-white text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-slate-700 transition-colors">
                  Schedule Your Policy Review →
                </button>
              </div>
            )}
            {checkedCount >= 6 && (
              <div className="bg-red-50 border border-red-300 rounded-2xl px-6 py-5">
                <p className="font-semibold text-red-800 mb-1">Significant exposure detected — this review is urgent.</p>
                <p className="text-red-700 text-sm mb-4">With {checkedCount} warning signs, your business has meaningful protection gaps that a policy change, business event, or health issue could make much harder to fix. Don&apos;t wait on this one.</p>
                <button onClick={scrollToForm} className="bg-slate-800 text-white text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-slate-700 transition-colors">
                  Schedule an Urgent Review →
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ── 3. PROBLEM / LIQUIDITY ────────────────────────────────────────── */}
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

        {/* ── 4. SEGMENTED RISK ────────────────────────────────────────────── */}
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
                <button onClick={scrollToForm} className="w-full bg-slate-800 text-white text-sm font-semibold py-3 rounded-xl hover:bg-slate-700 transition-colors">
                  Schedule a Review to Evaluate Your Coverage
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-8">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 font-bold text-sm mb-5">02</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Business Partners</h3>
                <p className="text-gray-600 leading-relaxed mb-4 font-medium">
                  If you have partners, the risk shifts: You may have a buy-sell agreement — but is it funded?
                </p>
                <p className="text-gray-600 text-sm mb-3">If one partner dies, the surviving partner may need immediate cash to buy out the family. Without funding, this can lead to:</p>
                <ul className="text-sm text-gray-600 space-y-1.5 mb-6">
                  {["Ownership disputes", "Debt strain", "Loss of control"].map((r) => (
                    <li key={r} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />{r}
                    </li>
                  ))}
                </ul>
                <p className="text-gray-600 text-sm mb-6">Key person insurance can help create the liquidity needed to maintain control and treat the family fairly.</p>
                <button onClick={scrollToForm} className="w-full bg-slate-800 text-white text-sm font-semibold py-3 rounded-xl hover:bg-slate-700 transition-colors">
                  Check If Your Buy-Sell Is Properly Funded
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* ── 5. WHAT YOUR REVIEW COVERS ────────────────────────────────────── */}
        <section className="px-6 py-16 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              What Your Review Actually Covers
            </h2>
            <p className="text-gray-600 text-base mb-10">
              This is not a sales call. It is a structured review of your current position — completed by a licensed specialist in three steps.
            </p>

            <div className="flex flex-col gap-6 mb-10">
              {[
                {
                  step: "01",
                  title: "Coverage Gap Analysis",
                  body: "We compare your current coverage against your actual payroll, debt obligations, revenue dependency, and key person risk. Most policies reviewed are either underfunded or missing critical riders.",
                },
                {
                  step: "02",
                  title: "Buy-Sell & Ownership Structure Review",
                  body: "If you have partners, we confirm whether your buy-sell agreement is funded, whether the structure matches current ownership, and whether the funding method creates any hidden risk.",
                },
                {
                  step: "03",
                  title: "Strategy & Options Briefing",
                  body: "If gaps are found, a licensed specialist will walk through what options are available — including term, permanent, and living benefit strategies — based on your business size, structure, and goals. No pressure. No obligation to proceed.",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-5">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-gray-700 text-sm font-medium">Ready to see where your coverage stands?</p>
              <button
                onClick={scrollToForm}
                className="flex-shrink-0 bg-slate-800 text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-slate-700 transition-colors"
              >
                Schedule My Review →
              </button>
            </div>
          </div>
        </section>

        {/* ── 6. SOLUTION ──────────────────────────────────────────────────── */}
        <section className="px-6 py-16 bg-gray-50 border-t border-gray-200">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              A Simple Concept. A Critical Financial Tool.
            </h2>
            <p className="text-gray-600 text-base mb-6">Key person insurance provides liquidity when your business needs it most.</p>
            <p className="text-gray-700 mb-4">The business owns a policy on a key owner, partner, or employee. If that person passes away, the business receives funds that can help:</p>
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

        {/* ── 7. FINAL CTA + FORM ──────────────────────────────────────────── */}
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

        {/* ── 8. COMPLIANCE FOOTER ─────────────────────────────────────────── */}
        <footer className="bg-gray-100 border-t border-gray-200 px-6 py-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs text-gray-500 leading-relaxed">
              This page is for educational purposes only. A licensed insurance professional must review your specific goals, health, business structure, policy illustrations, and state-specific rules before any coverage decision is made. No binding quotes, tax advice, legal advice, or suitability determinations are provided here.
            </p>
          </div>
        </footer>

      </div>

      {/* ── Exit Intent Modal ─────────────────────────────────────────────── */}
      {showExit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Before you leave — do you know if your coverage is still adequate?
            </h3>
            <p className="text-gray-600 text-sm mb-6">
              Most key person policies are never reviewed after they&apos;re issued — even as the business grows, adds partners, or takes on debt. A 10-minute review can tell you exactly where you stand.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => { setShowExit(false); scrollToForm(); }}
                className="w-full bg-slate-800 text-white font-semibold py-3 rounded-xl hover:bg-slate-700 transition-colors text-sm"
              >
                Schedule My Free Review
              </button>
              <button
                onClick={() => { setShowExit(false); document.getElementById("warning-signs")?.scrollIntoView({ behavior: "smooth" }); }}
                className="w-full border border-gray-300 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm"
              >
                Check the 8 Warning Signs First
              </button>
              <button
                onClick={() => setShowExit(false)}
                className="text-gray-400 text-xs hover:text-gray-600 text-center"
              >
                No thanks, I&apos;ll come back later
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
