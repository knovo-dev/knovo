import { NextResponse } from "next/server";
import { Resend } from "resend";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as { email?: string };
    const email = payload.email?.trim() ?? "";

    if (!emailPattern.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.contacts.create({
      email,
      unsubscribed: false,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
