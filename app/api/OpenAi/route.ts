// import OpenAI from "openai";

// const client = new OpenAI({
//   apiKey: process.env.GROQ_API_KEY,
//   baseURL: "https://api.groq.com/openai/v1"
// });

// export async function POST(request: any) {
//   const { inquiry } = await request.json();
//   const response = await client.chat.create({
//     messages: [{ role: "user", content: inquiry }],
//     model: "llama3-8b-8192",
//   });

//   console.log("response: ", response);
//   return new Response(JSON.stringify({ message: "OpenAI Response", response }), {
//     status: 200,
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
}
