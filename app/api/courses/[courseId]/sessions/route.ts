import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string }> },
) {
  try {
    const { courseId } = await params;
    const cookieStore = await cookies();
    const scasToken = cookieStore.get("scas_token")?.value;

    const headers = new Headers({
      Accept: "application/json",
    });

    if (scasToken) {
      headers.append("Authorization", `Bearer ${scasToken}`);
    }

    const apiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}/sessions`,
      { method: "GET", headers },
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

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string }> },
) {
  try {
    const { courseId } = await params;
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
      `${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}/sessions`,
      { method: "POST", headers, body: JSON.stringify(body) },
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
