import Groq from "groq-sdk";
import OpenAI from "openai";

// const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

interface RequestProps {
  json():
    | { inquiry: string; model: string }
    | PromiseLike<{ inquiry: string; model: string }>;
}

export async function POST(request: RequestProps) {
  const openai = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
  });

  const { inquiry, model } = await request.json();
  // const response = await groq.chat.completions.create({
  //   messages: [{ role: "user", content: inquiry }],
  //   model,
  // });

  const response = await openai.chat.completions.create({
    messages: [{ role: "user", content: inquiry }],
    model,
  });
  console.log("resonse: ", response);

  return new Response(JSON.stringify({ message: "Groq Response", response }), {
    status: 200,
  });
}
