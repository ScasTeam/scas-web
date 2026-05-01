import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });

    const cookieStore = await cookies();
    const boundDeviceId = cookieStore.get("bound_device_id")?.value;

    if (boundDeviceId) {
      headers.append("Cookie", `bound_device_id=${boundDeviceId}`);
    }

    const apiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register/lecturer`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          ...body,
          client_type: "web",
        }),
      },
    );

    const data = await apiResponse.json();

    const response = NextResponse.json(data, { status: apiResponse.status });

    const setCookieHeaders = apiResponse.headers.getSetCookie();
    if (setCookieHeaders && setCookieHeaders.length > 0) {
      setCookieHeaders.forEach((cookieStr) => {
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
