"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { STARTER_QUESTIONS } from "@/app/lib/agent";

type ChatMessage = { role: "user" | "assistant"; content: string };
type FormState = "idle" | "submitting" | "success";

const MAX_MESSAGE_LENGTH = 3000;

export default function Home() {
  // ── Chat state ────────────────────────────────────────────────────────────
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  // ── Form state ────────────────────────────────────────────────────────────
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "", business: "", email: "", phone: "", owners: "", concern: "",
  });

  // ── Exit intent ───────────────────────────────────────────────────────────
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

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatLoading]);

  // ── Chat handlers ─────────────────────────────────────────────────────────
  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || chatLoading) return;
    if (trimmed.length > MAX_MESSAGE_LENGTH) { setChatError("Message too long."); return; }

    const userMsg: ChatMessage = { role: "user", content: trimmed };
    const nextHistory = [...messages, userMsg];
    setMessages(nextHistory);
    setInput("");
    setChatError("");
    setChatLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history: nextHistory }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Request failed");
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err: unknown) {
      setChatError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setChatLoading(false);
    }
  }

  function handleChatSubmit(e: FormEvent) { e.preventDefault(); sendMessage(input); }

  // ── Form handler ──────────────────────────────────────────────────────────
  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    setFormState("submitting");
    // Replace with actual CRM/calendar integration endpoint
    setTimeout(() => setFormState("success"), 1200);
  }

  function scrollToForm() {
    document.getElementById("schedule")?.scrollIntoView({ behavior: "smooth" });
  }

  function scrollToChat() {
    document.getElementById("advisor")?.scrollIntoView({ behavior: "smooth" });
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={scrollToForm}
                className="bg-white text-slate-900 font-bold text-base px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors"
              >
                Schedule My Business Protection Review
              </button>
              <button
                onClick={scrollToChat}
                className="border border-slate-500 text-white font-semibold text-base px-8 py-4 rounded-xl hover:border-white transition-colors"
              >
                Ask the Virtual Agent a Question
              </button>
            </div>
            <p className="text-slate-400 text-sm mt-5">
              A short, confidential review to identify key person risk, funding gaps, and continuity exposure.
              &nbsp;·&nbsp; Takes less than 10 minutes &nbsp;·&nbsp; Confidential &nbsp;·&nbsp; No obligation
            </p>
          </div>
        </section>

        {/* ── 2. GPT INTERACTIVE SECTION ────────────────────────────────────── */}
        <section id="advisor" className="bg-gray-50 px-6 py-16 border-b border-gray-200">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Ask Our Virtual Agent a Key Person Question
              </h2>
              <p className="text-gray-600 text-base leading-relaxed max-w-xl mx-auto">
                Most businesses insure their buildings, vehicles, and equipment — but have no plan for the one person the business depends on most.
                Ask a question and quickly understand where your current plan may fall short.
              </p>
              <p className="text-sm text-gray-400 mt-3">Educational only. No pressure. No obligation.</p>
            </div>

            {/* Chat widget */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              {/* Starter questions */}
              {messages.length === 0 && (
                <div className="px-6 pt-6 pb-4 border-b border-gray-100">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Common questions</p>
                  <div className="flex flex-col gap-2">
                    {STARTER_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="text-left px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-700 text-sm hover:bg-slate-50 hover:border-slate-300 transition-colors"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Thread */}
              <div className="px-6 py-4 flex flex-col gap-4 max-h-96 overflow-y-auto">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    {msg.role === "assistant" && (
                      <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-white text-xs font-bold mr-2 mt-0.5 flex-shrink-0">KP</div>
                    )}
                    <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-slate-800 text-white rounded-tr-sm"
                        : "bg-gray-50 border border-gray-200 text-gray-800 rounded-tl-sm"
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {chatLoading && (
                  <div className="flex justify-start">
                    <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-white text-xs font-bold mr-2 mt-0.5 flex-shrink-0">KP</div>
                    <div className="bg-gray-50 border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3">
                      <div className="flex gap-1 items-center h-4">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
                      </div>
                    </div>
                  </div>
                )}
                {chatError && <p className="text-red-500 text-sm text-center">{chatError}</p>}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="px-6 py-4 border-t border-gray-100">
                <form onSubmit={handleChatSubmit} className="flex gap-3 items-end">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
                    placeholder='"Do I have enough key person coverage for my business?"'
                    rows={1}
                    maxLength={MAX_MESSAGE_LENGTH}
                    disabled={chatLoading}
                    className="flex-1 resize-none rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent disabled:opacity-50"
                    style={{ minHeight: 42, maxHeight: 120, overflowY: "auto" }}
                  />
                  <button
                    type="submit"
                    disabled={chatLoading || !input.trim()}
                    className="flex-shrink-0 px-5 py-2.5 rounded-xl bg-slate-800 text-white text-sm font-semibold hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
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

              {/* Single Owner */}
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

              {/* Business Partners */}
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
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
                <p className="text-gray-600 text-sm mb-6">Key person insurance can help create the liquidity needed to maintain control and treat the family fairly.</p>
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

        {/* ── 5. SOLUTION ──────────────────────────────────────────────────── */}
        <section className="px-6 py-16 bg-white">
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

        {/* ── 6 + 7. FINAL CTA + FORM ──────────────────────────────────────── */}
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
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Business Name</label>
                    <input
                      required
                      value={form.business}
                      onChange={(e) => setForm({ ...form, business: e.target.value })}
                      placeholder="Your company"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Email</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@company.com"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Phone</label>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="(555) 000-0000"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Number of Owners / Partners</label>
                    <input
                      value={form.owners}
                      onChange={(e) => setForm({ ...form, owners: e.target.value })}
                      placeholder="e.g. 2"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Primary Concern</label>
                    <select
                      value={form.concern}
                      onChange={(e) => setForm({ ...form, concern: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-400"
                    >
                      <option value="">Select one…</option>
                      <option value="single-owner">Single owner continuity</option>
                      <option value="partner-buysell">Partner buy-sell funding</option>
                      <option value="loan-protection">Business loan protection</option>
                      <option value="key-employee">Key employee protection</option>
                      <option value="not-sure">Not sure</option>
                    </select>
                  </div>
                </div>

                {/* Calendar embed placeholder */}
                <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-5 text-center text-sm text-gray-400">
                  Calendar scheduling embed — connect Calendly or HubSpot Meetings here
                </div>

                <button
                  type="submit"
                  disabled={formState === "submitting"}
                  className="w-full bg-slate-800 text-white font-bold text-base py-4 rounded-xl hover:bg-slate-700 disabled:opacity-50 transition-colors"
                >
                  {formState === "submitting" ? "Submitting..." : "Schedule My Business Protection Review →"}
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
                onClick={() => { setShowExit(false); scrollToChat(); }}
                className="w-full border border-gray-300 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm"
              >
                Ask the Virtual Agent First
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
