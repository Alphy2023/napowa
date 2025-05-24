import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

// Define your route categories
const PUBLIC_ROUTES = ["/", "/about", "/contact",
  "/programs","/events","/gallery","/blog",
  "/volunteer","/partner","/fundraiser","/donate"
];
const GUEST_ROUTES = ["/auth:*"]; 

// Helper function to check if a path matches any of the patterns (handles simple wildcards)
function isRouteMatch(path: string, patterns: string[]): boolean {
  return patterns.some(pattern => {
    if (pattern.endsWith(":*")) {
      return path.startsWith(pattern.slice(0, -2));
    }
    // Exact match
    return path === pattern;
  });
}

function isApiRoute(path: string): boolean {
  return path.startsWith("/api/");
}

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;
  // 1. Allow all API routes - these should be publicly accessible
  if (isApiRoute(pathname)) {
    return NextResponse.next();
  }

  // 2. Allow public routes - accessible to everyone
  if (isRouteMatch(pathname, PUBLIC_ROUTES)) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // 3. Handle Guest Routes (e.g., /login, /signup, /onboarding/*)
  if (isRouteMatch(pathname, GUEST_ROUTES)) {
    if (token) {
      // If a logged-in user tries to access a guest route,
      // redirect them to a default authenticated page (e.g., dashboard)
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    // If not logged in, allow access to the guest route
    return NextResponse.next();
  }

  // 4. All other routes are protected by default.
  // If there's no token (user is not logged in), redirect to the login page.
  if (!token) {
    const loginUrl = new URL("/auth/login", origin); // Use origin for a clean base URL
    loginUrl.searchParams.set("redirectedFrom", pathname); // Pass the original path for post-login redirection
    return NextResponse.redirect(loginUrl);
  }

  // 5. If a token exists and the route is not API, public, or guest,
  // it's a protected route the authenticated user is trying to access. Allow access.
  // This covers routes like /dashboard, /dashboard/settings, /profile, etc.
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Exclude internal Next.js files and any public folder file with an extension
    "/((?!_next/static|_next/image|favicon.ico|api/auth|.*\\.[a-zA-Z0-9]+$).*)",
  ],
};
