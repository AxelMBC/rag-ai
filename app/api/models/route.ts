import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function GET() {
  const models = await groq.models.list();
  return new Response(JSON.stringify({ message: "Groq Models", models }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
