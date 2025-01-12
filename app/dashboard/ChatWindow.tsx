"use client";

import React, { useState } from "react";
import SideBar from "./sidebar/Header";
import Message from "./components/Message";
import Loader from "../utils/Loader";
import PromptInput from "./components/PromptInput";
import "./dashboard.scss";

const ChatWindow = () => {
  const [inquiry, setInquiry] = useState("");
  const [answers, setAnswers] = useState<
    { id: string; author: string; message: string }[]
  >([]);
  const [selectedModel, setSelectedModel] = useState("gpt-4o-mini");
  const [loading, setLoading] = useState(false);

  return (
    <>
      <SideBar
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
      />
      <div className="main-container d-flex align-items-center">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-xl-7 col-xxl-6 ml-4">
              <h3 className="prompt fw-bold">What is your question?</h3>
              <div className="answers-container">
                {answers.map((answer) => (
                  <Message
                    key={answer.id}
                    answerId={answer.id}
                    answerAuthor={answer.author}
                    answerMessage={answer.message}
                  />
                ))}
                {loading && <Loader />}
              </div>
            </div>
          </div>
        </div>
        <PromptInput
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

export default ChatWindow;
