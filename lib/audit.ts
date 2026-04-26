import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!
});

export async function auditContract(code: string) {
  const message = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4000,
    messages: [{
      role: "user",
      content: `You are a Solidity security auditor. Analyze this smart contract and provide:

1. Security Score (0-100)
2. Gas Optimization Score (0-100)
3. Code Quality Score (0-100)
4. List of vulnerabilities found
5. Gas optimization suggestions
6. Code improvements
7. Protocol comparison data

Contract:
\`\`\`solidity
${code}
\`\`\`

Return ONLY valid JSON with this exact structure (no markdown, no backticks):
{
  "securityScore": number,
  "gasScore": number,
  "qualityScore": number,
  "vulnerabilities": [{ "severity": "high|medium|low", "issue": string, "line": number, "fix": string }],
  "gasOptimizations": [{ "issue": string, "savings": string, "fix": string }],
  "improvements": [string],
  "comparison": {
    "protocols": [
      { "name": "Uniswap V3", "security": 95, "gas": 88, "quality": 92 },
      { "name": "Aave V3", "security": 97, "gas": 85, "quality": 94 },
      { "name": "Compound", "security": 93, "gas": 82, "quality": 90 },
      { "name": "Your Contract", "security": YOUR_SECURITY_SCORE, "gas": YOUR_GAS_SCORE, "quality": YOUR_QUALITY_SCORE }
    ],
    "insights": [string, string, string]
  }
}`
    }]
  });

  const text = message.content[0].type === "text" ? message.content[0].text : "";
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("No JSON found in response");
  
  return JSON.parse(jsonMatch[0]);
}