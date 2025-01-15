import OpenAI from "openai";

interface RequestProps {
  json(): Promise<{
    inquiry: string;
    model: string;
    answers?: { id: string; author: string; message: string }[];
  }>;
}

export async function POST(request: RequestProps) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const { inquiry, model, answers } = await request.json();

  // Map the answers into the correct format for ChatCompletionMessageParam
  const messages =
    answers?.map(({ author, message }) => ({
      role: author === "User" ? "user" : "assistant",
      content: message,
    })) || [];

  // Add the user's current inquiry to the thread
  messages.push({ role: "user", content: inquiry });

  try {
    const threadResponse = await openai.chat.completions.create({
      model,
      messages, // Now conforms to ChatCompletionMessageParam[]
    });

    return new Response(
      JSON.stringify({
        thread: threadResponse,
        message: "Response with context recall",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in OpenAI API:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch response from OpenAI" }),
      { status: 500 }
    );
  }
}
