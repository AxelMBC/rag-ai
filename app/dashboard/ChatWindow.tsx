"use client";
import React, { useState } from "react";
import SideBar from "./sidebar/Header";
import Message from "./components/Message";
import Loader from "../utils/Loader";
import PromptInput from "./components/PromptInput";
import "./dashboard.scss";

interface ChatMessage {
  id: string;
  author: string; // "User" or the model name, e.g. "llama3-8b-8192"
  message: string;
}

const ChatWindow = () => {
  // Use the shape {id, author, message}
  const [answers, setAnswers] = useState<ChatMessage[]>([]);
  const [selectedModel, setSelectedModel] = useState("llama3-8b-8192");
  const [loading, setLoading] = useState(false);
  const [conversationalMemory, setConversationalMemory] = useState(false);

  return (
    <>
      <SideBar
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        conversationalMemory={conversationalMemory}
        setConversationalMemory={setConversationalMemory}
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
          // pass conversation memory setting
          conversationalMemory={conversationalMemory}
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
