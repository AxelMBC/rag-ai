"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import "../styles/global.scss";
import { formatResponse } from "./utils/formatResponse";
import ModelSelector from "./components/modelSelector";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

export default function Home() {
  const [inquiry, setInquiry] = useState("");
  const [answers, setAnswers] = useState<
    { id: string; author: string; message: string }[]
  >([]);
  const [selectedModel, setSelectedModel] = useState("llama3-8b-8192");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  console.log("answers", answers);

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
    <div className="main-container d-flex align-items-center">
      <main className="content">
        <div className="container-fluid">
          <div className="row response-container">
            <ModelSelector
              selectedModel={selectedModel}
              setSelectedModel={setSelectedModel}
            />

            <h3 className="col-12 col-sm-8 prompt fw-bold">
              What is your question?
            </h3>

            <div className="col-12" style={{ paddingBottom: "200px" }}>
              {answers &&
                answers.length > 0 &&
                answers.map((answer, index) => {
                  if (answer.author === "User") {
                    return (
                      <div
                        id={answer.id}
                        className="response-box bg-transparent"
                        key={index}
                      >
                        <h5
                          style={{
                            fontWeight: "600",

                            color: "#009bd6",
                          }}
                        >
                          {answer.author}:
                        </h5>
                        <span>{formatResponse(answer.message)}</span>
                      </div>
                    );
                  }
                  return (
                    <div id={answer.id} className="response-box" key={index}>
                      <h5
                        style={{
                          fontWeight: "600",
                          color: "#F40009",
                          paddingTop: "20px",
                        }}
                      >
                        {answer.author}:
                      </h5>
                      <p>{formatResponse(answer.message)}</p>
                    </div>
                  );
                })}

              {loading && (
                <div className="loader-container">
                  <div className="loader"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <div className="sticky-chat-input">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-10">
              <hr />
            </div>
            <div className="col-8">
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
    </div>
  );
}
