import { useState } from "react";
import { useRouter } from "next/navigation";
import { MessageType } from "../../types/Message";

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
    const endpoint = !conversationalMemory ? "/api/chat" : "/api/chatMemory";

    const newUserMessage: MessageType = {
      id: crypto.randomUUID(),
      role: "user",
      content: userPrompt,
    };

    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    const updatedMessages = [...messages, newUserMessage];

    try {
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
      }
      router.push(`#${answerID}`);
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
              <button
                className="d-flex justify-content-center align-items-center cursor-pointer me-3"
                onClick={() => handlePrompt()}
                disabled={loading}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "white",
                }}
              >
                <i className="fas fa-arrow-up" style={{ color: "black" }} />
              </button>
              {/* <div
                className="d-flex justify-content-center align-items-center cursor-pointer"
                onClick={() => handlePrompt()}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "white",
                }}
              >
                <i className="fas fa-flask" style={{ color: "black" }} />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptInput;
