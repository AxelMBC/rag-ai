import Groq from "groq-sdk";
import { ChatGroq } from "@langchain/groq";
import {
  START,
  END,
  MessagesAnnotation,
  StateGraph,
  MemorySaver,
} from "@langchain/langgraph";
import { v4 as uuidv4 } from "uuid";

// const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

interface RequestProps {
  json():
    | { inquiry: string; model: string }
    | PromiseLike<{ inquiry: string; model: string }>;
}

export async function POST(request: RequestProps) {
  // const { inquiry, model } = await request.json();
  const config = { configurable: { thread_id: uuidv4() } };
  const llm = new ChatGroq({
    model: "mixtral-8x7b-32768",
    temperature: 0,
  });
  // Define the function that calls the model
  const callModel = async (state: typeof MessagesAnnotation.State) => {
    const response = await llm.invoke(state.messages);
    // Update message history with response:
    return { messages: response };
  };

  // Define a new graph
  const workflow = new StateGraph(MessagesAnnotation)
    // Define the (single) node in the graph
    .addNode("model", callModel)
    .addEdge(START, "model")
    .addEdge("model", END);

  // Add memory
  const memory = new MemorySaver();
  const app = workflow.compile({ checkpointer: memory });
  const input = [
    {
      role: "user",
      content: "Hi! I'm Bob.",
    },
  ];
  const output = await app.invoke({ messages: input }, config);
  // The output contains all messages in the state.
  // This will long the last message in the conversation.
  const response = output.messages[output.messages.length - 1];
  console.log(response);

  return new Response(JSON.stringify({ message: "Groq Response", response }), {
    status: 200,
  });
}
