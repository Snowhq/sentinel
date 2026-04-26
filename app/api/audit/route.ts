import { NextRequest, NextResponse } from "next/server";

// ⚠️ MOCK DATA - REPLACE WITH REAL ANTHROPIC API BEFORE SUBMISSION ⚠️

export async function POST(req: NextRequest) {
  const { code } = await req.json();
  
  if (!code) {
    return NextResponse.json({ error: "Code required" }, { status: 400 });
  }
  
  const report = {
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
    improvements: [
      "Add events for deposit and withdraw",
      "Implement access control modifiers",
      "Add function to check contract balance"
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
  
  return NextResponse.json({ report });
}
