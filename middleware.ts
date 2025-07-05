import { NextRequest, NextResponse } from "next/server";
import { auth0 } from "./lib/auth0"
import { api } from "./lib/api-client";

export async function middleware(request: NextRequest) {
    const authRes = await auth0.middleware(request);
    api.get("/api/user/me")

    if (request.nextUrl.pathname.startsWith("/auth")) {
        return authRes;
    }

    const { origin } = new URL(request.url)
    const session = await auth0.getSession()

    if (!session) {
        return NextResponse.redirect(`${origin}/auth/login`)
    }

    // Get user role
    let userRole = null;
    try {
        const userRes = await api.get<{role: "ADMIN" | "TEACHER" | "STUDENT"}>("/api/user/me", { authType: "token" });
        console.log(userRes, '<== userRes in middleware')
        userRole = userRes?.role || null;
    } catch (e) {
        // fallback or handle error
    }

    // Role-based path protection
    const pathname = request.nextUrl.pathname;

    // Allow all users to access "/" and any path starting with "/public"
    if (pathname === "/" || pathname.startsWith("/public")) {
        return authRes;
    }

    if (userRole === "ADMIN" && !pathname.startsWith("/admin") && pathname !== "/auth/login") {
        const url = request.nextUrl.clone();
        url.pathname = "/admin/user-management";
        return NextResponse.redirect(url);
    }
    if (userRole === "TEACHER" && !pathname.startsWith("/teacher") && pathname !== "/auth/login") {
        const url = request.nextUrl.clone();
        url.pathname = "/teacher/dashboard";
        return NextResponse.redirect(url);
    }
    if (userRole === "STUDENT" && !pathname.startsWith("/user") && pathname !== "/auth/login") {
        const url = request.nextUrl.clone();
        url.pathname = "/user/profile";
        return NextResponse.redirect(url);
    }

    // Specific redirects
    if (pathname === "/user") {
        const url = request.nextUrl.clone()
        url.pathname = '/user/profile'
        return NextResponse.redirect(url)
    }

    if (pathname === "/admin") {
        const url = request.nextUrl.clone()
        url.pathname = '/admin/user-management'
        return NextResponse.redirect(url)
    }

    if (pathname === "/teacher") {
        const url = request.nextUrl.clone()
        url.pathname = '/teacher/dashboard'
        return NextResponse.redirect(url)
    }

    return authRes
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         * - api (API routes)
         */
        "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|api|vectors|public|images|logo).*)",
    ],
}