import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const scasToken = cookieStore.get("scas_token")?.value;

    const headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });

    if (scasToken) {
      headers.append("Authorization", `Bearer ${scasToken}`);
    }

    const apiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
      {
        method: "POST",
        headers: headers,
      },
    );

    const data = await apiResponse.json();

    const response = NextResponse.json(data, { status: apiResponse.status });

    const setHeadersCookie = apiResponse.headers.getSetCookie();

    if (setHeadersCookie && setHeadersCookie.length > 0) {
      setHeadersCookie.forEach((cookieStr) => {
        response.headers.append("Set-Cookie", cookieStr);
      });
    }

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: `Internal Server error: ${error}` },
      { status: 500 },
    );
  }
}
