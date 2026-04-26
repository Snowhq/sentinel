import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { code } = await req.json();
  
  if (!code) {
    return NextResponse.json({ error: "Contract code required" }, { status: 400 });
  }
  
  console.log("Creating Locus checkout session...");
  
  const res = await fetch("https://beta-api.paywithlocus.com/v1/checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": process.env.LOCUS_API_KEY!
    },
    body: JSON.stringify({
      amount: "2.00",
      merchantWallet: process.env.NEXT_PUBLIC_LOCUS_MERCHANT_WALLET,
      metadata: {
        type: "audit",
        contractCode: code.substring(0, 500)
      }
    })
  });
  
  const text = await res.text();
  console.log("Locus response:", text);
  
  if (!res.ok) {
    console.error("Locus error:", text);
    return NextResponse.json({ error: "Checkout failed: " + text.substring(0, 200) }, { status: 500 });
  }
  
  const data = JSON.parse(text);
  
  if (!data.checkoutUrl) {
    console.error("No checkoutUrl in response:", data);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
  
  return NextResponse.json({ 
    checkoutUrl: data.checkoutUrl,
    sessionId: data.sessionId
  });
}