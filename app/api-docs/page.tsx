export default function APIDocs() {
  return (
    <main style={{ minHeight: "100vh", background: "#0a0a0a", fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Unbounded:wght@700;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .display { font-family: 'Unbounded', sans-serif; }
        code { background: #111; padding: 2px 6px; borderRadius: 4px; fontSize: 13px; fontFamily: 'JetBrains Mono', monospace; }
        pre { background: #111; padding: 20px; borderRadius: 12px; overflow: auto; fontSize: 13px; lineHeight: 1.6; }
      `}</style>

      <nav style={{ borderBottom: "1px solid #111", padding: "0 24px", height: 56, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
  <h1 className="display" style={{ fontSize: 18, fontWeight: 900, color: "#fff" }}>SENTINEL</h1>
  <div style={{ display: "flex", gap: 24 }}>
    <a href="/dashboard" style={{ fontSize: 13, color: "#888", textDecoration: "none", fontWeight: 500 }}>Dashboard</a>
    <a href="/api-docs" style={{ fontSize: 13, color: "#888", textDecoration: "none", fontWeight: 500 }}>API</a>
  </div>
</nav>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "60px 20px" }}>
        <p style={{ fontSize: 11, color: "#555", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>Developer docs</p>
        <h2 className="display" style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-0.02em", color: "#fff", marginBottom: 16 }}>Agent API</h2>
        <p style={{ fontSize: 16, color: "#888", lineHeight: 1.6, marginBottom: 48 }}>Programmatic access to smart contract audits. Built for AI agents and automated workflows.</p>

        <div style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Endpoint</h3>
          <pre style={{ color: "#22c55e" }}>POST /api/agent/audit</pre>
        </div>

        <div style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Request</h3>
          <pre style={{ color: "#fff" }}>{`{
  "contractCode": "pragma solidity ^0.8.0;\\n\\ncontract Example { ... }"
}`}</pre>
        </div>

        <div style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Response</h3>
          <pre style={{ color: "#fff" }}>{`{
  "success": true,
  "audit": {
    "timestamp": "2026-04-26T...",
    "scores": {
      "security": 65,
      "gas": 72,
      "quality": 80,
      "overall": 72
    },
    "vulnerabilities": [...],
    "gasOptimizations": [...],
    "comparison": {
      "vsUniswap": -30,
      "vsAave": -32,
      "vsCompound": -23
    }
  }
}`}</pre>
        </div>

        <div style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 16, padding: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Example</h3>
          <pre style={{ color: "#fff" }}>{`const response = await fetch('https://sentinel.vercel.app/api/agent/audit', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    contractCode: solidityCode
  })
});

const { audit } = await response.json();
console.log(\`Security score: \${audit.scores.security}\`);`}</pre>
        </div>
      </div>
    </main>
  );
}
