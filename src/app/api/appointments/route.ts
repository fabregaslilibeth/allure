import { NextResponse } from "next/server";
import { validateBooking } from "@/lib/booking";

/**
 * Receives appointment requests from /appointment.
 * If BOOKING_WEBHOOK_URL is set, the validated request is forwarded there as
 * JSON (e.g. to a booking system or an email automation). Otherwise it is only
 * validated and acknowledged.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field.
  if (typeof body === "object" && body !== null && "company" in body && (body as { company: unknown }).company) {
    return NextResponse.json({ ok: true });
  }

  const result = validateBooking(body);
  if (!result.ok) {
    return NextResponse.json({ errors: result.errors }, { status: 422 });
  }

  const webhook = process.env.BOOKING_WEBHOOK_URL;
  if (webhook) {
    try {
      const response = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...result.data, receivedAt: new Date().toISOString() }),
      });
      if (!response.ok) throw new Error(`Webhook responded ${response.status}`);
    } catch (error) {
      console.error("Booking webhook failed", error);
      return NextResponse.json({ error: "We couldn't send your request. Please try again." }, { status: 502 });
    }
  }

  return NextResponse.json({ ok: true });
}
