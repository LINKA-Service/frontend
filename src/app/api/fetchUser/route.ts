import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    console.log("=== fetchUser START ===");
    console.log("authHeader:", authHeader);

    if (!authHeader) {
      console.log("ERROR: No authHeader");
      return NextResponse.json({ error: "No token" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    if (!token) {
      console.log("ERROR: No token after replace");
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    console.log("token length:", token.length);
    console.log("token preview:", token.substring(0, 20) + "...");

    console.log("Fetching from backend...");
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

    console.log("Backend response status:", res.status);
    const text = await res.text();
    console.log("Backend response text:", text);

    if (!res.ok) {
      console.log("ERROR: Backend not ok");
      return NextResponse.json(
        { error: "Backend returned error", status: res.status, details: text },
        { status: res.status },
      );
    }

    let data;
    try {
      data = JSON.parse(text);
      console.log("Parsed data:", data);
    } catch (parseError) {
      console.log("ERROR: JSON parse failed");
      console.log("Parse error:", parseError);
      return NextResponse.json(
        { error: "Failed to parse response", details: text },
        { status: 500 },
      );
    }

    console.log("=== fetchUser SUCCESS ===");
    return NextResponse.json(data);
  } catch (error) {
    console.error("=== fetchUser ERROR ===");
    console.error("Error type:", error?.constructor?.name);
    console.error(
      "Error message:",
      error instanceof Error ? error.message : String(error),
    );
    console.error(
      "Error stack:",
      error instanceof Error ? error.stack : "No stack",
    );

    return NextResponse.json(
      {
        error: "Failed to fetch user",
        details: error instanceof Error ? error.message : String(error),
        stack:
          process.env.NODE_ENV === "development"
            ? error instanceof Error
              ? error.stack
              : undefined
            : undefined,
      },
      { status: 500 },
    );
  }
}
