"use client";
import { useState } from "react";

export default function Home() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<any>(null);

  async function handleAudit() {
  if (!code.trim()) {
    alert("Paste your contract code first");
    return;
  }
  
  setLoading(true);
  
  try {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code })
    });
    
    const data = await res.json();
    
    if (data.checkoutUrl) {
      window.open(data.checkoutUrl, "_blank");
      alert("Complete payment in the new tab, then return here to run your audit");
    } else {
      alert("Checkout failed: " + (data.error || "Unknown error"));
    }
  } catch (err) {
    console.error(err);
    alert("Error: " + err);
  }
  
  setLoading(false);
}

  return (
    <main style={{ minHeight: "100vh", background: "#0a0a0a", fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Unbounded:wght@700;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .display { font-family: 'Unbounded', sans-serif; }
      `}</style>

      <nav style={{ borderBottom: "1px solid #111", padding: "0 24px", height: 56, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
  <h1 className="display" style={{ fontSize: 18, fontWeight: 900, color: "#fff" }}>SENTINEL</h1>
  <a href="/api-docs" style={{ fontSize: 13, color: "#888", textDecoration: "none", fontWeight: 500 }}>API Docs</a>
</nav>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "60px 20px" }}>
        
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 11, color: "#555", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>Smart contract security</p>
          <h2 className="display" style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-0.02em", color: "#fff", marginBottom: 16 }}>Audit your Solidity code</h2>
          <p style={{ fontSize: 16, color: "#888", lineHeight: 1.6 }}>Security scan, gas optimization, code quality score, and auto-fix suggestions. Pay per audit in USDC.</p>
        </div>

        <div style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 16, padding: 32 }}>
          <label style={{ display: "block", marginBottom: 12 }}>
            <span style={{ fontSize: 11, color: "#666", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>Contract code</span>
          </label>
          
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="// SPDX-License-Identifier: MIT&#10;pragma solidity ^0.8.0;&#10;&#10;contract YourContract {&#10;    // Paste your code here&#10;}"
            style={{ width: "100%", minHeight: 320, background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 12, padding: 20, color: "#fff", fontSize: 14, fontFamily: "'JetBrains Mono', 'Fira Code', monospace", resize: "vertical", lineHeight: 1.6 }}
          />
          
          <div style={{ marginTop: 24, paddingTop: 24, borderTop: "1px solid #1a1a1a", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ fontSize: 13, color: "#888", marginBottom: 4 }}>Audit price</p>
              <p className="display" style={{ fontSize: 24, fontWeight: 900, color: "#fff" }}>$2.00 <span style={{ fontSize: 14, color: "#555", fontWeight: 400 }}>USDC</span></p>
            </div>
            <button 
              onClick={handleAudit}
              disabled={loading || !code.trim()}
              style={{ background: "#fff", color: "#0a0a0a", border: "none", padding: "14px 32px", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: loading || !code.trim() ? "not-allowed" : "pointer", fontFamily: "inherit", opacity: loading || !code.trim() ? 0.5 : 1 }}
            >
              {loading ? "Processing..." : "Start audit →"}
            </button>
          </div>
        </div>

        <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {[
            { label: "Security scan", desc: "Vulnerabilities, reentrancy, overflow bugs" },
            { label: "Gas optimization", desc: "Reduce costs, improve efficiency" },
            { label: "Code quality", desc: "0-100 score with detailed breakdown" },
            { label: "Auto-fix", desc: "AI rewrites vulnerable sections" }
          ].map(item => (
            <div key={item.label} style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 12, padding: 20 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 6 }}>{item.label}</p>
              <p style={{ fontSize: 12, color: "#666", lineHeight: 1.5 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Report */}
        {report && (
          <div style={{ marginTop: 48, background: "#111", border: "1px solid #1a1a1a", borderRadius: 16, padding: 32 }}>
            <h3 className="display" style={{ fontSize: 24, fontWeight: 900, color: "#fff", marginBottom: 24 }}>Audit Report</h3>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
              <div style={{ background: "#0a0a0a", borderRadius: 12, padding: 20, textAlign: "center" }}>
                <p style={{ fontSize: 11, color: "#666", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>Security</p>
                <p className="display" style={{ fontSize: 36, fontWeight: 900, color: report.securityScore >= 70 ? "#22c55e" : report.securityScore >= 40 ? "#f59e0b" : "#ef4444" }}>{report.securityScore}</p>
              </div>
              <div style={{ background: "#0a0a0a", borderRadius: 12, padding: 20, textAlign: "center" }}>
                <p style={{ fontSize: 11, color: "#666", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>Gas</p>
                <p className="display" style={{ fontSize: 36, fontWeight: 900, color: report.gasScore >= 70 ? "#22c55e" : report.gasScore >= 40 ? "#f59e0b" : "#ef4444" }}>{report.gasScore}</p>
              </div>
              <div style={{ background: "#0a0a0a", borderRadius: 12, padding: 20, textAlign: "center" }}>
                <p style={{ fontSize: 11, color: "#666", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>Quality</p>
                <p className="display" style={{ fontSize: 36, fontWeight: 900, color: report.qualityScore >= 70 ? "#22c55e" : report.qualityScore >= 40 ? "#f59e0b" : "#ef4444" }}>{report.qualityScore}</p>
              </div>
            </div>

            <div style={{ marginBottom: 32 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Vulnerabilities</p>
              {report.vulnerabilities.map((v: any, i: number) => (
                <div key={i} style={{ background: "#0a0a0a", borderRadius: 12, padding: 16, marginBottom: 12, borderLeft: `3px solid ${v.severity === 'high' ? '#ef4444' : v.severity === 'medium' ? '#f59e0b' : '#64748b'}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{v.issue}</p>
                    <span style={{ fontSize: 11, color: v.severity === 'high' ? '#ef4444' : v.severity === 'medium' ? '#f59e0b' : '#64748b', textTransform: "uppercase", fontWeight: 700 }}>{v.severity}</span>
                  </div>
                  <p style={{ fontSize: 12, color: "#666", marginBottom: 6 }}>Line {v.line}</p>
                  <p style={{ fontSize: 12, color: "#888" }}>Fix: {v.fix}</p>
                </div>
              ))}
            </div>

            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Gas Optimizations</p>
              {report.gasOptimizations.map((g: any, i: number) => (
                <div key={i} style={{ background: "#0a0a0a", borderRadius: 12, padding: 16, marginBottom: 12 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 4 }}>{g.issue}</p>
                  <p style={{ fontSize: 12, color: "#22c55e", marginBottom: 6 }}>Savings: {g.savings}</p>
                  <p style={{ fontSize: 12, color: "#888" }}>{g.fix}</p>
                </div>
              ))}
{/* Comparison */}
            <div style={{ marginTop: 32, paddingTop: 32, borderTop: "1px solid #1a1a1a" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Protocol Comparison</p>
              
              {/* Bar chart */}
              <div style={{ marginBottom: 24 }}>
                {report.comparison.protocols.map((p: any, i: number) => (
                  <div key={i} style={{ marginBottom: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: 12, color: p.name === "Your Contract" ? "#fff" : "#888", fontWeight: p.name === "Your Contract" ? 700 : 400 }}>{p.name}</span>
                      <span style={{ fontSize: 12, color: "#666" }}>{Math.round((p.security + p.gas + p.quality) / 3)}</span>
                    </div>
                    <div style={{ width: "100%", height: 8, background: "#0a0a0a", borderRadius: 4, overflow: "hidden" }}>
                      <div style={{ width: `${Math.round((p.security + p.gas + p.quality) / 3)}%`, height: "100%", background: p.name === "Your Contract" ? "#f59e0b" : "#22c55e", borderRadius: 4 }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Insights */}
              <div style={{ background: "#0a0a0a", borderRadius: 12, padding: 20 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: "#fff", marginBottom: 12 }}>Key Insights</p>
                {report.comparison.insights.map((insight: string, i: number) => (
                  <p key={i} style={{ fontSize: 12, color: "#888", marginBottom: 8, paddingLeft: 16, position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, color: "#f59e0b" }}>•</span>
                    {insight}
                  </p>
                ))}
              </div>
            </div>

            </div>
          </div>
        )}
      </div>
    </main>
  );
}