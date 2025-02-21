import { NextResponse } from "next/server";
import { MessageType } from "@/app/types/Message";

export async function POST(request: Request) {
  try {
    const { messages, model } = await request.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "No messages provided." },
        { status: 400 }
      );
    }

    const transformedMessages = [];

    messages.map((item: MessageType) => {
      transformedMessages.push({
        role: item.role == "user" ? item.role : "assistant",
        content: item.content,
      });
    });

    const payload = {
      model,
      messages: transformedMessages,
    };
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error from chat completions API:", errorText);
      return NextResponse.json(
        { error: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("response data: ", data);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
