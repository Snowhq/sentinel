import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { code } = await req.json();
  
  if (!code) {
    return NextResponse.json({ error: "Contract code required" }, { status: 400 });
  }
  
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
        codeLength: code.length
      }
    })
  });
  
  const data = await res.json();
  
  if (!data.checkoutUrl) {
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
  
  return NextResponse.json({ 
    checkoutUrl: data.checkoutUrl,
    sessionId: data.sessionId
  });
}
