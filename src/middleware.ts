import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith("/api/auth");
    const isHomePage = req.nextUrl.pathname === "/";

    if (!isAuth && !isAuthPage && !isHomePage) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (isAuth && isHomePage) {
      return NextResponse.redirect(new URL("/projects/1/board", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const isAuthPage = req.nextUrl.pathname.startsWith("/api/auth");
        const isHomePage = req.nextUrl.pathname === "/";
        
        if (isAuthPage || isHomePage) {
          return true;
        }
        
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
