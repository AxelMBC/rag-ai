"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import ModelSelector from "../components/modelSelector";
import Message from "../components/Messages";
import Loader from "../components/Loader";
import InputAsk from "../components/InputAsk";

const MainChat = () => {
  const [inquiry, setInquiry] = useState("");
  const [answers, setAnswers] = useState<
    { id: string; author: string; message: string }[]
  >([]);

  const [selectedModel, setSelectedModel] = useState("llama3-8b-8192");
  const [loading, setLoading] = useState(false);
  return (
    <>
      <ModelSelector
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
      />
      <div className="main-container d-flex align-items-center">
        <div className="container-fluid">
          <div className="row justify-content-center response-container">
            <div
              className="col-12 col-sm-8 col-md-6"
              style={{ marginLeft: "4em" }}
            >
              <h3 className="prompt fw-bold">What is your question?</h3>
              <div style={{ paddingBottom: "200px" }}>
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
    </>
  );
};

export default MainChat;
