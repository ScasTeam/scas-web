import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("scas_token")?.value;

    const apiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/attendance/generate-qr`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
          Accept: "application/json",
        },
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
