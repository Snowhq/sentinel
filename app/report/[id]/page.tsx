"use client";
import { useParams } from "next/navigation";

export default function ReportPage() {
  const params = useParams();
  const id = params.id;

  // Mock report data - would fetch from database in production
  const report = {
    id,
    timestamp: "2026-04-25T14:30:00Z",
    contractName: "SimpleBank.sol",
    securityScore: 65,
    gasScore: 72,
    qualityScore: 80,
    vulnerabilities: [
      {
        severity: "high",
        issue: "Reentrancy vulnerability in withdraw function",
        line: 13,
        fix: "Use checks-effects-interactions pattern. Update balance before external call."
      },
      {
        severity: "medium",
        issue: "Missing SafeMath for arithmetic operations",
        line: 9,
        fix: "Use unchecked{} or SafeMath library for overflow protection"
      }
    ],
    gasOptimizations: [
      {
        issue: "Storage read in withdraw function can be cached",
        savings: "~200 gas per call",
        fix: "Store balances[msg.sender] in memory variable"
      }
    ],
    comparison: {
      protocols: [
        { name: "Uniswap V3", security: 95, gas: 88, quality: 92 },
        { name: "Aave V3", security: 97, gas: 85, quality: 94 },
        { name: "Compound", security: 93, gas: 82, quality: 90 },
        { name: "Your Contract", security: 65, gas: 72, quality: 80 }
      ],
      insights: [
        "Your contract scores 30 points lower than Uniswap V3 on security",
        "Gas efficiency is 16% below industry standard for DeFi protocols",
        "Consider implementing ReentrancyGuard from OpenZeppelin like Aave does"
      ]
    }
  };

  return (
    <main style={{ minHeight: "100vh", background: "#0a0a0a", fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Unbounded:wght@700;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .display { font-family: 'Unbounded', sans-serif; }
      `}</style>

      <nav style={{ borderBottom: "1px solid #111", padding: "0 24px", height: 56, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <a href="/" style={{ textDecoration: "none" }}><h1 className="display" style={{ fontSize: 18, fontWeight: 900, color: "#fff" }}>SENTINEL</h1></a>
        <a href="/dashboard" style={{ fontSize: 13, color: "#888", textDecoration: "none", fontWeight: 500 }}>← Dashboard</a>
      </nav>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "60px 20px" }}>
        
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontSize: 11, color: "#555", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>Audit report</p>
          <h2 className="display" style={{ fontSize: 32, fontWeight: 900, letterSpacing: "-0.02em", color: "#fff", marginBottom: 8 }}>{report.contractName}</h2>
          <p style={{ fontSize: 13, color: "#666" }}>{new Date(report.timestamp).toLocaleString()}</p>
        </div>

        {/* Scores */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
          <div style={{ background: "#111", borderRadius: 12, padding: 24, textAlign: "center" }}>
            <p style={{ fontSize: 11, color: "#666", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>Security</p>
            <p className="display" style={{ fontSize: 48, fontWeight: 900, color: report.securityScore >= 70 ? "#22c55e" : report.securityScore >= 40 ? "#f59e0b" : "#ef4444" }}>{report.securityScore}</p>
          </div>
          <div style={{ background: "#111", borderRadius: 12, padding: 24, textAlign: "center" }}>
            <p style={{ fontSize: 11, color: "#666", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>Gas</p>
            <p className="display" style={{ fontSize: 48, fontWeight: 900, color: report.gasScore >= 70 ? "#22c55e" : report.gasScore >= 40 ? "#f59e0b" : "#ef4444" }}>{report.gasScore}</p>
          </div>
          <div style={{ background: "#111", borderRadius: 12, padding: 24, textAlign: "center" }}>
            <p style={{ fontSize: 11, color: "#666", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>Quality</p>
            <p className="display" style={{ fontSize: 48, fontWeight: 900, color: report.qualityScore >= 70 ? "#22c55e" : report.qualityScore >= 40 ? "#f59e0b" : "#ef4444" }}>{report.qualityScore}</p>
          </div>
        </div>

        {/* Vulnerabilities */}
        <div style={{ background: "#111", borderRadius: 16, padding: 32, marginBottom: 24 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 20 }}>Vulnerabilities</p>
          {report.vulnerabilities.map((v, i) => (
            <div key={i} style={{ background: "#0a0a0a", borderRadius: 12, padding: 20, marginBottom: 16, borderLeft: `3px solid ${v.severity === 'high' ? '#ef4444' : v.severity === 'medium' ? '#f59e0b' : '#64748b'}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>{v.issue}</p>
                <span style={{ fontSize: 11, color: v.severity === 'high' ? '#ef4444' : v.severity === 'medium' ? '#f59e0b' : '#64748b', textTransform: "uppercase", fontWeight: 700 }}>{v.severity}</span>
              </div>
              <p style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>Line {v.line}</p>
              <p style={{ fontSize: 13, color: "#aaa" }}>Fix: {v.fix}</p>
            </div>
          ))}
        </div>

        {/* Gas */}
        <div style={{ background: "#111", borderRadius: 16, padding: 32, marginBottom: 24 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 20 }}>Gas Optimizations</p>
          {report.gasOptimizations.map((g, i) => (
            <div key={i} style={{ background: "#0a0a0a", borderRadius: 12, padding: 20, marginBottom: i < report.gasOptimizations.length - 1 ? 16 : 0 }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 8 }}>{g.issue}</p>
              <p style={{ fontSize: 12, color: "#22c55e", marginBottom: 8 }}>Savings: {g.savings}</p>
              <p style={{ fontSize: 13, color: "#aaa" }}>{g.fix}</p>
            </div>
          ))}
        </div>

        {/* Comparison */}
        <div style={{ background: "#111", borderRadius: 16, padding: 32 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 20 }}>Protocol Comparison</p>
          {report.comparison.protocols.map((p, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: p.name === "Your Contract" ? "#fff" : "#888", fontWeight: p.name === "Your Contract" ? 700 : 400 }}>{p.name}</span>
                <span style={{ fontSize: 13, color: "#666" }}>{Math.round((p.security + p.gas + p.quality) / 3)}</span>
              </div>
              <div style={{ width: "100%", height: 10, background: "#0a0a0a", borderRadius: 5, overflow: "hidden" }}>
                <div style={{ width: `${Math.round((p.security + p.gas + p.quality) / 3)}%`, height: "100%", background: p.name === "Your Contract" ? "#f59e0b" : "#22c55e", borderRadius: 5 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}