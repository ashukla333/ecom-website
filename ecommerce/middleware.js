import { NextResponse } from "next/server";


// This function can be marked `async` if using `await` inside
export function middleware(request) {
  if (request.cookies.get("AuthToken")) {
    return null;
  }
  return NextResponse.redirect(new URL("/login", request.url));
  
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/cart","/wishlist","/checkout","/profile","/product:id","/category:id"],
};
