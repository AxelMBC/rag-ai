import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

interface InputAskProps {
  inquiry: string;
  setInquiry: (value: string) => void;
  selectedModel: string;
  answers: { id: string; author: string; message: string }[];
  setAnswers: (
    value: { id: string; author: string; message: string }[]
  ) => void;
  setLoading: (value: boolean) => void;
}

const InputAsk = ({
  inquiry,
  setInquiry,
  selectedModel,
  answers,
  setAnswers,
  setLoading,
}: InputAskProps) => {
  const router = useRouter();
  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch("/api/inquiry", {
      method: "POST",
      body: JSON.stringify({ inquiry, model: selectedModel }),
    });
    const machineId = uuidv4();
    const data = await res.json();
    const newAnswer = {
      id: machineId,
      author: data.response.model,
      message: data.response.choices[0].message.content,
    };
    const userId = uuidv4();
    answers.push({ id: userId, author: "User", message: inquiry });
    setAnswers([...answers, newAnswer]);
    router.push(`#${machineId}`);
    setLoading(false);
    setInquiry("");
  };
  return (
    <div className="sticky-chat-input">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-2"></div>
          <div className="col-9">
            <hr />
          </div>
          <div className="col-2"></div>
          <div className="col-12 col-md-8">
            <div className="input-group">
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

export default InputAsk;
