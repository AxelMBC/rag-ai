import OpenAI from "openai";

interface RequestProps {
  json():
    | { inquiry: string; model: string }
    | PromiseLike<{ inquiry: string; model: string }>;
}

export async function POST(request: RequestProps) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const { inquiry, model } = await request.json();

  const messageThread = await openai.beta.threads.create({
    messages: [
      {
        role: "user",
        content: inquiry,
      },
    ],
  });
  console.log("messageThread: ", messageThread);

  return new Response(JSON.stringify({ message: "Groq Response", response }), {
    status: 200,
  });
}
