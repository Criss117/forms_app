import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./lib/constants";
import { isPrivateRoute } from "./lib";

export { default } from "next-auth/middleware";

export async function middleware(req: NextRequest, res: NextResponse) {
  const { nextUrl } = req;
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // if (session && currentPage.includes("/account")) {
  //   return NextResponse.redirect(
  //     new URL(PRIVATE_ROUTES.DASHBOARD_HOME, nextUrl)
  //   );
  // }

  if (!session && isPrivateRoute(nextUrl.pathname)) {
    const url = PUBLIC_ROUTES.LOGIN;
    return NextResponse.redirect(new URL(url, nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
