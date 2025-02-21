import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { MessageType } from "../../types/Message";

interface Message {
  id: string;
  author: string;
  message: string;
}

interface InputAskProps {
  messages: MessageType[];
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
  conversationalMemory: boolean;
  selectedModel: string;
  answers: Message[];
  // Allow both a direct array OR a function returning a new array
  setAnswers: React.Dispatch<React.SetStateAction<Message[]>>;
  setLoading: (value: boolean) => void;
}

const PromptInput = ({
  messages,
  setMessages,
  conversationalMemory,
  selectedModel,
  answers,
  setAnswers,
  setLoading,
}: InputAskProps) => {
  const router = useRouter();
  const [inquiry, setInquiry] = useState("");
  const [userPrompt, setUserPrompt] = useState("");
  console.log("messages: ", messages);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inquiry.trim()) return; // Prevent submitting empty inquiries

    setLoading(true);

    // Create a new answer without mutating the prop directly
    const userId = uuidv4();
    const updatedAnswers = [
      ...answers,
      { id: userId, author: "User", message: inquiry },
    ];
    setAnswers(updatedAnswers);

    try {
      // Determine endpoint and payload based on conversationalMemory flag
      const endpoint = conversationalMemory
        ? "/api/inquiry"
        : "/api/inquiryNoMemory";
      const payload = conversationalMemory
        ? { answers: updatedAnswers, model: selectedModel }
        : { inquiry, model: selectedModel };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      const machineId = uuidv4();

      const newAnswer = {
        id: machineId,
        author: data.response.model,
        message: data.response.choices[0].message.content,
      };

      setAnswers((prev) => [...prev, newAnswer]);
      router.push(`#${machineId}`);
    } catch (error) {
      console.error("Error during inquiry submission:", error);
    } finally {
      setLoading(false);
      setInquiry("");
    }
  };

  const handlePrompt = async () => {
    if (!userPrompt.trim()) return; // Prevent sending empty prompts
    setLoading(true);

    const newUserMessage: MessageType = {
      id: crypto.randomUUID(),
      role: "user",
      message: userPrompt,
    };

    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    const updatedMessages = [...messages, newUserMessage];

    try {
      const res = await fetch("/api/chat", {
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

      if (botContent) {
        const botMessage: MessageType = {
          id: crypto.randomUUID(),
          role: botName,
          message: botContent,
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
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
                // name="inquiry"
                // value={inquiry}
                // onChange={(e) => setInquiry(e.target.value)}
                name="userPrompt"
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                placeholder="Type your question..."
              />
              <div
                className="d-flex justify-content-center align-items-center cursor-pointer me-3"
                onClick={() => handleSubmit()}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "white",
                }}
              >
                <i className="fas fa-arrow-up" style={{ color: "black" }} />
              </div>
              <div
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptInput;
