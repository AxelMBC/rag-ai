import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
interface Message {
  id: string;
  author: string;
  message: string;
}

interface InputAskProps {
  conversationalMemory: boolean;
  selectedModel: string;
  answers: Message[];
  // Allow both a direct array OR a function returning a new array
  setAnswers: React.Dispatch<React.SetStateAction<Message[]>>;
  setLoading: (value: boolean) => void;
}

const PromptInput = ({
  conversationalMemory,
  selectedModel,
  answers,
  setAnswers,
  setLoading,
}: InputAskProps) => {
  const router = useRouter();
  const [inquiry, setInquiry] = useState("");

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

  return (
    <div className="sticky-chat-input">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-md-11 col-xl-8 col-xxl-6">
            <div className="input-group" style={{ marginLeft: "2em" }}>
              <input
                className="form-control me-4"
                type="text"
                name="inquiry"
                value={inquiry}
                onChange={(e) => setInquiry(e.target.value)}
                placeholder="Type your question..."
              />
              <div
                className="d-flex justify-content-center align-items-center cursor-pointer"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptInput;
