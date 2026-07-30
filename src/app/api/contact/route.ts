import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      console.error("Missing environment variables for Telegram Integration.");
      return NextResponse.json({ error: "Server Configuration Error: Missing credentials." }, { status: 500 });
    }

    const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;
    const textContent = `📩 New Portfolio Message!\n\n👤 Name: ${name}\n📧 Email: ${email}\n\n💬 Message:\n${message}`;

    const res = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: textContent,
      }),
    });

    if (!res.ok) {
      throw new Error(`Telegram API response status: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Telegram Form Submission Error:", error);
    return NextResponse.json({ error: error.message || "Failed to deliver message" }, { status: 500 });
  }
}
export async function GET() {
  return NextResponse.json({ status: "Route Active" });
}
