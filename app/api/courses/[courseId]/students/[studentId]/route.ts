import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string; studentId: string }> },
) {
  try {
    const { courseId, studentId } = await params;
    const token = request.cookies.get("scas_token")?.value;

    const apiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}/students/${studentId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
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
