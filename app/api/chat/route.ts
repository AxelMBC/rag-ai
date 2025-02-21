import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { messages, model } = await request.json();

    console.log("messages:", messages);
    console.log("model:", model);
    return NextResponse.json({ response: "success" }, { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
