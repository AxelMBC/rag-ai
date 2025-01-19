import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

interface RequestProps {
  json():
    | { inquiry: string; model: string }
    | PromiseLike<{ inquiry: string; model: string }>;
}

export async function POST(request: RequestProps) {
  const { inquiry, model } = await request.json();
  const response = await groq.chat.completions.create({
    messages: [{ role: "user", content: inquiry }],
    model,
  });

  console.log("response: ", response);
  return new Response(JSON.stringify({ message: "Groq Response", response }), {
    status: 200,
  });
}
