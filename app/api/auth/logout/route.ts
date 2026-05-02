import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const scasToken = cookieStore.get("scas_token")?.value;

  try {
    if (scasToken) {
      const headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${scasToken}`,
      });

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: "POST",
        headers: headers,
      });
    }
  } catch {}

  const response = NextResponse.json(
    { status: "success", message: "Logged out" },
    { status: 200 },
  );

  response.cookies.set("scas_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
