"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import "../styles/global.scss";
import { formatResponse } from "./utils/formatResponse";
import ModelSelector from "./components/modelSelector";

export default function Home() {
  const [inquiry, setInquiry] = useState("");
  const [answers, setAnswers] = useState<{ author: string; message: string }[]>(
    []
  );
  const [selectedModel, setSelectedModel] = useState("llama3-8b-8192");
  const [loading, setLoading] = useState(false);
  // console.log(answers);

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch("/api/inquiry", {
      method: "POST",
      body: JSON.stringify({ inquiry, model: selectedModel }),
    });

    const data = await res.json();
    const newAnswer = {
      author: data.response.model,
      message: data.response.choices[0].message.content,
    };
    setAnswers([...answers, newAnswer]);
    setLoading(false);
  };

  return (
    <div className="main-container">
      <main className="content">
        <div className="container">
          <div className="row justify-content-center response-container">
            <ModelSelector
              selectedModel={selectedModel}
              setSelectedModel={setSelectedModel}
            />

            <div className="col-8" style={{ paddingBottom: "200px" }}>
              {answers &&
                answers.length > 0 &&
                answers.map((answer, index) => (
                  <div className="response-box" key={index}>
                    <h5>{answer.author}:</h5>
                    <p>{formatResponse(answer.message)}</p>
                  </div>
                ))}

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
