import { NextRequest, NextResponse } from "next/server";

const getBackendUrl = () => {
  return process.env.NEXT_PUBLIC_API_BASE_URL_AI;
};

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const params = await context.params;
    const backendUrl = getBackendUrl();
    if (!backendUrl) {
      return NextResponse.json({ error: "서버 설정 오류" }, { status: 500 });
    }

    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "인증 토큰이 필요합니다." },
        { status: 401 },
      );
    }

    const token = authHeader.substring(7);
    const body = await request.json();
    const apiUrl = `${backendUrl}/api/consultation/${params.id}/messages/ai`;

    const backendResponse = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(
        { error: data.detail || "AI 메시지 전송에 실패했습니다." },
        { status: backendResponse.status },
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error sending AI message:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
