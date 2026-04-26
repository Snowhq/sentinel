"use client";
import { useState } from "react";

export default function Dashboard() {
  const [audits] = useState([
    {
      id: "audit_1745875200000",
      timestamp: "2026-04-25T14:30:00Z",
      contractName: "SimpleBank.sol",
      scores: { security: 65, gas: 72, quality: 80 },
      status: "completed"
    },
    {
      id: "audit_1745788800000",
      timestamp: "2026-04-24T10:15:00Z",
      contractName: "TokenSwap.sol",
      scores: { security: 88, gas: 82, quality: 85 },
      status: "completed"
    },
    {
      id: "audit_1745702400000",
      timestamp: "2026-04-23T16:45:00Z",
      contractName: "NFTMarketplace.sol",
      scores: { security: 92, gas: 78, quality: 90 },
      status: "completed"
    }
  ]);

  return (
    <main style={{ minHeight: "100vh", background: "#0a0a0a", fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Unbounded:wght@700;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .display { font-family: 'Unbounded', sans-serif; }
      `}</style>

      <nav style={{ borderBottom: "1px solid #111", padding: "0 24px", height: 56, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <a href="/" style={{ textDecoration: "none" }}><h1 className="display" style={{ fontSize: 18, fontWeight: 900, color: "#fff" }}>SENTINEL</h1></a>
        <div style={{ display: "flex", gap: 24 }}>
          <a href="/dashboard" style={{ fontSize: 13, color: "#fff", textDecoration: "none", fontWeight: 600 }}>Dashboard</a>
          <a href="/api-docs" style={{ fontSize: 13, color: "#888", textDecoration: "none", fontWeight: 500 }}>API</a>
        </div>
      </nav>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 20px" }}>
        
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 11, color: "#555", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>Audit history</p>
          <h2 className="display" style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-0.02em", color: "#fff", marginBottom: 16 }}>Your audits</h2>
          <p style={{ fontSize: 16, color: "#888" }}>All security reports and protocol comparisons</p>
        </div>

        <div style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 16, padding: 32 }}>
          
          {audits.map((audit, i) => (
            <div key={audit.id} style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 12, padding: 24, marginBottom: i < audits.length - 1 ? 16 : 0, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 6 }}>{audit.contractName}</p>
                <p style={{ fontSize: 12, color: "#666" }}>{new Date(audit.timestamp).toLocaleString()}</p>
              </div>

              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                
                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ textAlign: "center" }}>
                    <p style={{ fontSize: 10, color: "#666", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>Security</p>
                    <p className="display" style={{ fontSize: 20, fontWeight: 900, color: audit.scores.security >= 70 ? "#22c55e" : audit.scores.security >= 40 ? "#f59e0b" : "#ef4444" }}>{audit.scores.security}</p>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <p style={{ fontSize: 10, color: "#666", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>Gas</p>
                    <p className="display" style={{ fontSize: 20, fontWeight: 900, color: audit.scores.gas >= 70 ? "#22c55e" : audit.scores.gas >= 40 ? "#f59e0b" : "#ef4444" }}>{audit.scores.gas}</p>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <p style={{ fontSize: 10, color: "#666", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>Quality</p>
                    <p className="display" style={{ fontSize: 20, fontWeight: 900, color: audit.scores.quality >= 70 ? "#22c55e" : audit.scores.quality >= 40 ? "#f59e0b" : "#ef4444" }}>{audit.scores.quality}</p>
                  </div>
                </div>

                <a href={`/report/${audit.id}`} style={{ background: "#fff", color: "#0a0a0a", padding: "10px 20px", borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>View report</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}