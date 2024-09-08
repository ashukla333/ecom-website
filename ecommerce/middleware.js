import { NextResponse } from "next/server";

// This function is now marked `async`
export async function middleware(request) {
  // Example of awaiting an async operation, if needed in the future
  const authToken = await request.cookies.get("AuthToken");
  console.log(authToken, "authtoken");

  // Check if AuthToken exists
  if (authToken) {
    return NextResponse.next(); // Continue with the next middleware or the requested page
  }

  // If no AuthToken, redirect to login
  return NextResponse.redirect(new URL("/login", request.url));
}

// Matching Paths configuration
export const config = {
  matcher: ["/cart", "/wishlist", "/profile","/checkout","/cart"],
};
