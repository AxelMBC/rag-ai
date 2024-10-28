"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import "../styles/global.scss";
import ModelSelector from "./components/modelSelector";
import Message from "./components/Messages";
import Loader from "./components/Loader";
import InputAsk from "./components/InputAsk";

export default function Home() {
  const [inquiry, setInquiry] = useState("");
  const [answers, setAnswers] = useState<
    { id: string; author: string; message: string }[]
  >([]);
  const [selectedModel, setSelectedModel] = useState("llama3-8b-8192");
  const [loading, setLoading] = useState(false);
  // console.log("answers", answers);

  return (
    <div className="main-container d-flex align-items-center">
      <div className="d-inline"></div>
      <div style={{ width: "30%" }}></div>
      <div className="content">
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
              {answers?.map((answer) => {
                return (
                  <Message
                    key={answer.id}
                    answerId={answer.id}
                    answerAuthor={answer.author}
                    answerMessage={answer.message}
                  />
                );
              })}

              {loading && <Loader />}
            </div>
          </div>
        </div>
      </div>

      <InputAsk
        inquiry={inquiry}
        setInquiry={setInquiry}
        selectedModel={selectedModel}
        answers={answers}
        setAnswers={setAnswers}
        setLoading={setLoading}
      />
    </div>
  );
}
