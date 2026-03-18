import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "Knovo";
  const description =
    searchParams.get("description") ?? "The world's most complete AI knowledge hub";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(circle at top left, rgba(79, 70, 229, 0.25), transparent 35%), #0B1120",
          color: "white",
          padding: "64px",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: "999px",
            padding: "12px 18px",
            fontSize: 28,
            color: "#C7D2FE",
          }}
        >
          Knovo
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05 }}>{title}</div>
          <div style={{ fontSize: 32, color: "#CBD5E1", maxWidth: 900 }}>{description}</div>
        </div>
        <div style={{ fontSize: 28, color: "#A5B4FC" }}>The world&apos;s most complete AI knowledge hub</div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
