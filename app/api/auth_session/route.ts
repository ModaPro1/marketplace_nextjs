import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getSession();
  
  if (!session.isLoggedIn) {
    return NextResponse.json({ isLoggedIn: false }, { status: 401 });
  }

  return NextResponse.json({ isLoggedIn: true, userType: session.userType }, { status: 200 });
}
