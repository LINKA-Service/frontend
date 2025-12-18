import { NextRequest, NextResponse } from "next/server";

const getBackendUrl = () => {
  return process.env.NEXT_PUBLIC_API_BASE_URL;
};

export async function GET(request: NextRequest) {
  try {
    const backendUrl = getBackendUrl();
    if (!backendUrl) {
      return NextResponse.json({ error: "서버 설정 오류" }, { status: 500 });
    }

    const { searchParams } = new URL(request.url);
    const specialization = searchParams.get("specialization");

    let apiUrl = `${backendUrl}/api/lawyers/search`;
    if (specialization) {
      apiUrl += `?specialization=${encodeURIComponent(specialization)}`;
    }

    const backendResponse = await fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(
        { error: data.detail || "변호사 검색에 실패했습니다." },
        { status: backendResponse.status },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error searching lawyers:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
