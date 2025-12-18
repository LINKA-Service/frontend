import { NextRequest, NextResponse } from "next/server";

const getBackendUrl = () => {
  return process.env.NEXT_PUBLIC_API_BASE_URL_AI;
};

export async function GET(request: NextRequest) {
  try {
    const backendUrl = getBackendUrl();
    if (!backendUrl) {
      return NextResponse.json(
        { error: "서버 설정 오류: 백엔드 주소가 지정되지 않았습니다." },
        { status: 500 },
      );
    }

    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "인증 토큰이 필요합니다." },
        { status: 401 },
      );
    }

    const token = authHeader.substring(7);
    const apiUrl = `${backendUrl}/api/case/`;

    const backendResponse = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(
        { error: data.detail || "케이스 목록을 가져오는데 실패했습니다." },
        { status: backendResponse.status },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching cases:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
