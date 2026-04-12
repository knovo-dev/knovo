import { NextResponse } from "next/server";
import { Resend } from "resend";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  // Parse request — bad JSON is a 400
  let email: string;
  try {
    const payload = (await request.json()) as { email?: string };
    email = payload.email?.trim() ?? "";
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  // Call Resend — failures here are 500 (server-side)
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.contacts.create({
      email,
      audienceId: process.env.RESEND_AUDIENCE_ID!,
      unsubscribed: false,
    });

    if (error) {
      // Already subscribed — treat as success (idempotent)
      const e = error as { name?: string; message?: string };
      const isDuplicate =
        e.name === "already_exists" ||
        e.name?.includes("already") ||
        e.message?.toLowerCase().includes("already");
      if (isDuplicate) {
        return NextResponse.json({ ok: true }, { status: 200 });
      }
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("Resend exception:", err);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
