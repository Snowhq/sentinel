import { NextRequest, NextResponse } from "next/server";
import { auditContract } from "@/lib/audit";

export async function POST(req: NextRequest) {
  const { code } = await req.json();
  
  if (!code) {
    return NextResponse.json({ error: "Code required" }, { status: 400 });
  }
  
  try {
    const report = await auditContract(code);
    return NextResponse.json({ report });
  } catch (error: any) {
    console.error("Audit error:", error);
    return NextResponse.json({ error: error.message || "Audit failed" }, { status: 500 });
  }
}