import { useState } from "react";
import { useRouter } from "next/navigation";
import { MessageType } from "../../types/Message";
import SubmitButton from "./SubmitButton";

interface InputAskProps {
  messages: MessageType[];
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
  conversationalMemory: boolean;
  selectedModel: string;
  loading: boolean;
  setLoading: (value: boolean) => void;
}

const PromptInput = ({
  messages,
  setMessages,
  conversationalMemory,
  selectedModel,
  loading,
  setLoading,
}: InputAskProps) => {
  const router = useRouter();
  const [userPrompt, setUserPrompt] = useState("");

  const handlePrompt = async () => {
    if (!userPrompt.trim()) return; // Prevent sending empty prompts
    setLoading(true);

    const newUserMessage: MessageType = {
      id: crypto.randomUUID(),
      role: "user",
      content: userPrompt,
    };

    //Add user message to 'messages' list
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    const updatedMessages = [...messages, newUserMessage]; //Create shallow copy of previous and new message

    // use chatMemory endpoint if user wants conversation memory
    const endpoint = !conversationalMemory ? "/api/chat" : "/api/chatMemory";

    try {
      // API call
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages,
          model: selectedModel,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      const botContent = data?.choices?.[0]?.message?.content;
      const botName = data?.model;
      const answerID = crypto.randomUUID();

      if (botContent) {
        const botMessage: MessageType = {
          id: answerID,
          role: botName,
          content: botContent,
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
        router.push(`#${answerID}`);
      }
    } catch (error) {
      console.error("Error during prompt submission:", error);
    } finally {
      setUserPrompt("");
      setLoading(false);
    }
  };

  return (
    <div className="sticky-chat-input">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-md-11 col-xl-8 col-xxl-6">
            <div className="input-group" style={{ marginLeft: "2em" }}>
              <input
                className="form-control me-4"
                type="text"
                name="userPrompt"
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                placeholder="Type your question..."
              />
              <SubmitButton handlePrompt={handlePrompt} loading={loading} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptInput;
