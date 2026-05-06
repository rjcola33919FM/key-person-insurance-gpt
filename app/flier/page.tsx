"use client";

export default function Flier() {
  return (
    <>
      {/* Print button — hidden when printing */}
      <div className="no-print fixed top-4 right-4 z-50 flex gap-3">
        <button
          onClick={() => window.print()}
          className="bg-slate-800 text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow-lg hover:bg-slate-700 transition-colors"
        >
          Download / Print PDF
        </button>
      </div>

      {/* ── Flier — 8.5 × 11 print canvas ── */}
      <div id="flier" className="flier-page">

        {/* Header band */}
        <div className="header-band">
          <div className="logo-lockup">
            <div className="kp-badge">KP</div>
            <div>
              <div className="brand-name">Key Person Advisor</div>
              <div className="brand-sub">Business Continuity &amp; Insurance Planning</div>
            </div>
          </div>
        </div>

        {/* Hero */}
        <div className="hero-block">
          <h1 className="headline">
            What Happens to Your Business<br />
            If a Key Person Is<br />
            <em>Suddenly Gone?</em>
          </h1>
          <p className="subheadline">
            Most businesses have no financial plan for the one person they cannot afford to lose.
          </p>
        </div>

        {/* Risk list */}
        <div className="section-block">
          <p className="section-label">When a key person is lost, the business may face:</p>
          <div className="risk-grid">
            {[
              "Lost revenue",
              "Payroll pressure",
              "Customer uncertainty",
              "Lender concerns",
              "Partner conflict",
              "A forced sale",
            ].map((r) => (
              <div key={r} className="risk-item">
                <span className="risk-dot" />
                {r}
              </div>
            ))}
          </div>
          <div className="callout-box">
            <strong>The issue is not just grief. It is liquidity.</strong><br />
            Your business may need cash immediately to keep operating, replace leadership, service debt, and protect everything you have built.
          </div>
        </div>

        {/* Divider */}
        <div className="divider" />

        {/* Warning signs */}
        <div className="section-block">
          <p className="section-label">Your policy may already be outdated if:</p>
          <div className="check-list">
            {[
              "Your policy was purchased years ago and your revenue has grown",
              "Your coverage no longer reflects current debt, payroll, or key person dependency",
              "You have a buy-sell agreement but aren't certain it's funded",
              "Your policy has no living benefits or conversion options",
            ].map((item) => (
              <div key={item} className="check-item">
                <span className="check-box">✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="divider" />

        {/* QR + CTA block */}
        <div className="cta-block">
          <div className="cta-left">
            <p className="cta-headline">Get Your Free Business Protection Review</p>
            <p className="cta-body">
              A licensed specialist will review your current coverage, identify gaps, and walk through your options — in under 10 minutes.
            </p>
            <div className="trust-badges">
              <span className="badge">Confidential</span>
              <span className="badge">No Obligation</span>
              <span className="badge">No Cost</span>
            </div>
            <p className="url-text">www.kpibuild.com</p>
          </div>
          <div className="cta-right">
            {/* QR code via public API */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://www.kpibuild.com&color=1e293b&bgcolor=ffffff&margin=4"
              alt="QR code — scan to visit kpibuild.com"
              className="qr-code"
            />
            <p className="qr-label">Scan to get started</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flier-footer">
          For educational purposes only. A licensed insurance professional must review your specific goals, health, business structure, and state rules before any coverage decision is made. No binding quotes or suitability determinations are provided.
        </div>

      </div>

      {/* ── Print + screen styles ── */}
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #e5e7eb;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        }

        .no-print {
          display: flex;
        }

        /* ── Flier canvas ── */
        .flier-page {
          width: 8.5in;
          min-height: 11in;
          background: #ffffff;
          margin: 40px auto;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 4px 32px rgba(0,0,0,0.18);
        }

        /* Header */
        .header-band {
          background: #1e293b;
          padding: 18px 36px;
        }
        .logo-lockup {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .kp-badge {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #fff;
          color: #1e293b;
          font-size: 13px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .brand-name {
          color: #fff;
          font-size: 16px;
          font-weight: 700;
          line-height: 1.2;
        }
        .brand-sub {
          color: #94a3b8;
          font-size: 11px;
          line-height: 1.3;
        }

        /* Hero */
        .hero-block {
          background: #1e293b;
          padding: 36px 36px 40px;
          border-bottom: 4px solid #334155;
        }
        .headline {
          font-size: 36px;
          font-weight: 800;
          color: #fff;
          line-height: 1.15;
          margin-bottom: 14px;
          letter-spacing: -0.5px;
        }
        .headline em {
          color: #93c5fd;
          font-style: normal;
        }
        .subheadline {
          font-size: 15px;
          color: #cbd5e1;
          line-height: 1.5;
          max-width: 500px;
        }

        /* Sections */
        .section-block {
          padding: 24px 36px;
        }
        .section-label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #64748b;
          margin-bottom: 14px;
        }

        /* Risk grid */
        .risk-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 8px 16px;
          margin-bottom: 18px;
        }
        .risk-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #1e293b;
          font-weight: 500;
        }
        .risk-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #1e293b;
          flex-shrink: 0;
        }

        /* Callout */
        .callout-box {
          background: #f1f5f9;
          border-left: 4px solid #1e293b;
          padding: 14px 18px;
          font-size: 13px;
          color: #1e293b;
          line-height: 1.6;
          border-radius: 0 8px 8px 0;
        }
        .callout-box strong {
          display: block;
          font-size: 14px;
          margin-bottom: 4px;
        }

        /* Divider */
        .divider {
          height: 1px;
          background: #e2e8f0;
          margin: 0 36px;
        }

        /* Checklist */
        .check-list {
          display: flex;
          flex-direction: column;
          gap: 9px;
        }
        .check-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 13px;
          color: #374151;
          line-height: 1.5;
        }
        .check-box {
          width: 20px;
          height: 20px;
          border-radius: 4px;
          background: #1e293b;
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
        }

        /* CTA block */
        .cta-block {
          background: #1e293b;
          margin: 0;
          padding: 28px 36px;
          display: flex;
          gap: 32px;
          align-items: center;
          flex: 1;
        }
        .cta-left {
          flex: 1;
        }
        .cta-headline {
          font-size: 22px;
          font-weight: 800;
          color: #fff;
          margin-bottom: 10px;
          line-height: 1.2;
        }
        .cta-body {
          font-size: 13px;
          color: #cbd5e1;
          line-height: 1.6;
          margin-bottom: 14px;
          max-width: 380px;
        }
        .trust-badges {
          display: flex;
          gap: 8px;
          margin-bottom: 14px;
          flex-wrap: wrap;
        }
        .badge {
          font-size: 10px;
          font-weight: 600;
          color: #94a3b8;
          border: 1px solid #334155;
          border-radius: 20px;
          padding: 3px 10px;
          letter-spacing: 0.03em;
        }
        .url-text {
          font-size: 18px;
          font-weight: 700;
          color: #93c5fd;
          letter-spacing: 0.01em;
        }
        .cta-right {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }
        .qr-code {
          width: 160px;
          height: 160px;
          background: #fff;
          border-radius: 10px;
          padding: 6px;
          display: block;
        }
        .qr-label {
          font-size: 11px;
          color: #94a3b8;
          text-align: center;
          font-weight: 500;
        }

        /* Footer */
        .flier-footer {
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
          padding: 12px 36px;
          font-size: 9px;
          color: #94a3b8;
          line-height: 1.5;
          text-align: center;
        }

        /* ── Print rules ── */
        @media print {
          body {
            background: white;
          }
          .no-print {
            display: none !important;
          }
          .flier-page {
            width: 8.5in;
            min-height: 11in;
            margin: 0;
            box-shadow: none;
          }
          @page {
            size: 8.5in 11in;
            margin: 0;
          }
        }
      `}</style>
    </>
  );
}
