import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
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
      `${process.env.NEXT_PUBLIC_API_URL}/courses`,
      {
        method: "GET",
        headers: headers,
      },
    );

    const data = await apiResponse.json();

    return NextResponse.json(data, { status: apiResponse.status });
  } catch (error) {
    return NextResponse.json(
      { error: `Internal Server error: ${error}` },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
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
      `${process.env.NEXT_PUBLIC_API_URL}/courses`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      },
    );

    const data = await apiResponse.json();

    return NextResponse.json(data, { status: apiResponse.status });
  } catch (error) {
    return NextResponse.json(
      { error: `Internal Server error: ${error}` },
      { status: 500 },
    );
  }
}
