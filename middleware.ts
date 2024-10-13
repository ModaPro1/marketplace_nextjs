import { NextResponse, type NextRequest } from "next/server";

const protectedUserRoutes = ["/user", "/profile", "/cart", "/checkout", "/orders"];
const guestsRoutes = ["/login", "/signup"];
const protectedMerchantRoutes = ["/merchant_dashboard"];

export async function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("auth-session")
  const res = await fetch(`${request.nextUrl.origin}/api/auth_session`, {
    headers: {
      "cookie": `auth-session=${authCookie?.value || ''}`
    }
  });
  const session = await res.json();
  const { pathname } = request.nextUrl;
  
  // Guests routes
  if (guestsRoutes.some((route) => pathname.startsWith(route))) {
    if (session.isLoggedIn) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Protected user routes
  if (protectedUserRoutes.some((route) => pathname.startsWith(route))) {
    if (!session.isLoggedIn || session.userType != "user") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Protected merchant routes
  if (protectedMerchantRoutes.some((route) => pathname.startsWith(route))) {
    if (!session.isLoggedIn || session.userType != "merchant") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
};
