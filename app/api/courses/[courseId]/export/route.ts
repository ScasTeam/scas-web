import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string }> },
) {
  try {
    const { courseId } = await params;
    const searchParams = request.nextUrl.searchParams;
    const format = searchParams.get("format") || "csv";
    const token = request.cookies.get("scas_token")?.value;

    const apiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}/export?format=${format}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!apiResponse.ok) {
      const data = await apiResponse.json().catch(() => ({}));
      return NextResponse.json(data, { status: apiResponse.status });
    }

    const headers = new Headers();
    const contentType = apiResponse.headers.get("content-type");
    const contentDisposition = apiResponse.headers.get("content-disposition");

    if (contentType) headers.set("Content-Type", contentType);
    if (contentDisposition) headers.set("Content-Disposition", contentDisposition);
    headers.set("Cache-Control", "no-cache, no-store, must-revalidate");

    return new NextResponse(apiResponse.body, {
      status: apiResponse.status,
      headers,
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Internal Server error: ${error}` },
      { status: 500 },
    );
  }
}
