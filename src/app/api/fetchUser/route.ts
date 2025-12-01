import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "No token" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    if (!token)
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    const res = await fetch(
      "http://linka-backend.dokploy.byeolki.me/api/users/me",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    const text = await res.text();

    if (!res.ok) {
      return NextResponse.json(
        { error: "Backend returned error", status: res.status, details: text },
        { status: res.status },
      );
    }

    const data = JSON.parse(text);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch user",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
