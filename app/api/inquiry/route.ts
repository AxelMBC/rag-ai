import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(request: any) {
  const { inquiry } = await request.json();
  const response = await groq.chat.completions.create({
    messages: [{ role: "user", content: inquiry }],
    model: "llama3-8b-8192",
  });

  console.log("response: ", response);
  return new Response(JSON.stringify({ message: "Groq Response", response }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
